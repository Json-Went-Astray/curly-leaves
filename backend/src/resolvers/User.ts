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
  Float,
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
import { ProductResolver } from "./Product.js";
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
    const user: any = ctx.prisma.user.findUnique({
      where: {
        id: ctx.user!.id,
      },
      include: {
        cart: {
          include: {
            CartItem: {
              include: {
                product: true,
              },
            },
          },
        },
        addressesSets: true,
      },
    });

    if (user && user.cart && user.cart.CartItem) {
      user.cart.CartItem = user.cart.CartItem.filter((item: any) => {
        console.log("x", item.quantity, item.product.count);

        if (item.product) {
          // Jeśli produkt nie jest dostępny, usuń go z koszyka
          if (!item.product.isAvailable) {
            ctx.prisma.cartItem.delete({
              where: {
                id: item.id,
              },
            });
            return false;
          }

          if (item.product.count === 0) {
            ctx.prisma.cartItem.delete({
              where: {
                id: item.id,
              },
            });
            return false;
          }

          if (item.quantity > item.product.count) {
            console.log("exceeds");
            item.quantity = item.product.count;
            ctx.prisma.cartItem.update({
              where: {
                id: item.id,
              },
              data: {
                quantity: item.product.count,
              },
            });
          }

          return true;
        }

        ctx.prisma.cartItem.delete({
          where: {
            id: item.id,
          },
        });
        return false;
      });
    }

    return user;
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
          const text = `Witamy w naszym serwisie! W celu aktywacji konta proszę kliknąć w poniższy link http://localhost:5173/new-user/${exists.activationLink}`;

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
    } else {
      throw new GraphQLError("user already activated");
    }

    const updatedUser = await ctx.prisma.user.update({
      where: {
        id: found.id,
      },
      data: {
        isActive: true,
      },
    });

    return updatedUser;
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
    const hashedPassword = await bcrypt.hash(userData.password_1, 3);

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
        const text = `Witamy w naszym serwisie! W celu aktywacji konta proszę kliknąć w poniższy link http://localhost:5173/new-user/${activationLink}`;

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

    const addressSetData = {
      city: userExtra.city,
      county: userExtra.county,
      postalCode: userExtra.postalCode,
      phoneNumber: userExtra.phoneNumber,
      street: userExtra.street,
      houseNumber: userExtra.houseNumber,
      nip: userExtra.nip,
      companyName: userExtra.companyName,
    };

    const anyFieldNotEmpty = Object.values(addressSetData).some(
      (value) => !!value
    );
    console.log(anyFieldNotEmpty);

    const userData2 = {
      login: userData.login,
      email: userData.email,
      password: hashedPassword,
      name: userData.name,
      surname: userData.surname,
      activationLink: activationLink,
    };

    const user = await ctx.prisma.user.create({
      //@ts-ignore
      data: {
        ...userData2,
        ...(anyFieldNotEmpty && { addressesSets: { create: addressSetData } }),
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

  @Mutation((returns) => Number)
  @UseMiddleware(IsLoggedIn)
  async createAddressSet(@Ctx() ctx: Context) {
    const user = await ctx.prisma.user.findUnique({
      where: {
        email: ctx.user?.email,
      },
      include: {
        addressesSets: true,
      },
    });

    if (!user) {
      throw new GraphQLError("Brak danego użytkownika");
    }

    if (user.addressesSets) {
      const nonTemporaryAddressSets = user.addressesSets.filter(
        (set) => !set.isTemporary
      );
      if (nonTemporaryAddressSets.length > 3) {
        throw new GraphQLError("Przekroczono limit adresów");
      }
    }

    const res = await ctx.prisma.adressSet.create({
      data: {
        ownerId: user.id,
      },
    });

    return res.id;
  }

  @Mutation((returns) => String)
  @UseMiddleware(IsLoggedIn)
  async modifyAddressLine(
    @Ctx() ctx: Context,
    @Arg("setId") setId: number,
    @Arg("whichLine") whichLine: string,
    @Arg("line1") line1: string,
    @Arg("line2", (type) => String, { nullable: true }) line2: string | null
  ) {
    const user = await ctx.prisma.user.findUnique({
      where: {
        email: ctx.user?.email,
      },
      include: {
        addressesSets: true,
      },
    });

    if (!user) {
      throw new GraphQLError("Brak danego użytkownika");
    }

    const addressSet = await ctx.prisma.adressSet.findFirst({
      where: {
        ownerId: ctx.user?.id,
        id: setId,
      },
    });

    if (!addressSet) {
      throw new GraphQLError("Zestaw adresów nie znaleziony");
    }

    switch (whichLine) {
      case "phone":
        await ctx.prisma.adressSet.update({
          where: {
            id: setId,
          },
          data: {
            phoneNumber: line1,
          },
        });
        break;
      case "county":
        await ctx.prisma.adressSet.update({
          where: {
            id: setId,
          },
          data: {
            county: line1,
          },
        });
        break;
      case "postal/city":
        await ctx.prisma.adressSet.update({
          where: {
            id: setId,
          },
          data: {
            postalCode: line1,
            city: line2,
          },
        });
        break;
      case "street/house":
        await ctx.prisma.adressSet.update({
          where: {
            id: setId,
          },
          data: {
            street: line1,
            //@ts-ignore
            houseNumber: parseInt(line2),
          },
        });
        break;
      case "nip":
        await ctx.prisma.adressSet.update({
          where: {
            id: setId,
          },
          data: {
            nip: line1,
          },
        });
        break;
      case "company":
        await ctx.prisma.adressSet.update({
          where: {
            id: setId,
          },
          data: {
            companyName: line1,
          },
        });
        break;

      default:
        break;
    }
    return "ok";
  }

  @Mutation((returns) => String)
  @UseMiddleware(IsLoggedIn)
  async deleteAddressSet(@Ctx() ctx: Context, @Arg("setId") setId: number) {
    const user = await ctx.prisma.user.findUnique({
      where: {
        email: ctx.user?.email,
      },
      include: {
        addressesSets: true,
      },
    });

    if (!user) {
      throw new GraphQLError("Brak danego użytkownika");
    }

    const addressSet = await ctx.prisma.adressSet.findFirst({
      where: {
        ownerId: ctx.user?.id,
        id: setId,
      },
    });

    if (!addressSet) {
      throw new GraphQLError("Zestaw adresów nie znaleziony");
    }

    await ctx.prisma.adressSet.update({
      where: {
        id: setId,
      },
      data: {
        isTemporary: true,
      },
    });

    return "ok";
  }

  @Mutation((returns) => String)
  @UseMiddleware(IsLoggedIn)
  async setPfp(@Ctx() ctx: Context, @Arg("picId") picId: string) {
    await ctx.prisma.user.update({
      where: {
        id: ctx.user?.id,
      },
      data: {
        picId: picId,
      },
    });
    return "ok";
  }

  @Mutation((returns) => String)
  @UseMiddleware(IsLoggedIn)
  async changePassword(
    @Ctx() ctx: Context,
    @Arg("oldPass") oldPass: string,
    @Arg("newPass1") newPass1: string,
    @Arg("newPass2") newPass2: string
  ) {
    if (oldPass == "" || newPass1 == "" || newPass2 == "") {
      return "Uzupełnij pola";
    }

    if (newPass1 != newPass2) {
      return "Nowe hasła się nie zgadzają";
    }

    if (oldPass == newPass1) {
      return "Nowe hasło musi być inne niż poprzednie";
    }

    const user = await ctx.prisma.user.findUnique({
      where: {
        email: ctx.user?.email,
      },
    });

    if (!user) {
      throw new GraphQLError("500");
    }
    const passwordMatch = await bcrypt.compare(oldPass, user.password);
    if (!passwordMatch) {
      return "Wprowadzono niepoprawne aktualne hasło";
    }
    const hashedPassword = await bcrypt.hash(newPass1, 3);
    await ctx.prisma.user.update({
      where: {
        email: ctx.user?.email,
      },
      data: {
        password: hashedPassword,
      },
    });

    return "";
  }

  @Mutation((returns) => String)
  @UseMiddleware(IsLoggedIn)
  async placeOrder(
    @Ctx() ctx: Context,
    @Arg("isSet1") isSet1: boolean,
    @Arg("set1Id", (type) => String, { nullable: true }) set1Id: string | null,
    @Arg("paymentMethod", (type) => String) paymentMethod: string,
    @Arg("deliveryMethod", (type) => String) deliveryMethod: string,
    @Arg("netValue", (type) => Float) netValue: number
  ) {
    let paymentTitle = crypto.randomBytes(32).toString("hex");

    try {
      const userCart = await ctx.prisma.cart.findUnique({
        where: {
          userId: ctx.user!.id,
        },
        include: {
          CartItem: {
            where: {
              orderId: null,
            },
          },
        },
      });
    
      if (!userCart) {
        throw new Error("Koszyk użytkownika nie został znaleziony.");
      }
    
      let paymentMethodId = 1;
      if (paymentMethod == "cod") {
        paymentMethodId = 2;
      }
    
      let standaloneAdressId = 0;
      if (isSet1) {
        standaloneAdressId = parseInt(set1Id!);
      } else {
        return "Custom adresy nie są jeszcze wspierane";
      }
    
      const newOrder = await ctx.prisma.order.create({
        data: {
          orderStatusId: paymentMethodId,
          netValue: netValue,
          userId: ctx.user!.id,
          standaloneAdressId: standaloneAdressId,
          paymentTitle: paymentTitle,
          deliveryTitle: deliveryMethod,
          items: {
            create: userCart.CartItem.map((cartItem) => ({
              quantity: cartItem.quantity,
              productId: cartItem.productId,
              isPrize: cartItem.isPrize,
            })),
          },
        },
        include: {
          items: true,
        },
      });
    
      await ctx.prisma.cartItem.updateMany({
        where: {
          id: {
            in: userCart.CartItem.map((cartItem) => cartItem.id),
          },
          orderId: null,
          cartId: null
        },
        data: {
          orderId: newOrder.id,
          cartId: null,
        },
      });

      await ctx.prisma.cartItem.deleteMany({
        where: {
          id: {
            in: userCart.CartItem.map((cartItem) => cartItem.id),
          },
          orderId: null,
        },
      });
    
      const orderedProducts = await prisma.cartItem.findMany({
        where: {
          orderId: newOrder.id,
          cartId: null,
        },
        select: {
          productId: true,
          quantity: true,
        },
      });
    
      for (const orderedProduct of orderedProducts) {
        console.log(orderedProduct, orderedProducts)
        const { productId, quantity } = orderedProduct;
        await prisma.product.update({
          where: {
            id: productId,
          },
          data: {
            count: {
              decrement: quantity,
            },
          },
        });
      }
    
      return paymentTitle;
    } catch (error) {
      console.error("Błąd transakcji:", error);
      throw new Error("Wystąpił błąd podczas przetwarzania zamówienia.");
    }
  }
}
