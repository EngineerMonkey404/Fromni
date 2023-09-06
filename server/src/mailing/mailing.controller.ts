import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ButtonsInterface } from '../types/buttons.interface';
import { MailingOptionsInterface } from '../types/mailing-options.interface';
import { MailingService } from './mailing.service';

@Controller('mailing')
export class MailingController {
  constructor(private readonly mailingService: MailingService) {}
  @Post()
  saveMailingOptions(@Body() mailingOptions: MailingOptionsInterface) {
    this.mailingService.saveMailingOptions(mailingOptions);
  }
  @Get('/:user')
  getMailingOptions(@Param('user') user: string) {
    return this.mailingService.getMailingOptions(user);
  }
}
