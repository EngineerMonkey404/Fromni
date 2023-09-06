import { Module } from '@nestjs/common';
import { MailingController } from './mailing.controller';
import { MailingService } from './mailing.service';
import Mailing from '../models/Mailing';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Mailing])],
  controllers: [MailingController],
  providers: [MailingService],
})
export class MailingModule {}
