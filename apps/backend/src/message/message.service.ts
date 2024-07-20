import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Message, Prisma } from "@prisma/client";
import { ChatService } from "../chat/chat.service";
import { CreateMessageInput } from "./dto/create-message.input";
import { GraphQLError } from "graphql/error";

@Injectable()
export class MessageService {
  constructor(
    private prisma: PrismaService,
    private chatService: ChatService,
  ) {}

  async createMessage(
    userId: number,
    { chatId, text }: CreateMessageInput,
  ): Promise<Message> {
    await this.chatService.checkIfUsersExists([userId]);
    await this.chatService.getChat(chatId);

    return this.prisma.message.create({
      data: {
        userId,
        chatId,
        MessageContent: {
          create: {
            type: "text",
            content: text,
          },
        },
      },
    });
  }
}
