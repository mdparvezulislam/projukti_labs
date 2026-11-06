import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowRight, Shield, Zap, Compass, Users } from "lucide-react";

export const metadata = {
  title: "About Projukti Labs | Technology Studio & Engineering Philosophy",
  description:
    "Learn about Projukti Labs, our engineering philosophy, architectural discipline, and dedication to building high-performance digital systems for Bangladesh and global clients.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-20">
      {/* Hero Section */}
      <div className="max-w-3xl space-y-6">
        <Badge variant="accent">Studio Philosophy & Story</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-text-primary leading-tight">
          We Build Technology That Lasts. Engineered with Precision.
        </h1>
        <p className="text-lg sm:text-xl text-text-muted leading-relaxed">
          Projukti Labs is an independent technology studio founded by <strong>Md Parvezul Islam</strong>. We reject the generic agency model of bloated templates and unaccountable subcontracting in favor of deep engineering rigor, sub-second speeds, and transparent client partnerships.
        </p>
      </div>

      {/* The Story & Mission */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-border pt-12">
        <div className="lg:col-span-5 space-y-4">
          <Badge variant="outline">Origin Story</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
            Bridging Local Potential with Global Engineering Standards
          </h2>
          <p className="text-text-muted text-sm sm:text-base leading-relaxed">
            In modern digital business, web applications and online storefronts are the direct drivers of revenue. Yet, too many businesses in Bangladesh and emerging markets suffer from fragile, slow-loading websites that crash during marketing campaigns and leak ad spend through unverified tracking pixels.
          </p>
          <p className="text-text-muted text-sm sm:text-base leading-relaxed">
            Projukti Labs was created to deliver a higher standard: enterprise-grade software engineering tailored for commercial agility.
          </p>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card className="border-border bg-surface/40">
            <CardHeader className="space-y-2">
              <Zap className="h-6 w-6 text-accent" />
              <CardTitle className="text-lg text-text-primary">Zero Bloat Architecture</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-text-muted leading-relaxed">
                We build on modern edge runtimes (Next.js, Cloudflare Workers) and type-safe databases. No unnecessary plugins, no security patch nightmares, and no artificial slowdowns.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-surface/40">
            <CardHeader className="space-y-2">
              <Shield className="h-6 w-6 text-accent" />
              <CardTitle className="text-lg text-text-primary">Verified Telemetry</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-text-muted leading-relaxed">
                We believe in verified proof. From Meta Conversions API event deduplication to Core Web Vitals telemetry, our implementations are tested and verified before handover.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-surface/40">
            <CardHeader className="space-y-2">
              <Compass className="h-6 w-6 text-accent" />
              <CardTitle className="text-lg text-text-primary">Dual Market Expertise</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-text-muted leading-relaxed">
                We understand Bangladesh&apos;s unique commerce ecosystem (bKash, Nagad, courier APIs) while seamlessly delivering international-standard payment and compliance systems (Stripe, GDPR, WCAG).
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-surface/40">
            <CardHeader className="space-y-2">
              <Users className="h-6 w-6 text-accent" />
              <CardTitle className="text-lg text-text-primary">Long-Term Retainer Care</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-text-muted leading-relaxed">
                We stand behind our code. Our SLA-backed monthly maintenance retainers provide continuous monitoring, automated backups, and dedicated monthly development capacity.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Core Engineering Principles */}
      <div className="space-y-8 border-t border-border pt-12">
        <div className="space-y-2 max-w-2xl">
          <Badge variant="accent">Our Code of Conduct</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
            Engineering Values We Refuse to Compromise On
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-lg border border-border bg-surface/30 p-6 space-y-3">
            <span className="font-mono text-xs font-bold text-accent">01</span>
            <h3 className="text-lg font-bold text-text-primary">Truthful Engineering</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              We never fabricate metrics, client testimonials, or fake discounts. If a technical approach has tradeoffs, we explain them clearly before you sign a contract.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-surface/30 p-6 space-y-3">
            <span className="font-mono text-xs font-bold text-accent">02</span>
            <h3 className="text-lg font-bold text-text-primary">Direct Accountability</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              You communicate directly with software engineers who write the code and architect the database. No sales executives or confusing intermediate handoffs.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-surface/30 p-6 space-y-3">
            <span className="font-mono text-xs font-bold text-accent">03</span>
            <h3 className="text-lg font-bold text-text-primary">Total Code Ownership</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Upon project completion and milestone clearance, you own 100% of your source code, deployment scripts, database schemas, and documentation. Zero vendor lock-in.
            </p>
          </div>
        </div>
      </div>

      {/* Conversion Banner */}
      <div className="rounded-2xl border border-border bg-surface/60 p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
          Interested in Collaborating with Projukti Labs?
        </h2>
        <p className="text-text-muted text-sm sm:text-base max-w-xl mx-auto">
          Explore our launch service packages or submit a structured project brief for an engineering consultation.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary" asChild>
            <Link href="/get-a-quote">
              Request a Project Quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/founder">Meet the Founder</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
