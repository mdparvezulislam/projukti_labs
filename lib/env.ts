import { z } from "zod";

/**
 * Projukti Labs — Environment Configuration & Runtime Bindings
 * Validates public and server environment variables safely.
 * Never prints secret values to logs.
 */

const EnvironmentSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  ENVIRONMENT: z.enum(["development", "preview", "production"]).default("development"),
  APP_URL: z.string().url().default("http://localhost:3000"),
  // Optional integration variables
  TURNSTILE_SECRET_KEY: z.string().min(10).optional(),
  R2_ACCOUNT_ID: z.string().optional(),
  R2_ACCESS_KEY_ID: z.string().optional(),
  R2_SECRET_ACCESS_KEY: z.string().optional(),
  R2_BUCKET_NAME: z.string().default("projukti-labs-assets"),
});

export type AppEnvironment = z.infer<typeof EnvironmentSchema>;

let cachedEnv: AppEnvironment | null = null;

export function getEnv(): AppEnvironment {
  if (cachedEnv) return cachedEnv;

  const raw = {
    NODE_ENV: process.env.NODE_ENV,
    ENVIRONMENT: process.env.ENVIRONMENT || (process.env.NODE_ENV === "production" ? "production" : "development"),
    APP_URL: process.env.APP_URL || (process.env.NODE_ENV === "production" ? "https://projuktilabs.tech" : "http://localhost:3000"),
    TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
    R2_ACCOUNT_ID: process.env.R2_ACCOUNT_ID,
    R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID,
    R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY,
    R2_BUCKET_NAME: process.env.R2_BUCKET_NAME,
  };

  const result = EnvironmentSchema.safeParse(raw);
  if (!result.success) {
    const errorMessages = result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(", ");
    throw new Error(`[Projukti Labs] Environment Validation Failed: ${errorMessages}`);
  }

  cachedEnv = result.data;
  return cachedEnv;
}

/**
 * Cloudflare Worker Bindings Accessor
 * Safely resolves D1, R2, KV bindings from globalThis or process.env
 */
export interface CloudflareBindings {
  DB?: D1Database;
  R2_BUCKET?: R2Bucket;
  KV_CACHE?: KVNamespace;
}

export function getCloudflareBindings(): CloudflareBindings {
  const g = globalThis as unknown as CloudflareBindings;
  const p = (typeof process !== "undefined" ? process.env : {}) as unknown as CloudflareBindings;

  return {
    DB: g.DB || p.DB,
    R2_BUCKET: g.R2_BUCKET || p.R2_BUCKET,
    KV_CACHE: g.KV_CACHE || p.KV_CACHE,
  };
}

/**
 * Returns safe environment summary for logging/diagnostics without exposing secrets.
 */
export function getSafeEnvironmentSummary(): Record<string, unknown> {
  const env = getEnv();
  const bindings = getCloudflareBindings();

  return {
    nodeEnv: env.NODE_ENV,
    environment: env.ENVIRONMENT,
    appUrl: env.APP_URL,
    hasDbBinding: Boolean(bindings.DB),
    hasR2Binding: Boolean(bindings.R2_BUCKET),
    hasKvBinding: Boolean(bindings.KV_CACHE),
    hasTurnstileKey: Boolean(env.TURNSTILE_SECRET_KEY),
  };
}

