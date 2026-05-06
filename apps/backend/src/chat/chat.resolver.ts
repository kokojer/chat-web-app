import {
  Args,
  Context,
  Int,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from "@nestjs/graphql";
import { ChatService } from "./chat.service";
import { Chat } from "./chat.model";
import { FastifyRequest } from "fastify";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { UnauthorizedException, UseGuards } from "@nestjs/common";
import { WsAuthGuard } from "../auth/guards/ws-auth.guard";
import { pubSub } from "../config/pubSub";

@Resolver(() => Chat)
export class ChatResolver {
  constructor(private chatService: ChatService) {}

  @Subscription(() => Chat, {
    filter: (payload, variables) =>
      payload.chatUpdated.ChatMembers.some(
        (member) => member.userId === variables.userId,
      ),
  })
  @UseGuards(JwtAuthGuard)
  @UseGuards(WsAuthGuard)
  async chatUpdated(@Args("userId", { type: () => Int }) userId: number) {
    return pubSub.asyncIterator("chatUpdated");
  }

  @Mutation(() => Chat)
  @UseGuards(JwtAuthGuard)
  async createChat(
    @Args("userId", { type: () => Int }) userId: number,
    @Context() { req }: { req: FastifyRequest },
  ) {
    const chat = await this.chatService.createChat(req.user.userId, userId);

    await pubSub.publish("chatUpdated", {
      chatUpdated: chat,
    });

    return chat;
  }

  @Query(() => Chat)
  @UseGuards(JwtAuthGuard)
  async getChat(
    @Args("id", { type: () => Int }) id: number,
    @Context() { req }: { req: FastifyRequest },
  ) {
    await this.chatService.checkIfHavePermissionToChat(req.user.userId, id);

    return await this.chatService.getChat(id);
  }

  @Query(() => [Chat])
  @UseGuards(JwtAuthGuard)
  async getChatsForUser(
    @Args("userId", { type: () => Int }) userId: number,
    @Args("page", { type: () => Int }) page: number,
    @Context() { req }: { req: FastifyRequest },
  ) {
    if (req.user.userId !== userId) {
      throw new UnauthorizedException("You can only get your own chats!");
    }

    return await this.chatService.getChatsForUser(userId);
  }
}
