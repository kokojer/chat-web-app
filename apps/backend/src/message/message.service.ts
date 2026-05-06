import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Message, Prisma } from "@prisma/client";
import { ChatService } from "../chat/chat.service";
import { CreateMessageInput } from "./dto/create-message.input";

const countToTake = 50;

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
    await this.chatService.checkIfHavePermissionToChat(userId, chatId);

    const [message] = await this.prisma.$transaction([
      this.prisma.message.create({
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
        include: {
          MessageContent: true,
        },
      }),
      this.prisma.chat.update({
        where: {
          id: chatId,
        },
        data: {
          updatedAt: new Date(),
        },
      }),
    ]);

    return message;
  }

  async getChatMessages(chatId: number, page: number): Promise<Message[]> {
    await this.chatService.getChat(chatId);

    return this.prisma.message.findMany({
      skip: (page - 1) * countToTake,
      take: countToTake,
      where: {
        chatId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        MessageContent: true,
      },
    });
  }
}
