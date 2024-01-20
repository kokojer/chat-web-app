import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { LoginUserInput } from "./dto/login-user.input";
import { UserService } from "../user/user.service";
import { User } from "../user/user.model";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
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
