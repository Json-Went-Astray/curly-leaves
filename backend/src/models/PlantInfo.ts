import { ObjectType, Field, ID, Int } from "type-graphql";
import { Product } from "./Product.js";

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

  @Field((type) => Int)
  isToxic: number;

  @Field((type) => Product, { nullable: true })
  product?: Product;

  @Field((type) => Int, { nullable: true })
  productId?: number;
}
