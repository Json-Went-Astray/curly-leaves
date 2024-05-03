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
  Float,
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
import { PlantInfo, Product } from "../models/Product.js";
import { Category } from "../models/Category.js";
import { Review } from "../models/Product.js";

//   productType  ProductType   @relation("products", fields: [productTypeId], references: [id])
//   shippingCost ShippingCost? @relation(fields: [shippingCostId], references: [id])
//   category     Category?      @relation(fields: [categoryId], references: [id])

//   orders         Order[]     @relation("productList")
//   carts          Cart[]      @relation("cartElements")
//   shippingCostId Int?
//   categoryId     Int?

//   PlantInfo      PlantInfo[]
// }

@InputType()
export class ProductCreateInput {
  @Field((type) => Int)
  productTypeId: number;

  @Field((type) => Boolean, { nullable: true })
  isPrize: boolean;

  @Field((type) => Int)
  pointsGiven: number;

  @Field((type) => Int, { nullable: true })
  pointsCost: number;

  @Field((type) => Boolean)
  isAvailable: boolean;

  @Field((type) => String, { nullable: true })
  label: string;

  @Field((type) => Float, { nullable: true })
  fullPrice: number;

  @Field((type) => Float, { nullable: true })
  price: number;

  @Field((type) => String)
  title: string;

  @Field((type) => String, { nullable: true })
  description: string;

  @Field((type) => String, { nullable: true })
  trivia: string;

  @Field((type) => Float, { nullable: true })
  rating: number;

  @Field((type) => String)
  snowflake: string;

  @Field((type) => String, { nullable: true })
  productImages: string;
}

@InputType()
export class ProductCreateExtra {
  @Field((type) => Int)
  sunlight: number;

  @Field((type) => Int)
  ground: number;

  @Field((type) => Int)
  fertilizer: number;

  @Field((type) => Int)
  water: number;

  @Field((type) => Boolean)
  isToxic: boolean;
}

@Resolver(Product)
export class ProductResolver {
  @Mutation(() => Product)
  // @UseMiddleware(IsElevated)
  async addProduct(
    @Arg("productData") productData: ProductCreateInput,
    @Arg("productExtra") productExtra: ProductCreateExtra,
    @Ctx() ctx: Context
  ) {
    const errors: GraphQLError[] = [];
    const snowflakeExists = await ctx.prisma.product.findFirst({
      where: {
        snowFlake: productData.snowflake,
      },
    });

    if (snowflakeExists) {
      errors.push(new GraphQLError("snowflake exists"));
    }

    if (
      productData.fullPrice < 1 ||
      productData.price >= productData.fullPrice
    ) {
      errors.push(new GraphQLError("price is invalid"));
    }

    if (productData.pointsGiven < 0) {
      errors.push(new GraphQLError("points values are invalid"));
    }

    if (productData.title == "") {
      errors.push(new GraphQLError("title is void"));
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

    const product = await ctx.prisma.product.create({
      data: {
        title: productData.title,
        description: productData.description,
        label: productData.label,
        fullPrice: productData.fullPrice,
        price: productData.price,
        isPrize: productData.isPrize,
        isAvailable: productData.isAvailable,
        pointsCost: productData.pointsCost,
        pointsGiven: productData.pointsGiven,
        trivia: productData.trivia,
        rating: productData.rating,
        productTypeId: productData.productTypeId,
        snowFlake: productData.snowflake,
        pics: productData.productImages,
        count: 0,
        PlantInfo: {
          create: {
            ground: productExtra.fertilizer,
            isToxic: productExtra.isToxic,
            sunlight: productExtra.sunlight,
            water: productExtra.water,
            fertilizer: productExtra.fertilizer,
          },
        },
      },
    });

    return product;
  }

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

  @Mutation(() => String)
  async addProductToCart(
    @Arg("productId") productId: number,
    @Arg("userId") userId: number,
    @Arg("quantity") quantity: number,
    @Arg("isPrize") isPrize: boolean,
    @Ctx() ctx: Context
  ): Promise<string> {
    // Sprawdzamy, czy użytkownik ma już koszyk
    let userCart = await ctx.prisma.cart.findUnique({
      where: {
        userId: userId,
      },
    });

    // Jeśli użytkownik nie ma jeszcze koszyka, tworzymy nowy
    if (!userCart) {
      userCart = await ctx.prisma.cart.create({
        data: {
          userId: userId,
        },
      });
    }

    // Dodajemy produkt do koszyka
    await ctx.prisma.cartItem.create({
      data: {
        quantity: quantity,
        productId: productId,
        isPrize: isPrize,
        cartId: userCart.id,
      },
    });

    return `Dodano produkt do koszyka`;
  }

  @Mutation(() => String)
  async removeAllProductsFromCart(
    @Arg("userId") userId: number,
    @Ctx() ctx: Context
  ): Promise<string> {
    const userCart = await ctx.prisma.cart.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!userCart) {
      return "Koszyk użytkownika nie istnieje.";
    }

    await ctx.prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
        isPrize: false,
      },
    });

    return `Usunięto wszystkie produkty, które nie są nagrodami z koszyka użytkownika.`;
  }

  @Mutation(() => String)
async removeProductFromCart(
  @Arg("userId") userId: number,
  @Arg("productId") productId: number,
  @Ctx() ctx: Context
): Promise<string> {
  // Znajdujemy koszyk użytkownika
  const userCart = await ctx.prisma.cart.findUnique({
    where: {
      userId: userId
    },
    include: {
      CartItem: true
    }
  });

  if (!userCart) {
    return "Koszyk użytkownika nie istnieje.";
  }

  const productInCart = userCart.CartItem.find((item) => item.productId === productId);

  if (!productInCart) {
    return "Podany produkt nie znajduje się w koszyku.";
  }

  await ctx.prisma.cartItem.delete({
    where: {
      id: productInCart.id
    }
  });

  return `Usunięto produkt o identyfikatorze ${productId} z koszyka użytkownika.`;
}

  @Query((returns) => [Category])
  // @UseMiddleware(IsElevated)
  async getCategories(@Ctx() ctx: Context): Promise<Category[]> {
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
        title: title,
      },
    });

    return `Kategoria została pomyślnie usunięta!`;
  }

  @Query((returns) => [Review])
  async getReviews(
    @Arg("snowFlake") snowFlake: string,
    @Ctx() ctx: Context
  ): Promise<Review[]> {
    try {
      const product = await ctx.prisma.product.findUnique({
        where: {
          snowFlake: snowFlake,
        },
      });

      if (!product) {
        return [];
      }

      const reviews = await ctx.prisma.review.findMany({
        where: {
          productId: product.id,
        },
      });

      const convertedReviews = reviews.map((review) => {
        if (
          (review.negativeRating && review.negativeRating > 50) ||
          review.flagged
        ) {
          return {
            ...review,
            ratingValue: review.ratingValue.toString(),
            content:
              "Opinia jest obecnie w procesie moderacji z uwagi na potencjalną szkodliwość",
          };
        } else {
          return {
            ...review,
            ratingValue: review.ratingValue.toString(),
            content: review.content || "",
          };
        }
      });

      return convertedReviews;
    } catch (error) {
      throw new Error("Failed to fetch reviews");
    }
  }

  @Query((returns) => [Product])
  async getTopProduct(@Ctx() ctx: Context): Promise<Product[]> {
    const products: any[] = await ctx.prisma.product.findMany({
      take: 10,
      orderBy: [
        {
          reviews: {
            _count: "desc",
          },
        },
        {
          rating: "desc",
        },
      ],
    });

    return products;
  }

  @Query((returns) => [Product])
  async getDiscountedProducts(@Ctx() ctx: Context): Promise<Product[]> {
    let products: any[] = await ctx.prisma.product.findMany({
      take: 10,
      orderBy: [
        {
          price: "asc",
        },
      ],
    });

    products = products.filter(
      (product) => product.price !== null && product.price !== undefined
    );
    return products;
  }

  @Query((returns) => Product, { nullable: true })
  async getProductBySnowflake(
    @Ctx() ctx: Context,
    @Arg("aux") aux: string
  ): Promise<Product | null> {
    const product: any = await ctx.prisma.product.findUnique({
      where: {
        snowFlake: aux,
      },
    });

    if (!product) {
      return null;
    }
    return product as Product;
  }

  @Query((returns) => [Product], { nullable: true })
  async getProductsCross(
    @Ctx() ctx: Context,
    @Arg("cat") cat: number
  ): Promise<Product[] | null> {
    const product: any = await ctx.prisma.product.findMany({
      where: {
        categoryId: cat,
      },
      take: 5,
    });

    if (!product) {
      return null;
    }
    return product as Product[];
  }
}
