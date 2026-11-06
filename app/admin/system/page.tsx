import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/admin";
import { getDb } from "@/lib/db";
import {
  inquiries,
  leads,
  quotes,
  customers,
  services,
  blogPosts,
  portfolioProjects,
  faqs,
  adminUsers,
  adminAuditLogs,
  automationRuns,
} from "@/db/schema";
import { count } from "drizzle-orm";
import { getSafeEnvironmentSummary } from "@/lib/env";
import { AdminLayoutShell } from "@/components/admin/admin-layout-shell";
import { Activity, Database, Server, Shield, Terminal } from "lucide-react";

export const metadata = {
  title: "সিস্টেম মনিটরিং ও ব্যাকআপ | Projukti Labs Admin",
};

export default async function AdminSystemPage() {
  const auth = await getAdminSession();
  if (!auth) {
    redirect("/admin/login");
  }

  const db = getDb();
  const [inqCount] = await db.select({ count: count() }).from(inquiries);
  const [leadCount] = await db.select({ count: count() }).from(leads);
  const [qteCount] = await db.select({ count: count() }).from(quotes);
  const [cstCount] = await db.select({ count: count() }).from(customers);
  const [srvCount] = await db.select({ count: count() }).from(services);
  const [postCount] = await db.select({ count: count() }).from(blogPosts);
  const [projCount] = await db.select({ count: count() }).from(portfolioProjects);
  const [faqCount] = await db.select({ count: count() }).from(faqs);
  const [userCount] = await db.select({ count: count() }).from(adminUsers);
  const [audCount] = await db.select({ count: count() }).from(adminAuditLogs);
  const [runCount] = await db.select({ count: count() }).from(automationRuns);

  const safeEnv = getSafeEnvironmentSummary();

  const tables = [
    { name: "inquiries (ইনকোয়ারি)", count: Number(inqCount?.count ?? 0) },
    { name: "leads (লিড পাইপলাইন)", count: Number(leadCount?.count ?? 0) },
    { name: "quotes (কোটেশন)", count: Number(qteCount?.count ?? 0) },
    { name: "customers (গ্রাহক ডিরেক্টরি)", count: Number(cstCount?.count ?? 0) },
    { name: "services (সার্ভিস ক্যাটালগ)", count: Number(srvCount?.count ?? 0) },
    { name: "blog_posts (ব্লগ প্রবন্ধ)", count: Number(postCount?.count ?? 0) },
    { name: "portfolio_projects (ব্লুপ্রিন্ট)", count: Number(projCount?.count ?? 0) },
    { name: "faqs (সাধারণ জিজ্ঞাসা)", count: Number(faqCount?.count ?? 0) },
    { name: "admin_users (অ্যাডমিন ব্যবহারকারী)", count: Number(userCount?.count ?? 0) },
    { name: "admin_audit_logs (অডিট লগ)", count: Number(audCount?.count ?? 0) },
    { name: "automation_runs (অটোমেশন এক্সিকিউশন)", count: Number(runCount?.count ?? 0) },
  ];

  return (
    <AdminLayoutShell
      user={{
        name: auth.user.name,
        email: auth.user.email,
        role: auth.user.role,
      }}
      title="সিস্টেম মনিটরিং ও নির্ভরযোগ্যতা"
      subtitle="Cloudflare D1 ডাটাবেস টেবিল কাউন্ট, ব্যাকআপ ও লাইভ রানটাইম টেলিমেট্রি"
    >
      <div className="space-y-4">
        {/* Environment Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Server className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <div className="text-[11px] text-text-muted">এজ রানটাইম</div>
              <div className="text-sm font-bold text-text-primary">Cloudflare Workers</div>
              <div className="text-[10px] text-emerald-400 font-medium">Isolates Architecture</div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-accent/10 text-accent">
              <Database className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <div className="text-[11px] text-text-muted">প্রাইমারি ডাটাবেস</div>
              <div className="text-sm font-bold text-text-primary">Cloudflare D1 (SQLite)</div>
              <div className="text-[10px] text-accent font-medium">Drizzle ORM Engine</div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400">
              <Shield className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <div className="text-[11px] text-text-muted">সিকিউরিটি ও এনভায়রনমেন্ট</div>
              <div className="text-sm font-bold text-text-primary capitalize">{String(safeEnv.environment)}</div>
              <div className="text-[10px] text-text-muted font-mono truncate">{String(safeEnv.appUrl)}</div>
            </div>
          </div>
        </div>

        {/* Live Table Counts */}
        <div className="bg-card border border-border rounded-xl p-4 sm:p-5 space-y-3">
          <div className="border-b border-border pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                <Activity className="h-4 w-4 text-accent" aria-hidden="true" />
                <span>Cloudflare D1 ডাটাবেস টেবিল কাউন্ট</span>
              </h3>
              <p className="text-xs text-text-muted">লাইভ ডাটাবেসে প্রতিটি সত্তার বর্তমান রেকর্ড সংখ্যা</p>
            </div>
            <span className="text-xs font-mono text-accent bg-accent/10 px-2 py-0.5 rounded">
              ২১টি স্কিমা টেবিল
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {tables.map((t) => (
              <div
                key={t.name}
                className="p-3 rounded-lg bg-surface-elevated border border-border flex items-center justify-between text-xs"
              >
                <span className="text-text-secondary truncate font-medium">{t.name}</span>
                <span className="text-sm font-black text-text-primary tabular-nums shrink-0 ml-2">
                  {t.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Disaster Recovery & D1 Backup Instructions */}
        <div className="bg-card border border-border rounded-xl p-4 sm:p-5 space-y-3">
          <div className="border-b border-border pb-3">
            <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
              <Terminal className="h-4 w-4 text-accent" aria-hidden="true" />
              <span>ডিজাস্টার রিকভারি ও ব্যাকআপ পদ্ধতি (Founder Playbook)</span>
            </h3>
            <p className="text-xs text-text-muted">
              ডাটা সুরক্ষা ও অফ-সাইট SQL স্ন্যাপশট ব্যাকআপ কমান্ড
            </p>
          </div>

          <div className="space-y-3 text-xs text-text-muted leading-relaxed">
            <p>
              যেকোনো প্রোডাকশন স্কিমা মাইগ্রেশন বা ডেপ্লয়মেন্টের পূর্বে লোকাল বা ক্লাউড ব্যাকআপ এক্সপোর্ট করা নিশ্চিত করুন:
            </p>

            <div className="space-y-2">
              <div>
                <span className="font-semibold text-text-primary">১. রিমোট D1 ব্যাকআপ এক্সপোর্ট কমান্ড:</span>
                <pre className="mt-1 p-2.5 bg-surface-elevated rounded-lg border border-border text-accent-text font-mono text-[11px] overflow-x-auto">
                  npx wrangler d1 export projukti_labs_db --remote --output=&quot;./db/backups/backup-$(date +%Y%m%d%H%M%S).sql&quot;
                </pre>
              </div>

              <div>
                <span className="font-semibold text-text-primary">২. ইমার্জেন্সি রিস্টোর কমান্ড:</span>
                <pre className="mt-1 p-2.5 bg-surface-elevated rounded-lg border border-border text-accent-text font-mono text-[11px] overflow-x-auto">
                  npx wrangler d1 execute projukti_labs_db --remote --file=&quot;./db/backups/TARGET_BACKUP.sql&quot;
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayoutShell>
  );
}

