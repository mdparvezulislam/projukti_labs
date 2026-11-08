import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ContactForm } from "@/components/forms/contact-form";
import { Mail, Clock, MapPin, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPageSections } from "@/lib/cms";

export const metadata = {
  title: "Contact Us | Projukti Labs",
  description:
    "Get in touch with Projukti Labs. Direct engineering inquiries, technical consultations, and project proposals.",
};

export default async function ContactPage() {
  const sections = await getPageSections("contact");
  const heroSec = sections.find((s) => s.sectionKey === "hero");
  const heroContent = (heroSec?.content as Record<string, string>) || {};
  const contactTitle = heroSec?.title || "Get in Touch with Our Engineering Team";
  const contactSubtitle =
    heroSec?.subtitle ||
    "Have a question about our services, software architecture, or an upcoming project? Send us a direct message. We typically respond within 24 business hours.";
  const contactEmail = heroContent.email || "contact@projuktilabs.tech";
  const contactHours = heroContent.hours || "Sunday - Thursday, 10 AM - 7 PM (BST)";

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10 sm:space-y-12">
      {/* 1. Header */}
      <div className="max-w-3xl space-y-3">
        <Badge variant="accent">DIRECT ENGINEERING CHANNEL</Badge>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-text-primary">
          {contactTitle}
        </h1>
        <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
          {contactSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Contact Form */}
        <div className="lg:col-span-7 space-y-5">
          <ContactForm />
        </div>

        {/* Right Column: Direct Info & Trust Points */}
        <div className="lg:col-span-5 space-y-5">
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-5 shadow-xs">
            <h3 className="text-base font-bold text-text-primary border-b border-border pb-3">
              Studio Information &amp; Direct Channels
            </h3>

            <div className="space-y-4 text-sm text-text-muted">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-text-primary">Official Email</p>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-accent hover:underline font-mono text-xs sm:text-sm"
                  >
                    {contactEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-text-primary">Support Hours &amp; Response SLA</p>
                  <p className="text-xs">{contactHours} · Guaranteed response within 24 business hours.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-text-primary">Location</p>
                  <p className="text-xs">Bangladesh · Serving domestic &amp; international clients.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-text-primary">Privacy &amp; NDA Protection</p>
                  <p className="text-xs">
                    Your project details, proprietary ideas, and contact information remain strictly confidential.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border/60 bg-surface/30 p-6 space-y-3">
            <h4 className="font-semibold text-text-primary text-sm">Need a Formal Scope &amp; Quotation?</h4>
            <p className="text-xs text-text-muted leading-relaxed">
              If you have defined project goals, target milestones, and a budget range, use our structured quote wizard
              for a detailed Scope of Work (SOW) proposal.
            </p>
            <Button variant="outline" size="sm" asChild className="w-full mt-2">
              <Link href="/get-a-quote">
                Open Project Quotation Form
                <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
