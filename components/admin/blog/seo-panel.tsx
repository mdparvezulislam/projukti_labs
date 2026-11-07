"use client";

import { useState } from "react";
import {
  Search,
  Share2,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Globe,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface SeoPanelProps {
  seoTitle: string;
  onChangeSeoTitle: (v: string) => void;
  seoDescription: string;
  onChangeSeoDescription: (v: string) => void;
  focusKeyword: string;
  onChangeFocusKeyword: (v: string) => void;
  canonicalUrl: string;
  onChangeCanonicalUrl: (v: string) => void;
  robotsIndex: boolean;
  onChangeRobotsIndex: (v: boolean) => void;
  robotsFollow: boolean;
  onChangeRobotsFollow: (v: boolean) => void;
  ogTitle?: string;
  onChangeOgTitle?: (v: string) => void;
  ogDescription?: string;
  onChangeOgDescription?: (v: string) => void;
  ogImage?: string;
  onChangeOgImage?: (v: string) => void;
  coverImage?: string;
  slug: string;
  wordCount: number;
}

export function SeoPanel({
  seoTitle,
  onChangeSeoTitle,
  seoDescription,
  onChangeSeoDescription,
  focusKeyword,
  onChangeFocusKeyword,
  canonicalUrl,
  onChangeCanonicalUrl,
  robotsIndex,
  onChangeRobotsIndex,
  robotsFollow,
  onChangeRobotsFollow,
  ogTitle = "",
  onChangeOgTitle,
  ogDescription = "",
  onChangeOgDescription,
  ogImage = "",
  onChangeOgImage,
  coverImage = "",
  slug,
  wordCount,
}: SeoPanelProps) {
  const [activePreview, setActivePreview] = useState<"google" | "social" | "twitter">("google");
  const [showAdvancedSocial, setShowAdvancedSocial] = useState(false);

  // SEO Quality Checklist checks
  const titleLen = seoTitle.length;
  const isTitleGood = titleLen >= 30 && titleLen <= 65;
  const isTitleWarning = titleLen > 65 || (titleLen > 0 && titleLen < 30);

  const descLen = seoDescription.length;
  const isDescGood = descLen >= 120 && descLen <= 165;
  const isDescWarning = descLen > 165 || (descLen > 0 && descLen < 120);

  const hasSlug = Boolean(slug && slug.length >= 2);
  const hasFocusKeyword = Boolean(focusKeyword && focusKeyword.trim().length > 0);
  const keywordInTitle = hasFocusKeyword && seoTitle.toLowerCase().includes(focusKeyword.toLowerCase());
  const keywordInDesc = hasFocusKeyword && seoDescription.toLowerCase().includes(focusKeyword.toLowerCase());
  const hasSubstantialContent = wordCount >= 250;
  const hasCoverImage = Boolean(coverImage || ogImage);

  const checks = [
    {
      label: "এসইও টাইটেল দৈর্ঘ্য (৩০-৬৫ অক্ষর)",
      status: isTitleGood ? "good" : isTitleWarning ? "warning" : "missing",
      note: `${titleLen}/65 অক্ষর`,
    },
    {
      label: "মেটা ডেসক্রিপশন দৈর্ঘ্য (১২০-১৬৫ অক্ষর)",
      status: isDescGood ? "good" : isDescWarning ? "warning" : "missing",
      note: `${descLen}/160 অক্ষর`,
    },
    {
      label: "ইউআরএল স্লাগ ভ্যালিডেশন",
      status: hasSlug ? "good" : "missing",
      note: slug ? `slug: ${slug}` : "স্লাগ দেওয়া হয়নি",
    },
    {
      label: "মূল ফোকাস কি-ওয়ার্ড নির্ধারণ",
      status: hasFocusKeyword ? "good" : "warning",
      note: focusKeyword || "কি-ওয়ার্ড নির্ধারণ করা হয়নি",
    },
    {
      label: "টাইটেলে ফোকাস কি-ওয়ার্ড উপস্থিতি",
      status: keywordInTitle ? "good" : "warning",
      note: keywordInTitle ? "উপস্থিত" : "টাইটেলে কি-ওয়ার্ড নেই",
    },
    {
      label: "ডেসক্রিপশনে ফোকাস কি-ওয়ার্ড উপস্থিতি",
      status: keywordInDesc ? "good" : "warning",
      note: keywordInDesc ? "উপস্থিত" : "ডেসক্রিপশনে কি-ওয়ার্ড নেই",
    },
    {
      label: "কনটেন্টের প্রয়োজনীয় ব্যাপ্তি ও শব্দসংখ্যা",
      status: hasSubstantialContent ? "good" : "warning",
      note: `${wordCount} শব্দ (কমপক্ষে ২৫০ বাঞ্ছনীয়)`,
    },
    {
      label: "ফিচার্ড / সোশ্যাল শেয়ারিং ইমেজ",
      status: hasCoverImage ? "good" : "warning",
      note: hasCoverImage ? "সংযুক্ত আছে" : "সোশ্যাল ইমেজ নেই",
    },
    {
      label: "সার্চ ইঞ্জিন ইনডেক্সিং পলিসি",
      status: robotsIndex ? "good" : "warning",
      note: robotsIndex ? "Index allowed" : "Noindex সক্রিয়",
    },
  ];

  const goodCount = checks.filter((c) => c.status === "good").length;

  return (
    <div className="space-y-6 text-xs">
      {/* 1. SEO Quality Score Pill */}
      <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-surface-elevated">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-accent/10 text-accent border border-accent/20">
            <Search className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-bold text-text-primary text-xs">এসইও কোয়ালিটি অডিট</h4>
            <p className="text-[11px] text-text-muted">সার্চ ইঞ্জিন ও মেটাডাটা অপটিমাইজেশন</p>
          </div>
        </div>
        <div className="text-right">
          <span className="font-mono font-bold text-sm text-accent">
            {goodCount} / {checks.length}
          </span>
          <span className="block text-[10px] text-text-muted font-mono">মানদণ্ড উত্তীর্ণ</span>
        </div>
      </div>

      {/* 2. Interactive Search & Social Previews */}
      <div className="rounded-xl border border-border bg-surface-elevated overflow-hidden">
        {/* Preview Tabs */}
        <div className="flex items-center border-b border-border bg-surface px-3 py-2 gap-2">
          <span className="text-[11px] text-text-muted font-medium mr-1">লাইভ প্রিভিউ:</span>
          <button
            type="button"
            onClick={() => setActivePreview("google")}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              activePreview === "google"
                ? "bg-accent text-background font-bold"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            Google Search
          </button>
          <button
            type="button"
            onClick={() => setActivePreview("social")}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              activePreview === "social"
                ? "bg-accent text-background font-bold"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            Facebook / OG
          </button>
          <button
            type="button"
            onClick={() => setActivePreview("twitter")}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              activePreview === "twitter"
                ? "bg-accent text-background font-bold"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            Twitter / X
          </button>
        </div>

        {/* Preview Window */}
        <div className="p-4 bg-surface/50">
          {activePreview === "google" && (
            <div className="space-y-1.5 p-3 rounded-lg border border-border/80 bg-surface shadow-xs max-w-lg font-sans">
              <div className="flex items-center gap-1.5 text-[11px] text-text-muted font-mono">
                <Globe className="h-3.5 w-3.5 text-accent" />
                <span className="text-text-primary">projuktilabs.tech</span>
                <span>› blog › {slug || "slug"}</span>
              </div>
              <h3 className="text-base text-blue-600 dark:text-blue-400 hover:underline cursor-pointer font-medium leading-snug line-clamp-2">
                {seoTitle || "নিবন্ধের শিরোনাম | Projukti Labs"}
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
                {seoDescription || "নিবন্ধের মেটা ডেসক্রিপশন এখানে সার্চ ফলাফলে প্রদর্শিত হবে..."}
              </p>
            </div>
          )}

          {activePreview === "social" && (
            <div className="rounded-xl border border-border overflow-hidden bg-surface max-w-sm shadow-md">
              <div className="h-36 bg-surface-elevated relative flex items-center justify-center overflow-hidden">
                {coverImage || ogImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={ogImage || coverImage}
                    alt="Social preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-center p-4 text-text-muted">
                    <Share2 className="h-8 w-8 mx-auto mb-1 opacity-40 text-accent" />
                    <span className="text-[10px]">কোনো সোশ্যাল ইমেজ যুক্ত করা হয়নি</span>
                  </div>
                )}
              </div>
              <div className="p-3 space-y-1">
                <span className="text-[10px] uppercase font-mono text-text-muted">projuktilabs.tech</span>
                <h4 className="font-bold text-text-primary text-xs line-clamp-2">
                  {ogTitle || seoTitle || "প্রবন্ধের শিরোনাম"}
                </h4>
                <p className="text-[11px] text-text-muted line-clamp-2 leading-relaxed">
                  {ogDescription || seoDescription || "সোশ্যাল বিবরণ..."}
                </p>
              </div>
            </div>
          )}

          {activePreview === "twitter" && (
            <div className="rounded-2xl border border-border overflow-hidden bg-surface max-w-sm shadow-md font-sans">
              <div className="h-36 bg-surface-elevated relative flex items-center justify-center overflow-hidden">
                {coverImage || ogImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={ogImage || coverImage}
                    alt="Twitter preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-center p-4 text-text-muted">
                    <Share2 className="h-8 w-8 mx-auto mb-1 opacity-40 text-accent" />
                    <span className="text-[10px]">No Twitter Card image</span>
                  </div>
                )}
              </div>
              <div className="p-3 space-y-1 bg-surface-elevated/40">
                <span className="text-[10px] text-text-muted font-mono">From projuktilabs.tech</span>
                <h4 className="font-bold text-text-primary text-xs line-clamp-2">
                  {ogTitle || seoTitle || "Twitter Card Title"}
                </h4>
                <p className="text-[11px] text-text-muted line-clamp-2 leading-relaxed">
                  {ogDescription || seoDescription}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Core SEO Fields */}
      <div className="space-y-4">
        {/* SEO Title */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="font-semibold text-text-primary">এসইও টাইটেল (SEO Title)</label>
            <span
              className={`font-mono text-[10px] ${
                isTitleGood
                  ? "text-emerald-500"
                  : isTitleWarning
                  ? "text-amber-500"
                  : "text-text-muted"
              }`}
            >
              {titleLen} / 60 অক্ষর
            </span>
          </div>
          <input
            type="text"
            value={seoTitle}
            onChange={(e) => onChangeSeoTitle(e.target.value)}
            placeholder="আকর্ষণীয় ও কি-ওয়ার্ড সমৃদ্ধ শিরোনাম..."
            className="w-full h-9 rounded-md border border-border bg-surface-elevated px-3 text-text-primary focus:border-accent focus:outline-hidden"
          />
        </div>

        {/* SEO Description */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="font-semibold text-text-primary">মেটা বিবরণ (Meta Description)</label>
            <span
              className={`font-mono text-[10px] ${
                isDescGood
                  ? "text-emerald-500"
                  : isDescWarning
                  ? "text-amber-500"
                  : "text-text-muted"
              }`}
            >
              {descLen} / 160 অক্ষর
            </span>
          </div>
          <textarea
            rows={3}
            value={seoDescription}
            onChange={(e) => onChangeSeoDescription(e.target.value)}
            placeholder="সার্চ ইঞ্জিনে প্রদর্শনের জন্য স্পষ্ট সংক্ষিপ্ত বিবরণ..."
            className="w-full rounded-md border border-border bg-surface-elevated p-2 text-text-primary focus:border-accent focus:outline-hidden leading-relaxed"
          />
        </div>

        {/* Focus Keyword & Canonical */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-text-primary mb-1">ফোকাস কি-ওয়ার্ড (Focus Keyword)</label>
            <input
              type="text"
              value={focusKeyword}
              onChange={(e) => onChangeFocusKeyword(e.target.value)}
              placeholder="e.g. Next.js Architecture"
              className="w-full h-9 rounded-md border border-border bg-surface-elevated px-3 text-text-primary font-mono text-xs focus:border-accent focus:outline-hidden"
            />
          </div>
          <div>
            <label className="block font-semibold text-text-primary mb-1">ক্যানোনিকাল ইউআরএল (Canonical URL)</label>
            <input
              type="text"
              value={canonicalUrl}
              onChange={(e) => onChangeCanonicalUrl(e.target.value)}
              placeholder="https://projuktilabs.tech/blog/..."
              className="w-full h-9 rounded-md border border-border bg-surface-elevated px-3 text-text-primary font-mono text-xs focus:border-accent focus:outline-hidden"
            />
          </div>
        </div>

        {/* Robots Index / Follow Switches */}
        <div className="flex items-center gap-6 p-3 rounded-xl border border-border bg-surface-elevated">
          <label className="flex items-center gap-2 cursor-pointer font-medium text-text-primary">
            <input
              type="checkbox"
              checked={robotsIndex}
              onChange={(e) => onChangeRobotsIndex(e.target.checked)}
              className="rounded accent-accent h-4 w-4"
            />
            <span>সার্চ ইঞ্জিনে ইনডেক্স হবে (Index)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer font-medium text-text-primary">
            <input
              type="checkbox"
              checked={robotsFollow}
              onChange={(e) => onChangeRobotsFollow(e.target.checked)}
              className="rounded accent-accent h-4 w-4"
            />
            <span>লিঙ্ক ফলো করবে (Follow)</span>
          </label>
        </div>

        {/* Collapsible Advanced Social Overrides */}
        <div className="border border-border rounded-xl overflow-hidden bg-surface">
          <button
            type="button"
            onClick={() => setShowAdvancedSocial(!showAdvancedSocial)}
            className="flex items-center justify-between w-full p-3 text-left bg-surface-elevated/60 hover:bg-surface-elevated transition-colors"
          >
            <span className="font-semibold text-text-primary flex items-center gap-2">
              <Share2 className="h-4 w-4 text-accent" />
              কাস্টম সোশ্যাল মেটা ওভাররাইড (OpenGraph & Twitter)
            </span>
            {showAdvancedSocial ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {showAdvancedSocial && (
            <div className="p-4 space-y-3 bg-surface border-t border-border">
              <div>
                <label className="block text-text-muted mb-1">OpenGraph Title (খালি রাখলে SEO Title ব্যবহৃত হবে)</label>
                <input
                  type="text"
                  value={ogTitle}
                  onChange={(e) => onChangeOgTitle?.(e.target.value)}
                  placeholder={seoTitle}
                  className="w-full h-9 rounded-md border border-border bg-surface-elevated px-3 text-text-primary focus:border-accent focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-text-muted mb-1">OpenGraph Description</label>
                <textarea
                  rows={2}
                  value={ogDescription}
                  onChange={(e) => onChangeOgDescription?.(e.target.value)}
                  placeholder={seoDescription}
                  className="w-full rounded-md border border-border bg-surface-elevated p-2 text-text-primary focus:border-accent focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-text-muted mb-1">কাস্টম সোশ্যাল ইমেজ URL (OG Image)</label>
                <input
                  type="text"
                  value={ogImage}
                  onChange={(e) => onChangeOgImage?.(e.target.value)}
                  placeholder={coverImage || "https://..."}
                  className="w-full h-9 rounded-md border border-border bg-surface-elevated px-3 text-text-primary focus:border-accent focus:outline-hidden font-mono text-xs"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4. Quality Checklist Checklist Table */}
      <div className="rounded-xl border border-border bg-surface p-4 space-y-3">
        <h4 className="font-bold text-text-primary text-xs">এসইও মানদণ্ড মূল্যায়ন (Checklist)</h4>
        <div className="space-y-2">
          {checks.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-1.5 border-b border-border/40 last:border-none"
            >
              <div className="flex items-center gap-2">
                {item.status === "good" ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                ) : item.status === "warning" ? (
                  <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
                ) : (
                  <XCircle className="h-4 w-4 text-rose-500 shrink-0" />
                )}
                <span className="text-text-primary font-medium">{item.label}</span>
              </div>
              <span className="text-[11px] font-mono text-text-muted">{item.note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
