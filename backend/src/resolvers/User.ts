import "reflect-metadata";
import {
  Resolver,
  Mutation,
  Arg,
  InputType,
  Field,
  Ctx,
  Query,
  ID,
  Int,
  ObjectType,
  UseMiddleware,
} from "type-graphql";
import { IsEmail, IsStrongPassword, MaxLength } from "class-validator";
import { prisma } from "../context.js";
import { type Context } from "../context.js";
import { User } from "../models/User.js";
import { Cart, CartItem } from "../models/Cart.js";

import * as crypto from "crypto";
import validator from "validator";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql/error/index.js";
import fs from "fs";
import ejs from "ejs";
import * as bcrypt from "bcrypt";
import { IsElevated, IsLoggedIn } from "../auth.js";
import { use } from "bcrypt/promises.js";

@InputType()
export class UserExtraInput {
  @Field((type) => String, { nullable: true })
  county: string;

  @Field((type) => String, { nullable: true })
  city: string;

  @Field((type) => String, { nullable: true })
  postalCode: string;

  @Field((type) => String, { nullable: true })
  phoneNumber: string;

  @Field((type) => String, { nullable: true })
  street: string;

  @Field((type) => Int, { nullable: true })
  houseNumber: number;

  @Field((type) => String, { nullable: true })
  nip: string;

  @Field((type) => String, { nullable: true })
  companyName: string;
}

@InputType()
export class UserCreateInput {
  @Field((type) => String)
  login: string;

  @Field((type) => String)
  email: string;

  @Field((type) => String)
  password_1: string;

  @Field((type) => String)
  password_2: string;

  @Field((type) => String)
  name: string;

  @Field((type) => String)
  surname: string;

  @Field()
  tos: boolean;
}

@ObjectType()
export class LoginResult {
  @Field()
  token: string;

  @Field((type) => User)
  user: User;
}

@Resolver(User)
export class UserResolver {
  public activationEmails: { [email: string]: number } = {};

  @Query((returns) => Boolean)
  @UseMiddleware(IsElevated)
  async isElevatedQuery() {
    return true;
  }

  @Query((returns) => User, { nullable: true })
  @UseMiddleware(IsLoggedIn)
  async me(@Ctx() ctx: Context) {
    return ctx.prisma.user.findUnique({
      where: {
        id: ctx.user!.id,
      },
      include: {
        cart: {
          include: {
            CartItem: {
              include: {
                product: true
              }
            }
          }
        }
      },
    });
  }

  @Query((returns) => User)
  async resendActivationLink(
    @Ctx() ctx: Context,
    @Arg("userEmail") userEmail: string
  ) {
    const exists = await ctx.prisma.user.findFirst({
      where: {
        email: userEmail,
      },
    });

    if (!exists) {
      throw new GraphQLError("user does not exists", {
        extensions: {
          code: "USER_DONT_EXISTS",
        },
      });
    }

    if (
      this.activationEmails[userEmail] &&
      Date.now() - this.activationEmails[userEmail] < 30000
    ) {
      throw new GraphQLError("resend under 30 seconds", {
        extensions: {
          code: "TO_MANY_REQUESTS",
        },
      });
    } else {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "curly.leaves.mailer@gmail.com",
          pass: "nhusxltunzdgietp",
        },
      });

      const sendEmail = async (to: string, activationLink: string) => {
        try {
          const subject =
            "Witamy w serwisie Curly-Leaves - potwierdź rejestrację!";
          const text = `Witamy w naszym serwisie! W celu aktywacji konta proszę kliknąć w poniższy link http://localhost:5173/activate-account/${exists.activationLink}`;

          const mailOptions = {
            from: "curly.leaves.mailer@gmail.com",
            to: to,
            subject: subject,
            text: text,
          };

          const info = await transporter.sendMail(mailOptions);
        } catch (error) {
          console.error("Error sending email:", error);
        }
      };

      await sendEmail(exists.email, exists.activationLink);
      this.activationEmails[exists.email] = Date.now();
    }
  }

  @Mutation((returns) => User)
  async userActivate(@Arg("link") link: string, @Ctx() ctx: Context) {
    const found = await ctx.prisma.user.findFirst({
      where: {
        activationLink: link,
      },
    });

    if (found && !found.isActive) {
      found.isActive = true;
    } else {
      throw new GraphQLError("user already activated");
    }

    return found;
  }

  @Mutation((returns) => User)
  async userSignup(
    @Arg("userData") userData: UserCreateInput,
    @Arg("userExtra") userExtra: UserExtraInput,
    @Ctx() ctx: Context
  ) {
    const errors: GraphQLError[] = [];

    const exists = await ctx.prisma.user.findFirst({
      where: {
        login: userData.login,
      },
    });

    if (!userData.tos) {
      errors.push(
        new GraphQLError("tos was not accepted", {
          extensions: {
            code: "TOS_ERROR",
          },
        })
      );
    }

    if (exists || userData.login.length < 2) {
      errors.push(
        new GraphQLError("user with login already exists", {
          extensions: {
            code: "USER_EXISTS_LOGIN_OR_INCORRECT",
          },
        })
      );
    }

    const emailExists = await ctx.prisma.user.findFirst({
      where: {
        email: userData.email,
      },
    });

    if (emailExists || !validator.default.isEmail(userData.email)) {
      errors.push(
        new GraphQLError(
          "user with email already exists or email is incorrect",
          {
            extensions: {
              code: "USER_EXISTS_EMAIL_OR_INCORRECT",
            },
          }
        )
      );
    }

    console.log("1");

    if (userData.password_1 !== userData.password_2) {
      errors.push(
        new GraphQLError("passwords are diffrent", {
          extensions: {
            code: "PASSWORD_MISSMATCH",
          },
        })
      );
    }

    const isPasswordSecure = validator.default.isStrongPassword(
      userData.password_1,
      {
        minLength: 8,
        minNumbers: 1,
        minSymbols: 1,
        minLowercase: 0,
        minUppercase: 0,
      }
    );

    if (!isPasswordSecure) {
      errors.push(
        new GraphQLError("password is too weak", {
          extensions: {
            code: "PASSWORD_INSECURE",
          },
        })
      );
    }

    if (userData.name.length < 3 || !/^[A-Z][a-z]*$/.test(userData.name)) {
      errors.push(
        new GraphQLError("name is incorrect", {
          extensions: {
            code: "NAME_INCORRECT",
          },
        })
      );
    }

    if (
      userData.surname.length < 3 ||
      !/^[A-Z][a-z]*$/.test(userData.surname)
    ) {
      errors.push(
        new GraphQLError("surname is incorrect", {
          extensions: {
            code: "SURNAME_INCORRECT",
          },
        })
      );
    }

    if (errors.length > 0) {
      const combinedError = new GraphQLError("Validation error", {
        extensions: {
          code: "VALIDATION_ERROR",
          errors: errors.map((error) => ({
            message: error.message,
            code: error.extensions?.code || "UNKOWN_ERROR",
          })),
        },
      });

      throw combinedError;
    }
    const hashedPassword = await bcrypt.hash(userData.password_1, 20);

    const activationLink = crypto.randomBytes(32).toString("hex");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "curly.leaves.mailer@gmail.com",
        pass: "nhusxltunzdgietp",
      },
    });

    const sendEmail = async (to: string, activationLink: string) => {
      let name = userData.name;
      try {
        const subject =
          "Witamy w serwisie Curly-Leaves - potwierdź rejestrację!";
        const text = `Witamy w naszym serwisie! W celu aktywacji konta proszę kliknąć w poniższy link http://localhost:5173/activate-account/${activationLink}`;

        const mailOptions = {
          from: "curly.leaves.mailer@gmail.com",
          to: to,
          subject: subject,
          text: text,
        };

        const info = await transporter.sendMail(mailOptions);
      } catch (error) {
        console.error("Error sending email:", error);
      }
    };

    await sendEmail(userData.email, activationLink);
    this.activationEmails[userData.email] = Date.now();

    const user = await ctx.prisma.user.create({
      data: {
        login: userData.login,
        email: userData.email,
        password: hashedPassword,
        name: userData.name,
        surname: userData.surname,
        activationLink: activationLink,
        addressesSets: {
          create: {
            city: userExtra.county,
            postalCode: userExtra.postalCode,
            phoneNumber: userExtra.phoneNumber,
            street: userExtra.street,
            houseNumber: userExtra.houseNumber,
            nip: userExtra.nip,
            companyName: userExtra.companyName,
          },
        },
      },
    });

    return user;
  }

  @Mutation((returns) => LoginResult)
  async loginUser(
    @Arg("userLogin") login: string,
    @Arg("userPassword") password: string,
    @Ctx() ctx: Context
  ) {
    const user = await ctx.prisma.user.findUnique({
      where: {
        email: login,
      },
    });

    if (!user) {
      throw new GraphQLError("Nieprawidłowy email lub hasło");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new GraphQLError(
        "Nieprawidłowy email lub hasło2 " + password + " " + user.password
      );
    }

    if (user.suspended) {
      throw new GraphQLError("Użytkownik zawieszony");
    }

    if (!user.isActive) {
      throw new GraphQLError("Użytkownik nieaktywny");
    }

    const token = jwt.sign({ sub: user.id }, process.env.APP_SECRET!);
    return { token, user };
  }
}
