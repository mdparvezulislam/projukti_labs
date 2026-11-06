import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Engineering Portfolio & Technical Case Studies | Projukti Labs",
  description:
    "Explore our production architectural builds, high-speed edge platforms, conversion funnel implementations, and commerce solutions.",
};

export default function PortfolioPage() {
  const caseStudies = [
    {
      id: "projukti-labs-engine",
      title: "Projukti Labs Studio Engine v1.0",
      category: "Edge Systems & Web Architecture",
      badge: "In Production",
      overview:
        "The official Projukti Labs web platform engineered as a Cloudflare Workers modular monolith combining Next.js App Router, Vite RSC compilation, Drizzle ORM, and Cloudflare D1.",
      metrics: [
        { label: "Mobile LCP", value: "< 1.1s" },
        { label: "Worker Bundle", value: "299 KB" },
        { label: "Type Safety", value: "100%" },
        { label: "Cold Start", value: "0ms" },
      ],
      stack: ["Next.js 16", "React 19", "Cloudflare Workers", "D1 SQLite", "Drizzle ORM", "Tailwind CSS v4"],
      deliverables: [
        "Vite + vinext edge build integration deploying SSR to Cloudflare Workers",
        "Dark-first responsive design system adhering strictly to WCAG 2.1 AA specifications",
        "Integrated inquiry and CRM lead tracking system running on Cloudflare D1",
      ],
      linkText: "Current Live Platform",
      href: "/",
    },
    {
      id: "meta-pixel-capi-funnel",
      title: "Conversion-Engineered Funnel with Meta CAPI",
      category: "Web Development & Analytics",
      badge: "Flagship Architecture",
      overview:
        "A high-velocity conversion landing page system featuring dual-layer telemetry: client-side Meta Pixel paired synchronously with server-side Conversions API (CAPI) deduplication.",
      metrics: [
        { label: "Tracking Loss", value: "0%" },
        { label: "Mobile Score", value: "98/100" },
        { label: "LCP", value: "1.2s" },
        { label: "Event Match", value: "> 9.0" },
      ],
      stack: ["Next.js", "Meta CAPI", "Google Analytics 4", "Cloudflare Edge", "Zod Validation"],
      deliverables: [
        "Zero tracking drop-off on iOS and ad-blocker environments via edge server forwarding",
        "Standardized event taxonomy: PageView, ViewContent, Contact, Lead, Schedule",
        "Direct validation against Meta Events Manager test reporting tool",
      ],
      linkText: "Explore Service Blueprint",
      href: "/services/landing-page-meta-pixel",
    },
    {
      id: "production-ecommerce-architecture",
      title: "Resilient Multi-Gateway E-commerce Platform",
      category: "E-commerce & Digital Commerce",
      badge: "Commerce Architecture",
      overview:
        "A high-availability online commerce system uniting Bangladesh mobile payments (bKash PGW, Nagad, SSLCommerz) with international card processing (Stripe) and automated courier dispatch.",
      metrics: [
        { label: "Checkout Steps", value: "2 Clicks" },
        { label: "Cart Latency", value: "< 50ms" },
        { label: "Gateways", value: "4 Integrated" },
        { label: "Platform Fee", value: "0%" },
      ],
      stack: ["Next.js App Router", "bKash PGW", "SSLCommerz", "Stripe", "PostgreSQL/SQLite", "Tailwind CSS"],
      deliverables: [
        "Optimistic cart state updates with immediate visual feedback",
        "Transactional SMS and email notifications upon order milestones",
        "Automated parcel booking API bridge for courier fulfillment",
      ],
      linkText: "Explore E-commerce Blueprint",
      href: "/services/complete-ecommerce-website",
    },
    {
      id: "sla-care-infrastructure",
      title: "Proactive Uptime & Disaster Recovery Retainer",
      category: "Maintenance & Technical Support",
      badge: "Infrastructure Care",
      overview:
        "Continuous automated monitoring and maintenance suite ensuring zero-downtime surprises through 5-minute health polls, automated backup drills, and monthly performance profiling.",
      metrics: [
        { label: "Uptime Target", value: "99.9%" },
        { label: "Poll Frequency", value: "5 min" },
        { label: "Emergency SLA", value: "1h–4h" },
        { label: "Backup Drills", value: "Monthly" },
      ],
      stack: ["Health Polling Daemon", "Cloudflare KV", "Automated R2 Snapshots", "Slack Webhooks"],
      deliverables: [
        "Automated SSL certificate renewal alerts and expiry safeguards",
        "Staged dependency security patches tested in preview environments before deployment",
        "Transparent monthly engineering and Core Web Vitals audit reports",
      ],
      linkText: "Explore Retainer Plans",
      href: "/services/website-maintenance",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <Badge variant="accent">Architectural Case Studies</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-text-primary">
          Selected Engineering Works & Architecture
        </h1>
        <p className="text-lg text-text-muted leading-relaxed">
          We pride ourselves on transparent, verifiable engineering. Here is an inside look at the technical architectures, performance metrics, and production solutions we deliver.
        </p>
      </div>

      {/* Case Studies List */}
      <div className="space-y-12">
        {caseStudies.map((study, idx) => (
          <div
            key={study.id}
            className="rounded-2xl border border-border bg-surface/40 p-6 sm:p-10 space-y-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-accent">0{idx + 1}</span>
                  <Badge variant="outline">{study.category}</Badge>
                  <Badge variant="accent" className="text-[10px]">{study.badge}</Badge>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary pt-2">
                  {study.title}
                </h2>
              </div>
              <Button variant="outline" asChild className="self-start sm:self-center">
                <Link href={study.href}>
                  {study.linkText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <p className="text-sm sm:text-base text-text-muted leading-relaxed max-w-4xl">
              {study.overview}
            </p>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-xl border border-border/60 bg-background/60 p-4">
              {study.metrics.map((m) => (
                <div key={m.label} className="text-center space-y-1">
                  <div className="font-mono text-xl sm:text-2xl font-bold text-accent">{m.value}</div>
                  <div className="text-[11px] uppercase tracking-wider text-text-muted">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Deliverables & Stack */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
              <div className="lg:col-span-8 space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-text-primary">
                  Key Technical Deliverables
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-text-muted">
                  {study.deliverables.map((del, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-4 space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-text-primary">
                  Architecture & Technologies
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {study.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-border bg-surface px-2.5 py-1 font-mono text-[11px] text-text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Conversion Banner */}
      <div className="rounded-2xl border border-border bg-surface/60 p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
          Need a Custom Architecture for Your Platform?
        </h2>
        <p className="text-text-muted text-sm sm:text-base max-w-xl mx-auto">
          We architect and implement production systems with clean milestone contracts.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary" asChild>
            <Link href="/get-a-quote">
              Request Project Quotation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Schedule Technical Discussion</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
