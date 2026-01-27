import { S3Client } from "@aws-sdk/client-s3";

export const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.GECL_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.GECL_R2_ACCESS_KEY as string,
    secretAccessKey: process.env.GECL_R2_SECRET_KEY as string,
  },
});
