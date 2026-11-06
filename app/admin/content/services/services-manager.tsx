"use client";

import { useState } from "react";
import { ServiceCategory, ServiceItem } from "@/modules/services/data";
import { CheckCircle2, Loader2, Save, ExternalLink } from "lucide-react";
import Link from "next/link";

interface ServicesManagerProps {
  categories: ServiceCategory[];
}

export function ServicesManager({ categories }: ServicesManagerProps) {
  const [categoriesList, setCategoriesList] = useState<ServiceCategory[]>(categories);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(
    categories[0]?.services[0] || null
  );

  const [name, setName] = useState(selectedService?.name || "");
  const [tagline, setTagline] = useState(selectedService?.tagline || "");
  const [description, setDescription] = useState(selectedService?.description || "");
  const [deliverablesText, setDeliverablesText] = useState(
    (selectedService?.deliverables || []).join("\n")
  );

  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSelectService = (s: ServiceItem) => {
    setSelectedService(s);
    setName(s.name);
    setTagline(s.tagline);
    setDescription(s.description);
    setDeliverablesText((s.deliverables || []).join("\n"));
    setStatusMessage(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;

    setSaving(true);
    setStatusMessage(null);

    const deliverables = deliverablesText
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    try {
      const res = await fetch("/api/admin/content/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedService.id,
          slug: selectedService.slug,
          categorySlug: selectedService.categorySlug,
          name,
          tagline,
          description,
          isFlagship: selectedService.isFlagship,
          status: "active",
          deliverables,
        }),
      });

      const data = (await res.json()) as { success?: boolean };
      if (res.ok && data.success) {
        setStatusMessage("সার্ভিস সফলভাবে D1 ডাটাবেসে আপডেট হয়েছে।");
        setCategoriesList((prev) =>
          prev.map((cat) => ({
            ...cat,
            services: cat.services.map((srv) =>
              srv.id === selectedService.id
                ? { ...srv, name, tagline, description, deliverables }
                : srv
            ),
          }))
        );
      } else {
        setStatusMessage("সংরক্ষণ ব্যর্থ হয়েছে।");
      }
    } catch {
      setStatusMessage("সার্ভার ত্রুটি হয়েছে।");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      {statusMessage && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-lg flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{statusMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Service Selector List (1 Col) */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-text-muted uppercase tracking-wider px-1">
            অ্যাক্টিভ সার্ভিস ক্যাটালগ
          </div>
          <div className="space-y-2">
            {categoriesList.map((cat) => (
              <div key={cat.id} className="space-y-1">
                <div className="text-[11px] font-bold text-accent px-1">
                  {cat.name.split("(")[0]}
                </div>
                {cat.services.map((s) => {
                  const isSelected = selectedService?.id === s.id;
                  return (
                    <div
                      key={s.id}
                      onClick={() => handleSelectService(s)}
                      className={`p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                        isSelected
                          ? "bg-accent/10 border-accent text-accent font-semibold"
                          : "bg-card border-border hover:border-border-hover text-text-primary"
                      }`}
                    >
                      <div className="truncate">{s.name.split("(")[0]}</div>
                      <div className="text-[10px] text-text-muted mt-0.5 truncate">
                        {s.packages.length}টি প্যাকেজ • {s.isFlagship ? "ফ্ল্যাগশিপ" : "স্ট্যান্ডার্ড"}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Editor Form (2 Cols) */}
        <div className="lg:col-span-2">
          {selectedService ? (
            <form
              onSubmit={handleSave}
              className="bg-card border border-border rounded-xl p-5 sm:p-6 space-y-4 shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div>
                  <h3 className="text-base font-bold text-text-primary">
                    {selectedService.name}
                  </h3>
                  <div className="text-xs text-text-muted mt-0.5">
                    স্ল্যাগ: <span className="font-mono text-accent">/services/{selectedService.slug}</span>
                  </div>
                </div>

                <Link
                  href={`/services/${selectedService.slug}`}
                  target="_blank"
                  className="text-xs text-accent hover:underline inline-flex items-center gap-1 font-semibold p-1"
                >
                  <span>পাবলিক পেজ</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-primary">
                  সার্ভিস নাম
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-bg-primary border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-primary">
                  ট্যাগলাইন
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-bg-primary border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-primary">
                  পূর্ণ বিবরণ
                </label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-bg-primary border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-primary">
                  ডেলিভারেবলস তালিকা (প্রতি লাইনে একটি)
                </label>
                <textarea
                  rows={4}
                  value={deliverablesText}
                  onChange={(e) => setDeliverablesText(e.target.value)}
                  placeholder="রেসপন্সিভ মোবাইল আর্কিটেকচার&#10;মেটা Conversions API ইন্টিগ্রেশন..."
                  className="w-full px-3 py-2 text-xs bg-bg-primary border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent leading-relaxed font-mono"
                />
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-bg-primary text-xs font-bold transition-all hover:bg-accent-hover min-h-[44px]"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      <span>সংরক্ষণ হচ্ছে…</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" aria-hidden="true" />
                      <span>সার্ভিস আপডেট করুন</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-card border border-border rounded-xl p-8 text-center text-xs text-text-muted">
              বাম পাশ থেকে একটি সার্ভিস সিলেক্ট করুন।
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
