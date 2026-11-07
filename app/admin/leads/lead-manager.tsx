"use client";

import { useState } from "react";
import { Lead } from "@/db/schema";
import { Plus, Search, CheckCircle2, Loader2 } from "lucide-react";

interface LeadManagerProps {
  initialLeads: Lead[];
}

export function LeadManager({ initialLeads }: LeadManagerProps) {
  const [leadsList, setLeadsList] = useState<Lead[]>(initialLeads);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStage, setSelectedStage] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // New Lead Form state
  const [newTitle, setNewTitle] = useState("");
  const [newStage, setNewStage] = useState<string>("new");
  const [newPriority, setNewPriority] = useState<string>("medium");
  const [newValueBdt, setNewValueBdt] = useState<string>("");

  const stages = [
    { key: "new", label: "নতুন (New)" },
    { key: "contacted", label: "যোগাযোগকৃত" },
    { key: "qualified", label: "যোগ্য বিবেচিত" },
    { key: "proposal", label: "প্রস্তাব পাঠানো" },
    { key: "negotiation", label: "আলোচনায়" },
    { key: "won", label: "সফল (Won)" },
    { key: "lost", label: "বাতিল (Lost)" },
  ];

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setStatusMessage(null);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          stage: newStage,
          priority: newPriority,
          estimatedValueBdt: newValueBdt ? parseInt(newValueBdt) : null,
        }),
      });
      const data = (await res.json()) as { success?: boolean; data?: { lead: Lead } };
      if (res.ok && data.success && data.data?.lead) {
        setLeadsList([data.data.lead, ...leadsList]);
        setIsModalOpen(false);
        setNewTitle("");
        setNewValueBdt("");
        setStatusMessage("নতুন লিড সফলভাবে যুক্ত করা হয়েছে।");
      }
    } catch {
      setStatusMessage("লিড তৈরি করতে ত্রুটি হয়েছে।");
    } finally {
      setCreating(false);
    }
  };

  const handleStageChange = async (leadId: string, stage: string) => {
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, stage }),
      });
      const data = (await res.json()) as { success?: boolean };
      if (res.ok && data.success) {
        setLeadsList((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, stage } : l))
        );
      }
    } catch {
      // Ignored
    }
  };

  const filtered = leadsList.filter((l) => {
    const matchesStage = selectedStage === "all" || l.stage === selectedStage;
    const matchesSearch = !searchTerm || l.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStage && matchesSearch;
  });

  const priorityColors: Record<string, string> = {
    urgent: "bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/30",
    high: "bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30",
    medium: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30",
    low: "bg-zinc-500/15 text-zinc-700 dark:text-zinc-300 border-zinc-500/30",
  };

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="bg-card border border-border rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-xs">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" aria-hidden="true" />
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="লিড শিরোনাম দিয়ে খুঁজুন…"
            className="w-full pl-9 pr-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
            className="px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
          >
            <option value="all">সকল স্টেজ</option>
            {stages.map((st) => (
              <option key={st.key} value={st.key}>{st.label}</option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-accent text-accent-foreground text-xs font-bold transition-all hover:bg-accent-hover min-h-[44px] shrink-0"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span>নতুন লিড</span>
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-lg flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Leads List / Cards */}
      <div className="space-y-2.5">
        {filtered.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-8 text-center text-xs text-text-muted">
            কোনো লিড রেকর্ড পাওয়া যায়নি।
          </div>
        ) : (
          filtered.map((lead) => (
            <div
              key={lead.id}
              className="bg-card border border-border rounded-xl p-3.5 sm:p-4 hover:border-border-hover transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-sm text-text-primary truncate">
                    {lead.title}
                  </h3>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                      priorityColors[lead.priority] || "bg-zinc-500/10 text-zinc-400"
                    }`}
                  >
                    {(lead.priority || "medium").toUpperCase()}
                  </span>
                </div>

                <div className="text-xs text-text-muted mt-1 flex items-center gap-3">
                  <span>তৈরি: {new Date(lead.createdAt).toLocaleDateString("bn-BD")}</span>
                  {lead.estimatedValueBdt && (
                    <span className="font-bold text-accent tabular-nums">
                      ৳ {lead.estimatedValueBdt.toLocaleString("bn-BD")}
                    </span>
                  )}
                </div>
              </div>

              {/* Stage Transition Selector */}
              <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                <span className="text-[11px] text-text-muted hidden sm:inline">স্টেজ:</span>
                <select
                  value={lead.stage}
                  onChange={(e) => handleStageChange(lead.id, e.target.value)}
                  className="flex-1 sm:flex-none px-2.5 py-1.5 text-xs bg-bg-primary border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[40px]"
                >
                  {stages.map((st) => (
                    <option key={st.key} value={st.key}>{st.label}</option>
                  ))}
                </select>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Lead Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="নতুন লিড যুক্ত করুন"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        >
          <div className="bg-card border border-border rounded-xl p-5 sm:p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="border-b border-border pb-3">
              <h3 className="text-base font-bold text-text-primary">নতুন লিড যুক্ত করুন</h3>
              <p className="text-xs text-text-muted mt-0.5">নতুন প্রজেক্ট বা সম্ভাব্য ক্লায়েন্ট তথ্য</p>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  লিড শিরোনাম
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="উদা: আরমান ট্রেডার্স — ই-কমার্স স্টোর"
                  className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    প্রাইওরিটি
                  </label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    স্টেজ
                  </label>
                  <select
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
                  >
                    {stages.map((st) => (
                      <option key={st.key} value={st.key}>{st.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  সম্ভাব্য বাজেট (BDT)
                </label>
                <input
                  type="number"
                  value={newValueBdt}
                  onChange={(e) => setNewValueBdt(e.target.value)}
                  placeholder="100000"
                  className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px] tabular-nums"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-2 rounded-lg bg-card-hover border border-border text-xs text-text-muted hover:text-text-primary min-h-[44px]"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent text-accent-foreground text-xs font-bold hover:bg-accent-hover min-h-[44px]"
                >
                  {creating && <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />}
                  <span>সংরক্ষণ করুন</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
