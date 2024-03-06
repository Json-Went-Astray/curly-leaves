import "reflect-metadata";
import { ObjectType, Field, ID, Int } from "type-graphql";
import { Product } from "./Product.js";
import { OrderStatus } from "./OrderStatus.js";
import { AdressSet } from "./AdressSet.js";
import { Invoice } from "./Invoice.js";

@ObjectType()
export class Order {
  @Field((type) => ID)
  id: number;

  @Field((type) => Int)
  orderStatusId: number;

  @Field((type) => Int)
  netValue: number;

  @Field((type) => Int)
  userId: number;

  @Field((type) => Int, { nullable: true })
  standaloneAdressId?: number;

  @Field((type) => Invoice, { nullable: true })
  invoice?: Invoice;

  @Field((type) => AdressSet, { nullable: true })
  standaloneAdress?: AdressSet;

  @Field((type) => [Product])
  products: Product[];

  @Field((type) => OrderStatus)
  orderStatus: OrderStatus;
}