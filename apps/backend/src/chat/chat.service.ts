import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Chat, Message, Prisma } from "@prisma/client";
import { GraphQLError } from "graphql/error";
import { JwtService } from "@nestjs/jwt";

export type IncludedChat = Prisma.ChatGetPayload<{
  include: {
    ChatMembers: {
      include: {
        User: true;
      };
    };
  };
}>;

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async checkIfHavePermissionToChat(userId: number, chatId: number) {
    const chat = await this.prisma.chat.findUnique({
      include: {
        ChatMembers: {
          include: {
            User: true,
          },
        },
      },
      where: {
        id: chatId,
        ChatMembers: {
          some: {
            userId,
          },
        },
      },
    });

    if (!chat) {
      throw new GraphQLError(`You dont have permission to this chat!`);
    }
  }

  async checkIfUsersExists(userIds: number[]) {
    const users = await this.prisma.user.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
    });

    if (users.length !== userIds.length) {
      throw new GraphQLError(`Some user(s) were not found!`);
    }
  }

  async checkIfChatsExists(userIds: number[]) {
    const existingChats = await this.prisma.chat.findMany({
      where: {
        ChatMembers: {
          every: {
            userId: {
              in: userIds,
            },
          },
        },
      },
      include: {
        ChatMembers: true,
      },
    });

    if (existingChats.length > 0) {
      throw new GraphQLError(`Chat already exists!`);
    }
  }

  async createChat(userIds: number[]): Promise<IncludedChat> {
    if (userIds[0] === userIds[1]) throw new GraphQLError(`Users are same!`);
    if (userIds.length > 2) throw new GraphQLError(`Only personal chats!`);

    await this.checkIfUsersExists(userIds);
    await this.checkIfChatsExists(userIds);

    const chat = await this.prisma.chat.create({});

    await this.prisma.chatMembers.createMany({
      data: userIds.map((userId) => ({ userId, chatId: chat.id })),
    });

    return this.getChat(chat.id);
  }

  async getChat(id: number): Promise<IncludedChat> {
    const chat = await this.prisma.chat.findUnique({
      include: {
        ChatMembers: {
          include: {
            User: true,
          },
        },
      },
      where: {
        id,
      },
    });

    if (!chat) throw new GraphQLError(`Chat not found!`);

    return chat;
  }

  async getChatsForUser(userId: number): Promise<IncludedChat[]> {
    return this.prisma.chat.findMany({
      where: {
        ChatMembers: {
          some: {
            userId,
          },
        },
      },
      include: {
        ChatMembers: {
          include: {
            User: true,
          },
        },
      },
    });
  }
}
