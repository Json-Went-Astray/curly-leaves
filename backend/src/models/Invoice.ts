import "reflect-metadata";
import { ObjectType, Field, ID, Int } from "type-graphql";
import { Order } from "./Order.js";

@ObjectType()
export class Invoice {
  @Field((type) => ID)
  id: number;

  @Field((type) => Int, { unique: true })
  orderId: number;

  @Field()
  inVoiceId: string;

  @Field((type) => Order)
  order: Order;
}