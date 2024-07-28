import { Args, Context, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ChatService } from "./chat.service";
import { Chat } from "./chat.model";
import { FastifyRequest } from "fastify";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { UseGuards } from "@nestjs/common";

@Resolver(() => Chat)
export class ChatResolver {
  constructor(private chatService: ChatService) {}

  @Mutation(() => Chat)
  @UseGuards(JwtAuthGuard)
  async createChat(
    @Args("userId", { type: () => Int }) userId: number,
    @Context() { req }: { req: FastifyRequest },
  ) {
    return await this.chatService.createChat(req.user.userId, userId);
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
