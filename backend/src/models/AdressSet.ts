import "reflect-metadata";
import { ObjectType, Field, ID, Int } from "type-graphql";
import { MaxLength, IsUUID, IsEmail } from "class-validator";


@ObjectType()
export class AdressSet {
  @Field((type) => ID)
  id: number;

  @Field((type) => Int)
  ownerId: number;

  @Field((type) => String)
  city?: string;

  @Field((type) => String)
  county?: string;

  @Field((type) => String)
  street?: string;

  @Field((type) => Int)
  houseNumber?: number;

  @Field((type) => String)
  phoneNumber?: string;

  @Field((type) => String)
  postalCode?: string;

  @Field((type) => String)
  nip?: string;

  @Field((type) => String)
  companyName?: string;

  @Field((type) => Boolean)
  isTemporary: boolean;
}