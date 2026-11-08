import { Badge } from "@/components/ui/badge";

export default async function PocServerComponentPage() {
  const serverTime = new Date().toISOString();
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-14 sm:px-6 lg:px-8 space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4 shadow-sm">
        <Badge variant="accent">POC: REACT SERVER COMPONENT</Badge>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
          Server Component (RSC) Evaluation
        </h1>
        <p className="text-sm text-text-secondary">
          Rendered at server timestamp:{" "}
          <code className="font-mono text-xs font-bold text-brand-orange-strong dark:text-accent bg-surface-muted px-2 py-0.5 rounded-md border border-border">
            {serverTime}
          </code>
        </p>
        <p className="text-xs text-text-muted">
          Runtime verification: React Server Component evaluated cleanly on Cloudflare Workers / vinext.
        </p>
      </div>
    </div>
  );
}

