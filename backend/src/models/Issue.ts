import "reflect-metadata";
import { ObjectType, Field, ID, Int } from "type-graphql";
import { User } from "./User.js";

@ObjectType()
export class Issue {
  @Field((type) => ID)
  id: number;

  @Field((type) => String)
  title: string;

  @Field((type) => String)
  content: string;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  endedAt: Date;

  @Field((type) => Int)
  rating: number;

  @Field((type) => User)
  createdBy?: User | null;

  @Field((type) => User)
  handledBy?: User | null;
}










