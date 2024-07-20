import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class CreateMessageInput {
  @Field(() => Int)
  chatId: number;

  @Field(() => String)
  text: string;
}
