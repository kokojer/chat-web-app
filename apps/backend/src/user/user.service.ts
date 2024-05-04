import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async getUsersByOccurrences({ nameOrUsername }): Promise<User[]> {
    return this.prisma.client.user.findMany({
      where: {
        OR: [
          {
            username: {
              contains: nameOrUsername,
              mode: "insensitive",
            },
          },
          {
            firstName: {
              contains: nameOrUsername,
              mode: "insensitive",
            },
          },
          {
            lastName: {
              contains: nameOrUsername,
              mode: "insensitive",
            },
          },
          {
            AND: [
              {
                firstName: {
                  contains: nameOrUsername.split(" ")[0],
                  mode: "insensitive",
                },
              },
              {
                lastName: {
                  contains: nameOrUsername.split(" ")[1],
                  mode: "insensitive",
                },
              },
            ],
          },
        ],
      },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
