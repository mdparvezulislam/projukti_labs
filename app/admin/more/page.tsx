import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/admin";
import { AdminLayoutShell } from "@/components/admin/admin-layout-shell";

import Link from "next/link";
import {
  LayoutTemplate,
  Briefcase,
  BookOpen,
  FolderKanban,
  HelpCircle,
  Activity,
  History,
  Settings,
  UserCheck,
  FileCheck,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

export const instant = false;

export const metadata = {
  title: "সকল মেনু | Projukti Labs Admin",
};

export default async function AdminMoreMenuPage() {
  const auth = await getAdminSession();
  if (!auth) {
    redirect("/admin/login");
  }

  const sections = [
    {
      group: "সিএমএস ও কনটেন্ট",
      items: [
        { label: "পেজ ও সেকশন এডিটর", href: "/admin/content/pages", icon: LayoutTemplate },
        { label: "সার্ভিস ও প্যাকেজ", href: "/admin/content/services", icon: Briefcase },
        { label: "ব্লগ পোস্ট ইঞ্জিন", href: "/admin/content/blog", icon: BookOpen },
        { label: "পোর্টফোলিও ব্লুপ্রিন্ট", href: "/admin/content/portfolio", icon: FolderKanban },
        { label: "সাধারণ জিজ্ঞাসা (FAQ)", href: "/admin/content/faqs", icon: HelpCircle },
      ],
    },
    {
      group: "বিজনেস ও সিআরএম",
      items: [
        { label: "কোটেশন তৈরি ও হিস্ট্রি", href: "/admin/quotes", icon: FileCheck },
        { label: "গ্রাহক ডিরেক্টরি", href: "/admin/customers", icon: UserCheck },
      ],
    },
    {
      group: "সিস্টেম ও কনফিগারেশন",
      items: [
        { label: "সিস্টেম হেলথ মনিটরিং", href: "/admin/system", icon: Activity },
        { label: "অডিট ও সিকিউরিটি লগ", href: "/admin/activity", icon: History },
        { label: "বিজনেস ও এসইও সেটিংস", href: "/admin/settings", icon: Settings },
      ],
    },
  ];

  return (
    <AdminLayoutShell
      user={{
        name: auth.user.name,
        email: auth.user.email,
        role: auth.user.role,
      }}
      title="সকল মেনু ও ফিচারসমূহ"
      subtitle="মোবাইল নেভিগেশন ও সরাসরি অ্যাক্সেস"
    >
      <div className="space-y-4 max-w-xl">
        <Link
          href="/"
          target="_blank"
          className="bg-card border border-border rounded-xl p-3.5 flex items-center justify-between hover:border-accent transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <ExternalLink className="h-4 w-4 text-accent-text" aria-hidden="true" />
            <span className="text-xs font-bold text-text-primary">পাবলিক ওয়েবসাইট দেখুন</span>
          </div>
          <ChevronRight className="h-4 w-4 text-text-muted" aria-hidden="true" />
        </Link>

        {sections.map((grp) => (
          <div key={grp.group} className="space-y-1.5">
            <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider px-2">
              {grp.group}
            </div>
            <div className="bg-card border border-border rounded-xl divide-y divide-border overflow-hidden">
              {grp.items.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between p-3.5 hover:bg-card-hover transition-colors min-h-[44px]"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-accent-text" aria-hidden="true" />
                      <span className="text-xs font-semibold text-text-primary">
                        {item.label}
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-text-muted" aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </AdminLayoutShell>
  );
}

