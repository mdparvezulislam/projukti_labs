import { NextRequest } from "next/server";
import { requireAdminAuth, logAdminAudit } from "@/lib/auth/admin";
import { getInquiries, getInquiryById, updateInquiryStatus } from "@/lib/crm";
import { apiSuccess, apiError } from "@/lib/validation/api";
import { z } from "zod";

export async function GET(req: NextRequest) {
  try {
    await requireAdminAuth(req);
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || undefined;
    const inquiryType = searchParams.get("type") || undefined;
    const search = searchParams.get("search") || undefined;
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : 50;

    const list = await getInquiries({ status, inquiryType, search, limit });
    return apiSuccess({ inquiries: list });
  } catch (err) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return apiError("UNAUTHORIZED", "অননুমোদিত অ্যাক্সেস।", 401);
    }
    return apiError("SERVER_ERROR", "ইনকোয়ারি তালিকা লোড করা যায়নি।", 500);
  }
}

const UpdateStatusSchema = z.object({
  id: z.string(),
  status: z.enum(["new", "contacted", "discussing", "quoted", "won", "cancelled", "archived"]),
  notes: z.string().optional(),
});

export async function PATCH(req: NextRequest) {
  try {
    const auth = await requireAdminAuth(req, ["owner", "admin", "support"]);
    const body = await req.json();
    const parsed = UpdateStatusSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("VALIDATION_ERROR", "অবৈধ স্ট্যাটাস ভ্যালু।", 400);
    }

    const { id, status, notes } = parsed.data;
    const inquiry = await getInquiryById(id);
    if (!inquiry) {
      return apiError("NOT_FOUND", "ইনকোয়ারি পাওয়া যায়নি।", 404);
    }

    await updateInquiryStatus(id, status, notes);
    await logAdminAudit({
      userId: auth.user.id,
      userEmail: auth.user.email,
      action: "update_inquiry_status",
      resourceType: "inquiry",
      resourceId: id,
      details: { previousStatus: inquiry.status, newStatus: status, referenceCode: inquiry.referenceCode },
      req,
    });

    return apiSuccess({ success: true, message: "ইনকোয়ারি স্ট্যাটাস আপডেট হয়েছে।" });
  } catch (err) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return apiError("UNAUTHORIZED", "অননুমোদিত অ্যাক্সেস।", 401);
    }
    if (err instanceof Error && err.message === "FORBIDDEN") {
      return apiError("FORBIDDEN", "এই অ্যাকশনের জন্য পর্যাপ্ত অনুমতি নেই।", 403);
    }
    return apiError("SERVER_ERROR", "ইনকোয়ারি আপডেট করা যায়নি।", 500);
  }
}

