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
    @Context() { req, res }: { req: FastifyRequest; res: FastifyReply },
  ) {
    return await this.authService.login(loginUserInput, req, res);
  }

  @Mutation(() => LoginResponse)
  signup(
    @Args("signupUserInput") signupUserInput: CreateUserInput,
    @Context() { req, res }: { req: FastifyRequest; res: FastifyReply },
  ) {
    return this.authService.signup(signupUserInput, req, res);
  }

  @Mutation(() => LoginResponse)
  refreshTokens(
    @Context() { req, res }: { req: FastifyRequest; res: FastifyReply },
  ) {
    return this.authService.refreshTokens(req, res);
  }
}
