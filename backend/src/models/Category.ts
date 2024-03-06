import "reflect-metadata";
import { ObjectType, Field, ID, Int } from "type-graphql";
import { Product } from "./Product.js";

@ObjectType()
export class Category {
  @Field((type) => ID)
  id: number;

  @Field()
  title: string;

  @Field((type) => [Product])
  products: Product[];
}