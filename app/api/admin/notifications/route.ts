import { NextRequest } from "next/server";
import { requireAdminAuth } from "@/lib/auth/admin";
import { getNotifications, markNotificationAsRead, markAllNotificationsAsRead } from "@/lib/automation/processor";
import { apiSuccess, apiError } from "@/lib/validation/api";
import { z } from "zod";

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAdminAuth(req);
    const list = await getNotifications(auth.user.id);
    return apiSuccess({ notifications: list });
  } catch (err) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return apiError("UNAUTHORIZED", "অননুমোদিত অ্যাক্সেস।", 401);
    }
    return apiError("SERVER_ERROR", "নোটিফিকেশন লোড করা যায়নি।", 500);
  }
}

const PatchNotificationSchema = z.object({
  action: z.enum(["mark_read", "mark_all_read"]),
  notificationId: z.string().optional(),
});

export async function PATCH(req: NextRequest) {
  try {
    await requireAdminAuth(req);
    const body = await req.json();
    const parsed = PatchNotificationSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("VALIDATION_ERROR", "অবৈধ কমান্ড।", 400);
    }

    if (parsed.data.action === "mark_read" && parsed.data.notificationId) {
      await markNotificationAsRead(parsed.data.notificationId);
    } else if (parsed.data.action === "mark_all_read") {
      await markAllNotificationsAsRead();
    }

    return apiSuccess({ success: true });
  } catch (err) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return apiError("UNAUTHORIZED", "অননুমোদিত অ্যাক্সেস।", 401);
    }
    return apiError("SERVER_ERROR", "নোটিফিকেশন আপডেট ব্যর্থ হয়েছে।", 500);
  }
}

