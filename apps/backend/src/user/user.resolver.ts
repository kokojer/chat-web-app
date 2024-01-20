import { Args, Int, Query, Resolver } from "@nestjs/graphql";

import { UserService } from "./user.service";
import { User } from "./user.model";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

/**
 * Resolves user object type.
 */
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async getUser(@Args("id", { type: () => Int }) id: number) {
    return this.userService.getUser({ id });
  }
}
