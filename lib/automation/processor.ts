import { getDb } from "@/lib/db";
import {
  automationRules,
  automationRuns,
  notifications,
  leads,
  customers,
  blogPosts,
} from "@/db/schema";
import { eq, desc, and, lte } from "drizzle-orm";
import { logger } from "@/lib/logger";

export type BusinessEventType =
  | "inquiry.created"
  | "lead.stage_changed"
  | "quote.created"
  | "blog.scheduled_publish"
  | "system.health_check";

export interface EventPayloadMap {
  "inquiry.created": {
    inquiryId: string;
    referenceCode: string;
    fullName: string;
    email: string;
    serviceId?: string | null;
    budgetRange?: string | null;
    projectBrief: string;
  };
  "lead.stage_changed": {
    leadId: string;
    title: string;
    previousStage: string;
    newStage: string;
  };
  "quote.created": {
    quoteId: string;
    quoteNumber: string;
    clientName: string;
    clientEmail: string;
    totalBdt: number;
  };
  "blog.scheduled_publish": {
    triggeredBy?: string;
  };
  "system.health_check": {
    triggeredBy?: string;
  };
}

/**
 * Dispatches an event to the automation engine and executes all active registered rules.
 */
export async function dispatchAutomationEvent<E extends BusinessEventType>(
  eventType: E,
  payload: EventPayloadMap[E]
): Promise<{ runsCount: number; success: boolean }> {
  const startTime = Date.now();
  const db = getDb();

  try {
    const rules = await db
      .select()
      .from(automationRules)
      .where(and(eq(automationRules.eventType, eventType), eq(automationRules.isActive, true)));

    if (rules.length === 0) {
      // Execute default system workflow even if custom rules aren't defined
      await executeDefaultWorkflow(eventType, payload);
      return { runsCount: 0, success: true };
    }

    let allSucceeded = true;
    for (const rule of rules) {
      const runId = `run_${crypto.randomUUID()}`;
      try {
        const result = await executeRuleAction(rule.id, eventType, payload, rule.config ?? {});
        await db.insert(automationRuns).values({
          id: runId,
          ruleId: rule.id,
          eventType,
          status: "success",
          payload: payload as unknown as Record<string, unknown>,
          result: { ...result, executionTimeMs: Date.now() - startTime },
          executedAt: new Date(),
        });
      } catch (err) {
        allSucceeded = false;
        const errorMsg = err instanceof Error ? err.message : String(err);
        await db.insert(automationRuns).values({
          id: runId,
          ruleId: rule.id,
          eventType,
          status: "failed",
          payload: payload as unknown as Record<string, unknown>,
          errorMessage: errorMsg,
          executedAt: new Date(),
        });
        logger.error(`[Automation] Rule ${rule.id} failed: ${errorMsg}`, {
          context: "AutomationProcessor",
          data: { eventType, ruleName: rule.name },
        });
      }
    }

    return { runsCount: rules.length, success: allSucceeded };
  } catch (err) {
    logger.error(`[Automation] Dispatch failed for ${eventType}: ${err}`, {
      context: "AutomationProcessor",
    });
    return { runsCount: 0, success: false };
  }
}

/**
 * Executes default system workflows for core business operations.
 */
async function executeDefaultWorkflow(eventType: BusinessEventType, payload: unknown) {
  const db = getDb();

  if (eventType === "inquiry.created") {
    const p = (payload as Partial<EventPayloadMap["inquiry.created"]>) || {};

    // 1. Check if lead already exists to prevent duplicate leads
    if (p.inquiryId) {
      const existing = await db.select().from(leads).where(eq(leads.inquiryId, p.inquiryId)).limit(1);
      if (existing.length === 0) {
        await db.insert(leads).values({
          id: `lead_${crypto.randomUUID()}`,
          inquiryId: p.inquiryId,
          title: `${p.fullName || "ইনকোয়ারি"} — ${p.serviceId || "সাধারণ ইনকোয়ারি"}`,
          stage: "new",
          priority: "medium",
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    // 2. Link/create customer record
    if (p.email) {
      const existingCustomer = await db
        .select()
        .from(customers)
        .where(eq(customers.email, p.email.toLowerCase()))
        .limit(1);

      if (existingCustomer.length === 0) {
        await db.insert(customers).values({
          id: `cst_${crypto.randomUUID()}`,
          fullName: p.fullName || "Unknown Customer",
          email: p.email.toLowerCase(),
          status: "lead",
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    // 3. Admin Notification
    await createNotification({
      title: "নতুন ইনকোয়ারি প্রাপ্ত হয়েছে",
      message: `${p.fullName || "একজন ক্লায়েন্ট"} (${p.referenceCode || "N/A"}) একটি নতুন প্রজেক্ট ইনকোয়ারি জমা দিয়েছেন।`,
      type: "info",
      actionUrl: `/admin/inquiries`,
    });
  } else if (eventType === "quote.created") {
    const p = (payload as Partial<EventPayloadMap["quote.created"]>) || {};
    await createNotification({
      title: "নতুন কোটেশন তৈরি হয়েছে",
      message: `কোটেশন ${p.quoteNumber || ""} তৈরি করা হয়েছে (${p.clientName || "ক্লায়েন্ট"}, ৳${(p.totalBdt ?? 0).toLocaleString("bn-BD")})।`,
      type: "success",
      actionUrl: `/admin/quotes`,
    });
  } else if (eventType === "blog.scheduled_publish") {
    await processScheduledBlogPosts();
  }
}

/**
 * Executes a configured rule's specific action.
 */
async function executeRuleAction(
  ruleId: string,
  eventType: BusinessEventType,
  payload: unknown,
  config: Record<string, unknown>
): Promise<Record<string, unknown>> {
  await executeDefaultWorkflow(eventType, payload);

  if (eventType === "inquiry.created" && config.notifyAdmin) {
    const p = payload as EventPayloadMap["inquiry.created"];
    await createNotification({
      title: "জরুরি ইনকোয়ারি অ্যালার্ট",
      message: `${p.fullName} থেকে নতুন প্রজেক্ট প্রস্তাব এসেছে। বাজেট রেঞ্জ: ${p.budgetRange ?? "আলোচনা সাপেক্ষ"}।`,
      type: "alert",
      actionUrl: `/admin/inquiries`,
    });
  }

  return { ruleId, eventType, handledAt: new Date().toISOString() };
}

/**
 * Checks and publishes scheduled blog posts whose publish time has arrived.
 */
export async function processScheduledBlogPosts(): Promise<{ publishedCount: number }> {
  const db = getDb();
  const now = new Date();

  const scheduled = await db
    .select()
    .from(blogPosts)
    .where(and(eq(blogPosts.status, "scheduled"), lte(blogPosts.scheduledAt, now)));

  for (const post of scheduled) {
    await db
      .update(blogPosts)
      .set({
        status: "published",
        publishedAt: now,
        updatedAt: now,
      })
      .where(eq(blogPosts.id, post.id));

    await createNotification({
      title: "শিডিউলড ব্লগ পোস্ট প্রকাশিত হয়েছে",
      message: `"${post.title}" পোস্টটি স্বয়ংক্রিয়ভাবে লাইভ করা হয়েছে।`,
      type: "info",
      actionUrl: `/blog/${post.slug}`,
    });
  }

  return { publishedCount: scheduled.length };
}

/**
 * Retries a failed automation run.
 */
export async function retryAutomationRun(runId: string): Promise<{ success: boolean; message: string }> {
  const db = getDb();
  const run = await db.select().from(automationRuns).where(eq(automationRuns.id, runId)).limit(1);
  if (!run[0]) {
    throw new Error("RUN_NOT_FOUND");
  }

  const r = run[0];
  try {
    const startTime = Date.now();
    const result = await executeRuleAction(
      r.ruleId ?? "manual_retry",
      r.eventType as BusinessEventType,
      r.payload,
      {}
    );

    await db
      .update(automationRuns)
      .set({
        status: "success",
        errorMessage: null,
        result: { ...result, retriedAt: new Date().toISOString(), executionTimeMs: Date.now() - startTime },
      })
      .where(eq(automationRuns.id, runId));

    return { success: true, message: "অটোমেশন রান সফলভাবে পুনরায় সম্পন্ন হয়েছে।" };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await db
      .update(automationRuns)
      .set({
        status: "failed",
        errorMessage: msg,
      })
      .where(eq(automationRuns.id, runId));
    return { success: false, message: `পুনরায় রান ব্যর্থ হয়েছে: ${msg}` };
  }
}

// ==========================================
// Notifications Center
// ==========================================

export async function createNotification(data: {
  userId?: string | null;
  title: string;
  message: string;
  type?: "info" | "success" | "warning" | "alert";
  actionUrl?: string;
}) {
  const db = getDb();
  await db.insert(notifications).values({
    id: `ntf_${crypto.randomUUID()}`,
    userId: data.userId ?? null,
    title: data.title,
    message: data.message,
    type: data.type ?? "info",
    actionUrl: data.actionUrl ?? null,
    isRead: false,
    createdAt: new Date(),
  });
}

export async function getNotifications(userId?: string) {
  const db = getDb();
  let query = db.select().from(notifications);
  if (userId) {
    // @ts-expect-error conditional where
    query = query.where(eq(notifications.userId, userId));
  }
  const rows = await query.orderBy(desc(notifications.createdAt)).limit(20);
  return rows;
}

export const getAdminNotifications = getNotifications;

export async function markNotificationAsRead(id: string) {
  const db = getDb();
  await db.update(notifications).set({ isRead: true }).where(eq(notifications.id, id));
}

export async function markAllNotificationsAsRead() {
  const db = getDb();
  await db.update(notifications).set({ isRead: true });
}
