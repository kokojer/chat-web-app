import { Field, Int, ObjectType } from "@nestjs/graphql";
import { DateTimeResolver } from "graphql-scalars";
import { User } from "../user/user.model";
import { Chat } from "../chat/chat.model";

@ObjectType()
export class Message {
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

  @Field(() => [MessageContent])
  MessageContent: MessageContent[];

  @Field(() => DateTimeResolver)
  createdAt: Date;

  @Field(() => DateTimeResolver)
  updatedAt: Date;
}

@ObjectType()
export class MessageContent {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  messageId: number;

  @Field(() => String)
  type: string;

  @Field(() => String)
  content: string;

  @Field(() => Message)
  Message: Message;

  @Field(() => DateTimeResolver)
  createdAt: Date;

  @Field(() => DateTimeResolver)
  updatedAt: Date;
}
