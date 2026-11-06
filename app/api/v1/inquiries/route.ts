import { NextRequest } from "next/server";
import { z } from "zod";
import { apiSuccess, apiError, handleZodError } from "@/lib/validation/api";
import { inquiries, leads } from "@/db/schema";
import { getDb } from "@/lib/db";
import { logger } from "@/lib/logger";
import { sha256 } from "@/lib/auth/crypto";
import { dispatchAutomationEvent } from "@/lib/automation/processor";

const MAX_PAYLOAD_BYTES = 65536; // 64 KB limit

const InquiryInputSchema = z.object({
  inquiryType: z.enum(["quote", "contact", "consultation", "maintenance"]).default("contact"),
  fullName: z.string().trim().min(2, "Full name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please provide a valid email address").max(120),
  phoneWhatsapp: z.string().trim().max(30).optional().nullable(),
  companyName: z.string().trim().max(100).optional().nullable(),
  country: z.string().trim().max(60).optional().nullable(),
  serviceId: z.string().trim().max(100).optional().nullable(),
  packageId: z.string().trim().max(100).optional().nullable(),
  budgetRange: z.string().trim().max(100).optional().nullable(),
  currency: z.enum(["BDT", "USD"]).default("BDT"),
  timelinePreference: z.string().trim().max(100).optional().nullable(),
  projectBrief: z
    .string()
    .trim()
    .min(10, "Please provide at least 10 characters describing your project or inquiry")
    .max(3000),
  sourcePage: z.string().trim().max(200).optional().nullable(),
  // Honeypot field for bot protection (should be empty from real human users)
  website_url: z.string().max(100).optional(),
});

// In-memory rate-limiting / idempotency cache for rapid duplicate prevention
const recentSubmissions = new Map<string, number>();

function cleanRecentSubmissions() {
  const now = Date.now();
  for (const [key, timestamp] of recentSubmissions.entries()) {
    if (now - timestamp > 60000) {
      recentSubmissions.delete(key);
    }
  }
}

function generateReferenceCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  const randomBytes = new Uint8Array(4);
  crypto.getRandomValues(randomBytes);
  for (let i = 0; i < 4; i++) {
    suffix += chars[randomBytes[i] % chars.length];
  }
  return `PL-2026-${suffix}`;
}

export async function POST(req: NextRequest) {
  const requestId = crypto.randomUUID();

  // 1. Request Size & Content-Type Gate
  const contentType = req.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return apiError("UNSUPPORTED_MEDIA_TYPE", "Content-Type must be application/json", 415);
  }

  const contentLength = parseInt(req.headers.get("content-length") || "0", 10);
  if (contentLength > MAX_PAYLOAD_BYTES) {
    return apiError("PAYLOAD_TOO_LARGE", "Request payload exceeds allowed limit (64 KB)", 413);
  }

  try {
    const json = await req.json();
    const data = InquiryInputSchema.parse(json);

    // 2. Honeypot Bot Trap: If hidden bot field is filled, silently discard without touching DB
    if (data.website_url && data.website_url.trim().length > 0) {
      logger.warn("Bot submission trapped via honeypot", { requestId, context: "InquiryAPI" });
      return apiSuccess({
        referenceCode: generateReferenceCode(),
        inquiryType: data.inquiryType,
        fullName: data.fullName,
        message: "Your inquiry has been received.",
        slaHours: 24,
      });
    }

    // 3. Idempotency & Rapid Duplicate Submission Protection
    cleanRecentSubmissions();
    const idempotencyKey = `${data.email.toLowerCase()}_${data.inquiryType}_${data.projectBrief.slice(0, 30)}`;
    const lastSubmitted = recentSubmissions.get(idempotencyKey);
    const now = Date.now();

    if (lastSubmitted && now - lastSubmitted < 15000) {
      // Duplicate submitted within 15 seconds
      logger.warn("Duplicate inquiry rejected within rate limit window", {
        requestId,
        context: "InquiryAPI",
        data: { emailDomain: data.email.split("@")[1] },
      });
      return apiError(
        "DUPLICATE_SUBMISSION",
        "আমরা ইতিমধ্যে আপনার একটি সাম্প্রতিক অনুরোধ পেয়েছি। অনুগ্রহ করে সামান্য অপেক্ষা করুন।",
        429
      );
    }
    recentSubmissions.set(idempotencyKey, now);

    // 4. IP Hashing for Privacy Compliance
    const rawIp = req.headers.get("cf-connecting-ip") || req.headers.get("x-forwarded-for") || "127.0.0.1";
    const ipHash = await sha256(rawIp);

    const inquiryId = `inq_${crypto.randomUUID()}`;
    const leadId = `lead_${crypto.randomUUID()}`;
    const referenceCode = generateReferenceCode();

    // 5. Cloudflare D1 Database Persistence
    try {
      const db = getDb();
      await db.insert(inquiries).values({
        id: inquiryId,
        referenceCode,
        inquiryType: data.inquiryType,
        fullName: data.fullName,
        email: data.email,
        phoneWhatsapp: data.phoneWhatsapp ?? null,
        companyName: data.companyName ?? null,
        country: data.country ?? null,
        serviceId: data.serviceId ?? null,
        packageId: data.packageId ?? null,
        budgetRange: data.budgetRange ?? null,
        currency: data.currency,
        timelinePreference: data.timelinePreference ?? null,
        projectBrief: data.projectBrief,
        sourcePage: data.sourcePage ?? null,
        ipHash,
        status: "new",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await db.insert(leads).values({
        id: leadId,
        inquiryId,
        title: `${data.fullName} — ${data.serviceId || data.inquiryType.toUpperCase()}`,
        stage: "new",
        priority: data.inquiryType === "quote" ? "high" : "medium",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      logger.info("Inquiry and Lead successfully persisted to D1", {
        requestId,
        context: "InquiryAPI",
        data: { inquiryType: data.inquiryType, referenceCode },
      });

      // 6. Trigger Business Automation Event
      await dispatchAutomationEvent("inquiry.created", {
        inquiryId,
        referenceCode,
        fullName: data.fullName,
        email: data.email,
        serviceId: data.serviceId,
        budgetRange: data.budgetRange,
        projectBrief: data.projectBrief,
      });
    } catch (dbErr) {
      logger.error("D1 database insertion failure", {
        requestId,
        context: "InquiryAPI",
        error: dbErr,
      });
      return apiError(
        "DATABASE_ERROR",
        "আপনার অনুরোধটি সংরক্ষণে সাময়িক ত্রুটি হয়েছে। অনুগ্রহ করে কিছুক্ষণ পর পুনরায় চেষ্টা করুন।",
        500
      );
    }

    return apiSuccess(
      {
        referenceCode,
        inquiryType: data.inquiryType,
        fullName: data.fullName,
        message: "আপনার অনুরোধটি Projukti Labs সফলভাবে গ্রহণ করেছে। আমাদের টিম ২৪ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগ করবে।",
        slaHours: 24,
      },
      201
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      return handleZodError(err);
    }
    logger.error("Unexpected error in Inquiry API", { requestId, context: "InquiryAPI", error: err });
    return apiError("INTERNAL_ERROR", "অনুরোধটি প্রক্রিয়াকরণে সাময়িক সমস্যা হয়েছে", 500);
  }
}
