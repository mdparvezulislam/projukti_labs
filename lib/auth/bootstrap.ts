import { getDb } from "@/lib/db";
import { adminUsers } from "@/db/schema";
import { eq, count } from "drizzle-orm";
import { hashPasswordWebCrypto } from "@/lib/auth/crypto";
import { logAdminAudit } from "@/lib/auth/admin";

export interface BootstrapOwnerInput {
  name: string;
  email: string;
  password: string;
}

/**
 * Checks whether an active owner account already exists in Cloudflare D1.
 */
export async function hasOwnerUser(): Promise<boolean> {
  try {
    const db = getDb();
    const result = await db
      .select({ count: count() })
      .from(adminUsers)
      .where(eq(adminUsers.role, "owner"));
    return Number(result[0]?.count ?? 0) > 0;
  } catch {
    return false;
  }
}

export async function canBootstrapOwner(): Promise<boolean> {
  return !(await hasOwnerUser());
}

/**
 * One-time safe bootstrap function to create the initial studio owner.
 * Strictly rejected if an owner account already exists.
 */
export async function bootstrapInitialOwner(input: BootstrapOwnerInput): Promise<{
  success: boolean;
  userId: string;
  email: string;
  role: string;
}> {
  const ownerExists = await hasOwnerUser();
  if (ownerExists) {
    throw new Error("BOOTSTRAP_ALREADY_COMPLETED: An owner account already exists in the system.");
  }

  if (!input.name || input.name.trim().length < 2) {
    throw new Error("INVALID_NAME: Name must be at least 2 characters.");
  }

  if (!input.email || !input.email.includes("@")) {
    throw new Error("INVALID_EMAIL: Please provide a valid email address.");
  }

  if (!input.password || input.password.length < 8) {
    throw new Error("WEAK_PASSWORD: Password must be at least 8 characters long.");
  }

  const { hashHex, saltHex } = await hashPasswordWebCrypto(input.password);
  const db = getDb();
  const userId = `usr_owner_${crypto.randomUUID().slice(0, 8)}`;

  await db.insert(adminUsers).values({
    id: userId,
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    passwordHash: hashHex,
    passwordSalt: saltHex,
    role: "owner",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await logAdminAudit({
    userId,
    userEmail: input.email,
    action: "bootstrap_owner",
    resourceType: "user",
    resourceId: userId,
    details: { name: input.name, role: "owner" },
  });

  return {
    success: true,
    userId,
    email: input.email.trim().toLowerCase(),
    role: "owner",
  };
}
