"use client";

import { useState } from "react";
import { FaqEntity } from "@/db/schema";
import { Plus, Search, Edit3, Trash2, CheckCircle2, Loader2 } from "lucide-react";

interface FaqsManagerProps {
  initialFaqs: FaqEntity[];
}

export function FaqsManager({ initialFaqs }: FaqsManagerProps) {
  const [faqsList, setFaqsList] = useState<FaqEntity[]>(initialFaqs);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqEntity | null>(null);

  const [category, setCategory] = useState("প্রজেক্ট পরিকল্পনা ও বাজেট নির্ধারণ");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sortOrder, setSortOrder] = useState(1);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleOpenCreate = () => {
    setEditingFaq(null);
    setCategory("প্রজেক্ট পরিকল্পনা ও বাজেট নির্ধারণ");
    setQuestion("");
    setAnswer("");
    setSortOrder(faqsList.length + 1);
    setIsModalOpen(true);
    setStatusMessage(null);
  };

  const handleOpenEdit = (faq: FaqEntity) => {
    setEditingFaq(faq);
    setCategory(faq.category);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setSortOrder(faq.sortOrder);
    setIsModalOpen(true);
    setStatusMessage(null);
  };

  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    const faqId = editingFaq ? editingFaq.id : `faq_${crypto.randomUUID().slice(0, 8)}`;

    try {
      const res = await fetch("/api/admin/content/faqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: faqId,
          category,
          question,
          answer,
          sortOrder,
          isActive: true,
        }),
      });

      const data = (await res.json()) as { success?: boolean };
      if (res.ok && data.success) {
        setStatusMessage("FAQ সফলভাবে সেভ হয়েছে।");
        setIsModalOpen(false);

        const updated: FaqEntity = {
          id: faqId,
          category,
          question,
          answer,
          sortOrder,
          isActive: true,
          updatedAt: new Date(),
        };

        if (editingFaq) {
          setFaqsList((prev) => prev.map((f) => (f.id === faqId ? updated : f)));
        } else {
          setFaqsList([...faqsList, updated]);
        }
      } else {
        setStatusMessage("সংরক্ষণ ব্যর্থ হয়েছে।");
      }
    } catch {
      setStatusMessage("সার্ভার ত্রুটি হয়েছে।");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteFaq = async (id: string) => {
    if (!confirm("আপনি কি নিশ্চিতভাবে এই FAQ মুছে ফেলতে চান?")) return;
    try {
      const res = await fetch(`/api/admin/content/faqs?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setFaqsList((prev) => prev.filter((f) => f.id !== id));
        setStatusMessage("FAQ মুছে ফেলা হয়েছে।");
      }
    } catch {
      // Ignored
    }
  };

  const filtered = faqsList.filter(
    (f) =>
      !searchTerm ||
      f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="bg-card border border-border rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" aria-hidden="true" />
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="প্রশ্ন বা উত্তর দিয়ে খুঁজুন…"
            className="w-full pl-9 pr-3 py-2 text-xs bg-bg-primary border border-border rounded-lg text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
          />
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-accent text-bg-primary text-xs font-bold transition-all hover:bg-accent-hover min-h-[44px] shrink-0"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          <span>নতুন FAQ যোগ করুন</span>
        </button>
      </div>

      {statusMessage && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-lg flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* FAQs List */}
      <div className="space-y-2.5">
        {filtered.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-8 text-center text-xs text-text-muted">
            কোনো FAQ পাওয়া যায়নি।
          </div>
        ) : (
          filtered.map((faq) => (
            <div
              key={faq.id}
              className="bg-card border border-border rounded-xl p-3.5 sm:p-4 hover:border-border-hover transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/20">
                    {faq.category}
                  </span>
                  <span className="text-[10px] font-mono text-text-muted">
                    ক্রম: {faq.sortOrder}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-text-primary mt-1">
                  {faq.question}
                </h3>
                <p className="text-xs text-text-muted mt-1 leading-relaxed line-clamp-2">
                  {faq.answer}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(faq)}
                  className="p-2 text-text-muted hover:text-accent rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  title="সম্পাদনা করুন"
                >
                  <Edit3 className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteFaq(faq.id)}
                  className="p-2 text-text-muted hover:text-red-400 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  title="মুছে ফেলুন"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit FAQ Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="FAQ এডিটর"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm"
        >
          <div className="bg-card border border-border rounded-xl p-5 sm:p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="border-b border-border pb-3">
              <h3 className="text-base font-bold text-text-primary">
                {editingFaq ? "FAQ সম্পাদনা করুন" : "নতুন FAQ যোগ করুন"}
              </h3>
              <p className="text-xs text-text-muted mt-0.5">
                ক্লায়েন্টদের সাধারণ প্রশ্নের উত্তর যুক্ত বা হালনাগাদ করুন
              </p>
            </div>

            <form onSubmit={handleSaveFaq} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  ক্যাটাগরি
                </label>
                <input
                  type="text"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="উদা: প্রজেক্ট পরিকল্পনা ও বাজেট নির্ধারণ"
                  className="w-full px-3 py-2 text-xs bg-bg-primary border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  প্রশ্ন
                </label>
                <input
                  type="text"
                  required
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="প্রশ্নটি লিখুন..."
                  className="w-full px-3 py-2 text-xs bg-bg-primary border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  উত্তর
                </label>
                <textarea
                  rows={4}
                  required
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="বিস্তারিত উত্তর লিখুন..."
                  className="w-full px-3 py-2 text-xs bg-bg-primary border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  প্রদর্শন ক্রম (Sort Order)
                </label>
                <input
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 text-xs bg-bg-primary border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px] tabular-nums"
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
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent text-bg-primary text-xs font-bold hover:bg-accent-hover min-h-[44px]"
                >
                  {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />}
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
