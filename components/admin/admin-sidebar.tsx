"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  Users,
  FileCheck,
  UserCheck,
  LayoutTemplate,
  Briefcase,
  BookOpen,
  FolderKanban,
  HelpCircle,
  Zap,
  Activity,
  History,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  user?: {
    name: string;
    email: string;
    role: string;
  };
  onCloseMobile?: () => void;
}

export function AdminSidebar({ user, onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  const navGroups = [
    {
      title: "প্রধান ড্যাশবোর্ড",
      items: [
        { label: "ওভারভিউ", href: "/admin/dashboard", icon: LayoutDashboard },
      ],
    },
    {
      title: "বিজনেস ও সিআরএম",
      items: [
        { label: "ইনকোয়ারি সমূহ", href: "/admin/inquiries", icon: Inbox },
        { label: "লিড পাইপলাইন", href: "/admin/leads", icon: Users },
        { label: "কোটেশন তৈরি", href: "/admin/quotes", icon: FileCheck },
        { label: "গ্রাহক ডিরেক্টরি", href: "/admin/customers", icon: UserCheck },
      ],
    },
    {
      title: "ওয়েবসাইট সিএমএস",
      items: [
        { label: "পেজ ও সেকশন", href: "/admin/content/pages", icon: LayoutTemplate },
        { label: "সার্ভিস ও প্যাকেজ", href: "/admin/content/services", icon: Briefcase },
        { label: "ব্লগ পোস্ট", href: "/admin/content/blog", icon: BookOpen },
        { label: "পোর্টফোলিও", href: "/admin/content/portfolio", icon: FolderKanban },
        { label: "জিজ্ঞাসা (FAQ)", href: "/admin/content/faqs", icon: HelpCircle },
      ],
    },
    {
      title: "অটোমেশন ও সিস্টেম",
      items: [
        { label: "অটোমেশন ইঞ্জিন", href: "/admin/automations", icon: Zap },
        { label: "সিস্টেম মনিটরিং", href: "/admin/system", icon: Activity },
        { label: "অডিট ও অ্যাক্টিভিটি", href: "/admin/activity", icon: History },
        { label: "বিজনেস সেটিংস", href: "/admin/settings", icon: Settings },
      ],
    },
  ];

  return (
    <aside className="w-64 flex flex-col bg-card border-r border-border h-full select-none">
      {/* Brand Header */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-border">
        <Link
          href="/admin/dashboard"
          onClick={onCloseMobile}
          className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
        >
          <div className="h-7 w-7 rounded-lg bg-primary text-primary-foreground font-black flex items-center justify-center text-xs shadow-xs">
            PL
          </div>
          <div>
            <div className="text-sm font-bold tracking-tight text-text-primary leading-none">
              Projukti Labs
            </div>
            <div className="text-[10px] text-accent-text font-semibold mt-0.5">Admin OS v1.0</div>
          </div>
        </Link>
        <Link
          href="/"
          target="_blank"
          aria-label="পাবলিক ওয়েবসাইট দেখুন"
          className="text-text-muted hover:text-text-primary p-1.5 rounded-lg hover:bg-surface-elevated transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[36px] min-w-[36px] flex items-center justify-center"
        >
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-5">
        {navGroups.map((group) => (
          <div key={group.title} className="space-y-1">
            <div className="px-2 text-[10px] font-bold text-text-muted uppercase tracking-wider">
              {group.title}
            </div>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onCloseMobile}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[40px]",
                      isActive
                        ? "bg-brand-orange-soft text-brand-orange-strong font-semibold shadow-xs"
                        : "text-text-muted hover:text-text-primary hover:bg-surface-muted"
                    )}
                  >
                    <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-accent-text" : "text-text-muted")} aria-hidden="true" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User Profile & Logout */}
      <div className="p-3 border-t border-border bg-card/60">
        <div className="flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div className="h-8 w-8 rounded-full bg-brand-orange-strong text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
              {(user?.name || "P").charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold text-text-primary truncate">
                {user?.name || "Md Parvezul Islam"}
              </div>
              <div className="text-[10px] text-brand-orange-strong dark:text-accent uppercase font-semibold tracking-wider">
                {user?.role || "Owner"}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            aria-label="লগআউট করুন"
            className="p-1.5 text-text-muted hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </aside>
  );
}

