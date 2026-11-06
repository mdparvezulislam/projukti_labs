/**
 * Projukti Labs — Structured Server Logger
 * Lightweight, privacy-conscious structured logging for Cloudflare Workers.
 * Automatically redacts sensitive fields (passwords, tokens, cookies, auth headers).
 */

export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogPayload {
  level: LogLevel;
  message: string;
  context?: string;
  requestId?: string;
  data?: Record<string, unknown>;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

const REDACT_KEYS = new Set([
  "password",
  "token",
  "secret",
  "authorization",
  "cookie",
  "creditcard",
  "cardnumber",
  "cvv",
  "apikey",
  "api_key",
  "turnstilesecretkey",
  "r2secretaccesskey",
]);

function sanitize(data: unknown, depth = 0): unknown {
  if (depth > 4) return "[Max Depth]";
  if (!data || typeof data !== "object") return data;

  if (Array.isArray(data)) {
    return data.map((item) => sanitize(item, depth + 1));
  }

  const sanitized: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(data as Record<string, unknown>)) {
    const lowerKey = key.toLowerCase().replace(/[-_]/g, "");
    if (REDACT_KEYS.has(lowerKey)) {
      sanitized[key] = "[REDACTED]";
    } else if (typeof val === "object" && val !== null) {
      sanitized[key] = sanitize(val, depth + 1);
    } else {
      sanitized[key] = val;
    }
  }
  return sanitized;
}

function emitLog(level: LogLevel, message: string, options?: {
  context?: string;
  requestId?: string;
  data?: Record<string, unknown>;
  error?: unknown;
}) {
  const timestamp = new Date().toISOString();
  const entry: Record<string, unknown> = {
    timestamp,
    level,
    message,
    ...(options?.context ? { context: options.context } : {}),
    ...(options?.requestId ? { requestId: options.requestId } : {}),
  };

  if (options?.data) {
    entry.data = sanitize(options.data);
  }

  if (options?.error instanceof Error) {
    entry.error = {
      name: options.error.name,
      message: options.error.message,
      // Only include stack in non-production for debugging
      ...(process.env.NODE_ENV !== "production" ? { stack: options.error.stack } : {}),
    };
  }

  const jsonStr = JSON.stringify(entry);

  switch (level) {
    case "error":
      console.error(jsonStr);
      break;
    case "warn":
      console.warn(jsonStr);
      break;
    case "debug":
      if (process.env.NODE_ENV !== "production") {
        console.debug(jsonStr);
      }
      break;
    case "info":
    default:
      console.log(jsonStr);
      break;
  }
}

export const logger = {
  info: (message: string, options?: { context?: string; requestId?: string; data?: Record<string, unknown> }) =>
    emitLog("info", message, options),
  warn: (message: string, options?: { context?: string; requestId?: string; data?: Record<string, unknown>; error?: unknown }) =>
    emitLog("warn", message, options),
  error: (message: string, options?: { context?: string; requestId?: string; data?: Record<string, unknown>; error?: unknown }) =>
    emitLog("error", message, options),
  debug: (message: string, options?: { context?: string; requestId?: string; data?: Record<string, unknown> }) =>
    emitLog("debug", message, options),
};
