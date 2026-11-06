import { NextRequest } from "next/server";
import { requireAdminAuth } from "@/lib/auth/admin";
import { getDb } from "@/lib/db";
import {
  inquiries,
  leads,
  quotes,
  customers,
  services,
  blogPosts,
  portfolioProjects,
  faqs,
  adminUsers,
  adminAuditLogs,
  automationRuns,
} from "@/db/schema";
import { count } from "drizzle-orm";
import { getSafeEnvironmentSummary } from "@/lib/env";
import { apiSuccess, apiError } from "@/lib/validation/api";

export async function GET(req: NextRequest) {
  try {
    await requireAdminAuth(req, ["owner", "admin"]);
    const db = getDb();

    // Query live table row counts
    const [inquiriesCount] = await db.select({ count: count() }).from(inquiries);
    const [leadsCount] = await db.select({ count: count() }).from(leads);
    const [quotesCount] = await db.select({ count: count() }).from(quotes);
    const [customersCount] = await db.select({ count: count() }).from(customers);
    const [servicesCount] = await db.select({ count: count() }).from(services);
    const [blogPostsCount] = await db.select({ count: count() }).from(blogPosts);
    const [portfolioCount] = await db.select({ count: count() }).from(portfolioProjects);
    const [faqsCount] = await db.select({ count: count() }).from(faqs);
    const [usersCount] = await db.select({ count: count() }).from(adminUsers);
    const [auditCount] = await db.select({ count: count() }).from(adminAuditLogs);
    const [runsCount] = await db.select({ count: count() }).from(automationRuns);

    const safeEnv = getSafeEnvironmentSummary();

    return apiSuccess({
      system: {
        status: "operational",
        runtime: "workerd",
        database: "Cloudflare D1 (SQLite)",
        tableCounts: {
          inquiries: Number(inquiriesCount?.count ?? 0),
          leads: Number(leadsCount?.count ?? 0),
          quotes: Number(quotesCount?.count ?? 0),
          customers: Number(customersCount?.count ?? 0),
          services: Number(servicesCount?.count ?? 0),
          blogPosts: Number(blogPostsCount?.count ?? 0),
          portfolioProjects: Number(portfolioCount?.count ?? 0),
          faqs: Number(faqsCount?.count ?? 0),
          adminUsers: Number(usersCount?.count ?? 0),
          adminAuditLogs: Number(auditCount?.count ?? 0),
          automationRuns: Number(runsCount?.count ?? 0),
        },
        environment: safeEnv,
        checkedAt: new Date().toISOString(),
      },
    });
  } catch (err) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return apiError("UNAUTHORIZED", "অননুমোদিত অ্যাক্সেস।", 401);
    }
    if (err instanceof Error && err.message === "FORBIDDEN") {
      return apiError("FORBIDDEN", "এই অ্যাকশনের জন্য পর্যাপ্ত অনুমতি নেই।", 403);
    }
    return apiError("SERVER_ERROR", "সিস্টেম তথ্য লোড করা যায়নি।", 500);
  }
}

