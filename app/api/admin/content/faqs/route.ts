import { NextRequest } from "next/server";
import { requireAdminAuth, logAdminAudit } from "@/lib/auth/admin";
import { getCmsFaqs, upsertCmsFaq, deleteCmsFaq } from "@/lib/cms";
import { apiSuccess, apiError } from "@/lib/validation/api";
import { z } from "zod";

export async function GET(req: NextRequest) {
  try {
    await requireAdminAuth(req);
    const list = await getCmsFaqs();
    return apiSuccess({ faqs: list });
  } catch (err) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return apiError("UNAUTHORIZED", "অননুমোদিত অ্যাক্সেস।", 401);
    }
    return apiError("SERVER_ERROR", "FAQ তালিকা লোড করা যায়নি।", 500);
  }
}

const UpsertFaqSchema = z.object({
  id: z.string(),
  category: z.string().min(2),
  question: z.string().min(5),
  answer: z.string().min(10),
  sortOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAdminAuth(req, ["owner", "admin", "editor"]);
    const body = await req.json();
    const parsed = UpsertFaqSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("VALIDATION_ERROR", "অবৈধ FAQ তথ্য।", 400);
    }

    await upsertCmsFaq({
      ...parsed.data,
      updatedAt: new Date(),
    });

    await logAdminAudit({
      userId: auth.user.id,
      userEmail: auth.user.email,
      action: "upsert_faq",
      resourceType: "faq",
      resourceId: parsed.data.id,
      details: { question: parsed.data.question },
      req,
    });

    return apiSuccess({ success: true, message: "FAQ সফলভাবে সংরক্ষণ করা হয়েছে।" });
  } catch (err) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return apiError("UNAUTHORIZED", "অননুমোদিত অ্যাক্সেস।", 401);
    }
    return apiError("SERVER_ERROR", "FAQ সংরক্ষণ করা যায়নি।", 500);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const auth = await requireAdminAuth(req, ["owner", "admin", "editor"]);
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return apiError("BAD_REQUEST", "FAQ আইডি দেওয়া হয়নি।", 400);
    }

    await deleteCmsFaq(id);
    await logAdminAudit({
      userId: auth.user.id,
      userEmail: auth.user.email,
      action: "delete_faq",
      resourceType: "faq",
      resourceId: id,
      req,
    });

    return apiSuccess({ success: true, message: "FAQ মুছে ফেলা হয়েছে।" });
  } catch (err) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return apiError("UNAUTHORIZED", "অননুমোদিত অ্যাক্সেস।", 401);
    }
    return apiError("SERVER_ERROR", "FAQ মোছা যায়নি।", 500);
  }
}

