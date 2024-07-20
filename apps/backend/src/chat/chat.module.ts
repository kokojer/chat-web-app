import { Module } from "@nestjs/common";

import { ChatResolver } from "./chat.resolver";
import { ChatService } from "./chat.service";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  providers: [ChatService, ChatResolver, PrismaService],
  exports: [ChatService],
})
export class ChatModule {}
