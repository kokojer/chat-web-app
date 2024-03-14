import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { LoginResponse } from "./dto/login-response";
import { LoginUserInput } from "./dto/login-user.input";
import { GqlAuthGuard } from "./guards/gql-auth.guard";
import { User } from "../user/user.model";
import { CreateUserInput } from "../user/dto/create-user.input";
import { FastifyReply, FastifyRequest } from "fastify";
import { v4 as uuid } from "uuid";

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  async login(
    @Args("loginUserInput") loginUserInput: LoginUserInput,
    @Context() { res, req }: { res: FastifyReply; req: FastifyRequest }
  ) {
    const tokenWithUser = await this.authService.login(loginUserInput);
    const sessionData = {
      User: {
        connect: {
          id: tokenWithUser.user.id,
        },
      },
      ip: req.ip,
      userAgent: req.headers["user-agent"],
      expiresIn: 2592000, // 30 days
      refreshToken: uuid(),
    };
    const session = await this.authService.createSession(sessionData);

    res.setCookie("refreshToken", session.refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: Number(session.expiresIn),
    });

    return tokenWithUser;
  }

  @Mutation(() => User)
  signup(@Args("signupUserInput") signupUserInput: CreateUserInput) {
    return this.authService.signup(signupUserInput);
  }
}
