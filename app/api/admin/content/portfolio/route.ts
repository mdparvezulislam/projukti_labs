import { NextRequest } from "next/server";
import { requireAdminAuth, logAdminAudit } from "@/lib/auth/admin";
import { getCmsPortfolio, upsertCmsPortfolioProject } from "@/lib/cms";
import { apiSuccess, apiError } from "@/lib/validation/api";
import { z } from "zod";

export async function GET(req: NextRequest) {
  try {
    await requireAdminAuth(req);
    const list = await getCmsPortfolio();
    return apiSuccess({ portfolio: list });
  } catch (err) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return apiError("UNAUTHORIZED", "অননুমোদিত অ্যাক্সেস।", 401);
    }
    return apiError("SERVER_ERROR", "পোর্টফোলিও তালিকা লোড করা যায়নি।", 500);
  }
}

const UpsertPortfolioSchema = z.object({
  id: z.string(),
  slug: z.string().min(2),
  title: z.string().min(3),
  category: z.string().min(2),
  badge: z.string().min(2),
  projectType: z.string().min(2),
  overview: z.string().min(10),
  metrics: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
  stack: z.array(z.string()).optional(),
  deliverables: z.array(z.string()).optional(),
  linkUrl: z.string().optional().nullable(),
  linkText: z.string().optional().nullable(),
  isFeatured: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
  isPublished: z.boolean().default(true),
});

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAdminAuth(req, ["owner", "admin", "editor"]);
    const body = await req.json();
    const parsed = UpsertPortfolioSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("VALIDATION_ERROR", "অবৈধ পোর্টফোলিও প্রজেক্ট তথ্য।", 400);
    }

    await upsertCmsPortfolioProject({
      ...parsed.data,
      metrics: parsed.data.metrics ?? [],
      stack: parsed.data.stack ?? [],
      deliverables: parsed.data.deliverables ?? [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await logAdminAudit({
      userId: auth.user.id,
      userEmail: auth.user.email,
      action: "upsert_portfolio_project",
      resourceType: "portfolio",
      resourceId: parsed.data.id,
      details: { slug: parsed.data.slug, title: parsed.data.title },
      req,
    });

    return apiSuccess({ success: true, message: "পোর্টফোলিও প্রজেক্ট সংরক্ষিত হয়েছে।" });
  } catch (err) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return apiError("UNAUTHORIZED", "অননুমোদিত অ্যাক্সেস।", 401);
    }
    return apiError("SERVER_ERROR", "পোর্টফোলিও প্রজেক্ট সংরক্ষণ করা যায়নি।", 500);
  }
}

