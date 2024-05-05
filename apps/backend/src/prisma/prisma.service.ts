import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { ConfigService } from "@nestjs/config";
const urlJoin = require("url-join");

type ExtendedPrismaClient = ReturnType<typeof createPrismaClient>;

const createPrismaClient = (endpoint: string, bucketName: string) => {
  const client = new PrismaClient();

  return client.$extends({
    result: {
      user: {
        avatar: {
          needs: { avatar: true },
          compute({ avatar }) {
            return avatar ? urlJoin(endpoint, bucketName, avatar) : avatar;
          },
        },
      },
    },
  });
};

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  public client!: ExtendedPrismaClient;
  constructor(private configService: ConfigService) {
    super();
  }

  async onModuleInit() {
    const bucketName = this.configService.get<string>("bucketName");
    const globalEndpoint = this.configService.get<string>("globalEndpoint");

    this.client = createPrismaClient(globalEndpoint, bucketName);
    await this.client.$connect();
  }
}
