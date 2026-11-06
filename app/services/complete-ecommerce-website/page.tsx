import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { AccordionItem } from "@/components/ui/accordion";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  ShoppingCart,
  CreditCard,
  Truck,
  Check,
  Database,
  Smartphone,
  Coins,
} from "lucide-react";
import { getServiceBySlug } from "@/modules/services/data";

export const metadata = {
  title: "Complete E-commerce Website Platform | Projukti Labs",
  description:
    "Production-ready e-commerce platforms with bKash, Nagad, SSLCommerz, and Stripe payments, automated courier dispatch, and zero revenue commission.",
};

export default function CompleteEcommercePage() {
  const service = getServiceBySlug("complete-ecommerce-website");
  const packages = service?.packages || [];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-24">
      {/* 1. Hero Section */}
      <div className="max-w-4xl space-y-6">
        <div className="inline-flex items-center gap-2">
          <Badge variant="accent">Flagship Vertical</Badge>
          <Badge variant="outline">E-commerce & Digital Commerce</Badge>
          <span className="font-mono text-xs text-accent">0% Platform Revenue Fees</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.1]">
          Complete Production-Ready{" "}
          <span className="text-accent underline decoration-accent/40 decoration-wavy">
            E-commerce Platform
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-text-muted leading-relaxed max-w-3xl">
          A high-performance digital commerce engine engineered for speed, frictionless checkout, and effortless order fulfillment. Complete with local (bKash, Nagad, SSLCommerz) and international (Stripe) payment integrations.
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <Button size="lg" variant="primary" asChild>
            <Link href="/get-a-quote?service=complete-ecommerce-website&package=Growth+Storefront">
              Get Started with Growth Storefront
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#pricing-tiers">Compare Commerce Packages</Link>
          </Button>
        </div>
      </div>

      {/* 2. Visual Commerce Architecture Diagram */}
      <div className="rounded-2xl border border-border bg-surface/40 p-6 sm:p-10 space-y-8">
        <div className="space-y-2 max-w-2xl">
          <Badge variant="accent">Platform Architecture</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
            End-to-End Commerce Flow & Integration
          </h2>
          <p className="text-xs sm:text-sm text-text-muted">
            Engineered to eliminate checkout friction, automate fulfillment, and keep your data private.
          </p>
        </div>

        {/* 5 Architecture Modules */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="rounded-xl border border-border/80 bg-background/80 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">MODULE 01</span>
              <Smartphone className="h-4 w-4 text-text-muted" />
            </div>
            <h3 className="font-bold text-text-primary text-sm">Ultra-Fast Storefront</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Instant product browsing, multi-category filters, search autocomplete, and responsive mobile-first UI.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-background/80 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">MODULE 02</span>
              <ShoppingCart className="h-4 w-4 text-accent" />
            </div>
            <h3 className="font-bold text-text-primary text-sm">2-Step Checkout</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Sub-100ms cart updates, guest checkout support, address memory, and coupon code calculation.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-background/80 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">MODULE 03</span>
              <CreditCard className="h-4 w-4 text-text-muted" />
            </div>
            <h3 className="font-bold text-text-primary text-sm">Payment Gateways</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Native bKash PGW, Nagad, SSLCommerz, and Stripe integration with automated webhook payment verification.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-background/80 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">MODULE 04</span>
              <Truck className="h-4 w-4 text-accent" />
            </div>
            <h3 className="font-bold text-text-primary text-sm">Automated Dispatch</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              One-click parcel creation via Steadfast/Pathao API, automated tracking code, and transactional SMS alerts.
            </p>
          </div>

          <div className="rounded-xl border border-accent/60 bg-accent/5 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">MODULE 05</span>
              <Database className="h-4 w-4 text-accent" />
            </div>
            <h3 className="font-bold text-text-primary text-sm">Admin Control Center</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Real-time inventory levels, order status updates, printable invoice PDFs, and revenue telemetry.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Honest Third-Party Fee Transparency */}
      <div className="rounded-xl border border-border bg-surface/30 p-6 sm:p-8 space-y-6">
        <div className="space-y-2 max-w-2xl">
          <Badge variant="outline">Radical Transparency</Badge>
          <h3 className="text-2xl font-bold text-text-primary">
            Third-Party Operating Costs & Payment Fees
          </h3>
          <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
            Unlike closed SaaS platforms that quietly charge 1%–2% on every sale, Projukti Labs charges <strong>0% ongoing sales commission</strong>. You own your store completely.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="rounded-lg border border-border/80 bg-background/60 p-4 space-y-2">
            <h4 className="font-bold text-text-primary text-sm flex items-center gap-2">
              <Coins className="h-4 w-4 text-accent" />
              Payment Gateway Fees
            </h4>
            <p className="text-xs text-text-muted leading-relaxed">
              Transaction merchant fees (~1.5% for bKash, ~2%–2.5% for SSLCommerz, ~2.9% + 30¢ for Stripe) are settled directly between you and the payment provider. Zero middleman markup.
            </p>
          </div>

          <div className="rounded-lg border border-border/80 bg-background/60 p-4 space-y-2">
            <h4 className="font-bold text-text-primary text-sm flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-accent" />
              SMS Notification Credits
            </h4>
            <p className="text-xs text-text-muted leading-relaxed">
              Transactional order SMS credits (typically ~৳ 0.25 to ৳ 0.40 per SMS in Bangladesh) are purchased directly from your preferred telecom aggregator (e.g. Greenweb, BulkSMSBD).
            </p>
          </div>

          <div className="rounded-lg border border-border/80 bg-background/60 p-4 space-y-2">
            <h4 className="font-bold text-text-primary text-sm flex items-center gap-2">
              <Truck className="h-4 w-4 text-accent" />
              Courier Fulfillment Costs
            </h4>
            <p className="text-xs text-text-muted leading-relaxed">
              Courier parcel delivery fees and Cash-on-Delivery (COD) reconciliation charges are paid directly to your contracted courier partner (Steadfast, Pathao, RedX, or eCourier).
            </p>
          </div>
        </div>
      </div>

      {/* 4. Deliverables vs Exclusions Breakdown */}
      <div className="space-y-8 border-t border-border pt-12">
        <div className="max-w-2xl space-y-2">
          <Badge variant="accent">Scope Boundaries</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
            Included Platform Deliverables vs Exclusions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Deliverables */}
          <div className="rounded-xl border border-accent/30 bg-surface/40 p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-accent flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-accent" />
              What We Deliver
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-text-muted">
              {service?.deliverables.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Exclusions */}
          <div className="rounded-xl border border-border bg-surface/20 p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-text-muted flex items-center gap-2">
              <XCircle className="h-5 w-5 text-text-muted" />
              What Is Excluded
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-text-muted">
              {service?.exclusions.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-border font-bold shrink-0 mt-0.5">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 5. Pricing Tiers */}
      <div id="pricing-tiers" className="space-y-12 border-t border-border pt-16">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <Badge variant="accent">Commerce Packages</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary">
            E-commerce Platform Packages
          </h2>
          <p className="text-text-muted text-sm sm:text-base">
            Fixed milestone investments. Launch with complete code ownership and zero monthly royalties.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              className={`flex flex-col justify-between border-border bg-surface/50 ${
                pkg.popular ? "ring-2 ring-accent border-accent/40" : ""
              }`}
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg text-text-primary">{pkg.name}</span>
                  {pkg.popular && <Badge variant="accent">Best Value</Badge>}
                </div>
                <div className="space-y-1">
                  <div className="font-mono text-3xl font-extrabold text-accent">
                    {pkg.priceBdt ? `৳ ${pkg.priceBdt.toLocaleString()}` : "Custom Scope"}
                  </div>
                  <div className="text-xs text-text-muted font-mono">
                    {pkg.priceUsd ? `or $${pkg.priceUsd} USD` : "Tailored enterprise scope"} · Complete ownership
                  </div>
                </div>
                <CardDescription className="text-xs text-text-muted leading-relaxed">
                  {pkg.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-2 border-t border-border/60 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-text-primary">
                    Included Capabilities:
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
                    className="w-full"
                  >
                    <Link
                      href={`/get-a-quote?service=complete-ecommerce-website&package=${encodeURIComponent(
                        pkg.name
                      )}`}
                    >
                      Select {pkg.name}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 6. Service FAQ */}
      <div className="space-y-8 border-t border-border pt-16">
        <div className="max-w-2xl space-y-2">
          <Badge variant="outline">Commerce Inquiries</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
            E-commerce Platform FAQ
          </h2>
        </div>

        <div className="space-y-3 max-w-4xl">
          <AccordionItem
            title="How do you handle bKash and Nagad payments?"
            defaultOpen={true}
          >
            <p className="text-sm text-text-muted leading-relaxed">
              We integrate the official bKash Payment Gateway (PGW) and Nagad Merchant API. Customers enter their wallet number, verify with an OTP directly in the secure payment interface, and return to your store with instant order confirmation. Orders are marked as &apos;Paid&apos; automatically via secure server webhooks.
            </p>
          </AccordionItem>

          <AccordionItem title="Can we accept both local Bangladeshi Taka and international USD?">
            <p className="text-sm text-text-muted leading-relaxed">
              Yes. In our Growth and Scale packages, we can enable dual currency support: local customers pay in BDT via bKash/Nagad/SSLCommerz, while international visitors pay in USD/EUR via Stripe.
            </p>
          </AccordionItem>

          <AccordionItem title="Do you provide maintenance after the store is launched?">
            <p className="text-sm text-text-muted leading-relaxed">
              Every commerce platform build includes a 30-day technical warranty covering bug fixes and payment gateway verification. For ongoing security patches, automated backups, and seasonal sale optimizations, we recommend our monthly Business Care or Priority Care retainer plans.
            </p>
          </AccordionItem>
        </div>
      </div>

      {/* 7. Bottom Conversion Banner */}
      <div className="rounded-2xl border border-accent/40 bg-surface/80 p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
          Ready to Launch Your High-Performance Store?
        </h2>
        <p className="text-text-muted text-sm sm:text-base max-w-xl mx-auto">
          Request an official project quotation or consult with our engineering team on payment gateway workflows.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary" asChild>
            <Link href="/get-a-quote?service=complete-ecommerce-website">
              Request E-commerce Quotation
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
