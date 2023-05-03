import "reflect-metadata";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  FieldResolver,
  Root,
  Int,
  InputType,
  Field,
  Subscription,
  Args,
  PubSub,
  PubSubEngine,
  ID,
  UseMiddleware,
  ArgsDictionary,
} from "type-graphql";
import { type Context } from "../context.js";
import { User } from "../models/User.js";

@Resolver(User)
export class UserResolver {
 
  @Query((returns) => Boolean)
  async test(
    @Ctx() ctx: Context
  ) {
    return true;
  }
}