import { Controller, Get } from "@nestjs/common";
import { ChatService } from "../services/chat.service";

@Controller()
export class ChatController {
  constructor(private readonly appService: ChatService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
