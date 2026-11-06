import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { getActiveCategories, getFutureCategories } from "@/modules/services/data";

export const metadata = {
  title: "Services & Solutions | Projukti Labs",
  description:
    "Explore our focused launch service catalog: Web Development, E-commerce Platforms, and SLA Maintenance Retainers.",
};

export default function ServicesPage() {
  const activeCategories = getActiveCategories();
  const futureCategories = getFutureCategories();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-24">
      {/* Hero Header */}
      <div className="max-w-3xl space-y-6">
        <div className="inline-flex items-center gap-2">
          <Badge variant="accent">Launch Service Catalog</Badge>
          <Badge variant="outline">3 Active Verticals</Badge>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary leading-tight">
          Productized Engineering Services & Transparent Solutions
        </h1>
        <p className="text-lg sm:text-xl text-text-muted leading-relaxed">
          We deliver fixed-scope, milestone-driven software services with zero hidden surprises. Every package includes clear deliverables, technical specifications, and post-launch support.
        </p>
      </div>

      {/* Active Service Categories Deep-Dive */}
      <div className="space-y-20">
        {activeCategories.map((cat, catIdx) => (
          <div
            key={cat.id}
            id={cat.slug}
            className="rounded-2xl border border-border bg-surface/30 p-6 sm:p-10 space-y-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-accent">VERTICAL 0{catIdx + 1}</span>
                  <Badge variant="accent">Active at Launch</Badge>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary">{cat.name}</h2>
                <p className="text-sm text-text-muted max-w-2xl">{cat.description}</p>
              </div>

              <Button variant="outline" asChild className="self-start sm:self-center">
                <Link href={`/get-a-quote?service=${cat.services[0]?.slug || cat.slug}`}>
                  Quote for this Vertical
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Services inside this category */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {cat.services.map((srv) => (
                <Card
                  key={srv.id}
                  className={`flex flex-col justify-between border-border bg-surface/50 ${
                    srv.isFlagship ? "ring-1 ring-accent/30" : ""
                  }`}
                >
                  <CardHeader className="space-y-3">
                    <div className="flex items-center justify-between">
                      {srv.isFlagship ? (
                        <Badge variant="accent">★ Flagship Special Solution</Badge>
                      ) : (
                        <Badge variant="outline">Standard Package</Badge>
                      )}
                      <span className="font-mono text-xs text-text-muted">{srv.packages.length} Tier Options</span>
                    </div>

                    <CardTitle className="text-xl sm:text-2xl text-text-primary">{srv.name}</CardTitle>
                    <CardDescription className="text-xs sm:text-sm text-text-muted">
                      {srv.tagline}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                      {srv.description}
                    </p>

                    {/* Technical Highlights */}
                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-wider text-text-primary">
                        Engineering Highlights:
                      </p>
                      <ul className="space-y-1.5 text-xs text-text-muted">
                        {srv.technicalHighlights.slice(0, 3).map((th, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                            <span>{th}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Pricing Tiers Preview */}
                    <div className="rounded-lg border border-border/60 bg-background/60 p-4 space-y-3">
                      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-text-muted">
                        <span>Available Tiers</span>
                        <span>Investment Starting From</span>
                      </div>
                      <div className="space-y-2">
                        {srv.packages.map((pkg) => (
                          <div
                            key={pkg.id}
                            className="flex items-center justify-between text-xs border-b border-border/40 pb-1.5 last:border-none last:pb-0"
                          >
                            <span className="font-medium text-text-primary">
                              {pkg.name} {pkg.popular ? "★" : ""}
                            </span>
                            <span className="font-mono font-semibold text-accent">
                              {pkg.priceBdt ? `৳ ${pkg.priceBdt.toLocaleString()}` : "Custom Scope"}
                              {pkg.billingPeriod === "monthly" ? " / mo" : ""}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      {srv.isFlagship ? (
                        <Button variant="primary" asChild className="w-full">
                          <Link href={`/services/${srv.slug}`}>
                            View Full Architecture & Packages
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      ) : (
                        <Button variant="outline" asChild className="w-full">
                          <Link href={`/get-a-quote?service=${srv.slug}`}>
                            Get a Quote for this Service
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Future Categories (Coming Soon / Pipeline) */}
      <div className="space-y-8 border-t border-border pt-16">
        <div className="max-w-3xl space-y-3">
          <Badge variant="outline">Strategic Roadmap</Badge>
          <h2 className="text-3xl font-extrabold text-text-primary">
            Future Capabilities & Expansion Pipeline
          </h2>
          <p className="text-text-muted text-sm sm:text-base leading-relaxed">
            In adherence to our discipline of engineering excellence, the following disciplines are currently in strategic research and pipeline expansion. They are not active sales offerings for launch.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {futureCategories.map((future) => (
            <div
              key={future.id}
              className="rounded-xl border border-dashed border-border/80 bg-surface/20 p-6 space-y-3 opacity-80 hover:opacity-100 transition-opacity"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-text-muted uppercase">In Pipeline</span>
                <Badge variant="outline" className="text-[10px] text-text-muted">Coming Soon</Badge>
              </div>
              <h3 className="text-lg font-bold text-text-primary">{future.name}</h3>
              <p className="text-xs text-text-muted leading-relaxed">{future.tagline}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="rounded-2xl border border-accent/40 bg-surface/80 p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
          Need a Custom Tailored Engineering Scope?
        </h2>
        <p className="text-text-muted text-sm sm:text-base max-w-xl mx-auto">
          If your project requirements span across multiple disciplines or require bespoke infrastructure, we are ready to review your specifications.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary" asChild>
            <Link href="/get-a-quote">
              Request Custom Quotation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Schedule Technical Call</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
