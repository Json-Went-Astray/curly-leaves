import "reflect-metadata";
import { ObjectType, Field, ID, Float } from "type-graphql";
import { Product } from "./Product.js";

@ObjectType()
export class ShippingCost {
  @Field((type) => ID)
  id: number;

  @Field()
  name: string;

  @Field((type) => Float)
  value: number;

  @Field((type) => [Product])
  products: Product[];
}