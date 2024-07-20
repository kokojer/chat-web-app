import { Module } from "@nestjs/common";

import { MessageResolver } from "./message.resolver";
import { MessageService } from "./message.service";
import { PrismaService } from "../prisma/prisma.service";
import { ChatService } from "../chat/chat.service";

@Module({
  providers: [MessageService, MessageResolver, ChatService, PrismaService],
  exports: [MessageService],
})
export class MessageModule {}
