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
  title: "Landing Page with Meta Pixel & Analytics | Projukti Labs",
  description:
    "High-speed, conversion-engineered landing pages with dual-layer Meta Pixel and Conversions API (CAPI) event deduplication.",
};

export default function LandingPageMetaPixelPage() {
  const service = getServiceBySlug("landing-page-meta-pixel");
  const packages = service?.packages || [];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-24">
      {/* 1. Hero Section */}
      <div className="max-w-4xl space-y-6">
        <div className="inline-flex items-center gap-2">
          <Badge variant="accent">Flagship Vertical</Badge>
          <Badge variant="outline">Web Development & Design</Badge>
          <span className="font-mono text-xs text-accent">Sub-1.2s Mobile LCP</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.1]">
          High-Conversion Landing Page with{" "}
          <span className="text-accent underline decoration-accent/40 decoration-wavy">
            Meta Pixel & Analytics
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-text-muted leading-relaxed max-w-3xl">
          Engineered for conversion, built on edge cloud architecture, and instrumented with server-side Meta Conversions API (CAPI) deduplication so you never lose attributed ad revenue to iOS privacy or ad-blockers.
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <Button size="lg" variant="primary" asChild>
            <Link href="/get-a-quote?service=landing-page-meta-pixel&package=Conversion+Pro">
              Get Started with Conversion Pro
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
          <Badge variant="accent">Telemetry Architecture</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
            How Dual-Layer Meta Pixel + CAPI Tracking Works
          </h2>
          <p className="text-xs sm:text-sm text-text-muted">
            Eliminates the 20%–40% tracking loss experienced by standard browser-only pixels.
          </p>
        </div>

        {/* Funnel Steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="rounded-xl border border-border/80 bg-background/80 p-5 space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">STEP 01</span>
              <Smartphone className="h-4 w-4 text-text-muted" />
            </div>
            <h3 className="font-bold text-text-primary text-sm">Ad Click & Traffic</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Visitor clicks Facebook/Instagram Ad. Meta attaches unique <code className="text-accent">fbclid</code> parameter.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-background/80 p-5 space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">STEP 02</span>
              <Zap className="h-4 w-4 text-accent" />
            </div>
            <h3 className="font-bold text-text-primary text-sm">Sub-1.2s Edge Render</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Cloudflare edge serves prerendered Next.js page in &lt;1.2s. Prevents visitor bounce before pixel loads.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-background/80 p-5 space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">STEP 03</span>
              <Activity className="h-4 w-4 text-text-muted" />
            </div>
            <h3 className="font-bold text-text-primary text-sm">Dual Event Trigger</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              User acts (e.g. Lead Form). App generates a unique <code className="text-accent">event_id</code> for deduplication.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-background/80 p-5 space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">STEP 04</span>
              <Server className="h-4 w-4 text-accent" />
            </div>
            <h3 className="font-bold text-text-primary text-sm">Edge CAPI Forwarding</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Browser sends client event while Cloudflare Worker sends direct server HTTP POST to Meta Graph API.
            </p>
          </div>

          <div className="rounded-xl border border-accent/60 bg-accent/5 p-5 space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">STEP 05</span>
              <ShieldCheck className="h-4 w-4 text-accent" />
            </div>
            <h3 className="font-bold text-text-primary text-sm">100% Attribution Proof</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Meta deduplicates events with 10/10 Event Match Quality. Validated in Meta Events Manager test tool.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Event Taxonomy & Core Web Vitals Benchmark */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Event Taxonomy */}
        <div className="lg:col-span-7 rounded-xl border border-border bg-surface/30 p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <Badge variant="outline">Telemetry Standard</Badge>
            <h3 className="text-xl font-bold text-text-primary">Standardized Event Schema</h3>
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
                  <th className="py-2.5 px-4">Telemetry Payload</th>
                  <th className="py-2.5 pl-4">Delivery Channel</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 font-mono text-text-muted">
                <tr>
                  <td className="py-3 pr-4 font-bold text-accent">PageView</td>
                  <td className="py-3 px-4 font-sans text-text-primary">Landing on page</td>
                  <td className="py-3 px-4">page_url, referrer</td>
                  <td className="py-3 pl-4 text-xs font-sans">Browser + CAPI</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-accent">ViewContent</td>
                  <td className="py-3 px-4 font-sans text-text-primary">Viewing key section / offer</td>
                  <td className="py-3 px-4">content_name, value, currency</td>
                  <td className="py-3 pl-4 text-xs font-sans">Browser + CAPI</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-accent">Contact</td>
                  <td className="py-3 px-4 font-sans text-text-primary">Clicking WhatsApp / Call</td>
                  <td className="py-3 px-4">contact_channel, event_id</td>
                  <td className="py-3 pl-4 text-xs font-sans">Browser + CAPI</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-accent">Lead</td>
                  <td className="py-3 px-4 font-sans text-text-primary">Submitting form / inquiry</td>
                  <td className="py-3 px-4">em_hash, ph_hash, lead_value</td>
                  <td className="py-3 pl-4 text-xs font-sans">Browser + CAPI</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-accent">Schedule</td>
                  <td className="py-3 px-4 font-sans text-text-primary">Booking consultation call</td>
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
            <Badge variant="outline">Performance Contract</Badge>
            <h3 className="text-xl font-bold text-text-primary">Core Web Vitals SLA</h3>
            <p className="text-xs text-text-muted">
              Slow pages destroy ad conversion rates. We benchmark on mobile networks.
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg border border-border/80 bg-background/60 p-4 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold uppercase text-text-primary">Largest Contentful Paint (LCP)</span>
                <span className="font-mono text-sm font-bold text-accent">&lt; 1.2s</span>
              </div>
              <p className="text-[11px] text-text-muted">
                Hero visual and primary value proposition loads in less than 1.2 seconds on 4G mobile.
              </p>
            </div>

            <div className="rounded-lg border border-border/80 bg-background/60 p-4 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold uppercase text-text-primary">Cumulative Layout Shift (CLS)</span>
                <span className="font-mono text-sm font-bold text-accent">&lt; 0.02</span>
              </div>
              <p className="text-[11px] text-text-muted">
                Zero annoying page jumps as images or fonts load, maintaining user reading focus.
              </p>
            </div>

            <div className="rounded-lg border border-border/80 bg-background/60 p-4 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold uppercase text-text-primary">Interaction to Next Paint (INP)</span>
                <span className="font-mono text-sm font-bold text-accent">&lt; 100ms</span>
              </div>
              <p className="text-[11px] text-text-muted">
                Instant UI responsiveness upon button clicks, accordion toggles, and form inputs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Deliverables vs Exclusions Breakdown */}
      <div className="space-y-8 border-t border-border pt-12">
        <div className="max-w-2xl space-y-2">
          <Badge variant="accent">Transparent Scope</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
            Scope Clarity: What Is Included vs Excluded
          </h2>
          <p className="text-sm text-text-muted">
            We operate with absolute transparency. Here is exactly what we deliver and what is outside project scope.
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
              What Is Excluded
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
          <Badge variant="accent">Package Investment</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary">
            Fixed-Scope Package Options
          </h2>
          <p className="text-text-muted text-sm sm:text-base">
            Select the tier aligned with your campaign requirements and conversion goals.
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
                        pkg.name
                      )}`}
                    >
                      Choose {pkg.name}
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
          <Badge variant="outline">Specific Inquiries</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
            Landing Page & Meta Pixel Questions
          </h2>
        </div>

        <div className="space-y-3 max-w-4xl">
          <AccordionItem
            title="How do you verify that the Meta Pixel and CAPI are working correctly?"
            defaultOpen={true}
          >
            <p className="text-sm text-text-muted leading-relaxed">
              Before project handover, we run comprehensive end-to-end tests using the official Meta Events Manager Test Events Tool. We trigger PageView, ViewContent, Contact, and Lead events, verify matching <code className="text-accent">event_id</code> deduplication, and deliver a recorded proof screen confirming 10/10 event quality score.
            </p>
          </AccordionItem>

          <AccordionItem title="Can you integrate with my existing CRM, Google Sheet, or WhatsApp?">
            <p className="text-sm text-text-muted leading-relaxed">
              Yes. All our landing page form submissions can trigger direct webhooks to Google Sheets, Notion, Telegram, Slack, or your CRM in real time alongside database persistence.
            </p>
          </AccordionItem>

          <AccordionItem title="What happens if Meta updates their API after launch?">
            <p className="text-sm text-text-muted leading-relaxed">
              Every package comes with a 14-day tracking guarantee. If Meta updates any schema or you notice any telemetry anomalies within 14 days of going live, we fix it promptly at no additional charge. For continuous ongoing protection, our monthly maintenance plans provide active telemetry monitoring.
            </p>
          </AccordionItem>
        </div>
      </div>

      {/* 7. Bottom Conversion Banner */}
      <div className="rounded-2xl border border-accent/40 bg-surface/80 p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
          Ready to Maximize Your Ad Conversion Rates?
        </h2>
        <p className="text-text-muted text-sm sm:text-base max-w-xl mx-auto">
          Request a quotation for your campaign landing page or schedule a consultation call to discuss your conversion funnel.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary" asChild>
            <Link href="/get-a-quote?service=landing-page-meta-pixel">
              Request Landing Page Quotation
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
