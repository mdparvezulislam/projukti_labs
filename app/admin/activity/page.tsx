import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/admin";
import { getDb } from "@/lib/db";
import { adminAuditLogs } from "@/db/schema";
import { desc } from "drizzle-orm";
import { AdminLayoutShell } from "@/components/admin/admin-layout-shell";
import { History, ShieldCheck, Clock, User } from "lucide-react";

export const metadata = {
  title: "অডিট ও অ্যাক্টিভিটি লগ | Projukti Labs Admin",
};

export default async function AdminActivityPage() {
  const auth = await getAdminSession();
  if (!auth) {
    redirect("/admin/login");
  }

  const db = getDb();
  const logs = await db.select().from(adminAuditLogs).orderBy(desc(adminAuditLogs.createdAt)).limit(50);

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
      <div className="space-y-4">
        <div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="h-5 w-5 text-accent" aria-hidden="true" />
            <div>
              <h3 className="text-sm font-bold text-text-primary">ইমিউটেবল অডিট ট্রেইল</h3>
              <p className="text-xs text-text-muted">প্রতিটি সংবেদনশীল অ্যাডমিন অপারেশনের সিকিউর লগ</p>
            </div>
          </div>
          <span className="text-xs font-mono text-accent bg-accent/10 px-2 py-1 rounded">
            {logs.length}টি রেকর্ড
          </span>
        </div>

        <div className="space-y-2">
          {logs.length === 0 ? (
            <div className="bg-card border border-border rounded-xl p-8 text-center text-xs text-text-muted flex flex-col items-center gap-2">
              <History className="h-8 w-8 text-text-muted/40" aria-hidden="true" />
              <span>কোনো অডিট লগ রেকর্ড নেই।</span>
            </div>
          ) : (
            logs.map((log) => (
              <div
                key={log.id}
                className="bg-card border border-border rounded-xl p-3 sm:p-4 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 hover:border-border-hover transition-colors"
              >
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-text-primary font-mono text-xs">
                      {log.action}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-bg-primary border border-border text-accent uppercase font-medium">
                      {log.resourceType}
                    </span>
                    {log.resourceId && (
                      <span className="text-[10px] text-text-muted font-mono truncate">
                        ID: {log.resourceId}
                      </span>
                    )}
                  </div>

                  <div className="text-[11px] text-text-muted flex items-center gap-3 flex-wrap">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" aria-hidden="true" />
                      <span>{log.userEmail || "System"}</span>
                    </span>
                    {log.ipHash && (
                      <span className="font-mono text-[10px] text-text-muted">
                        IP Hash: {log.ipHash.slice(0, 10)}…
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right text-[10px] text-text-muted shrink-0 flex items-center gap-1">
                  <Clock className="h-3 w-3" aria-hidden="true" />
                  <span>{new Date(log.createdAt).toLocaleString("bn-BD")}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayoutShell>
  );
}

