import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ChatService } from "./chat.service";
import { Chat } from "./chat.model";

@Resolver(() => Chat)
export class ChatResolver {
  constructor(private chatService: ChatService) {}

  @Mutation(() => Chat)
  // @UseGuards(JwtAuthGuard)
  async createChat(@Args("userIds", { type: () => [Int] }) userIds: number[]) {
    return await this.chatService.createChat(userIds);
  }

  @Query(() => Chat)
  // @UseGuards(JwtAuthGuard)
  async getChat(@Args("id", { type: () => Int }) id: number) {
    return await this.chatService.getChat(id);
  }
  @Query(() => [Chat])
  // @UseGuards(JwtAuthGuard)
  async getChatsForUser(@Args("userId", { type: () => Int }) userId: number) {
    return await this.chatService.getChatsForUser(userId);
  }
}
