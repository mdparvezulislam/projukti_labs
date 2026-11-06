import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { adminUsers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyPasswordWebCrypto } from "@/lib/auth/crypto";
import { createAdminSession, logAdminAudit, ADMIN_COOKIE_NAME, SESSION_MAX_AGE_SECONDS } from "@/lib/auth/admin";
import { apiError, handleZodError } from "@/lib/validation/api";

const LoginSchema = z.object({
  email: z.string().trim().email("Please provide a valid email address"),
  password: z.string().min(1, "Password is required"),
});

// Simple in-memory rate limiting: 5 failed attempts per IP per 5 minutes
const loginAttempts = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || now > entry.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + 5 * 60 * 1000 });
    return true;
  }
  if (entry.count >= 5) {
    return false;
  }
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("cf-connecting-ip") || req.headers.get("x-forwarded-for") || "127.0.0.1";
  if (!checkRateLimit(ip)) {
    return apiError(
      "RATE_LIMIT_EXCEEDED",
      "অতিরিক্ত লগইন চেষ্টার কারণে অ্যাকাউন্ট সাময়িকভাবে লক করা হয়েছে। ৫ মিনিট পর পুনরায় চেষ্টা করুন।",
      429
    );
  }

  try {
    const rawBody = await req.json();
    const parsed = LoginSchema.safeParse(rawBody);
    if (!parsed.success) {
      return handleZodError(parsed.error);
    }

    const { email, password } = parsed.data;
    const db = getDb();
    const userRows = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.email, email.toLowerCase()))
      .limit(1);

    if (!userRows[0]) {
      return apiError("INVALID_CREDENTIALS", "ইমেল বা পাসওয়ার্ড সঠিক নয়।", 401);
    }

    const user = userRows[0];
    if (!user.isActive) {
      return apiError("ACCOUNT_INACTIVE", "এই অ্যাকাউন্টটি নিষ্ক্রিয় করা হয়েছে। অ্যাডমিনের সাথে যোগাযোগ করুন।", 403);
    }

    const isValidPassword = await verifyPasswordWebCrypto(
      password,
      user.passwordHash,
      user.passwordSalt
    );

    if (!isValidPassword) {
      await logAdminAudit({
        userId: user.id,
        userEmail: user.email,
        action: "login_failed",
        resourceType: "user",
        resourceId: user.id,
        details: { reason: "incorrect_password" },
        req,
      });
      return apiError("INVALID_CREDENTIALS", "ইমেল বা পাসওয়ার্ড সঠিক নয়।", 401);
    }

    // Create session
    const { rawToken } = await createAdminSession(user.id, req);

    await logAdminAudit({
      userId: user.id,
      userEmail: user.email,
      action: "login_success",
      resourceType: "user",
      resourceId: user.id,
      details: { role: user.role },
      req,
    });

    const isProduction = process.env.NODE_ENV === "production" || (process.env.ENVIRONMENT as string) === "production";
    const res = NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      meta: { timestamp: new Date().toISOString() },
    });

    res.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: rawToken,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE_SECONDS,
      secure: isProduction,
    });

    return res;
  } catch (err) {
    console.error("Login route error:", err);
    return apiError("SERVER_ERROR", "লগইন প্রসেস করতে সাময়িক সমস্যা হয়েছে।", 500);
  }
}
