import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { Injectable } from '@nestjs/common';

import {
  Priority,
  Channel,
  ChannelPayloadMap,
  JobData,
} from '../types/notification.types';

@Injectable()
export class NotificationProducer {
  constructor(
    @InjectQueue('realtime') private rtQ: Queue,
    @InjectQueue('priority') private prQ: Queue,
    @InjectQueue('async') private asQ: Queue,
  ) {}

  // Wrapper
  sendJob<C extends Channel>(
    priority: Priority,
    channel: C,
    payload: ChannelPayloadMap[C],
  ) {
    switch (priority) {
      case 'realtime':
        return this.sendRtqJob(channel, payload);

      case 'priority':
        return this.sendPrqJob(channel, payload);

      case 'async':
        return this.sendAsqJob(channel, payload);
    }
  }

  // Public methods
  sendRtqJob<C extends Channel>(channel: C, payload: ChannelPayloadMap[C]) {
    const data: JobData<C> = { channel, payload };
    return this.rtQ.add('notify', data, { priority: 1 });
  }

  sendPrqJob<C extends Channel>(channel: C, payload: ChannelPayloadMap[C]) {
    const data: JobData<C> = { channel, payload };
    return this.prQ.add('notify', data, { priority: 20 });
  }

  sendAsqJob<C extends Channel>(channel: C, payload: ChannelPayloadMap[C]) {
    const data: JobData<C> = { channel, payload };
    return this.asQ.add('notify', data, {
      priority: 80,
      attempts: 3,
      backoff: { type: 'exponential', delay: 3000 },
    });
  }
}
