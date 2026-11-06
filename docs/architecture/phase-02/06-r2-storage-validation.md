# 06 — Cloudflare R2 Storage Validation Report

**Storage:** Cloudflare R2 Object Storage (`projukti-labs-assets`)  
**Signing Library:** `aws4fetch@1.0.20`  
**Execution Context:** Cloudflare Worker / Web Crypto API (`crypto.subtle`)  

---

## 1. Storage Architecture

The verified upload flow satisfies the strict zero-Worker-memory boundary:
1. Browser requests upload authorization from `/api/v1/admin/media/upload-url`.
2. Worker generates a presigned S3-compatible `PUT` URL using `aws4fetch`.
3. Browser streams binary asset directly to R2.
4. Worker verifies upload completion using `await env.R2_BUCKET.head(key)`.
5. Metadata record is created in D1.

---

## 2. Implementation (`lib/cloudflare/storage.ts`)

- `createR2Client(config)`: Initializes lightweight `AwsClient` targeting `s3` service and `auto` region.
- `generatePresignedUploadUrl(client, config, key, contentType, expiresSeconds)`:
  - Generates presigned URL using standard `fetch` Request signing.
  - Generates query-string signed `PUT` request with `X-Amz-Signature` and configurable TTL (default 15 minutes).
- `verifyR2Object(bucket, key)`:
  - Checks object existence, exact size in bytes, and ETag via native R2 binding.

---

## 3. Unit Test Verification (`tests/unit/foundation.test.ts`)

- Verified that presigned URLs contain valid `X-Amz-Algorithm=AWS4-HMAC-SHA256` query parameters.
- Verified that signature generation operates purely on Web Crypto API without invoking Node.js `fs` or native crypto modules.
- Test passed in 15ms.

