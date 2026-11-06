import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { AccordionItem } from "@/components/ui/accordion";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Clock,
  Activity,
  HardDrive,
  Check,
} from "lucide-react";
import { getServiceBySlug } from "@/modules/services/data";

export const metadata = {
  title: "ওয়েবসাইট মেইনটেন্যান্স ও টেকনিক্যাল সাপোর্ট রিটেইনার | Projukti Labs",
  description:
    "প্রোঅ্যাক্টিভ ইঞ্জিনিয়ারিং রিটেইনার: ৫-মিনিট আপটাইম পর্যবেক্ষণ, অফ-সাইট ব্যাকআপ ভেরিফিকেশন, সিকিউরিটি প্যাচ ও গ্যারান্টেড এসএলএ (SLA)।",
};

export default function WebsiteMaintenancePage() {
  const service = getServiceBySlug("website-maintenance");
  const packages = service?.packages || [];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-24">
      {/* 1. Hero Section */}
      <div className="max-w-4xl space-y-6">
        <div className="inline-flex items-center gap-2">
          <Badge variant="accent">ফ্ল্যাগশিপ সেবা</Badge>
          <Badge variant="outline">মেইনটেন্যান্স ও টেকনিক্যাল সাপোর্ট</Badge>
          <span className="font-mono text-xs text-accent">১ঘ–৪৮ঘ SLA অপশন</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.1]">
          প্রোঅ্যাক্টিভ ওয়েবসাইট মেইনটেন্যান্স ও{" "}
          <span className="text-accent underline decoration-accent/40 decoration-wavy">
            টেকনিক্যাল রিটেইনার
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-text-muted leading-relaxed max-w-3xl">
          জিরো ডাউনটাইম সারপ্রাইজ। আমরা আপনার ব্যবসাকে সুরক্ষিত রাখি ধারাবাহিক ৫-মিনিট হেলথ মনিটরিং, স্বয়ংক্রিয় অফ-সাইট ব্যাকআপ ড্রিল, সিকিউরিটি আপডেট ব্যবস্থাপনা এবং প্রতি মাসে ডেডিকেটেড ডেভেলপার সময়ের মাধ্যমে।
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <Button size="lg" variant="primary" asChild>
            <Link href="/get-a-quote?service=website-maintenance&package=business-care">
              বিজনেস কেয়ার শুরু করুন
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#care-matrix">৪টি কেয়ার টিয়ারের তুলনা দেখুন</Link>
          </Button>
        </div>
      </div>

      {/* 2. Visual Care Pillars Diagram */}
      <div className="rounded-2xl border border-border bg-surface/40 p-6 sm:p-10 space-y-8">
        <div className="space-y-2 max-w-2xl">
          <Badge variant="accent">প্রোঅ্যাক্টিভ ইঞ্জিনিয়ারিং রুটিন</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
            যেভাবে আমরা আপনার প্রোডাকশন সিস্টেম সুরক্ষিত রাখি
          </h2>
          <p className="text-xs sm:text-sm text-text-muted">
            কোনো কিছু ভেঙে পড়ার অপেক্ষা না করে আমরা প্রতিনিয়ত সিস্টেম অডিট এবং ফাইন-টিউনিং করি।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="rounded-xl border border-border/80 bg-background/80 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">পিলার ০১</span>
              <Activity className="h-4 w-4 text-text-muted" />
            </div>
            <h3 className="font-bold text-text-primary text-sm">৫-মিনিট আপটাইম টেলিমেট্রি</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              স্বয়ংক্রিয় গ্লোবাল প্রোব প্রতি ৫ মিনিটে সাইট চেক করে। ডাউনটাইম দেখা দিলে মুহূর্তেই অন-কল ইঞ্জিনিয়ারের কাছে অ্যালার্ট চলে যায়।
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-background/80 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">পিলার ০২</span>
              <HardDrive className="h-4 w-4 text-accent" />
            </div>
            <h3 className="font-bold text-text-primary text-sm">অফ-সাইট ব্যাকআপ ড্রিল</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              স্বয়ংক্রিয় ডাটাবেস ও স্ট্যাটিক স্ন্যাপশট ভিন্ন ক্লাউড রিজিয়নে সংরক্ষিত থাকে এবং নিয়মিত রিস্টোরেশন ড্রিল পরিচালনা করা হয়।
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-background/80 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">পিলার ০৩</span>
              <ShieldCheck className="h-4 w-4 text-text-muted" />
            </div>
            <h3 className="font-bold text-text-primary text-sm">স্টেজিং সিকিউরিটি প্যাচ</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Node.js, Next.js ও এনপিএম প্যাকেজের সিকিউরিটি দুর্বলতা প্রোডাকশনে দেওয়ার আগে আলাদা স্টেজিং পরিবেশে পুঙ্খানুপুঙ্খ টেস্ট করা হয়।
            </p>
          </div>

          <div className="rounded-xl border border-accent/60 bg-accent/5 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-accent">পিলার ০৪</span>
              <Clock className="h-4 w-4 text-accent" />
            </div>
            <h3 className="font-bold text-text-primary text-sm">ডেডিকেটেড ডেভেলপার আওয়ার</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              UI পরিবর্তন, ক্যাম্পেইন ব্যানার আপডেট, স্পিড টিউনিং ও নতুন কনটেন্ট ফরম্যাটিংয়ের জন্য প্রতি মাসে নির্ধারিত ডেভেলপার সময় অন্তর্ভুক্ত।
            </p>
          </div>
        </div>
      </div>

      {/* 3. The 4 Care Plans Pricing Cards */}
      <div id="care-matrix" className="space-y-12 border-t border-border pt-16">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <Badge variant="accent">মাসিক রিটেইনার</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary">
            ৪টি প্রোঅ্যাক্টিভ কেয়ার রিটেইনার টিয়ার
          </h2>
          <p className="text-text-muted text-sm sm:text-base">
            আপনার ব্যবসার প্রয়োজনীয়তা অনুযায়ী মানানসই SLA রেসপন্স টাইম ও ডেভেলপমেন্ট সাপোর্ট বেছে নিন।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              className={`flex flex-col justify-between border-border bg-surface/50 ${
                pkg.popular ? "ring-2 ring-accent border-accent/40" : ""
              }`}
            >
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-base text-text-primary">{pkg.name}</span>
                  {pkg.popular && <Badge variant="accent" className="text-[10px]">সুপারিশকৃত</Badge>}
                </div>

                <div className="space-y-1">
                  <div className="font-mono text-2xl font-extrabold text-accent">
                    {pkg.priceBdt ? `৳ ${pkg.priceBdt.toLocaleString()}` : "কাস্টম স্কোপ"}
                  </div>
                  <div className="text-[11px] text-text-muted font-mono">
                    {pkg.priceUsd ? `অথবা $${pkg.priceUsd} USD` : "বেসপোক SLA"} / মাস
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded bg-background/80 p-2 text-xs font-mono">
                  <Clock className="h-3.5 w-3.5 text-accent" />
                  <span>SLA: {pkg.slaHours} ঘণ্টা রেসপন্স</span>
                </div>

                <CardDescription className="text-xs text-text-muted leading-relaxed">
                  {pkg.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="space-y-2 border-t border-border/60 pt-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-text-primary">
                    {pkg.name}-এ অন্তর্ভুক্ত:
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
                    className="w-full text-xs"
                  >
                    <Link
                      href={`/get-a-quote?service=website-maintenance&package=${encodeURIComponent(
                        pkg.slug
                      )}`}
                    >
                      {pkg.name} বেছে নিন
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 4. SLA Comparison Matrix Table */}
      <div className="rounded-xl border border-border bg-surface/30 p-6 sm:p-8 space-y-6">
        <h3 className="text-xl font-bold text-text-primary">
          এসএলএ ও সুযোগ-সুবিধার বিস্তারিত তুলনা
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border text-text-muted uppercase font-mono text-[11px]">
              <tr>
                <th className="py-3 pr-4">ফিচার / SLA</th>
                <th className="py-3 px-4">Basic Care</th>
                <th className="py-3 px-4 font-bold text-accent">Business Care</th>
                <th className="py-3 px-4">Priority Care</th>
                <th className="py-3 pl-4">Custom Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 font-mono text-text-muted">
              <tr>
                <td className="py-3 pr-4 font-sans font-semibold text-text-primary">মাসিক রিটেইনার ফি</td>
                <td className="py-3 px-4">৳ ৮,০০০ ($৮০)</td>
                <td className="py-3 px-4 font-bold text-accent">৳ ১৮,০০০ ($১৮০)</td>
                <td className="py-3 px-4">৳ ৩৮,০০০ ($৩৮০)</td>
                <td className="py-3 pl-4">কাস্টম স্কোপ</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-sans font-semibold text-text-primary">জরুরি রেসপন্স SLA অপশন</td>
                <td className="py-3 px-4">৪৮ ঘণ্টা</td>
                <td className="py-3 px-4 font-bold text-accent">২৪ ঘণ্টা</td>
                <td className="py-3 px-4">৪ ঘণ্টা</td>
                <td className="py-3 pl-4 font-bold text-accent">১ ঘণ্টা ইমার্জেন্সি</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-sans font-semibold text-text-primary">মাসিক ডেডিকেটেড ডেভেলপার আওয়ার</td>
                <td className="py-3 px-4">০ ঘণ্টা</td>
                <td className="py-3 px-4 font-bold text-accent">৪ ঘণ্টা</td>
                <td className="py-3 px-4">১০ ঘণ্টা</td>
                <td className="py-3 pl-4">২০+ ঘণ্টা</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-sans font-semibold text-text-primary">আপটাইম মনিটরিং ফ্রিকোয়েন্সি</td>
                <td className="py-3 px-4">১৫ মিনিট পর পর</td>
                <td className="py-3 px-4 font-bold text-accent">৫ মিনিট পর পর</td>
                <td className="py-3 px-4">১ মিনিট পর পর</td>
                <td className="py-3 pl-4">রিয়েল-টাইম প্রোব</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-sans font-semibold text-text-primary">ব্যাকআপ ফ্রিকোয়েন্সি</td>
                <td className="py-3 px-4">সাপ্তাহিক</td>
                <td className="py-3 px-4 font-bold text-accent">দৈনিক</td>
                <td className="py-3 px-4">দৈনিক + অন-ডিমান্ড</td>
                <td className="py-3 pl-4">পয়েন্ট-ইন-টাইম স্ন্যাপশট</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-sans font-semibold text-text-primary">সাপোর্ট চ্যানেল</td>
                <td className="py-3 px-4">ইমেল পোর্টাল</td>
                <td className="py-3 px-4 font-bold text-accent">ইমেল + হোয়াটসঅ্যাপ</td>
                <td className="py-3 px-4">হোয়াটসঅ্যাপ + সরাসরি ফোন</td>
                <td className="py-3 pl-4">ডেডিকেটেড স্ল্যাক / টিম চ্যানেল</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. What Is Covered vs What Is Excluded */}
      <div className="space-y-8 border-t border-border pt-12">
        <div className="max-w-2xl space-y-2">
          <Badge variant="accent">স্কোপের পরিধি</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
            রিটেইনারের আওতাভুক্ত বনাম আওতাবহির্ভূত কাজ
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-xl border border-accent/30 bg-surface/40 p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-accent flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-accent" />
              রিটেইনারে যা যা অন্তর্ভুক্ত
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-text-muted">
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span>রানটাইম বাগ, ব্রোকেন লিংক এবং লেআউট ত্রুটি সংশোধন</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span>সিকিউরিটি প্যাচ ও npm প্যাকেজ ডিপেন্ডেন্সি অডিট ও আপডেট</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span>SSL সার্টিফিকেট মনিটরিং এবং নবায়ন সহায়তা</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span>ব্যানার আপডেট, মূল্য পরিবর্তন বা নতুন প্রোডাক্ট ফরম্যাটিং (ডেভেলপার আওয়ার ব্যবহার করে)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span>নিয়মিত Core Web Vitals স্পিড চেক ও ক্যাশ অপ্টিমাইজেশন</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-surface/20 p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-text-muted flex items-center gap-2">
              <XCircle className="h-5 w-5 text-text-muted" />
              যা আলাদা প্রজেক্ট হিসেবে বিবেচিত হবে
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-text-muted">
              <li className="flex items-start gap-2.5">
                <span className="text-border font-bold shrink-0 mt-0.5">—</span>
                <span>সম্পূর্ণ নতুন আর্কিটেকচারাল রিডিজাইন বা সম্পূর্ণ নতুন টেক স্ট্যাকে মাইগ্রেশন</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-border font-bold shrink-0 mt-0.5">—</span>
                <span>রিটেইনার আওয়ারের বাইরে জটিল মাল্টি-স্টেপ কাস্টম সফটওয়্যার ফিচার নির্মাণ</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-border font-bold shrink-0 mt-0.5">—</span>
                <span>স্ক্র্যাচ থেকে নতুন গ্রাফিক ডিজাইন বা কাস্টম প্রমোশনাল ভিডিও নির্মাণ</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-border font-bold shrink-0 mt-0.5">—</span>
                <span>সার্ভার ও থার্ড-পার্টি SaaS সাবস্ক্রিপশন ফি (ক্লায়েন্ট সরাসরি প্রোভাইডারকে পে করবেন)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 6. FAQ */}
      <div className="space-y-8 border-t border-border pt-16">
        <div className="max-w-2xl space-y-2">
          <Badge variant="outline">মেইনটেন্যান্স জিজ্ঞাসা</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
            রিটেইনার কেয়ার সম্পর্কিত সাধারণ প্রশ্নোত্তর
          </h2>
        </div>

        <div className="space-y-3 max-w-4xl">
          <AccordionItem
            title="মাসের অব্যবহৃত ডেভেলপার সময় কি পরবর্তী মাসে যোগ হয়?"
            defaultOpen={true}
          >
            <p className="text-sm text-text-muted leading-relaxed">
              হ্যাঁ, Business Care এবং Priority Care প্ল্যানে অব্যবহৃত ডেভেলপার সময় ৬০ দিন পর্যন্ত রোল-ওভার হয়। এতে আপনি কোনো বিশেষ ক্যাম্পেইন বা সিজনাল আপডেটের সময় অতিরিক্ত কাজের জন্য আওয়ার জমিয়ে রাখতে পারেন।
            </p>
          </AccordionItem>

          <AccordionItem title="অন্য কারও বানানো ওয়েবসাইট কি আপনারা মেইনটেন্যান্স করতে পারবেন?">
            <p className="text-sm text-text-muted leading-relaxed">
              হ্যাঁ, তবে এর আগে সাইটটির একটি প্রাথমিক পারফরম্যান্স ও সিকিউরিটি অনবোর্ডিং অডিট সম্পন্ন করতে হবে। আমরা কোডবেস পরীক্ষা করে ক্রিটিক্যাল ত্রুটি দূর করি, অটোমেটেড ব্যাকআপ ও মনিটরিং সেটআপ করি এবং এরপর নিয়মিত মাসিক রিটেইনারে দায়িত্ব গ্রহণ করি।
            </p>
          </AccordionItem>

          <AccordionItem title="কোনো দীর্ঘমেয়াদী চুক্তির বাধ্যবাধকতা আছে কি?">
            <p className="text-sm text-text-muted leading-relaxed">
              না, কোনো বাধ্যবাধকতা নেই। আমাদের রিটেইনার প্ল্যানগুলো মাসভিত্তিক চলে। আপনি চাইলে যেকোনো সময় ৩০ দিনের নোটিশে প্ল্যান আপগ্রেড, ডাউনগ্রেড বা বাতিল করতে পারবেন।
            </p>
          </AccordionItem>
        </div>
      </div>

      {/* 7. Bottom Conversion Banner */}
      <div className="rounded-2xl border border-accent/40 bg-surface/80 p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
          আপনার ওয়েবসাইটের নিরাপত্তা নিশ্চিত করুন আজই
        </h2>
        <p className="text-text-muted text-sm sm:text-base max-w-xl mx-auto">
          আপনার প্ল্যাটফর্মকে নিশ্চিন্ত রাখতে আমাদের একটি এসএলএ-সমর্থিত কেয়ার রিটেইনারে যুক্ত করুন।
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary" asChild>
            <Link href="/get-a-quote?service=website-maintenance">
              রিটেইনার তালিকাভুক্তি শুরু করুন
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">সাপোর্ট আর্কিটেক্টের সাথে কথা বলুন</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
