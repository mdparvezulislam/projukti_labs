import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/admin";
import { getCrmDashboardMetrics } from "@/lib/crm";
import { AdminLayoutShell } from "@/components/admin/admin-layout-shell";
import Link from "next/link";
import {
  Inbox,
  Users,
  FileCheck,
  TrendingUp,
  ArrowRight,
  Plus,
  Clock,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "ড্যাশবোর্ড ওভারভিউ | Projukti Labs Admin",
};

export default async function AdminDashboardPage() {
  const auth = await getAdminSession();
  if (!auth) {
    redirect("/admin/login");
  }

  const metrics = await getCrmDashboardMetrics();

  const statCards = [
    {
      label: "মোট ইনকোয়ারি",
      value: metrics.totalInquiries.toString(),
      subtext: `${metrics.newInquiries}টি নতুন পর্যালোচনার অপেক্ষায়`,
      icon: Inbox,
      href: "/admin/inquiries",
      color: "text-blue-400 bg-blue-500/10",
    },
    {
      label: "সক্রিয় লিড পাইপলাইন",
      value: metrics.openLeadsCount.toString(),
      subtext: "চলমান আলোচনা ও প্রজেক্ট প্রস্তাব",
      icon: Users,
      href: "/admin/leads",
      color: "text-accent bg-accent/10",
    },
    {
      label: "সম্ভাব্য পাইপলাইন ভ্যালু",
      value: `৳${(metrics.pipelineValueBdt / 1000).toFixed(0)}k`,
      subtext: "উন্মুক্ত লিডগুলোর মোট প্রজেক্ট ভ্যালু",
      icon: TrendingUp,
      href: "/admin/leads",
      color: "text-emerald-400 bg-emerald-500/10",
    },
    {
      label: "অ্যাক্টিভ কোটেশন",
      value: metrics.totalQuotes.toString(),
      subtext: `${metrics.pendingQuotes}টি ক্লায়েন্টের উত্তরের অপেক্ষায়`,
      icon: FileCheck,
      href: "/admin/quotes",
      color: "text-purple-400 bg-purple-500/10",
    },
  ];

  return (
    <AdminLayoutShell
      user={{
        name: auth.user.name,
        email: auth.user.email,
        role: auth.user.role,
      }}
      title="বিজনেস অপারেটিং সিস্টেম"
      subtitle="Projukti Labs — কেন্দ্রীয় ব্যবস্থাপনা, সিআরএম ও লাইভ মেট্রিক্স"
    >
      {/* Welcome Banner & Quick Action Buttons */}
      <div className="bg-card border border-border rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-text-primary tracking-tight">
              স্বাগতম, {auth.user.name}
            </h2>
            <Badge variant="accent">লাইভ স্টুডিও মোড</Badge>
          </div>
          <p className="text-xs text-text-muted mt-0.5">
            আজকের ব্যবসার অগ্রগতি, ইনকোয়ারি ও ওয়েবসাইট কনটেন্ট এখান থেকে পরিচালনা করুন।
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Link
            href="/admin/quotes"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-accent text-bg-primary text-xs font-bold transition-all hover:bg-accent-hover min-h-[44px]"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span>নতুন কোট তৈরি</span>
          </Link>
          <Link
            href="/admin/content/blog"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-card-hover border border-border text-text-primary text-xs font-semibold hover:border-border-hover transition-all min-h-[44px]"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            <span>ব্লগ লিখুন</span>
          </Link>
        </div>
      </div>

      {/* Primary KPI Grid (High Density) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="bg-card border border-border rounded-xl p-3.5 sm:p-4 hover:border-border-hover transition-all group flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] sm:text-xs font-medium text-text-muted line-clamp-1">
                  {card.label}
                </span>
                <div className={`p-1.5 rounded-md shrink-0 ${card.color}`}>
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </div>
              </div>
              <div className="mt-2">
                <div className="text-xl sm:text-2xl font-black text-text-primary tabular-nums tracking-tight">
                  {card.value}
                </div>
                <div className="text-[10px] text-text-muted mt-0.5 line-clamp-1">
                  {card.subtext}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Two-Column Section: Recent Inquiries & Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Inquiries (2 Cols) */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div>
              <h3 className="text-sm font-bold text-text-primary tracking-tight">
                সাম্প্রতিক ইনকোয়ারি
              </h3>
              <p className="text-[11px] text-text-muted">
                ওয়েবসাইট ও ল্যান্ডিং পেজ থেকে আসা সর্বশেষ অনুরোধসমূহ
              </p>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-xs text-accent hover:underline inline-flex items-center gap-1 font-semibold p-1"
            >
              <span>সবগুলো দেখুন</span>
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>

          {metrics.recentInquiries.length === 0 ? (
            <div className="py-8 text-center text-xs text-text-muted">
              এখনো কোনো ইনকোয়ারি জমা পড়েনি।
            </div>
          ) : (
            <div className="space-y-2">
              {metrics.recentInquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-bg-primary/50 border border-border/60 hover:border-border transition-colors text-xs gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-text-primary truncate">
                        {inq.fullName}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-card border border-border text-accent">
                        {inq.referenceCode}
                      </span>
                    </div>
                    <div className="text-[11px] text-text-muted truncate mt-0.5">
                      {inq.email} • {inq.companyName || "ব্যক্তিগত উদ্যোগ"}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium uppercase bg-accent/10 text-accent">
                      {inq.status}
                    </span>
                    <div className="text-[10px] text-text-muted mt-0.5">
                      {new Date(inq.createdAt).toLocaleDateString("bn-BD")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Audit Activities (1 Col) */}
        <div className="bg-card border border-border rounded-xl p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div>
              <h3 className="text-sm font-bold text-text-primary tracking-tight">
                সিস্টেম অ্যাক্টিভিটি
              </h3>
              <p className="text-[11px] text-text-muted">অ্যাডমিন অ্যাকশন ও পরিবর্তন লগ</p>
            </div>
            <Link
              href="/admin/activity"
              className="text-xs text-accent hover:underline font-semibold p-1"
            >
              লগ
            </Link>
          </div>

          {metrics.recentAudit.length === 0 ? (
            <div className="py-8 text-center text-xs text-text-muted">
              কোনো সাম্প্রতিক অ্যাক্টিভিটি নেই।
            </div>
          ) : (
            <div className="space-y-2.5">
              {metrics.recentAudit.map((log) => (
                <div key={log.id} className="text-xs space-y-0.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-text-primary truncate">
                      {log.action.replace(/_/g, " ")}
                    </span>
                    <span className="text-[10px] text-text-muted shrink-0 flex items-center gap-1">
                      <Clock className="h-2.5 w-2.5" aria-hidden="true" />
                      {new Date(log.createdAt).toLocaleTimeString("bn-BD", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="text-[11px] text-text-muted truncate">
                    {log.userEmail || "System"} • {log.resourceType}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayoutShell>
  );
}

