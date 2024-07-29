import { ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "../../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private jwtService: JwtService) {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    // @NOTE: Прокидываю токен при подключении по вебсокетам
    if (req.connectionParams?.authToken) {
      return {
        ...req,
        headers: {
          authorization: req.connectionParams.authToken,
        },
      };
    }
    return ctx.getContext().req;
  }
}
