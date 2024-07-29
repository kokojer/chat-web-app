import {
  Args,
  Context,
  Int,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from "@nestjs/graphql";
import { MessageService } from "./message.service";
import { Message } from "./message.model";
import { pubSub } from "../config/pubSub";
import { CreateMessageInput } from "./dto/create-message.input";
import { UnauthorizedException, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { FastifyRequest } from "fastify";
import { ChatService } from "../chat/chat.service";
import { JwtService } from "@nestjs/jwt";
import { WsAuthGuard } from "../auth/guards/ws-auth.guard";
import { User } from "../user/user.model";

@Resolver(() => Message)
export class MessageResolver {
  constructor(
    private messageService: MessageService,
    private chatService: ChatService,
  ) {}

  @Subscription(() => Message, {
    filter: (payload, variables) =>
      payload.messageAdded.chatId === variables.chatId,
  })
  @UseGuards(JwtAuthGuard)
  @UseGuards(WsAuthGuard)
  async messageAdded(@Args("chatId", { type: () => Int }) chatId: number) {
    return pubSub.asyncIterator(`messageAdded_${chatId}`);
  }

  @Mutation(() => Message)
  @UseGuards(JwtAuthGuard)
  async addMessage(
    @Args("createMessageInput") createMessageInput: CreateMessageInput,
    @Context() { req }: { req: FastifyRequest },
  ) {
    if (!req.user.userId) throw new UnauthorizedException("userId not found!");
    const newMessage = await this.messageService.createMessage(
      req.user.userId,
      createMessageInput,
    );

    await pubSub.publish(`messageAdded_${newMessage.chatId}`, {
      messageAdded: newMessage,
    });

    return newMessage;
  }

  @Query(() => [Message])
  @UseGuards(JwtAuthGuard)
  async getChatMessages(
    @Args("chatId", { type: () => Int })
    chatId: number,
    @Args("page", { type: () => Int })
    page: number,
    @Context() { req }: { req: FastifyRequest },
  ) {
    await this.chatService.checkIfHavePermissionToChat(req.user.userId, chatId);

    return this.messageService.getChatMessages(chatId, page);
  }
}
