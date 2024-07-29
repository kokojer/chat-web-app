import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "../user/user.model";
import { Message } from "../message/message.model";
import { DateTimeResolver } from "graphql-scalars";

@ObjectType()
export class Chat {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  type: string;

  @Field(() => [ChatMembers])
  ChatMembers: ChatMembers[];

  @Field(() => [Message])
  Message: Message[];

  @Field(() => DateTimeResolver)
  createdAt: Date;

  @Field(() => DateTimeResolver)
  updatedAt: Date;
}

@ObjectType()
export class ChatMembers {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  chatId: number;

  @Field(() => Int)
  userId: number;

  @Field(() => Chat)
  Chat: Chat;

  @Field(() => User)
  User: User;

  @Field(() => DateTimeResolver)
  createdAt: Date;

  @Field(() => DateTimeResolver)
  updatedAt: Date;
}
