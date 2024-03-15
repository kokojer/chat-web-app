import { PassportModule } from "@nestjs/passport";
import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthResolver } from "./auth.resolver";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: "15min" },
      secret: process.env.SECRET_KEY,
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    LocalStrategy,
    JwtStrategy,
    PrismaService,
  ],
})
export class AuthModule {}
