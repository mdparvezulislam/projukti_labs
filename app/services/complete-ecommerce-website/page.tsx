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
  title: "Complete E-commerce Platform | Projukti Labs",
  description:
    "Production-grade e-commerce solutions with bKash, Nagad, SSLCommerz, and Stripe payment gateways, automated courier APIs, and 0% studio sales royalty.",
};

export default function CompleteEcommercePage() {
  const service = getServiceBySlug("complete-ecommerce-website");
  const packages = service?.packages || [];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12 sm:space-y-16">
      {/* 1. Hero Section */}
      <div className="max-w-4xl space-y-4 sm:space-y-5">
        <div className="inline-flex items-center gap-2">
          <Badge variant="accent">FLAGSHIP SOLUTION</Badge>
          <Badge variant="outline">E-commerce &amp; Digital Commerce</Badge>
          <span className="font-mono text-xs text-accent">0% Platform Sales Royalty</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.1]">
          Complete Production-Ready{" "}
          <span className="text-accent underline decoration-accent/40 decoration-wavy">
            E-commerce Platform
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-text-muted leading-relaxed max-w-3xl">
          A high-speed digital commerce engine engineered for instant product browsing, frictionless 2-step checkouts,
          and automated courier booking. Complete with local mobile payments (bKash, Nagad, SSLCommerz) and
          international card processing (Stripe).
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <Button size="lg" variant="primary" asChild>
            <Link href="/get-a-quote?service=complete-ecommerce-website&package=growth-storefront">
              Start with Growth Storefront
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
          <Badge variant="accent">COMMERCE ARCHITECTURE</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
            End-to-End Commerce Flow &amp; Integrations
          </h2>
          <p className="text-xs sm:text-sm text-text-muted">
            Engineered to minimize cart abandonment, automate shipping logistics, and keep customer data secure.
          </p>
        </div>

        {/* 5 Architecture Modules */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="rounded-xl border border-border/80 bg-background/80 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">Module 01</span>
              <Smartphone className="h-4 w-4 text-text-muted" />
            </div>
            <h3 className="font-bold text-text-primary text-sm">Ultra-Fast Storefront</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Instant category filtering, search auto-complete, and mobile-first product cards optimized for conversion.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-background/80 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">Module 02</span>
              <ShoppingCart className="h-4 w-4 text-accent" />
            </div>
            <h3 className="font-bold text-text-primary text-sm">2-Step Checkout Flow</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Sub-100ms cart updates, frictionless guest checkout, saved customer details, and automated coupon rules.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-background/80 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">Module 03</span>
              <CreditCard className="h-4 w-4 text-text-muted" />
            </div>
            <h3 className="font-bold text-text-primary text-sm">Payment Gateways</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              bKash PGW, Nagad, SSLCommerz, and Stripe connected directly to your merchant account with verified webhooks.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-background/80 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">Module 04</span>
              <Truck className="h-4 w-4 text-accent" />
            </div>
            <h3 className="font-bold text-text-primary text-sm">Automated Courier API</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              One-click parcel dispatch to Pathao and Steadfast, automatic tracking number generation, and SMS alerts.
            </p>
          </div>

          <div className="rounded-xl border border-accent/60 bg-accent/5 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">Module 05</span>
              <Database className="h-4 w-4 text-accent" />
            </div>
            <h3 className="font-bold text-text-primary text-sm">Admin Control Center</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Centralized inventory management, order fulfillment queues, printable invoice PDFs, and sales analytics.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Honest Operating Fee Transparency */}
      <div className="rounded-xl border border-border bg-surface/30 p-6 sm:p-8 space-y-6">
        <div className="space-y-2 max-w-2xl">
          <Badge variant="outline">HONEST PRICING</Badge>
          <h3 className="text-2xl font-bold text-text-primary">
            Third-Party Fees &amp; Operating Cost Transparency
          </h3>
          <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
            Unlike closed SaaS platforms that charge 1% to 2% royalties on every item you sell, Projukti Labs charges{" "}
            <strong>0% platform sales royalty</strong>. You own 100% of your store and database.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="rounded-lg border border-border/80 bg-background/60 p-4 space-y-2">
            <h4 className="font-bold text-text-primary text-sm flex items-center gap-2">
              <Coins className="h-4 w-4 text-accent" />
              Gateway Processing Fees
            </h4>
            <p className="text-xs text-text-muted leading-relaxed">
              Standard processing fees (bKash ~1.5%, SSLCommerz ~2%–2.5%, Stripe ~2.9%) are paid directly to your chosen
              provider. Our studio adds zero surcharge.
            </p>
          </div>

          <div className="rounded-lg border border-border/80 bg-background/60 p-4 space-y-2">
            <h4 className="font-bold text-text-primary text-sm flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-accent" />
              Transactional SMS Credits
            </h4>
            <p className="text-xs text-text-muted leading-relaxed">
              SMS credits for order receipts (typically ৳ 0.25 to ৳ 0.40 per SMS in Bangladesh) are procured directly
              from telecom providers (Greenweb, BulkSMSBD, etc.).
            </p>
          </div>

          <div className="rounded-lg border border-border/80 bg-background/60 p-4 space-y-2">
            <h4 className="font-bold text-text-primary text-sm flex items-center gap-2">
              <Truck className="h-4 w-4 text-accent" />
              Courier Delivery Fees
            </h4>
            <p className="text-xs text-text-muted leading-relaxed">
              Shipping charges and Cash on Delivery (COD) settlements remain entirely between your business and your
              courier partner (Steadfast, Pathao, Paperfly).
            </p>
          </div>
        </div>
      </div>

      {/* 4. Deliverables vs Exclusions Breakdown */}
      <div className="space-y-8 border-t border-border pt-12">
        <div className="max-w-2xl space-y-2">
          <Badge variant="accent">SCOPE CLARITY</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
            Included Deliverables vs. Out of Scope
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
              Out of Scope
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
          <Badge variant="accent">COMMERCE TIERS</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary">
            E-commerce Platform Package Options
          </h2>
          <p className="text-text-muted text-sm sm:text-base">
            Fixed milestone investments. Full source code ownership and 0% studio royalties.
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
                    {pkg.priceUsd ? `or $${pkg.priceUsd} USD` : "Tailored Enterprise Scope"} · Full Ownership
                  </div>
                </div>
                <CardDescription className="text-xs text-text-muted leading-relaxed">
                  {pkg.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-2 border-t border-border/60 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-text-primary">
                    Included Features:
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
                        pkg.slug
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
          <Badge variant="outline">FREQUENTLY ASKED QUESTIONS</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
            E-commerce Platform FAQ
          </h2>
        </div>

        <div className="space-y-3 max-w-4xl">
          <AccordionItem
            title="How do you integrate bKash and Nagad payment gateways?"
            defaultOpen={true}
          >
            <p className="text-sm text-text-muted leading-relaxed">
              We integrate the official bKash Payment Gateway (PGW) and Nagad Merchant APIs. Customers authorize
              payments within a secure pop-up window using their PIN/OTP, and webhooks on our edge server automatically
              mark the order as &apos;Paid&apos; upon settlement.
            </p>
          </AccordionItem>

          <AccordionItem title="Can we accept payments in both BDT (Bangladeshi Taka) and USD (US Dollars)?">
            <p className="text-sm text-text-muted leading-relaxed">
              Yes. Our Growth Storefront and Scale OS tiers support dual-currency setups: local shoppers pay in Taka via
              bKash, Nagad, or SSLCommerz, while international buyers can checkout in USD via Stripe using Visa,
              Mastercard, or American Express.
            </p>
          </AccordionItem>

          <AccordionItem title="Is post-launch technical support included?">
            <p className="text-sm text-text-muted leading-relaxed">
              Yes. Every e-commerce deployment comes with a 30-day technical warranty covering any bug fixes, webhook
              adjustments, or gateway troubleshooting. Beyond 30 days, our monthly Business Care or Priority Care
              retainers provide continuous maintenance and uptime guarantees.
            </p>
          </AccordionItem>
        </div>
      </div>

      {/* 7. Bottom Conversion Banner */}
      <div className="rounded-2xl border border-accent/40 bg-surface/80 p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
          Ready to Launch Your High-Performance Online Store?
        </h2>
        <p className="text-text-muted text-sm sm:text-base max-w-xl mx-auto">
          Request a project quotation or discuss your payment gateway and courier logistics with our lead engineer.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary" asChild>
            <Link href="/get-a-quote?service=complete-ecommerce-website">
              Request E-commerce Quote
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
