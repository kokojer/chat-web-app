import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";

import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { FastifyReply, FastifyRequest } from "fastify";
import { ConfigModule } from "@nestjs/config";
import configuration from "./config/configuration";
import { ChatModule } from "./chat/chat.module";
import { MessageModule } from "./message/message.module";
import { Context } from "graphql-ws";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    UserModule,
    AuthModule,
    ChatModule,
    MessageModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      context: (req: FastifyRequest, res: FastifyReply) => {
        return { req, res };
      },
      subscriptions: {
        "graphql-ws": {
          path: "/graphql",
        },
      },
      playground: {
        settings: {
          "request.credentials": "include",
        },
      },
    }),
  ],
})
export class AppModule {}
