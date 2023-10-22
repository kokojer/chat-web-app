import { ChatService } from "../services/chat.service";
export declare class ChatController {
    private readonly appService;
    constructor(appService: ChatService);
    getHello(): string;
}
