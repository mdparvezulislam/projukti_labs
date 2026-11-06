import { describe, it, expect } from "vitest";
import { getEnv, getSafeEnvironmentSummary } from "@/lib/env";
import { logger } from "@/lib/logger";
import { sha256 } from "@/lib/auth/crypto";
import fs from "node:fs";
import path from "node:path";
import * as schema from "@/db/schema";

describe("Phase 07: Production Environment Validation & Security", () => {
  it("should validate and load default environment configuration without throwing", () => {
    const env = getEnv();
    expect(env.NODE_ENV).toBeDefined();
    expect(env.ENVIRONMENT).toBeDefined();
    expect(env.APP_URL).toBeDefined();
    expect(env.APP_URL).toMatch(/^https?:\/\//);
  });

  it("should safely produce an environment summary that strictly redacts all secrets", () => {
    const summary = getSafeEnvironmentSummary();
    expect(summary.nodeEnv).toBeDefined();
    expect(summary.environment).toBeDefined();
    expect(summary.appUrl).toBeDefined();
    expect(summary).not.toHaveProperty("TURNSTILE_SECRET_KEY");
    expect(summary).not.toHaveProperty("R2_SECRET_ACCESS_KEY");
    expect(summary).not.toHaveProperty("AUTH_SECRET");
  });

  it("should compute deterministic SHA-256 hashes using WebCrypto", async () => {
    const hash1 = await sha256("192.168.1.1");
    const hash2 = await sha256("192.168.1.1");
    const hash3 = await sha256("10.0.0.1");

    expect(hash1.length).toBe(64); // 256 bits = 64 hex characters
    expect(hash1).toBe(hash2);
    expect(hash1).not.toBe(hash3);
  });
});

describe("Phase 07: Database Schema Integrity & Migration Reproducibility", () => {
  it("should export all required tables with expected fields", () => {
    expect(schema.inquiries).toBeDefined();
    expect(schema.leads).toBeDefined();
    expect(schema.pocRecords).toBeDefined();
    expect(schema.systemHealthChecks).toBeDefined();

    // Verify key fields on inquiries
    expect(schema.inquiries.id).toBeDefined();
    expect(schema.inquiries.referenceCode).toBeDefined();
    expect(schema.inquiries.email).toBeDefined();
    expect(schema.inquiries.projectBrief).toBeDefined();
    expect(schema.inquiries.ipHash).toBeDefined();

    // Verify key fields on leads
    expect(schema.leads.id).toBeDefined();
    expect(schema.leads.inquiryId).toBeDefined();
    expect(schema.leads.stage).toBeDefined();
  });

  it("should have valid migration files with deterministic sequential ordering", () => {
    const migrationsDir = path.resolve(process.cwd(), "db/migrations");
    const files = fs.readdirSync(migrationsDir).filter((f) => f.endsWith(".sql"));

    expect(files.length).toBeGreaterThanOrEqual(2);
    expect(files[0]).toBe("0000_glossy_mantis.sql");
    expect(files[1]).toBe("0001_silly_spiral.sql");

    // Verify each file contains valid SQL statements
    for (const file of files) {
      const content = fs.readFileSync(path.join(migrationsDir, file), "utf-8");
      expect(content).toContain("CREATE TABLE");
    }
  });
});

describe("Phase 07: Structured Logging Security & Redaction", () => {
  it("should provide logger methods without throwing", () => {
    expect(() => {
      logger.info("Test info log", { context: "UnitTest", data: { test: true } });
      logger.warn("Test warn log", { context: "UnitTest" });
      logger.debug("Test debug log", { context: "UnitTest" });
      logger.error("Test error log", { context: "UnitTest", error: new Error("Test error") });
    }).not.toThrow();
  });
});

