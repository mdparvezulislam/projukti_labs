import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { AccordionItem } from "@/components/ui/accordion";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  Zap,
  ShieldCheck,
  Check,
  Activity,
  Server,
  Smartphone,
} from "lucide-react";
import { getServiceBySlug } from "@/modules/services/data";

export const metadata = {
  title: "ল্যান্ডিং পেজ, মেটা পিক্সেল ও অ্যানালিটিক্স | Projukti Labs",
  description:
    "হাই-স্পিড ও কনভার্শন-ফোকাসড ল্যান্ডিং পেজ—সাথে ডুয়াল লেয়ার মেটা পিক্সেল ও সার্ভার-সাইড Conversions API (CAPI) ইভেন্ট ডেডুপ্লিকেশন।",
};

export default function LandingPageMetaPixelPage() {
  const service = getServiceBySlug("landing-page-meta-pixel");
  const packages = service?.packages || [];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-24">
      {/* 1. Hero Section */}
      <div className="max-w-4xl space-y-6">
        <div className="inline-flex items-center gap-2">
          <Badge variant="accent">ফ্ল্যাগশিপ সেবা</Badge>
          <Badge variant="outline">ওয়েব ডেভেলপমেন্ট ও ডিজাইন</Badge>
          <span className="font-mono text-xs text-accent">সাব-১.২s মোবাইল LCP টার্গেট</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.1]">
          হাই-কনভার্শন ল্যান্ডিং পেজ সাথে{" "}
          <span className="text-accent underline decoration-accent/40 decoration-wavy">
            মেটা পিক্সেল ও অ্যানালিটিক্স
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-text-muted leading-relaxed max-w-3xl">
          কনভার্শনের জন্য তৈরি, এজ ক্লাউড আর্কিটেকচারে হোস্টকৃত এবং ক্লায়েন্টের ভেরিফাইড অ্যাকাউন্টে সার্ভার-সাইড Meta Conversions API (CAPI) ডেডুপ্লিকেশনে সজ্জিত—যাতে iOS প্রাইভেসি কিংবা অ্যাড-ব্লকারের কারণে বিজ্ঞাপনের কোনো ডাটা নষ্ট না হয়।
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <Button size="lg" variant="primary" asChild>
            <Link href="/get-a-quote?service=landing-page-meta-pixel&package=conversion-pro">
              কনভার্শন প্রো দিয়ে শুরু করুন
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#pricing-tiers">প্যাকেজসমূহ তুলনা করুন</Link>
          </Button>
        </div>
      </div>

      {/* 2. Visual Funnel & Telemetry Architecture Diagram */}
      <div className="rounded-2xl border border-border bg-surface/40 p-6 sm:p-10 space-y-8">
        <div className="space-y-2 max-w-2xl">
          <Badge variant="accent">টেলিমেট্রি আর্কিটেকচার</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
            ডুয়াল লেয়ার মেটা পিক্সেল + CAPI ট্র্যাকিং যেভাবে কাজ করে
          </h2>
          <p className="text-xs sm:text-sm text-text-muted">
            সাধারণ ব্রাউজার পিক্সেলের ২০% থেকে ৪০% ডাটা মিস হওয়ার সমস্যা সম্পূর্ণ সমাধান করে।
          </p>
        </div>

        {/* Funnel Steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="rounded-xl border border-border/80 bg-background/80 p-5 space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">ধাপ ০১</span>
              <Smartphone className="h-4 w-4 text-text-muted" />
            </div>
            <h3 className="font-bold text-text-primary text-sm">বিজ্ঞাপনে ক্লিক ও ট্রাফিক</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              ভিজিটর ফেসবুক বা ইনস্টাগ্রাম বিজ্ঞাপনে ক্লিক করে। মেটা স্বয়ংক্রিয়ভাবে ইউনিক <code className="text-accent">fbclid</code> প্যারামিটার যুক্ত করে।
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-background/80 p-5 space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">ধাপ ০২</span>
              <Zap className="h-4 w-4 text-accent" />
            </div>
            <h3 className="font-bold text-text-primary text-sm">সাব-১.২s এজ রেন্ডারিং</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Cloudflare Edge থেকে প্রি-রেন্ডার করা Next.js পেজ লোড হয়। ভিজিটর ফিরে যাওয়ার আগেই পেজ প্রদর্শিত হয়।
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-background/80 p-5 space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">ধাপ ০৩</span>
              <Activity className="h-4 w-4 text-text-muted" />
            </div>
            <h3 className="font-bold text-text-primary text-sm">ডুয়াল ইভেন্ট ট্রিগার</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              ইউজার কোনো অ্যাকশন নিলে (যেমন ফর্ম পূরণ), অ্যাপ ডেডুপ্লিকেশনের জন্য ইউনিক <code className="text-accent">event_id</code> জেনারেট করে।
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-background/80 p-5 space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">ধাপ ০৪</span>
              <Server className="h-4 w-4 text-accent" />
            </div>
            <h3 className="font-bold text-text-primary text-sm">এজ CAPI ফরোয়ার্ডিং</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              ব্রাউজার থেকে পিক্সেল ইভেন্ট যাওয়ার পাশাপাশি ক্লাউডফ্লেয়ার এজ থেকে মেটা গ্রাফ এপিআই-তে সরাসরি HTTP POST পাঠানো হয়।
            </p>
          </div>

          <div className="rounded-xl border border-accent/60 bg-accent/5 p-5 space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">ধাপ ০৫</span>
              <ShieldCheck className="h-4 w-4 text-accent" />
            </div>
            <h3 className="font-bold text-text-primary text-sm">ভেরিফাইড অ্যাট্রিবিউশন</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              মেটা ইভেন্টস ম্যানেজার টেস্ট টুলে ইভেন্টগুলো ডেডুপ্লিকেট করে হাই কোয়ালিটি স্কোরে যাচাই করা হয়।
            </p>
          </div>
        </div>
      </div>

      {/* 3. Event Taxonomy & Core Web Vitals Benchmark */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Event Taxonomy */}
        <div className="lg:col-span-7 rounded-xl border border-border bg-surface/30 p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <Badge variant="outline">টেলিমেট্রি স্ট্যান্ডার্ড</Badge>
            <h3 className="text-xl font-bold text-text-primary">স্ট্যান্ডার্ডাইজড ইভেন্ট স্কিমা</h3>
            <p className="text-xs text-text-muted">
              আপনার ল্যান্ডিং পেজে প্রি-কনফিগার করা ও টেস্টকৃত ট্র্যাকিং ইভেন্টসমূহ।
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border text-text-muted uppercase font-mono text-[11px]">
                <tr>
                  <th className="py-2.5 pr-4">ইভেন্টের নাম</th>
                  <th className="py-2.5 px-4">ট্রিগার অ্যাকশন</th>
                  <th className="py-2.5 px-4">টেলিমেট্রি পেলোড</th>
                  <th className="py-2.5 pl-4">ডেলিভারি চ্যানেল</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 font-mono text-text-muted">
                <tr>
                  <td className="py-3 pr-4 font-bold text-accent">PageView</td>
                  <td className="py-3 px-4 font-sans text-text-primary">পেজ লোড হওয়া মাত্র</td>
                  <td className="py-3 px-4">page_url, referrer</td>
                  <td className="py-3 pl-4 text-xs font-sans">Browser + CAPI</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-accent">ViewContent</td>
                  <td className="py-3 px-4 font-sans text-text-primary">প্রধান অফার বা সেকশন দেখা</td>
                  <td className="py-3 px-4">content_name, value, currency</td>
                  <td className="py-3 pl-4 text-xs font-sans">Browser + CAPI</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-accent">Contact</td>
                  <td className="py-3 px-4 font-sans text-text-primary">হোয়াটসঅ্যাপ বা ফোনে ক্লিক</td>
                  <td className="py-3 px-4">contact_channel, event_id</td>
                  <td className="py-3 pl-4 text-xs font-sans">Browser + CAPI</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-accent">Lead</td>
                  <td className="py-3 px-4 font-sans text-text-primary">ফর্ম পূরণ করে সাবমিট করা</td>
                  <td className="py-3 px-4">em_hash, ph_hash, lead_value</td>
                  <td className="py-3 pl-4 text-xs font-sans">Browser + CAPI</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-accent">Schedule</td>
                  <td className="py-3 px-4 font-sans text-text-primary">কনসালটেশন বুকিং করা</td>
                  <td className="py-3 px-4">slot_id, event_id</td>
                  <td className="py-3 pl-4 text-xs font-sans">Browser + CAPI</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Performance Standards */}
        <div className="lg:col-span-5 rounded-xl border border-border bg-surface/30 p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <Badge variant="outline">পারফরম্যান্স স্ট্যান্ডার্ড</Badge>
            <h3 className="text-xl font-bold text-text-primary">Core Web Vitals বেঞ্চমার্ক</h3>
            <p className="text-xs text-text-muted">
              ধীরগতির সাইট বিজ্ঞাপনের বাজেট নষ্ট করে। আমরা মোবাইলের বাস্তব নেটওয়ার্কে অপ্টিমাইজ করি।
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg border border-border/80 bg-background/60 p-4 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold uppercase text-text-primary">Largest Contentful Paint (LCP)</span>
                <span className="font-mono text-sm font-bold text-accent">&lt; ১.২s</span>
              </div>
              <p className="text-[11px] text-text-muted">
                মোবাইল ৪জি নেটওয়ার্কে ১.২ সেকেন্ডের মধ্যে প্রধান অফার এবং হিরো ইমেজ লোড হওয়া ইঞ্জিনিয়ারিং টার্গেট।
              </p>
            </div>

            <div className="rounded-lg border border-border/80 bg-background/60 p-4 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold uppercase text-text-primary">Cumulative Layout Shift (CLS)</span>
                <span className="font-mono text-sm font-bold text-accent">&lt; ০.০২</span>
              </div>
              <p className="text-[11px] text-text-muted">
                পেজ লোড হওয়ার সময় কোনো বিরক্তিকর জাম্প বা কাঁপাকাঁপি থাকবে না, পড়ার আরাম বজায় থাকবে।
              </p>
            </div>

            <div className="rounded-lg border border-border/80 bg-background/60 p-4 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold uppercase text-text-primary">Interaction to Next Paint (INP)</span>
                <span className="font-mono text-sm font-bold text-accent">&lt; ১০০ms</span>
              </div>
              <p className="text-[11px] text-text-muted">
                বাটনে ক্লিক, ফর্ম ইনপুট বা অ্যাকর্ডিয়ন খোলার সময় তাৎক্ষণিক ও মসৃণ রেসপন্স।
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Deliverables vs Exclusions Breakdown */}
      <div className="space-y-8 border-t border-border pt-12">
        <div className="max-w-2xl space-y-2">
          <Badge variant="accent">স্বচ্ছ স্কোপ</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
            স্কোপের স্বচ্ছতা: কী অন্তর্ভুক্ত আর কী অন্তর্ভুক্ত নয়
          </h2>
          <p className="text-sm text-text-muted">
            আমরা শতভাগ স্বচ্ছতায় বিশ্বাস করি। নিচে কী আমরা সরবরাহ করব এবং কী সার্ভিসের বাইরে তা স্পষ্ট করা হলো।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Deliverables */}
          <div className="rounded-xl border border-accent/30 bg-surface/40 p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-accent flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-accent" />
              আমরা যা সরবরাহ করি
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
              সার্ভিসের আওতাবহির্ভূত
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
          <Badge variant="accent">প্যাকেজসমূহ</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary">
            ফিক্সড-স্কোপ প্যাকেজ অপশন
          </h2>
          <p className="text-text-muted text-sm sm:text-base">
            আপনার ক্যাম্পেইন এবং কনভার্শন লক্ষ্যের সাথে মানানসই প্যাকেজটি বেছে নিন।
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
                  {pkg.popular && <Badge variant="accent">সর্বাধিক জনপ্রিয়</Badge>}
                </div>
                <div className="space-y-1">
                  <div className="font-mono text-3xl font-extrabold text-accent">
                    ৳ {pkg.priceBdt?.toLocaleString()}
                  </div>
                  <div className="text-xs text-text-muted font-mono">
                    অথবা ${pkg.priceUsd} USD · এককালীন বিনিয়োগ
                  </div>
                </div>
                <CardDescription className="text-xs text-text-muted leading-relaxed">
                  {pkg.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-2 border-t border-border/60 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-text-primary">
                    অন্তর্ভুক্ত ডেলিভারেবলস:
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
                      href={`/get-a-quote?service=landing-page-meta-pixel&package=${encodeURIComponent(
                        pkg.slug
                      )}`}
                    >
                      {pkg.name} বেছে নিন
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
          <Badge variant="outline">নির্দিষ্ট জিজ্ঞাসা</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
            ল্যান্ডিং পেজ ও মেটা পিক্সেল সম্পর্কিত প্রশ্নোত্তর
          </h2>
        </div>

        <div className="space-y-3 max-w-4xl">
          <AccordionItem
            title="মেটা পিক্সেল এবং CAPI সঠিকভাবে কাজ করছে কি না তা আপনারা কীভাবে নিশ্চিত করেন?"
            defaultOpen={true}
          >
            <p className="text-sm text-text-muted leading-relaxed">
              প্রজেক্ট হস্তান্তরের পূর্বে আমরা মেটার অফিসিয়াল Events Manager Test Events Tool ব্যবহার করে সম্পূর্ণ টেস্ট সম্পন্ন করি। PageView, ViewContent, Contact এবং Lead ইভেন্টগুলো ব্রাউজার ও সার্ভার উভয় দিক থেকে ট্র্যাকিং করে ইউনিক <code className="text-accent">event_id</code> দ্বারা ডেডুপ্লিকেশন যাচাই করা হয় এবং ক্লায়েন্টকে এর প্রুফ রিপোর্ট সরবরাহ করা হয়।
            </p>
          </AccordionItem>

          <AccordionItem title="আমার বিদ্যমান CRM, Google Sheet বা WhatsApp-এর সাথে লিড সংযুক্ত করা যাবে?">
            <p className="text-sm text-text-muted leading-relaxed">
              হ্যাঁ। আমাদের প্রতিটি ল্যান্ডিং পেজের লিড ফর্ম সরাসরি ডাটাবেসে সেভ হওয়ার পাশাপাশি রিয়েল-টাইমে গুগল শিট, টেলিগ্রাম, স্ল্যাক বা আপনার নিজস্ব সিআরএম-এ সরাসরি ওয়েবহুকের মাধ্যমে পাঠানো যায়।
            </p>
          </AccordionItem>

          <AccordionItem title="লঞ্চের পর মেটা তাদের এপিআই পরিবর্তন করলে কী হবে?">
            <p className="text-sm text-text-muted leading-relaxed">
              প্রতিটি প্যাকেজের সাথে লঞ্চ-পরবর্তী ১৪ দিনের ট্র্যাকিং ওয়ারেন্টি অন্তর্ভুক্ত থাকে। এই সময়ের মধ্যে মেটার এপিআই পরিবর্তন বা ট্র্যাকিংয়ে কোনো অসঙ্গতি দেখা দিলে আমরা কোনো বাড়তি ফি ছাড়াই তা ঠিক করে দিই। এছাড়া দীর্ঘমেয়াদে সুরক্ষার জন্য আমাদের মাসিক মেইনটেন্যান্স রিটেইনার রয়েছে।
            </p>
          </AccordionItem>
        </div>
      </div>

      {/* 7. Bottom Conversion Banner */}
      <div className="rounded-2xl border border-accent/40 bg-surface/80 p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
          আপনার বিজ্ঞাপনের কনভার্শন বৃদ্ধি করতে প্রস্তুত?
        </h2>
        <p className="text-text-muted text-sm sm:text-base max-w-xl mx-auto">
          আপনার ক্যাম্পেইনের জন্য ল্যান্ডিং পেজ কোটেশন চান অথবা ফানেল আর্কিটেকচার নিয়ে আলোচনা করতে আমাদের সাথে কথা বলুন।
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary" asChild>
            <Link href="/get-a-quote?service=landing-page-meta-pixel">
              ল্যান্ডিং পেজ কোটেশন চান
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">একটি টেকনিক্যাল প্রশ্ন জিজ্ঞাসা করুন</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
