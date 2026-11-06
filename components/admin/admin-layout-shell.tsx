"use client";

import { useState } from "react";
import { AdminSidebar } from "./admin-sidebar";
import { AdminHeader } from "./admin-header";
import { AdminMobileNav } from "./admin-mobile-nav";
import { X } from "lucide-react";

interface AdminLayoutShellProps {
  children: React.ReactNode;
  user?: {
    name: string;
    email: string;
    role: string;
  };
  title?: string;
  subtitle?: string;
  unreadCount?: number;
}

export function AdminLayoutShell({
  children,
  user,
  title,
  subtitle,
  unreadCount = 0,
}: AdminLayoutShellProps) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  return (
    <div className="flex h-screen bg-bg-primary text-text-primary overflow-hidden font-sans">
      {/* Desktop Persistent Sidebar */}
      <div className="hidden md:flex h-full shrink-0">
        <AdminSidebar user={user} />
      </div>

      {/* Mobile Drawer Backdrop & Drawer */}
      {mobileDrawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="অ্যাডমিন সাইডবার মেনু"
          className="fixed inset-0 z-50 flex md:hidden"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileDrawerOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative flex-1 flex flex-col max-w-[280px] w-full bg-card h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            <div className="absolute top-2.5 right-2.5 z-20">
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                aria-label="মেনু বন্ধ করুন"
                className="p-2 text-text-muted hover:text-text-primary rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <AdminSidebar user={user} onCloseMobile={() => setMobileDrawerOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <AdminHeader
          title={title}
          subtitle={subtitle}
          unreadNotifications={unreadCount}
          onToggleMobileMenu={() => setMobileDrawerOpen(true)}
        />

        <main className="flex-1 overflow-y-auto px-3 py-3 sm:px-6 sm:py-5 pb-20 md:pb-6">
          <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
            {children}
          </div>
        </main>

        {/* Mobile Sticky Bottom Nav */}
        <AdminMobileNav unreadCount={unreadCount} />
      </div>
    </div>
  );
}

