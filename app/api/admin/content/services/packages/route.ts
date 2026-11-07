import { NextRequest } from "next/server";
import { requireAdminAuth, logAdminAudit } from "@/lib/auth/admin";
import { upsertCmsServicePackage } from "@/lib/cms";
import { apiSuccess, apiError } from "@/lib/validation/api";
import { z } from "zod";

const UpsertPackageSchema = z.object({
  id: z.string(),
  serviceId: z.string(),
  slug: z.string().min(2),
  name: z.string().min(2),
  priceBdt: z.number().nullable().optional(),
  priceUsd: z.number().nullable().optional(),
  billingPeriod: z.enum(["one-time", "monthly", "custom"]).default("one-time"),
  description: z.string().min(5),
  isPopular: z.boolean().default(false),
  slaHours: z.number().nullable().optional(),
  deliverables: z.array(z.string()).optional(),
  exclusions: z.array(z.string()).optional(),
  sortOrder: z.number().int().default(0),
});

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAdminAuth(req, ["owner", "admin", "editor"]);
    const body = await req.json();
    const parsed = UpsertPackageSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("VALIDATION_ERROR", "অবৈধ প্যাকেজ তথ্য।", 400);
    }

    await upsertCmsServicePackage({
      ...parsed.data,
      deliverables: parsed.data.deliverables ?? [],
      exclusions: parsed.data.exclusions ?? [],
      updatedAt: new Date(),
    });

    await logAdminAudit({
      userId: auth.user.id,
      userEmail: auth.user.email,
      action: "upsert_service_package",
      resourceType: "service_package",
      resourceId: parsed.data.id,
      details: { serviceId: parsed.data.serviceId, name: parsed.data.name, priceBdt: parsed.data.priceBdt },
      req,
    });

    return apiSuccess({ success: true, message: "সার্ভিস প্যাকেজ সফলভাবে সংরক্ষণ করা হয়েছে।" });
  } catch (err) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return apiError("UNAUTHORIZED", "অননুমোদিত অ্যাক্সেস।", 401);
    }
    if (err instanceof Error && err.message === "FORBIDDEN") {
      return apiError("FORBIDDEN", "এই অ্যাকশনের জন্য পর্যাপ্ত অনুমতি নেই।", 403);
    }
    return apiError("SERVER_ERROR", "প্যাকেজ সংরক্ষণ করা যায়নি।", 500);
  }
}
