import { Args, Int, Query, Resolver } from "@nestjs/graphql";

import { UserService } from "./user.service";
import { User } from "./user.model";

/**
 * Resolves user object type.
 */
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async getUser(@Args("id", { type: () => Int }) id: number) {
    return this.userService.getUser({ id });
  }
}
