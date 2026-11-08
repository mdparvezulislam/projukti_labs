import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowRight, Shield, Zap, Compass, Users, Code2, Server } from "lucide-react";
import { getPageSections } from "@/lib/cms";

export const metadata = {
  title: "About Us | Projukti Labs — Engineering Philosophy & Story",
  description:
    "Learn about Projukti Labs — our software engineering philosophy, architectural discipline, and dedication to building modern, reliable digital solutions for businesses in Bangladesh and globally.",
};

export default async function AboutPage() {
  const sections = await getPageSections("about");
  const heroSec = sections.find((s) => s.sectionKey === "hero");
  const heroContent = (heroSec?.content as Record<string, string>) || {};
  const heroBadge = heroContent.badge || "STUDIO MISSION & PHILOSOPHY";
  const heroTitle = heroSec?.title || "Building Digital Solutions. Engineering the Future.";
  const heroSubtitle =
    heroSec?.subtitle ||
    "Projukti Labs is a technology-driven software and digital solutions studio founded by Md Parvezul Islam. We combine thoughtful design, reliable engineering, and practical technology to help businesses establish their digital presence, improve operations, and grow online.";

  const storySec = sections.find((s) => s.sectionKey === "story");
  const storyTitle = storySec?.title || "From Practical Beginnings to a Disciplined Engineering Studio";
  const storyDesc =
    storySec?.subtitle ||
    "Originally established under the brand Projukti Solution Bd, the studio evolved into Projukti Labs to reflect a deeper dedication to modern web architecture, edge computing, and disciplined digital product development.";

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12 sm:space-y-16">
      {/* 1. Hero Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2">
          <Badge variant="accent">{heroBadge}</Badge>
          <Badge variant="outline">projuktilabs.tech</Badge>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-text-primary leading-tight">
          {heroTitle}
        </h1>
        <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
          {heroSubtitle}
        </p>
      </div>

      {/* 2. Company Background & Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start border-t border-border pt-8 sm:pt-10">
        <div className="lg:col-span-5 space-y-4">
          <Badge variant="outline">OUR BACKGROUND</Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary">
            {storyTitle}
          </h2>
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
            {storyDesc}
          </p>
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
            Many businesses in Bangladesh and emerging markets struggle with slow, fragile websites that break under
            advertising traffic or fail to record essential customer conversions. We bridge that gap: delivering
            enterprise-grade performance, clean codebases, and straightforward technical communication at accessible
            rates.
          </p>
          <div className="pt-2">
            <Button variant="ghost" asChild className="p-0 text-brand-orange-strong dark:text-accent hover:text-brand-orange-strong font-semibold">
              <Link href="/founder" className="inline-flex items-center gap-1 text-sm font-semibold">
                Read the Founder Profile &amp; Manifesto
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card className="border-border bg-card shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none hover:shadow-md hover:border-border-hover transition-all duration-200">
            <CardHeader className="space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-orange-soft text-brand-orange-strong dark:bg-accent/10 dark:text-accent">
                <Zap className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg text-text-primary">Zero-Bloat Architecture</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-text-secondary leading-relaxed">
                We build on modern edge runtimes (Next.js, Cloudflare Workers) and type-safe databases. No fragile
                tangles of 60 plugins, no hidden bottlenecks.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none hover:shadow-md hover:border-border-hover transition-all duration-200">
            <CardHeader className="space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-orange-soft text-brand-orange-strong dark:bg-accent/10 dark:text-accent">
                <Shield className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg text-text-primary">Verified Telemetry</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-text-secondary leading-relaxed">
                We believe in verifiable proof. From Meta Conversions API (CAPI) deduplication to Core Web Vitals, every
                integration is audited before handover.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none hover:shadow-md hover:border-border-hover transition-all duration-200">
            <CardHeader className="space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-orange-soft text-brand-orange-strong dark:bg-accent/10 dark:text-accent">
                <Compass className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg text-text-primary">Local &amp; Global Fluency</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-text-secondary leading-relaxed">
                Deep understanding of Bangladesh&apos;s commerce landscape (bKash, Nagad, courier APIs) paired with
                rigorous international standards (Stripe, WCAG 2.1 AA, GDPR).
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none hover:shadow-md hover:border-border-hover transition-all duration-200">
            <CardHeader className="space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-orange-soft text-brand-orange-strong dark:bg-accent/10 dark:text-accent">
                <Users className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg text-text-primary">Long-Term Retainer Care</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-text-secondary leading-relaxed">
                We stand behind the software we build. Our SLA-backed monthly retainers provide proactive uptime
                monitoring, encrypted backups, and developer support.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 3. Core Engineering Values */}
      <div className="space-y-8 border-t border-border pt-12">
        <div className="space-y-2 max-w-2xl">
          <Badge variant="accent">OUR PRINCIPLES</Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary">
            Engineering Values We Never Compromise
          </h2>
          <p className="text-text-secondary text-sm sm:text-base">
            These guiding standards govern every client engagement, architecture plan, and code review at Projukti Labs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-border bg-card p-6 space-y-3 shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none hover:shadow-md hover:border-border-hover transition-all duration-200">
            <span className="font-mono text-xs font-bold text-brand-orange-strong dark:text-accent">01</span>
            <h3 className="text-lg font-bold text-text-primary">Honest Engineering</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              We never fabricate performance numbers or invent client claims. Every technical decision, trade-off, and
              limitation is explained transparently before you sign.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 space-y-3 shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none hover:shadow-md hover:border-border-hover transition-all duration-200">
            <span className="font-mono text-xs font-bold text-brand-orange-strong dark:text-accent">02</span>
            <h3 className="text-lg font-bold text-text-primary">Direct Accountability</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              You communicate directly with the software engineer designing your system and writing the code. No
              commissioned sales reps or outsourced freelancers.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 space-y-3 shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none hover:shadow-md hover:border-border-hover transition-all duration-200">
            <span className="font-mono text-xs font-bold text-brand-orange-strong dark:text-accent">03</span>
            <h3 className="text-lg font-bold text-text-primary">Full Source Code Ownership</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Upon milestone completion and settlement, 100% of the repository, database schemas, and documentation
              belong to you. Zero artificial vendor lock-in.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Verified Technical Capabilities */}
      <div className="space-y-8 border-t border-border pt-12">
        <div className="space-y-2 max-w-2xl">
          <Badge variant="accent">TECHNOLOGIES &amp; STACK</Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary">
            Technologies We Work With
          </h2>
          <p className="text-text-secondary text-sm sm:text-base">
            We select modern, mature technologies that offer maximum speed, type-safety, and operational simplicity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-border bg-card p-5 space-y-2 shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none">
            <div className="flex items-center gap-2 text-text-primary font-bold text-sm">
              <Code2 className="h-4 w-4 text-brand-orange-strong dark:text-accent" />
              <span>Frontend &amp; Frameworks</span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Base UI, Shadcn UI.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 space-y-2 shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none">
            <div className="flex items-center gap-2 text-text-primary font-bold text-sm">
              <Server className="h-4 w-4 text-brand-orange-strong dark:text-accent" />
              <span>Backend &amp; Runtimes</span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              Cloudflare Workers, Node.js, Fastify, Python FastAPI, REST &amp; WebSockets.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 space-y-2 shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none">
            <div className="flex items-center gap-2 text-text-primary font-bold text-sm">
              <Zap className="h-4 w-4 text-brand-orange-strong dark:text-accent" />
              <span>Databases &amp; Storage</span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              Cloudflare D1 (SQLite), PostgreSQL 16, Cloudflare R2, Drizzle ORM, Prisma.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 space-y-2 shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none">
            <div className="flex items-center gap-2 text-text-primary font-bold text-sm">
              <Shield className="h-4 w-4 text-brand-orange-strong dark:text-accent" />
              <span>Commerce &amp; Telemetry</span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              bKash PGW, Nagad, SSLCommerz, Stripe, Meta CAPI deduplication, GA4.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Founder Introduction */}
      <div className="rounded-3xl border border-border bg-card/90 dark:bg-surface/60 p-8 sm:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:shadow-none backdrop-blur-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <Badge variant="accent">LEADERSHIP</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary">
              Led by Md Parvezul Islam
            </h2>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
              Projukti Labs is led by <strong>Md Parvezul Islam</strong>, Founder &amp; Principal Software Architect.
              With hands-on experience designing e-commerce platforms, custom web architectures, automation engines, and
              developer utilities, he ensures that every project meets high engineering standards.
            </p>
            <div className="pt-2">
              <Button variant="outline" asChild className="bg-card">
                <Link href="/founder">
                  View Full Founder Profile
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <div className="w-full max-w-xs rounded-2xl border border-border bg-card p-6 text-center space-y-3 shadow-md">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-brand-orange/40 dark:border-accent/40 bg-brand-orange-soft dark:bg-accent/10 font-mono text-2xl font-extrabold text-brand-orange-strong dark:text-accent">
                PI
              </div>
              <h3 className="text-lg font-bold text-text-primary">Md Parvezul Islam</h3>
              <p className="text-xs text-brand-orange-strong dark:text-accent uppercase font-semibold">Founder &amp; Principal Software Architect</p>
              <p className="text-[11px] text-text-muted">Projukti Labs</p>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Conversion Banner */}
      <div className="rounded-3xl border border-brand-orange/30 dark:border-accent/40 bg-card/95 dark:bg-surface/80 p-8 sm:p-12 text-center space-y-6 shadow-md backdrop-blur-xs">
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
          Ready to Work with Projukti Labs?
        </h2>
        <p className="text-text-secondary text-sm sm:text-base max-w-xl mx-auto">
          Explore our productized services or request a customized project consultation. We reply within 24 business
          hours.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary" asChild className="shadow-xs">
            <Link href="/get-a-quote">
              Start a Project
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild className="bg-card">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
