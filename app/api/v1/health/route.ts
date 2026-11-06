import { apiSuccess } from "@/lib/validation/api";

export async function GET() {
  return apiSuccess({
    status: "ok",
    service: "projukti-labs-api",
    timestamp: new Date().toISOString(),
    uptime: process.uptime ? process.uptime() : 0,
    runtime: "workerd",
  });
}
