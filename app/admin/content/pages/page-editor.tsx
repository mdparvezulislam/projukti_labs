"use client";

import { useState } from "react";
import { PageSection } from "@/db/schema";
import { CheckCircle2, Loader2, Save } from "lucide-react";

interface PageEditorProps {
  initialSections: PageSection[];
}

export function PageEditor({ initialSections }: PageEditorProps) {
  const heroSection = initialSections.find((s) => s.sectionKey === "hero");
  const heroContent = (heroSection?.content as Record<string, string>) || {};

  const [title, setTitle] = useState(heroSection?.title || "Building Digital Solutions. Engineering the Future.");
  const [subtitle, setSubtitle] = useState(
    heroSection?.subtitle ||
      "আমরা বাংলাদেশের ব্যবসা ও আধুনিক উদ্যোগগুলোর জন্য উচ্চ-গতির ওয়েব অ্যাপ্লিকেশন, মেটা পিক্সেল ট্র্যাকড ল্যান্ডিং পেজ এবং স্কেলেবল ডিজিটাল কমার্স সিস্টেম তৈরি করি।"
  );
  const [badge, setBadge] = useState(heroContent.badge || "প্রিমিয়াম টেকনোলজি স্টুডিও");
  const [ctaPrimaryText, setCtaPrimaryText] = useState(heroContent.ctaPrimaryText || "প্রজেক্টের বাজেট জানুন");
  const [ctaPrimaryLink, setCtaPrimaryLink] = useState(heroContent.ctaPrimaryLink || "/get-a-quote");
  const [ctaSecondaryText, setCtaSecondaryText] = useState(heroContent.ctaSecondaryText || "সার্ভিসগুলো দেখুন");
  const [ctaSecondaryLink, setCtaSecondaryLink] = useState(heroContent.ctaSecondaryLink || "/services");

  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/admin/content/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: heroSection?.id || "sec_home_hero",
          pageSlug: "home",
          sectionKey: "hero",
          title,
          subtitle,
          content: {
            badge,
            ctaPrimaryText,
            ctaPrimaryLink,
            ctaSecondaryText,
            ctaSecondaryLink,
          },
          isActive: true,
          sortOrder: 1,
        }),
      });

      const data = (await res.json()) as { success?: boolean };
      if (res.ok && data.success) {
        setStatusMessage("হোমপেজ হিরো সেকশন সফলভাবে D1 ডাটাবেসে সেভ হয়েছে।");
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
    <div className="space-y-4 max-w-3xl">
      {statusMessage && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-lg flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{statusMessage}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-card border border-border rounded-xl p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="border-b border-border pb-3">
          <h3 className="text-sm sm:text-base font-bold text-text-primary">
            হোমপেজ হিরো সেকশন এডিটর
          </h3>
          <p className="text-xs text-text-muted mt-0.5">
            পাবলিক হোমপেজের প্রধান শিরোনাম ও কল-টু-অ্যাকশন বোতাম নিয়ন্ত্রণ করুন।
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-text-primary">
            হিরো টপ ব্যাজ
          </label>
          <input
            type="text"
            value={badge}
            onChange={(e) => setBadge(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-text-primary">
            প্রধান শিরোনাম (Hero Title)
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-text-primary">
            সাবটাইটেল / বিবরণ (Hero Subtitle)
          </label>
          <textarea
            rows={3}
            required
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-text-primary">
              প্রাইমারি CTA লেবেল
            </label>
            <input
              type="text"
              value={ctaPrimaryText}
              onChange={(e) => setCtaPrimaryText(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-text-primary">
              প্রাইমারি CTA লিংক
            </label>
            <input
              type="text"
              value={ctaPrimaryLink}
              onChange={(e) => setCtaPrimaryLink(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-text-primary">
              সেকেন্ডারি CTA লেবেল
            </label>
            <input
              type="text"
              value={ctaSecondaryText}
              onChange={(e) => setCtaSecondaryText(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-text-primary">
              সেকেন্ডারি CTA লিংক
            </label>
            <input
              type="text"
              value={ctaSecondaryLink}
              onChange={(e) => setCtaSecondaryLink(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-surface-elevated border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px]"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-border flex items-center justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-accent-foreground text-xs font-bold transition-all hover:bg-accent-hover min-h-[44px]"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                <span>সংরক্ষণ হচ্ছে…</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" aria-hidden="true" />
                <span>পরিবর্তন সংরক্ষণ করুন</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
