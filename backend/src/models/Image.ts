import "reflect-metadata";
import { ObjectType, Field, ID, Int } from "type-graphql";
import { User } from "@prisma/client";

@ObjectType()
export class Image {
  @Field((type) => ID)
  id: number;

  @Field((type) => String)
  title: string;

  @Field((type) => String)
  description: string;

  @Field((type) => String)
  altString: string;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => String)
  source: string;

  @Field((type) => String)
  refLink: string;

}