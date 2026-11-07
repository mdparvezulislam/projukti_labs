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
  const [country, setCountry] = useState("Bangladesh");
  const [serviceId, setServiceId] = useState(initialService || "landing-page-meta-pixel");
  const [packageId, setPackageId] = useState(initialPackage || "");
  const [currency, setCurrency] = useState<"BDT" | "USD">("BDT");
  const [budgetRange, setBudgetRange] = useState("৳ 25,000 – ৳ 50,000");
  const [timelinePreference, setTimelinePreference] = useState("2 to 3 weeks (Standard)");
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
        throw new Error(
          json.error?.message || "Failed to submit quote request. Please verify your input and try again."
        );
      }

      setSubmittedRef(json.data.referenceCode);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred. Please try again."
      );
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
          <Badge variant="accent">Quotation Brief Received</Badge>
          <h3 className="text-2xl font-bold text-text-primary">Thank you, {fullName}!</h3>
          <p className="text-text-muted text-sm max-w-lg mx-auto leading-relaxed">
            Your technical project brief has reached our software architect. We will review your requirements and follow
            up with a formal Scope of Work (SOW) and milestone estimate within 24 business hours.
          </p>
        </div>

        <div className="mx-auto max-w-sm rounded-lg border border-border bg-background p-4 text-center">
          <p className="text-xs uppercase tracking-wider text-text-muted font-mono">Quotation Reference Code</p>
          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="font-mono text-xl font-bold text-accent-text">{submittedRef}</span>
            <button
              type="button"
              onClick={copyReferenceCode}
              className="rounded p-1 text-text-muted hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
              aria-label="Copy reference tracking code"
            >
              {copied ? <Check className="h-4 w-4 text-accent-text" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
          <p className="mt-2 text-xs text-text-muted">
            Directly reviewed by Md Parvezul Islam, Principal Software Architect.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => {
            setSubmittedRef(null);
            setProjectBrief("");
          }}
        >
          Submit Another Project Brief
        </Button>
      </Card>
    );
  }

  return (
    <Card className="border-border/80 bg-surface/50">
      <CardContent className="p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div
              className="rounded-md border border-red-500/30 bg-red-500/15 p-4 text-sm text-red-700 dark:text-red-300"
              role="alert"
            >
              {error}
            </div>
          )}

          {/* Section 1: Contact Information */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-accent flex items-center gap-2 font-mono">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/20 text-xs text-accent font-bold">
                1
              </span>
              Client &amp; Contact Details
            </h4>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="quote-fullName" className="text-sm font-medium text-text-primary">
                  Full Name <span className="text-accent-text">*</span>
                </label>
                <Input
                  id="quote-fullName"
                  name="fullName"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g., Alex Rahman"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="quote-email" className="text-sm font-medium text-text-primary">
                  Business Email <span className="text-accent">*</span>
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
                  Phone / WhatsApp
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
                  Company / Organization
                </label>
                <Input
                  id="quote-company"
                  name="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Your Company or Brand"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="quote-country" className="text-sm font-medium text-text-primary">
                  Country / Location
                </label>
                <Input
                  id="quote-country"
                  name="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Bangladesh, UK, USA, etc."
                />
              </div>
            </div>
          </div>

          {/* Section 2: Project Scope & Service Selection */}
          <div className="space-y-4 pt-4 border-t border-border/50">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-accent flex items-center gap-2 font-mono">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/20 text-xs text-accent font-bold">
                2
              </span>
              Service &amp; Package Selection
            </h4>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="quote-service" className="text-sm font-medium text-text-primary">
                  Select Required Service <span className="text-accent">*</span>
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
                          {srv.name} {srv.isFlagship ? "★ Flagship" : ""}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                  <option value="custom-solution">Custom Software Architecture / Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="quote-package" className="text-sm font-medium text-text-primary">
                  Preferred Package Tier (Optional)
                </label>
                <Input
                  id="quote-package"
                  value={packageId}
                  onChange={(e) => setPackageId(e.target.value)}
                  placeholder="e.g., Conversion Pro, Growth Storefront, or Custom"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Budget & Timeline */}
          <div className="space-y-4 pt-4 border-t border-border/50">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-accent flex items-center gap-2 font-mono">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/20 text-xs text-accent font-bold">
                3
              </span>
              Budget &amp; Target Timeline
            </h4>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="space-y-2">
                <label htmlFor="quote-currency" className="text-sm font-medium text-text-primary">
                  Billing Currency
                </label>
                <select
                  id="quote-currency"
                  value={currency}
                  onChange={(e) => {
                    const c = e.target.value as "BDT" | "USD";
                    setCurrency(c);
                    setBudgetRange(c === "BDT" ? "৳ 25,000 – ৳ 50,000" : "$300 - $750");
                  }}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text-primary shadow-xs focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  <option value="BDT">BDT (৳ — Bangladesh Local)</option>
                  <option value="USD">USD ($ — International)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="quote-budget" className="text-sm font-medium text-text-primary">
                  Estimated Budget Range
                </label>
                <select
                  id="quote-budget"
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text-primary shadow-xs focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  {currency === "BDT" ? (
                    <>
                      <option value="৳ 25,000 – ৳ 50,000">৳ 25,000 – ৳ 50,000</option>
                      <option value="৳ 50,000 – ৳ 1,00,000">৳ 50,000 – ৳ 1,00,000</option>
                      <option value="৳ 1,00,000 – ৳ 2,00,000">৳ 1,00,000 – ৳ 2,00,000</option>
                      <option value="৳ 2,00,000+ (Enterprise)">৳ 2,00,000+ (Enterprise)</option>
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
                  Target Launch Timeline
                </label>
                <select
                  id="quote-timeline"
                  value={timelinePreference}
                  onChange={(e) => setTimelinePreference(e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text-primary shadow-xs focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  <option value="1 to 2 weeks (Sprint)">1 to 2 weeks (Sprint)</option>
                  <option value="2 to 3 weeks (Standard)">2 to 3 weeks (Standard)</option>
                  <option value="1 to 2 months (Complete)">1 to 2 months (Complete)</option>
                  <option value="Flexible / Long-term Planning">Flexible / Long-term Planning</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 4: Project Specifications */}
          <div className="space-y-4 pt-4 border-t border-border/50">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-accent flex items-center gap-2 font-mono">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/20 text-xs text-accent font-bold">
                4
              </span>
              Project Requirements &amp; Technical Specifications
            </h4>
            <div className="space-y-2">
              <label htmlFor="quote-brief" className="text-sm font-medium text-text-primary">
                Describe your project goals, required integrations, or reference websites{" "}
                <span className="text-accent">*</span>
              </label>
              <Textarea
                id="quote-brief"
                name="projectBrief"
                required
                rows={5}
                value={projectBrief}
                onChange={(e) => setProjectBrief(e.target.value)}
                placeholder="Share your business objectives, required features (e.g. bKash payment gateway, Meta Pixel + CAPI, courier APIs), reference links, and target users..."
              />
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full sm:w-auto">
              <Calculator className="mr-2 h-4 w-4" />
              Request Official Project Quote
            </Button>
            <p className="mt-2 text-xs text-text-muted">
              Your submission will be directly reviewed by our Principal Software Architect.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
