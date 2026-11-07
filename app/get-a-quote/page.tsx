import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import { QuoteForm } from "@/components/forms/quote-form";
import { ShieldCheck, Clock, FileText } from "lucide-react";

export const metadata = {
  title: "Request a Project Quotation | Projukti Labs",
  description:
    "Submit your project requirements to receive a structured Scope of Work (SOW), technical architecture plan, and transparent milestone quote.",
};

interface PageProps {
  searchParams: Promise<{ service?: string; package?: string }>;
}

async function QuoteFormContainer({
  searchParams,
}: {
  searchParams: Promise<{ service?: string; package?: string }>;
}) {
  const params = await searchParams;
  const initialService = params?.service || "";
  const initialPackage = params?.package || "";
  return <QuoteForm initialService={initialService} initialPackage={initialPackage} />;
}

export default function GetAQuotePage({ searchParams }: PageProps) {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      {/* 1. Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <Badge variant="accent">STRUCTURED CONSULTATION</Badge>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-text-primary">
          Request a Project Quotation
        </h1>
        <p className="text-base sm:text-lg text-text-muted leading-relaxed">
          Submit your project requirements, target timeline, and budget. Our lead software architect will review your
          specifications and provide a formal Scope of Work (SOW) within 24 business hours.
        </p>
      </div>

      {/* 2. Trust Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center gap-3 rounded-lg border border-border/80 bg-surface/40 p-4">
          <Clock className="h-5 w-5 text-accent shrink-0" />
          <div className="text-xs">
            <span className="font-semibold text-text-primary block">24-Hour Architecture Review</span>
            <span className="text-text-muted">Direct analysis by our lead engineer</span>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-border/80 bg-surface/40 p-4">
          <FileText className="h-5 w-5 text-accent shrink-0" />
          <div className="text-xs">
            <span className="font-semibold text-text-primary block">Fixed Milestones</span>
            <span className="text-text-muted">Zero hidden fees or surprise billings</span>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-border/80 bg-surface/40 p-4">
          <ShieldCheck className="h-5 w-5 text-accent shrink-0" />
          <div className="text-xs">
            <span className="font-semibold text-text-primary block">100% Code Ownership</span>
            <span className="text-text-muted">Full repository &amp; database handover</span>
          </div>
        </div>
      </div>

      {/* 3. Form Component with Suspense Boundary */}
      <Suspense
        fallback={
          <div className="h-96 rounded-xl border border-border bg-surface/30 animate-pulse" />
        }
      >
        <QuoteFormContainer searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
