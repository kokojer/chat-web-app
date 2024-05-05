import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
  S3ClientConfig,
} from "@aws-sdk/client-s3";
import { ConfigService } from "@nestjs/config";
import { CONTENT_TYPES, IMAGE_TYPES } from "../config/imageTypes";
import { v4 as uuid } from "uuid";
import { GraphQLError } from "graphql/error";
const urlJoin = require("url-join");

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}
  async getUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.client.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async getUsersByOccurrences({ nameOrUsername }): Promise<User[]> {
    const itsLogin = nameOrUsername.startsWith("@");
    const where: Prisma.UserWhereInput = itsLogin
      ? {
          username: {
            contains: nameOrUsername.slice(1),
            mode: "insensitive",
          },
        }
      : {
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
        };
    return this.prisma.client.user.findMany({ where });
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

  async addUserImage(
    base64Image: string,
    fileType: CONTENT_TYPES,
    refreshToken: string,
  ) {
    const config: S3ClientConfig = this.configService.get("s3Config");
    const bucketName = this.configService.get<string>("bucketName");
    const globalEndpoint = this.configService.get<string>("globalEndpoint");

    const clearedBase64 = base64Image.replace(/^data:image\/.+;base64,/, "");
    const client = new S3Client(config);
    const imageKey = `${uuid()}.${IMAGE_TYPES[fileType]}`;

    const command = new PutObjectCommand({
      Body: Buffer.from(clearedBase64, "base64"),
      ContentEncoding: "base64",
      ContentType: fileType,
      Bucket: bucketName,
      Key: imageKey,
    });

    await client.send(command).catch((err) => {
      throw new GraphQLError("Error when saving image!");
    });

    const user = await this.prisma.user.findFirst({
      where: {
        Refresh_session: {
          some: {
            refreshToken: refreshToken,
          },
        },
      },
    });

    await this.updateUser({
      where: { id: user.id },
      data: { avatar: imageKey },
    });

    return urlJoin(globalEndpoint, bucketName, imageKey);
  }

  async deleteUserImage(refreshToken: string) {
    const config: S3ClientConfig = this.configService.get("s3Config");
    const bucketName = this.configService.get<string>("bucketName");

    const user = await this.prisma.user.findFirst({
      where: {
        Refresh_session: {
          some: {
            refreshToken: refreshToken,
          },
        },
      },
    });

    const client = new S3Client(config);
    const imageKey = user.avatar;

    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: imageKey,
    });

    await client.send(command).catch((err) => {
      throw new GraphQLError("Error when deleting image!");
    });

    await this.updateUser({
      where: { id: user.id },
      data: { avatar: null },
    });

    return null;
  }
}
