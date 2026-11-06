"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, FileText, Bell, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  unreadCount?: number;
}

export function AdminMobileNav({ unreadCount = 0 }: MobileNavProps) {
  const pathname = usePathname();

  const navItems = [
    {
      label: "ড্যাশবোর্ড",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      active: pathname === "/admin/dashboard" || pathname === "/admin",
    },
    {
      label: "লিডস",
      href: "/admin/leads",
      icon: Users,
      active: pathname.startsWith("/admin/leads") || pathname.startsWith("/admin/inquiries"),
    },
    {
      label: "কনটেন্ট",
      href: "/admin/content",
      icon: FileText,
      active: pathname.startsWith("/admin/content"),
    },
    {
      label: "নোটিফিকেশন",
      href: "/admin/notifications",
      icon: Bell,
      active: pathname.startsWith("/admin/notifications"),
      badge: unreadCount > 0 ? unreadCount : null,
    },
    {
      label: "আরও",
      href: "/admin/more",
      icon: Menu,
      active: pathname.startsWith("/admin/more") || pathname.startsWith("/admin/settings") || pathname.startsWith("/admin/system"),
    },
  ];

  return (
    <nav
      aria-label="মোবাইল অ্যাডমিন নেভিগেশন"
      className="fixed bottom-0 left-0 right-0 z-40 h-14 bg-card/95 backdrop-blur-md border-t border-border flex items-center justify-around px-2 md:hidden"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={item.active ? "page" : undefined}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full min-h-[44px] min-w-[44px] relative text-[11px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
              item.active
                ? "text-accent font-semibold"
                : "text-text-muted hover:text-text-primary"
            )}
          >
            <div className="relative">
              <Icon className={cn("h-5 w-5 mb-0.5", item.active ? "text-accent" : "text-text-muted")} aria-hidden="true" />
              {item.badge && (
                <span className="absolute -top-1 -right-2 bg-accent text-bg-primary text-[9px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center tabular-nums">
                  {item.badge > 9 ? "9+" : item.badge}
                </span>
              )}
            </div>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

