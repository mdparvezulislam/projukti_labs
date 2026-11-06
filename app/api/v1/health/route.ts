import { apiSuccess, apiError } from "@/lib/validation/api";
import { getCloudflareBindings, getEnv } from "@/lib/env";
import { logger } from "@/lib/logger";

export async function GET() {
  const env = getEnv();
  const bindings = getCloudflareBindings();

  let dbStatus: "healthy" | "unhealthy" | "not_configured" = "not_configured";

  if (bindings.DB) {
    try {
      const result = await bindings.DB.prepare("SELECT 1 as ping").first();
      dbStatus = result ? "healthy" : "unhealthy";
    } catch (err) {
      dbStatus = "unhealthy";
      logger.error("Health check database ping failed", { context: "HealthAPI", error: err });
    }
  }

  const isHealthy = dbStatus !== "unhealthy";

  const payload = {
    status: isHealthy ? "ok" : "degraded",
    environment: env.ENVIRONMENT,
    timestamp: new Date().toISOString(),
    runtime: "workerd",
    dependencies: {
      database: dbStatus,
      storage: bindings.R2_BUCKET ? "healthy" : "not_configured",
      cache: bindings.KV_CACHE ? "healthy" : "not_configured",
    },
  };

  if (!isHealthy) {
    return apiError("SERVICE_DEGRADED", "One or more core dependencies are degraded", 503);
  }

  return apiSuccess(payload);
}
