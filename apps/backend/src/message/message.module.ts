import { Module } from "@nestjs/common";

import { MessageResolver } from "./message.resolver";
import { MessageService } from "./message.service";
import { PrismaService } from "../prisma/prisma.service";
import { ChatService } from "../chat/chat.service";
import { UserModule } from "../user/user.module";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Module({
  imports: [UserModule],
  providers: [
    MessageService,
    MessageResolver,
    ChatService,
    PrismaService,
    JwtAuthGuard,
  ],
  exports: [MessageService],
})
export class MessageModule {}
