"use client";

import { useState, useEffect } from "react";
import { Quote } from "@/db/schema";
import { Plus, Search, CheckCircle2, Loader2, Trash2 } from "lucide-react";

interface QuoteManagerProps {
  initialQuotes: Quote[];
}

export function QuoteManager({ initialQuotes }: QuoteManagerProps) {
  const [quotesList, setQuotesList] = useState<Quote[]>(initialQuotes);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Quote Form
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientCompany, setClientCompany] = useState("");
  const [items, setItems] = useState<{ description: string; amountBdt: number }[]>([
    { description: "ওয়েব অ্যাপ্লিকেশন ডেভেলপমেন্ট ও আর্কিটেকচার", amountBdt: 45000 },
  ]);
  const [validDays, setValidDays] = useState(14);

  // Pre-fill from URL query parameters (e.g. from Inquiry or Customer screen)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const qName = params.get("clientName");
    const qEmail = params.get("clientEmail");
    const qPhone = params.get("clientPhone");
    const qCompany = params.get("clientCompany");

    if (qName || qEmail) {
      const timer = setTimeout(() => {
        if (qName) setClientName(qName);
        if (qEmail) setClientEmail(qEmail);
        if (qPhone) setClientPhone(qPhone);
        if (qCompany) setClientCompany(qCompany);
        setIsModalOpen(true);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, []);

  const totalBdt = items.reduce((sum, it) => sum + (Number(it.amountBdt) || 0), 0);

  const handleAddItem = () => {
    setItems([...items, { description: "", amountBdt: 10000 }]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length <= 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: "description" | "amountBdt", val: string) => {
    const updated = [...items];
    if (field === "amountBdt") {
      updated[index].amountBdt = parseInt(val) || 0;
    } else {
      updated[index].description = val;
    }
    setItems(updated);
  };

  const handleCreateQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setStatusMessage(null);
    try {
      const res = await fetch("/api/admin/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName,
          clientEmail,
          clientPhone: clientPhone || null,
          clientCompany: clientCompany || null,
          items,
          totalBdt,
          validDays,
        }),
      });
      const data = (await res.json()) as { success?: boolean; data?: { quote: Quote } };
      if (res.ok && data.success && data.data?.quote) {
        setQuotesList([data.data.quote, ...quotesList]);
        setIsModalOpen(false);
        setClientName("");
        setClientEmail("");
        setClientPhone("");
        setClientCompany("");
        setStatusMessage(`কোটেশন ${data.data.quote.quoteNumber} সফলভাবে তৈরি হয়েছে।`);
      }
    } catch {
      setStatusMessage("কোটেশন তৈরি করতে ত্রুটি হয়েছে।");
    } finally {
      setCreating(false);
    }
  };

  const handleStatusChange = async (quoteId: string, status: string) => {
    try {
      const res = await fetch("/api/admin/quotes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: quoteId, status }),
      });
      const data = (await res.json()) as { success?: boolean };
      if (res.ok && data.success) {
        setQuotesList((prev) =>
          prev.map((q) => (q.id === quoteId ? { ...q, status } : q))
        );
      }
    } catch {
      // Ignored
    }
  };

  const filtered = quotesList.filter((q) => {
    const matchesStatus = selectedStatus === "all" || q.status === selectedStatus;
    const s = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      q.quoteNumber.toLowerCase().includes(s) ||
      q.clientName.toLowerCase().includes(s) ||
      q.clientEmail.toLowerCase().includes(s);
    return matchesStatus && matchesSearch;
  });

  const quoteStatusColors: Record<string, string> = {
    draft: "bg-zinc-500/15 text-zinc-700 dark:text-zinc-300 border-zinc-500/30",
    sent: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30",
    accepted: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
    rejected: "bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/30",
    expired: "bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30",
  };

  const quoteStatusLabels: Record<string, string> = {
    draft: "ড্রাফট",
    sent: "পাঠানো হয়েছে",
    accepted: "অনুমোদিত (Accepted)",
    rejected: "প্রত্যাখ্যাত",
    expired: "মেয়াদোত্তীর্ণ",
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
            placeholder="কোট নম্বর, ক্লায়েন্ট নাম বা ইমেল দিয়ে খুঁজুন…"
            className="w-full pl-9 pr-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
          >
            <option value="all">সকল স্ট্যাটাস</option>
            <option value="draft">ড্রাফট (Draft)</option>
            <option value="sent">পাঠানো হয়েছে (Sent)</option>
            <option value="accepted">অনুমোদিত (Accepted)</option>
            <option value="rejected">প্রত্যাখ্যাত (Rejected)</option>
            <option value="expired">মেয়াদোত্তীর্ণ (Expired)</option>
          </select>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-accent text-accent-foreground text-xs font-bold transition-all hover:bg-accent-hover min-h-[44px] shrink-0"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span>নতুন কোটেশন</span>
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-lg flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Quotes List */}
      <div className="space-y-2.5">
        {filtered.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-8 text-center text-xs text-text-muted">
            কোনো কোটেশন তৈরি করা হয়নি।
          </div>
        ) : (
          filtered.map((quote) => (
            <div
              key={quote.id}
              className="bg-card border border-border rounded-xl p-3.5 sm:p-4 hover:border-border-hover transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold text-accent">
                    {quote.quoteNumber}
                  </span>
                  <span className="text-xs font-semibold text-text-primary">
                    {quote.clientName}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                      quoteStatusColors[quote.status] || "bg-zinc-500/10 text-zinc-400"
                    }`}
                  >
                    {quoteStatusLabels[quote.status] || quote.status}
                  </span>
                </div>

                <div className="text-xs text-text-muted mt-1 flex items-center gap-3 flex-wrap">
                  <span>{quote.clientEmail}</span>
                  {quote.clientCompany && <span>• {quote.clientCompany}</span>}
                  <span>• মেয়াদ: {new Date(quote.validUntil).toLocaleDateString("bn-BD")} পর্যন্ত</span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto shrink-0">
                <div className="text-base font-black text-text-primary tabular-nums">
                  ৳ {quote.totalBdt.toLocaleString("bn-BD")}
                </div>

                <select
                  value={quote.status}
                  onChange={(e) => handleStatusChange(quote.id, e.target.value)}
                  className="px-2.5 py-1.5 text-xs bg-bg-primary border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[40px]"
                >
                  <option value="draft">ড্রাফট</option>
                  <option value="sent">পাঠানো হয়েছে</option>
                  <option value="accepted">অনুমোদিত</option>
                  <option value="rejected">প্রত্যাখ্যাত</option>
                  <option value="expired">মেয়াদোত্তীর্ণ</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Quote Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="নতুন কোটেশন তৈরি করুন"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
        >
          <div className="bg-card border border-border rounded-xl p-5 sm:p-6 max-w-lg w-full space-y-4 shadow-2xl my-8">
            <div className="border-b border-border pb-3">
              <h3 className="text-base font-bold text-text-primary">নতুন কোটেশন তৈরি করুন</h3>
              <p className="text-xs text-text-muted mt-0.5">
                কাস্টমার বা প্রজেক্টের জন্য সুনির্দিষ্ট স্কোপ ও ফিক্সড প্রাইসিং কোট
              </p>
            </div>

            <form onSubmit={handleCreateQuote} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    ক্লায়েন্ট নাম
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="উদা: আরিফুর রহমান"
                    className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    ক্লায়েন্ট ইমেল
                  </label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="client@company.com"
                    className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    কোম্পানি / প্রতিষ্ঠান
                  </label>
                  <input
                    type="text"
                    value={clientCompany}
                    onChange={(e) => setClientCompany(e.target.value)}
                    placeholder="কোম্পানির নাম (ঐচ্ছিক)"
                    className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    মেয়াদ (দিন)
                  </label>
                  <input
                    type="number"
                    value={validDays}
                    onChange={(e) => setValidDays(parseInt(e.target.value) || 14)}
                    className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px] tabular-nums"
                  />
                </div>
              </div>

              {/* Items Section */}
              <div className="space-y-2 pt-2 border-t border-border">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-text-primary">
                    সার্ভিস আইটেম ও প্রাইসিং
                  </label>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="text-xs text-accent-text hover:underline font-semibold"
                  >
                    + আইটেম যোগ করুন
                  </button>
                </div>

                {items.map((it, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      required
                      placeholder="কাজের বিবরণ..."
                      value={it.description}
                      onChange={(e) => handleItemChange(idx, "description", e.target.value)}
                      className="flex-1 px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
                    />
                    <input
                      type="number"
                      required
                      placeholder="BDT"
                      value={it.amountBdt}
                      onChange={(e) => handleItemChange(idx, "amountBdt", e.target.value)}
                      className="w-24 sm:w-28 px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px] tabular-nums"
                    />
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(idx)}
                        aria-label="আইটেম মুছুন"
                        className="p-2 text-text-muted hover:text-red-400 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                ))}

                <div className="flex items-center justify-between p-2.5 bg-surface-elevated rounded-lg border border-border text-xs font-bold text-text-primary">
                  <span>সর্বমোট প্রাক্কলন (BDT):</span>
                  <span className="text-base text-accent tabular-nums">৳ {totalBdt.toLocaleString("bn-BD")}</span>
                </div>
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
                  <span>কোটেশন তৈরি করুন</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
