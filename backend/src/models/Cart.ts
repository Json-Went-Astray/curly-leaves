import "reflect-metadata";
import { ObjectType, Field, ID, Int } from "type-graphql";
import { Product } from "./Product.js";

@ObjectType()
export class Cart {
  @Field((type) => ID)
  id: number;

  @Field((type) => Int)
  userId: number;

  @Field((type) => [Product])
  products: Product[];
}