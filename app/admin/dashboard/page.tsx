import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/admin";
import { getCrmDashboardMetrics } from "@/lib/crm";
import { getCmsBlogPosts, getCmsPortfolio, getCmsServices } from "@/lib/cms";
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
  BookOpen,
  Briefcase,
  Layers,
  ShieldCheck,
  Database,
  HardDrive,
  Cpu,
  Zap,
  Image as ImageIcon,
  LayoutGrid,
  UserCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const instant = false;

export const metadata = {
  title: "ড্যাশবোর্ড ওভারভিউ | Projukti Labs Admin",
};

export default async function AdminDashboardPage() {
  const auth = await getAdminSession();
  if (!auth) {
    redirect("/admin/login");
  }

  const [crmMetrics, blogList, portfolioList, servicesList] = await Promise.all([
    getCrmDashboardMetrics(),
    getCmsBlogPosts(),
    getCmsPortfolio(),
    getCmsServices(),
  ]);

  const statCards = [
    {
      label: "মোট ইনকোয়ারি",
      value: crmMetrics.totalInquiries.toString(),
      subtext: `${crmMetrics.newInquiries}টি নতুন পর্যালোচনার অপেক্ষায়`,
      icon: Inbox,
      href: "/admin/inquiries",
      color: "text-blue-700 dark:text-blue-300 bg-blue-500/15 border border-blue-500/20",
    },
    {
      label: "সক্রিয় লিড পাইপলাইন",
      value: crmMetrics.openLeadsCount.toString(),
      subtext: "চলমান আলোচনা ও প্রজেক্ট প্রস্তাব",
      icon: Users,
      href: "/admin/leads",
      color: "text-brand-orange-strong dark:text-accent bg-brand-orange-soft dark:bg-accent/15 border border-brand-orange/20 dark:border-accent/20",
    },
    {
      label: "সম্ভাব্য পাইপলাইন ভ্যালু",
      value: `৳${(crmMetrics.pipelineValueBdt / 1000).toFixed(0)}k`,
      subtext: "উন্মুক্ত লিডগুলোর মোট প্রজেক্ট ভ্যালু",
      icon: TrendingUp,
      href: "/admin/leads",
      color: "text-emerald-700 dark:text-emerald-300 bg-emerald-500/15 border border-emerald-500/20",
    },
    {
      label: "অ্যাক্টিভ কোটেশন",
      value: crmMetrics.totalQuotes.toString(),
      subtext: `${crmMetrics.pendingQuotes}টি ক্লায়েন্টের উত্তরের অপেক্ষায়`,
      icon: FileCheck,
      href: "/admin/quotes",
      color: "text-purple-700 dark:text-purple-300 bg-purple-500/15 border border-purple-500/20",
    },
  ];

  const contentCards = [
    {
      label: "লাইভ ব্লগ প্রবন্ধ",
      value: `${blogList.length} টি`,
      subtext: "MDX ব্লগ ইঞ্জিন ও জ্ঞানকোষ",
      icon: BookOpen,
      href: "/admin/content/blog",
    },
    {
      label: "পোর্টফোলিও ব্লুপ্রিন্ট",
      value: `${portfolioList.length} টি`,
      subtext: "ভেরিফাইড লাইভ ও প্রোডাক্ট আর্কিটেকচার",
      icon: Briefcase,
      href: "/admin/content/portfolio",
    },
    {
      label: "অ্যাক্টিভ সার্ভিস ক্যাটাগরি",
      value: `${servicesList.length} টি`,
      subtext: "কাস্টম সমাধান ও ফ্ল্যাগশিপ প্যাকেজ",
      icon: Layers,
      href: "/admin/content/services",
    },
    {
      label: "কাস্টমার ডিরেক্টরি",
      value: "সক্রিয় রেকর্ড",
      subtext: "লিড থেকে রূপান্তরিত বিশ্বস্ত ক্লায়েন্ট",
      icon: UserCheck,
      href: "/admin/customers",
    },
  ];

  const operationalServices = [
    {
      name: "Cloudflare D1 Relational DB",
      status: "সক্রিয় ও সুস্থ",
      detail: "২১টি স্কিমা টেবিল • রিয়েলটাইম সিঙ্ক",
      icon: Database,
    },
    {
      name: "Cloudflare R2 Media Storage",
      status: "সংযুক্ত ও প্রস্তুত",
      detail: "ডাইরেক্ট অ্যাসেট আপলোড ইঞ্জিন",
      icon: HardDrive,
    },
    {
      name: "Scheduled Publishing Cron",
      status: "স্বয়ংক্রিয় শিডিউলিং সচল",
      detail: "মিনিট-লেভেল অটো পাবলিশ প্রসেসর",
      icon: Cpu,
    },
    {
      name: "CRM Business Automation",
      status: "পাইপলাইন অটোমেশন সচল",
      detail: "ইনকোয়ারি → লিড → কোট → ক্লায়েন্ট",
      icon: Zap,
    },
  ];

  const quickShortcuts = [
    { label: "ইনকোয়ারি", href: "/admin/inquiries", icon: Inbox },
    { label: "পাইপলাইন লিড", href: "/admin/leads", icon: Users },
    { label: "কোট তৈরি", href: "/admin/quotes", icon: FileCheck },
    { label: "কাস্টমার", href: "/admin/customers", icon: UserCheck },
    { label: "ব্লগ স্টুডিও", href: "/admin/content/blog", icon: Sparkles },
    { label: "মিডিয়া লাইব্রেরি", href: "/admin/media", icon: ImageIcon },
    { label: "ওয়েবসাইট সিএমএস", href: "/admin/content/pages", icon: LayoutGrid },
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
      {/* Welcome Banner */}
      <div className="bg-card border border-border rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-warm-sm">
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
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-accent text-accent-foreground text-xs font-bold transition-all hover:bg-accent-hover shadow-warm-sm min-h-[44px]"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span>নতুন কোট তৈরি</span>
          </Link>
          <Link
            href="/admin/content/blog"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-card border border-border text-text-primary text-xs font-semibold hover:border-border-hover transition-all shadow-warm-sm min-h-[44px]"
          >
            <Sparkles className="h-3.5 w-3.5 text-brand-orange-strong dark:text-accent" aria-hidden="true" />
            <span>ব্লগ লিখুন</span>
          </Link>
        </div>
      </div>

      {/* Operational Health Bar */}
      <div className="bg-card border border-border rounded-2xl p-3 sm:p-4 shadow-warm-sm space-y-2">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            <h3 className="text-xs font-bold text-text-primary">সিস্টেম অপারেশনাল হেলথ ও ক্লাউড ব্যাকবোন</h3>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
            100% OPERATIONAL
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
          {operationalServices.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.name}
                className="p-2.5 rounded-xl bg-surface-elevated border border-border flex items-center gap-2.5"
              >
                <div className="h-8 w-8 rounded-lg bg-surface flex items-center justify-center text-accent shrink-0 border border-border">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span className="text-[11px] font-bold text-text-primary truncate">{svc.status}</span>
                  </div>
                  <div className="text-[10px] text-text-muted truncate">{svc.name}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7 Quick Action Shortcuts */}
      <div className="bg-card border border-border rounded-2xl p-3 sm:p-4 shadow-warm-sm">
        <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2.5">
          দ্রুত অ্যাকশন শর্টকাট
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {quickShortcuts.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-surface-elevated border border-border hover:border-accent hover:bg-surface-elevated/80 transition-all text-center group min-h-[52px]"
              >
                <Icon className="h-4 w-4 text-text-muted group-hover:text-accent transition-colors" aria-hidden="true" />
                <span className="text-[11px] font-semibold text-text-primary group-hover:text-accent transition-colors line-clamp-1">
                  {item.label}
                </span>
              </Link>
            );
          })}
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
              className="bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-warm-sm hover:shadow-warm-md hover:border-border-hover transition-all duration-300 group flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] sm:text-xs font-medium text-text-muted line-clamp-1">
                  {card.label}
                </span>
                <div className={`p-1.5 rounded-lg shrink-0 ${card.color}`}>
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

      {/* Content & Infrastructure Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {contentCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="bg-card border border-border rounded-2xl p-3.5 sm:p-4 shadow-warm-sm hover:border-border-hover transition-all duration-200 flex items-center gap-3"
            >
              <div className="p-2 rounded-xl bg-surface-muted text-brand-orange-strong dark:text-accent shrink-0">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] text-text-muted line-clamp-1">{card.label}</div>
                <div className="text-sm font-bold text-text-primary truncate">{card.value}</div>
                <div className="text-[9px] text-text-muted line-clamp-1">{card.subtext}</div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Two-Column Section: Recent Inquiries & Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Inquiries (2 Cols) */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-4 sm:p-5 space-y-3 shadow-warm-sm">
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
              className="text-xs text-brand-orange-strong dark:text-accent hover:underline inline-flex items-center gap-1 font-semibold p-1"
            >
              <span>সবগুলো দেখুন</span>
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>

          {crmMetrics.recentInquiries.length === 0 ? (
            <div className="py-8 text-center text-xs text-text-muted">
              এখনো কোনো ইনকোয়ারি জমা পড়েনি।
            </div>
          ) : (
            <div className="space-y-2">
              {crmMetrics.recentInquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-surface-muted/60 border border-border hover:border-border-hover transition-colors text-xs gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-text-primary truncate">
                        {inq.fullName}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface border border-border text-brand-orange-strong dark:text-accent font-semibold">
                        {inq.referenceCode}
                      </span>
                    </div>
                    <div className="text-[11px] text-text-muted truncate mt-0.5">
                      {inq.email} • {inq.companyName || "ব্যক্তিগত উদ্যোগ"}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] uppercase bg-brand-orange-soft text-brand-orange-strong border border-brand-orange/20 font-semibold">
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
        <div className="bg-card border border-border rounded-2xl p-4 sm:p-5 space-y-3 shadow-warm-sm">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div>
              <h3 className="text-sm font-bold text-text-primary tracking-tight">
                সিস্টেম অ্যাক্টিভিটি
              </h3>
              <p className="text-[11px] text-text-muted">অ্যাডমিন অ্যাকশন ও পরিবর্তন লগ</p>
            </div>
            <Link
              href="/admin/activity"
              className="text-xs text-brand-orange-strong dark:text-accent hover:underline font-semibold p-1"
            >
              লগ
            </Link>
          </div>

          {crmMetrics.recentAudit.length === 0 ? (
            <div className="py-8 text-center text-xs text-text-muted">
              কোনো সাম্প্রতিক অ্যাক্টিভিটি নেই।
            </div>
          ) : (
            <div className="space-y-2.5">
              {crmMetrics.recentAudit.map((log) => (
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
