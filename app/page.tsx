import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AnimatedGradientBadge } from "@/components/ui/animated-gradient-badge";
import {
  ArrowRight,
  CheckCircle2,
  Globe,
  ShoppingCart,
  ShieldCheck,
  Zap,
  Code2,
  ChevronRight,
  Sparkles,
  Layers,
  Cpu,
  MessageSquare,
  FileCheck2,
} from "lucide-react";
import { getPageSections, getCmsPortfolio } from "@/lib/cms";
import { VERIFIED_PORTFOLIO_PROJECTS } from "@/lib/cms/seed";

export const metadata = {
  title: "Projukti Labs | Building Digital Solutions. Engineering the Future.",
  description:
    "Projukti Labs is a technology-focused digital solutions studio building modern websites, e-commerce platforms, business applications and practical software solutions.",
};

export default async function HomePage() {
  const homeSections = await getPageSections("home");
  const heroSection = homeSections.find((s) => s.sectionKey === "hero");
  const heroContent = (heroSection?.content as Record<string, string>) || {};
  const heroTitle = heroSection?.title || "Consistency and Engineering";
  const heroSubtitle =
    heroSection?.subtitle ||
    "Software is everywhere. We engineer what is rare: An Unmatched, High-Performance Software Engineering Experience with direct architect communication, fixed transparent pricing, modern Next.js architecture, and long-term technical support.";
  const badgeText = heroContent.badge || "PROFESSIONAL DIGITAL SOLUTIONS";
  const ctaPrimaryText = heroContent.ctaPrimaryText || "Start a Project";
  const ctaPrimaryLink = heroContent.ctaPrimaryLink || "/get-a-quote";
  const ctaSecondaryText = heroContent.ctaSecondaryText || "Explore Our Work";
  const ctaSecondaryLink = heroContent.ctaSecondaryLink || "/portfolio";

  // Section 2: Intro
  const introSection = homeSections.find((s) => s.sectionKey === "intro");
  const introTitle = introSection?.title || "Technology Built Around Your Business";
  const introSubtitle =
    introSection?.subtitle ||
    "We combine thoughtful design, reliable engineering and practical technology to build digital solutions that are useful, maintainable and built around real business needs.";

  // Section 5: Why Us
  const whyUsSection = homeSections.find((s) => s.sectionKey === "why_us");
  const whyTitle = whyUsSection?.title || "Engineering Discipline Over Agency Clichés";
  const whySubtitle =
    whyUsSection?.subtitle ||
    "We avoid bloated templates, hidden subcontracting, and artificial marketing claims. We build reliable software systems that work.";

  // Section 6: Process
  const processSection = homeSections.find((s) => s.sectionKey === "process");
  const processTitle = processSection?.title || "A Clear, Disciplined Development Process";
  const processSubtitle =
    processSection?.subtitle ||
    "From initial consultation to deployment and maintenance, every milestone is structured for clarity, speed, and reliability.";

  // Section 8: Final CTA
  const ctaSection = homeSections.find((s) => s.sectionKey === "cta");
  const ctaContent = (ctaSection?.content as Record<string, string>) || {};
  const ctaTitle = ctaSection?.title || "Have a Project in Mind?";
  const ctaSubtitle =
    ctaSection?.subtitle ||
    "Let's discuss your requirements and build a digital solution that works for your business. We typically reply within 24 business hours.";
  const ctaButtonText = ctaContent.buttonText || "Discuss Your Project";
  const ctaButtonLink = ctaContent.buttonLink || "/get-a-quote";
  const ctaSecText = ctaContent.secondaryText || "Contact Us";
  const ctaSecLink = ctaContent.secondaryLink || "/contact";

  // Fetch verified portfolio projects from CMS / fallback
  const cmsProjects = await getCmsPortfolio();
  const displayProjects = cmsProjects.length > 0 ? cmsProjects.slice(0, 4) : VERIFIED_PORTFOLIO_PROJECTS.slice(0, 4);

  return (
    <div className="flex flex-col gap-24 sm:gap-32 pb-24">
      {/* 1. Hero Section: ChaiCode Inspired Split Architecture */}
      <section className="relative pt-8 sm:pt-16 lg:pt-24 pb-8 sm:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Heading, Subtitle with highlighted quote, CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Animated Gradient Pill Badge */}
              <div className="inline-flex">
                <AnimatedGradientBadge chevron icon={<Sparkles className="h-3.5 w-3.5 text-brand-orange" />}>
                  {badgeText}
                </AnimatedGradientBadge>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-text-primary leading-[1.06]">
                {heroTitle.includes("and") ? (
                  <>
                    {heroTitle.split("and")[0]} <br />
                    <span className="text-text-primary">and {heroTitle.split("and")[1]?.trim()}</span>
                  </>
                ) : (
                  heroTitle
                )}
              </h1>

              <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl">
                {heroSubtitle.includes("An Unmatched") ? (
                  <>
                    Software is everywhere. We engineer what is rare:{" "}
                    <span className="text-accent-text font-semibold">
                      &ldquo;An Unmatched, High-Performance Software Engineering Experience&rdquo;
                    </span>{" "}
                    with direct architect communication, fixed transparent pricing, modern Next.js architecture, and long-term technical support.
                  </>
                ) : (
                  heroSubtitle
                )}
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Button size="lg" variant="primary" asChild className="rounded-xl px-6 h-12 shadow-warm-sm hover:shadow-warm-md text-sm font-bold">
                  <Link href={ctaPrimaryLink}>
                    {ctaPrimaryText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="rounded-xl px-6 h-12 bg-card/90 border-border hover:bg-surface-muted text-sm font-semibold">
                  <Link href={ctaSecondaryLink}>
                    {ctaSecondaryText}
                    <ChevronRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Column: Founder & Engineering Showcase with Soft Feathered Ambient Fade */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)] pb-8">
                {/* Showcase Card with Warm Depth */}
                <div className="rounded-3xl border border-border bg-card/95 p-6 sm:p-7 shadow-warm-lg backdrop-blur-md space-y-6">
                  {/* Founder Identity Header */}
                  <div className="flex items-center gap-4 border-b border-border/80 pb-5">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-brand-orange-strong to-brand-orange text-white font-black flex items-center justify-center text-2xl shadow-warm-sm shrink-0">
                      PI
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-text-primary tracking-tight">Md Parvezul Islam</h2>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Live Studio
                        </span>
                      </div>
                      <p className="text-xs text-accent-text font-semibold mt-0.5">
                        Founder &amp; Principal Software Architect
                      </p>
                      <p className="text-[11px] text-text-muted mt-0.5">
                        projuktilabs.tech · Serving Bangladesh &amp; Global Clients
                      </p>
                    </div>
                  </div>

                  {/* Architecture Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-border bg-surface-muted/50 p-3 space-y-1">
                      <div className="text-[10px] uppercase font-mono text-text-muted font-bold">Speed Target</div>
                      <div className="text-lg font-extrabold text-brand-orange-strong font-mono">&lt; 1.2s LCP</div>
                      <div className="text-[10px] text-text-muted">Edge optimized</div>
                    </div>
                    <div className="rounded-xl border border-border bg-surface-muted/50 p-3 space-y-1">
                      <div className="text-[10px] uppercase font-mono text-text-muted font-bold">Code Safety</div>
                      <div className="text-lg font-extrabold text-text-primary font-mono">100% Type-Safe</div>
                      <div className="text-[10px] text-text-muted">Strict TypeScript</div>
                    </div>
                    <div className="rounded-xl border border-border bg-surface-muted/50 p-3 space-y-1">
                      <div className="text-[10px] uppercase font-mono text-text-muted font-bold">Edge Network</div>
                      <div className="text-lg font-extrabold text-brand-orange-strong font-mono">300+ PoPs</div>
                      <div className="text-[10px] text-text-muted">Cloudflare Workers</div>
                    </div>
                    <div className="rounded-xl border border-border bg-surface-muted/50 p-3 space-y-1">
                      <div className="text-[10px] uppercase font-mono text-text-muted font-bold">Accessibility</div>
                      <div className="text-lg font-extrabold text-text-primary font-mono">WCAG 2.1 AA</div>
                      <div className="text-[10px] text-text-muted">Universal standard</div>
                    </div>
                  </div>

                  {/* Direct Channel SLA Box */}
                  <div className="rounded-xl border border-border bg-brand-orange-soft/40 p-3.5 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-text-primary">Direct Architectural Consultation</span>
                      <p className="text-[11px] text-text-secondary mt-0.5">24h initial Scope of Work (SOW) review</p>
                    </div>
                    <Link
                      href="/founder"
                      className="inline-flex items-center gap-1 font-bold text-accent-text hover:underline text-xs shrink-0 p-1"
                    >
                      Profile <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trending Solutions Row (Direct ChaiCode Section Pattern) */}
          <div className="pt-12 sm:pt-16 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 border-b border-border pb-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary">
                  Trending Solutions
                </h2>
                <p className="text-sm text-text-secondary mt-1">
                  Latest and most impactful engineering services that{" "}
                  <span className="text-accent-text font-semibold">
                    Combine Architectural Excellence
                  </span>{" "}
                  with real-world business results.
                </p>
              </div>
              <Link
                href="/services"
                className="text-xs font-bold text-text-primary hover:text-accent-text inline-flex items-center gap-1"
              >
                View All Services <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Introduction Section: Technology Built Around Your Business */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="accent">ABOUT PROJUKTI LABS</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
            {introTitle}
          </h2>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
            {introSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-2xl border border-border bg-card p-8 space-y-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none hover:shadow-md hover:border-border-hover transition-all duration-200">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange-soft text-brand-orange-strong dark:bg-accent/10 dark:text-accent">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-text-primary">Thoughtful Design</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Clean, intuitive interfaces created with purposeful typography and clear hierarchy. We focus on clarity and user experience, not visual clutter or unnecessary animations.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8 space-y-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none hover:shadow-md hover:border-border-hover transition-all duration-200">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange-soft text-brand-orange-strong dark:bg-accent/10 dark:text-accent">
              <Cpu className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-text-primary">Reliable Engineering</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Built on modern web technologies including Next.js, TypeScript, and edge cloud architectures. We write type-safe code designed for long-term stability and effortless maintenance.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8 space-y-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none hover:shadow-md hover:border-border-hover transition-all duration-200">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange-soft text-brand-orange-strong dark:bg-accent/10 dark:text-accent">
              <Layers className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-text-primary">Practical Solutions</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              We focus on solving practical business problems. From verified ad tracking to automated courier integrations, every feature has a clear operational purpose.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Services Section: What We Do */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
          <div className="space-y-3">
            <Badge variant="accent">WHAT WE DO</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
              Focused Digital Solutions
            </h2>
            <p className="text-text-secondary max-w-2xl text-base sm:text-lg">
              We focus our engineering on three active service areas to deliver well-engineered, reliable results for businesses and entrepreneurs.
            </p>
          </div>
          <Button variant="ghost" asChild className="self-start md:self-auto hover:text-brand-orange-strong dark:hover:text-accent">
            <Link href="/services" className="inline-flex items-center gap-1 font-semibold">
              Explore All Services
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Service 1: Web Development & Design */}
          <Card className="flex flex-col justify-between">
            <CardHeader className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange-soft text-brand-orange-strong dark:bg-accent/10 dark:text-accent">
                <Globe className="h-6 w-6" />
              </div>
              <div>
                <Badge variant="outline" className="mb-2">Active Service 01</Badge>
                <CardTitle className="text-2xl text-text-primary">Web Development &amp; Design</CardTitle>
                <CardDescription className="text-text-secondary mt-2">
                  Fast, responsive, modern websites and conversion landing pages engineered with Next.js and deployed to edge infrastructure.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-xl border border-border bg-surface-muted/60 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand-orange-strong dark:text-accent font-mono">Flagship Solution</span>
                  <Badge variant="accent" className="text-[10px]">High Demand</Badge>
                </div>
                <h3 className="font-bold text-text-primary text-sm">Landing Page with Meta Pixel</h3>
                <p className="text-xs text-text-secondary">
                  High-converting landing page with dual-layer Meta Pixel + Conversions API (CAPI) deduplication and sub-1.2s mobile loading.
                </p>
              </div>

              <ul className="space-y-2.5 text-xs text-text-secondary">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-orange-strong dark:text-accent shrink-0" />
                  <span>Sub-second mobile Core Web Vitals target</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-orange-strong dark:text-accent shrink-0" />
                  <span>Verified Meta Events Manager deduplication</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-orange-strong dark:text-accent shrink-0" />
                  <span>WCAG 2.1 AA accessible, responsive design</span>
                </li>
              </ul>

              <div className="pt-2">
                <Button variant="outline" asChild className="w-full bg-card">
                  <Link href="/services/landing-page-meta-pixel">
                    View Landing Page Solution
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Service 2: E-commerce & Digital Commerce */}
          <Card className="flex flex-col justify-between">
            <CardHeader className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange-soft text-brand-orange-strong dark:bg-accent/10 dark:text-accent">
                <ShoppingCart className="h-6 w-6" />
              </div>
              <div>
                <Badge variant="outline" className="mb-2">Active Service 02</Badge>
                <CardTitle className="text-2xl text-text-primary">E-commerce &amp; Digital Commerce</CardTitle>
                <CardDescription className="text-text-secondary mt-2">
                  Production-grade online store platforms with frictionless checkouts, local payment gateways, and automated courier APIs.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-xl border border-border bg-surface-muted/60 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand-orange-strong dark:text-accent font-mono">Flagship Solution</span>
                  <Badge variant="accent" className="text-[10px]">Commercial Scale</Badge>
                </div>
                <h3 className="font-bold text-text-primary text-sm">Complete E-commerce Website</h3>
                <p className="text-xs text-text-secondary">
                  Full store setup with bKash, Nagad, SSLCommerz, or Stripe checkout and automated parcel booking integrations.
                </p>
              </div>

              <ul className="space-y-2.5 text-xs text-text-secondary">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-orange-strong dark:text-accent shrink-0" />
                  <span>0% platform sales royalty fees from our studio</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-orange-strong dark:text-accent shrink-0" />
                  <span>Automated courier booking and SMS alerts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-orange-strong dark:text-accent shrink-0" />
                  <span>Optimized checkout flow to minimize cart abandonment</span>
                </li>
              </ul>

              <div className="pt-2">
                <Button variant="outline" asChild className="w-full bg-card">
                  <Link href="/services/complete-ecommerce-website">
                    View E-commerce Platform
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Service 3: Maintenance & Technical Support */}
          <Card className="flex flex-col justify-between">
            <CardHeader className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange-soft text-brand-orange-strong dark:bg-accent/10 dark:text-accent">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <Badge variant="outline" className="mb-2">Active Service 03</Badge>
                <CardTitle className="text-2xl text-text-primary">Maintenance &amp; Support</CardTitle>
                <CardDescription className="text-text-secondary mt-2">
                  Proactive care plans, 24/7 uptime monitoring, security patches, encrypted backups, and dedicated developer hours.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-xl border border-border bg-surface-muted/60 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand-orange-strong dark:text-accent font-mono">Flagship Solution</span>
                  <Badge variant="accent" className="text-[10px]">Guaranteed SLA</Badge>
                </div>
                <h3 className="font-bold text-text-primary text-sm">Website Maintenance Retainer</h3>
                <p className="text-xs text-text-secondary">
                  From basic health care to custom enterprise support with 1-hour to 48-hour response SLAs.
                </p>
              </div>

              <ul className="space-y-2.5 text-xs text-text-secondary">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-orange-strong dark:text-accent shrink-0" />
                  <span>Automated uptime and SSL monitoring alerts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-orange-strong dark:text-accent shrink-0" />
                  <span>Regular off-site backups and restore drills</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-orange-strong dark:text-accent shrink-0" />
                  <span>Dedicated developer hours for ongoing updates</span>
                </li>
              </ul>

              <div className="pt-2">
                <Button variant="outline" asChild className="w-full bg-card">
                  <Link href="/services/website-maintenance">
                    View Retainer Plans
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 4. Selected Projects Section (Portfolio) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
          <div className="space-y-3">
            <Badge variant="accent">OUR WORK</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
              Selected Projects &amp; Systems
            </h2>
            <p className="text-text-secondary max-w-2xl text-base sm:text-lg">
              Explore live platforms, internal developer engines, and software prototypes developed by Projukti Labs.
            </p>
          </div>
          <Button variant="ghost" asChild className="self-start md:self-auto hover:text-brand-orange-strong dark:hover:text-accent">
            <Link href="/portfolio" className="inline-flex items-center gap-1 font-semibold">
              View Full Portfolio
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayProjects.map((project) => {
            const badgeText = project.badge || "Live Platform";
            const badgeVariant = badgeText.toLowerCase().includes("live")
              ? "accent"
              : badgeText.toLowerCase().includes("development")
              ? "info"
              : "outline";

            return (
              <Card
                key={project.id}
                className="flex flex-col justify-between"
              >
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs text-brand-orange-strong dark:text-accent uppercase tracking-wider font-semibold">
                      {project.category}
                    </span>
                    <Badge variant={badgeVariant}>
                      {badgeText}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl text-text-primary">{project.title}</CardTitle>
                  <CardDescription className="text-text-secondary line-clamp-3 text-sm leading-relaxed">
                    {project.overview}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {project.stack && project.stack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.stack.slice(0, 5).map((tech: string) => (
                        <span
                          key={tech}
                          className="rounded-md border border-border bg-surface-muted/60 px-2.5 py-0.5 font-mono text-[11px] text-text-secondary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="pt-2 border-t border-border flex items-center justify-between">
                    <span className="text-xs text-text-muted font-medium">
                      {project.projectType || "Software System"}
                    </span>
                    <Button variant="ghost" size="sm" asChild className="text-brand-orange-strong dark:text-accent hover:text-brand-orange-strong p-0 font-semibold">
                      <Link href="/portfolio" className="inline-flex items-center gap-1 text-xs">
                        View Details
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 5. Why Work With Us (6 Pillars) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="accent">WHY PROJUKTI LABS</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
            {whyTitle}
          </h2>
          <p className="text-text-secondary text-base sm:text-lg">
            {whySubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-border bg-card p-6 space-y-3 shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none hover:shadow-md hover:border-border-hover transition-all duration-200">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-orange-soft text-brand-orange-strong dark:bg-accent/10 dark:text-accent">
              <MessageSquare className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-text-primary">Direct Technical Communication</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Speak directly with an engineer who understands your architecture and requirements. No non-technical middlemen or lost requirements.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 space-y-3 shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none hover:shadow-md hover:border-border-hover transition-all duration-200">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-orange-soft text-brand-orange-strong dark:bg-accent/10 dark:text-accent">
              <Code2 className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-text-primary">Modern Architecture</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Clean, maintainable codebases built with Next.js, TypeScript, and edge cloud technologies that scale smoothly as your business grows.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 space-y-3 shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none hover:shadow-md hover:border-border-hover transition-all duration-200">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-orange-soft text-brand-orange-strong dark:bg-accent/10 dark:text-accent">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-text-primary">Performance Focused</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Fast loading times, optimized asset delivery, and sub-second response benchmarks designed to keep visitors engaged and maximize conversions.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 space-y-3 shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none hover:shadow-md hover:border-border-hover transition-all duration-200">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-orange-soft text-brand-orange-strong dark:bg-accent/10 dark:text-accent">
              <Layers className="h-5 w-6" />
            </div>
            <h3 className="text-lg font-bold text-text-primary">Practical Solutions</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Features your business actually needs, avoiding unnecessary plugins, third-party bloat, and costly technical debt.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 space-y-3 shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none hover:shadow-md hover:border-border-hover transition-all duration-200">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-orange-soft text-brand-orange-strong dark:bg-accent/10 dark:text-accent">
              <FileCheck2 className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-text-primary">Transparent Process</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Clear scope of work, defined milestone deliverables, upfront pricing, and interactive staging previews before launch.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 space-y-3 shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none hover:shadow-md hover:border-border-hover transition-all duration-200">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-orange-soft text-brand-orange-strong dark:bg-accent/10 dark:text-accent">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-text-primary">Reliable Support</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Ongoing technical care, security updates, and automated backups after launch to keep your systems running smoothly.
            </p>
          </div>
        </div>
      </section>

      {/* 6. How We Work (Our 6-Step Process) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-4 max-w-2xl">
          <Badge variant="accent">OUR PROCESS</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
            {processTitle}
          </h2>
          <p className="text-text-secondary text-base">
            {processSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              title: "Discover",
              desc: "Understanding your business goals, target audience, technical requirements, and payment or integration needs.",
            },
            {
              step: "02",
              title: "Plan",
              desc: "Defining a clear scope of work, architectural blueprint, milestone schedule, and fixed budget estimate.",
            },
            {
              step: "03",
              title: "Design",
              desc: "Crafting intuitive, accessible interfaces adhering to WCAG 2.1 AA standards and your specific brand guidelines.",
            },
            {
              step: "04",
              title: "Develop",
              desc: "Building with type-safe TypeScript, Next.js, and edge databases, maintaining clean modular code throughout.",
            },
            {
              step: "05",
              title: "Deliver",
              desc: "Rigorous browser testing, telemetry verification, zero-downtime DNS migration, and production readiness checks.",
            },
            {
              step: "06",
              title: "Support",
              desc: "Continuous uptime monitoring, automated database backups, security patches, and ongoing technical maintenance.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="relative rounded-2xl border border-border bg-card p-6 space-y-3 shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none hover:shadow-md hover:border-border-hover transition-all duration-200"
            >
              <div className="font-mono text-xs font-bold text-brand-orange-strong dark:text-accent">{item.step}</div>
              <h3 className="text-lg font-bold text-text-primary">{item.title}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Founder & Leadership Spotlight */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-card/90 dark:bg-surface/60 p-8 sm:p-12 lg:p-16 shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:shadow-none backdrop-blur-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-6">
              <Badge variant="accent">FOUNDER &amp; LEADERSHIP</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
                Hands-on Software Leadership. Direct Communication with the Lead Architect.
              </h2>
              <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
                Projukti Labs is led by <strong>Md Parvezul Islam</strong>, Founder &amp; Principal Software Architect. When you partner with us, your system architecture, technical specifications, and code reviews are directly guided by a dedicated engineering lead.
              </p>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed italic border-l-2 border-brand-orange-strong dark:border-accent pl-4">
                &ldquo;I founded Projukti Labs to build technology that is honest, fast, and built around real business value—without unnecessary agency layers or inflated promises.&rdquo;
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <Button variant="outline" asChild className="bg-card">
                  <Link href="/founder">
                    Read Founder Profile
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/about">About Projukti Labs</Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 text-center space-y-4 shadow-md">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 border-brand-orange/40 dark:border-accent/40 bg-brand-orange-soft dark:bg-accent/10 font-mono text-3xl font-extrabold text-brand-orange-strong dark:text-accent">
                  PI
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary">Md Parvezul Islam</h3>
                  <p className="text-xs text-brand-orange-strong dark:text-accent uppercase tracking-wider font-semibold mt-1">
                    Founder &amp; Principal Software Architect
                  </p>
                  <p className="text-xs text-text-secondary mt-2">
                    System Architecture · Edge Computing · Next.js · Cloud Infrastructure
                  </p>
                </div>
                <div className="pt-2 border-t border-border flex justify-center gap-2">
                  <Badge variant="outline" className="text-[10px]">Verified Technical Lead</Badge>
                  <Badge variant="outline" className="text-[10px]">projuktilabs.tech</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Final CTA Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-brand-orange/30 dark:border-accent/40 bg-card/95 dark:bg-surface/90 p-8 sm:p-14 text-center space-y-6 shadow-lg backdrop-blur-xs">
          <div className="mx-auto max-w-2xl space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary">
              {ctaTitle}
            </h2>
            <p className="text-text-secondary text-base sm:text-lg">
              {ctaSubtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button size="lg" variant="primary" asChild className="w-full sm:w-auto shadow-sm">
              <Link href={ctaButtonLink}>
                {ctaButtonText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto bg-card">
              <Link href={ctaSecLink}>{ctaSecText}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
