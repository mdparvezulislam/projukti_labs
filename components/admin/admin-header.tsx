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
          className="md:hidden inline-flex h-9.5 w-9.5 items-center justify-center rounded-full border border-border/80 bg-surface/90 text-text-secondary hover:text-text-primary hover:bg-surface-muted shadow-2xs transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Menu className="h-4 w-4" aria-hidden="true" />
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
          className="relative inline-flex h-9.5 w-9.5 items-center justify-center rounded-full border border-border/80 bg-surface/90 text-text-secondary hover:text-text-primary hover:bg-surface-muted shadow-2xs transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Bell className="h-4 w-4" aria-hidden="true" />
          {unreadNotifications > 0 && (
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-brand-orange-strong ring-2 ring-card" />
          )}
        </Link>

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </header>
  );
}
