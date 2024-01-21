import "reflect-metadata";
import { ObjectType, Field, ID, Int } from "type-graphql";
import { User } from "@prisma/client";

@ObjectType()
export class Image {
  @Field((type) => ID)
  id: number;

  @Field((type) => String)
  title: string;

  @Field((type) => String, { nullable: true })
  description: string | null;

  @Field((type) => String, { nullable: true })
  altString: string | null;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => String)
  source: string;

  @Field((type) => String, { nullable: true })
  refLink: string | null;

  @Field((type) => Boolean)
  isProfile: boolean;

  @Field((type) => Boolean)
  isCarousel: boolean;

}