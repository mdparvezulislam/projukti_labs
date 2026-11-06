import { NextRequest } from "next/server";
import { getAdminSession } from "@/lib/auth/admin";
import { apiSuccess, apiError } from "@/lib/validation/api";

export async function GET(req: NextRequest) {
  const auth = await getAdminSession(req);
  if (!auth) {
    return apiError("UNAUTHORIZED", "অনুগ্রহ করে প্রথমে লগইন করুন।", 401);
  }

  return apiSuccess({
    user: {
      id: auth.user.id,
      name: auth.user.name,
      email: auth.user.email,
      role: auth.user.role,
      lastLoginAt: auth.user.lastLoginAt,
    },
  });
}

