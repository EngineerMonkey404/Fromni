import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class MessagesGateway {
  @SubscribeMessage('message')
  handleEvent(@MessageBody() data: string): string {
    return data;
  }

  @WebSocketServer()
  public server: Server;
}
