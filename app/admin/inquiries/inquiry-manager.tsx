"use client";

import { useState } from "react";
import { Search, Filter, Phone, Mail, Building, Calendar, CheckCircle2, MessageSquare, Loader2 } from "lucide-react";
import { Inquiry } from "@/db/schema";

interface InquiryManagerProps {
  initialInquiries: Inquiry[];
}

export function InquiryManager({ initialInquiries }: InquiryManagerProps) {
  const [inquiriesList, setInquiriesList] = useState<Inquiry[]>(initialInquiries);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [activeInquiry, setActiveInquiry] = useState<Inquiry | null>(null);
  const [updating, setUpdating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const filtered = inquiriesList.filter((inq) => {
    const matchesStatus = selectedStatus === "all" || inq.status === selectedStatus;
    const s = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      inq.fullName.toLowerCase().includes(s) ||
      inq.email.toLowerCase().includes(s) ||
      inq.referenceCode.toLowerCase().includes(s) ||
      (inq.companyName && inq.companyName.toLowerCase().includes(s));
    return matchesStatus && matchesSearch;
  });

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setUpdating(true);
    setStatusMessage(null);
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = (await res.json()) as { success?: boolean };
      if (res.ok && data.success) {
        setInquiriesList((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
        if (activeInquiry && activeInquiry.id === id) {
          setActiveInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
        setStatusMessage("স্ট্যাটাস সফলভাবে আপডেট করা হয়েছে।");
      }
    } catch {
      setStatusMessage("আপডেট করতে ব্যর্থ হয়েছে।");
    } finally {
      setUpdating(false);
    }
  };

  const statusColors: Record<string, string> = {
    new: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30",
    contacted: "bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30",
    discussing: "bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30",
    quoted: "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/30",
    won: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
    cancelled: "bg-zinc-500/15 text-zinc-700 dark:text-zinc-300 border-zinc-500/30",
  };

  const statusLabels: Record<string, string> = {
    new: "নতুন",
    contacted: "যোগাযোগ করা হয়েছে",
    discussing: "আলোচনায়",
    quoted: "কোটেশন পাঠানো হয়েছে",
    won: "সফল (কনভার্টেড)",
    cancelled: "বাতিল",
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters Bar */}
      <div className="bg-card border border-border rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-warm-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" aria-hidden="true" />
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="নাম, ইমেল বা রেফারেন্স কোড দিয়ে খুঁজুন…"
            className="w-full pl-9 pr-3 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-h-[44px]"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-text-muted shrink-0 hidden sm:block" aria-hidden="true" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-h-[44px]"
          >
            <option value="all">সকল স্ট্যাটাস</option>
            <option value="new">নতুন (New)</option>
            <option value="contacted">যোগাযোগ করা হয়েছে</option>
            <option value="discussing">আলোচনায়</option>
            <option value="quoted">কোটেশন পাঠানো হয়েছে</option>
            <option value="won">সফল (Won)</option>
            <option value="cancelled">বাতিল</option>
          </select>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-lg flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Inquiries List & Detail Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* List Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-2.5">
          {filtered.length === 0 ? (
            <div className="bg-card border border-border rounded-xl p-8 text-center text-xs text-text-muted">
              কোনো ইনকোয়ারি পাওয়া যায়নি।
            </div>
          ) : (
            filtered.map((inq) => {
              const isSelected = activeInquiry?.id === inq.id;
              return (
                <div
                  key={inq.id}
                  onClick={() => setActiveInquiry(inq)}
                  className={`bg-card border rounded-2xl p-4 sm:p-5 cursor-pointer transition-all duration-300 shadow-warm-sm hover:shadow-warm-md hover:border-border-hover ${
                    isSelected ? "border-brand-orange ring-1 ring-brand-orange bg-brand-orange-soft/25" : "border-border"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-text-primary truncate">
                          {inq.fullName}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface-elevated border border-border text-accent-text font-semibold">
                          {inq.referenceCode}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                            statusColors[inq.status] || "bg-zinc-500/15 text-zinc-700 dark:text-zinc-300 border-zinc-500/30"
                          }`}
                        >
                          {statusLabels[inq.status] || inq.status}
                        </span>
                      </div>

                      <div className="text-xs text-text-muted mt-1 flex items-center gap-3 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                          <span className="truncate">{inq.email}</span>
                        </span>
                        {inq.phoneWhatsapp && (
                          <span className="flex items-center gap-1">
                            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>{inq.phoneWhatsapp}</span>
                          </span>
                        )}
                        {inq.companyName && (
                          <span className="flex items-center gap-1">
                            <Building className="h-3.5 w-3.5" aria-hidden="true" />
                            <span className="truncate">{inq.companyName}</span>
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-text-secondary mt-2 line-clamp-2 leading-relaxed bg-surface-elevated/70 p-2 rounded-lg border border-border/60">
                        {inq.projectBrief}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-[10px] text-text-muted font-medium">
                        {new Date(inq.createdAt).toLocaleDateString("bn-BD")}
                      </div>
                      {inq.budgetRange && (
                        <div className="text-xs font-bold text-accent-text mt-1 tabular-nums">
                          ৳ {inq.budgetRange}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Detail Panel Column (1 Col) */}
        <div className="bg-card border border-border rounded-2xl p-4 sm:p-5 h-fit sticky top-20 shadow-warm-sm">
          {activeInquiry ? (
            <div className="space-y-4">
              <div className="border-b border-border pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-accent">
                    {activeInquiry.referenceCode}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                      statusColors[activeInquiry.status] || "bg-zinc-500/10 text-zinc-400"
                    }`}
                  >
                    {statusLabels[activeInquiry.status] || activeInquiry.status}
                  </span>
                </div>
                <h3 className="text-base font-bold text-text-primary mt-1">
                  {activeInquiry.fullName}
                </h3>
                <div className="text-xs text-text-muted mt-0.5">
                  {activeInquiry.companyName || "ব্যক্তিগত ক্লায়েন্ট"}
                </div>
              </div>

              {/* Status Update Control */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-primary">
                  স্ট্যাটাস পরিবর্তন করুন
                </label>
                <select
                  disabled={updating}
                  value={activeInquiry.status}
                  onChange={(e) => handleUpdateStatus(activeInquiry.id, e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
                >
                  <option value="new">নতুন (New)</option>
                  <option value="contacted">যোগাযোগ করা হয়েছে</option>
                  <option value="discussing">আলোচনায়</option>
                  <option value="quoted">কোটেশন পাঠানো হয়েছে</option>
                  <option value="won">সফল (Won)</option>
                  <option value="cancelled">বাতিল</option>
                </select>
                {updating && (
                  <div className="flex items-center gap-1.5 text-[11px] text-accent">
                    <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" />
                    <span>আপডেট হচ্ছে…</span>
                  </div>
                )}
              </div>

              {/* Contact Information */}
              <div className="space-y-2 text-xs pt-2 border-t border-border">
                <div className="font-semibold text-text-primary">যোগাযোগের বিবরণ</div>
                <div className="space-y-1.5 text-text-muted">
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-accent shrink-0" aria-hidden="true" />
                    <a href={`mailto:${activeInquiry.email}`} className="hover:underline text-text-primary truncate">
                      {activeInquiry.email}
                    </a>
                  </div>
                  {activeInquiry.phoneWhatsapp && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 text-accent shrink-0" aria-hidden="true" />
                      <a href={`https://wa.me/${activeInquiry.phoneWhatsapp.replace(/[^0-9]/g, "")}`} target="_blank" className="hover:underline text-text-primary">
                        {activeInquiry.phoneWhatsapp} (WhatsApp)
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-accent shrink-0" aria-hidden="true" />
                    <span>{new Date(activeInquiry.createdAt).toLocaleString("bn-BD")}</span>
                  </div>
                </div>
              </div>

              {/* Project Scope & Brief */}
              <div className="space-y-2 text-xs pt-2 border-t border-border">
                <div className="font-semibold text-text-primary">প্রজেক্ট ব্রিফ</div>
                <div className="p-3 bg-surface-elevated rounded-lg border border-border text-text-secondary leading-relaxed whitespace-pre-wrap">
                  {activeInquiry.projectBrief}
                </div>
              </div>

              {/* Budget & Service Metadata */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-border">
                <div>
                  <div className="text-[10px] text-text-muted">বাজেট সীমা</div>
                  <div className="font-bold text-text-primary tabular-nums">
                    {activeInquiry.budgetRange ? `৳ ${activeInquiry.budgetRange}` : "আলোচনা সাপেক্ষ"}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-text-muted">সার্ভিস ক্যাটাগরি</div>
                  <div className="font-bold text-text-primary truncate">
                    {activeInquiry.serviceId || "জেনারেল"}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-16 text-center text-xs text-text-muted flex flex-col items-center justify-center gap-3">
              <div className="h-14 w-14 rounded-2xl bg-surface-elevated border border-border flex items-center justify-center text-accent/80 shadow-xs">
                <MessageSquare className="h-7 w-7 text-accent" aria-hidden="true" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-text-primary text-sm">ইনকোয়ারি বিবরণ</p>
                <p className="text-text-muted text-xs max-w-[200px] leading-relaxed">
                  বিস্তারিত দেখতে বাম পাশের তালিকা থেকে যেকোনো ইনকোয়ারিতে ক্লিক করুন।
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
