import { Injectable } from '@nestjs/common';
import { Channel, ChannelPayloadMap } from '../types/notification.types';

import { EmailService } from 'src/common/email/email.service';

@Injectable()
export class ChannelRouter {
  constructor(private readonly emailService: EmailService) {}

  async send<C extends Channel>(channel: C, payload: ChannelPayloadMap[C]) {
    const handlers = {
      email: (data: ChannelPayloadMap['email']) =>
        this.emailService.sendEmail(data),

      sms: async () => {
        console.log('SMS not implemented yet');
      },

      push: async () => {
        console.log('Push not implemented yet');
      },
    };

    await handlers[channel](payload as any);
  }
}
