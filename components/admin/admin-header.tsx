"use client";

import { Menu, Bell } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/layout/theme-toggle";

interface AdminHeaderProps {
  title?: string;
  subtitle?: string;
  unreadNotifications?: number;
  onToggleMobileMenu?: () => void;
}

export function AdminHeader({
  title = "ড্যাশবোর্ড",
  subtitle,
  unreadNotifications = 0,
  onToggleMobileMenu,
}: AdminHeaderProps) {
  return (
    <header className="h-14 px-4 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          onClick={onToggleMobileMenu}
          aria-label="অ্যাডমিন মেনু খুলুন"
          className="md:hidden p-2 text-text-muted hover:text-text-primary rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="min-w-0">
          <h1 className="text-sm sm:text-base font-bold text-text-primary tracking-tight truncate leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[11px] text-text-muted hidden sm:block truncate leading-tight">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Notification Bell */}
        <Link
          href="/admin/notifications"
          aria-label="নোটিফিকেশন সেন্টার"
          className="relative p-2 text-text-muted hover:text-text-primary rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <Bell className="h-4 w-4" aria-hidden="true" />
          {unreadNotifications > 0 && (
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-accent ring-2 ring-card" />
          )}
        </Link>

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </header>
  );
}
