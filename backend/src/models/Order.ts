import "reflect-metadata";
import { ObjectType, Field, ID, Int, Float } from "type-graphql";
import { Product } from "./Product.js";
import { OrderStatus } from "./OrderStatus.js";
import { AdressSet } from "./AdressSet.js";
import { CartItem } from "./Cart.js";

@ObjectType()
export class Order {
  @Field((type) => ID)
  id: number;

  @Field((type) => Int)
  orderStatusId: number;

  @Field((type) => Float)
  netValue: number;

  @Field((type) => Int)
  userId: number;

  @Field((type) => Int, { nullable: true })
  standaloneAdressId?: number;

  @Field((type) => Invoice, { nullable: true })
  //@ts-ignore
  invoice?;

  @Field((type) => AdressSet, { nullable: true })
  standaloneAdress?: AdressSet;

  @Field((type) => [CartItem])
  items: CartItem[];

  @Field((type) => String)
  paymentTitle: string;

  @Field((type) => String)
  deliveryTitle: string;

  @Field((type) => OrderStatus)
  orderStatus: OrderStatus;
}

@ObjectType()
export class Invoice {
  @Field((type) => ID)
  id: number;

  @Field((type) => Int)
  orderId: number;

  @Field()
  inVoiceId: string;

  @Field()
  order: Order;
}