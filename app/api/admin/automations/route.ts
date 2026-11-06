import { NextRequest } from "next/server";
import { requireAdminAuth, logAdminAudit } from "@/lib/auth/admin";
import { getDb } from "@/lib/db";
import { automationRules, automationRuns } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { retryAutomationRun, dispatchAutomationEvent, BusinessEventType } from "@/lib/automation/processor";
import { apiSuccess, apiError } from "@/lib/validation/api";
import { z } from "zod";

export async function GET(req: NextRequest) {
  try {
    await requireAdminAuth(req);
    const db = getDb();
    const rules = await db.select().from(automationRules);
    const runs = await db.select().from(automationRuns).orderBy(desc(automationRuns.executedAt)).limit(30);

    return apiSuccess({ rules, recentRuns: runs });
  } catch (err) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return apiError("UNAUTHORIZED", "অননুমোদিত অ্যাক্সেস।", 401);
    }
    return apiError("SERVER_ERROR", "অটোমেশন তালিকা লোড করা যায়নি।", 500);
  }
}

const ToggleRuleSchema = z.object({
  ruleId: z.string(),
  isActive: z.boolean(),
});

export async function PATCH(req: NextRequest) {
  try {
    const auth = await requireAdminAuth(req, ["owner", "admin"]);
    const body = await req.json();
    const parsed = ToggleRuleSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("VALIDATION_ERROR", "অবৈধ ইনপুট ডাটা।", 400);
    }

    const { ruleId, isActive } = parsed.data;
    const db = getDb();
    await db
      .update(automationRules)
      .set({ isActive, updatedAt: new Date() })
      .where(eq(automationRules.id, ruleId));

    await logAdminAudit({
      userId: auth.user.id,
      userEmail: auth.user.email,
      action: "toggle_automation_rule",
      resourceType: "automation",
      resourceId: ruleId,
      details: { isActive },
      req,
    });

    return apiSuccess({ success: true, message: "অটোমেশন রুল স্ট্যাটাস আপডেট হয়েছে।" });
  } catch (err) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return apiError("UNAUTHORIZED", "অননুমোদিত অ্যাক্সেস।", 401);
    }
    return apiError("SERVER_ERROR", "রুল আপডেট ব্যর্থ হয়েছে।", 500);
  }
}

const ActionSchema = z.object({
  action: z.enum(["retry", "trigger"]),
  runId: z.string().optional(),
  eventType: z.string().optional(),
  payload: z.record(z.string(), z.unknown()).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAdminAuth(req, ["owner", "admin"]);
    const body = await req.json();
    const parsed = ActionSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("VALIDATION_ERROR", "অবৈধ কমান্ড।", 400);
    }

    if (parsed.data.action === "retry") {
      if (!parsed.data.runId) {
        return apiError("BAD_REQUEST", "runId আবশ্যক।", 400);
      }
      const result = await retryAutomationRun(parsed.data.runId);
      await logAdminAudit({
        userId: auth.user.id,
        userEmail: auth.user.email,
        action: "retry_automation_run",
        resourceType: "automation",
        resourceId: parsed.data.runId,
        req,
      });
      return apiSuccess(result);
    } else if (parsed.data.action === "trigger") {
      if (!parsed.data.eventType) {
        return apiError("BAD_REQUEST", "eventType আবশ্যক।", 400);
      }
      const res = await dispatchAutomationEvent(
        parsed.data.eventType as BusinessEventType,
        (parsed.data.payload ?? {}) as never
      );
      return apiSuccess(res);
    }

    return apiError("BAD_REQUEST", "অজানা অ্যাকশন।", 400);
  } catch (err) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return apiError("UNAUTHORIZED", "অননুমোদিত অ্যাক্সেস।", 401);
    }
    return apiError("SERVER_ERROR", "অটোমেশন অ্যাকশন ব্যর্থ হয়েছে।", 500);
  }
}
