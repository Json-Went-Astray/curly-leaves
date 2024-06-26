import { PrismaClient } from "@prisma/client";
import { ArgsDictionary, AuthChecker, MiddlewareFn } from "type-graphql";
import { Context } from "./context.js";
import { User } from "./models/User.js";
import pkg from "jsonwebtoken";
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
    throw new GraphQLError("Unauthorized - nonlogon");
  }
  return next();
};

export const IsElevated: MiddlewareFn<Context> = async ({ context }, next) => {
  const user: User | null = context.user;

  if (!user || (user.permissionLevel !== 1 && user.permissionLevel !== 0)) {
    throw new GraphQLError("Unauthorized - OP access required");
  }

  return next();
};

export const IsAdmin: MiddlewareFn<Context> = async ({ context }, next) => {
  const user: User | null = context.user;

  if (!user || user.permissionLevel !== 0) {
    throw new GraphQLError("Unauthorized - Admin access required");
  }

  return next();
};
