import { NextRequest } from "next/server";
import { requireAdminAuth, logAdminAudit } from "@/lib/auth/admin";
import { getSiteSettings, updateSiteSetting } from "@/lib/cms";
import { apiSuccess, apiError } from "@/lib/validation/api";
import { z } from "zod";

export async function GET(req: NextRequest) {
  try {
    await requireAdminAuth(req);
    const settings = await getSiteSettings();
    return apiSuccess({ settings });
  } catch (err) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return apiError("UNAUTHORIZED", "অননুমোদিত অ্যাক্সেস।", 401);
    }
    return apiError("SERVER_ERROR", "সেটিংস লোড করা যায়নি।", 500);
  }
}

const SaveSettingSchema = z.object({
  key: z.string().min(2),
  value: z.record(z.string(), z.unknown()),
});

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAdminAuth(req, ["owner", "admin"]);
    const body = await req.json();
    const parsed = SaveSettingSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("VALIDATION_ERROR", "অবৈধ সেটিংস ডাটা।", 400);
    }

    const { key, value } = parsed.data;
    await updateSiteSetting(key, value);

    await logAdminAudit({
      userId: auth.user.id,
      userEmail: auth.user.email,
      action: "update_settings",
      resourceType: "settings",
      resourceId: key,
      details: { key },
      req,
    });

    return apiSuccess({ success: true, message: "সেটিংস সংরক্ষিত হয়েছে।" });
  } catch (err) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return apiError("UNAUTHORIZED", "অননুমোদিত অ্যাক্সেস।", 401);
    }
    return apiError("SERVER_ERROR", "সেটিংস সংরক্ষণ ব্যর্থ হয়েছে।", 500);
  }
}

