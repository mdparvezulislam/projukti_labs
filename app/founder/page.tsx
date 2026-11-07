import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowRight, Cpu, ShieldCheck, Terminal, Award, Search, Database } from "lucide-react";

export const metadata = {
  title: "Founder Profile — Md Parvezul Islam | Projukti Labs",
  description:
    "Md Parvezul Islam is the Founder & Principal Software Architect of Projukti Labs. Explore his technical manifesto, engineering background, and product-building philosophy.",
};

export default function FounderPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-20">
      {/* 1. Hero Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-8 space-y-6">
          <div className="inline-flex items-center gap-2">
            <Badge variant="accent">FOUNDER &amp; PRINCIPAL ARCHITECT</Badge>
            <Badge variant="outline">projuktilabs.tech</Badge>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary leading-tight">
            Md Parvezul Islam
          </h1>

          <p className="text-lg sm:text-xl text-text-muted leading-relaxed">
            Md Parvezul Islam is the founder of Projukti Labs and a software-focused technology builder interested in
            designing and developing practical digital products. His work spans modern web development, e-commerce
            systems, business applications, backend architecture, automation, and high-performance search engines.
          </p>

          <p className="text-sm sm:text-base text-text-muted leading-relaxed italic border-l-2 border-accent pl-4">
            &ldquo;I founded Projukti Labs based on a straightforward principle: software must be fast, honest, and
            genuinely useful for business operations—engineered cleanly without unnecessary layers or artificial
            claims.&rdquo;
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Button variant="primary" asChild>
              <Link href="/get-a-quote">
                Request a Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Send a Direct Message</Link>
            </Button>
          </div>
        </div>

        <div className="lg:col-span-4 flex justify-center">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-8 text-center space-y-6 shadow-2xl">
            <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full border-2 border-accent/40 bg-accent/10 font-mono text-4xl font-extrabold text-accent">
              PI
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-text-primary">Md Parvezul Islam</h2>
              <p className="text-xs uppercase tracking-wider font-semibold text-accent">
                Founder &amp; Principal Software Architect
              </p>
              <p className="text-xs text-text-muted">
                Bangladesh · Serving Domestic &amp; International Clients
              </p>
            </div>

            <div className="pt-4 border-t border-border/80 space-y-2 text-left text-xs text-text-muted font-mono">
              <div className="flex justify-between">
                <span>Role:</span>
                <span className="text-text-primary font-medium">Principal Architect</span>
              </div>
              <div className="flex justify-between">
                <span>Focus:</span>
                <span className="text-text-primary font-medium">Edge &amp; Web Systems</span>
              </div>
              <div className="flex justify-between">
                <span>Direct Access:</span>
                <span className="text-accent font-semibold">Active Client Work</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Architectural Manifesto */}
      <div className="border-t border-border pt-12 space-y-8">
        <div className="max-w-2xl space-y-2">
          <Badge variant="accent">ARCHITECTURAL MANIFESTO</Badge>
          <h2 className="text-3xl font-extrabold text-text-primary">
            How I Architect Digital Products
          </h2>
          <p className="text-text-muted text-sm sm:text-base">
            Core principles that guide every system, database schema, and deployment pipeline I build.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-border bg-surface/40">
            <CardHeader className="space-y-2">
              <Terminal className="h-6 w-6 text-accent" />
              <CardTitle className="text-xl text-text-primary">1. Clean Boundaries &amp; Modularity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-muted leading-relaxed">
                Whether architecting a single-page conversion funnel or an integrated commerce platform, I insist on
                modular boundaries. Strict TypeScript contracts, compile-time validation, and minimal dependencies
                ensure the software remains easy to understand, test, and maintain over time.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-surface/40">
            <CardHeader className="space-y-2">
              <Cpu className="h-6 w-6 text-accent" />
              <CardTitle className="text-xl text-text-primary">2. Edge Runtimes Over Bulky Servers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-muted leading-relaxed">
                I prioritize edge compute architectures (Cloudflare Workers, V8 isolates) where application code
                executes milliseconds away from end users. Eliminating heavy runtime bloat prevents cold starts, enhances
                uptime resilience, and drastically cuts operating costs.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-surface/40">
            <CardHeader className="space-y-2">
              <ShieldCheck className="h-6 w-6 text-accent" />
              <CardTitle className="text-xl text-text-primary">3. Verifiable Telemetry &amp; Speed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-muted leading-relaxed">
                Building a conversion funnel without rigorous tracking is guesswork. I personally verify browser Meta
                Pixel triggers, server Conversions API (CAPI) deduplication, and Google Analytics 4 tracking in live test
                environments before project sign-off.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-surface/40">
            <CardHeader className="space-y-2">
              <Award className="h-6 w-6 text-accent" />
              <CardTitle className="text-xl text-text-primary">4. Founder-to-Founder Accountability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-muted leading-relaxed">
                Working with Projukti Labs means collaborating directly with a senior technologist who respects your
                operational goals, customer acquisition economics, and technical independence. No sales jargon, just
                reliable execution.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 3. Technical Interests & Specialization */}
      <div className="border-t border-border pt-12 space-y-8">
        <div className="max-w-2xl space-y-2">
          <Badge variant="outline">SPECIALIZATION &amp; INTERESTS</Badge>
          <h2 className="text-3xl font-extrabold text-text-primary">
            Engineering Domains &amp; Technologies
          </h2>
          <p className="text-text-muted text-sm sm:text-base">
            Areas of practical engineering and ongoing experimentation across my projects.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="rounded-lg border border-border bg-surface/30 p-5 space-y-3">
            <h3 className="font-bold text-text-primary text-sm flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Modern Web &amp; Frontend
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Base UI, WCAG 2.1 AA accessibility, and
              responsive mobile engineering.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-surface/30 p-5 space-y-3">
            <h3 className="font-bold text-text-primary text-sm flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Edge &amp; Serverless Runtimes
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Cloudflare Workers (workerd), V8 isolates, edge caching, Durable Objects, KV stores, and Cloudflare R2
              object storage.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-surface/30 p-5 space-y-3">
            <h3 className="font-bold text-text-primary text-sm flex items-center gap-2">
              <Search className="h-3.5 w-3.5 text-accent" />
              High-Speed Search Engines
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Rust-based Tantivy full-text search engine integration, sub-50ms query latencies, indexed document
              retrieval, and fast query execution.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-surface/30 p-5 space-y-3">
            <h3 className="font-bold text-text-primary text-sm flex items-center gap-2">
              <Database className="h-3.5 w-3.5 text-accent" />
              Databases &amp; ORM Tooling
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Cloudflare D1 (SQLite), PostgreSQL 16, Drizzle ORM, Prisma, schema migrations, and encrypted off-site
              backups.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-surface/30 p-5 space-y-3">
            <h3 className="font-bold text-text-primary text-sm flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              E-commerce &amp; Payment Systems
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Frictionless 1-page checkout flows, bKash PGW, Nagad, SSLCommerz, Stripe Elements, and automated courier
              dispatch integrations.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-surface/30 p-5 space-y-3">
            <h3 className="font-bold text-text-primary text-sm flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-accent" />
              Conversion Telemetry &amp; CAPI
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Dual-layer Meta Pixel + Conversions API (CAPI) event deduplication, server-side data preservation, and
              Google Analytics 4 setup.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Consultation Banner */}
      <div className="rounded-2xl border border-border bg-surface/60 p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
          Need Technical Direction for Your Next Project?
        </h2>
        <p className="text-text-muted text-sm sm:text-base max-w-xl mx-auto">
          Schedule a technical consultation or submit a project quotation request to discuss your requirements,
          milestones, and budget.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary" asChild>
            <Link href="/get-a-quote">
              Start a Project
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Send a Message</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
