"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Copy, Send, Check } from "lucide-react";

export function ContactForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneWhatsapp, setPhoneWhatsapp] = useState("");
  const [companyName, setCompanyName] = useState("");
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
          inquiryType: "contact",
          fullName,
          email,
          phoneWhatsapp: phoneWhatsapp || undefined,
          companyName: companyName || undefined,
          projectBrief,
          sourcePage: "/contact",
        }),
      });

      const json = (await res.json()) as {
        success: boolean;
        data?: { referenceCode: string; message?: string };
        error?: { message?: string };
      };
      if (!res.ok || !json.success || !json.data) {
        throw new Error(
          json.error?.message || "Failed to submit inquiry. Please verify your input and try again."
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
          <Badge variant="accent">Message Received Successfully</Badge>
          <h3 className="text-2xl font-bold text-text-primary">Thank you, {fullName}!</h3>
          <p className="text-text-muted text-sm max-w-md mx-auto leading-relaxed">
            Your inquiry has been queued for review by our lead software architect. We will review your requirements
            and respond within 24 business hours.
          </p>
        </div>

        <div className="mx-auto max-w-xs rounded-lg border border-border bg-background p-4 text-center">
          <p className="text-xs uppercase tracking-wider text-text-muted font-mono">Reference Tracking Code</p>
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
        </div>

        <Button
          variant="outline"
          onClick={() => {
            setSubmittedRef(null);
            setProjectBrief("");
          }}
        >
          Send Another Message
        </Button>
      </Card>
    );
  }

  return (
    <Card className="border-border/80 bg-card">
      <CardContent className="p-4 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div
              className="rounded-md border border-red-500/30 bg-red-500/15 p-4 text-sm text-red-700 dark:text-red-300"
              role="alert"
            >
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="contact-fullName" className="text-sm font-medium text-text-primary">
                Full Name <span className="text-accent-text">*</span>
              </label>
              <Input
                id="contact-fullName"
                name="fullName"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g., Alex Rahman"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-email" className="text-sm font-medium text-text-primary">
                Business Email <span className="text-accent-text">*</span>
              </label>
              <Input
                id="contact-email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="contact-phone" className="text-sm font-medium text-text-primary">
                Phone / WhatsApp <span className="text-xs text-text-muted">(Optional)</span>
              </label>
              <Input
                id="contact-phone"
                name="phoneWhatsapp"
                value={phoneWhatsapp}
                onChange={(e) => setPhoneWhatsapp(e.target.value)}
                placeholder="+880 1700 000000"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-company" className="text-sm font-medium text-text-primary">
                Company / Organization <span className="text-xs text-text-muted">(Optional)</span>
              </label>
              <Input
                id="contact-company"
                name="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Your Company or Project"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="contact-brief" className="text-sm font-medium text-text-primary">
              Project Brief or Message <span className="text-accent">*</span>
            </label>
            <Textarea
              id="contact-brief"
              name="projectBrief"
              required
              rows={4}
              value={projectBrief}
              onChange={(e) => setProjectBrief(e.target.value)}
              placeholder="Tell us about your project requirements, technical challenges, or questions..."
            />
          </div>

          <Button type="submit" variant="primary" loading={loading} className="w-full sm:w-auto">
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
