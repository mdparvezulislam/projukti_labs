import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle2,
  Globe,
  ShoppingCart,
  ShieldCheck,
  Zap,
  Code2,
  ChevronRight,
} from "lucide-react";
export const metadata = {
  title: "Projukti Labs | Building Digital Solutions. Engineering the Future.",
  description:
    "Premium technology studio engineering ultra-fast web platforms, high-conversion landing pages with Meta Pixel tracking, and scalable e-commerce systems.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col gap-24 sm:gap-32 pb-20">
      {/* 1. Hero Section */}
      <section className="relative pt-12 sm:pt-20 lg:pt-24 overflow-hidden">
        {/* Subtle grid backdrop */}
        <div
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#27272a15_1px,transparent_1px),linear-gradient(to_bottom,#27272a15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
          aria-hidden="true"
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs sm:text-sm text-text-muted">
            <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="font-medium text-text-primary">Official Studio Launch</span>
            <span className="text-border">|</span>
            <span>Focusing on 3 Core Service Verticals</span>
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-text-primary leading-[1.1]">
            Building Digital Solutions.{" "}
            <span className="text-accent underline decoration-accent/30 decoration-wavy decoration-from-font">
              Engineering the Future.
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-text-muted leading-relaxed">
            We architect ultra-fast web platforms, conversion-engineered landing pages with verified Meta Pixel tracking, and resilient e-commerce engines for Bangladesh and global visionaries.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button size="lg" variant="primary" asChild className="w-full sm:w-auto">
              <Link href="/get-a-quote">
                Request a Project Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/services">Explore Launch Services</Link>
            </Button>
          </div>

          {/* Engineering Metrics Ticker */}
          <div className="pt-12 sm:pt-16">
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 rounded-xl border border-border/80 bg-surface/50 p-6 sm:grid-cols-4 backdrop-blur-xs">
              <div className="space-y-1 text-center">
                <p className="font-mono text-2xl sm:text-3xl font-extrabold text-accent">&lt; 1.2s</p>
                <p className="text-xs uppercase tracking-wider text-text-muted">Mobile LCP Speed</p>
              </div>
              <div className="space-y-1 text-center">
                <p className="font-mono text-2xl sm:text-3xl font-extrabold text-text-primary">100%</p>
                <p className="text-xs uppercase tracking-wider text-text-muted">Typed API Contracts</p>
              </div>
              <div className="space-y-1 text-center">
                <p className="font-mono text-2xl sm:text-3xl font-extrabold text-accent">300+ PoPs</p>
                <p className="text-xs uppercase tracking-wider text-text-muted">Cloudflare Edge Delivery</p>
              </div>
              <div className="space-y-1 text-center">
                <p className="font-mono text-2xl sm:text-3xl font-extrabold text-text-primary">WCAG 2.1</p>
                <p className="text-xs uppercase tracking-wider text-text-muted">Accessible & Inclusive</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Launch Services Bento Preview */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
          <div className="space-y-3">
            <Badge variant="accent">Launch Service Catalog</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
              Three Focused Verticals. Absolute Execution.
            </h2>
            <p className="text-text-muted max-w-2xl text-base sm:text-lg">
              Rather than scattering effort across premature generic offerings, we launch with three deeply mastered engineering disciplines.
            </p>
          </div>
          <Button variant="ghost" asChild className="self-start md:self-auto">
            <Link href="/services" className="inline-flex items-center gap-1 text-accent">
              View All Services & Pricing
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Card 1: Web Development & Design */}
          <Card className="flex flex-col justify-between border-border bg-surface/40 hover:border-accent/40 transition-colors">
            <CardHeader className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Globe className="h-6 w-6 text-accent" />
              </div>
              <div>
                <Badge variant="outline" className="mb-2">Active Service 01</Badge>
                <CardTitle className="text-2xl text-text-primary">Web Development & Design</CardTitle>
                <CardDescription className="text-text-muted mt-2">
                  High-speed modern websites and conversion engines built on Next.js and Cloudflare edge.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border border-border/60 bg-background/60 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">Flagship Solution</span>
                  <Badge variant="accent" className="text-[10px]">High Demand</Badge>
                </div>
                <h3 className="font-semibold text-text-primary text-sm">Landing Page with Meta Pixel & Analytics</h3>
                <p className="text-xs text-text-muted">
                  Dual client & server-side CAPI event deduplication with sub-1.2s mobile load speeds.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-text-muted">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                  <span>Sub-second Core Web Vitals optimization</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                  <span>Verified Meta Events Manager test reporting</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                  <span>Custom corporate and marketing platforms</span>
                </li>
              </ul>

              <div className="pt-2">
                <Button variant="outline" asChild className="w-full">
                  <Link href="/services/landing-page-meta-pixel">
                    Explore Landing Page Solution
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: E-commerce & Digital Commerce */}
          <Card className="flex flex-col justify-between border-border bg-surface/40 hover:border-accent/40 transition-colors">
            <CardHeader className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <ShoppingCart className="h-6 w-6 text-accent" />
              </div>
              <div>
                <Badge variant="outline" className="mb-2">Active Service 02</Badge>
                <CardTitle className="text-2xl text-text-primary">E-commerce & Digital Commerce</CardTitle>
                <CardDescription className="text-text-muted mt-2">
                  Production-grade storefronts, checkout engines, and secure local & global payment integrations.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border border-border/60 bg-background/60 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">Flagship Solution</span>
                  <Badge variant="accent" className="text-[10px]">Commercial Scale</Badge>
                </div>
                <h3 className="font-semibold text-text-primary text-sm">Complete E-commerce Platform</h3>
                <p className="text-xs text-text-muted">
                  Seamless bKash, Nagad, SSLCommerz, and Stripe checkout with admin order workflows.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-text-muted">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                  <span>Zero monthly platform revenue commission</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                  <span>Automated courier parcel booking & SMS alerts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                  <span>Cart-to-checkout drop-off minimization</span>
                </li>
              </ul>

              <div className="pt-2">
                <Button variant="outline" asChild className="w-full">
                  <Link href="/services/complete-ecommerce-website">
                    Explore E-commerce Platform
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Maintenance & Technical Support */}
          <Card className="flex flex-col justify-between border-border bg-surface/40 hover:border-accent/40 transition-colors">
            <CardHeader className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <ShieldCheck className="h-6 w-6 text-accent" />
              </div>
              <div>
                <Badge variant="outline" className="mb-2">Active Service 03</Badge>
                <CardTitle className="text-2xl text-text-primary">Maintenance & Support</CardTitle>
                <CardDescription className="text-text-muted mt-2">
                  SLA-backed monthly engineering retainers, security patches, and automated backup drills.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border border-border/60 bg-background/60 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">Flagship Solution</span>
                  <Badge variant="accent" className="text-[10px]">SLA Guaranteed</Badge>
                </div>
                <h3 className="font-semibold text-text-primary text-sm">Proactive Care Retainers</h3>
                <p className="text-xs text-text-muted">
                  4 care tiers from Basic Care to Custom Enterprise with 1h–48h emergency response.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-text-muted">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                  <span>5-minute automated uptime & SSL health checks</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                  <span>Weekly off-site backup verification drills</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                  <span>Dedicated developer hours included monthly</span>
                </li>
              </ul>

              <div className="pt-2">
                <Button variant="outline" asChild className="w-full">
                  <Link href="/services/website-maintenance">
                    Explore Retainer Plans
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 3. Why Projukti Labs (Engineering Philosophy) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="accent">The Projukti Standard</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
            Engineering Precision Over Generic Agency Slop
          </h2>
          <p className="text-text-muted text-base sm:text-lg">
            Most digital agencies sell heavy, pre-packaged WordPress themes loaded with 60 plugins that crash under traffic. We build lean, high-availability software systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-xl border border-border bg-surface/30 p-8 space-y-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/10 text-accent">
              <Zap className="h-5 w-5 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-text-primary">Edge Performance First</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              Every millisecond of latency costs revenue. We distribute computing to Cloudflare&apos;s global edge network, serving static assets and dynamic SSR close to your visitors.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface/30 p-8 space-y-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/10 text-accent">
              <Code2 className="h-5 w-5 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-text-primary">Type-Safe & Maintainable</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              We eliminate runtime errors with strict TypeScript, Zod schema validation, and SQL ORM contracts. You receive clean, auditable code that your team can scale for years.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface/30 p-8 space-y-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/10 text-accent">
              <ShieldCheck className="h-5 w-5 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-text-primary">Proactive Care & Integrity</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              We never abandon a client after launch. Our maintenance plans provide continuous backup verification, dependency audits, and direct escalation to the Principal Architect.
            </p>
          </div>
        </div>
      </section>

      {/* 4. The 6-Step Engineering Process */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-4 max-w-2xl">
          <Badge variant="accent">Development Lifecycle</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
            How We Deliver Production Systems
          </h2>
          <p className="text-text-muted text-base">
            A disciplined, milestone-driven methodology ensuring transparency, predictability, and zero launch-day surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              title: "Discovery & Architecture",
              desc: "Deep analysis of your target audience, conversion objectives, payment requirements, and technical constraints.",
            },
            {
              step: "02",
              title: "Design System & UX",
              desc: "Tailored UI design tokens, wireframes, and typography hierarchies aligned with WCAG 2.1 AA accessibility.",
            },
            {
              step: "03",
              title: "Edge Implementation",
              desc: "Clean component development on Next.js App Router, Cloudflare Workers, and strict TypeScript contracts.",
            },
            {
              step: "04",
              title: "Telemetry & QA Verification",
              desc: "Rigorous testing with Playwright MCP, Meta Events Manager test tool verification, and Core Web Vitals profiling.",
            },
            {
              step: "05",
              title: "Zero-Downtime Launch",
              desc: "DNS migration, SSL certificate hardening, CDN cache warming, and production smoke tests.",
            },
            {
              step: "06",
              title: "SLA Care & Optimization",
              desc: "Continuous uptime telemetry, automated off-site backups, and monthly performance tuning.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="relative rounded-lg border border-border/70 bg-surface/40 p-6 space-y-3"
            >
              <div className="font-mono text-xs font-bold text-accent">{item.step}</div>
              <h3 className="text-lg font-bold text-text-primary">{item.title}</h3>
              <p className="text-xs text-text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Founder Spotlight */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-gradient-to-b from-surface/60 to-surface/20 p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-6">
              <Badge variant="accent">Leadership & Direct Craft</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
                Direct Engineering Leadership. No Account Manager Middlemen.
              </h2>
              <p className="text-text-muted text-base sm:text-lg leading-relaxed">
                Projukti Labs is led by <strong>Md Parvezul Islam</strong>, Principal Software Architect. When you partner with us, your technical specifications, architecture blueprints, and code reviews are handled directly by senior leadership.
              </p>
              <p className="text-text-muted text-sm sm:text-base leading-relaxed">
                Whether deploying a conversion-critical landing page for a high-budget ad campaign or scaling a multi-gateway e-commerce platform, we deliver engineering rigor with honest communication.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <Button variant="outline" asChild>
                  <Link href="/founder">
                    Read Founder Manifesto & Profile
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/about">Learn More About the Studio</Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-sm rounded-xl border border-border bg-surface p-6 text-center space-y-4 shadow-xl">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 border-accent/40 bg-accent/10 font-mono text-3xl font-extrabold text-accent">
                  PI
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary">Md Parvezul Islam</h3>
                  <p className="text-xs text-accent uppercase tracking-wider font-semibold mt-1">
                    Founder & Principal Architect
                  </p>
                  <p className="text-xs text-text-muted mt-2">
                    Systems Architecture · Edge Computing · Next.js · Distributed Cloud
                  </p>
                </div>
                <div className="pt-2 border-t border-border flex justify-center gap-2">
                  <Badge variant="outline" className="text-[10px]">Verified Technical Lead</Badge>
                  <Badge variant="outline" className="text-[10px]">projuktilabs.tech</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. High-Impact Conversion Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-accent/40 bg-surface/90 p-8 sm:p-12 text-center space-y-6">
          <div className="mx-auto max-w-2xl space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary">
              Ready to Build Something Extraordinary?
            </h2>
            <p className="text-text-muted text-base sm:text-lg">
              Tell us about your project specifications. We will review your goals and provide a structured scope of work and quotation within 24 business hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button size="lg" variant="primary" asChild className="w-full sm:w-auto">
              <Link href="/get-a-quote">
                Request an Official Quotation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/contact">Schedule a Technical Call</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
