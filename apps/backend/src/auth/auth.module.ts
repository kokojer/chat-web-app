import { PassportModule } from "@nestjs/passport";
import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthResolver } from "./auth.resolver";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: "8h" },
      secret: process.env.SECRET_KEY,
    }),
  ],
  providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
