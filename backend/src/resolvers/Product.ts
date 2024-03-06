import "reflect-metadata";
import { join, dirname } from "path";
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
import * as crypto from "crypto";
import validator from "validator";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql/error/index.js";
import fs from "fs";
import ejs from "ejs";
import * as bcrypt from "bcrypt";
import { IsElevated, IsLoggedIn } from "../auth.js";
import { Image } from "../models/Image.js";
import { writeFile } from "fs/promises";
import { access, constants, mkdir } from "fs/promises";
import { createWriteStream } from "fs";
import { GraphQLUpload, Upload } from "graphql-upload-ts";
import { fileURLToPath } from "url";
import appRoot from "app-root-path";
import isBoolean from "validator/lib/isBoolean.js";
import { unlink } from "fs/promises";
import { Product } from "../models/Product.js";
import { Category } from "../models/Category.js";

@Resolver(Product)
export class ProductResolver {
  @Mutation(() => String)
  // @UseMiddleware(IsElevated)
  async createCategory(
    @Arg("title") title: string,
    @Ctx() ctx: Context
  ): Promise<string> {
    const newCategory = await ctx.prisma.category.create({
      data: {
        title: title,
      },
    });

    return `Kategoria ${newCategory.title} została pomyślnie stworzona!`;
  }

  @Query((returns) => [Category])
  // @UseMiddleware(IsElevated)
  async getCategories(
    @Ctx() ctx: Context
  ): Promise<Category[]> {
    const categories = await ctx.prisma.category.findMany();
    return categories as Category[];
  }

  @Mutation(() => String)
  // @UseMiddleware(IsElevated)
  async deleteCategory(
    @Arg("title") title: string,
    @Ctx() ctx: Context
  ): Promise<string> {
    const result = await ctx.prisma.category.deleteMany({
      where: {
        title: title
      }
    })

    return `Kategoria została pomyślnie usunięta!`;
  }
}
