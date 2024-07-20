import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "../user/user.model";

@ObjectType()
export class Chat {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  type: string;

  @Field(() => [ChatMembers])
  ChatMembers: ChatMembers[];
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
}
