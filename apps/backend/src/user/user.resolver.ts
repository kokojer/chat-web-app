import { Args, Context, Int, Mutation, Query, Resolver } from "@nestjs/graphql";

import { UserService } from "./user.service";
import { User } from "./user.model";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CONTENT_TYPES } from "../config/imageTypes";
import { FastifyRequest } from "fastify";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async getUser(@Args("id", { type: () => Int }) id: number) {
    return this.userService.getUser({ id });
  }

  @Query(() => [User])
  @UseGuards(JwtAuthGuard)
  async getUsersByOccurrences(
    @Args("nameOrUsername", { type: () => String })
    nameOrUsername: string,
    @Args("page", { type: () => Int })
    page: number,
  ) {
    return this.userService.getUsersByOccurrences({ nameOrUsername, page });
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async addUserImage(
    @Args({ name: "base64Image", type: () => String }) base64Image: string,
    @Args({ name: "fileType", type: () => String }) fileType: CONTENT_TYPES,
    @Context() { req }: { req: FastifyRequest },
  ) {
    return this.userService.addUserImage(
      base64Image,
      fileType,
      req.cookies.refreshToken,
    );
  }

  @Mutation(() => Boolean, {
    nullable: true,
    description: "Always return null",
  })
  @UseGuards(JwtAuthGuard)
  async deleteUserImage(@Context() { req }: { req: FastifyRequest }) {
    return this.userService.deleteUserImage(req.cookies.refreshToken);
  }
}
