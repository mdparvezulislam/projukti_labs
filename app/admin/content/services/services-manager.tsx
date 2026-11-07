"use client";

import { useState } from "react";
import { ServiceCategory, ServiceItem, ServicePackage } from "@/modules/services/data";
import { CheckCircle2, Loader2, Save, ExternalLink, PackageCheck } from "lucide-react";
import Link from "next/link";

interface ServicesManagerProps {
  categories: ServiceCategory[];
}

export function ServicesManager({ categories }: ServicesManagerProps) {
  const [categoriesList, setCategoriesList] = useState<ServiceCategory[]>(categories);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(
    categories[0]?.services[0] || null
  );

  // Service form state
  const [name, setName] = useState(selectedService?.name || "");
  const [tagline, setTagline] = useState(selectedService?.tagline || "");
  const [description, setDescription] = useState(selectedService?.description || "");
  const [deliverablesText, setDeliverablesText] = useState(
    (selectedService?.deliverables || []).join("\n")
  );
  const [savingService, setSavingService] = useState(false);
  const [serviceStatusMsg, setServiceStatusMsg] = useState<string | null>(null);

  // Package editor state
  const [selectedPkg, setSelectedPkg] = useState<ServicePackage | null>(
    selectedService?.packages[0] || null
  );
  const [pkgName, setPkgName] = useState(selectedPkg?.name || "");
  const [pkgPriceBdt, setPkgPriceBdt] = useState<string>(
    selectedPkg?.priceBdt != null ? String(selectedPkg.priceBdt) : ""
  );
  const [pkgPriceUsd, setPkgPriceUsd] = useState<string>(
    selectedPkg?.priceUsd != null ? String(selectedPkg.priceUsd) : ""
  );
  const [pkgBillingPeriod, setPkgBillingPeriod] = useState<"one-time" | "monthly" | "custom">(
    (selectedPkg?.billingPeriod as "one-time" | "monthly" | "custom") || "one-time"
  );
  const [pkgDescription, setPkgDescription] = useState(selectedPkg?.description || "");
  const [pkgIsPopular, setPkgIsPopular] = useState(Boolean(selectedPkg?.popular));
  const [pkgSlaHours, setPkgSlaHours] = useState<string>(
    selectedPkg?.slaHours != null ? String(selectedPkg.slaHours) : "24"
  );
  const [pkgDeliverablesText, setPkgDeliverablesText] = useState(
    (selectedPkg?.deliverables || []).join("\n")
  );
  const [savingPkg, setSavingPkg] = useState(false);
  const [pkgStatusMsg, setPkgStatusMsg] = useState<string | null>(null);

  const handleSelectService = (s: ServiceItem) => {
    setSelectedService(s);
    setName(s.name);
    setTagline(s.tagline);
    setDescription(s.description);
    setDeliverablesText((s.deliverables || []).join("\n"));
    setServiceStatusMsg(null);

    // Switch to first package of selected service
    const firstPkg = s.packages[0] || null;
    setSelectedPkg(firstPkg);
    if (firstPkg) {
      setPkgName(firstPkg.name);
      setPkgPriceBdt(firstPkg.priceBdt != null ? String(firstPkg.priceBdt) : "");
      setPkgPriceUsd(firstPkg.priceUsd != null ? String(firstPkg.priceUsd) : "");
      setPkgBillingPeriod(
        (firstPkg.billingPeriod as "one-time" | "monthly" | "custom") || "one-time"
      );
      setPkgDescription(firstPkg.description || "");
      setPkgIsPopular(Boolean(firstPkg.popular));
      setPkgSlaHours(firstPkg.slaHours != null ? String(firstPkg.slaHours) : "24");
      setPkgDeliverablesText((firstPkg.deliverables || []).join("\n"));
    }
    setPkgStatusMsg(null);
  };

  const handleSelectPackage = (pkg: ServicePackage) => {
    setSelectedPkg(pkg);
    setPkgName(pkg.name);
    setPkgPriceBdt(pkg.priceBdt != null ? String(pkg.priceBdt) : "");
    setPkgPriceUsd(pkg.priceUsd != null ? String(pkg.priceUsd) : "");
    setPkgBillingPeriod(
      (pkg.billingPeriod as "one-time" | "monthly" | "custom") || "one-time"
    );
    setPkgDescription(pkg.description || "");
    setPkgIsPopular(Boolean(pkg.popular));
    setPkgSlaHours(pkg.slaHours != null ? String(pkg.slaHours) : "24");
    setPkgDeliverablesText((pkg.deliverables || []).join("\n"));
    setPkgStatusMsg(null);
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;

    setSavingService(true);
    setServiceStatusMsg(null);

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
        setServiceStatusMsg("সার্ভিস সফলভাবে Cloudflare D1 ডাটাবেসে আপডেট হয়েছে।");
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
        setServiceStatusMsg("সংরক্ষণ ব্যর্থ হয়েছে।");
      }
    } catch {
      setServiceStatusMsg("সার্ভার ত্রুটি হয়েছে।");
    } finally {
      setSavingService(false);
    }
  };

  const handleSavePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedPkg) return;

    setSavingPkg(true);
    setPkgStatusMsg(null);

    const deliverables = pkgDeliverablesText
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    try {
      const res = await fetch("/api/admin/content/services/packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedPkg.id,
          serviceId: selectedService.id,
          slug: selectedPkg.slug,
          name: pkgName,
          priceBdt: pkgPriceBdt ? parseInt(pkgPriceBdt, 10) : null,
          priceUsd: pkgPriceUsd ? parseInt(pkgPriceUsd, 10) : null,
          billingPeriod: pkgBillingPeriod,
          description: pkgDescription,
          isPopular: pkgIsPopular,
          slaHours: pkgSlaHours ? parseInt(pkgSlaHours, 10) : null,
          deliverables,
          sortOrder: 0,
        }),
      });

      const data = (await res.json()) as { success?: boolean };
      if (res.ok && data.success) {
        setPkgStatusMsg(`প্যাকেজ "${pkgName}" সফলভাবে D1 ডাটাবেসে সেভ হয়েছে।`);
        // Update local state
        setCategoriesList((prev) =>
          prev.map((cat) => ({
            ...cat,
            services: cat.services.map((srv) =>
              srv.id === selectedService.id
                ? {
                    ...srv,
                    packages: srv.packages.map((p) =>
                      p.id === selectedPkg.id
                        ? {
                            ...p,
                            name: pkgName,
                            priceBdt: pkgPriceBdt ? parseInt(pkgPriceBdt, 10) : null,
                            priceUsd: pkgPriceUsd ? parseInt(pkgPriceUsd, 10) : null,
                            billingPeriod: pkgBillingPeriod,
                            description: pkgDescription,
                            popular: pkgIsPopular,
                            slaHours: pkgSlaHours ? parseInt(pkgSlaHours, 10) : undefined,
                            deliverables,
                          }
                        : p
                    ),
                  }
                : srv
            ),
          }))
        );
      } else {
        setPkgStatusMsg("প্যাকেজ সংরক্ষণ ব্যর্থ হয়েছে।");
      }
    } catch {
      setPkgStatusMsg("সার্ভার ত্রুটি হয়েছে।");
    } finally {
      setSavingPkg(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Service Selector List (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold text-text-muted uppercase tracking-wider px-1">
            অ্যাক্টিভ সার্ভিস ক্যাটালগ
          </div>
          <div className="space-y-3">
            {categoriesList.map((cat) => (
              <div key={cat.id} className="space-y-1.5">
                <div className="text-[11px] font-bold text-brand-orange-strong dark:text-accent px-1">
                  {cat.name.split("(")[0]}
                </div>
                {cat.services.map((s) => {
                  const isSelected = selectedService?.id === s.id;
                  return (
                    <div
                      key={s.id}
                      onClick={() => handleSelectService(s)}
                      className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? "bg-accent/10 border-accent text-text-primary font-bold shadow-warm-sm"
                          : "bg-card border-border hover:border-border-hover text-text-secondary"
                      }`}
                    >
                      <div className="truncate font-bold">{s.name.split("(")[0]}</div>
                      <div className="text-[11px] text-text-muted mt-1 flex items-center gap-2">
                        <span>{s.packages.length}টি প্যাকেজ</span>
                        <span>•</span>
                        <span className={s.isFlagship ? "text-brand-orange-strong font-semibold" : ""}>
                          {s.isFlagship ? "ফ্ল্যাগশিপ" : "স্ট্যান্ডার্ড"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Editor Form (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {selectedService ? (
            <>
              {/* Form 1: Service Core Details */}
              <form
                onSubmit={handleSaveService}
                className="bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-4 shadow-warm-sm"
              >
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <div>
                    <h3 className="text-base font-bold text-text-primary">
                      {selectedService.name}
                    </h3>
                    <div className="text-xs text-text-muted mt-0.5">
                      স্ল্যাগ: <span className="font-mono text-brand-orange-strong dark:text-accent">/services/{selectedService.slug}</span>
                    </div>
                  </div>

                  <Link
                    href={`/services/${selectedService.slug}`}
                    target="_blank"
                    className="text-xs text-brand-orange-strong dark:text-accent hover:underline inline-flex items-center gap-1 font-semibold p-1"
                  >
                    <span>পাবলিক পেজ</span>
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>

                {serviceStatusMsg && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs rounded-xl flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                    <span>{serviceStatusMsg}</span>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-text-primary">
                    সার্ভিস নাম
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-h-[44px]"
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
                    className="w-full px-3.5 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-h-[44px]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-text-primary">
                    পূর্ণ বিবরণ
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange leading-relaxed"
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
                    className="w-full px-3.5 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange leading-relaxed font-mono"
                  />
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-end">
                  <button
                    type="submit"
                    disabled={savingService}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-accent-foreground text-xs font-bold transition-all hover:bg-accent-hover shadow-warm-sm min-h-[44px]"
                  >
                    {savingService ? (
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

              {/* Form 2: Service Packages & Pricing Tier Editor */}
              <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-4 shadow-warm-sm">
                <div className="border-b border-border pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-text-primary flex items-center gap-2">
                      <PackageCheck className="h-4 w-4 text-brand-orange-strong dark:text-accent" aria-hidden="true" />
                      <span>সার্ভিস প্যাকেজ ও প্রাইসিং টিয়ার</span>
                    </h3>
                    <p className="text-xs text-text-muted mt-0.5">
                      {selectedService.name}-এর মূল্য নির্ধারণ (BDT/USD), বিলিং পিরিয়ড এবং অফার ম্যানেজ করুন।
                    </p>
                  </div>
                </div>

                {pkgStatusMsg && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs rounded-xl flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                    <span>{pkgStatusMsg}</span>
                  </div>
                )}

                {/* Package Tier Tabs */}
                <div className="flex items-center gap-2 border-b border-border pb-2 overflow-x-auto">
                  {selectedService.packages.map((pkg) => (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => handleSelectPackage(pkg)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        selectedPkg?.id === pkg.id
                          ? "bg-accent text-accent-foreground shadow-warm-sm"
                          : "bg-surface-muted/60 border border-border text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      {pkg.name} {pkg.priceBdt ? `(৳${(pkg.priceBdt / 1000).toFixed(0)}k)` : "(কাস্টম)"}
                    </button>
                  ))}
                </div>

                {selectedPkg && (
                  <form onSubmit={handleSavePackage} className="space-y-4 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-text-primary">
                          প্যাকেজের নাম
                        </label>
                        <input
                          type="text"
                          required
                          value={pkgName}
                          onChange={(e) => setPkgName(e.target.value)}
                          className="w-full px-3.5 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-h-[44px]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-text-primary">
                          বিলিং পিরিয়ড
                        </label>
                        <select
                          value={pkgBillingPeriod}
                          onChange={(e) =>
                            setPkgBillingPeriod(e.target.value as "one-time" | "monthly" | "custom")
                          }
                          className="w-full px-3.5 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-h-[44px]"
                        >
                          <option value="one-time">এককালীন (One-time)</option>
                          <option value="monthly">মাসিক রিটেইনার (Monthly)</option>
                          <option value="custom">কাস্টম কোট (Custom)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-text-primary">
                          মূল্য (BDT ৳)
                        </label>
                        <input
                          type="number"
                          value={pkgPriceBdt}
                          onChange={(e) => setPkgPriceBdt(e.target.value)}
                          placeholder="উদাহরণ: 35000"
                          className="w-full px-3.5 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-h-[44px] tabular-nums"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-text-primary">
                          মূল্য (USD $)
                        </label>
                        <input
                          type="number"
                          value={pkgPriceUsd}
                          onChange={(e) => setPkgPriceUsd(e.target.value)}
                          placeholder="উদাহরণ: 350"
                          className="w-full px-3.5 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-h-[44px] tabular-nums"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-text-primary">
                          SLA রেসপন্স সময় (ঘণ্টা)
                        </label>
                        <input
                          type="number"
                          value={pkgSlaHours}
                          onChange={(e) => setPkgSlaHours(e.target.value)}
                          placeholder="উদাহরণ: 24"
                          className="w-full px-3.5 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-h-[44px] tabular-nums"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-text-primary">
                        প্যাকেজ বিবরণ
                      </label>
                      <input
                        type="text"
                        required
                        value={pkgDescription}
                        onChange={(e) => setPkgDescription(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-h-[44px]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-text-primary">
                        প্যাকেজ ফিচার ও ডেলিভারেবলস (প্রতি লাইনে একটি)
                      </label>
                      <textarea
                        rows={4}
                        value={pkgDeliverablesText}
                        onChange={(e) => setPkgDeliverablesText(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange leading-relaxed font-mono"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="pkgIsPopular"
                        checked={pkgIsPopular}
                        onChange={(e) => setPkgIsPopular(e.target.checked)}
                        className="h-4 w-4 rounded border-border text-brand-orange focus:ring-brand-orange"
                      />
                      <label htmlFor="pkgIsPopular" className="text-xs font-medium text-text-primary cursor-pointer">
                        জনপ্রিয় অফার হিসেবে হাইলাইট করুন (Popular Choice Badge)
                      </label>
                    </div>

                    <div className="pt-3 border-t border-border flex items-center justify-end">
                      <button
                        type="submit"
                        disabled={savingPkg}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-accent-foreground text-xs font-bold transition-all hover:bg-accent-hover shadow-warm-sm min-h-[44px]"
                      >
                        {savingPkg ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                            <span>সংরক্ষণ হচ্ছে…</span>
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4" aria-hidden="true" />
                            <span>প্যাকেজ টিয়ার সংরক্ষণ করুন</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </>
          ) : (
            <div className="bg-card border border-border rounded-2xl p-8 text-center text-xs text-text-muted">
              বাম পাশ থেকে একটি সার্ভিস সিলেক্ট করুন।
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
