import { PrismaClient } from "@prisma/client";
import { YogaInitialContext } from "graphql-yoga";
import { authenticateUser } from "./auth.js";
import { User } from "./models/User.js";

export const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  user: null | User;
}

function parseToken(token?: string) {
  return token?.split(" ")[1] ?? "";
}

export async function createContext(
  initialContext: YogaInitialContext & { connectionParams?: { token?: string } }
): Promise<Context> {
  let token = "";
  if (initialContext.request) {
    token = parseToken(
      initialContext.request.headers.get("authorization") ?? undefined
    );
  }

  return {
    prisma,
    user: await authenticateUser(prisma, token),
  };
}

