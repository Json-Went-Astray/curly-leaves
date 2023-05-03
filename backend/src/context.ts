import { PrismaClient } from "@prisma/client";
import { YogaInitialContext } from "graphql-yoga";

export const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
}

export async function createContext(
  initialContext: YogaInitialContext
): Promise<Context> {

  return {
    prisma
  };
}
