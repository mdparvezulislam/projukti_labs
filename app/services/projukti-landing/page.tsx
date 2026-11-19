import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { AccordionItem } from "@/components/ui/accordion";
import {
  ArrowUpRight,
  CheckCircle2,
  Zap,
  ShieldAlert,
  Check,
  Activity,
  Truck,
  Globe,
  MousePointerClick,
  ChevronRight,
} from "lucide-react";
import { getServiceBySlug } from "@/modules/services/data";

export const metadata: Metadata = {
  title: "Projukti Landing — E-commerce Platform | Projukti Labs",
  description:
    "High-performance multi-tenant landing page builder and conversion management platform for Bangladeshi D2C brands, Facebook marketers, and COD merchants. Sub-100ms edge speed, BD Courier fraud guard, 1-click dispatch, and 100% Meta CAPI tracking.",
  alternates: {
    canonical: "https://projuktilabs.tech/services/projukti-landing",
  },
};

export default function ProjuktiLandingServicePage() {
  const service = getServiceBySlug("projukti-landing");
  const packages = service?.packages || [];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12 sm:space-y-16">
      {/* 1. Hero Section */}
      <div className="max-w-4xl space-y-4 sm:space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="accent" className="font-bold">★ IN-HOUSE FLAGSHIP SAAS</Badge>
          <Badge variant="outline">E-commerce &amp; Digital Commerce</Badge>
          <span className="font-mono text-xs text-brand-orange-strong dark:text-accent font-bold">
            0–54ms TTFB Global Edge
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.08]">
          Projukti Landing —{" "}
          <span className="text-brand-orange-strong dark:text-accent font-extrabold">
            Next-Gen E-commerce
          </span>{" "}
          Platform
        </h1>

        <p className="text-base sm:text-lg lg:text-xl text-text-secondary leading-relaxed max-w-3xl">
          The high-converting e-commerce landing page builder and conversion management system engineered specifically
          for Bangladeshi direct-to-consumer (D2C) brands, Facebook ad marketers, and Cash-on-Delivery (COD) merchants.
          Eliminates mobile ad bounce, stops courier parcel returns with live BD Courier fraud detection, and delivers 1-click
          Steadfast &amp; Pathao dispatch.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button size="lg" variant="primary" asChild className="rounded-xl px-5 h-11 shadow-warm-sm text-sm font-bold min-h-[44px]">
            <a href="https://lp.projuktilabs.tech" target="_blank" rel="noopener noreferrer">
              Visit Platform &amp; Purchase (lp.projuktilabs.tech)
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild className="rounded-xl px-5 h-11 bg-card border-border hover:bg-surface-muted text-sm font-semibold min-h-[44px]">
            <Link href="#pricing-tiers">
              View Plans &amp; Pricing
              <ChevronRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="ghost" asChild className="rounded-xl px-4 h-11 text-sm font-semibold min-h-[44px]">
            <Link href="/get-a-quote?service=projukti-landing&package=pro-brand">
              Custom Brand Setup &rarr;
            </Link>
          </Button>
        </div>

        {/* Micro Trust Bar */}
        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-text-muted">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            Cloudflare 300+ Global Edge Locations
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            BD Courier Live Database Fraud Guard
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            1-Click Steadfast &amp; Pathao Booking
          </span>
        </div>
      </div>

      {/* 2. Visual Platform Showcase: Real Screenshots & Telemetry */}
      <div className="rounded-2xl sm:rounded-3xl border border-border bg-card/95 p-5 sm:p-8 lg:p-10 space-y-8 shadow-warm-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-border pb-5">
          <div className="space-y-1.5">
            <Badge variant="accent">LIVE PLATFORM PREVIEW</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary">
              Built for Real Business Operations in Bangladesh
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary max-w-2xl">
              From the moment an ad click occurs to customer fraud verification, 3-second COD checkout, and automated courier shipment dispatch.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Live at lp.projuktilabs.tech
            </span>
          </div>
        </div>

        {/* 2-Column Preview Grid: Dashboard & Mobile Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: Orders & Courier Dashboard Preview */}
          <div className="lg:col-span-8 space-y-4">
            <div className="rounded-2xl border border-border overflow-hidden bg-surface-muted/40 shadow-sm relative group">
              <div className="bg-surface-elevated border-b border-border px-4 py-2.5 flex items-center justify-between text-xs font-mono text-text-muted">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                  <span className="ml-2 font-semibold text-text-primary">lp.projuktilabs.tech/admin/orders</span>
                </div>
                <span className="text-[11px] font-bold text-accent">BD Courier Fraud Scan + 1-Click Dispatch</span>
              </div>
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-surface">
                <Image
                  src="/images/products/projukti-landing/dashboard-orders.webp"
                  alt="Projukti Landing Merchant Orders Dashboard with BD Courier Fraud Check"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 65vw"
                />
              </div>
            </div>
            <p className="text-xs text-text-muted text-center sm:text-left">
              Real-time merchant dashboard showing customer delivery success rate percentage, risk scoring badges, and 1-click Steadfast booking.
            </p>
          </div>

          {/* Right: Mobile COD Checkout Form */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="rounded-3xl border-2 border-border/80 overflow-hidden bg-surface-elevated shadow-warm-md p-2 max-w-[280px] w-full">
              <div className="relative aspect-[390/780] w-full rounded-2xl overflow-hidden bg-surface">
                <Image
                  src="/images/products/projukti-landing/hero-phone-preview.webp"
                  alt="Projukti Landing High-Converting Mobile COD Checkout Form"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 280px, 320px"
                />
              </div>
            </div>
            <span className="text-xs font-semibold text-text-primary mt-2">
              3-Second COD Mobile Checkout
            </span>
          </div>
        </div>
      </div>

      {/* 3. The 6 Architectural Pillars: How Projukti Landing Solves Real Problems */}
      <div className="space-y-8 sm:space-y-10">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <Badge variant="accent">CORE CAPABILITIES</Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-text-primary">
            Engineered to Solve Bangladesh E-commerce Bottlenecks
          </h2>
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
            Traditional WordPress and WooCommerce stores in Bangladesh struggle with slow loading times, high return rates,
            lost Facebook Pixel events, and manual courier entries. Projukti Landing re-engineers the entire pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {/* Pillar 1: Sub-100ms Speed */}
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-3 hover:border-brand-orange/40 transition-all shadow-warm-sm">
            <div className="h-11 w-11 rounded-xl bg-brand-orange-soft text-brand-orange-strong dark:bg-accent/10 dark:text-accent flex items-center justify-center">
              <Zap className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-orange-strong dark:text-accent">
                Edge Architecture
              </span>
              <h3 className="text-lg font-bold text-text-primary">0–54 ms TTFB Global Edge Speed</h3>
            </div>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Cloudflare Global Workers with native Cache API strip transient ad UTM &amp; fbclid parameters to deliver
              instant cached HTML. Eliminates 40%–60% ad bounce rates caused by slow 3.5s–8s WordPress pages on 4G networks.
            </p>
          </div>

          {/* Pillar 2: BD Courier Fraud Guard */}
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-3 hover:border-emerald-500/40 transition-all shadow-warm-sm">
            <div className="h-11 w-11 rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                Fraud Protection
              </span>
              <h3 className="text-lg font-bold text-text-primary">BD Courier Live Fraud Guard</h3>
            </div>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Direct live integration with BD Courier scanning lifetime buyer delivery records across Steadfast, Pathao, Paperfly,
              and RedX. Automatically flags high-risk serial cancellers before shipping, cutting COD return losses by 15%–35%.
            </p>
          </div>

          {/* Pillar 3: 1-Click Courier Dispatch */}
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-3 hover:border-sky-500/40 transition-all shadow-warm-sm">
            <div className="h-11 w-11 rounded-xl bg-sky-500/15 text-sky-700 dark:text-sky-400 flex items-center justify-center">
              <Truck className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-700 dark:text-sky-400">
                Automated Logistics
              </span>
              <h3 className="text-lg font-bold text-text-primary">1-Click Steadfast &amp; Pathao Dispatch</h3>
            </div>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Book shipments with one click directly from the dashboard. The system automatically creates consignments,
              emits live tracking numbers, generates thermal POS invoices, and triggers customer delivery SMS updates.
            </p>
          </div>

          {/* Pillar 4: 100% Meta Pixel + CAPI */}
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-3 hover:border-purple-500/40 transition-all shadow-warm-sm">
            <div className="h-11 w-11 rounded-xl bg-purple-500/15 text-purple-700 dark:text-purple-300 flex items-center justify-center">
              <Activity className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300">
                Ad Telemetry
              </span>
              <h3 className="text-lg font-bold text-text-primary">100% Meta Pixel + CAPI Deduplication</h3>
            </div>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Dual-layer client-side Pixel and server-side Conversions API (CAPI) with deterministic 1:1 event deduplication (event_id).
              Zero purchase event loss from iOS ad-blockers, ensuring accurate Meta Ads machine-learning and higher ROAS.
            </p>
          </div>

          {/* Pillar 5: 3-Second COD Checkout */}
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-3 hover:border-amber-500/40 transition-all shadow-warm-sm">
            <div className="h-11 w-11 rounded-xl bg-amber-500/15 text-amber-700 dark:text-amber-400 flex items-center justify-center">
              <MousePointerClick className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                High Conversion
              </span>
              <h3 className="text-lg font-bold text-text-primary">3-Second COD Mobile Checkout</h3>
            </div>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Engineered with a 50/50 desktop split and single-column mobile view. Dynamic inside/outside Dhaka delivery zone
              switching, 5-minute sliding anti-duplicate order protection, and immediate post-order WhatsApp confirmation buttons.
            </p>
          </div>

          {/* Pillar 6: Zero-Code Custom Domains */}
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-3 hover:border-brand-orange/40 transition-all shadow-warm-sm">
            <div className="h-11 w-11 rounded-xl bg-brand-orange-soft text-brand-orange-strong dark:bg-accent/10 dark:text-accent flex items-center justify-center">
              <Globe className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-orange-strong dark:text-accent">
                Brand Freedom
              </span>
              <h3 className="text-lg font-bold text-text-primary">Zero-Code Domains with Free SSL</h3>
            </div>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Connect your own custom domain (e.g. shop.mybrand.com) via a simple CNAME record. Cloudflare for SaaS automatically
              issues and renews SSL certificates, giving your store a verified, branded presence.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Comparison Table: Projukti Landing vs Traditional WooCommerce / WordPress */}
      <div className="rounded-2xl sm:rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-warm-sm">
        <div className="space-y-2">
          <Badge variant="accent">BENCHMARK COMPARISON</Badge>
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
            Why Modern Brands Switch from WordPress to Projukti Landing
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary">
            A technical comparison based on real mobile cellular testing in Bangladesh.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-border bg-surface-muted/50 text-text-primary font-bold">
                <th className="py-3 px-4">Performance Metric &amp; Feature</th>
                <th className="py-3 px-4 text-brand-orange-strong dark:text-accent">Projukti Landing (lp.projuktilabs.tech)</th>
                <th className="py-3 px-4 text-text-muted">Traditional WordPress / WooCommerce</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-text-secondary">
              <tr>
                <td className="py-3 px-4 font-semibold text-text-primary">Time to First Byte (TTFB)</td>
                <td className="py-3 px-4 text-emerald-700 dark:text-emerald-400 font-bold">0–54 ms (Cloudflare Global Edge)</td>
                <td className="py-3 px-4 text-rose-600 dark:text-rose-400">1,800 ms – 3,500 ms (Shared Hosting)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-text-primary">Mobile Ad Bounce Rate</td>
                <td className="py-3 px-4 text-emerald-700 dark:text-emerald-400 font-bold">&lt; 15% (Instant Edge Delivery)</td>
                <td className="py-3 px-4 text-rose-600 dark:text-rose-400">40% – 60% (Users bounce before render)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-text-primary">BD Courier Return Risk Scan</td>
                <td className="py-3 px-4 text-emerald-700 dark:text-emerald-400 font-bold">Built-in live check (Safe/Medium/High)</td>
                <td className="py-3 px-4 text-text-muted">None (Requires manual phone lookup)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-text-primary">Courier Dispatch API</td>
                <td className="py-3 px-4 text-emerald-700 dark:text-emerald-400 font-bold">1-Click Steadfast &amp; Pathao booking</td>
                <td className="py-3 px-4 text-text-muted">Manual export to CSV / portal re-entry</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-text-primary">Meta Pixel + CAPI Tracking</td>
                <td className="py-3 px-4 text-emerald-700 dark:text-emerald-400 font-bold">100% Deduplicated Event Engine</td>
                <td className="py-3 px-4 text-rose-600 dark:text-rose-400">Fragmented plugins, iOS 14.5+ dropouts</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-text-primary">Server &amp; Plugin Maintenance</td>
                <td className="py-3 px-4 text-emerald-700 dark:text-emerald-400 font-bold">Zero maintenance (Fully managed edge)</td>
                <td className="py-3 px-4 text-rose-600 dark:text-rose-400">Frequent crashes, plugin conflicts, malware</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Pricing Tiers */}
      <div id="pricing-tiers" className="space-y-8 pt-4">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <Badge variant="accent">TRANSPARENT SUBSCRIPTION TIERS</Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-text-primary">
            Simple, Transparent Pricing with Zero Hidden Deductions
          </h2>
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
            Choose the plan that fits your current ad volume. You can upgrade, downgrade, or cancel at any time.
            Zero per-order sales commissions taken by Projukti Labs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              className={`flex flex-col justify-between relative rounded-2xl sm:rounded-3xl transition-all ${
                pkg.popular
                  ? "border-brand-orange shadow-warm-md ring-2 ring-brand-orange/30 bg-card"
                  : "border-border shadow-warm-sm bg-card/90"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-brand-orange text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                    Most Popular for Marketers
                  </span>
                </div>
              )}

              <CardHeader className="space-y-3 p-6 sm:p-7">
                <div>
                  <h3 className="text-xl font-bold text-text-primary">{pkg.name}</h3>
                  <CardDescription className="text-xs text-text-secondary mt-1">
                    {pkg.description}
                  </CardDescription>
                </div>

                <div className="pt-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-text-primary font-mono">
                      ৳{pkg.priceBdt?.toLocaleString()}
                    </span>
                    <span className="text-xs text-text-muted font-medium">/ মাস</span>
                  </div>
                  <span className="text-[11px] text-text-muted">
                    billed monthly · BDT {pkg.priceBdt?.toLocaleString()} or USD ${pkg.priceUsd}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 p-6 sm:p-7 pt-0">
                <div className="space-y-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-text-primary">
                    Included Features:
                  </span>
                  <ul className="space-y-2 text-xs text-text-secondary">
                    {pkg.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-brand-orange-strong dark:text-accent shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <Button
                    variant={pkg.popular ? "primary" : "outline"}
                    asChild
                    className="w-full rounded-xl min-h-[44px] font-bold text-xs"
                  >
                    <a href="https://lp.projuktilabs.tech" target="_blank" rel="noopener noreferrer">
                      Purchase / Start on lp.projuktilabs.tech
                      <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 6. Frequently Asked Questions */}
      <div className="rounded-2xl sm:rounded-3xl border border-border bg-surface/30 p-6 sm:p-10 space-y-6">
        <div className="space-y-2">
          <Badge variant="accent">FREQUENTLY ASKED QUESTIONS</Badge>
          <h2 className="text-2xl font-bold text-text-primary">Common Questions About Projukti Landing</h2>
        </div>

        <div className="space-y-3">
          <AccordionItem
            title="What is Projukti Landing and how is it different from normal website development?"
            defaultOpen={true}
          >
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Projukti Landing is our proprietary SaaS conversion platform hosted directly at{" "}
              <a href="https://lp.projuktilabs.tech" target="_blank" rel="noopener noreferrer" className="text-brand-orange-strong dark:text-accent underline font-semibold">
                lp.projuktilabs.tech
              </a>. Unlike standard custom code builds that require individual servers, Projukti Landing provides an
              instant, ready-to-run landing page builder where you can publish high-speed pages in under 2 minutes,
              verify buyer fraud history with BD Courier, and dispatch shipments with 1 click.
            </p>
          </AccordionItem>

          <AccordionItem title="Do I need my own Steadfast or Pathao courier account?">
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Yes. You connect your own Steadfast API Key/Secret or Pathao merchant credentials directly in your store
              settings. All COD payments collected by the courier go 100% directly into your merchant bank or bKash account.
              Projukti Labs takes 0% commission on your sales.
            </p>
          </AccordionItem>

          <AccordionItem title="How does the BD Courier live fraud risk scoring work?">
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              When an order is received, the system queries the live BD Courier database with the customer&apos;s phone number.
              It checks total parcel deliveries vs returns across Steadfast, Pathao, RedX, and Paperfly. If the success rate is
              above 80%, it badges the order as &ldquo;SAFE&rdquo;. If below 60% or previously fake, it marks it as &ldquo;HIGH RISK&rdquo;
              so you can request advance delivery fees before shipping.
            </p>
          </AccordionItem>

          <AccordionItem title="Can I connect my own custom brand domain (e.g. shop.mybrand.com)?">
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Yes. You can connect any custom domain or subdomain by adding a single CNAME record pointing to our edge network.
              Our automated Cloudflare for SaaS integration provisions and manages an encrypted SSL certificate for free.
            </p>
          </AccordionItem>
        </div>
      </div>

      {/* 7. Final Call to Action Banner */}
      <div className="rounded-2xl sm:rounded-3xl border border-brand-orange/30 bg-gradient-to-r from-brand-orange-soft/60 via-card to-brand-orange-soft/40 p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-warm-sm">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl sm:text-2xl font-extrabold text-text-primary">
            Ready to Eliminate Ad Bounce and Stop COD Return Losses?
          </h3>
          <p className="text-xs sm:text-sm text-text-secondary max-w-xl">
            Launch your high-speed landing pages on Projukti Landing today or consult with our software architect for a turnkey brand setup.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button size="lg" variant="primary" asChild className="rounded-xl font-bold min-h-[44px]">
            <a href="https://lp.projuktilabs.tech" target="_blank" rel="noopener noreferrer">
              Launch lp.projuktilabs.tech
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild className="rounded-xl bg-card font-semibold min-h-[44px]">
            <Link href="/contact">
              Talk to Architect
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
