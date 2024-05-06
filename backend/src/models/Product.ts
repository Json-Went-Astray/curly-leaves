import "reflect-metadata";
import { ObjectType, Field, ID, Float, Int } from "type-graphql";
import { ProductType } from "./ProductType.js";
import { ShippingCost } from "./ShippingCost.js";
import { Category } from "./Category.js";
import { Order } from "./Order.js";
import { Cart } from "./Cart.js";

@ObjectType()
export class PlantInfo {
  @Field((type) => ID)
  id: number;

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

  @Field((type) => Int, { nullable: true })
  productId?: number;
}

@ObjectType()
export class Product {
  @Field((type) => ID)
  id: number;

  @Field((type) => Int)
  productTypeId: number;
 
  @Field()
  isPrize: boolean;

  @Field((type) => Int)
  pointsGiven: number;

  @Field((type) => Int, { nullable: true })
  pointsCost?: number;

  @Field((type) => Int)
  count: number;

  @Field()
  isAvailable: boolean;

  @Field()
  isEdited: boolean;

  @Field((type) => String, { nullable: true })
  label?: string;

  @Field((type) => Float, { nullable: true })
  fullPrice?: number;

  @Field((type) => Float, { nullable: true })
  price?: number;

  @Field()
  title: string;

  @Field((type) => String, { nullable: true })
  pics: string;

  @Field((type) => String, { nullable: true })
  description?: string;

  @Field((type) => String, { nullable: true })
  shortDescription?: string;

  @Field((type) => String, { nullable: true })
  trivia?: string;

  @Field((type) => Float, { nullable: true })
  rating?: number;

  @Field((type) => String)
  snowFlake: string;

  @Field((type) => ProductType)
  productType: ProductType;

  @Field((type) => ShippingCost, { nullable: true })
  shippingCost?: ShippingCost;

  @Field((type) => Category)
  category: Category;

  @Field((type) => [Order])
  orders: Order[];

  @Field((type) => [Cart])
  carts: Cart[];

  @Field((type) => Int, { nullable: true })
  shippingCostId?: number;

  @Field((type) => Int)
  categoryId: number;

  @Field((type) => PlantInfo, { nullable: true })
  PlantInfo?: PlantInfo;

  @Field((type) => [Review], { nullable: true })
  reviews?: Review[];
}

@ObjectType()
export class Review {
  @Field((type) => ID)
  id: number;

  @Field((type) => Int)
  userId: number;

  @Field((type) => String)
  ratingValue: string;

  @Field((type) => String, { nullable: true })
  content?: string;

  @Field()
  createdAt: Date;

  @Field((type) => Int)
  positiveRating: number;

  @Field((type) => Boolean)
  flagged: boolean;

  @Field((type) => Int)
  negativeRating: number;

  @Field((type) => [Comment], { nullable: true })
  comments?: Comment[];
}

@ObjectType()
export class Comment {
  @Field((type) => ID)
  id: number;

  @Field((type) => Int)
  userId: number;

  @Field((type) => Int)
  opReviewId: number;

  @Field()
  content: string;

  @Field()
  createdAt: Date;

  @Field((type) => Int)
  positiveRating: number;

  @Field((type) => Int)
  negativeRating: number;

  @Field((type) => Review)
  review: Review;
}