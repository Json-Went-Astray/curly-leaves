import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { Order } from "./Order.js";

@ObjectType()
export class OrderStatus {
  @Field((type) => ID)
  id: number;

  @Field()
  name: string;

  @Field((type) => [Order])
  orders: Order[];
}