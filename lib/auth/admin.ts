import { getDb } from "@/lib/db";
import { adminUsers, adminSessions, adminAuditLogs, AdminUser, AdminSession, AdminRole } from "@/db/schema";
import { eq, and, gt } from "drizzle-orm";
import { generateSessionToken, sha256, hashPassword, verifyPassword } from "@/lib/auth/crypto";
export { hashPassword, verifyPassword };
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "pl_admin_session";
export const SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60; // 7 days

export interface AuthenticatedAdmin {
  user: AdminUser;
  session: AdminSession;
}

/**
 * Creates a new secure 256-bit session for an admin user in Cloudflare D1.
 */
export async function createAdminSession(
  userId: string,
  req?: Request
): Promise<{ rawToken: string; session: AdminSession; cookieString: string }> {
  const db = getDb();
  const { rawToken, tokenHashHex } = await generateSessionToken();

  const ipAddress = req
    ? req.headers.get("cf-connecting-ip") || req.headers.get("x-forwarded-for") || "127.0.0.1"
    : null;
  const userAgent = req ? req.headers.get("user-agent") : null;
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE_SECONDS * 1000);
  const sessionId = `ses_${crypto.randomUUID()}`;

  await db.insert(adminSessions).values({
    id: sessionId,
    userId,
    tokenHash: tokenHashHex,
    ipAddress,
    userAgent,
    expiresAt,
    createdAt: new Date(),
  });

  // Update user lastLoginAt
  await db
    .update(adminUsers)
    .set({ lastLoginAt: new Date(), updatedAt: new Date() })
    .where(eq(adminUsers.id, userId));

  const isProduction = process.env.NODE_ENV === "production" || (process.env.ENVIRONMENT as string) === "production";
  const secureFlag = isProduction ? "; Secure" : "";
  const cookieString = `${ADMIN_COOKIE_NAME}=${rawToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_MAX_AGE_SECONDS}${secureFlag}`;

  const sessionRecord = (
    await db.select().from(adminSessions).where(eq(adminSessions.id, sessionId)).limit(1)
  )[0];

  return { rawToken, session: sessionRecord, cookieString };
}

/**
 * Looks up an active admin session and associated user by raw token.
 */
export async function lookupAdminSession(rawToken: string): Promise<AuthenticatedAdmin | null> {
  try {
    const tokenHashHex = await sha256(rawToken);
    const db = getDb();
    const now = new Date();

    const sessionRows = await db
      .select()
      .from(adminSessions)
      .where(and(eq(adminSessions.tokenHash, tokenHashHex), gt(adminSessions.expiresAt, now)))
      .limit(1);

    if (!sessionRows[0]) return null;

    const session = sessionRows[0];
    const userRows = await db
      .select()
      .from(adminUsers)
      .where(and(eq(adminUsers.id, session.userId), eq(adminUsers.isActive, true)))
      .limit(1);

    if (!userRows[0]) return null;

    return {
      user: userRows[0],
      session,
    };
  } catch {
    return null;
  }
}

/**
 * Verifies the incoming admin session from cookie, database lookup, and expiration check.
 */
export async function getAdminSession(req?: Request): Promise<AuthenticatedAdmin | null> {
  try {
    let rawToken: string | undefined;

    if (req) {
      const cookieHeader = req.headers.get("cookie");
      if (cookieHeader) {
        const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${ADMIN_COOKIE_NAME}=([^;]+)`));
        if (match) rawToken = match[1];
      }
    } else {
      try {
        const cookieStore = await cookies();
        rawToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
      } catch {
        // Ignored outside Next.js request context
      }
    }

    if (!rawToken) return null;
    return lookupAdminSession(rawToken);
  } catch {
    return null;
  }
}

/**
 * Revokes an active session by token hash.
 */
export async function revokeAdminSession(rawToken: string): Promise<void> {
  try {
    const tokenHashHex = await sha256(rawToken);
    const db = getDb();
    await db.delete(adminSessions).where(eq(adminSessions.tokenHash, tokenHashHex));
  } catch {
    // Ignore revoke errors
  }
}

/**
 * Validates whether a user's role has permission for allowed roles.
 * Owner role always has universal permission.
 */
export function hasRolePermission(userRole: string, allowedRoles: AdminRole[]): boolean {
  if (userRole === "owner") return true;
  return allowedRoles.includes(userRole as AdminRole);
}

/**
 * Role-based access control guard.
 * Validates session and ensures the user possesses one of the allowed roles.
 */
export async function requireAdminAuth(
  req?: Request,
  allowedRoles?: AdminRole[]
): Promise<AuthenticatedAdmin> {
  const auth = await getAdminSession(req);
  if (!auth) {
    throw new Error("UNAUTHORIZED");
  }

  if (allowedRoles && allowedRoles.length > 0) {
    if (!hasRolePermission(auth.user.role, allowedRoles)) {
      throw new Error("FORBIDDEN");
    }
  }

  return auth;
}

/**
 * Records an immutable audit log entry in Cloudflare D1.
 */
export async function logAdminAudit(entry: {
  userId?: string | null;
  userEmail?: string | null;
  action: string;
  resourceType: string;
  resourceId?: string | null;
  details?: Record<string, unknown>;
  req?: Request;
}): Promise<void> {
  try {
    const db = getDb();
    let ipHash: string | null = null;
    if (entry.req) {
      const rawIp =
        entry.req.headers.get("cf-connecting-ip") || entry.req.headers.get("x-forwarded-for") || "127.0.0.1";
      ipHash = await sha256(rawIp);
    }

    await db.insert(adminAuditLogs).values({
      id: `aud_${crypto.randomUUID()}`,
      userId: entry.userId ?? null,
      userEmail: entry.userEmail ?? null,
      action: entry.action,
      resourceType: entry.resourceType,
      resourceId: entry.resourceId ?? null,
      details: entry.details,
      ipHash,
      createdAt: new Date(),
    });
  } catch {
    // Audit logging should not crash the main transaction
  }
}
