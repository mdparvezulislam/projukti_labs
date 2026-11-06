import { Badge } from "@/components/ui/badge";
import { QuoteForm } from "@/components/forms/quote-form";
import { ShieldCheck, Clock, FileText } from "lucide-react";

export const metadata = {
  title: "Request a Project Quote | Projukti Labs",
  description:
    "Submit your project brief for a formal scope of work, technical milestone plan, and transparent quotation.",
};

interface PageProps {
  searchParams: Promise<{ service?: string; package?: string }>;
}

export default async function GetAQuotePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const initialService = params?.service || "";
  const initialPackage = params?.package || "";

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <Badge variant="accent">Structured Engagement</Badge>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-text-primary">
          Request a Project Quotation
        </h1>
        <p className="text-base sm:text-lg text-text-muted leading-relaxed">
          Provide your project requirements, preferred launch timeline, and budget parameters. We will evaluate your specifications and return a formal Scope of Work within 24 business hours.
        </p>
      </div>

      {/* Trust Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center gap-3 rounded-lg border border-border/80 bg-surface/40 p-4">
          <Clock className="h-5 w-5 text-accent shrink-0" />
          <div className="text-xs">
            <span className="font-semibold text-text-primary block">24-Hour Review SLA</span>
            <span className="text-text-muted">Direct engineering review</span>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-border/80 bg-surface/40 p-4">
          <FileText className="h-5 w-5 text-accent shrink-0" />
          <div className="text-xs">
            <span className="font-semibold text-text-primary block">Fixed Milestones</span>
            <span className="text-text-muted">No hidden scope creeps</span>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-border/80 bg-surface/40 p-4">
          <ShieldCheck className="h-5 w-5 text-accent shrink-0" />
          <div className="text-xs">
            <span className="font-semibold text-text-primary block">100% Code Ownership</span>
            <span className="text-text-muted">Zero proprietary lock-in</span>
          </div>
        </div>
      </div>

      {/* Form Component */}
      <QuoteForm initialService={initialService} initialPackage={initialPackage} />
    </div>
  );
}
