"use client";

import { useState } from "react";
import { AutomationRule, AutomationRun } from "@/db/schema";
import { Zap, Play, RotateCcw, CheckCircle2, AlertCircle, Clock, Loader2 } from "lucide-react";

interface AutomationsManagerProps {
  initialRules: AutomationRule[];
  initialRuns: AutomationRun[];
}

export function AutomationsManager({ initialRules, initialRuns }: AutomationsManagerProps) {
  const [rules, setRules] = useState<AutomationRule[]>(initialRules);
  const [runs, setRuns] = useState<AutomationRun[]>(initialRuns);
  const [togglingRuleId, setTogglingRuleId] = useState<string | null>(null);
  const [retryingRunId, setRetryingRunId] = useState<string | null>(null);
  const [triggering, setTriggering] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleToggleRule = async (ruleId: string, currentStatus: boolean | number) => {
    setTogglingRuleId(ruleId);
    setStatusMessage(null);
    const newStatus = !currentStatus;

    try {
      const res = await fetch("/api/admin/automations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ruleId, isActive: newStatus }),
      });
      const data = (await res.json()) as { success?: boolean };
      if (res.ok && data.success) {
        setRules((prev) =>
          prev.map((r) => (r.id === ruleId ? { ...r, isActive: newStatus } : r))
        );
        setStatusMessage("অটোমেশন রুল সফলভাবে আপডেট হয়েছে।");
      }
    } catch {
      setStatusMessage("রুল আপডেট করা যায়নি।");
    } finally {
      setTogglingRuleId(null);
    }
  };

  const handleRetry = async (runId: string) => {
    setRetryingRunId(runId);
    setStatusMessage(null);
    try {
      const res = await fetch("/api/admin/automations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "retry", runId }),
      });
      const data = (await res.json()) as { success?: boolean; error?: { message?: string } };
      if (res.ok && data.success) {
        setStatusMessage("রান সফলভাবে পুনরায় সম্পন্ন হয়েছে।");
        setRuns((prev) =>
          prev.map((r) => (r.id === runId ? { ...r, status: "success", errorMessage: null } : r))
        );
      } else {
        setStatusMessage(data.error?.message || "পুনরায় রান ব্যর্থ হয়েছে।");
      }
    } catch {
      setStatusMessage("সার্ভার ত্রুটি হয়েছে।");
    } finally {
      setRetryingRunId(null);
    }
  };

  const handleTriggerHealthCheck = async () => {
    setTriggering(true);
    setStatusMessage(null);
    try {
      const res = await fetch("/api/admin/automations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "trigger",
          eventType: "system.health_check",
          payload: { triggeredBy: "admin_manual" },
        }),
      });
      const data = (await res.json()) as { success?: boolean };
      if (res.ok && data.success) {
        setStatusMessage("সিস্টেম হেলথ চেক সফলভাবে এক্সিকিউট করা হয়েছে।");
      }
    } catch {
      setStatusMessage("ট্রিগার ব্যর্থ হয়েছে।");
    } finally {
      setTriggering(false);
    }
  };

  return (
    <div className="space-y-6">
      {statusMessage && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-lg flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Rules Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
              <Zap className="h-4 w-4 text-accent" aria-hidden="true" />
              <span>বিজনেস অটোমেশন রুলস</span>
            </h3>
            <p className="text-xs text-text-muted">
              সিস্টেম ইভেন্ট অনুযায়ী স্বয়ংক্রিয়ভাবে কার্যকর হওয়া ব্যাকগ্রাউন্ড রুলস
            </p>
          </div>

          <button
            type="button"
            onClick={handleTriggerHealthCheck}
            disabled={triggering}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card-hover border border-border text-xs text-text-primary hover:border-border-hover transition-colors min-h-[40px]"
          >
            {triggering ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
            ) : (
              <Play className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            )}
            <span>হেলথ চেক ট্রিগার</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {rules.map((rule) => {
            const isToggling = togglingRuleId === rule.id;
            return (
              <div
                key={rule.id}
                className="bg-card border border-border rounded-xl p-4 flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-xs text-text-primary">{rule.name}</span>
                    <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-surface-elevated border border-border text-accent-text font-semibold">
                      {rule.eventType}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">
                    {rule.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-[11px] text-text-muted">
                    স্ট্যাটাস:{" "}
                    <strong className={rule.isActive ? "text-emerald-700 dark:text-emerald-300" : "text-zinc-500"}>
                      {rule.isActive ? "সক্রিয়" : "নিষ্ক্রিয়"}
                    </strong>
                  </span>

                  <button
                    type="button"
                    disabled={isToggling}
                    onClick={() => handleToggleRule(rule.id, Boolean(rule.isActive))}
                    className={`px-3 py-1 text-xs font-semibold rounded-md border transition-colors min-h-[36px] ${
                      rule.isActive
                        ? "bg-red-500/15 border-red-500/30 text-red-700 dark:text-red-300 hover:bg-red-500/25"
                        : "bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/25"
                    }`}
                  >
                    {isToggling ? "হালনাগাদ হচ্ছে…" : rule.isActive ? "নিষ্ক্রিয় করুন" : "সক্রিয় করুন"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Execution History */}
      <div className="bg-card border border-border rounded-xl p-4 sm:p-5 space-y-3">
        <div className="border-b border-border pb-3">
          <h3 className="text-sm font-bold text-text-primary">সাম্প্রতিক এক্সিকিউশন হিস্ট্রি</h3>
          <p className="text-xs text-text-muted">অটোমেশন ইঞ্জিনের রিয়েল-টাইম রান ও ফলাফল</p>
        </div>

        {runs.length === 0 ? (
          <div className="py-8 text-center text-xs text-text-muted">
            কোনো অটোমেশন রান এখনো রেকর্ড করা হয়নি।
          </div>
        ) : (
          <div className="space-y-2">
            {runs.map((run) => (
              <div
                key={run.id}
                className="flex items-center justify-between p-3 rounded-lg bg-surface-elevated/70 border border-border/60 text-xs gap-3"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-text-primary">
                      {run.eventType}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase ${
                        run.status === "success"
                          ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30"
                          : "bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/30"
                      }`}
                    >
                      {run.status}
                    </span>
                  </div>

                  {run.errorMessage ? (
                    <div className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
                      <span className="truncate">{run.errorMessage}</span>
                    </div>
                  ) : (
                    <div className="text-[10px] text-text-muted mt-1 truncate">
                      রান আইডি: {run.id}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right text-[10px] text-text-muted flex items-center gap-1">
                    <Clock className="h-2.5 w-2.5" aria-hidden="true" />
                    <span>{new Date(run.executedAt).toLocaleTimeString("bn-BD")}</span>
                  </div>

                  {run.status === "failed" && (
                    <button
                      type="button"
                      disabled={retryingRunId === run.id}
                      onClick={() => handleRetry(run.id)}
                      className="p-1.5 text-xs text-accent hover:bg-accent/10 rounded flex items-center gap-1 transition-colors"
                      title="পুনরায় চেষ্টা করুন"
                    >
                      {retryingRunId === run.id ? (
                        <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" />
                      ) : (
                        <RotateCcw className="h-3 w-3" aria-hidden="true" />
                      )}
                      <span>রিট্রাই</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
