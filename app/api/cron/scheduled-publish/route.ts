import { NextRequest, NextResponse } from "next/server";
import { processScheduledBlogPosts } from "@/lib/automation/processor";
import { getAdminSession } from "@/lib/auth/admin";
import { logger } from "@/lib/logger";

export const dynamic = "force-dynamic";

/**
 * Handles automated scheduled blog publishing for Cloudflare Cron Triggers,
 * authorized webhooks, or authenticated admin manual runs.
 */
async function handlePublish(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const cronSecretHeader = req.headers.get("x-cron-secret");
  const configuredSecret = process.env.CRON_SECRET;

  let isAuthorized = false;

  // 1. Check Bearer token or custom header if CRON_SECRET is configured
  if (configuredSecret) {
    if (authHeader === `Bearer ${configuredSecret}` || cronSecretHeader === configuredSecret) {
      isAuthorized = true;
    }
  }

  // 2. Check if called by an authenticated admin
  if (!isAuthorized) {
    const adminSession = await getAdminSession();
    if (adminSession) {
      isAuthorized = true;
    }
  }

  // 3. Allow Cloudflare Workers internal calls (worker cron / workerd runtime)
  const userAgent = req.headers.get("user-agent") || "";
  const cfWorkerHeader = req.headers.get("cf-worker");
  if (userAgent.includes("Cloudflare-Cron") || cfWorkerHeader) {
    isAuthorized = true;
  }

  // In production, if CRON_SECRET is set and no auth matched, reject unauthorized
  if (configuredSecret && !isAuthorized) {
    return NextResponse.json(
      { success: false, error: "UNAUTHORIZED", message: "Invalid or missing cron credentials." },
      { status: 401 }
    );
  }

  try {
    const nowUtc = new Date();
    const dhakaTimeString = nowUtc.toLocaleString("en-US", {
      timeZone: "Asia/Dhaka",
      dateStyle: "full",
      timeStyle: "long",
    });

    const result = await processScheduledBlogPosts();

    logger.info("Cron scheduled blog publishing executed", {
      context: "CronPublish",
      data: {
        publishedCount: result.publishedCount,
        timestamp: nowUtc.toISOString(),
        dhakaTime: dhakaTimeString,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        publishedCount: result.publishedCount,
        executedAtUtc: nowUtc.toISOString(),
        executedAtDhaka: dhakaTimeString,
        status: "completed",
      },
    });
  } catch (err) {
    logger.error("Failed to execute scheduled blog publish", {
      context: "CronPublish",
      error: err,
    });

    return NextResponse.json(
      {
        success: false,
        error: "INTERNAL_ERROR",
        message: err instanceof Error ? err.message : "Unknown scheduled publish error",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  return handlePublish(req);
}

export async function POST(req: NextRequest) {
  return handlePublish(req);
}
