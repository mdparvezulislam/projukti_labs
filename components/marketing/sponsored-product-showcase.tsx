import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpRight,
  Zap,
  ShieldAlert,
  Truck,
  Activity,
  MousePointerClick,
  Globe,
  Sparkles,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

export function SponsoredProductShowcase() {
  const highlights = [
    {
      icon: Zap,
      title: "0–54 ms TTFB Edge Speed",
      description: "Cloudflare Global Workers + ViNext SSR eliminates 40%–60% mobile ad bounce.",
      badge: "Edge Speed",
    },
    {
      icon: ShieldAlert,
      title: "BD Courier Live Fraud Guard",
      description: "Scans lifetime buyer courier records across Steadfast, Pathao, RedX to stop return loss.",
      badge: "Fraud Guard",
    },
    {
      icon: Truck,
      title: "1-Click Courier Dispatch",
      description: "Direct API booking for Steadfast & Pathao with auto tracking codes and POS thermal invoices.",
      badge: "Automated Logistics",
    },
    {
      icon: Activity,
      title: "100% Meta Pixel + CAPI Tracking",
      description: "1:1 deterministic event deduplication (event_id) prevents iOS ad-blocker dropouts.",
      badge: "Ad Telemetry",
    },
    {
      icon: MousePointerClick,
      title: "3-Second COD Mobile Checkout",
      description: "Single-column mobile flow, dynamic delivery zone calculation, and 1-click WhatsApp confirm.",
      badge: "High Conversion",
    },
    {
      icon: Globe,
      title: "Zero-Code Custom Domains",
      description: "Connect shop.yourbrand.com with automated, free Cloudflare SSL certificates.",
      badge: "Brand Freedom",
    },
  ];

  return (
    <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-brand-orange/40 bg-card/95 p-5 sm:p-8 lg:p-10 shadow-warm-lg transition-all">
      {/* Subtle Ambient Background Gradient */}
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-orange/10 blur-3xl pointer-events-none" />
      <div className="absolute -left-24 -bottom-24 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      <div className="relative space-y-8 lg:space-y-10">
        {/* Header / Spotlight Banner */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-border/80 pb-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-brand-orange text-white shadow-xs">
                <Sparkles className="h-3.5 w-3.5" />
                Sponsored Flagship Product
              </span>
              <Badge variant="outline" className="font-semibold text-text-primary">
                In-House SaaS Platform
              </Badge>
              <span className="inline-flex items-center gap-1 text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live: lp.projuktilabs.tech
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-text-primary leading-tight">
              Projukti Landing —{" "}
              <span className="text-brand-orange-strong dark:text-accent">
                High-Performance E-commerce
              </span>{" "}
              Platform
            </h2>

            <p className="text-xs sm:text-base text-text-secondary leading-relaxed">
              Our flagship multi-tenant landing page builder and conversion platform engineered specifically for
              Bangladeshi direct-to-consumer (D2C) brands, Facebook ad marketers, and Cash-on-Delivery (COD) merchants.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button size="lg" variant="primary" asChild className="rounded-xl px-5 h-11 shadow-warm-sm text-xs sm:text-sm font-bold min-h-[44px]">
              <a href="https://lp.projuktilabs.tech" target="_blank" rel="noopener noreferrer">
                <span>Visit &amp; Purchase Platform</span>
                <ArrowUpRight className="ml-1.5 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-xl px-5 h-11 bg-card border-border hover:bg-surface-muted text-xs sm:text-sm font-semibold min-h-[44px]">
              <Link href="/services/projukti-landing">
                <span>Architecture &amp; Pricing</span>
                <ChevronRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* 2-Column Split: Visual Previews + Core Capabilities */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Visual Mockups */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-2xl border border-border overflow-hidden bg-surface-muted/50 shadow-warm-sm group">
              <div className="bg-surface-elevated border-b border-border px-3.5 py-2 flex items-center justify-between text-[11px] font-mono text-text-muted">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-rose-500/70" />
                  <span className="h-2 w-2 rounded-full bg-amber-500/70" />
                  <span className="h-2 w-2 rounded-full bg-emerald-500/70" />
                  <span className="ml-1.5 text-text-primary font-bold">lp.projuktilabs.tech</span>
                </div>
                <span className="text-[10px] font-bold text-brand-orange-strong dark:text-accent">
                  Order Management &amp; Fraud Risk Scoring
                </span>
              </div>
              <div className="relative aspect-[16/10] w-full bg-surface">
                <Image
                  src="/images/products/projukti-landing/dashboard-orders.webp"
                  alt="Projukti Landing Live Orders Dashboard with BD Courier Fraud Score"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
              <div className="rounded-xl border border-border bg-surface-muted/60 p-2.5">
                <div className="text-[10px] font-mono uppercase text-text-muted font-bold">Edge Speed</div>
                <div className="text-sm font-extrabold text-brand-orange-strong font-mono">0–54 ms TTFB</div>
                <div className="text-[9px] text-text-muted">Cloudflare Workers</div>
              </div>
              <div className="rounded-xl border border-border bg-surface-muted/60 p-2.5">
                <div className="text-[10px] font-mono uppercase text-text-muted font-bold">Fraud Guard</div>
                <div className="text-sm font-extrabold text-emerald-700 dark:text-emerald-400 font-mono">BD Courier</div>
                <div className="text-[9px] text-text-muted">Safe / Risk Score</div>
              </div>
              <div className="rounded-xl border border-border bg-surface-muted/60 p-2.5">
                <div className="text-[10px] font-mono uppercase text-text-muted font-bold">Logistics</div>
                <div className="text-sm font-extrabold text-sky-700 dark:text-sky-400 font-mono">1-Click Booking</div>
                <div className="text-[9px] text-text-muted">Steadfast &amp; Pathao</div>
              </div>
            </div>
          </div>

          {/* Right Column: 6 Feature Highlights Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-border bg-card p-3.5 space-y-1.5 hover:border-brand-orange/40 hover:shadow-2xs transition-all"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-lg bg-brand-orange-soft text-brand-orange-strong dark:bg-accent/15 dark:text-accent flex items-center justify-center shrink-0">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted font-mono">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-text-primary leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-text-secondary leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Banner: Direct Link Out */}
        <div className="rounded-xl border border-border/80 bg-surface-muted/50 p-3.5 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-center sm:text-left">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
            <p className="text-text-secondary">
              Want to see how fast your products can load on mobile? Test the live public demo at{" "}
              <a
                href="https://lp.projuktilabs.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-orange-strong dark:text-accent font-bold underline"
              >
                lp.projuktilabs.tech
              </a>
            </p>
          </div>

          <a
            href="https://lp.projuktilabs.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-bold text-brand-orange-strong dark:text-accent hover:underline shrink-0 p-1"
          >
            <span>Visit Platform &amp; Purchase</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
