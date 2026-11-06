import { NextRequest } from "next/server";
import { requireAdminAuth, logAdminAudit } from "@/lib/auth/admin";
import { getCmsServices, upsertCmsService } from "@/lib/cms";
import { apiSuccess, apiError } from "@/lib/validation/api";
import { z } from "zod";

export async function GET(req: NextRequest) {
  try {
    await requireAdminAuth(req);
    const services = await getCmsServices();
    return apiSuccess({ categories: services });
  } catch (err) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return apiError("UNAUTHORIZED", "অননুমোদিত অ্যাক্সেস।", 401);
    }
    return apiError("SERVER_ERROR", "সার্ভিস তালিকা লোড করা যায়নি।", 500);
  }
}

const UpsertServiceSchema = z.object({
  id: z.string(),
  slug: z.string().min(2),
  categorySlug: z.string(),
  name: z.string().min(2),
  tagline: z.string().optional().nullable(),
  description: z.string().min(10),
  isFlagship: z.boolean().default(false),
  status: z.enum(["active", "coming_soon", "draft"]).default("active"),
  deliverables: z.array(z.string()).optional(),
  exclusions: z.array(z.string()).optional(),
  technicalHighlights: z.array(z.string()).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAdminAuth(req, ["owner", "admin", "editor"]);
    const body = await req.json();
    const parsed = UpsertServiceSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("VALIDATION_ERROR", "অবৈধ সার্ভিস তথ্য।", 400);
    }

    await upsertCmsService({
      ...parsed.data,
      deliverables: parsed.data.deliverables ?? [],
      exclusions: parsed.data.exclusions ?? [],
      technicalHighlights: parsed.data.technicalHighlights ?? [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await logAdminAudit({
      userId: auth.user.id,
      userEmail: auth.user.email,
      action: "upsert_service",
      resourceType: "service",
      resourceId: parsed.data.id,
      details: { slug: parsed.data.slug, name: parsed.data.name },
      req,
    });

    return apiSuccess({ success: true, message: "সার্ভিস সফলভাবে সেভ করা হয়েছে।" });
  } catch (err) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return apiError("UNAUTHORIZED", "অননুমোদিত অ্যাক্সেস।", 401);
    }
    return apiError("SERVER_ERROR", "সার্ভিস সংরক্ষণ করা যায়নি।", 500);
  }
}
