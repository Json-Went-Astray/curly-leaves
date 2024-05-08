import "reflect-metadata";
import { ObjectType, Field, ID, Int } from "type-graphql";
import { MaxLength, IsUUID, IsEmail } from "class-validator";


@ObjectType()
export class AdressSet {
  @Field((type) => ID)
  id: number;

  @Field((type) => Int)
  ownerId: number;

  @Field((type) => String, { nullable: true })
  city?: string | null;
  
  @Field((type) => String, { nullable: true })
  county?: string | null;
  
  @Field((type) => String, { nullable: true })
  street?: string | null;
  
  @Field((type) => Int, { nullable: true })
  houseNumber?: number | null;
  
  @Field((type) => String, { nullable: true })
  phoneNumber?: string | null;
  
  @Field((type) => String, { nullable: true })
  postalCode?: string | null;
  
  @Field((type) => String, { nullable: true })
  nip?: string | null;
  
  @Field((type) => String, { nullable: true })
  companyName?: string | null;

  @Field((type) => Boolean)
  isTemporary: boolean;
}