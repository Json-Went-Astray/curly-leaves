import { PrismaClient } from "@prisma/client";
import { ArgsDictionary, AuthChecker, MiddlewareFn } from "type-graphql";
import { Context } from "./context.js";
import { User } from "./models/User.js";
import pkg from 'jsonwebtoken';
import { verify } from "jsonwebtoken";
import { GraphQLError } from "graphql";

interface JwtPayload {
  [key: string]: any;
}

export async function authenticateUser(
  prisma: PrismaClient,
  token: string
): Promise<User | null> {
  if (token === "") {
    return null;
  }

  const tokenPayload = pkg.verify(token, process.env.APP_SECRET!) as JwtPayload;
  const userId = tokenPayload.sub!;

  return await prisma.user.findUnique({ where: { id: userId } });
}

export const IsLoggedIn: MiddlewareFn<Context> = async ({ context }, next) => {
  const user = context.user;
  if (user === null) {
    throw new GraphQLError("Unauthorized");
  }
  return next();
};
