import { Module } from "@nestjs/common";

import { ChatResolver } from "./chat.resolver";
import { ChatService } from "./chat.service";
import { PrismaService } from "../prisma/prisma.service";
import { UserModule } from "../user/user.module";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Module({
  imports: [UserModule],
  providers: [ChatService, ChatResolver, PrismaService, JwtAuthGuard],
  exports: [ChatService],
})
export class ChatModule {}
