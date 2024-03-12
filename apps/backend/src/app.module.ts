import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";

import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { FastifyReply, FastifyRequest } from "fastify";

@Module({
  imports: [
    UserModule,
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      context: (req: FastifyRequest, res: FastifyReply) => {
        return { req, res };
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
