import { Injectable } from '@nestjs/common';
import { MessageInterface } from '../types/message.interface';
import { InjectModel } from '@nestjs/sequelize';
import Message from '../models/Messages';
import { MessagesGateway } from './messages.gateway';
@Injectable()
export class MessagesService {
  constructor(private messagesGateway: MessagesGateway) {}
  postMessage(message: MessageInterface) {
    Message.create({
      text: message.text,
      user: message.user,
      messenger: message.messenger,
      buttons: message.buttons ?? [],
    });
    this.messagesGateway.server.emit('message', message);
  }

  getMessages(messenger: string) {
    return Message.findAll({ where: { messenger: messenger } });
  }

  async getLastMessages() {
    const messages = new Map();
    const m = await Promise.all([
      Message.findOne({
        where: { messenger: 'vk' },
        order: [['createdAt', 'DESC']],
      }),

      Message.findOne({
        where: { messenger: 'tg' },
        order: [['createdAt', 'DESC']],
      }),
      Message.findOne({
        where: { messenger: 'wa' },
        order: [['createdAt', 'DESC']],
      }),
      Message.findOne({
        where: { messenger: 'sms' },
        order: [['createdAt', 'DESC']],
      }),
    ]);

    return { vk: m[0], tg: m[1], wa: m[2], sms: m[3] };
  }
}
