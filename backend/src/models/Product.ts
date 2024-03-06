import "reflect-metadata";
import { ObjectType, Field, ID, Float, Int } from "type-graphql";
import { ProductType } from "./ProductType.js";
import { ShippingCost } from "./ShippingCost.js";
import { Category } from "./Category.js";
import { Order } from "./Order.js";
import { Cart } from "./Cart.js";
import { PlantInfo } from "./PlantInfo.js";

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

  @Field()
  isAvailable: boolean;

  @Field((type) => String, { nullable: true })
  label?: string;

  @Field((type) => Float, { nullable: true })
  fullPrice?: number;

  @Field((type) => Float, { nullable: true })
  price?: number;

  @Field()
  title: string;

  @Field((type) => String, { nullable: true })
  description?: string;

  @Field((type) => String, { nullable: true })
  trivia?: string;

  @Field((type) => Float, { nullable: true })
  rating?: number;

  @Field((type) => String, { nullable: true })
  snowFlake?: string;

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

  @Field((type) => [PlantInfo])
  plantInfo: PlantInfo[];
}
