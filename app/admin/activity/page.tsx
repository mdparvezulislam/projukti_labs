import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/admin";
import { getDb } from "@/lib/db";
import { adminAuditLogs } from "@/db/schema";
import { desc } from "drizzle-orm";
import { AdminLayoutShell } from "@/components/admin/admin-layout-shell";
import { ActivityManager } from "@/components/admin/activity/activity-manager";

export const instant = false;

export const metadata = {
  title: "অডিট ও অ্যাক্টিভিটি লগ | Projukti Labs Admin",
};

export default async function AdminActivityPage() {
  const auth = await getAdminSession();
  if (!auth) {
    redirect("/admin/login");
  }

  const db = getDb();
  const logs = await db
    .select()
    .from(adminAuditLogs)
    .orderBy(desc(adminAuditLogs.createdAt))
    .limit(100);

  return (
    <AdminLayoutShell
      user={{
        name: auth.user.name,
        email: auth.user.email,
        role: auth.user.role,
      }}
      title="সিকিউরিটি অডিট ও অ্যাক্টিভিটি লগ"
      subtitle="অ্যাডমিন অ্যাকশন, লগইন ইভেন্ট ও ডাটাবেস পরিবর্তনের অপরিবর্তনীয় রেকর্ড"
    >
      <ActivityManager initialLogs={logs} />
    </AdminLayoutShell>
  );
}
