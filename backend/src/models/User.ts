import "reflect-metadata";
import { ObjectType, Field, ID, Int } from "type-graphql";
import { MaxLength, IsEmail } from "class-validator";
import { Image } from "./Image.js";
import { Issue } from "./Issue.js";
import { AdressSet } from "./AdressSet.js"; 

@ObjectType()
export class User {
  @Field((type) => ID)
  id: number;

  @Field((type) => Int)
  picId: number;

  @Field((type) => String) 
  activationLink: string | null;

  @Field((type) => Boolean)
  suspended: boolean;

  @Field((type) => Boolean)
  isActive: boolean;

  @Field((type) => String)
  @MaxLength(20)
  login: string;

  @Field((type) => String)
  @IsEmail()
  email: string;

  @Field((type) => String)
  name: string;

  @Field((type) => String)
  surname: string;

  @Field((type) => Int)
  points: number;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => [Image], { nullable: true })
  profilePics?: Image[] | null;

  @Field((type) => [AdressSet], { nullable: true })
  addressesSets?: AdressSet[] | null;

  @Field((type) => [Issue], { nullable: true })
  IssuesCreated?: Issue[] | null;

  @Field((type) => [Issue], { nullable: true })
  IssueHandled?: Issue[] | null;
}
