"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Copy, Check, Calculator } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/modules/services/data";

interface QuoteFormProps {
  initialService?: string;
  initialPackage?: string;
}

export function QuoteForm({ initialService = "", initialPackage = "" }: QuoteFormProps) {
  const activeCategories = SERVICE_CATEGORIES.filter((c) => c.status === "active");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneWhatsapp, setPhoneWhatsapp] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [country, setCountry] = useState("বাংলাদেশ (Bangladesh)");
  const [serviceId, setServiceId] = useState(initialService || "landing-page-meta-pixel");
  const [packageId, setPackageId] = useState(initialPackage || "");
  const [currency, setCurrency] = useState<"BDT" | "USD">("BDT");
  const [budgetRange, setBudgetRange] = useState("৳ ২৫,০০০ – ৳ ৫০,০০০");
  const [timelinePreference, setTimelinePreference] = useState("২ থেকে ৩ সপ্তাহের মধ্যে");
  const [projectBrief, setProjectBrief] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/v1/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inquiryType: "quote",
          fullName,
          email,
          phoneWhatsapp: phoneWhatsapp || undefined,
          companyName: companyName || undefined,
          country: country || undefined,
          serviceId: serviceId || undefined,
          packageId: packageId || undefined,
          currency,
          budgetRange,
          timelinePreference,
          projectBrief,
          sourcePage: "/get-a-quote",
        }),
      });

      const json = (await res.json()) as {
        success: boolean;
        data?: { referenceCode: string; message?: string };
        error?: { message?: string };
      };
      if (!res.ok || !json.success || !json.data) {
        throw new Error(json.error?.message || "কোটেশন রিকোয়েস্ট সাবমিট করা সম্ভব হয়নি। অনুগ্রহ করে তথ্য যাচাই করুন।");
      }

      setSubmittedRef(json.data.referenceCode);
    } catch (err) {
      setError(err instanceof Error ? err.message : "একটি অপ্রত্যাশিত ত্রুটি ঘটেছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const copyReferenceCode = () => {
    if (submittedRef) {
      navigator.clipboard.writeText(submittedRef);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (submittedRef) {
    return (
      <Card className="border-accent/40 bg-surface/80 p-8 text-center space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
          <CheckCircle2 className="h-10 w-10 text-accent" />
        </div>
        <div className="space-y-2">
          <Badge variant="accent">কোটেশন ব্রিফ সংরক্ষিত হয়েছে</Badge>
          <h3 className="text-2xl font-bold text-text-primary">ধন্যবাদ, {fullName}!</h3>
          <p className="text-text-muted text-sm max-w-lg mx-auto leading-relaxed">
            আপনার প্রজেক্টের কারিগরি রিকোয়ারমেন্টস আমাদের সফটওয়্যার আর্কিটেক্টদের কাছে পৌঁছেছে। আমরা আপনার চাহিদা পর্যালোচনা করে একটি সুনির্দিষ্ট স্কোপ অফ ওয়ার্ক ও কোটেশনসহ দ্রুত যোগাযোগ করব।
          </p>
        </div>

        <div className="mx-auto max-w-sm rounded-lg border border-border bg-background p-4 text-center">
          <p className="text-xs uppercase tracking-wider text-text-muted font-mono">আপনার কোটেশন রেফারেন্স কোড</p>
          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="font-mono text-xl font-bold text-accent-text">{submittedRef}</span>
            <button
              type="button"
              onClick={copyReferenceCode}
              className="rounded p-1 text-text-muted hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
              aria-label="রেফারেন্স ট্র্যাকিং কোড কপি করুন"
            >
              {copied ? <Check className="h-4 w-4 text-accent-text" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
          <p className="mt-2 text-xs text-text-muted">
            কোটেশন ইনকোয়ারি সরাসরি আমাদের প্রিন্সিপাল আর্কিটেক্ট রিভিউ করেন।
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => {
            setSubmittedRef(null);
            setProjectBrief("");
          }}
        >
          আরেকটি প্রজেক্ট ব্রিফ সাবমিট করুন
        </Button>
      </Card>
    );
  }

  return (
    <Card className="border-border/80 bg-surface/50">
      <CardContent className="p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-md border border-red-500/30 bg-red-500/15 p-4 text-sm text-red-700 dark:text-red-300" role="alert">
              {error}
            </div>
          )}

          {/* Section 1: Contact Information */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-accent-text flex items-center gap-2 font-mono">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/20 text-xs text-accent-text font-bold">১</span>
              ক্লায়েন্ট ও ব্যবসায়িক বিবরণ
            </h4>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="quote-fullName" className="text-sm font-medium text-text-primary">
                  আপনার নাম <span className="text-accent-text">*</span>
                </label>
                <Input
                  id="quote-fullName"
                  name="fullName"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="যেমন: মোঃ পারভেজুল ইসলাম"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="quote-email" className="text-sm font-medium text-text-primary">
                  অফিসিয়াল ইমেইল <span className="text-accent">*</span>
                </label>
                <Input
                  id="quote-email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="space-y-2">
                <label htmlFor="quote-phone" className="text-sm font-medium text-text-primary">
                  ফোন / হোয়াটসঅ্যাপ নম্বর
                </label>
                <Input
                  id="quote-phone"
                  name="phoneWhatsapp"
                  value={phoneWhatsapp}
                  onChange={(e) => setPhoneWhatsapp(e.target.value)}
                  placeholder="+880 1700 000000"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="quote-company" className="text-sm font-medium text-text-primary">
                  কোম্পানি বা ব্র্যান্ডের নাম
                </label>
                <Input
                  id="quote-company"
                  name="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="আপনার ব্র্যান্ড / প্রতিষ্ঠান"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="quote-country" className="text-sm font-medium text-text-primary">
                  অবস্থান / দেশ
                </label>
                <Input
                  id="quote-country"
                  name="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="বাংলাদেশ, যুক্তরাজ্য, যুক্তরাষ্ট্র ইত্যাদি"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Project Scope & Service Selection */}
          <div className="space-y-4 pt-4 border-t border-border/50">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-accent flex items-center gap-2 font-mono">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/20 text-xs text-accent">২</span>
              সেবার ধরন ও প্যাকেজ
            </h4>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="quote-service" className="text-sm font-medium text-text-primary">
                  প্রয়োজনীয় সার্ভিস নির্বাচন করুন <span className="text-accent">*</span>
                </label>
                <select
                  id="quote-service"
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text-primary shadow-xs focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  {activeCategories.map((cat) => (
                    <optgroup key={cat.id} label={cat.name}>
                      {cat.services.map((srv) => (
                        <option key={srv.slug} value={srv.slug}>
                          {srv.name} {srv.isFlagship ? "★ ফ্ল্যাগশিপ" : ""}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                  <option value="custom-solution">অন্যান্য কাস্টম সফটওয়্যার সল্যুশন</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="quote-package" className="text-sm font-medium text-text-primary">
                  পছন্দসই টিয়ার বা প্যাকেজ (ঐচ্ছিক)
                </label>
                <Input
                  id="quote-package"
                  value={packageId}
                  onChange={(e) => setPackageId(e.target.value)}
                  placeholder="যেমন: Conversion Pro, Business Care, অথবা কাস্টম"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Budget & Timeline */}
          <div className="space-y-4 pt-4 border-t border-border/50">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-accent flex items-center gap-2 font-mono">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/20 text-xs text-accent">৩</span>
              বাজেট ও সম্ভাব্য সময়সীমা
            </h4>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="space-y-2">
                <label htmlFor="quote-currency" className="text-sm font-medium text-text-primary">
                  বিলিং কারেন্সি
                </label>
                <select
                  id="quote-currency"
                  value={currency}
                  onChange={(e) => {
                    const c = e.target.value as "BDT" | "USD";
                    setCurrency(c);
                    setBudgetRange(c === "BDT" ? "৳ ২৫,০০০ – ৳ ৫০,০০০" : "$300 - $750");
                  }}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text-primary shadow-xs focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  <option value="BDT">BDT (৳ — বাংলাদেশ লোকাল)</option>
                  <option value="USD">USD ($ — আন্তর্জাতিক)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="quote-budget" className="text-sm font-medium text-text-primary">
                  আনুমানিক বাজেট সীমা
                </label>
                <select
                  id="quote-budget"
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text-primary shadow-xs focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  {currency === "BDT" ? (
                    <>
                      <option value="৳ ২৫,০০০ – ৳ ৫০,০০০">৳ ২৫,০০০ – ৳ ৫০,০০০</option>
                      <option value="৳ ৫০,০০০ – ৳ ১,০০,০০০">৳ ৫০,০০০ – ৳ ১,০০,০০০</option>
                      <option value="৳ ১,০০,০০০ – ৳ ২,০০,০০০">৳ ১,০০,০০০ – ৳ ২,০০,০০০</option>
                      <option value="৳ ২,০০,০০০+ (এন্টারপ্রাইজ)">৳ ২,০০,০০০+ (এন্টারপ্রাইজ)</option>
                    </>
                  ) : (
                    <>
                      <option value="$300 - $750">$300 – $750</option>
                      <option value="$750 - $1,500">$750 – $1,500</option>
                      <option value="$1,500 - $3,000">$1,500 – $3,000</option>
                      <option value="$3,000+">$3,000+ (Enterprise)</option>
                    </>
                  )}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="quote-timeline" className="text-sm font-medium text-text-primary">
                  টার্গেট লঞ্চ টাইমলাইন
                </label>
                <select
                  id="quote-timeline"
                  value={timelinePreference}
                  onChange={(e) => setTimelinePreference(e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text-primary shadow-xs focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  <option value="১ থেকে ২ সপ্তাহের মধ্যে (স্প্রিন্ট)">১ থেকে ২ সপ্তাহের মধ্যে (স্প্রিন্ট)</option>
                  <option value="২ থেকে ৩ সপ্তাহের মধ্যে (স্ট্যান্ডার্ড)">২ থেকে ৩ সপ্তাহের মধ্যে (স্ট্যান্ডার্ড)</option>
                  <option value="১ থেকে ২ মাসের মধ্যে (কমপ্লিট)">১ থেকে ২ মাসের মধ্যে (কমপ্লিট)</option>
                  <option value="ফ্লেক্সিবল / দীর্ঘমেয়াদী পরিকল্পনা">ফ্লেক্সিবল / দীর্ঘমেয়াদী পরিকল্পনা</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 4: Project Specifications */}
          <div className="space-y-4 pt-4 border-t border-border/50">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-accent flex items-center gap-2 font-mono">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/20 text-xs text-accent">৪</span>
              প্রজেক্টের বিবরণ ও কারিগরি রিকোয়ারমেন্টস
            </h4>
            <div className="space-y-2">
              <label htmlFor="quote-brief" className="text-sm font-medium text-text-primary">
                আপনার ব্যবসার লক্ষ্য, সেবার বিবরণ বা পছন্দের রেফারেন্স লিঙ্ক লিখুন <span className="text-accent">*</span>
              </label>
              <Textarea
                id="quote-brief"
                name="projectBrief"
                required
                rows={5}
                value={projectBrief}
                onChange={(e) => setProjectBrief(e.target.value)}
                placeholder="আপনার ব্যবসার ধরন, প্রয়োজনীয় ফিচার (পেমেন্ট গেটওয়ে, মেটা পিক্সেল, কুরিয়ার এপিআই), রেফারেন্স ওয়েবসাইট এবং লক্ষ্যসমূহ বিস্তারিত শেয়ার করুন..."
              />
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full sm:w-auto">
              <Calculator className="mr-2 h-4 w-4" />
              অফিসিয়াল কোটেশন রিকোয়েস্ট করুন
            </Button>
            <p className="mt-2 text-xs text-text-muted">
              সাবমিট করার পর আপনার ব্রিফটি সরাসরি আমাদের প্রিন্সিপাল সফটওয়্যার আর্কিটেক্টের কাছে পৌঁছাবে।
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
