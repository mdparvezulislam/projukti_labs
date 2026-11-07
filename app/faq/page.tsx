import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AccordionItem } from "@/components/ui/accordion";
import { ArrowRight, HelpCircle } from "lucide-react";
import { getCmsFaqs } from "@/lib/cms";
import { VERIFIED_FAQS } from "@/lib/cms/seed";

export const metadata = {
  title: "Frequently Asked Questions (FAQ) | Projukti Labs",
  description:
    "Clear answers regarding our software engineering services, pricing models, payment methods, maintenance SLAs, and source code ownership.",
};

export default async function FAQPage() {
  const dbFaqs = await getCmsFaqs();

  // Group faqs by category
  let categories: { category: string; items: { id: string; question: string; answer: string }[] }[] = [];
  if (dbFaqs.length > 0) {
    const categoryMap = new Map<string, { id: string; question: string; answer: string }[]>();
    for (const f of dbFaqs) {
      const list = categoryMap.get(f.category) ?? [];
      list.push({ id: f.id, question: f.question, answer: f.answer });
      categoryMap.set(f.category, list);
    }
    categories = Array.from(categoryMap.entries()).map(([category, items]) => ({
      category,
      items,
    }));
  } else {
    const categoryMap = new Map<string, { id: string; question: string; answer: string }[]>();
    for (let i = 0; i < VERIFIED_FAQS.length; i++) {
      const f = VERIFIED_FAQS[i];
      const list = categoryMap.get(f.category) ?? [];
      list.push({ id: `seed-${i}`, question: f.question, answer: f.answer });
      categoryMap.set(f.category, list);
    }
    categories = Array.from(categoryMap.entries()).map(([category, items]) => ({
      category,
      items,
    }));
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10 sm:space-y-12">
      {/* 1. Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <Badge variant="accent">TRANSPARENT ANSWERS</Badge>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-text-primary">
          Frequently Asked Questions
        </h1>
        <p className="text-text-secondary text-sm sm:text-base">
          Clear answers about how we estimate projects, architect software, accept payments, and provide long-term
          technical support.
        </p>
      </div>

      {/* 2. FAQ Categories & Items */}
      <div className="space-y-8 sm:space-y-10">
        {categories.map((cat, catIdx) => (
          <div key={cat.category} className="space-y-6">
            <h2 className="text-xl font-bold text-text-primary flex items-center gap-2 border-b border-border pb-3">
              <HelpCircle className="h-5 w-5 text-accent" />
              {cat.category}
            </h2>
            <div className="space-y-3">
              {cat.items.map((item, itemIdx) => (
                <AccordionItem
                  key={item.id}
                  title={item.question}
                  defaultOpen={catIdx === 0 && itemIdx === 0}
                >
                  <p className="text-sm text-text-muted leading-relaxed whitespace-pre-line">
                    {item.answer}
                  </p>
                </AccordionItem>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 3. CTA Footer */}
      <div className="rounded-2xl border border-border bg-surface/60 p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
          Have a Question Not Listed Here?
        </h2>
        <p className="text-text-muted text-sm sm:text-base max-w-xl mx-auto">
          Contact our team directly. We are happy to discuss custom technical requirements, integrations, or specific
          architecture considerations.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" variant="primary" asChild>
            <Link href="/contact">
              Contact Us Directly
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/get-a-quote">Request a Project Quote</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
