import { Field, Int, ObjectType } from "@nestjs/graphql";
import { DateTimeResolver } from "graphql-scalars";

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  avatar: string | null;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;

  @Field(() => DateTimeResolver, { nullable: true })
  lastVisitTime: Date;

  @Field(() => DateTimeResolver)
  createdAt: Date;

  @Field(() => DateTimeResolver)
  updatedAt: Date;
}
