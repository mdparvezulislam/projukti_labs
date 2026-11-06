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
  title: "কমপ্লিট ই-কমার্স প্ল্যাটফর্ম | Projukti Labs",
  description:
    "বিকাশ, নগদ, SSLCommerz ও Stripe পেমেন্ট গেটওয়ে, অটোমেটেড কুরিয়ার ট্র্যাকিং এবং ০% প্ল্যাটফর্ম সেলস কমিশন সম্বলিত পূর্ণাঙ্গ ই-কমার্স সলিউশন।",
};

export default function CompleteEcommercePage() {
  const service = getServiceBySlug("complete-ecommerce-website");
  const packages = service?.packages || [];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-24">
      {/* 1. Hero Section */}
      <div className="max-w-4xl space-y-6">
        <div className="inline-flex items-center gap-2">
          <Badge variant="accent">ফ্ল্যাগশিপ সেবা</Badge>
          <Badge variant="outline">ই-কমার্স ও ডিজিটাল কমার্স</Badge>
          <span className="font-mono text-xs text-accent">০% প্ল্যাটফর্ম সেলস কমিশন</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.1]">
          কমপ্লিট প্রোডাকশন-রেডি{" "}
          <span className="text-accent underline decoration-accent/40 decoration-wavy">
            ই-কমার্স প্ল্যাটফর্ম
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-text-muted leading-relaxed max-w-3xl">
          উচ্চগতির ডিজিটাল কমার্স ইঞ্জিন—যা নিশ্চিত করে দ্রুততম প্রোডাক্ট ব্রাউজিং, ফ্র্রিকশনলেস চেকআউট এবং স্বয়ংক্রিয় পার্সেল বুকিং। লোকাল পেমেন্ট (বিকাশ, নগদ, SSLCommerz) এবং আন্তর্জাতিক কার্ড প্রসেসিং (Stripe) ইন্টিগ্রেশনসহ সম্পূর্ণ রেডি সলিউশন।
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <Button size="lg" variant="primary" asChild>
            <Link href="/get-a-quote?service=complete-ecommerce-website&package=growth-storefront">
              গ্রোথ স্টোরফ্রন্ট শুরু করুন
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#pricing-tiers">কমার্স প্যাকেজসমূহ তুলনা করুন</Link>
          </Button>
        </div>
      </div>

      {/* 2. Visual Commerce Architecture Diagram */}
      <div className="rounded-2xl border border-border bg-surface/40 p-6 sm:p-10 space-y-8">
        <div className="space-y-2 max-w-2xl">
          <Badge variant="accent">প্ল্যাটফর্ম আর্কিটেকচার</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
            এন্ড-টু-এন্ড কমার্স ফ্লো ও ইন্টিগ্রেশন
          </h2>
          <p className="text-xs sm:text-sm text-text-muted">
            চেকআউটের ঝামেলা দূর করতে, দ্রুত পার্সেল পাঠাতে এবং ক্লায়েন্টের ডাটা সম্পূর্ণ সুরক্ষিত রাখতে বিশেষভাবে নির্মিত।
          </p>
        </div>

        {/* 5 Architecture Modules */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="rounded-xl border border-border/80 bg-background/80 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">মডিউল ০১</span>
              <Smartphone className="h-4 w-4 text-text-muted" />
            </div>
            <h3 className="font-bold text-text-primary text-sm">আল্ট্রা-ফাস্ট স্টোরফ্রন্ট</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              তাৎক্ষণিক প্রোডাক্ট লোডিং, মাল্টি-ক্যাটাগরি ফিল্টার, সার্চ অটো-কমপ্লিট এবং রেসপন্সিভ মোবাইল-ফার্স্ট ইন্টারফেস।
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-background/80 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">মডিউল ০২</span>
              <ShoppingCart className="h-4 w-4 text-accent" />
            </div>
            <h3 className="font-bold text-text-primary text-sm">২-স্টেপ চেকআউট</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              সাব-১০০ms কার্ট আপডেট, গেস্ট চেকআউট সুবিধা, সেভড ডেলিভারি অ্যাড্রেস এবং ডিসকাউন্ট কুপন ক্যালকুলেশন।
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-background/80 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">মডিউল ০৩</span>
              <CreditCard className="h-4 w-4 text-text-muted" />
            </div>
            <h3 className="font-bold text-text-primary text-sm">পেমেন্ট গেটওয়ে</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              বিকাশ PGW, নগদ, SSLCommerz ও Stripe সরাসরি ক্লায়েন্টের মার্চেন্ট অ্যাকাউন্টে ওয়েবহুক ভেরিফিকেশনসহ সংযুক্ত।
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-background/80 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">মডিউল ০৪</span>
              <Truck className="h-4 w-4 text-accent" />
            </div>
            <h3 className="font-bold text-text-primary text-sm">অটোমেটেড কুরিয়ার</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              পাঠাও / স্টেডফাস্ট এপিআই দিয়ে এক ক্লিকে পার্সেল বুকিং, ট্র্যাকিং কোড জেনারেশন ও ট্রানজ্যাকশনাল SMS অ্যালার্ট।
            </p>
          </div>

          <div className="rounded-xl border border-accent/60 bg-accent/5 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">মডিউল ০৫</span>
              <Database className="h-4 w-4 text-accent" />
            </div>
            <h3 className="font-bold text-text-primary text-sm">অ্যাডমিন ড্যাশবোর্ড</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              রিয়েল-টাইম ইনভেন্টরি, অর্ডার স্ট্যাটাস ট্র্যাকিং, প্রিন্টযোগ্য ইনভয়েস PDF এবং সেলস রিপোর্টিং।
            </p>
          </div>
        </div>
      </div>

      {/* 3. Honest Third-Party Fee Transparency */}
      <div className="rounded-xl border border-border bg-surface/30 p-6 sm:p-8 space-y-6">
        <div className="space-y-2 max-w-2xl">
          <Badge variant="outline">সম্পূর্ণ সততা ও স্বচ্ছতা</Badge>
          <h3 className="text-2xl font-bold text-text-primary">
            থার্ড-পার্টি ফি ও অপারেটিং খরচের স্পষ্ট বিবরণ
          </h3>
          <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
            সাধারণ SaaS প্ল্যাটফর্ম যেখানে আপনার প্রতি বিক্রয়ের ওপর ১% থেকে ২% কমিশন কেটে নেয়, সেখানে Projukti Labs চার্জ করে <strong>০% প্ল্যাটফর্ম সেলস কমিশন</strong>। আপনার স্টোরের পূর্ণ মালিকানা আপনার।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="rounded-lg border border-border/80 bg-background/60 p-4 space-y-2">
            <h4 className="font-bold text-text-primary text-sm flex items-center gap-2">
              <Coins className="h-4 w-4 text-accent" />
              পেমেন্ট গেটওয়ে মার্চেন্ট ফি
            </h4>
            <p className="text-xs text-text-muted leading-relaxed">
              লেনদেনের মার্চেন্ট ফি (বিকাশের জন্য আনুমানিক ১.৫%, SSLCommerz-এর জন্য ২%–২.৫%, Stripe-এর জন্য ২.৯%) সরাসরি পেমেন্ট প্রোভাইডারকে প্রদেয়। স্টুডিও কোনো মধ্যবর্তী চার্জ নেয় না।
            </p>
          </div>

          <div className="rounded-lg border border-border/80 bg-background/60 p-4 space-y-2">
            <h4 className="font-bold text-text-primary text-sm flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-accent" />
              SMS নোটিফিকেশন চার্জ
            </h4>
            <p className="text-xs text-text-muted leading-relaxed">
              অর্ডারের ট্রানজ্যাকশনাল SMS ক্রেডিট (বাংলাদেশে সাধারণত প্রতি SMS আনুমানিক ৳ ০.২৫ থেকে ৳ ০.৪০) ক্লায়েন্ট সরাসরি টেলিকম এগ্রিগেটর (Greenweb, BulkSMSBD ইত্যাদি) থেকে কিনবেন।
            </p>
          </div>

          <div className="rounded-lg border border-border/80 bg-background/60 p-4 space-y-2">
            <h4 className="font-bold text-text-primary text-sm flex items-center gap-2">
              <Truck className="h-4 w-4 text-accent" />
              কুরিয়ার ডেলিভারি চার্জ
            </h4>
            <p className="text-xs text-text-muted leading-relaxed">
              পার্সেল ডেলিভারি ফি এবং ক্যাশ অন ডেলিভারি (COD) পেমেন্ট সেটেলমেন্ট সরাসরি আপনার চুক্তিবদ্ধ কুরিয়ার পার্টনারের (স্টেডফাস্ট, পাঠাও, পেপারফ্লাই) সাথে নিষ্পত্তি হবে।
            </p>
          </div>
        </div>
      </div>

      {/* 4. Deliverables vs Exclusions Breakdown */}
      <div className="space-y-8 border-t border-border pt-12">
        <div className="max-w-2xl space-y-2">
          <Badge variant="accent">স্কোপের পরিধি</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
            অন্তর্ভুক্ত ডেলিভারেবলস বনাম সার্ভিসের আওতাবহির্ভূত বিষয়
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Deliverables */}
          <div className="rounded-xl border border-accent/30 bg-surface/40 p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-accent flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-accent" />
              আমরা যা প্রদান করি
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
          <Badge variant="accent">কমার্স প্যাকেজসমূহ</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary">
            ই-কমার্স প্ল্যাটফর্ম প্যাকেজ অপশন
          </h2>
          <p className="text-text-muted text-sm sm:text-base">
            ফিক্সড মাইলফলক বিনিয়োগ। সোর্স কোডের পূর্ণাঙ্গ মালিকানা এবং জিরো প্ল্যাটফর্ম সেলস কমিশন।
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
                  {pkg.popular && <Badge variant="accent">সেরা ভ্যালু</Badge>}
                </div>
                <div className="space-y-1">
                  <div className="font-mono text-3xl font-extrabold text-accent">
                    {pkg.priceBdt ? `৳ ${pkg.priceBdt.toLocaleString()}` : "কাস্টম স্কোপ"}
                  </div>
                  <div className="text-xs text-text-muted font-mono">
                    {pkg.priceUsd ? `অথবা $${pkg.priceUsd} USD` : "টেইলর্ড এন্টারপ্রাইজ স্কোপ"} · পূর্ণ মালিকানা
                  </div>
                </div>
                <CardDescription className="text-xs text-text-muted leading-relaxed">
                  {pkg.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-2 border-t border-border/60 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-text-primary">
                    অন্তর্ভুক্ত সুবিধাসমূহ:
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
          <Badge variant="outline">কমার্স জিজ্ঞাসা</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
            ই-কমার্স সম্পর্কিত সাধারণ প্রশ্নোত্তর
          </h2>
        </div>

        <div className="space-y-3 max-w-4xl">
          <AccordionItem
            title="আপনারা বিকাশ ও নগদ পেমেন্ট গেটওয়ে কীভাবে সংযুক্ত করেন?"
            defaultOpen={true}
          >
            <p className="text-sm text-text-muted leading-relaxed">
              আমরা অফিসিয়াল বিকাশ পেমেন্ট গেটওয়ে (PGW) এবং নগদ মার্চেন্ট এপিআই ইন্টিগ্রেট করি। গ্রাহক পেমেন্ট গেটওয়ের নিরাপদ উইন্ডোতে ওটিপি দিয়ে পেমেন্ট সম্পন্ন করেন এবং তাৎক্ষণিকভাবে অর্ডারের কনফার্মেশন পেয়ে যান। ক্লাউড সার্ভারের নিরাপদ ওয়েবহুকের মাধ্যমে স্বয়ংক্রিয়ভাবে অর্ডারের স্ট্যাটাস &apos;Paid&apos; হয়ে যায়।
            </p>
          </AccordionItem>

          <AccordionItem title="আমরা কি একই সাথে বাংলাদেশি টাকা এবং আন্তর্জাতিক ডলার গ্রহণ করতে পারব?">
            <p className="text-sm text-text-muted leading-relaxed">
              হ্যাঁ। আমাদের গ্রোথ এবং স্কেল প্যাকেজে ডুয়াল কারেন্সি সাপোর্ট রয়েছে: বাংলাদেশি গ্রাহকরা বিকাশ/নগদ/SSLCommerz-এর মাধ্যমে টাকায় পেমেন্ট করবেন, আর আন্তর্জাতিক গ্রাহকরা Stripe-এর মাধ্যমে সরাসরি ভিসা/মাস্টারকার্ড ডলারে পে করতে পারবেন।
            </p>
          </AccordionItem>

          <AccordionItem title="স্টোর লঞ্চের পর আপনারা কি টেকনিক্যাল সাপোর্ট প্রদান করেন?">
            <p className="text-sm text-text-muted leading-relaxed">
              প্রতিটি কমার্স প্রজেক্টের সাথে ৩০ দিনের ফ্রি টেকনিক্যাল ওয়ারেন্টি অন্তর্ভুক্ত থাকে—যাতে যেকোনো বাগ বা পেমেন্ট গেটওয়ে সমস্যা তৎক্ষণাৎ সমাধান করা হয়। এরপর নিয়মিত সিকিউরিটি আপডেট, অটোমেটেড ব্যাকআপ এবং সেলস অপ্টিমাইজেশনের জন্য আমাদের মাসিক বিজনেস কেয়ার বা প্রায়োরিটি কেয়ার রিটেইনার বেছে নেওয়া যায়।
            </p>
          </AccordionItem>
        </div>
      </div>

      {/* 7. Bottom Conversion Banner */}
      <div className="rounded-2xl border border-accent/40 bg-surface/80 p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
          আপনার হাই-পারফরম্যান্স অনলাইন শপ শুরু করতে প্রস্তুত?
        </h2>
        <p className="text-text-muted text-sm sm:text-base max-w-xl mx-auto">
          অফিসিয়াল প্রজেক্ট কোটেশন রিকোয়েস্ট করুন অথবা পেমেন্ট গেটওয়ে ও কুরিয়ার ইন্টিগ্রেশন নিয়ে আমাদের ইঞ্জিনিয়ারিং টিমের সাথে সরাসরি পরামর্শ করুন।
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary" asChild>
            <Link href="/get-a-quote?service=complete-ecommerce-website">
              ই-কমার্স কোটেশন চান
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">একটি টেকনিক্যাল আলোচনার সময় নির্ধারণ করুন</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
