import { Injectable, Logger } from '@nestjs/common';
import { SmsPayload } from 'src/jobs/types/notification.types';

@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);

  async sendSms(data: SmsPayload): Promise<void> {
    // TODO: Integrate Twilio / AWS SNS here later
    this.logger.warn(`[MOCK] Sending SMS to ${data.to}: ${data.text}`);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
}
