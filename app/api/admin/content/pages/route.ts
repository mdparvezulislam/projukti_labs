import { NextRequest } from "next/server";
import { requireAdminAuth, logAdminAudit } from "@/lib/auth/admin";
import { getPageSections, upsertPageSection } from "@/lib/cms";
import { apiSuccess, apiError } from "@/lib/validation/api";
import { z } from "zod";

export async function GET(req: NextRequest) {
  try {
    await requireAdminAuth(req);
    const { searchParams } = new URL(req.url);
    const pageSlug = searchParams.get("slug") || "home";

    const sections = await getPageSections(pageSlug);
    return apiSuccess({ sections });
  } catch (err) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return apiError("UNAUTHORIZED", "অননুমোদিত অ্যাক্সেস।", 401);
    }
    return apiError("SERVER_ERROR", "পেজ সেকশন লোড করা যায়নি।", 500);
  }
}

const UpsertPageSectionSchema = z.object({
  id: z.string(),
  pageSlug: z.string(),
  sectionKey: z.string(),
  title: z.string().optional().nullable(),
  subtitle: z.string().optional().nullable(),
  content: z.record(z.string(), z.unknown()).optional(),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
});

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAdminAuth(req, ["owner", "admin", "editor"]);
    const body = await req.json();
    const parsed = UpsertPageSectionSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("VALIDATION_ERROR", "অবৈধ সেকশন তথ্য।", 400);
    }

    await upsertPageSection({
      ...parsed.data,
      updatedAt: new Date(),
    });

    await logAdminAudit({
      userId: auth.user.id,
      userEmail: auth.user.email,
      action: "upsert_page_section",
      resourceType: "page_section",
      resourceId: parsed.data.id,
      details: { pageSlug: parsed.data.pageSlug, sectionKey: parsed.data.sectionKey },
      req,
    });

    return apiSuccess({ success: true, message: "পেজ সেকশন সফলভাবে সংরক্ষণ করা হয়েছে।" });
  } catch (err) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return apiError("UNAUTHORIZED", "অননুমোদিত অ্যাক্সেস।", 401);
    }
    return apiError("SERVER_ERROR", "পেজ সেকশন সংরক্ষণ ব্যর্থ হয়েছে।", 500);
  }
}

