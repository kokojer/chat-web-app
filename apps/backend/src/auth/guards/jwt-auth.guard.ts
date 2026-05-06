import { ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "../../user/user.service";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private userService: UserService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivate = await super.canActivate(context);

    if (!canActivate) return false;

    const req = this.getRequest(context);
    if (req.user?.userId) {
      await this.userService.updateLastVisitTime(req.user.userId);
    }

    return true;
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
