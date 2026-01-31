import { RedisOptions } from 'ioredis';

export const redisConfig: RedisOptions = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: Number(process.env.REDIS_PORT || 6379),
  password: process.env.REDIS_PASSWORD || undefined,

  // BullMQ requirement: must be null so it fails fast on connection issues
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
};
