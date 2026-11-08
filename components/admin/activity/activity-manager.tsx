"use client";

import { useState, useMemo } from "react";
import {
  ShieldCheck,
  Search,
  History,
  Clock,
  User,
  ChevronDown,
  ChevronUp,
  Tag,
} from "lucide-react";

export interface AuditLogItem {
  id: string;
  userId: string | null;
  userEmail: string | null;
  action: string;
  resourceType: string;
  resourceId: string | null;
  details: unknown;
  ipHash: string | null;
  createdAt: Date;
}

interface ActivityManagerProps {
  initialLogs: AuditLogItem[];
}

export function ActivityManager({ initialLogs }: ActivityManagerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedActionGroup, setSelectedActionGroup] = useState<string>("all");
  const [selectedResource, setSelectedResource] = useState<string>("all");
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);

  // Extract distinct resource types
  const resourceTypes = useMemo(() => {
    const set = new Set<string>();
    initialLogs.forEach((l) => {
      if (l.resourceType) set.add(l.resourceType);
    });
    return Array.from(set).sort();
  }, [initialLogs]);

  const filteredLogs = useMemo(() => {
    return initialLogs.filter((log) => {
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesAction = log.action.toLowerCase().includes(q);
        const matchesResource = log.resourceType.toLowerCase().includes(q);
        const matchesEmail = (log.userEmail || "").toLowerCase().includes(q);
        const matchesId = (log.resourceId || "").toLowerCase().includes(q);
        if (!matchesAction && !matchesResource && !matchesEmail && !matchesId) {
          return false;
        }
      }

      // Action group filter
      if (selectedActionGroup !== "all") {
        if (!log.action.toLowerCase().includes(selectedActionGroup)) {
          return false;
        }
      }

      // Resource filter
      if (selectedResource !== "all") {
        if (log.resourceType !== selectedResource) {
          return false;
        }
      }

      return true;
    });
  }, [initialLogs, searchQuery, selectedActionGroup, selectedResource]);

  const getActionBadgeClass = (action: string) => {
    const act = action.toLowerCase();
    if (act.includes("delete") || act.includes("remove")) {
      return "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/20";
    }
    if (act.includes("create") || act.includes("publish")) {
      return "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/20";
    }
    if (act.includes("convert") || act.includes("quote")) {
      return "bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/20";
    }
    if (act.includes("login") || act.includes("session")) {
      return "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/20";
    }
    return "bg-surface-elevated text-text-primary border-border";
  };

  return (
    <div className="space-y-4">
      {/* Overview Header Card */}
      <div className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-lg bg-accent/15 border border-accent/25 flex items-center justify-center text-accent shrink-0">
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-text-primary">ইমিউটেবল অডিট ট্রেইল</h3>
            <p className="text-xs text-text-muted">
              প্রতিটি প্রশাসনিক অপারেশন ও পরিবর্তনের সিকিউর রিয়েল-টাইম লগ
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-accent-text bg-accent/10 border border-accent/20 px-2.5 py-1 rounded-full font-semibold">
            {filteredLogs.length} / {initialLogs.length} রেকর্ড প্রদর্শিত
          </span>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-card border border-border rounded-xl p-3.5 sm:p-4 space-y-3 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-muted" aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="অ্যাকশন, ইমেল, রিসোর্স বা ID দিয়ে খুঁজুন..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
            />
          </div>

          {/* Action Group Filter */}
          <div className="relative">
            <select
              value={selectedActionGroup}
              onChange={(e) => setSelectedActionGroup(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px] appearance-none cursor-pointer"
            >
              <option value="all">সব অ্যাকশন গ্রুপ</option>
              <option value="login">লগইন / সেশন</option>
              <option value="update">আপডেট / সেটিংস পরিবর্তন</option>
              <option value="create">ক্রিয়েট / নতুন সংযোজন</option>
              <option value="delete">ডিলিট / অপসারণ</option>
              <option value="convert">কনভার্সন (Inquiry → Lead)</option>
              <option value="publish">পাবলিশিং ইভেন্ট</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-muted pointer-events-none" />
          </div>

          {/* Resource Filter */}
          <div className="relative">
            <select
              value={selectedResource}
              onChange={(e) => setSelectedResource(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px] appearance-none cursor-pointer"
            >
              <option value="all">সব রিসোর্স ধরন ({resourceTypes.length})</option>
              {resourceTypes.map((res) => (
                <option key={res} value={res}>
                  {res}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-muted pointer-events-none" />
          </div>
        </div>

        {(searchQuery || selectedActionGroup !== "all" || selectedResource !== "all") && (
          <div className="flex items-center justify-between text-xs pt-1 border-t border-border">
            <span className="text-text-muted">ফিল্টার সক্রিয় রয়েছে</span>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedActionGroup("all");
                setSelectedResource("all");
              }}
              className="text-accent hover:underline font-semibold"
            >
              ফিল্টার রিসেট করুন
            </button>
          </div>
        )}
      </div>

      {/* Logs List */}
      <div className="space-y-2">
        {filteredLogs.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-12 text-center text-xs text-text-muted flex flex-col items-center justify-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-surface-elevated border border-border flex items-center justify-center text-accent shadow-xs">
              <History className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <p className="font-semibold text-text-primary text-sm">কোনো মিল খুঁজে পাওয়া যায়নি</p>
              <p className="text-text-muted text-xs mt-0.5">অন্য সার্চ শব্দ বা ফিল্টার ব্যবহার করে চেষ্টা করুন।</p>
            </div>
          </div>
        ) : (
          filteredLogs.map((log) => {
            const isExpanded = expandedLogId === log.id;
            const hasDetails = Boolean(
              log.details &&
                typeof log.details === "object" &&
                Object.keys(log.details as Record<string, unknown>).length > 0
            );

            return (
              <div
                key={log.id}
                className="bg-card border border-border rounded-xl p-3 sm:p-4 text-xs space-y-2 hover:border-border-hover transition-colors shadow-xs"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-[11px] font-bold font-mono px-2 py-0.5 rounded-md border ${getActionBadgeClass(
                          log.action
                        )}`}
                      >
                        {log.action}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface-elevated border border-border text-accent-text uppercase font-semibold">
                        {log.resourceType}
                      </span>
                      {log.resourceId && (
                        <span className="text-[10px] text-text-muted font-mono truncate max-w-[220px]">
                          ID: {log.resourceId}
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] text-text-muted flex items-center gap-3 flex-wrap">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3 shrink-0" aria-hidden="true" />
                        <span className="text-text-primary font-medium">{log.userEmail || "System"}</span>
                      </span>
                      {log.ipHash && (
                        <span className="font-mono text-[10px] text-text-muted">
                          IP Hash: {log.ipHash.slice(0, 10)}…
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-border">
                    <div className="text-right text-[10px] text-text-muted shrink-0 flex items-center gap-1">
                      <Clock className="h-3 w-3" aria-hidden="true" />
                      <span>{new Date(log.createdAt).toLocaleString("bn-BD")}</span>
                    </div>

                    {hasDetails && (
                      <button
                        type="button"
                        onClick={() => setExpandedLogId(isExpanded ? null : log.id)}
                        className="inline-flex items-center gap-1 text-[11px] text-accent hover:underline font-semibold"
                        aria-label="Toggle details"
                      >
                        <span>{isExpanded ? "সংক্ষেপ" : "বিস্তারিত"}</span>
                        {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                      </button>
                    )}
                  </div>
                </div>

                {/* Expanded Details JSON view */}
                {isExpanded && hasDetails && (
                  <div className="mt-2 pt-2 border-t border-border bg-surface-elevated rounded-lg p-3 overflow-x-auto text-[11px] font-mono text-text-secondary">
                    <div className="text-[10px] uppercase font-bold text-text-muted mb-1 flex items-center gap-1">
                      <Tag className="h-3 w-3" /> বিস্তারিত প্যারামিটার
                    </div>
                    <pre className="whitespace-pre-wrap leading-relaxed">
                      {JSON.stringify(log.details, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
