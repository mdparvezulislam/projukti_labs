import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowRight, Shield, Zap, Compass, Users } from "lucide-react";

export const metadata = {
  title: "আমাদের সম্পর্কে | Projukti Labs — স্টুডিও পরিচিতি ও দর্শন",
  description:
    "Projukti Labs সম্পর্কে জানুন—আমাদের সফটওয়্যার ইঞ্জিনিয়ারিং দর্শন, আর্কিটেকচারাল ডিসিপ্লিন এবং বাংলাদেশ ও আন্তর্জাতিক ক্লায়েন্টদের জন্য হাই-পারফরম্যান্স ডিজিটাল সিস্টেম নির্মাণের প্রত্যয়।",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-20">
      {/* Hero Section */}
      <div className="max-w-3xl space-y-6">
        <Badge variant="accent">স্টুডিও দর্শন ও লক্ষ্য</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-text-primary leading-tight">
          আমরা তৈরি করি দীর্ঘস্থায়ী প্রযুক্তি। সম্পূর্ণ নিখুঁত ইঞ্জিনিয়ারিং।
        </h1>
        <p className="text-lg sm:text-xl text-text-muted leading-relaxed">
          Projukti Labs একটি স্বাধীন প্রিমিয়াম প্রযুক্তি স্টুডিও—যার প্রতিষ্ঠাতা <strong>মো. পারভেজুল ইসলাম</strong> (Md Parvezul Islam)। গতানুগতিক এজেন্সির ভারী ও জটিল টেমপ্লেট এবং অস্বচ্ছ সাব-কন্ট্রাক্টিং মডেলের বিপরীতে আমরা বেছে নিয়েছি গভীর ইঞ্জিনিয়ারিং মানদণ্ড, সাব-সেকেন্ড পেজ স্পিড এবং ক্লায়েন্টের সাথে স্বচ্ছ দীর্ঘমেয়াদী অংশীদারিত্ব।
        </p>
      </div>

      {/* The Story & Mission */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-border pt-12">
        <div className="lg:col-span-5 space-y-4">
          <Badge variant="outline">আমাদের প্রেক্ষাপট</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
            স্থানীয় ব্যবসার সম্ভাবনা ও গ্লোবাল ইঞ্জিনিয়ারিং মানের মেলবন্ধন
          </h2>
          <p className="text-text-muted text-sm sm:text-base leading-relaxed">
            বর্তমান ডিজিটাল ব্যবসায় যেকোনো ওয়েবসাইট কিংবা অনলাইন স্টোর সরাসরি বিক্রয়ের মূল ভিত্তি। অথচ বাংলাদেশে ও উদীয়মান বাজারে বহু প্রতিষ্ঠান ভোগে দুর্বল, ধীরগতির সাইটে—যা কোনো মার্কেটিং ক্যাম্পেইন চালালেই অতিরিক্ত ট্রাফিকের চাপে ডাউন হয়ে যায় কিংবা আনভেরিফাইড পিক্সেলের কারণে বিজ্ঞাপনের বাজেট অপচয় করে।
          </p>
          <p className="text-text-muted text-sm sm:text-base leading-relaxed">
            Projukti Labs প্রতিষ্ঠিত হয়েছে এই সমস্যার সমাধান করতে: এন্টারপ্রাইজ-গ্রেড সফটওয়্যার ইঞ্জিনিয়ারিং আর্কিটেকচারকে সহজ ও সাশ্রয়ীভাবে ক্লায়েন্টের হাতে তুলে দিতে।
          </p>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card className="border-border bg-surface/40">
            <CardHeader className="space-y-2">
              <Zap className="h-6 w-6 text-accent" />
              <CardTitle className="text-lg text-text-primary">জিরো-ব্লোট আর্কিটেকচার</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-text-muted leading-relaxed">
                আমরা তৈরি করি আধুনিক এজ রানটাইম (Next.js, Cloudflare Workers) ও টাইপ-সেফ ডাটাবেসের উপর। কোনো অপ্রয়োজনীয় ৬০টি প্লাগইন নয়, কোনো ধীরগতি নয়।
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-surface/40">
            <CardHeader className="space-y-2">
              <Shield className="h-6 w-6 text-accent" />
              <CardTitle className="text-lg text-text-primary">ভেরিফাইড টেলিমেট্রি</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-text-muted leading-relaxed">
                আমরা মুখে নয়, পরিমাপযোগ্য প্রমাণে বিশ্বাসী। Meta Conversions API (CAPI) ডেডুপ্লিকেশন থেকে শুরু করে Core Web Vitals—সবকিছু হস্তান্তরের পূর্বে টেস্ট করে প্রমাণ দেওয়া হয়।
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-surface/40">
            <CardHeader className="space-y-2">
              <Compass className="h-6 w-6 text-accent" />
              <CardTitle className="text-lg text-text-primary">ডুয়াল মার্কেট দক্ষতা</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-text-muted leading-relaxed">
                আমরা বাংলাদেশের কমার্স ইকোসিস্টেম (বিকাশ, নগদ, পাঠাও/স্টেডফাস্ট এপিআই) গভীরভাবে বুঝি, ঠিক তেমনি আন্তর্জাতিক পেমেন্ট ও গ্লোবাল স্ট্যান্ডার্ডেও দক্ষ (Stripe, WCAG, GDPR)।
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-surface/40">
            <CardHeader className="space-y-2">
              <Users className="h-6 w-6 text-accent" />
              <CardTitle className="text-lg text-text-primary">দীর্ঘমেয়াদী রিটেইনার কেয়ার</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-text-muted leading-relaxed">
                আমরা আমাদের কোডের দায়িত্ব নিই। আমাদের এসএলএ-সমর্থিত মাসিক মেইনটেন্যান্স রিটেইনার নিয়মিত আপটাইম মনিটরিং, ব্যাকআপ ও ডেভেলপার সময় সরবরাহ করে।
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Core Engineering Principles */}
      <div className="space-y-8 border-t border-border pt-12">
        <div className="space-y-2 max-w-2xl">
          <Badge variant="accent">আমাদের আচরণবিধি ও নীতি</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
            যে ইঞ্জিনিয়ারিং মূল্যবোধে আমরা কখনো আপস করি না
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-lg border border-border bg-surface/30 p-6 space-y-3">
            <span className="font-mono text-xs font-bold text-accent">০১</span>
            <h3 className="text-lg font-bold text-text-primary">সত্যনিষ্ঠ ইঞ্জিনিয়ারিং</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              আমরা কখনো বানানো মেট্রিক্স বা ফেক পোর্টফোলিও উপস্থাপন করি না। প্রতিটি কারিগরি সিদ্ধান্তের সুবিধা এবং সীমাবদ্ধতা আমরা চুক্তি স্বাক্ষরের আগেই স্পষ্ট ব্যাখ্যা করি।
            </p>
          </div>

          <div className="rounded-lg border border-border bg-surface/30 p-6 space-y-3">
            <span className="font-mono text-xs font-bold text-accent">০২</span>
            <h3 className="text-lg font-bold text-text-primary">সরাসরি দায়বদ্ধতা</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              আপনি সরাসরি সফটওয়্যার ইঞ্জিনিয়ারদের সাথে কথা বলেন যারা কোড লিখছেন এবং ডাটাবেস আর্কিটেক্ট করছেন। কোনো সেলস এজেন্ট বা মধ্যবর্তী বিভ্রান্তিকর যোগাযোগ নেই।
            </p>
          </div>

          <div className="rounded-lg border border-border bg-surface/30 p-6 space-y-3">
            <span className="font-mono text-xs font-bold text-accent">০৩</span>
            <h3 className="text-lg font-bold text-text-primary">কোডের পূর্ণাঙ্গ মালিকানা</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              প্রজেক্ট সম্পন্ন ও পরিশোধের পর আপনার সোর্স কোড, স্ক্রিপ্ট, ডাটাবেস স্কিমা ও ডকুমেন্টেশনের শতভাগ মালিকানা আপনার। কোনো কৃত্রিম ভেন্ডর লক-ইন নেই।
            </p>
          </div>
        </div>
      </div>

      {/* Conversion Banner */}
      <div className="rounded-2xl border border-border bg-surface/60 p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
          Projukti Labs-এর সাথে কাজ করতে আগ্রহী?
        </h2>
        <p className="text-text-muted text-sm sm:text-base max-w-xl mx-auto">
          আমাদের লঞ্চ সার্ভিস প্যাকেজগুলো দেখুন অথবা আপনার প্রজেক্টের বিস্তারিত পাঠিয়ে টেকনিক্যাল কনসালটেশন নিন।
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary" asChild>
            <Link href="/get-a-quote">
              প্রজেক্ট কোটেশন চান
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/founder">ফাউন্ডার পরিচিতি</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
