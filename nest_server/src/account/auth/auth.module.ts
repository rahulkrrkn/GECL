import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { EmailModule } from 'src/common/email/email.module';
import { RedisModule } from 'src/common/redis/redis.module';
import { JobsModule } from 'src/jobs/jobs.module';

@Module({
  imports: [PrismaModule, EmailModule, RedisModule, JobsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
