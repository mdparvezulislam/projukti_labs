import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { AccordionItem } from "@/components/ui/accordion";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  Zap,
  ShieldCheck,
  Check,
  Activity,
  Server,
  Smartphone,
} from "lucide-react";
import { getServiceBySlug } from "@/modules/services/data";

export const metadata = {
  title: "Landing Page with Meta Pixel & Conversions API | Projukti Labs",
  description:
    "High-speed, conversion-focused landing pages with dual-layer Meta Pixel and server-side Conversions API (CAPI) deduplication.",
};

export default function LandingPageMetaPixelPage() {
  const service = getServiceBySlug("landing-page-meta-pixel");
  const packages = service?.packages || [];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12 sm:space-y-16">
      {/* 1. Hero Section */}
      <div className="max-w-4xl space-y-4 sm:space-y-5">
        <div className="inline-flex items-center gap-2">
          <Badge variant="accent">FLAGSHIP SOLUTION</Badge>
          <Badge variant="outline">Web Development &amp; Design</Badge>
          <span className="font-mono text-xs text-accent">Sub-1.2s Mobile LCP Target</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.1]">
          High-Converting Landing Pages with{" "}
          <span className="text-accent underline decoration-accent/40 decoration-wavy">
            Meta Pixel &amp; CAPI
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-text-muted leading-relaxed max-w-3xl">
          Engineered for high conversion rates, hosted on global edge cloud infrastructure, and configured with
          dual-layer Meta Pixel and server-side Conversions API (CAPI) event deduplication—ensuring zero data loss from iOS
          restrictions or ad blockers.
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <Button size="lg" variant="primary" asChild>
            <Link href="/get-a-quote?service=landing-page-meta-pixel&package=conversion-pro">
              Start with Conversion Pro
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#pricing-tiers">Compare Package Tiers</Link>
          </Button>
        </div>
      </div>

      {/* 2. Visual Funnel & Telemetry Architecture Diagram */}
      <div className="rounded-2xl border border-border bg-surface/40 p-6 sm:p-10 space-y-8">
        <div className="space-y-2 max-w-2xl">
          <Badge variant="accent">TELEMETRY ARCHITECTURE</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
            How Dual-Layer Meta Pixel + CAPI Tracking Works
          </h2>
          <p className="text-xs sm:text-sm text-text-muted">
            Eliminating the 20% to 40% data drop-off typical of browser-only pixels.
          </p>
        </div>

        {/* Funnel Steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="rounded-xl border border-border/80 bg-background/80 p-5 space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">Step 01</span>
              <Smartphone className="h-4 w-4 text-text-muted" />
            </div>
            <h3 className="font-bold text-text-primary text-sm">Ad Click &amp; Inbound Traffic</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Visitor clicks a Facebook or Instagram ad. Meta automatically attaches a unique{" "}
              <code className="text-accent">fbclid</code> query parameter.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-background/80 p-5 space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">Step 02</span>
              <Zap className="h-4 w-4 text-accent" />
            </div>
            <h3 className="font-bold text-text-primary text-sm">Sub-1.2s Edge Render</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Pre-rendered Next.js page delivers instantly from the nearest Cloudflare Edge location before the visitor
              bounces.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-background/80 p-5 space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">Step 03</span>
              <Activity className="h-4 w-4 text-text-muted" />
            </div>
            <h3 className="font-bold text-text-primary text-sm">Dual Event Trigger</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              When a visitor performs an action (form submit or contact click), the client generates a cryptographic{" "}
              <code className="text-accent">event_id</code> for deduplication.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-background/80 p-5 space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">Step 04</span>
              <Server className="h-4 w-4 text-accent" />
            </div>
            <h3 className="font-bold text-text-primary text-sm">Edge CAPI Dispatch</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Parallel to browser firing, the edge server dispatches a direct HTTP POST to the Meta Graph API with
              hashed user parameters.
            </p>
          </div>

          <div className="rounded-xl border border-accent/60 bg-accent/5 p-5 space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">Step 05</span>
              <ShieldCheck className="h-4 w-4 text-accent" />
            </div>
            <h3 className="font-bold text-text-primary text-sm">Verified Deduplication</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Meta Events Manager deduplicates matching pairs, achieving high Event Match Quality (EMQ) scores and
              optimizing your ad spend.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Event Taxonomy & Core Web Vitals Benchmark */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Event Taxonomy */}
        <div className="lg:col-span-7 rounded-xl border border-border bg-surface/30 p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <Badge variant="outline">TELEMETRY SCHEMA</Badge>
            <h3 className="text-xl font-bold text-text-primary">Standardized Event Taxonomy</h3>
            <p className="text-xs text-text-muted">
              Pre-configured and tested tracking events delivered with your landing page.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border text-text-muted uppercase font-mono text-[11px]">
                <tr>
                  <th className="py-2.5 pr-4">Event Name</th>
                  <th className="py-2.5 px-4">Trigger Action</th>
                  <th className="py-2.5 px-4">Payload</th>
                  <th className="py-2.5 pl-4">Channel</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 font-mono text-text-muted">
                <tr>
                  <td className="py-3 pr-4 font-bold text-accent">PageView</td>
                  <td className="py-3 px-4 font-sans text-text-primary">Initial page render</td>
                  <td className="py-3 px-4">page_url, referrer</td>
                  <td className="py-3 pl-4 text-xs font-sans">Browser + CAPI</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-accent">ViewContent</td>
                  <td className="py-3 px-4 font-sans text-text-primary">Offer / section viewed</td>
                  <td className="py-3 px-4">content_name, value, currency</td>
                  <td className="py-3 pl-4 text-xs font-sans">Browser + CAPI</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-accent">Contact</td>
                  <td className="py-3 px-4 font-sans text-text-primary">WhatsApp or call click</td>
                  <td className="py-3 px-4">contact_channel, event_id</td>
                  <td className="py-3 pl-4 text-xs font-sans">Browser + CAPI</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-accent">Lead</td>
                  <td className="py-3 px-4 font-sans text-text-primary">Form submission</td>
                  <td className="py-3 px-4">em_hash, ph_hash, lead_value</td>
                  <td className="py-3 pl-4 text-xs font-sans">Browser + CAPI</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-accent">Schedule</td>
                  <td className="py-3 px-4 font-sans text-text-primary">Consultation booking</td>
                  <td className="py-3 px-4">slot_id, event_id</td>
                  <td className="py-3 pl-4 text-xs font-sans">Browser + CAPI</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Performance Standards */}
        <div className="lg:col-span-5 rounded-xl border border-border bg-surface/30 p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <Badge variant="outline">SPEED STANDARDS</Badge>
            <h3 className="text-xl font-bold text-text-primary">Core Web Vitals Benchmarks</h3>
            <p className="text-xs text-text-muted">
              Slow landing pages bleed ad budget. We optimize for real-world mobile 4G networks.
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg border border-border/80 bg-background/60 p-4 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold uppercase text-text-primary">Largest Contentful Paint (LCP)</span>
                <span className="font-mono text-sm font-bold text-accent">&lt; 1.2s</span>
              </div>
              <p className="text-[11px] text-text-muted">
                Hero section and primary offer load completely in under 1.2 seconds on mobile connections.
              </p>
            </div>

            <div className="rounded-lg border border-border/80 bg-background/60 p-4 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold uppercase text-text-primary">Cumulative Layout Shift (CLS)</span>
                <span className="font-mono text-sm font-bold text-accent">&lt; 0.02</span>
              </div>
              <p className="text-[11px] text-text-muted">
                Zero disruptive layout shifts during rendering; typography and buttons remain stable.
              </p>
            </div>

            <div className="rounded-lg border border-border/80 bg-background/60 p-4 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold uppercase text-text-primary">Interaction to Next Paint (INP)</span>
                <span className="font-mono text-sm font-bold text-accent">&lt; 100ms</span>
              </div>
              <p className="text-[11px] text-text-muted">
                Instant visual feedback when visitors tap inputs, submit buttons, or expand accordions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Deliverables vs Exclusions Breakdown */}
      <div className="space-y-8 border-t border-border pt-12">
        <div className="max-w-2xl space-y-2">
          <Badge variant="accent">SCOPE CLARITY</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
            What is Included vs. Out of Scope
          </h2>
          <p className="text-sm text-text-muted">
            We operate with complete transparency so you know exactly what is delivered and what remains separate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Deliverables */}
          <div className="rounded-xl border border-accent/30 bg-surface/40 p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-accent flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-accent" />
              What We Deliver
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-text-muted">
              {service?.deliverables.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Exclusions */}
          <div className="rounded-xl border border-border bg-surface/20 p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-text-muted flex items-center gap-2">
              <XCircle className="h-5 w-5 text-text-muted" />
              Out of Scope
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-text-muted">
              {service?.exclusions.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-border font-bold shrink-0 mt-0.5">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 5. Pricing Tiers */}
      <div id="pricing-tiers" className="space-y-12 border-t border-border pt-16">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <Badge variant="accent">PRICING TIERS</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary">
            Fixed-Scope Package Options
          </h2>
          <p className="text-text-muted text-sm sm:text-base">
            Choose the package that aligns with your advertising campaigns and conversion objectives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              className={`flex flex-col justify-between border-border bg-surface/50 ${
                pkg.popular ? "ring-2 ring-accent border-accent/40" : ""
              }`}
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg text-text-primary">{pkg.name}</span>
                  {pkg.popular && <Badge variant="accent">Most Popular</Badge>}
                </div>
                <div className="space-y-1">
                  <div className="font-mono text-3xl font-extrabold text-accent">
                    ৳ {pkg.priceBdt?.toLocaleString()}
                  </div>
                  <div className="text-xs text-text-muted font-mono">
                    or ${pkg.priceUsd} USD · One-time investment
                  </div>
                </div>
                <CardDescription className="text-xs text-text-muted leading-relaxed">
                  {pkg.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-2 border-t border-border/60 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-text-primary">
                    Included Deliverables:
                  </p>
                  <ul className="space-y-2 text-xs text-text-muted">
                    {pkg.deliverables.map((del, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <Button
                    variant={pkg.popular ? "primary" : "outline"}
                    asChild
                    className="w-full"
                  >
                    <Link
                      href={`/get-a-quote?service=landing-page-meta-pixel&package=${encodeURIComponent(
                        pkg.slug
                      )}`}
                    >
                      Select {pkg.name}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 6. Service FAQ */}
      <div className="space-y-8 border-t border-border pt-16">
        <div className="max-w-2xl space-y-2">
          <Badge variant="outline">FREQUENTLY ASKED QUESTIONS</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
            Landing Pages &amp; Meta Pixel FAQ
          </h2>
        </div>

        <div className="space-y-3 max-w-4xl">
          <AccordionItem
            title="How do you verify that Meta Pixel and CAPI are functioning correctly?"
            defaultOpen={true}
          >
            <p className="text-sm text-text-muted leading-relaxed">
              Before project sign-off, we run full end-to-end test transactions using Meta&apos;s official Events Manager
              Test Events tool. Both browser and edge server payloads are inspected to ensure duplicate events share
              the same cryptographic <code className="text-accent">event_id</code> and achieve high Event Match Quality
              (EMQ) ratings.
            </p>
          </AccordionItem>

          <AccordionItem title="Can lead form data be synced to my Google Sheet, CRM, or WhatsApp?">
            <p className="text-sm text-text-muted leading-relaxed">
              Yes. In addition to persisting entries in the application database, we can configure automated webhooks
              to forward leads instantly to Google Sheets, Telegram, Slack, or your CRM.
            </p>
          </AccordionItem>

          <AccordionItem title="What happens if Meta updates its Graph API or Pixel scripts post-launch?">
            <p className="text-sm text-text-muted leading-relaxed">
              All packages include a 14-day post-launch warranty period during which any tracking anomalies or API
              adjustments are resolved at no extra charge. For ongoing peace of mind, our monthly Website Maintenance
              retainer covers proactive monitoring and continuous updates.
            </p>
          </AccordionItem>
        </div>
      </div>

      {/* 7. Bottom Conversion Banner */}
      <div className="rounded-2xl border border-accent/40 bg-surface/80 p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
          Ready to Maximize Your Advertising Conversions?
        </h2>
        <p className="text-text-muted text-sm sm:text-base max-w-xl mx-auto">
          Request a formal quotation for your landing page or schedule a consultation with our lead software architect.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary" asChild>
            <Link href="/get-a-quote?service=landing-page-meta-pixel">
              Request Landing Page Quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Ask a Technical Question</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
