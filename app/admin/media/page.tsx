import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/admin";
import { getDb } from "@/lib/db";
import { mediaAssets } from "@/db/schema";
import { desc } from "drizzle-orm";
import { getCloudflareBindings } from "@/lib/env";
import { AdminLayoutShell } from "@/components/admin/admin-layout-shell";
import { MediaManager } from "@/components/admin/media/media-manager";

export const instant = false;

export const metadata = {
  title: "মিডিয়া লাইব্রেরি | Projukti Labs Admin",
  description: "ওয়েবসাইট ও ব্লগ অ্যাসেট, ইমেজ আপলোড ও R2 স্টোরেজ ম্যানেজমেন্ট",
};

export default async function AdminMediaPage() {
  const auth = await getAdminSession();
  if (!auth) {
    redirect("/admin/login");
  }

  const db = getDb();
  const initialAssets = await db
    .select()
    .from(mediaAssets)
    .orderBy(desc(mediaAssets.createdAt))
    .limit(100);

  const bindings = getCloudflareBindings();
  const r2Configured = Boolean(
    bindings.R2_BUCKET &&
      typeof (bindings.R2_BUCKET as { put?: unknown }).put === "function"
  );

  return (
    <AdminLayoutShell
      user={{
        name: auth.user.name,
        email: auth.user.email,
        role: auth.user.role,
      }}
      title="মিডিয়া লাইব্রেরি ও স্টোরেজ"
      subtitle="ব্লগ কাভার, পোর্টফোলিও স্ক্রিনশট ও ডিজিটাল অ্যাসেট ম্যানেজমেন্ট"
    >
      <MediaManager initialAssets={initialAssets} r2Configured={r2Configured} />
    </AdminLayoutShell>
  );
}

