import { Injectable, Logger } from '@nestjs/common';
import { PushPayload } from 'src/jobs/types/notification.types';

@Injectable()
export class PushService {
  private readonly logger = new Logger(PushService.name);

  async sendPush(data: PushPayload): Promise<void> {
    // TODO: Integrate Firebase (FCM) / OneSignal here later
    this.logger.warn(
      `[MOCK] Sending Push to User ${data.userId}: ${data.title}`,
    );

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
}
