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
    "Proactive engineering retainers with 5-minute uptime monitoring, off-site backup verification drills, security patches, and guaranteed SLAs.",
};

export default function WebsiteMaintenancePage() {
  const service = getServiceBySlug("website-maintenance");
  const packages = service?.packages || [];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-24">
      {/* 1. Hero Section */}
      <div className="max-w-4xl space-y-6">
        <div className="inline-flex items-center gap-2">
          <Badge variant="accent">Flagship Vertical</Badge>
          <Badge variant="outline">Maintenance & Technical Support</Badge>
          <span className="font-mono text-xs text-accent">Guaranteed 1h–48h SLA</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.1]">
          Proactive Website Maintenance &{" "}
          <span className="text-accent underline decoration-accent/40 decoration-wavy">
            Technical Retainer
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-text-muted leading-relaxed max-w-3xl">
          Zero downtime surprises. We protect your business with continuous 5-minute health monitoring, weekly automated backup restoration drills, security patch management, and dedicated developer hours every month.
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <Button size="lg" variant="primary" asChild>
            <Link href="/get-a-quote?service=website-maintenance&package=Business+Care">
              Enroll in Business Care
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#care-matrix">Compare All 4 Care Tiers</Link>
          </Button>
        </div>
      </div>

      {/* 2. Visual Care Pillars Diagram */}
      <div className="rounded-2xl border border-border bg-surface/40 p-6 sm:p-10 space-y-8">
        <div className="space-y-2 max-w-2xl">
          <Badge variant="accent">Proactive Engineering Routine</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
            How We Protect Your Production Environment
          </h2>
          <p className="text-xs sm:text-sm text-text-muted">
            Rather than waiting for something to break, we actively audit and tune your system daily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="rounded-xl border border-border/80 bg-background/80 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">PILLAR 01</span>
              <Activity className="h-4 w-4 text-text-muted" />
            </div>
            <h3 className="font-bold text-text-primary text-sm">5-Min Uptime Telemetry</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Automated global probes check your endpoint every 5 minutes. Outages trigger instant SMS/WhatsApp alerts to on-call engineers.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-background/80 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">PILLAR 02</span>
              <HardDrive className="h-4 w-4 text-accent" />
            </div>
            <h3 className="font-bold text-text-primary text-sm">Off-Site Backups & Drills</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Automated database and asset snapshots stored in separate cloud regions, backed by monthly restoration drill verification.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-background/80 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">PILLAR 03</span>
              <ShieldCheck className="h-4 w-4 text-text-muted" />
            </div>
            <h3 className="font-bold text-text-primary text-sm">Staged Security Patches</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Node.js, Next.js, and package CVE vulnerabilities are patched and tested in staging before ever touching production.
            </p>
          </div>

          <div className="rounded-xl border border-accent/60 bg-accent/5 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">PILLAR 04</span>
              <Clock className="h-4 w-4 text-accent" />
            </div>
            <h3 className="font-bold text-text-primary text-sm">Dedicated Dev Capacity</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Included developer hours every month for UI tweaks, campaign banner updates, speed tuning, and form revisions.
            </p>
          </div>
        </div>
      </div>

      {/* 3. The 4 Care Plans Pricing Cards */}
      <div id="care-matrix" className="space-y-12 border-t border-border pt-16">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <Badge variant="accent">Monthly Retainers</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary">
            The 4 Proactive Care Retainer Tiers
          </h2>
          <p className="text-text-muted text-sm sm:text-base">
            Select the SLA response and engineering capacity that matches your business criticality.
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
                        pkg.name
                      )}`}
                    >
                      Choose {pkg.name}
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
          Detailed SLA & Capability Comparison
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
                <td className="py-3 pr-4 font-sans font-semibold text-text-primary">Monthly Fee</td>
                <td className="py-3 px-4">৳ 8,000 ($80)</td>
                <td className="py-3 px-4 font-bold text-accent">৳ 18,000 ($180)</td>
                <td className="py-3 px-4">৳ 38,000 ($380)</td>
                <td className="py-3 pl-4">Custom Scope</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-sans font-semibold text-text-primary">Response SLA Guarantee</td>
                <td className="py-3 px-4">48 Hours</td>
                <td className="py-3 px-4 font-bold text-accent">24 Hours</td>
                <td className="py-3 px-4">4 Hours</td>
                <td className="py-3 pl-4 font-bold text-accent">1 Hour Emergency</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-sans font-semibold text-text-primary">Dedicated Dev Hours / Mo</td>
                <td className="py-3 px-4">0 Hours</td>
                <td className="py-3 px-4 font-bold text-accent">4 Hours</td>
                <td className="py-3 px-4">10 Hours</td>
                <td className="py-3 pl-4">20+ Hours</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-sans font-semibold text-text-primary">Uptime Monitoring Interval</td>
                <td className="py-3 px-4">15 Minutes</td>
                <td className="py-3 px-4 font-bold text-accent">5 Minutes</td>
                <td className="py-3 px-4">1 Minute</td>
                <td className="py-3 pl-4">Continuous Real-Time</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-sans font-semibold text-text-primary">Backup Frequency</td>
                <td className="py-3 px-4">Weekly</td>
                <td className="py-3 px-4 font-bold text-accent">Daily</td>
                <td className="py-3 px-4">Daily + On-demand</td>
                <td className="py-3 pl-4">Continuous Point-in-Time</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-sans font-semibold text-text-primary">Support Channel</td>
                <td className="py-3 px-4">Email Portal</td>
                <td className="py-3 px-4 font-bold text-accent">Email + WhatsApp</td>
                <td className="py-3 px-4">WhatsApp + Direct Phone</td>
                <td className="py-3 pl-4">Dedicated Slack / Team</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. What Is Covered vs What Is Excluded */}
      <div className="space-y-8 border-t border-border pt-12">
        <div className="max-w-2xl space-y-2">
          <Badge variant="accent">Scope Boundaries</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
            Retainer Tasks Covered vs Excluded
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-xl border border-accent/30 bg-surface/40 p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-accent flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-accent" />
              What Is Covered Under Retainers
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-text-muted">
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span>Fixing runtime bugs, layout breaks, and broken links</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span>Security vulnerability updates and npm package dependency auditing</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span>SSL certificate monitoring and renewal assistance</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span>Banner updates, price changes, and new product layout formatting (using dev hours)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span>Quarterly Core Web Vitals speed check and cache optimization</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-surface/20 p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-text-muted flex items-center gap-2">
              <XCircle className="h-5 w-5 text-text-muted" />
              What Is Excluded (Handled as Separate Sprints)
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-text-muted">
              <li className="flex items-start gap-2.5">
                <span className="text-border font-bold shrink-0 mt-0.5">—</span>
                <span>Complete website redesigns or migrating to an entirely new tech stack</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-border font-bold shrink-0 mt-0.5">—</span>
                <span>Creating complex new multi-step custom software features beyond retainer hours</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-border font-bold shrink-0 mt-0.5">—</span>
                <span>Graphic design from scratch or specialized promotional video shooting</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-border font-bold shrink-0 mt-0.5">—</span>
                <span>Third-party hosting/SaaS subscription fees (invoiced directly to client)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 6. FAQ */}
      <div className="space-y-8 border-t border-border pt-16">
        <div className="max-w-2xl space-y-2">
          <Badge variant="outline">Maintenance Inquiries</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
            Retainer Care FAQ
          </h2>
        </div>

        <div className="space-y-3 max-w-4xl">
          <AccordionItem
            title="Do unused monthly development hours roll over?"
            defaultOpen={true}
          >
            <p className="text-sm text-text-muted leading-relaxed">
              Unused hours from Business Care and Priority Care plans roll over for up to 60 days. This gives you flexibility to accumulate hours for seasonal product launches or quarterly feature updates.
            </p>
          </AccordionItem>

          <AccordionItem title="Can you maintain a website that wasn&apos;t built by Projukti Labs?">
            <p className="text-sm text-text-muted leading-relaxed">
              Yes, provided the application passes an initial Performance & Security Onboarding Audit. We review the codebase, remove critical technical debt, set up automated backup and monitoring pipelines, and then transition to monthly retainer care.
            </p>
          </AccordionItem>

          <AccordionItem title="Is there any long-term contract lock-in?">
            <p className="text-sm text-text-muted leading-relaxed">
              No. Our standard maintenance plans are billed monthly. You can upgrade, downgrade, or cancel with 30 days&apos; advance notice.
            </p>
          </AccordionItem>
        </div>
      </div>

      {/* 7. Bottom Conversion Banner */}
      <div className="rounded-2xl border border-accent/40 bg-surface/80 p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
          Protect Your Platform Today
        </h2>
        <p className="text-text-muted text-sm sm:text-base max-w-xl mx-auto">
          Enroll your website or commerce platform in an SLA-guaranteed care retainer.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary" asChild>
            <Link href="/get-a-quote?service=website-maintenance">
              Request Retainer Enrollment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Talk with Support Architect</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
