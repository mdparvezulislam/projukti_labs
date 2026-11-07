import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { getFutureCategories } from "@/modules/services/data";
import { getCmsServices } from "@/lib/cms";

export const metadata = {
  title: "Services & Solutions | Projukti Labs",
  description:
    "Explore our core engineering services: Web Development & Design, E-commerce & Digital Commerce, and Proactive Website Maintenance & Technical Support.",
};

export default async function ServicesPage() {
  const allCategories = await getCmsServices();
  const activeCategories = allCategories.filter((c) => c.status === "active");
  const futureCategories = getFutureCategories();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12 sm:space-y-16">
      {/* 1. Hero Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2">
          <Badge variant="accent">ACTIVE SERVICES</Badge>
          <Badge variant="outline">3 Core Verticals</Badge>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-text-primary leading-tight">
          Engineering Services &amp; Digital Solutions
        </h1>
        <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
          We deliver scoped, milestone-based software engineering services with transparent pricing and no unexpected
          fees. Every engagement includes clear deliverables, technical specifications, and post-launch support.
        </p>
      </div>

      {/* 2. Active Service Categories */}
      <div className="space-y-10 sm:space-y-14">
        {activeCategories.map((cat, catIdx) => (
          <div
            key={cat.id}
            id={cat.slug}
            className="rounded-2xl sm:rounded-3xl border border-border bg-card/90 dark:bg-surface/30 p-5 sm:p-8 space-y-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-none"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-brand-orange-strong dark:text-accent">Service Vertical 0{catIdx + 1}</span>
                  <Badge variant="accent">Active</Badge>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-primary">{cat.name}</h2>
                <p className="text-xs sm:text-sm text-text-secondary max-w-2xl">{cat.description}</p>
              </div>

              <Button variant="outline" asChild className="self-start sm:self-center bg-card min-h-[44px]">
                <Link href={`/get-a-quote?service=${cat.services[0]?.slug || cat.slug}`}>
                  Request Category Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Services inside this category */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
              {cat.services.map((srv) => (
                <Card
                  key={srv.id}
                  className={`flex flex-col justify-between ${srv.isFlagship ? "ring-1 ring-brand-orange/40 dark:ring-accent/30" : ""
                    }`}
                >
                  <CardHeader className="space-y-2.5 p-5 sm:p-6">
                    <div className="flex items-center justify-between">
                      {srv.isFlagship ? (
                        <Badge variant="accent">★ Flagship Solution</Badge>
                      ) : (
                        <Badge variant="outline">Standard Package</Badge>
                      )}
                      <span className="font-mono text-xs text-text-muted">
                        {srv.packages.length} Package Tier{srv.packages.length > 1 ? "s" : ""}
                      </span>
                    </div>

                    <CardTitle className="text-lg sm:text-xl text-text-primary">{srv.name}</CardTitle>
                    <CardDescription className="text-xs sm:text-sm text-text-secondary">
                      {srv.tagline}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4 p-5 sm:p-6 pt-0 sm:pt-0">
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                      {srv.description}
                    </p>

                    {/* Technical Highlights */}
                    <div className="space-y-1.5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-text-primary">
                        Technical Highlights:
                      </p>
                      <ul className="space-y-1 text-xs text-text-secondary">
                        {srv.technicalHighlights.slice(0, 3).map((th, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="h-3.5 w-3.5 text-brand-orange-strong dark:text-accent shrink-0 mt-0.5" />
                            <span>{th}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Pricing Tiers Preview */}
                    <div className="rounded-xl border border-border bg-surface-muted/60 p-4 space-y-3">
                      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-text-muted">
                        <span>Packages</span>
                        <span>Starting At</span>
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
                            <span className="font-mono font-bold text-brand-orange-strong dark:text-accent">
                              {pkg.priceBdt ? `৳ ${pkg.priceBdt.toLocaleString()}` : "Custom Scope"}
                              {pkg.billingPeriod === "monthly" ? " / mo" : ""}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      {srv.isFlagship ? (
                        <Button variant="primary" asChild className="w-full shadow-xs">
                          <Link href={`/services/${srv.slug}`}>
                            View Details &amp; Packages
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      ) : (
                        <Button variant="outline" asChild className="w-full bg-card">
                          <Link href={`/get-a-quote?service=${srv.slug}`}>
                            Request Quote
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

      {/* 3. Future Categories (Roadmap / Pipeline) */}
      <div className="space-y-6 border-t border-border pt-10 sm:pt-12">
        <div className="max-w-3xl space-y-2">
          <Badge variant="outline">ROADMAP</Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary">
            Future Capabilities &amp; Pipeline
          </h2>
          <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
            Committed to engineering excellence, these areas are currently part of our strategic research pipeline.
            They are not offered as active commercial services during initial launch.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {futureCategories.map((future) => (
            <div
              key={future.id}
              className="rounded-2xl border border-dashed border-border bg-card/70 dark:bg-surface/20 p-5 space-y-2.5 shadow-2xs hover:border-border-hover transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-text-muted uppercase font-medium">In Research</span>
                <Badge variant="outline" className="text-[10px] text-text-muted">
                  Coming Soon
                </Badge>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-text-primary">{future.name}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{future.tagline}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Custom Scope CTA Banner */}
      <div className="rounded-2xl sm:rounded-3xl border border-brand-orange/30 dark:border-accent/40 bg-card/95 dark:bg-surface/80 p-6 sm:p-10 text-center space-y-5 shadow-md backdrop-blur-xs">
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
          Need a Custom Engineering Scope?
        </h2>
        <p className="text-text-secondary text-xs sm:text-sm max-w-xl mx-auto">
          If your project requirements span multiple technical domains or demand custom architecture, we are ready to
          review your technical specifications.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-1">
          <Button variant="primary" asChild className="shadow-xs min-h-[44px]">
            <Link href="/get-a-quote">
              Request a Custom Quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild className="bg-card min-h-[44px]">
            <Link href="/contact">Schedule Technical Discussion</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
