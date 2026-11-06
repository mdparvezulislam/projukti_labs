import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AccordionItem } from "@/components/ui/accordion";
import { ArrowRight, HelpCircle } from "lucide-react";

export const metadata = {
  title: "Frequently Asked Questions (FAQ) | Projukti Labs",
  description:
    "Comprehensive answers regarding our engineering services, scoping, payment methods, maintenance SLAs, and code ownership.",
};

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <Badge variant="accent">Transparent Answers</Badge>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-text-primary">
          Frequently Asked Questions
        </h1>
        <p className="text-text-muted text-base sm:text-lg">
          Clear, honest answers about how we scope projects, charge for services, engineer code, and deliver ongoing support.
        </p>
      </div>

      {/* Category 1: Scoping & Project Engagement */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-text-primary flex items-center gap-2 border-b border-border pb-3">
          <HelpCircle className="h-5 w-5 text-accent" />
          Project Engagement & Scoping
        </h2>
        <div className="space-y-3">
          <AccordionItem
            title="How do you determine the price and timeline for a project?"
            defaultOpen={true}
          >
            <p className="text-sm text-text-muted leading-relaxed">
              For our productized packages (such as Landing Page with Meta Pixel, Complete E-commerce Website, and Maintenance Retainers), we offer fixed-scope, transparent pricing with clear milestone deliverables. For custom web applications, we evaluate your technical specifications and provide a structured Scope of Work (SOW) with fixed milestones before any contract is signed.
            </p>
          </AccordionItem>

          <AccordionItem title="Who will actually write the code for my project?">
            <p className="text-sm text-text-muted leading-relaxed">
              Every project is directly architected and implemented by our core engineering team under the supervision of <strong>Md Parvezul Islam</strong> (Founder & Principal Software Architect). We do not subcontract your work to random third-party freelancers or junior interns.
            </p>
          </AccordionItem>

          <AccordionItem title="How does the communication and progress reporting work?">
            <p className="text-sm text-text-muted leading-relaxed">
              We provide regular milestone updates via your preferred channel (WhatsApp, Slack, or email). You receive private staging preview links to test the actual application in your browser at each phase before production deployment.
            </p>
          </AccordionItem>
        </div>
      </div>

      {/* Category 2: Technical Architecture & Performance */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-text-primary flex items-center gap-2 border-b border-border pb-3">
          <HelpCircle className="h-5 w-5 text-accent" />
          Technical Architecture & Performance
        </h2>
        <div className="space-y-3">
          <AccordionItem title="Why do you build with Next.js and Cloudflare instead of WordPress?">
            <p className="text-sm text-text-muted leading-relaxed">
              Traditional WordPress setups rely on heavy PHP servers and dozens of plugins, causing slow load times (3–6 seconds on mobile), frequent database crashes during traffic spikes, and constant security vulnerabilities. By building with Next.js App Router and Cloudflare edge workers, your application runs on an ultra-fast global CDN with sub-second response times, zero server maintenance, and hardened security.
            </p>
          </AccordionItem>

          <AccordionItem title="What is the difference between client-side Meta Pixel and Conversions API (CAPI)?">
            <p className="text-sm text-text-muted leading-relaxed">
              Browser-based Meta Pixels frequently lose 20% to 40% of conversion events due to iOS privacy restrictions, ad blockers, and slow network drop-offs. With our Meta Pixel + CAPI dual-tracking solution, events are fired from both the browser and the edge server with matching deduplication IDs. This ensures Meta Ads accurately tracks every purchase and lead, improving your ad optimization and lowering acquisition costs.
            </p>
          </AccordionItem>

          <AccordionItem title="What Core Web Vitals performance benchmarks do you guarantee?">
            <p className="text-sm text-text-muted leading-relaxed">
              We target sub-1.2s Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS) under 0.05, and Interaction to Next Paint (INP) under 150ms on mobile 4G devices. Every production release is audited using Chrome DevTools performance traces.
            </p>
          </AccordionItem>
        </div>
      </div>

      {/* Category 3: Payments, Invoicing & Contracts */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-text-primary flex items-center gap-2 border-b border-border pb-3">
          <HelpCircle className="h-5 w-5 text-accent" />
          Payment Methods & Contracts
        </h2>
        <div className="space-y-3">
          <AccordionItem title="Which payment methods do you accept?">
            <p className="text-sm text-text-muted leading-relaxed">
              For Bangladesh clients, we accept bank transfers (EFT/NPSB), bKash, and Nagad Merchant payments. For international clients, we accept bank wires (SWIFT/ACH) and major debit/credit cards via Stripe in USD or GBP.
            </p>
          </AccordionItem>

          <AccordionItem title="What is your payment milestone structure?">
            <p className="text-sm text-text-muted leading-relaxed">
              Standard projects typically follow a 50% mobilization deposit upon contract signing, and 50% upon final staging approval prior to DNS migration and live production deployment. Larger multi-month projects follow phased milestone schedules.
            </p>
          </AccordionItem>

          <AccordionItem title="Do I own the source code upon project completion?">
            <p className="text-sm text-text-muted leading-relaxed">
              Yes, 100%. Once final milestone payments are cleared, complete ownership of the Git repository, deployment configurations, database schemas, and media assets transfers to you without licensing restrictions or proprietary lock-in.
            </p>
          </AccordionItem>
        </div>
      </div>

      {/* Category 4: Maintenance Retainers & SLA Support */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-text-primary flex items-center gap-2 border-b border-border pb-3">
          <HelpCircle className="h-5 w-5 text-accent" />
          Maintenance & Ongoing Support
        </h2>
        <div className="space-y-3">
          <AccordionItem title="What happens after my website or store is launched?">
            <p className="text-sm text-text-muted leading-relaxed">
              All our web development and e-commerce projects include an initial 14 to 30-day post-launch warranty covering any bug fixes. After that, clients can enroll in one of our monthly Proactive Care Retainers (Basic, Business, Priority, or Custom) to ensure continuous uptime monitoring, weekly backup verification, security updates, and dedicated monthly development hours.
            </p>
          </AccordionItem>

          <AccordionItem title="What if an emergency outage happens on my site?">
            <p className="text-sm text-text-muted leading-relaxed">
              Under our maintenance plans, uptime is monitored every 5 minutes. If an incident is detected, an automated escalation alerts our engineering on-call engineer immediately. Response SLAs range from 1 hour for custom retainers to 4 hours for Priority Care and 24 hours for Business Care.
            </p>
          </AccordionItem>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="rounded-2xl border border-border bg-surface/60 p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
          Have a Question Not Answered Here?
        </h2>
        <p className="text-text-muted text-sm sm:text-base max-w-xl mx-auto">
          Contact our team directly. We are happy to clarify any technical requirement, custom integration, or SLA question.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary" asChild>
            <Link href="/contact">
              Send an Inquiry
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/get-a-quote">Request a Project Quote</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

