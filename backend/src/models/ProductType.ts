import "reflect-metadata";
import { ObjectType, Field, ID, Int, Float } from "type-graphql";
import { Product } from "./Product.js";

@ObjectType()
export class ProductType {
  @Field((type) => ID)
  id: number;

  @Field()
  title: string;

  @Field((type) => [Product])
  products: Product[];
}