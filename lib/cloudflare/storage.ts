import { AwsClient } from "aws4fetch";

export interface R2Config {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
}

export function createR2Client(config: R2Config) {
  return new AwsClient({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    service: "s3",
    region: "auto",
  });
}

export async function generatePresignedUploadUrl(
  client: AwsClient,
  config: R2Config,
  key: string,
  contentType: string,
  expiresSeconds = 900
): Promise<{ uploadUrl: string; key: string; expiresAt: number }> {
  const url = new URL(
    `https://${config.accountId}.r2.cloudflarestorage.com/${config.bucketName}/${key}`
  );

  const signed = await client.sign(
    new Request(url, {
      method: "PUT",
      headers: {
        "Content-Type": contentType,
      },
    }),
    {
      aws: {
        signQuery: true,
      },
    }
  );

  return {
    uploadUrl: signed.url,
    key,
    expiresAt: Date.now() + expiresSeconds * 1000,
  };
}

export async function verifyR2Object(bucket: R2Bucket, key: string) {
  const object = await bucket.head(key);
  if (!object) {
    return null;
  }
  return {
    key: object.key,
    size: object.size,
    etag: object.httpEtag,
    uploadedAt: object.uploaded,
  };
}
