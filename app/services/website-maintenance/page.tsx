import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { AccordionItem } from "@/components/ui/accordion";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Clock,
  Activity,
  HardDrive,
  Check,
} from "lucide-react";
import { getServiceBySlug } from "@/modules/services/data";

export const metadata = {
  title: "Website Maintenance & Technical Support Retainers | Projukti Labs",
  description:
    "Proactive engineering retainers: 5-minute uptime monitoring, off-site backup verification, security patching, and guaranteed response SLAs.",
};

export default function WebsiteMaintenancePage() {
  const service = getServiceBySlug("website-maintenance");
  const packages = service?.packages || [];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-24">
      {/* 1. Hero Section */}
      <div className="max-w-4xl space-y-6">
        <div className="inline-flex items-center gap-2">
          <Badge variant="accent">FLAGSHIP SOLUTION</Badge>
          <Badge variant="outline">Maintenance &amp; Technical Support</Badge>
          <span className="font-mono text-xs text-accent">1h–48h SLA Options</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.1]">
          Proactive Website Maintenance &amp;{" "}
          <span className="text-accent underline decoration-accent/40 decoration-wavy">
            Technical Retainer
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-text-muted leading-relaxed max-w-3xl">
          Zero downtime surprises. We safeguard your production systems through continuous 5-minute uptime telemetry,
          automated off-site backup verification drills, dependency security patches, and monthly dedicated developer
          support.
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <Button size="lg" variant="primary" asChild>
            <Link href="/get-a-quote?service=website-maintenance&package=business-care">
              Start with Business Care
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#care-matrix">Compare 4 Care Tiers</Link>
          </Button>
        </div>
      </div>

      {/* 2. Visual Care Pillars Diagram */}
      <div className="rounded-2xl border border-border bg-surface/40 p-6 sm:p-10 space-y-8">
        <div className="space-y-2 max-w-2xl">
          <Badge variant="accent">PROACTIVE ENGINEERING ROUTINE</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
            How We Protect Your Production Systems
          </h2>
          <p className="text-xs sm:text-sm text-text-muted">
            Rather than waiting for something to break, we actively audit, patch, and profile your infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="rounded-xl border border-border/80 bg-background/80 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">Pillar 01</span>
              <Activity className="h-4 w-4 text-text-muted" />
            </div>
            <h3 className="font-bold text-text-primary text-sm">5-Minute Uptime Telemetry</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Automated global probes check HTTP status, response latency, and SSL certificate expiration every 5
              minutes.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-background/80 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">Pillar 02</span>
              <HardDrive className="h-4 w-4 text-accent" />
            </div>
            <h3 className="font-bold text-text-primary text-sm">Off-Site Backup Drills</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Automated database and static asset snapshots stored in separate cloud buckets with scheduled restoration
              tests.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-background/80 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">Pillar 03</span>
              <ShieldCheck className="h-4 w-4 text-text-muted" />
            </div>
            <h3 className="font-bold text-text-primary text-sm">Staging Security Patching</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Node.js runtime, Next.js, and npm security advisories tested in isolated staging environments before
              production release.
            </p>
          </div>

          <div className="rounded-xl border border-accent/60 bg-accent/5 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">Pillar 04</span>
              <Clock className="h-4 w-4 text-accent" />
            </div>
            <h3 className="font-bold text-text-primary text-sm">Dedicated Developer Hours</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Reserved monthly engineering time for content updates, campaign banners, speed profiling, and feature
              tweaks.
            </p>
          </div>
        </div>
      </div>

      {/* 3. The 4 Care Plans Pricing Cards */}
      <div id="care-matrix" className="space-y-12 border-t border-border pt-16">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <Badge variant="accent">MONTHLY RETAINERS</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary">
            4 Proactive Care Retainer Tiers
          </h2>
          <p className="text-text-muted text-sm sm:text-base">
            Choose the response SLA and development hours suited to your operational requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              className={`flex flex-col justify-between border-border bg-surface/50 ${
                pkg.popular ? "ring-2 ring-accent border-accent/40" : ""
              }`}
            >
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-base text-text-primary">{pkg.name}</span>
                  {pkg.popular && <Badge variant="accent" className="text-[10px]">Recommended</Badge>}
                </div>

                <div className="space-y-1">
                  <div className="font-mono text-2xl font-extrabold text-accent">
                    {pkg.priceBdt ? `৳ ${pkg.priceBdt.toLocaleString()}` : "Custom Scope"}
                  </div>
                  <div className="text-[11px] text-text-muted font-mono">
                    {pkg.priceUsd ? `or $${pkg.priceUsd} USD` : "Bespoke SLA"} / month
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded bg-background/80 p-2 text-xs font-mono">
                  <Clock className="h-3.5 w-3.5 text-accent" />
                  <span>SLA: {pkg.slaHours}h response</span>
                </div>

                <CardDescription className="text-xs text-text-muted leading-relaxed">
                  {pkg.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="space-y-2 border-t border-border/60 pt-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-text-primary">
                    Included in {pkg.name}:
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
                    className="w-full text-xs"
                  >
                    <Link
                      href={`/get-a-quote?service=website-maintenance&package=${encodeURIComponent(
                        pkg.slug
                      )}`}
                    >
                      Select {pkg.name}
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 4. SLA Comparison Matrix Table */}
      <div className="rounded-xl border border-border bg-surface/30 p-6 sm:p-8 space-y-6">
        <h3 className="text-xl font-bold text-text-primary">
          Detailed SLA &amp; Feature Comparison
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border text-text-muted uppercase font-mono text-[11px]">
              <tr>
                <th className="py-3 pr-4">Feature / SLA</th>
                <th className="py-3 px-4">Basic Care</th>
                <th className="py-3 px-4 font-bold text-accent">Business Care</th>
                <th className="py-3 px-4">Priority Care</th>
                <th className="py-3 pl-4">Custom Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 font-mono text-text-muted">
              <tr>
                <td className="py-3 pr-4 font-sans font-semibold text-text-primary">Monthly Retainer Fee</td>
                <td className="py-3 px-4">৳ 8,000 ($80)</td>
                <td className="py-3 px-4 font-bold text-accent">৳ 18,000 ($180)</td>
                <td className="py-3 px-4">৳ 38,000 ($380)</td>
                <td className="py-3 pl-4">Custom Scope</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-sans font-semibold text-text-primary">Emergency Response SLA</td>
                <td className="py-3 px-4">48 Hours</td>
                <td className="py-3 px-4 font-bold text-accent">24 Hours</td>
                <td className="py-3 px-4">4 Hours</td>
                <td className="py-3 pl-4 font-bold text-accent">1 Hour Emergency</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-sans font-semibold text-text-primary">Dedicated Developer Hours</td>
                <td className="py-3 px-4">0 Hours</td>
                <td className="py-3 px-4 font-bold text-accent">4 Hours</td>
                <td className="py-3 px-4">10 Hours</td>
                <td className="py-3 pl-4">20+ Hours</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-sans font-semibold text-text-primary">Monitoring Interval</td>
                <td className="py-3 px-4">Every 15 mins</td>
                <td className="py-3 px-4 font-bold text-accent">Every 5 mins</td>
                <td className="py-3 px-4">Every 1 min</td>
                <td className="py-3 pl-4">Real-time Probes</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-sans font-semibold text-text-primary">Backup Frequency</td>
                <td className="py-3 px-4">Weekly</td>
                <td className="py-3 px-4 font-bold text-accent">Daily</td>
                <td className="py-3 px-4">Daily + On-Demand</td>
                <td className="py-3 pl-4">Continuous Point-in-Time</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-sans font-semibold text-text-primary">Support Channel</td>
                <td className="py-3 px-4">Email Portal</td>
                <td className="py-3 px-4 font-bold text-accent">Email + WhatsApp</td>
                <td className="py-3 px-4">WhatsApp + Direct Phone</td>
                <td className="py-3 pl-4">Dedicated Slack / Discord</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. What Is Covered vs What Is Excluded */}
      <div className="space-y-8 border-t border-border pt-12">
        <div className="max-w-2xl space-y-2">
          <Badge variant="accent">SCOPE CLARITY</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
            Covered Services vs. Out-of-Scope Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-xl border border-accent/30 bg-surface/40 p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-accent flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-accent" />
              Included in Retainers
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-text-muted">
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span>Runtime bug fixes, broken link remediation, and layout corrections</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span>Dependency security patches and npm vulnerability updates</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span>SSL certificate monitoring and renewal assistance</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span>Banner updates, price adjustments, or product formatting (via developer hours)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span>Continuous Core Web Vitals profiling and edge cache tuning</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-surface/20 p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-text-muted flex items-center gap-2">
              <XCircle className="h-5 w-5 text-text-muted" />
              Separately Quoted Projects
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-text-muted">
              <li className="flex items-start gap-2.5">
                <span className="text-border font-bold shrink-0 mt-0.5">—</span>
                <span>Full architectural redesigns or migrations to entirely new tech stacks</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-border font-bold shrink-0 mt-0.5">—</span>
                <span>Complex custom features requiring time far exceeding monthly retainer hours</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-border font-bold shrink-0 mt-0.5">—</span>
                <span>Net-new brand identity creation, 3D assets, or promotional video production</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-border font-bold shrink-0 mt-0.5">—</span>
                <span>Cloud hosting and SaaS subscriptions (invoiced directly by providers)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 6. FAQ */}
      <div className="space-y-8 border-t border-border pt-16">
        <div className="max-w-2xl space-y-2">
          <Badge variant="outline">FREQUENTLY ASKED QUESTIONS</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
            Retainer Care FAQ
          </h2>
        </div>

        <div className="space-y-3 max-w-4xl">
          <AccordionItem
            title="Do unused developer hours roll over to the next month?"
            defaultOpen={true}
          >
            <p className="text-sm text-text-muted leading-relaxed">
              Yes. In our Business Care and Priority Care plans, unused developer hours roll over for up to 60 days,
              allowing you to bank hours for upcoming sales campaigns or quarterly site refreshes.
            </p>
          </AccordionItem>

          <AccordionItem title="Can you maintain a website that was built by another agency or developer?">
            <p className="text-sm text-text-muted leading-relaxed">
              Yes, following an initial onboarding audit. We review the codebase, resolve critical security or
              performance vulnerabilities, set up automated monitoring and off-site backups, and then transition the
              system into our regular monthly care plan.
            </p>
          </AccordionItem>

          <AccordionItem title="Are there any long-term contract lock-ins?">
            <p className="text-sm text-text-muted leading-relaxed">
              No. Our retainers operate on a flexible month-to-month basis. You may upgrade, downgrade, or cancel your
              subscription with 30 days written notice.
            </p>
          </AccordionItem>
        </div>
      </div>

      {/* 7. Bottom Conversion Banner */}
      <div className="rounded-2xl border border-accent/40 bg-surface/80 p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
          Protect Your Website and Customer Experience Today
        </h2>
        <p className="text-text-muted text-sm sm:text-base max-w-xl mx-auto">
          Enroll your platform in an SLA-backed engineering retainer for ongoing peace of mind.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary" asChild>
            <Link href="/get-a-quote?service=website-maintenance">
              Enroll in Retainer Care
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Speak with Our Support Architect</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
