import { describe, it, expect } from "vitest";
import { hashPasswordWebCrypto, verifyPasswordWebCrypto, generateSessionToken } from "@/lib/auth/crypto";
import { z } from "zod";
import { generatePresignedUploadUrl, createR2Client } from "@/lib/cloudflare/storage";

describe("Workstream E & L: WebCrypto Authentication & Security", () => {
  it("should securely hash a password using PBKDF2-SHA256 and verify matching credentials", async () => {
    const password = "SuperSecretSecurePassword!2026";
    const { hashHex, saltHex } = await hashPasswordWebCrypto(password);

    expect(hashHex).toBeDefined();
    expect(hashHex.length).toBe(64); // 256 bits = 64 hex chars
    expect(saltHex.length).toBe(32); // 16 bytes = 32 hex chars

    const isValid = await verifyPasswordWebCrypto(password, hashHex, saltHex);
    expect(isValid).toBe(true);

    const isInvalid = await verifyPasswordWebCrypto("WrongPassword123!", hashHex, saltHex);
    expect(isInvalid).toBe(false);
  });

  it("should generate random 256-bit session tokens and SHA-256 token hashes for database storage", async () => {
    const { rawToken, tokenHashHex } = await generateSessionToken();

    expect(rawToken.length).toBe(64); // 32 bytes in hex
    expect(tokenHashHex.length).toBe(64); // SHA-256 digest in hex
    expect(rawToken).not.toBe(tokenHashHex);
  });
});

describe("Workstream F: Zod Validation Foundation", () => {
  const Schema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    budgetBdt: z.number().positive(),
  });

  it("should accept valid payloads", () => {
    const result = Schema.safeParse({
      name: "Parvez",
      email: "test@projuktilabs.tech",
      budgetBdt: 50000,
    });
    expect(result.success).toBe(true);
  });

  it("should reject invalid payloads with structured issues", () => {
    const result = Schema.safeParse({
      name: "P",
      email: "not-an-email",
      budgetBdt: -100,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.length).toBe(3);
    }
  });
});

describe("Workstream D: Cloudflare R2 Presigned Upload URL Generation", () => {
  it("should generate valid S3-compatible presigned PUT upload URLs using aws4fetch", async () => {
    const config = {
      accountId: "test-account-id-12345",
      accessKeyId: "mockAccessKeyId",
      secretAccessKey: "mockSecretAccessKeyForTestingOnly",
      bucketName: "projukti-labs-assets",
    };
    const client = createR2Client(config);
    const key = "uploads/2026/test-image.webp";

    const { uploadUrl, key: returnedKey, expiresAt } = await generatePresignedUploadUrl(
      client,
      config,
      key,
      "image/webp",
      900
    );

    expect(returnedKey).toBe(key);
    expect(uploadUrl).toContain(`https://${config.accountId}.r2.cloudflarestorage.com/${config.bucketName}/${key}`);
    expect(uploadUrl).toContain("X-Amz-Signature");
    expect(uploadUrl).toContain("X-Amz-Algorithm=AWS4-HMAC-SHA256");
    expect(expiresAt).toBeGreaterThan(Date.now());
  });
});
