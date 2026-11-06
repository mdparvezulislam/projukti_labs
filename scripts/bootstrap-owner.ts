/**
 * Projukti Labs — Safe Initial Owner Bootstrap Script
 * Usage:
 *   OWNER_NAME="Md Parvezul Islam" OWNER_EMAIL="parvez@projuktilabs.tech" OWNER_PASSWORD="StrongSecurePassword123!" pnpm admin:bootstrap
 */
import { bootstrapInitialOwner, hasOwnerUser } from "../lib/auth/bootstrap";

async function main() {
  const name = process.env.OWNER_NAME || "Md Parvezul Islam";
  const email = process.env.OWNER_EMAIL || "founder@projuktilabs.tech";
  const password = process.env.OWNER_PASSWORD;

  console.log("=== Projukti Labs: Owner Bootstrap ===");

  const exists = await hasOwnerUser();
  if (exists) {
    console.log("[Notice] An owner account already exists in Cloudflare D1. Bootstrap aborted.");
    process.exit(0);
  }

  if (!password) {
    console.error("[Error] OWNER_PASSWORD environment variable is required to bootstrap initial owner.");
    console.error('Example: OWNER_NAME="Md Parvezul Islam" OWNER_EMAIL="admin@projuktilabs.tech" OWNER_PASSWORD="YourPassword!" pnpm admin:bootstrap');
    process.exit(1);
  }

  try {
    const result = await bootstrapInitialOwner({ name, email, password });
    console.log("[Success] Initial Owner created successfully!");
    console.log(`User ID: ${result.userId}`);
    console.log(`Email:   ${result.email}`);
    console.log(`Role:    ${result.role}`);
    console.log("You can now log into /admin/login.");
  } catch (err) {
    console.error("[Error] Bootstrap failed:", err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

main();

