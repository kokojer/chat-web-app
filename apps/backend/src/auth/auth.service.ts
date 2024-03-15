import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { LoginUserInput } from "./dto/login-user.input";
import { UserService } from "../user/user.service";
import { User } from "../user/user.model";
import { Prisma, Refresh_session } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserInput } from "../user/dto/create-user.input";
import { v4 as uuid } from "uuid";
import { FastifyReply, FastifyRequest } from "fastify";
import { GraphQLError } from "graphql/error";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<User, "password">> {
    const user = await this.userService.getUser({ username });

    if (!user) throw new Error("User not found");

    const valid = user && (await bcrypt.compare(password, user?.password));

    if (!valid) throw new Error("Invalid password");

    const { password: _, ...result } = user;
    return result;
  }

  async createSession(
    data: Prisma.Refresh_sessionCreateInput,
  ): Promise<Refresh_session> {
    return this.prisma.refresh_session.create({
      data,
    });
  }

  async getSession(refreshToken: string): Promise<Refresh_session> {
    return this.prisma.refresh_session.findFirst({
      where: {
        refreshToken,
      },
    });
  }

  async deleteSession(id: number): Promise<Refresh_session> {
    return this.prisma.refresh_session.delete({
      where: {
        id,
      },
    });
  }

  async login(
    loginUserInput: LoginUserInput,
    req: FastifyRequest,
    res: FastifyReply,
  ) {
    const user = await this.userService.getUser({
      username: loginUserInput.username,
    });

    const { password, ...result } = user;

    const tokenWithUser = {
      access_token: this.jwtService.sign({
        username: user.username,
        userId: user.id,
      }),
      user: result,
    };

    const sessionData = {
      User: {
        connect: {
          id: tokenWithUser.user.id,
        },
      },
      ip: req.ip,
      userAgent: req.headers["user-agent"],
      expiresIn: 2592000, // 30 days
      refreshToken: uuid(),
    };
    const session = await this.createSession(sessionData);

    res.setCookie("refreshToken", session.refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: Number(session.expiresIn),
    });

    return tokenWithUser;
  }

  async signup(
    signupUserInput: CreateUserInput,
    req: FastifyRequest,
    res: FastifyReply,
  ) {
    const user = await this.userService.getUser({
      username: signupUserInput.username,
    });

    if (user) {
      throw new GraphQLError("User already exists", {
        extensions: { code: 409 },
      });
    }

    const password = await bcrypt.hash(signupUserInput.password, 10);

    const createdUser = await this.userService.createUser({
      ...signupUserInput,
      password,
    });

    return this.login(createdUser, req, res);
  }

  async refreshTokens(req: FastifyRequest, res: FastifyReply) {
    const session = await this.getSession(req.cookies.refreshToken);
    if (!session) {
      throw new GraphQLError("INVALID_REFRESH_SESSION", {
        extensions: { code: 401 },
      });
    }

    await this.deleteSession(session.id);

    const expiresInMilliseconds = Number(session.expiresIn) * 1000;
    if (+session.createdAt + expiresInMilliseconds < +new Date()) {
      throw new GraphQLError("TOKEN_EXPIRED", {
        extensions: { code: 401 },
      });
    }

    const sessionData = {
      User: {
        connect: {
          id: session.userId,
        },
      },
      ip: req.ip,
      userAgent: req.headers["user-agent"],
      expiresIn: 2592000, // 30 days
      refreshToken: uuid(),
    };

    const newSession = await this.createSession(sessionData);

    res.setCookie("refreshToken", newSession.refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: Number(newSession.expiresIn),
    });

    const user = await this.userService.getUser({
      id: newSession.userId,
    });

    const { password, ...result } = user;

    return {
      access_token: this.jwtService.sign({
        username: user.username,
        userId: user.id,
      }),
      user: result,
    };
  }
}
