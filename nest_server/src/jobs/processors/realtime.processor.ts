import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { ChannelRouter } from '../router/channel.router';
import { JobData } from '../types/notification.types';

@Processor('realtime')
export class RealtimeProcessor extends WorkerHost {
  constructor(private router: ChannelRouter) {
    super();
  }

  async process(job: Job<JobData>) {
    await this.router.send(job.data.channel, job.data.payload);
  }
}
