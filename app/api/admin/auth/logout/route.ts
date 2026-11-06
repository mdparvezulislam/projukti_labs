import { NextRequest, NextResponse } from "next/server";
import { getAdminSession, revokeAdminSession, logAdminAudit, ADMIN_COOKIE_NAME } from "@/lib/auth/admin";

export async function POST(req: NextRequest) {
  const auth = await getAdminSession(req);
  const cookieValue = req.cookies.get(ADMIN_COOKIE_NAME)?.value;

  if (cookieValue) {
    await revokeAdminSession(cookieValue);
  }

  if (auth) {
    await logAdminAudit({
      userId: auth.user.id,
      userEmail: auth.user.email,
      action: "logout",
      resourceType: "user",
      resourceId: auth.user.id,
      req,
    });
  }

  const res = NextResponse.json({
    success: true,
    data: { message: "সফলভাবে লগআউট করা হয়েছে।" },
  });

  res.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: "",
    path: "/",
    maxAge: 0,
  });

  return res;
}
