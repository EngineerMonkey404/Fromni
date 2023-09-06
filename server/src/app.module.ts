import { Module } from '@nestjs/common';
import { SequelizeConfigService } from './config/database.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { MessagesModule } from './messages/messages.module';
import { MailingModule } from './mailing/mailing.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env`,
      isGlobal: true,
    }),

    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: SequelizeConfigService,
      inject: [ConfigService],
    }),

    MessagesModule,

    MailingModule,
  ],
  providers: [SequelizeConfigService],
  controllers: [],
})
export class AppModule {}
