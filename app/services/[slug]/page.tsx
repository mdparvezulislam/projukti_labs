import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, ChevronRight, Check } from "lucide-react";
import { getCategoryBySlug } from "@/modules/services/data";
import { getCmsServiceBySlug } from "@/lib/cms";

export const instant = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  const service = await getCmsServiceBySlug(slug);

  if (category) {
    return {
      title: `${category.name} | Projukti Labs`,
      description: category.description,
    };
  }

  if (service) {
    return {
      title: `${service.name} | Projukti Labs`,
      description: service.description,
    };
  }

  return {
    title: "Service Not Found | Projukti Labs",
  };
}

export default async function GenericServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  const service = await getCmsServiceBySlug(slug);

  if (!category && !service) {
    notFound();
  }

  // If viewing a category detail
  if (category) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10 sm:space-y-12">
        <div className="max-w-3xl space-y-3.5">
          <div className="flex items-center gap-2">
            <Link href="/services" className="text-xs text-text-muted hover:text-accent">
              Services
            </Link>
            <ChevronRight className="h-3 w-3 text-border" />
            <span className="text-xs text-accent">{category.name}</span>
          </div>

          <Badge variant={category.status === "active" ? "accent" : "outline"}>
            {category.status === "active" ? "Active Service Vertical" : "Coming Soon"}
          </Badge>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-text-primary">
            {category.name}
          </h1>

          <p className="text-lg text-text-muted leading-relaxed">{category.description}</p>
        </div>

        {/* Services in this category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {category.services.map((srv) => (
            <Card key={srv.id} className="border-border bg-surface/40 flex flex-col justify-between">
              <CardHeader className="space-y-3">
                <Badge variant={srv.isFlagship ? "accent" : "outline"}>
                  {srv.isFlagship ? "★ Flagship Solution" : "Standard Package"}
                </Badge>
                <CardTitle className="text-2xl text-text-primary">{srv.name}</CardTitle>
                <CardDescription className="text-text-muted text-sm">{srv.tagline}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                  {srv.description}
                </p>

                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase text-text-primary">Technical Highlights:</p>
                  <ul className="space-y-1.5 text-xs text-text-muted">
                    {srv.technicalHighlights.slice(0, 3).map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <Button variant="primary" asChild className="w-full">
                    <Link href={`/services/${srv.slug}`}>
                      View Details &amp; Packages
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // If viewing a standard service detail
  if (service) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10 sm:space-y-12">
        <div className="max-w-3xl space-y-3.5">
          <div className="flex items-center gap-2">
            <Link href="/services" className="text-xs text-text-muted hover:text-accent">
              Services
            </Link>
            <ChevronRight className="h-3 w-3 text-border" />
            <Link href={`/services#${service.categorySlug}`} className="text-xs text-text-muted hover:text-accent">
              {service.categorySlug}
            </Link>
            <ChevronRight className="h-3 w-3 text-border" />
            <span className="text-xs text-accent">{service.name}</span>
          </div>

          <Badge variant={service.isFlagship ? "accent" : "outline"}>
            {service.isFlagship ? "★ Flagship Solution" : "Standard Package"}
          </Badge>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-text-primary">
            {service.name}
          </h1>

          <p className="text-lg text-text-muted leading-relaxed">{service.description}</p>
        </div>

        {/* Packages Grid */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-text-primary">Available Package Tiers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.packages.map((pkg) => (
              <Card key={pkg.id} className="border-border bg-surface/50 flex flex-col justify-between">
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg text-text-primary">{pkg.name}</span>
                    {pkg.popular && <Badge variant="accent">Popular</Badge>}
                  </div>
                  <div className="font-mono text-2xl font-bold text-accent">
                    {pkg.priceBdt ? `৳ ${pkg.priceBdt.toLocaleString()}` : "Custom Scope"}
                    {pkg.billingPeriod === "monthly" ? " / mo" : ""}
                  </div>
                  <CardDescription className="text-xs text-text-muted">
                    {pkg.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-2 text-xs text-text-muted border-t border-border/60 pt-4">
                    {pkg.deliverables.map((del, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <Check className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>

                  <Button variant="primary" asChild className="w-full">
                    <Link href={`/get-a-quote?service=${service.slug}&package=${encodeURIComponent(pkg.slug)}`}>
                      Select {pkg.name}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
