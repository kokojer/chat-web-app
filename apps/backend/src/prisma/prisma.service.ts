import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

const createPrismaClient = () => {
  const client = new PrismaClient();

  return client.$extends({
    result: {
      user: {
        fullName: {
          needs: { firstName: true, lastName: true },
          compute(user) {
            return `${user.firstName} ${user.lastName}`;
          },
        },
      },
    },
  });
};

type ExtendedPrismaClient = ReturnType<typeof createPrismaClient>;

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  public client!: ExtendedPrismaClient;

  async onModuleInit() {
    this.client = createPrismaClient();
    await this.client.$connect();
  }
}
