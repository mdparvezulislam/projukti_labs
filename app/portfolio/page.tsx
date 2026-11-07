import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowRight, Info, ExternalLink, Layers, CheckCircle2 } from "lucide-react";
import { getCmsPortfolio } from "@/lib/cms";
import { VERIFIED_PORTFOLIO_PROJECTS } from "@/lib/cms/seed";

export const metadata = {
  title: "Portfolio & Engineering Work | Projukti Labs",
  description:
    "Explore our portfolio of verified digital platforms, developer utilities, and software prototypes developed by Projukti Labs.",
};

export default async function PortfolioPage() {
  const dbProjects = await getCmsPortfolio();

  const projects =
    dbProjects.length > 0
      ? dbProjects.map((p) => ({
          id: p.id,
          title: p.title,
          category: p.category,
          badge: p.badge || "Live Platform",
          projectType: p.projectType || "Software System",
          overview: p.overview,
          metrics: p.metrics || [],
          stack: p.stack || [],
          deliverables: p.deliverables || [],
          linkText: p.linkText || "View Details",
          linkUrl: p.linkUrl || "/portfolio",
        }))
      : VERIFIED_PORTFOLIO_PROJECTS;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10 sm:space-y-14">
      {/* 1. Header */}
      <div className="max-w-3xl space-y-3.5">
        <div className="inline-flex items-center gap-2">
          <Badge variant="accent">PORTFOLIO &amp; SYSTEMS</Badge>
          <Badge variant="outline">{projects.length} Verified Projects</Badge>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-text-primary">
          Our Work &amp; Engineering Systems
        </h1>
        <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
          We believe in transparent, verifiable engineering. Below is an inventory of active platforms, internal
          developer utilities, and software prototypes designed and built by Projukti Labs.
        </p>

        {/* Ethical Transparency Notice */}
        <div className="mt-3 flex items-start gap-2.5 rounded-2xl border border-border bg-surface-muted/70 p-4 text-xs text-text-secondary leading-relaxed shadow-2xs">
          <Info className="h-4 w-4 text-brand-orange-strong dark:text-accent shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-text-primary">Portfolio Transparency Note: </span>
            To protect client privacy and uphold strict professional integrity, our public portfolio showcases verified
            founder-owned products, internal engines, and prototypes. Founder-owned systems are explicitly marked as such
            and never misrepresented as external client work.
          </div>
        </div>
      </div>

      {/* 2. Projects Grid */}
      <div className="space-y-8 sm:space-y-10">
        {projects.map((project) => {
          const badgeText = project.badge || "Live Platform";
          const badgeVariant = badgeText.toLowerCase().includes("live")
            ? "accent"
            : badgeText.toLowerCase().includes("development")
            ? "info"
            : "outline";

          return (
            <Card
              key={project.id}
              id={project.id}
              className="border-border bg-card shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none hover:shadow-md hover:border-border-hover transition-all duration-200 overflow-hidden"
            >
              <div className="p-4 sm:p-7 space-y-6">
                {/* Title & Metadata Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4 sm:pb-5">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant={badgeVariant}>{badgeText}</Badge>
                      <Badge variant="outline">{project.category}</Badge>
                      <span className="text-xs font-mono text-text-muted">
                        Classification: {project.projectType}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-text-primary">
                      {project.title}
                    </h2>
                  </div>

                  {project.linkUrl && (
                    <Button variant="outline" size="sm" asChild className="self-start sm:self-center bg-card min-h-[40px]">
                      <a
                        href={project.linkUrl}
                        target={project.linkUrl.startsWith("http") ? "_blank" : undefined}
                        rel={project.linkUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-2"
                      >
                        <span>{project.linkText || "View Project"}</span>
                        {project.linkUrl.startsWith("http") ? (
                          <ExternalLink className="h-3.5 w-3.5" />
                        ) : (
                          <ArrowRight className="h-3.5 w-3.5" />
                        )}
                      </a>
                    </Button>
                  )}
                </div>

                {/* Overview */}
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  {project.overview}
                </p>

                {/* Metrics Grid */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-xl border border-border bg-surface-muted/60 p-4">
                    {project.metrics.map((metric, idx) => (
                      <div key={idx} className="space-y-1 text-center">
                        <p className="font-mono text-base sm:text-lg font-bold text-brand-orange-strong dark:text-accent">
                          {metric.value}
                        </p>
                        <p className="text-[11px] uppercase tracking-wider text-text-muted font-medium">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Stack & Key Deliverables */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
                  {/* Tech Stack */}
                  <div className="md:col-span-5 space-y-3">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-text-primary font-semibold flex items-center gap-2">
                      <Layers className="h-3.5 w-3.5 text-brand-orange-strong dark:text-accent" />
                      Verified Architecture &amp; Stack
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack?.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-xs text-text-secondary shadow-2xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Capabilities */}
                  <div className="md:col-span-7 space-y-3">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-text-primary font-semibold flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-brand-orange-strong dark:text-accent" />
                      Key Features &amp; Deliverables
                    </h3>
                    <ul className="space-y-2 text-xs sm:text-sm text-text-secondary">
                      {project.deliverables?.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-brand-orange-strong dark:text-accent font-bold mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* 3. Conversion Banner */}
      <div className="rounded-3xl border border-brand-orange/30 dark:border-accent/40 bg-card/95 dark:bg-surface/80 p-8 sm:p-12 text-center space-y-6 shadow-md backdrop-blur-xs">
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
          Need a Custom Software Solution for Your Business?
        </h2>
        <p className="text-text-secondary text-sm sm:text-base max-w-xl mx-auto">
          We engineer scalable e-commerce platforms, conversion funnels, and business utilities tailored to your
          operational workflows.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary" asChild className="shadow-xs">
            <Link href="/get-a-quote">
              Start a Project
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild className="bg-card">
            <Link href="/contact">Contact Our Lead Architect</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
