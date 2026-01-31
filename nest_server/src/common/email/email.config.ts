import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

@Injectable()
export class EmailConfigService implements MailerOptionsFactory {
  constructor(private configService: ConfigService) {}

  createMailerOptions(): MailerOptions {
    return {
      transport: {
        host: this.configService.get('GECL_EMAIL_HOST'),
        port: Number(this.configService.get('GECL_EMAIL_PORT')),
        secure: this.configService.get('GECL_EMAIL_SECURE') === 'true',
        auth: {
          user: this.configService.get('GECL_EMAIL_USER'),
          pass: this.configService.get('GECL_EMAIL_PASS'),
        },
      },
      defaults: {
        from: `"No Reply" <${this.configService.get('GECL_EMAIL_FROM_EMAIL')}>`,
      },
      template: {
        dir: join(process.cwd(), 'src/common/email/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    };
  }
}
