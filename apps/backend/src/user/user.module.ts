import { Module } from "@nestjs/common";

import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";
import { PrismaService } from "../prisma/prisma.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Module({
  providers: [UserService, UserResolver, PrismaService, JwtAuthGuard],
  exports: [UserService],
})
export class UserModule {}
