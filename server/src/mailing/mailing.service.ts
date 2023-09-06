import { Injectable } from '@nestjs/common';
import Mailing from '../models/Mailing';
import { MailingOptionsInterface } from '../types/mailing-options.interface';
@Injectable()
export class MailingService {
  async saveMailingOptions(mailingOptions: MailingOptionsInterface) {
    const model = await Mailing.findOne({
      where: { user: mailingOptions.user },
    });
    if (model) {
      await Mailing.update(
        {
          buttons: mailingOptions.buttons,
          user: mailingOptions.user,
          messages: mailingOptions.messages,
        },
        { where: { user: mailingOptions.user } },
      );
    } else {
      await Mailing.create({
        buttons: mailingOptions.buttons,
        user: mailingOptions.user,
        messages: mailingOptions.messages,
      });
    }
  }
  async getMailingOptions(user: string) {
    return (
      (await Mailing.findOne({ where: { user: user } })) ?? {
        buttons: {
          vk: { inlineStyle: false, inlineButtons: [], defaultButtons: [] },
          tg: { inlineStyle: false, inlineButtons: [], defaultButtons: [] },
          wa: { inlineStyle: false, inlineButtons: [], defaultButtons: [] },
          sms: { inlineStyle: false, inlineButtons: [], defaultButtons: [] },
        },
        user: '',
        messages: { vk: '', tg: '', wa: '', sms: '' },
      }
    );
  }
}
