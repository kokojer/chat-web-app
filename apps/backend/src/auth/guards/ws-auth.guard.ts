import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "../../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../../prisma/prisma.service";
import { ChatService } from "../../chat/chat.service";
import { GraphQLError } from "graphql/error";

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private chatService: ChatService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const args = ctx.getArgs();
    const req = ctx.getContext().req;

    const decodedData = this.jwtService.decode(
      req.connectionParams.authToken.split(" ")[1],
    );

    if (!decodedData.userId || !args.chatId) {
      throw new GraphQLError(`User or chat are invalid!`);
    }

    await this.chatService.checkIfHavePermissionToChat(
      decodedData.userId,
      args.chatId,
    );

    return true;
  }
}
