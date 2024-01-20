import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { LoginResponse } from "./dto/login-response";
import { LoginUserInput } from "./dto/login-user.input";
import { GqlAuthGuard } from "./guards/gql-auth.guard";
import { User } from "../user/user.model";
import { CreateUserInput } from "../user/dto/create-user.input";

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  async login(@Args("loginUserInput") loginUserInput: LoginUserInput) {
    return this.authService.login(loginUserInput);
  }

  @Mutation(() => User)
  signup(@Args("signupUserInput") signupUserInput: CreateUserInput) {
    return this.authService.signup(signupUserInput);
  }
}
