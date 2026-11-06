import { NextRequest } from "next/server";
import { z } from "zod";
import { apiSuccess, handleZodError } from "@/lib/validation/api";
import { inquiries, leads } from "@/db/schema";
import { drizzle } from "drizzle-orm/d1";

const InquiryInputSchema = z.object({
  inquiryType: z.enum(["quote", "contact", "consultation", "maintenance"]).default("contact"),
  fullName: z.string().trim().min(2, "Full name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please provide a valid email address"),
  phoneWhatsapp: z.string().trim().max(30).optional().nullable(),
  companyName: z.string().trim().max(100).optional().nullable(),
  country: z.string().trim().max(60).optional().nullable(),
  serviceId: z.string().trim().max(100).optional().nullable(),
  packageId: z.string().trim().max(100).optional().nullable(),
  budgetRange: z.string().trim().max(100).optional().nullable(),
  currency: z.enum(["BDT", "USD"]).default("BDT"),
  timelinePreference: z.string().trim().max(100).optional().nullable(),
  projectBrief: z.string().trim().min(10, "Please provide at least 10 characters describing your project or inquiry").max(3000),
  sourcePage: z.string().trim().max(200).optional().nullable(),
});

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
  try {
    const json = await req.json();
    const data = InquiryInputSchema.parse(json);

    const inquiryId = `inq_${crypto.randomUUID()}`;
    const leadId = `lead_${crypto.randomUUID()}`;
    const referenceCode = generateReferenceCode();

    // Check for Cloudflare D1 database binding
    const globalD1 = (globalThis as unknown as { DB?: D1Database }).DB ||
      ((process.env as unknown as { DB?: D1Database }).DB);

    if (globalD1) {
      const db = drizzle(globalD1);
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
        createdAt: new Date(),
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
    }

    return apiSuccess(
      {
        referenceCode,
        inquiryType: data.inquiryType,
        fullName: data.fullName,
        message: "Your inquiry has been successfully received by Projukti Labs. Our engineering team will review your specifications and contact you shortly.",
        slaHours: 24,
      },
      201
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      return handleZodError(err);
    }
    return handleZodError(
      new z.ZodError([
        {
          code: z.ZodIssueCode.custom,
          message: err instanceof Error ? err.message : "Failed to process inquiry submission",
          path: [],
        },
      ])
    );
  }
}

