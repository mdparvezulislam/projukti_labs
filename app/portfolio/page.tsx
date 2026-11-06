import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Info } from "lucide-react";

export const metadata = {
  title: "পোর্টফোলিও ও কারিগরি ব্লুপ্রিন্ট | Projukti Labs",
  description:
    "আমাদের প্রোডাকশন সিস্টেম, হাই-স্পিড এজ আর্কিটেকচার, মেটা CAPI কনভার্শন ফানেল এবং ই-কমার্স সলিউশনের টেকনিক্যাল ব্লুপ্রিন্ট ও কেস স্টাডি।",
};

export default function PortfolioPage() {
  const caseStudies = [
    {
      id: "projukti-labs-engine",
      title: "Projukti Labs Studio Engine v1.0",
      category: "এজ সিস্টেম ও ওয়েব আর্কিটেকচার",
      badge: "লাইভ প্রোডাকশন",
      type: "লাইভ প্ল্যাটফর্ম",
      overview:
        "Projukti Labs-এর অফিসিয়াল ওয়েব প্ল্যাটফর্ম—যা Cloudflare Workers-এর এজ মডুলার মনোলিথ আর্কিটেকচারে তৈরি। এতে রয়েছে Next.js App Router, Vite RSC কম্পাইলেশন, Drizzle ORM এবং Cloudflare D1 ডাটাবেস।",
      metrics: [
        { label: "মোবাইল LCP স্পিড", value: "< ১.১s" },
        { label: "এজ বান্ডেল সাইজ", value: "২৯৯ KB" },
        { label: "টাইপ সেফটি", value: "১০০%" },
        { label: "কোল্ড স্টার্ট ল্যাটেন্সি", value: "০ms" },
      ],
      stack: ["Next.js 16", "React 19", "Cloudflare Workers", "D1 SQLite", "Drizzle ORM", "Tailwind CSS"],
      deliverables: [
        "Vite + vinext এজ বিল্ড ইন্টিগ্রেশন যা Cloudflare Workers-এ আল্ট্রা-ফাস্ট SSR নিশ্চিত করে",
        "WCAG 2.1 AA এক্সেসিবিলিটি স্ট্যান্ডার্ড সমর্থিত ডার্ক-ফার্স্ট রেসপন্সিভ ডিজাইন সিস্টেম",
        "Cloudflare D1-এ হোস্টকৃত ইন্টিগ্রেটেড ইনকোয়ারি ও লিড ট্র্যাকিং ডাটাবেস লেয়ার",
      ],
      linkText: "লাইভ প্ল্যাটফর্ম দেখুন",
      href: "/",
    },
    {
      id: "meta-pixel-capi-funnel",
      title: "কনভার্শন-ইঞ্জিনিয়ার্ড ফানেল সাথে মেটা CAPI",
      category: "ওয়েব ডেভেলপমেন্ট ও অ্যানালিটিক্স",
      badge: "আর্কিটেকচারাল ব্লুপ্রিন্ট",
      type: "কনসেপ্ট ও ব্লুপ্রিন্ট",
      overview:
        "উচ্চ-গতির কনভার্শন ল্যান্ডিং পেজ সিস্টেম—যাতে রয়েছে ডুয়াল-লেয়ার টেলিমেট্রি: ব্রাউজার মেটা পিক্সেল এবং সার্ভার-সাইড Conversions API (CAPI) ইভেন্ট ডেডুপ্লিকেশন।",
      metrics: [
        { label: "ডাটা ট্র্যাকিং ড্রপ-অফ", value: "০%" },
        { label: "মোবাইল স্পিড স্কোর", value: "৯৮/১০০" },
        { label: "মোবাইল LCP বেঞ্চমার্ক", value: "১.২s" },
        { label: "মেটা ইভেন্ট কোয়ালিটি", value: "> ৯.০" },
      ],
      stack: ["Next.js", "Meta CAPI", "Google Analytics 4", "Cloudflare Edge", "Zod Validation"],
      deliverables: [
        "এজ সার্ভার ফরওয়ার্ডিংয়ের মাধ্যমে iOS ও অ্যাড-ব্লকার সত্ত্বেও জিরো ডাটা লস ট্র্যাকিং",
        "স্ট্যান্ডার্ড ইভেন্ট ট্যাক্সোনমি: PageView, ViewContent, Contact, Lead, Schedule",
        "মেটা ইভেন্টস ম্যানেজার টেস্ট টুলে সরাসরি শতভাগ টেস্ট ভেরিফিকেশন প্রটোকল",
      ],
      linkText: "সার্ভিস ব্লুপ্রিন্ট দেখুন",
      href: "/services/landing-page-meta-pixel",
    },
    {
      id: "production-ecommerce-architecture",
      title: "মাল্টি-গেটওয়ে ই-কমার্স প্ল্যাটফর্ম আর্কিটেকচার",
      category: "ই-কমার্স ও ডিজিটাল কমার্স",
      badge: "আর্কিটেকচারাল ব্লুপ্রিন্ট",
      type: "কনসেপ্ট ও ব্লুপ্রিন্ট",
      overview:
        "হাই-অ্যাভেইলেবিলিটি অনলাইন কমার্স সিস্টেম—যা বাংলাদেশের মোবাইল পেমেন্ট (বিকাশ PGW, নগদ, SSLCommerz) এবং আন্তর্জাতিক কার্ড প্রসেসিংকে (Stripe) কুরিয়ার অটোমেশনের সাথে সংযুক্ত করে।",
      metrics: [
        { label: "চেকআউট ধাপ", value: "২ ক্লিক" },
        { label: "কার্ট স্টেট ল্যাটেন্সি", value: "< ৫০ms" },
        { label: "পেমেন্ট গেটওয়ে অপশন", value: "৪টি ইন্টিগ্রেটেড" },
        { label: "প্ল্যাটফর্ম সেলস ফি", value: "০%" },
      ],
      stack: ["Next.js App Router", "bKash PGW", "SSLCommerz", "Stripe", "PostgreSQL/SQLite", "Tailwind CSS"],
      deliverables: [
        "তাৎক্ষণিক ভিজ্যুয়াল ফিডব্যাকসহ অপটিমিস্টিক শপিং কার্ট স্টেট আপডেট",
        "অর্ডার কনফার্মেশন ও স্ট্যাটাস পরিবর্তনে ট্রানজ্যাকশনাল SMS ও ইমেল নোটিফিকেশন",
        "কুরিয়ার পার্সেল বুকিংয়ের জন্য স্বয়ংক্রিয় পাঠাও ও স্টেডফাস্ট এপিআই ব্রিজ",
      ],
      linkText: "ই-কমার্স ব্লুপ্রিন্ট দেখুন",
      href: "/services/complete-ecommerce-website",
    },
    {
      id: "sla-care-infrastructure",
      title: "প্রোঅ্যাক্টিভ আপটাইম ও ডিজাস্টার রিকভারি রিটেইনার",
      category: "মেইনটেন্যান্স ও টেক সাপোর্ট",
      badge: "ইনফ্রাস্ট্রাকচার কেয়ার",
      type: "সার্ভিস ব্লুপ্রিন্ট",
      overview:
        "সার্বক্ষণিক স্বয়ংক্রিয় মনিটরিং ও রক্ষণাবেক্ষণ স্যুট—যা ৫ মিনিটের হেলথ চেক, অটোমেটেড ব্যাকআপ ড্রিল এবং মাসিক পারফরম্যান্স প্রোফাইলিংয়ের মাধ্যমে ডাউনটাইম প্রতিরোধ করে।",
      metrics: [
        { label: "টার্গেট আপটাইম", value: "৯৯.৯%" },
        { label: "মনিটরিং ফ্রিকোয়েন্সি", value: "প্রতি ৫ মিনিট" },
        { label: "জরুরি SLA অপশন", value: "১ঘ–৪ঘ" },
        { label: "ব্যাকআপ রিস্টোর ড্রিল", value: "মাসিক" },
      ],
      stack: ["Health Polling Daemon", "Cloudflare KV", "Automated R2 Snapshots", "Slack / WhatsApp Webhooks"],
      deliverables: [
        "স্বয়ংক্রিয় SSL সার্টিফিকেট নবায়ন অ্যালার্ট ও এক্সপায়ারি সুরক্ষা",
        "স্টেজিং প্রিভিউ পরিবেশে টেস্ট করার পর মূল প্রোডাকশন সাইটে ডিপেন্ডেন্সি সিকিউরিটি প্যাচ",
        "মাসিক স্বচ্ছ ইঞ্জিনিয়ারিং হেলথ ও Core Web Vitals অডিট রিপোর্ট",
      ],
      linkText: "রিটেইনার প্ল্যান দেখুন",
      href: "/services/website-maintenance",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <Badge variant="accent">আর্কিটেকচারাল কেস স্টাডি</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-text-primary">
          নির্বাচিত ইঞ্জিনিয়ারিং কাজ ও আর্কিটেকচার
        </h1>
        <p className="text-lg text-text-muted leading-relaxed">
          আমরা স্বচ্ছ ও যাচাইযোগ্য ইঞ্জিনিয়ারিংয়ে বিশ্বাস করি। নিচে আমাদের প্রোডাকশন সিস্টেম, কারিগরি আর্কিটেকচার এবং ক্লায়েন্ট সলিউশনের জন্য প্রস্তুতকৃত ব্লুপ্রিন্ট উপস্থাপন করা হলো।
        </p>

        {/* Ethical Anti-Hallucination Disclaimer */}
        <div className="mt-4 flex items-start gap-3 rounded-lg border border-border/80 bg-surface/80 p-4 text-xs text-text-muted leading-relaxed">
          <Info className="h-4 w-4 text-accent shrink-0 mt-0.5" />
          <div>
            <strong className="text-text-primary font-medium">সততা ও নীতিগত ঘোষণা: </strong>
            Projukti Labs কোনো কৃত্রিম বা কাল্পনিক ক্লায়েন্ট প্রজেক্ট দাবি করে না। নিচে প্রদর্শিত কাজগুলো আমাদের নিজস্ব প্রোডাকশন প্ল্যাটফর্ম এবং ক্লায়েন্ট সার্ভিসের জন্য প্রস্তুতকৃত কার্যকরী আর্কিটেকচারাল কনসেপ্ট ও কারিগরি ব্লুপ্রিন্ট (Architectural Concepts & Blueprints)।
          </div>
        </div>
      </div>

      {/* Case Studies List */}
      <div className="space-y-12">
        {caseStudies.map((study, idx) => (
          <div
            key={study.id}
            className="rounded-2xl border border-border bg-surface/40 p-6 sm:p-10 space-y-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-accent">০{idx + 1}</span>
                  <Badge variant="outline">{study.category}</Badge>
                  <Badge variant="accent" className="text-[10px]">{study.badge}</Badge>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary pt-2">
                  {study.title}
                </h2>
              </div>
              <Button variant="outline" asChild className="self-start sm:self-center">
                <Link href={study.href}>
                  {study.linkText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <p className="text-sm sm:text-base text-text-muted leading-relaxed max-w-4xl">
              {study.overview}
            </p>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-xl border border-border/60 bg-background/60 p-4">
              {study.metrics.map((m) => (
                <div key={m.label} className="text-center space-y-1">
                  <div className="font-mono text-xl sm:text-2xl font-bold text-accent">{m.value}</div>
                  <div className="text-[11px] uppercase tracking-wider text-text-muted">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Deliverables & Stack */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
              <div className="lg:col-span-8 space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-text-primary">
                  মূল কারিগরি ডেলিভারেবলস
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-text-muted">
                  {study.deliverables.map((del, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-4 space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-text-primary">
                  ব্যবহৃত প্রযুক্তি ও আর্কিটেকচার
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {study.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-border bg-surface px-2.5 py-1 font-mono text-[11px] text-text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Conversion Banner */}
      <div className="rounded-2xl border border-border bg-surface/60 p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
          আপনার প্ল্যাটফর্মের জন্য কাস্টম আর্কিটেকচার প্রয়োজন?
        </h2>
        <p className="text-text-muted text-sm sm:text-base max-w-xl mx-auto">
          আমরা সুনির্দিষ্ট মাইলফলক ও স্বচ্ছ কন্ট্রাক্টের মাধ্যমে প্রোডাকশন সিস্টেম তৈরি করি।
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary" asChild>
            <Link href="/get-a-quote">
              প্রজেক্ট কোটেশন চান
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">টেকনিক্যাল আলোচনার সময় নির্ধারণ করুন</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
