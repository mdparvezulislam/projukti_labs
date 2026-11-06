"use client";

import { useState } from "react";
import { Notification } from "@/db/schema";
import { Bell, CheckCheck, Clock, ExternalLink } from "lucide-react";
import Link from "next/link";

interface NotificationsViewProps {
  initialNotifications: Notification[];
}

export function NotificationsView({ initialNotifications }: NotificationsViewProps) {
  const [list, setList] = useState<Notification[]>(initialNotifications);
  const [markingAll, setMarkingAll] = useState(false);

  const handleMarkAsRead = async (id: string) => {
    try {
      await fetch("/api/admin/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "mark_read", notificationId: id }),
      });
      setList((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
    } catch {
      // Ignored
    }
  };

  const handleMarkAllRead = async () => {
    setMarkingAll(true);
    try {
      await fetch("/api/admin/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "mark_all_read" }),
      });
      setList((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch {
      // Ignored
    } finally {
      setMarkingAll(false);
    }
  };

  const typeStyles: Record<string, string> = {
    info: "text-blue-700 dark:text-blue-300 bg-blue-500/15 border-blue-500/30",
    success: "text-emerald-700 dark:text-emerald-300 bg-emerald-500/15 border-emerald-500/30",
    warning: "text-amber-800 dark:text-amber-300 bg-amber-500/15 border-amber-500/30",
    alert: "text-red-700 dark:text-red-300 bg-red-500/15 border-red-500/30",
  };

  return (
    <div className="space-y-4 max-w-3xl">
      <div className="flex items-center justify-between bg-card border border-border rounded-xl p-3 sm:p-4">
        <div>
          <h3 className="text-sm font-bold text-text-primary">নোটিফিকেশন সেন্টার</h3>
          <p className="text-xs text-text-muted">সিস্টেম সতর্কতা, নতুন ইনকোয়ারি ও রিমাইন্ডার</p>
        </div>

        <button
          type="button"
          disabled={markingAll || list.every((n) => n.isRead)}
          onClick={handleMarkAllRead}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card-hover border border-border text-xs text-text-primary hover:border-border-hover disabled:opacity-40 transition-colors min-h-[40px]"
        >
          <CheckCheck className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
          <span>সবগুলো পঠিত মার্ক করুন</span>
        </button>
      </div>

      <div className="space-y-2">
        {list.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-12 text-center text-xs text-text-muted flex flex-col items-center justify-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-surface-elevated border border-border flex items-center justify-center text-accent shadow-xs">
              <Bell className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <p className="font-semibold text-text-primary text-sm">কোনো নোটিফিকেশন নেই</p>
              <p className="text-text-muted text-xs mt-0.5">সবগুলো সিস্টেম আপডেট দেখা সম্পন্ন হয়েছে।</p>
            </div>
          </div>
        ) : (
          list.map((item) => (
            <div
              key={item.id}
              onClick={() => !item.isRead && handleMarkAsRead(item.id)}
              className={`p-3.5 sm:p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                item.isRead
                  ? "bg-card border-border opacity-70"
                  : "bg-card border-accent/40 shadow-sm ring-1 ring-accent/20"
              }`}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase ${
                      typeStyles[item.type] || typeStyles.info
                    }`}
                  >
                    {item.type}
                  </span>
                  <span className="font-bold text-xs text-text-primary">
                    {item.title}
                  </span>
                  {!item.isRead && (
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  )}
                </div>

                <p className="text-xs text-text-muted mt-1 leading-relaxed">
                  {item.message}
                </p>

                <div className="text-[10px] text-text-muted mt-2 flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Clock className="h-2.5 w-2.5" aria-hidden="true" />
                    <span>{new Date(item.createdAt).toLocaleString("bn-BD")}</span>
                  </span>
                </div>
              </div>

              {item.actionUrl && (
                <Link
                  href={item.actionUrl}
                  className="p-2 text-text-muted hover:text-accent rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent shrink-0"
                  title="বিস্তারিত দেখুন"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

