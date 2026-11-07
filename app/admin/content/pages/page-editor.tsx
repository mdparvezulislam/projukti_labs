"use client";

import { useState } from "react";
import { PageSection } from "@/db/schema";
import { CheckCircle2, Loader2, Save, Layout, Sparkles, HelpCircle, Workflow, Megaphone } from "lucide-react";

interface PageEditorProps {
  initialSections: PageSection[];
}

export function PageEditor({ initialSections }: PageEditorProps) {
  const [sections, setSections] = useState<PageSection[]>(initialSections);
  const [activeTab, setActiveTab] = useState<"hero" | "intro" | "why_us" | "process" | "cta">("hero");
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // 1. Hero Section State
  const heroSec = sections.find((s) => s.sectionKey === "hero");
  const heroContent = (heroSec?.content as Record<string, string>) || {};
  const [heroTitle, setHeroTitle] = useState(heroSec?.title || "Consistency and Engineering");
  const [heroSubtitle, setHeroSubtitle] = useState(
    heroSec?.subtitle ||
      "Software is everywhere. We engineer what is rare: An Unmatched, High-Performance Software Engineering Experience with direct architect communication, fixed transparent pricing, modern Next.js architecture, and long-term technical support."
  );
  const [heroBadge, setHeroBadge] = useState(heroContent.badge || "PROFESSIONAL DIGITAL SOLUTIONS");
  const [heroCtaPrimaryText, setHeroCtaPrimaryText] = useState(heroContent.ctaPrimaryText || "Start a Project");
  const [heroCtaPrimaryLink, setHeroCtaPrimaryLink] = useState(heroContent.ctaPrimaryLink || "/get-a-quote");
  const [heroCtaSecondaryText, setHeroCtaSecondaryText] = useState(heroContent.ctaSecondaryText || "Explore Our Work");
  const [heroCtaSecondaryLink, setHeroCtaSecondaryLink] = useState(heroContent.ctaSecondaryLink || "/portfolio");

  // 2. Intro Section State
  const introSec = sections.find((s) => s.sectionKey === "intro");
  const introContent = (introSec?.content as { pillars?: { title: string; description: string }[] }) || {};
  const [introTitle, setIntroTitle] = useState(introSec?.title || "Technology Built Around Your Business");
  const [introSubtitle, setIntroSubtitle] = useState(
    introSec?.subtitle ||
      "We combine thoughtful design, reliable engineering and practical technology to build digital solutions that are useful, maintainable and built around real business needs."
  );
  const [pillar1Title, setPillar1Title] = useState(introContent.pillars?.[0]?.title || "Thoughtful Design");
  const [pillar1Desc, setPillar1Desc] = useState(
    introContent.pillars?.[0]?.description ||
      "Clean, intuitive interfaces created with purposeful typography and clear hierarchy. We focus on clarity and user experience."
  );
  const [pillar2Title, setPillar2Title] = useState(introContent.pillars?.[1]?.title || "Reliable Engineering");
  const [pillar2Desc, setPillar2Desc] = useState(
    introContent.pillars?.[1]?.description ||
      "Built on modern web technologies including Next.js, TypeScript, and edge cloud architectures. We write type-safe code designed for stability."
  );
  const [pillar3Title, setPillar3Title] = useState(introContent.pillars?.[2]?.title || "Practical Solutions");
  const [pillar3Desc, setPillar3Desc] = useState(
    introContent.pillars?.[2]?.description ||
      "We focus on solving practical business problems. From verified ad tracking to automated courier integrations."
  );

  // 3. Why Us Section State
  const whySec = sections.find((s) => s.sectionKey === "why_us");
  const [whyTitle, setWhyTitle] = useState(whySec?.title || "Why Work With Us");
  const [whySubtitle, setWhySubtitle] = useState(
    whySec?.subtitle ||
      "Direct collaboration with senior engineers, clean architecture, and practical digital solutions designed for real business growth."
  );

  // 4. Process Section State
  const processSec = sections.find((s) => s.sectionKey === "process");
  const [processTitle, setProcessTitle] = useState(processSec?.title || "How We Work");
  const [processSubtitle, setProcessSubtitle] = useState(
    processSec?.subtitle ||
      "A transparent, milestone-driven approach from initial discovery to deployment and ongoing support."
  );

  // 5. CTA Section State
  const ctaSec = sections.find((s) => s.sectionKey === "cta");
  const ctaContent = (ctaSec?.content as Record<string, string>) || {};
  const [ctaTitle, setCtaTitle] = useState(ctaSec?.title || "Have a Project in Mind?");
  const [ctaSubtitle, setCtaSubtitle] = useState(
    ctaSec?.subtitle || "Let's discuss your idea and find the right digital solution for your business."
  );
  const [ctaButtonText, setCtaButtonText] = useState(ctaContent.buttonText || "Discuss Your Project");
  const [ctaButtonLink, setCtaButtonLink] = useState(ctaContent.buttonLink || "/get-a-quote");
  const [ctaSecondaryText, setCtaSecondaryText] = useState(ctaContent.secondaryText || "Contact Us");
  const [ctaSecondaryLink, setCtaSecondaryLink] = useState(ctaContent.secondaryLink || "/contact");

  const saveSection = async (sectionPayload: {
    id: string;
    pageSlug: string;
    sectionKey: string;
    title: string;
    subtitle: string;
    content: Record<string, unknown>;
    sortOrder: number;
  }) => {
    setSaving(true);
    setStatusMessage(null);
    try {
      const res = await fetch("/api/admin/content/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...sectionPayload,
          isActive: true,
        }),
      });

      const data = (await res.json()) as { success?: boolean };
      if (res.ok && data.success) {
        setStatusMessage("সেকশন সফলভাবে Cloudflare D1 ডাটাবেসে সংরক্ষিত হয়েছে।");
        setSections((prev) => {
          const idx = prev.findIndex((s) => s.sectionKey === sectionPayload.sectionKey);
          if (idx >= 0) {
            const next = [...prev];
            next[idx] = {
              ...next[idx],
              title: sectionPayload.title,
              subtitle: sectionPayload.subtitle,
              content: sectionPayload.content,
              updatedAt: new Date(),
            };
            return next;
          }
          return [...prev, { ...sectionPayload, isActive: true, updatedAt: new Date() } as unknown as PageSection];
        });
      } else {
        setStatusMessage("সংরক্ষণ ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
      }
    } catch {
      setStatusMessage("সার্ভারে সংযোগ ত্রুটি হয়েছে।");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    saveSection({
      id: heroSec?.id || "sec_home_hero",
      pageSlug: "home",
      sectionKey: "hero",
      title: heroTitle,
      subtitle: heroSubtitle,
      content: {
        badge: heroBadge,
        ctaPrimaryText: heroCtaPrimaryText,
        ctaPrimaryLink: heroCtaPrimaryLink,
        ctaSecondaryText: heroCtaSecondaryText,
        ctaSecondaryLink: heroCtaSecondaryLink,
      },
      sortOrder: 1,
    });
  };

  const handleSaveIntro = (e: React.FormEvent) => {
    e.preventDefault();
    saveSection({
      id: introSec?.id || "sec_home_intro",
      pageSlug: "home",
      sectionKey: "intro",
      title: introTitle,
      subtitle: introSubtitle,
      content: {
        pillars: [
          { title: pillar1Title, description: pillar1Desc },
          { title: pillar2Title, description: pillar2Desc },
          { title: pillar3Title, description: pillar3Desc },
        ],
      },
      sortOrder: 2,
    });
  };

  const handleSaveWhyUs = (e: React.FormEvent) => {
    e.preventDefault();
    saveSection({
      id: whySec?.id || "sec_home_why_us",
      pageSlug: "home",
      sectionKey: "why_us",
      title: whyTitle,
      subtitle: whySubtitle,
      content: whySec?.content ? (whySec.content as Record<string, unknown>) : {},
      sortOrder: 5,
    });
  };

  const handleSaveProcess = (e: React.FormEvent) => {
    e.preventDefault();
    saveSection({
      id: processSec?.id || "sec_home_process",
      pageSlug: "home",
      sectionKey: "process",
      title: processTitle,
      subtitle: processSubtitle,
      content: processSec?.content ? (processSec.content as Record<string, unknown>) : {},
      sortOrder: 6,
    });
  };

  const handleSaveCta = (e: React.FormEvent) => {
    e.preventDefault();
    saveSection({
      id: ctaSec?.id || "sec_home_cta",
      pageSlug: "home",
      sectionKey: "cta",
      title: ctaTitle,
      subtitle: ctaSubtitle,
      content: {
        buttonText: ctaButtonText,
        buttonLink: ctaButtonLink,
        secondaryText: ctaSecondaryText,
        secondaryLink: ctaSecondaryLink,
      },
      sortOrder: 7,
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {statusMessage && (
        <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-800 dark:text-emerald-300 text-xs rounded-xl flex items-center gap-2 shadow-warm-sm">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <span className="font-medium">{statusMessage}</span>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-border text-xs scrollbar-none">
        <button
          type="button"
          onClick={() => {
            setActiveTab("hero");
            setStatusMessage(null);
          }}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all min-h-[40px] ${
            activeTab === "hero"
              ? "bg-accent text-accent-foreground shadow-warm-sm"
              : "bg-card border border-border text-text-secondary hover:text-text-primary"
          }`}
        >
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          <span>১. হিরো সেকশন</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("intro");
            setStatusMessage(null);
          }}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all min-h-[40px] ${
            activeTab === "intro"
              ? "bg-accent text-accent-foreground shadow-warm-sm"
              : "bg-card border border-border text-text-secondary hover:text-text-primary"
          }`}
        >
          <Layout className="h-3.5 w-3.5" aria-hidden="true" />
          <span>২. ইন্ট্রোডাকশন ও দর্শন</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("why_us");
            setStatusMessage(null);
          }}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all min-h-[40px] ${
            activeTab === "why_us"
              ? "bg-accent text-accent-foreground shadow-warm-sm"
              : "bg-card border border-border text-text-secondary hover:text-text-primary"
          }`}
        >
          <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
          <span>৩. কেন প্রjukti Labs</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("process");
            setStatusMessage(null);
          }}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all min-h-[40px] ${
            activeTab === "process"
              ? "bg-accent text-accent-foreground shadow-warm-sm"
              : "bg-card border border-border text-text-secondary hover:text-text-primary"
          }`}
        >
          <Workflow className="h-3.5 w-3.5" aria-hidden="true" />
          <span>৪. কাজের পদ্ধতি (Process)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("cta");
            setStatusMessage(null);
          }}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all min-h-[40px] ${
            activeTab === "cta"
              ? "bg-accent text-accent-foreground shadow-warm-sm"
              : "bg-card border border-border text-text-secondary hover:text-text-primary"
          }`}
        >
          <Megaphone className="h-3.5 w-3.5" aria-hidden="true" />
          <span>৫. ফাইনাল কল-টু-অ্যাকশন</span>
        </button>
      </div>

      {/* TAB 1: HERO */}
      {activeTab === "hero" && (
        <form onSubmit={handleSaveHero} className="bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-4 shadow-warm-sm">
          <div className="border-b border-border pb-3">
            <h3 className="text-sm sm:text-base font-bold text-text-primary">
              হোমপেজ হিরো সেকশন এডিটর (Hero Architecture)
            </h3>
            <p className="text-xs text-text-muted mt-0.5">
              পাবলিক হোমপেজের প্রধান শিরোনাম, ফিলোসফি উক্তি এবং কল-টু-অ্যাকশন বাটন নিয়ন্ত্রণ করুন।
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-text-primary">
              হিরো টপ ব্যাজ লেবেল
            </label>
            <input
              type="text"
              value={heroBadge}
              onChange={(e) => setHeroBadge(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-h-[44px]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-text-primary">
              প্রধান ডিসপ্লে শিরোনাম (Hero Title)
            </label>
            <input
              type="text"
              required
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-h-[44px]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-text-primary">
              সাবটাইটেল ও ফিলোসফি (Hero Subtitle)
            </label>
            <textarea
              rows={3}
              required
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-text-primary">
                প্রাইমারি CTA লেবেল
              </label>
              <input
                type="text"
                value={heroCtaPrimaryText}
                onChange={(e) => setHeroCtaPrimaryText(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-h-[44px]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-text-primary">
                প্রাইমারি CTA লিংক
              </label>
              <input
                type="text"
                value={heroCtaPrimaryLink}
                onChange={(e) => setHeroCtaPrimaryLink(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-h-[44px]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-text-primary">
                সেকেন্ডারি CTA লেবেল
              </label>
              <input
                type="text"
                value={heroCtaSecondaryText}
                onChange={(e) => setHeroCtaSecondaryText(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-h-[44px]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-text-primary">
                সেকেন্ডারি CTA লিংক
              </label>
              <input
                type="text"
                value={heroCtaSecondaryLink}
                onChange={(e) => setHeroCtaSecondaryLink(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-h-[44px]"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-border flex items-center justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-accent-foreground text-xs font-bold transition-all hover:bg-accent-hover shadow-warm-sm min-h-[44px]"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Save className="h-4 w-4" aria-hidden="true" />}
              <span>হিরো সেকশন সেভ করুন</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: INTRO & PILLARS */}
      {activeTab === "intro" && (
        <form onSubmit={handleSaveIntro} className="bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-4 shadow-warm-sm">
          <div className="border-b border-border pb-3">
            <h3 className="text-sm sm:text-base font-bold text-text-primary">
              ইন্ট্রোডাকশন ও মূল দর্শন (Intro & Core Pillars)
            </h3>
            <p className="text-xs text-text-muted mt-0.5">
              Technology Built Around Your Business — শিরোনাম, বিবরণ ও ৩টি স্তম্ভ।
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-text-primary">
              সেকশন শিরোনাম
            </label>
            <input
              type="text"
              required
              value={introTitle}
              onChange={(e) => setIntroTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-h-[44px]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-text-primary">
              সেকশন সাবটাইটেল
            </label>
            <textarea
              rows={2}
              required
              value={introSubtitle}
              onChange={(e) => setIntroSubtitle(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange leading-relaxed"
            />
          </div>

          {/* 3 Pillars */}
          <div className="space-y-3 pt-3 border-t border-border">
            <div className="text-xs font-bold text-text-primary">৩টি মূল কারিগরি স্তম্ভ:</div>

            <div className="p-3.5 rounded-xl border border-border bg-surface-muted/40 space-y-2">
              <span className="text-[11px] font-bold text-brand-orange-strong font-mono">স্তম্ভ ১:</span>
              <input
                type="text"
                value={pillar1Title}
                onChange={(e) => setPillar1Title(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-card border border-border rounded-lg text-text-primary font-bold"
                placeholder="স্তম্ভ ১ শিরোনাম"
              />
              <textarea
                rows={2}
                value={pillar1Desc}
                onChange={(e) => setPillar1Desc(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-card border border-border rounded-lg text-text-secondary leading-relaxed"
                placeholder="স্তম্ভ ১ বিবরণ"
              />
            </div>

            <div className="p-3.5 rounded-xl border border-border bg-surface-muted/40 space-y-2">
              <span className="text-[11px] font-bold text-brand-orange-strong font-mono">স্তম্ভ ২:</span>
              <input
                type="text"
                value={pillar2Title}
                onChange={(e) => setPillar2Title(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-card border border-border rounded-lg text-text-primary font-bold"
                placeholder="স্তম্ভ ২ শিরোনাম"
              />
              <textarea
                rows={2}
                value={pillar2Desc}
                onChange={(e) => setPillar2Desc(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-card border border-border rounded-lg text-text-secondary leading-relaxed"
                placeholder="স্তম্ভ ২ বিবরণ"
              />
            </div>

            <div className="p-3.5 rounded-xl border border-border bg-surface-muted/40 space-y-2">
              <span className="text-[11px] font-bold text-brand-orange-strong font-mono">স্তম্ভ ৩:</span>
              <input
                type="text"
                value={pillar3Title}
                onChange={(e) => setPillar3Title(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-card border border-border rounded-lg text-text-primary font-bold"
                placeholder="স্তম্ভ ৩ শিরোনাম"
              />
              <textarea
                rows={2}
                value={pillar3Desc}
                onChange={(e) => setPillar3Desc(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-card border border-border rounded-lg text-text-secondary leading-relaxed"
                placeholder="স্তম্ভ ৩ বিবরণ"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-border flex items-center justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-accent-foreground text-xs font-bold transition-all hover:bg-accent-hover shadow-warm-sm min-h-[44px]"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Save className="h-4 w-4" aria-hidden="true" />}
              <span>ইন্ট্রো সেকশন সেভ করুন</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: WHY US */}
      {activeTab === "why_us" && (
        <form onSubmit={handleSaveWhyUs} className="bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-4 shadow-warm-sm">
          <div className="border-b border-border pb-3">
            <h3 className="text-sm sm:text-base font-bold text-text-primary">
              কেন প্রjukti Labs (Why Work With Us)
            </h3>
            <p className="text-xs text-text-muted mt-0.5">
              ক্লায়েন্ট কেন আমাদের স্টুডিও নির্বাচন করবেন — শিরোনাম ও প্রতিশ্রুতির বিবরণ।
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-text-primary">
              সেকশন শিরোনাম
            </label>
            <input
              type="text"
              required
              value={whyTitle}
              onChange={(e) => setWhyTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-h-[44px]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-text-primary">
              সেকশন সাবটাইটেল
            </label>
            <textarea
              rows={3}
              required
              value={whySubtitle}
              onChange={(e) => setWhySubtitle(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange leading-relaxed"
            />
          </div>

          <div className="pt-3 border-t border-border flex items-center justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-accent-foreground text-xs font-bold transition-all hover:bg-accent-hover shadow-warm-sm min-h-[44px]"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Save className="h-4 w-4" aria-hidden="true" />}
              <span>সেভ করুন</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 4: PROCESS */}
      {activeTab === "process" && (
        <form onSubmit={handleSaveProcess} className="bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-4 shadow-warm-sm">
          <div className="border-b border-border pb-3">
            <h3 className="text-sm sm:text-base font-bold text-text-primary">
              কাজের পদ্ধতি ও প্রক্রিয়া (How We Work)
            </h3>
            <p className="text-xs text-text-muted mt-0.5">
              ডিসকভারি থেকে ডেলিভারি পর্যন্ত ৬-ধাপের আর্কিটেকচারাল প্রক্রিয়া।
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-text-primary">
              সেকশন শিরোনাম
            </label>
            <input
              type="text"
              required
              value={processTitle}
              onChange={(e) => setProcessTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-h-[44px]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-text-primary">
              সেকশন সাবটাইটেল
            </label>
            <textarea
              rows={3}
              required
              value={processSubtitle}
              onChange={(e) => setProcessSubtitle(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange leading-relaxed"
            />
          </div>

          <div className="pt-3 border-t border-border flex items-center justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-accent-foreground text-xs font-bold transition-all hover:bg-accent-hover shadow-warm-sm min-h-[44px]"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Save className="h-4 w-4" aria-hidden="true" />}
              <span>প্রসেস সেকশন সেভ করুন</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 5: FINAL CTA */}
      {activeTab === "cta" && (
        <form onSubmit={handleSaveCta} className="bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-4 shadow-warm-sm">
          <div className="border-b border-border pb-3">
            <h3 className="text-sm sm:text-base font-bold text-text-primary">
              ফাইনাল কল-টু-অ্যাকশন (Bottom Banner CTA)
            </h3>
            <p className="text-xs text-text-muted mt-0.5">
              হোমপেজের নিচের প্রধান কনভার্সন ব্যানার ও বাটন লিংক।
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-text-primary">
              শিরোনাম
            </label>
            <input
              type="text"
              required
              value={ctaTitle}
              onChange={(e) => setCtaTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-h-[44px]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-text-primary">
              সাবটাইটেল
            </label>
            <textarea
              rows={2}
              required
              value={ctaSubtitle}
              onChange={(e) => setCtaSubtitle(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-text-primary">
                প্রাইমারি বাটন টেক্সট
              </label>
              <input
                type="text"
                value={ctaButtonText}
                onChange={(e) => setCtaButtonText(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-h-[44px]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-text-primary">
                প্রাইমারি বাটন লিংক
              </label>
              <input
                type="text"
                value={ctaButtonLink}
                onChange={(e) => setCtaButtonLink(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-h-[44px]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-text-primary">
                সেকেন্ডারি বাটন টেক্সট
              </label>
              <input
                type="text"
                value={ctaSecondaryText}
                onChange={(e) => setCtaSecondaryText(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-h-[44px]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-text-primary">
                সেকেন্ডারি বাটন লিংক
              </label>
              <input
                type="text"
                value={ctaSecondaryLink}
                onChange={(e) => setCtaSecondaryLink(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-surface-muted/60 border border-border rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange min-h-[44px]"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-border flex items-center justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-accent-foreground text-xs font-bold transition-all hover:bg-accent-hover shadow-warm-sm min-h-[44px]"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Save className="h-4 w-4" aria-hidden="true" />}
              <span>CTA সেভ করুন</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
