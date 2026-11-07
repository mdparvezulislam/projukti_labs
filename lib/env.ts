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

let cfWorkersEnv: Record<string, unknown> | undefined;

try {
  // In Cloudflare Workers (workerd), "cloudflare:workers" is a native runtime module.
  // In Node.js (dev/testing), this import throws and is caught safely.
  const cfw = await import("cloudflare:workers");
  cfWorkersEnv = (cfw as unknown as { env?: Record<string, unknown> })?.env;
} catch {
  // Not running inside workerd runtime (Node.js dev or testing)
}

export function getCloudflareBindings(): CloudflareBindings {
  const g = globalThis as Record<string | symbol, unknown>;
  const p = (typeof process !== "undefined" ? process.env : {}) as Record<string, unknown>;
  const c = cfWorkersEnv || {};

  // 1. Direct bindings from cloudflare:workers, globalThis, or process.env
  let db = (c.DB || g.DB || p.DB || (g.__env__ as Record<string, unknown>)?.DB || (g.env as Record<string, unknown>)?.DB) as D1Database | undefined;
  const r2 = (c.R2_BUCKET || g.R2_BUCKET || p.R2_BUCKET || (g.__env__ as Record<string, unknown>)?.R2_BUCKET) as R2Bucket | undefined;
  const kv = (c.KV_CACHE || c.VINEXT_KV_CACHE || g.KV_CACHE || p.KV_CACHE || (g.__env__ as Record<string, unknown>)?.KV_CACHE) as KVNamespace | undefined;

  // 2. Try globalThis[Symbol.for("cloudflare.env")] or globalThis.__CF_ENV__
  if (!db) {
    const sym = Symbol.for("cloudflare.env");
    const cfEnv = (g[sym] || g.__CF_ENV__) as Record<string, unknown> | undefined;
    if (cfEnv?.DB) {
      db = cfEnv.DB as D1Database;
    }
  }

  return {
    DB: db,
    R2_BUCKET: r2,
    KV_CACHE: kv,
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

