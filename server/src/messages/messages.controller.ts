import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageInterface } from '../types/message.interface';

@Controller()
export class MessagesController {
  constructor(private readonly messageService: MessagesService) {}
  @Post('/message')
  postMessage(@Body() message: MessageInterface) {
    this.messageService.postMessage(message);
  }

  @Get(`/message/:messenger`)
  getMessages(@Param('messenger') messenger: string) {
    return this.messageService.getMessages(messenger);
  }

  @Get('/last-messages')
  getLastMessages() {
    return this.messageService.getLastMessages();
  }
}
