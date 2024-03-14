import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { LoginUserInput } from "./dto/login-user.input";
import { UserService } from "../user/user.service";
import { User } from "../user/user.model";
import { Prisma, Refresh_session } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private prisma: PrismaService
  ) {}

  async validateUser(
    username: string,
    password: string
  ): Promise<Omit<User, "password">> {
    const user = await this.userService.getUser({ username });

    if (!user) throw new Error("User not found");

    const valid = user && (await bcrypt.compare(password, user?.password));

    if (!valid) throw new Error("Invalid password");

    const { password: _, ...result } = user;
    return result;
  }

  async createSession(
    data: Prisma.Refresh_sessionCreateInput
  ): Promise<Refresh_session> {
    return this.prisma.refresh_session.create({
      data,
    });
  }

  async login(loginUserInput: LoginUserInput) {
    const user = await this.userService.getUser({
      username: loginUserInput.username,
    });

    const { password, ...result } = user;

    return {
      access_token: this.jwtService.sign({
        username: user.username,
        sub: user.id,
      }),
      user: result,
    };
  }

  async signup(signupUserInput: User) {
    const user = await this.userService.getUser({
      username: signupUserInput.username,
    });

    if (user) {
      throw new Error("User already exists");
    }

    const password = await bcrypt.hash(signupUserInput.password, 10);

    return this.userService.createUser({
      ...signupUserInput,
      password,
    });
  }
}
