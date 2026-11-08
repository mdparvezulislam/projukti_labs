import { Badge } from "@/components/ui/badge";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PocDynamicSlugPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-14 sm:px-6 lg:px-8 space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4 shadow-sm">
        <Badge variant="accent">POC: DYNAMIC ROUTE</Badge>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
          Next.js 16 Async Params Resolution
        </h1>
        <p className="text-sm text-text-secondary">
          Resolved Slug parameter:{" "}
          <span className="font-mono font-bold text-brand-orange-strong dark:text-accent bg-surface-muted px-2 py-0.5 rounded-md border border-border">
            {slug}
          </span>
        </p>
        <p className="text-xs text-text-muted">
          Verification: Next.js 16 async params successfully resolved under vinext edge compiler.
        </p>
      </div>
    </div>
  );
}

