import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/admin";
import { getDb } from "@/lib/db";
import { automationRules, automationRuns } from "@/db/schema";
import { desc } from "drizzle-orm";
import { AdminLayoutShell } from "@/components/admin/admin-layout-shell";
import { AutomationsManager } from "./automations-manager";

export const instant = false;

export const metadata = {
  title: "বিজনেস অটোমেশন ইঞ্জিন | Projukti Labs Admin",
};

export default async function AdminAutomationsPage() {
  const auth = await getAdminSession();
  if (!auth) {
    redirect("/admin/login");
  }

  const db = getDb();
  const rules = await db.select().from(automationRules);
  const runs = await db.select().from(automationRuns).orderBy(desc(automationRuns.executedAt)).limit(30);

  return (
    <AdminLayoutShell
      user={{
        name: auth.user.name,
        email: auth.user.email,
        role: auth.user.role,
      }}
      title="বিজনেস অটোমেশন ইঞ্জিন"
      subtitle="ইভেন্ট-ড্রাইভেন ব্যাকগ্রাউন্ড রুলস, টাস্ক শিডিউলিং ও অটোমেটেড অ্যালার্ট"
    >
      <AutomationsManager initialRules={rules} initialRuns={runs} />
    </AdminLayoutShell>
  );
}

