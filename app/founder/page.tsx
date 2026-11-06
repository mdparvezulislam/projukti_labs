import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowRight, Cpu, ShieldCheck, Terminal, Award } from "lucide-react";

export const metadata = {
  title: "Founder Profile — Md Parvezul Islam | Projukti Labs",
  description:
    "Profile, technical manifesto, and architectural leadership of Md Parvezul Islam, Founder and Principal Software Architect at Projukti Labs.",
};

export default function FounderPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-20">
      {/* Hero Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-8 space-y-6">
          <div className="inline-flex items-center gap-2">
            <Badge variant="accent">Founder & Principal Software Architect</Badge>
            <Badge variant="outline">projuktilabs.tech</Badge>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary leading-tight">
            Md Parvezul Islam
          </h1>

          <p className="text-lg sm:text-xl text-text-muted leading-relaxed">
            Software architect, systems engineer, and technologist dedicated to building ultra-reliable, high-throughput digital platforms, edge computing applications, and conversion systems.
          </p>

          <p className="text-sm sm:text-base text-text-muted leading-relaxed">
            &ldquo;I founded Projukti Labs on a simple premise: software should be fast, truthful, resilient, and built to solve real commercial problems without layers of unnecessary agency overhead.&rdquo;
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Button variant="primary" asChild>
              <Link href="/get-a-quote">
                Consult on a Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Direct Message</Link>
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
                Principal Software Architect
              </p>
              <p className="text-xs text-text-muted">
                Dhaka, Bangladesh · Serving Global Clients
              </p>
            </div>

            <div className="pt-4 border-t border-border/80 space-y-2 text-left text-xs text-text-muted font-mono">
              <div className="flex justify-between">
                <span>Focus:</span>
                <span className="text-text-primary">Edge Systems & Web</span>
              </div>
              <div className="flex justify-between">
                <span>Role:</span>
                <span className="text-text-primary">Hands-on Architecture</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-accent font-semibold">Active Client Work</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Architectural Manifesto */}
      <div className="border-t border-border pt-12 space-y-8">
        <div className="max-w-2xl space-y-2">
          <Badge variant="accent">Architectural Manifesto</Badge>
          <h2 className="text-3xl font-extrabold text-text-primary">
            How I Approach Engineering Systems
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-border bg-surface/40">
            <CardHeader className="space-y-2">
              <Terminal className="h-6 w-6 text-accent" />
              <CardTitle className="text-xl text-text-primary">1. Single Responsibility & Clean Boundaries</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-muted leading-relaxed">
                Whether structuring a multi-tiered e-commerce checkout engine or a single conversion landing page, I enforce modular monolith discipline. Components have explicit boundaries, type contracts are guaranteed at compile time, and dependencies are kept lean.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-surface/40">
            <CardHeader className="space-y-2">
              <Cpu className="h-6 w-6 text-accent" />
              <CardTitle className="text-xl text-text-primary">2. Edge Computing Over Heavy Servers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-muted leading-relaxed">
                By leveraging modern edge runtimes (Cloudflare Workers, V8 isolates), we run server logic within milliseconds of the end user anywhere in the world. Cold starts drop to zero, server management vanishes, and site reliability scales effortlessly.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-surface/40">
            <CardHeader className="space-y-2">
              <ShieldCheck className="h-6 w-6 text-accent" />
              <CardTitle className="text-xl text-text-primary">3. Verified Telemetry & Measurable Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-muted leading-relaxed">
                A landing page without verified tracking is like driving blindfolded. I personally verify that Meta Pixel events, CAPI server payloads, and GA4 enhanced metrics are firing cleanly with zero duplicate events before handing over a project.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-surface/40">
            <CardHeader className="space-y-2">
              <Award className="h-6 w-6 text-accent" />
              <CardTitle className="text-xl text-text-primary">4. Founder-to-Founder Craftsmanship</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-muted leading-relaxed">
                When you collaborate with Projukti Labs, you work with an engineering peer who cares about your business objectives, your ROI, and the long-term maintainability of your software investments.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Core Technical Disciplines */}
      <div className="border-t border-border pt-12 space-y-8">
        <div className="max-w-2xl space-y-2">
          <Badge variant="outline">Core Competencies</Badge>
          <h2 className="text-3xl font-extrabold text-text-primary">
            Technical Stack & Engineering Specializations
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-lg border border-border bg-surface/30 p-5 space-y-3">
            <h3 className="font-bold text-text-primary text-sm flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Frontend & Design
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, WCAG 2.1 AA Accessibility, Responsive Mobile Optimization.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-surface/30 p-5 space-y-3">
            <h3 className="font-bold text-text-primary text-sm flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Edge & Serverless
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Cloudflare Workers (workerd), V8 Isolate security, Edge caching, KV, Durable Objects, Cloudflare R2 Object Storage.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-surface/30 p-5 space-y-3">
            <h3 className="font-bold text-text-primary text-sm flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Data & Storage
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Cloudflare D1 (SQLite), Drizzle ORM, PostgreSQL, Redis/KV caching, SQL schema migrations, Type-safe queries.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-surface/30 p-5 space-y-3">
            <h3 className="font-bold text-text-primary text-sm flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Payments & Tracking
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              bKash PGW, Nagad, SSLCommerz, Stripe Elements, Meta Pixel + CAPI deduplication, GA4 Enhanced Measurement.
            </p>
          </div>
        </div>
      </div>

      {/* Consultation Banner */}
      <div className="rounded-2xl border border-border bg-surface/60 p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
          Need Architectural Guidance for Your Next Project?
        </h2>
        <p className="text-text-muted text-sm sm:text-base max-w-xl mx-auto">
          Schedule a direct technical consultation or request a project quotation to discuss your architecture, timeline, and delivery requirements.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary" asChild>
            <Link href="/get-a-quote">
              Request Project Quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Send a Direct Message</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
