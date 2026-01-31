import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { EmailConfigService } from './email.config';
import { EmailService } from './email.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    ConfigModule,

    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useClass: EmailConfigService,
    }),
    PrismaModule,
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
