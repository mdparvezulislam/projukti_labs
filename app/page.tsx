import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle2,
  Globe,
  ShoppingCart,
  ShieldCheck,
  Zap,
  Code2,
  ChevronRight,
} from "lucide-react";

export const metadata = {
  title: "Projukti Labs | ডিজিটাল সলিউশন ও আধুনিক সফটওয়্যার ইঞ্জিনিয়ারিং স্টুডিও",
  description:
    "আল্ট্রা-ফাস্ট ওয়েব প্ল্যাটফর্ম, মেটা পিক্সেল ও CAPI সমন্বিত হাই-কনভার্টিং ল্যান্ডিং পেজ এবং নির্ভরযোগ্য ই-কমার্স ইঞ্জিনিয়ারিং স্টুডিও।",
};

export default function HomePage() {
  return (
    <div className="flex flex-col gap-24 sm:gap-32 pb-20">
      {/* 1. Hero Section */}
      <section className="relative pt-12 sm:pt-20 lg:pt-24 overflow-hidden">
        {/* Subtle grid backdrop */}
        <div
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#27272a15_1px,transparent_1px),linear-gradient(to_bottom,#27272a15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
          aria-hidden="true"
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs sm:text-sm text-text-muted">
            <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="font-medium text-text-primary">অফিসিয়াল স্টুডিও লঞ্চ</span>
            <span className="text-border">|</span>
            <span>৩টি প্রধান সার্ভিস ক্যাটাগরি</span>
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-text-primary leading-[1.1]">
            ডিজিটাল সলিউশন নির্মাণ।{" "}
            <span className="text-accent underline decoration-accent/30 decoration-wavy decoration-from-font">
              ভবিষ্যতের প্রযুক্তি ইঞ্জিনিয়ারিং।
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-text-muted leading-relaxed">
            আমরা তৈরি করি অবিশ্বাস্য দ্রুতগতির ওয়েব প্ল্যাটফর্ম, ভেরিফাইড মেটা পিক্সেল ও ট্র্যাকিং যুক্ত কনভার্শন ল্যান্ডিং পেজ এবং নির্ভরযোগ্য ই-কমার্স ইঞ্জিন—বাংলাদেশ ও আন্তর্জাতিক ব্যবসার জন্য।
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button size="lg" variant="primary" asChild className="w-full sm:w-auto">
              <Link href="/get-a-quote">
                প্রজেক্টের বাজেট ও কোটেশন চান
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/services">আমাদের সেবাসমূহ দেখুন</Link>
            </Button>
          </div>

          {/* Engineering Metrics Ticker */}
          <div className="pt-12 sm:pt-16">
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 rounded-xl border border-border/80 bg-surface/50 p-6 sm:grid-cols-4 backdrop-blur-xs">
              <div className="space-y-1 text-center">
                <p className="font-mono text-2xl sm:text-3xl font-extrabold text-accent">&lt; ১.২s</p>
                <p className="text-xs uppercase tracking-wider text-text-muted">মোবাইল LCP স্পিড টার্গেট</p>
              </div>
              <div className="space-y-1 text-center">
                <p className="font-mono text-2xl sm:text-3xl font-extrabold text-text-primary">১০০%</p>
                <p className="text-xs uppercase tracking-wider text-text-muted">টাইপ-সেফ API কন্ট্রাক্ট</p>
              </div>
              <div className="space-y-1 text-center">
                <p className="font-mono text-2xl sm:text-3xl font-extrabold text-accent">৩০০+ PoPs</p>
                <p className="text-xs uppercase tracking-wider text-text-muted">Cloudflare এজ ডেলিভারি</p>
              </div>
              <div className="space-y-1 text-center">
                <p className="font-mono text-2xl sm:text-3xl font-extrabold text-text-primary">WCAG ২.১ AA</p>
                <p className="text-xs uppercase tracking-wider text-text-muted">এক্সেসিবল ও ইনক্লুসিভ UI</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Launch Services Bento Preview */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
          <div className="space-y-3">
            <Badge variant="accent">লঞ্চ সার্ভিস ক্যাটালগ</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
              ৩টি সুনির্দিষ্ট সার্ভিস। শতভাগ নিবেদিত ইঞ্জিনিয়ারিং।
            </h2>
            <p className="text-text-muted max-w-2xl text-base sm:text-lg">
              অপ্রয়োজনীয় সাধারণ সেবায় শক্তি অপচয় না করে, আমরা ৩টি গভীর ও অত্যন্ত চাহিদাসম্পন্ন প্রযুক্তি সার্ভিসে সর্বোচ্চ মনোযোগ দিচ্ছি।
            </p>
          </div>
          <Button variant="ghost" asChild className="self-start md:self-auto">
            <Link href="/services" className="inline-flex items-center gap-1 text-accent">
              সব সেবাসমূহ ও প্যাকেজ মূল্য
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Card 1: Web Development & Design */}
          <Card className="flex flex-col justify-between border-border bg-surface/40 hover:border-accent/40 transition-colors">
            <CardHeader className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Globe className="h-6 w-6 text-accent" />
              </div>
              <div>
                <Badge variant="outline" className="mb-2">সক্রিয় সেবা ০১</Badge>
                <CardTitle className="text-2xl text-text-primary">ওয়েব ডেভেলপমেন্ট ও ডিজাইন</CardTitle>
                <CardDescription className="text-text-muted mt-2">
                  Next.js এবং Cloudflare এজ ক্লাউডে নির্মিত হাই-স্পিড আধুনিক ওয়েবসাইট ও কনভার্শন প্ল্যাটফর্ম।
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border border-border/60 bg-background/60 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">ফ্ল্যাগশিপ সলিউশন</span>
                  <Badge variant="accent" className="text-[10px]">উচ্চ চাহিদা</Badge>
                </div>
                <h3 className="font-semibold text-text-primary text-sm">ল্যান্ডিং পেজ, মেটা পিক্সেল ও অ্যানালিটিক্স</h3>
                <p className="text-xs text-text-muted">
                  ডুয়াল মেটা পিক্সেল ও সার্ভার CAPI ইভেন্ট ডেডুপ্লিকেশন সাথে সাব-১.২s মোবাইল স্পিড।
                </p>
              </div>

              <ul className="space-y-2 text-xs text-text-muted">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                  <span>সাব-সেকেন্ড Core Web Vitals পারফরম্যান্স টার্গেট</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                  <span>মেটা ইভেন্টস ম্যানেজার টেস্ট টুলে শতভাগ ভেরিফিকেশন</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                  <span>কাস্টম করপোরেট ও মার্কেটিং প্ল্যাটফর্ম</span>
                </li>
              </ul>

              <div className="pt-2">
                <Button variant="outline" asChild className="w-full">
                  <Link href="/services/landing-page-meta-pixel">
                    ল্যান্ডিং পেজ সলিউশন দেখুন
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: E-commerce & Digital Commerce */}
          <Card className="flex flex-col justify-between border-border bg-surface/40 hover:border-accent/40 transition-colors">
            <CardHeader className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <ShoppingCart className="h-6 w-6 text-accent" />
              </div>
              <div>
                <Badge variant="outline" className="mb-2">সক্রিয় সেবা ০২</Badge>
                <CardTitle className="text-2xl text-text-primary">ই-কমার্স ও ডিজিটাল কমার্স</CardTitle>
                <CardDescription className="text-text-muted mt-2">
                  প্রোডাকশন-গ্রেড স্টোরফ্রন্ট, নিরাপদ চেকআউট ইঞ্জিন এবং লোকাল (বিকাশ/নগদ) ও গ্লোবাল পেমেন্ট ইন্টিগ্রেশন।
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border border-border/60 bg-background/60 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">ফ্ল্যাগশিপ সলিউশন</span>
                  <Badge variant="accent" className="text-[10px]">বাণিজ্যিক স্কেল</Badge>
                </div>
                <h3 className="font-semibold text-text-primary text-sm">কমপ্লিট ই-কমার্স প্ল্যাটফর্ম</h3>
                <p className="text-xs text-text-muted">
                  বিকাশ, নগদ, SSLCommerz ও Stripe সহ সিমলেস চেকআউট ও অ্যাডমিন অর্ডার ম্যানেজমেন্ট।
                </p>
              </div>

              <ul className="space-y-2 text-xs text-text-muted">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                  <span>স্টুডিওর পক্ষ থেকে ০% প্ল্যাটফর্ম সেলস কমিশন রয়্যালটি</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                  <span>অটোমেটেড কুরিয়ার বুকিং এপিআই ও SMS কনফার্মেশন</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                  <span>কার্ট ড্রপ-অফ প্রতিরোধে ফ্র্রিকশনলেস ২-স্টেপ চেকআউট</span>
                </li>
              </ul>

              <div className="pt-2">
                <Button variant="outline" asChild className="w-full">
                  <Link href="/services/complete-ecommerce-website">
                    ই-কমার্স প্ল্যাটফর্ম দেখুন
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Maintenance & Technical Support */}
          <Card className="flex flex-col justify-between border-border bg-surface/40 hover:border-accent/40 transition-colors">
            <CardHeader className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <ShieldCheck className="h-6 w-6 text-accent" />
              </div>
              <div>
                <Badge variant="outline" className="mb-2">সক্রিয় সেবা ০৩</Badge>
                <CardTitle className="text-2xl text-text-primary">ওয়েবসাইট মেইনটেন্যান্স ও টেক সাপোর্ট</CardTitle>
                <CardDescription className="text-text-muted mt-2">
                  এসএলএ-সমর্থিত মাসিক ইঞ্জিনিয়ারিং পার্টনারশিপ, সিকিউরিটি আপডেট ও ব্যাকআপ ড্রিল।
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border border-border/60 bg-background/60 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">ফ্ল্যাগশিপ সলিউশন</span>
                  <Badge variant="accent" className="text-[10px]">গ্যারান্টেড SLA অপশন</Badge>
                </div>
                <h3 className="font-semibold text-text-primary text-sm">প্রোঅ্যাক্টিভ কেয়ার রিটেইনার</h3>
                <p className="text-xs text-text-muted">
                  বেসিক থেকে কাস্টম এন্টারপ্রাইজ—১ ঘণ্টা থেকে ৪৮ ঘণ্টা জরুরি রেসপন্স টাইম অপশন।
                </p>
              </div>

              <ul className="space-y-2 text-xs text-text-muted">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                  <span>সার্বক্ষণিক স্বয়ংক্রিয় আপটাইম ও SSL মনিটরিং</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                  <span>সাপ্তাহিক অফ-সাইট ব্যাকআপ ও রিস্টোরেশন ড্রিল</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                  <span>নতুন ফিচার ও পরিবর্তনের জন্য ডেডিকেটেড ডেভেলপার আওয়ার</span>
                </li>
              </ul>

              <div className="pt-2">
                <Button variant="outline" asChild className="w-full">
                  <Link href="/services/website-maintenance">
                    রিটেইনার প্ল্যান দেখুন
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 3. Why Projukti Labs (Engineering Philosophy) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="accent">প্রযুক্তি ল্যাবস স্ট্যান্ডার্ড</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
            জেনেরিক এজেন্সির চেয়ে ইঞ্জিনিয়ারিং সততা ও পারফরম্যান্সকে আমরা বেশি প্রাধান্য দিই
          </h2>
          <p className="text-text-muted text-base sm:text-lg">
            অধিকাংশ এজেন্সি অপ্রয়োজনীয় ভারী প্লাগইন দিয়ে স্লো সাইট বানায় যা ট্রাফিকের চাপে ভেঙে পড়ে। আমরা তৈরি করি হালকা, দ্রুতগতির ও অত্যন্ত টেকসই আধুনিক সফটওয়্যার সিস্টেম।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-xl border border-border bg-surface/30 p-8 space-y-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/10 text-accent">
              <Zap className="h-5 w-5 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-text-primary">এজ পারফরম্যান্স ফার্স্ট</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              বিলম্বের প্রতি মিলিসেকেন্ড ব্যবসায় ক্ষতি করে। আমরা Cloudflare-এর গ্লোবাল এজ নেটওয়ার্কে কনটেন্ট ডিস্ট্রিবিউট করি, যা ভিজিটরদের কাছে পলকের মধ্যে পেজ পৌঁছে দেয়।
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface/30 p-8 space-y-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/10 text-accent">
              <Code2 className="h-5 w-5 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-text-primary">টাইপ-সেফ ও মেইনটেইনেবল</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              TypeScript, Zod স্কিমা ভ্যালিডেশন এবং টাইপড SQL কন্ট্রাক্ট ব্যবহার করে আমরা রানটাইম এরর দূর করি। ফলে আপনার প্রতিষ্ঠান পায় দীর্ঘমেয়াদে স্কেলেবল ও ক্লিন কোডবেস।
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface/30 p-8 space-y-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/10 text-accent">
              <ShieldCheck className="h-5 w-5 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-text-primary">প্রোঅ্যাক্টিভ সাপোর্ট ও সততা</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              লঞ্চের পরেই ক্লায়েন্টকে একা ছেড়ে যাই না। আমাদের মেইনটেন্যান্স প্ল্যানে রয়েছে ব্যাকআপ ভেরিফিকেশন, ডিপেন্ডেন্সি প্যাচিং এবং প্রিন্সিপাল আর্কিটেক্টের সাথে সরাসরি যোগাযোগ।
            </p>
          </div>
        </div>
      </section>

      {/* 4. The 6-Step Engineering Process */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-4 max-w-2xl">
          <Badge variant="accent">ডেভেলপমেন্ট লাইফসাইকেল</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
            আমরা যেভাবে প্রোডাকশন সিস্টেম তৈরি করি
          </h2>
          <p className="text-text-muted text-base">
            একটি সুশৃঙ্খল ও মাইলফলক-ভিত্তিক কর্মপদ্ধতি—যা নিশ্চিত করে স্বচ্ছতা, সময়ের সঠিক মূল্যায়ন এবং সফল ডেপ্লয়মেন্ট।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              step: "০১",
              title: "রিসার্চ ও আর্কিটেকচার",
              desc: "আপনার বিজনেস টার্গেট, কনভার্শন গোল, পেমেন্ট প্রয়োজন এবং কারিগরি স্পেসিফিকেশনের পুঙ্খানুপুঙ্খ বিশ্লেষণ।",
            },
            {
              step: "০২",
              title: "ডিজাইন সিস্টেম ও UX",
              desc: "WCAG 2.1 AA মানদণ্ড মেনে ব্র্যান্ডের জন্য নির্দিষ্ট ডিজাইন টোকেন, ওয়্যারফ্রেম ও টাইপোগ্রাফি তৈরি।",
            },
            {
              step: "০৩",
              title: "এজ কোডিং ও ইঞ্জিনিয়ারিং",
              desc: "Next.js App Router, Cloudflare Workers এবং কঠোর TypeScript কন্ট্রাক্টে ক্লিন কোড তৈরি।",
            },
            {
              step: "০৪",
              title: "টেলিমেট্রি ও QA ভেরিফিকেশন",
              desc: "Playwright ব্রাউজার টেস্ট, মেটা ইভেন্ট ম্যানেজার টেস্ট টুল এবং Core Web Vitals অডিট।",
            },
            {
              step: "০৫",
              title: "জিরো-ডাউনটাইম লঞ্চ",
              desc: "DNS মাইগ্রেশন, SSL সার্টিফিকেট হার্ডেনিং, CDN ক্যাশ ওয়ার্মিং এবং প্রোডাকশন স্মোক টেস্ট।",
            },
            {
              step: "০৬",
              title: "SLA কেয়ার ও অপ্টিমাইজেশন",
              desc: "সার্বক্ষণিক সাইট আপটাইম ট্র্যাকিং, অফ-সাইট ব্যাকআপ এবং নিয়মিত মাসিক পারফরম্যান্স টিউনিং।",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="relative rounded-lg border border-border/70 bg-surface/40 p-6 space-y-3"
            >
              <div className="font-mono text-xs font-bold text-accent">{item.step}</div>
              <h3 className="text-lg font-bold text-text-primary">{item.title}</h3>
              <p className="text-xs text-text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Founder Spotlight */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-gradient-to-b from-surface/60 to-surface/20 p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-6">
              <Badge variant="accent">নেতৃত্ব ও সরাসরি কোডিং</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
                সিনিয়র ইঞ্জিনিয়ারের সরাসরি সম্পৃক্ততা। মধ্যবর্তী অ্যাকাউন্ট ম্যানেজারের ঝামেলা নেই।
              </h2>
              <p className="text-text-muted text-base sm:text-lg leading-relaxed">
                Projukti Labs পরিচালিত হচ্ছে <strong>মো. পারভেজুল ইসলাম</strong> (Md Parvezul Islam), প্রিন্সিপাল সফটওয়্যার আর্কিটেক্টের সরাসরি তত্ত্বাবধানে। আমাদের সাথে কাজ করার সময় আপনার আর্কিটেকচার ব্লুপ্রিন্ট, টেকনিক্যাল স্পেসিফিকেশন ও কোড রিভিউ সরাসরি সিনিয়র ইঞ্জিনিয়ারিং লিড দ্বারা সম্পন্ন হয়।
              </p>
              <p className="text-text-muted text-sm sm:text-base leading-relaxed">
                বিজ্ঞাপনের জন্য কনভার্শন-ক্রিটিক্যাল ল্যান্ডিং পেজ হোক কিংবা একাধিক গেটওয়েযুক্ত ই-কমার্স প্ল্যাটফর্ম—আমরা শতভাগ পেশাদারিত্ব ও স্বচ্ছতার সাথে কাজ করি।
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <Button variant="outline" asChild>
                  <Link href="/founder">
                    ফাউন্ডার প্রোফাইল ও ম্যানিফেস্টো পড়ুন
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/about">স্টুডিও সম্পর্কে জানুন</Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-sm rounded-xl border border-border bg-surface p-6 text-center space-y-4 shadow-xl">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 border-accent/40 bg-accent/10 font-mono text-3xl font-extrabold text-accent">
                  PI
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary">মো. পারভেজুল ইসলাম</h3>
                  <p className="text-xs text-accent uppercase tracking-wider font-semibold mt-1">
                    ফাউন্ডার ও প্রিন্সিপাল সফটওয়্যার আর্কিটেক্ট
                  </p>
                  <p className="text-xs text-text-muted mt-2">
                    সিস্টেম আর্কিটেকচার · এজ কম্পিউটিং · Next.js · ক্লাউড ইনফ্রাস্ট্রাকচার
                  </p>
                </div>
                <div className="pt-2 border-t border-border flex justify-center gap-2">
                  <Badge variant="outline" className="text-[10px]">ভেরিফাইড টেকনিক্যাল লিড</Badge>
                  <Badge variant="outline" className="text-[10px]">projuktilabs.tech</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. High-Impact Conversion Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-accent/40 bg-surface/90 p-8 sm:p-12 text-center space-y-6">
          <div className="mx-auto max-w-2xl space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary">
              একটি অসাধারণ ডিজিটাল প্রোডাক্ট বানাতে প্রস্তুত?
            </h2>
            <p className="text-text-muted text-base sm:text-lg">
              আপনার প্রজেক্টের প্রয়োজনীয়তা আমাদের জানান। ২৪ ঘণ্টার মধ্যে আমরা আপনার লক্ষ্য পর্যালোচনা করে বিস্তারিত স্কোপ অব ওয়ার্ক ও কোটেশন পাঠাব।
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button size="lg" variant="primary" asChild className="w-full sm:w-auto">
              <Link href="/get-a-quote">
                অফিসিয়াল কোটেশন রিকোয়েস্ট করুন
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/contact">একটি টেকনিক্যাল আলোচনার সময় নির্ধারণ করুন</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
