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

@Resolver(Image)
export class MediaResolver {
  @Mutation(() => String)
  // @UseMiddleware(IsElevated)
  async uploadFileMedia(
    @Arg("file", () => GraphQLUpload) file: Upload,
    @Arg("title") title: string,
    @Arg("description") description: string,
    @Arg("altString") altString: string,
    @Arg("refLink") refLink: string,
    @Arg("isCarousel") isCarousel: boolean,
    @Arg("isProfile") isProfile: boolean,
    @Ctx() ctx: Context
  ): Promise<string> {
    console.log(isCarousel, isProfile);
    //@ts-ignore
    const uniqueFilename = `${Date.now()}-${file.filename}`;
    const mediaDir = join(appRoot.path, "uploads", "media");
    const path = join(mediaDir, uniqueFilename);
    let alias = 1;

    const writeStream = createWriteStream(path);
    //@ts-ignore
    await file.createReadStream().pipe(writeStream);
    let imageObj = null;
    do {
      imageObj = await ctx.prisma.image.findFirst({
        where: {
          title: title,
        },
      });
     

      if (imageObj) {
        const match = title.match(/\s{1}\(\S+\)$/);
        if (match) {
          alias += 1;
          const pattern = title.split(" (");
          title = title.replace(" (" + pattern[pattern.length - 1], "");
          title += " (" + alias + ")";
        } else {
          title += " (1)";
        }
        continue;
      }
    } while (imageObj);

    const uploadedImage = await ctx.prisma.image.create({
      data: {
        title,
        description,
        altString,
        createdAt: new Date(),
        source: "/uploads/media/" + uniqueFilename,
        refLink,
        isCarousel,
        isProfile,
      },
    });

    return `Plik ${uploadedImage.title} został pomyślnie przesłany!`;
  }

  @Mutation(() => Boolean)
  // @UseMiddleware(IsElevated)
  async deleteMedia(
    @Ctx() ctx: Context,
    @Arg("fileName") fileName: string
  ): Promise<boolean> {
    console.log("xsd");
    const found = await ctx.prisma.image.findFirst({
      where: {
        title: fileName,
      },
    });

    if (found) {
      try {
        const path = join(appRoot.path, found.source);
        await unlink(path);
      } catch (error) {
        console.error(error);
      }

      await ctx.prisma.image.deleteMany({
        where: {
          title: fileName,
        },
      });
      return true;
    }
    return false;
  }

  @Query((returns) => [Image])
  async getMedia(
    @Ctx() ctx: Context,
    @Arg("filename", { nullable: true }) filename?: string
  ): Promise<Image[]> {
    const images = await ctx.prisma.image.findMany({
      where: filename ? { title: filename } : undefined,
    });
    return images;
  }
}
