import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

import { redisConfig } from './config/redis.config';
import { QUEUES } from './config/queues';

import { NotificationProducer } from './producers/notification.producer';
import { ChannelRouter } from './router/channel.router';

import { RealtimeProcessor } from './processors/realtime.processor';
import { PriorityProcessor } from './processors/priority.processor';
import { AsyncProcessor } from './processors/async.processor';
import { EmailModule } from 'src/common/email/email.module';

@Module({
  imports: [
    BullModule.forRoot({ connection: redisConfig }),
    BullModule.registerQueue(
      { name: QUEUES.REALTIME },
      { name: QUEUES.PRIORITY },
      { name: QUEUES.ASYNC },
    ),
    EmailModule,
  ],
  providers: [
    NotificationProducer,
    ChannelRouter,

    RealtimeProcessor,
    PriorityProcessor,
    AsyncProcessor,
  ],
  exports: [NotificationProducer],
})
export class JobsModule {}
