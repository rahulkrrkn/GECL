import { S3Client } from '@aws-sdk/client-s3';
import * as dotenv from 'dotenv';

dotenv.config();

// ✅ Validate env early
const requiredEnv = [
  'GECL_R2_ACCOUNT_ID',
  'GECL_R2_ACCESS_KEY',
  'GECL_R2_SECRET_KEY',
  'GECL_R2_BUCKET_NAME',
];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing ENV: ${key}`);
  }
}

export const R2_CONFIG = {
  accountId: process.env.GECL_R2_ACCOUNT_ID!,
  accessKey: process.env.GECL_R2_ACCESS_KEY!,
  secretKey: process.env.GECL_R2_SECRET_KEY!,
  bucket: process.env.GECL_R2_BUCKET_NAME!,
  publicUrl: process.env.GECL_R2_PUBLIC_URL || '',
};

// ✅ Single R2 client instance
export const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${R2_CONFIG.accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_CONFIG.accessKey,
    secretAccessKey: R2_CONFIG.secretKey,
  },
});
