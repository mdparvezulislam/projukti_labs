"use client";

import { useState } from "react";
import { ExtractedMetadata } from "@/lib/cms/blog-extractor";
import { Sparkles, X, Tag, AlertTriangle } from "lucide-react";

interface ContentExtractionModalProps {
  isOpen: boolean;
  onClose: () => void;
  metadata: ExtractedMetadata | null;
  onApply: (selectedFields: Partial<ExtractedMetadata>) => void;
}

export function ContentExtractionModal({
  isOpen,
  onClose,
  metadata,
  onApply,
}: ContentExtractionModalProps) {
  const [selected, setSelected] = useState({
    title: true,
    slug: true,
    excerpt: true,
    category: true,
    tags: true,
    focusKeyword: true,
    seoTitle: true,
    seoDescription: true,
    tableOfContents: true,
  });

  const [customTitle, setCustomTitle] = useState(metadata?.title || "");
  const [customSlug, setCustomSlug] = useState(metadata?.slug || "");
  const [customExcerpt, setCustomExcerpt] = useState(metadata?.excerpt || "");

  if (!isOpen || !metadata) return null;

  const toggleSelect = (key: keyof typeof selected) => {
    setSelected((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleApplyAll = () => {
    onApply({
      ...metadata,
      title: customTitle || metadata.title,
      slug: customSlug || metadata.slug,
      excerpt: customExcerpt || metadata.excerpt,
    });
    onClose();
  };

  const handleApplySelected = () => {
    const toApply: Partial<ExtractedMetadata> = {};
    if (selected.title) toApply.title = customTitle || metadata.title;
    if (selected.slug) toApply.slug = customSlug || metadata.slug;
    if (selected.excerpt) toApply.excerpt = customExcerpt || metadata.excerpt;
    if (selected.category) toApply.suggestedCategory = metadata.suggestedCategory;
    if (selected.tags) toApply.suggestedTags = metadata.suggestedTags;
    if (selected.focusKeyword) toApply.focusKeyword = metadata.focusKeyword;
    if (selected.seoTitle) toApply.seoTitle = metadata.seoTitle;
    if (selected.seoDescription) toApply.seoDescription = metadata.seoDescription;
    if (selected.tableOfContents) toApply.tableOfContents = metadata.tableOfContents;
    toApply.readingTimeMinutes = metadata.readingTimeMinutes;
    toApply.wordCount = metadata.wordCount;
    toApply.headingCount = metadata.headingCount;
    toApply.paragraphCount = metadata.paragraphCount;

    onApply(toApply);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="flex flex-col w-full max-w-2xl max-h-[90vh] rounded-2xl border border-border bg-surface shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-surface-elevated px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-accent/10 border border-accent/30 text-accent">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-text-primary">
                স্মার্ট কন্টেন্ট অ্যানালাইসিস (Smart Content Extraction)
              </h2>
              <p className="text-xs text-text-muted">
                পেস্ট করা নিবন্ধ বিশ্লেষণ করে প্রয়োজনীয় মেটাডাটা ও এসইও তথ্য সাজানো হয়েছে।
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
          {metadata.multipleH1Warning && (
            <div className="flex items-start gap-2.5 p-3 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">একাধিক H1 হেডিং পাওয়া গেছে (Multiple H1s)</p>
                <p className="text-[11px] opacity-90 mt-0.5">
                  নিবন্ধে একাধিক H1 হেডিং রয়েছে। সেরা এসইও ফলাফলের জন্য নিবন্ধে একটিমাত্র মূল H1 থাকা বাঞ্ছনীয়।
                </p>
              </div>
            </div>
          )}

          {/* Stats Pill Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl border border-border bg-surface-elevated text-center">
              <span className="text-[11px] text-text-muted block">শব্দ সংখ্যা</span>
              <span className="text-lg font-bold font-mono text-text-primary">{metadata.wordCount}</span>
            </div>
            <div className="p-3 rounded-xl border border-border bg-surface-elevated text-center">
              <span className="text-[11px] text-text-muted block">পড়ার সময়</span>
              <span className="text-lg font-bold font-mono text-accent">{metadata.readingTimeMinutes} মিনিট</span>
            </div>
            <div className="p-3 rounded-xl border border-border bg-surface-elevated text-center">
              <span className="text-[11px] text-text-muted block">হেডিং সংখ্যা</span>
              <span className="text-lg font-bold font-mono text-text-primary">{metadata.headingCount}</span>
            </div>
            <div className="p-3 rounded-xl border border-border bg-surface-elevated text-center">
              <span className="text-[11px] text-text-muted block">প্যারাগ্রাফ সংখ্যা</span>
              <span className="text-lg font-bold font-mono text-text-primary">{metadata.paragraphCount}</span>
            </div>
          </div>

          {/* Extracted Fields Checklist */}
          <div className="space-y-3 pt-2">
            {/* Title */}
            <div className="rounded-xl border border-border bg-surface/60 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 font-bold text-text-primary cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selected.title}
                    onChange={() => toggleSelect("title")}
                    className="rounded accent-accent h-4 w-4"
                  />
                  <span>নিবন্ধের শিরোনাম (Title Candidate)</span>
                </label>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-elevated border border-border text-text-muted">
                  H1 / Line 1
                </span>
              </div>
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="w-full h-9 rounded-md border border-border bg-surface-elevated px-3 text-text-primary font-medium focus:border-accent focus:outline-hidden"
              />
            </div>

            {/* Slug */}
            <div className="rounded-xl border border-border bg-surface/60 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 font-bold text-text-primary cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selected.slug}
                    onChange={() => toggleSelect("slug")}
                    className="rounded accent-accent h-4 w-4"
                  />
                  <span>ইউআরএল স্লাগ (SEO-friendly Slug)</span>
                </label>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-elevated border border-border text-text-muted">
                  Deterministic Clean
                </span>
              </div>
              <div className="flex items-center rounded-md border border-border bg-surface-elevated px-3">
                <span className="text-text-muted font-mono text-xs">/blog/</span>
                <input
                  type="text"
                  value={customSlug}
                  onChange={(e) => setCustomSlug(e.target.value)}
                  className="w-full h-9 bg-transparent border-none text-text-primary font-mono text-xs focus:outline-hidden pl-1"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div className="rounded-xl border border-border bg-surface/60 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 font-bold text-text-primary cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selected.excerpt}
                    onChange={() => toggleSelect("excerpt")}
                    className="rounded accent-accent h-4 w-4"
                  />
                  <span>সংক্ষিপ্ত বিবরণ (Excerpt / Summary)</span>
                </label>
                <span className="text-[10px] font-mono text-text-muted">{customExcerpt.length} অক্ষর</span>
              </div>
              <textarea
                rows={2}
                value={customExcerpt}
                onChange={(e) => setCustomExcerpt(e.target.value)}
                className="w-full rounded-md border border-border bg-surface-elevated p-2 text-text-secondary focus:border-accent focus:outline-hidden leading-relaxed"
              />
            </div>

            {/* Category & Focus Keyword */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-xl border border-border bg-surface/60 p-4 space-y-2">
                <label className="flex items-center gap-2 font-bold text-text-primary cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selected.category}
                    onChange={() => toggleSelect("category")}
                    className="rounded accent-accent h-4 w-4"
                  />
                  <span>ক্যাটাগরি সুপারিশ</span>
                </label>
                <div className="flex items-center justify-between p-2 rounded-md bg-surface-elevated border border-border">
                  <span className="font-semibold text-text-primary">{metadata.suggestedCategory.name}</span>
                  <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
                    {metadata.suggestedCategory.confidence} confidence
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-surface/60 p-4 space-y-2">
                <label className="flex items-center gap-2 font-bold text-text-primary cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selected.focusKeyword}
                    onChange={() => toggleSelect("focusKeyword")}
                    className="rounded accent-accent h-4 w-4"
                  />
                  <span>ফোকাস কি-ওয়ার্ড</span>
                </label>
                <div className="p-2 rounded-md bg-surface-elevated border border-border">
                  <span className="font-mono text-accent font-semibold">{metadata.focusKeyword}</span>
                </div>
              </div>
            </div>

            {/* Suggested Tags */}
            <div className="rounded-xl border border-border bg-surface/60 p-4 space-y-2">
              <label className="flex items-center gap-2 font-bold text-text-primary cursor-pointer">
                <input
                  type="checkbox"
                  checked={selected.tags}
                  onChange={() => toggleSelect("tags")}
                  className="rounded accent-accent h-4 w-4"
                />
                <span>প্রস্তাবিত ট্যাগসমূহ ({metadata.suggestedTags.length})</span>
              </label>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {metadata.suggestedTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-surface-elevated border border-border text-text-secondary text-[11px] font-mono flex items-center gap-1"
                  >
                    <Tag className="h-3 w-3 text-accent" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Table of Contents Preview */}
            {metadata.tableOfContents.length > 0 && (
              <div className="rounded-xl border border-border bg-surface/60 p-4 space-y-2">
                <label className="flex items-center gap-2 font-bold text-text-primary cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selected.tableOfContents}
                    onChange={() => toggleSelect("tableOfContents")}
                    className="rounded accent-accent h-4 w-4"
                  />
                  <span>সূচিপত্র রূপরেখা (Table of Contents - {metadata.tableOfContents.length} Headings)</span>
                </label>
                <div className="max-h-36 overflow-y-auto space-y-1 p-2 rounded-md bg-surface-elevated border border-border">
                  {metadata.tableOfContents.map((item, idx) => (
                    <div
                      key={idx}
                      style={{ paddingLeft: `${(item.level - 2) * 16}px` }}
                      className="text-text-secondary flex items-center gap-1.5 text-[11px]"
                    >
                      <span className="text-accent font-mono text-[10px]">H{item.level}</span>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-surface-elevated px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-border bg-surface text-text-secondary hover:bg-surface-elevated transition-colors text-xs"
          >
            বাতিল করুন
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleApplySelected}
              className="px-4 py-2 rounded-lg border border-accent/40 bg-accent/10 hover:bg-accent/20 text-accent font-bold text-xs transition-colors"
            >
              নির্বাচিত তথ্য প্রয়োগ করুন
            </button>
            <button
              type="button"
              onClick={handleApplyAll}
              className="px-5 py-2 rounded-lg bg-accent text-background font-bold text-xs hover:bg-accent/90 transition-colors shadow-xs"
            >
              সব তথ্য প্রয়োগ করুন (Apply All)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
