import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowRight, Cpu, ShieldCheck, Terminal, Award } from "lucide-react";

export const metadata = {
  title: "ফাউন্ডার প্রোফাইল — মো. পারভেজুল ইসলাম | Projukti Labs",
  description:
    "Projukti Labs-এর প্রতিষ্ঠাতা ও প্রিন্সিপাল সফটওয়্যার আর্কিটেক্ট মো. পারভেজুল ইসলাম (Md Parvezul Islam)-এর প্রোফাইল, টেকনিক্যাল ম্যানিফেস্টো এবং ইঞ্জিনিয়ারিং দর্শন।",
};

export default function FounderPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-20">
      {/* Hero Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-8 space-y-6">
          <div className="inline-flex items-center gap-2">
            <Badge variant="accent">ফাউন্ডার ও প্রিন্সিপাল সফটওয়্যার আর্কিটেক্ট</Badge>
            <Badge variant="outline">projuktilabs.tech</Badge>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary leading-tight">
            মো. পারভেজুল ইসলাম
          </h1>

          <p className="text-lg sm:text-xl text-text-muted leading-relaxed">
            সফটওয়্যার আর্কিটেক্ট, সিস্টেমস ইঞ্জিনিয়ার ও প্রযুক্তিবিদ—যিনি নিবেদিত আল্ট্রা-রিলায়েবল, হাই-থ্রুপুট ডিজিটাল প্ল্যাটফর্ম, এজ কম্পিউটিং অ্যাপ্লিকেশন এবং হাই-কনভার্শন সিস্টেম নির্মাণে।
          </p>

          <p className="text-sm sm:text-base text-text-muted leading-relaxed italic border-l-2 border-accent pl-4">
            &ldquo;আমি একটি সহজ বিশ্বাস থেকে Projukti Labs প্রতিষ্ঠা করেছি: সফটওয়্যার হবে দ্রুতগতির, সত্যনিষ্ঠ, টেকসই এবং বাস্তব ব্যবসায়িক সমস্যা সমাধানের হাতিয়ার—অপ্রয়োজনীয় মধ্যবর্তী এজেন্সির ঝামেলা ছাড়াই।&rdquo;
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Button variant="primary" asChild>
              <Link href="/get-a-quote">
                প্রজেক্ট কনসালটেশন নিন
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">সরাসরি বার্তা পাঠান</Link>
            </Button>
          </div>
        </div>

        <div className="lg:col-span-4 flex justify-center">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-8 text-center space-y-6 shadow-2xl">
            <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full border-2 border-accent/40 bg-accent/10 font-mono text-4xl font-extrabold text-accent">
              PI
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-text-primary">মো. পারভেজুল ইসলাম</h2>
              <p className="text-xs uppercase tracking-wider font-semibold text-accent">
                Principal Software Architect
              </p>
              <p className="text-xs text-text-muted">
                ঢাকা, বাংলাদেশ · আন্তর্জাতিক ক্লায়েন্ট সেবা
              </p>
            </div>

            <div className="pt-4 border-t border-border/80 space-y-2 text-left text-xs text-text-muted font-mono">
              <div className="flex justify-between">
                <span>ফোকাস:</span>
                <span className="text-text-primary">এজ সিস্টেম ও ওয়েব</span>
              </div>
              <div className="flex justify-between">
                <span>রোল:</span>
                <span className="text-text-primary">হ্যান্ডস-অন আর্কিটেকচার</span>
              </div>
              <div className="flex justify-between">
                <span>স্ট্যাটাস:</span>
                <span className="text-accent font-semibold">সরাসরি ক্লায়েন্ট ওয়ার্ক</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Architectural Manifesto */}
      <div className="border-t border-border pt-12 space-y-8">
        <div className="max-w-2xl space-y-2">
          <Badge variant="accent">আর্কিটেকচারাল ম্যানিফেস্টো</Badge>
          <h2 className="text-3xl font-extrabold text-text-primary">
            যেভাবে আমি সফটওয়্যার সিস্টেম আর্কিটেক্ট করি
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-border bg-surface/40">
            <CardHeader className="space-y-2">
              <Terminal className="h-6 w-6 text-accent" />
              <CardTitle className="text-xl text-text-primary">১. একক দায়িত্ব ও সুস্পষ্ট বাউন্ডারি</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-muted leading-relaxed">
                মাল্টি-টিয়ার্ড ই-কমার্স চেকআউট ইঞ্জিন হোক কিংবা একটি সিঙ্গেল কনভার্শন ল্যান্ডিং পেজ—আমি মডুলার আর্কিটেকচার মেনে চলি। প্রতিটি কম্পোনেন্টের সুস্পষ্ট বাউন্ডারি থাকে, কম্পাইল টাইমে টাইপ-সেফটি নিশ্চিত হয় এবং ডিপেন্ডেন্সি থাকে সর্বনিম্ন।
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-surface/40">
            <CardHeader className="space-y-2">
              <Cpu className="h-6 w-6 text-accent" />
              <CardTitle className="text-xl text-text-primary">২. ভারী সার্ভারের বদলে এজ কম্পিউটিং</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-muted leading-relaxed">
                আধুনিক এজ রানটাইম (Cloudflare Workers, V8 isolates) ব্যবহার করে আমরা শেষ ব্যবহারকারীর খুব কাছে কয়েক মিলিসেকেন্ডে সার্ভার লজিক চালাই। কোনো কোল্ড স্টার্ট থাকে না, সার্ভার ডাউন হওয়ার ভয় দূর হয় এবং স্কেল করা সহজ হয়।
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-surface/40">
            <CardHeader className="space-y-2">
              <ShieldCheck className="h-6 w-6 text-accent" />
              <CardTitle className="text-xl text-text-primary">৩. ভেরিফাইড টেলিমেট্রি ও পরিমাপযোগ্য ফলাফল</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-muted leading-relaxed">
                সঠিক ট্র্যাকিং ছাড়া ল্যান্ডিং পেজ তৈরি করা মানে চোখ বন্ধ করে গাড়ি চালানো। আমি নিজে প্রতিটি Meta Pixel ইভেন্ট, CAPI সার্ভার পেলোড এবং GA4 ডাটা টেস্ট করে শতভাগ ভেরিফাই করার পরই প্রজেক্ট হ্যান্ডওভার করি।
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-surface/40">
            <CardHeader className="space-y-2">
              <Award className="h-6 w-6 text-accent" />
              <CardTitle className="text-xl text-text-primary">৪. প্রতিষ্ঠাতা-থেকে-প্রতিষ্ঠাতা দায়িত্ববোধ</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-muted leading-relaxed">
                Projukti Labs-এর সাথে কাজ করার অর্থ আপনি একজন অভিজ্ঞ সফটওয়্যার ইঞ্জিনিয়ারের সাথে সরাসরি কাজ করছেন যিনি আপনার বিজনেস লক্ষ্য, আরওআই (ROI) এবং দীর্ঘমেয়াদী প্রযুক্তিগত স্থায়িত্বকে নিজের মতো গুরুত্ব দেন।
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Core Technical Disciplines */}
      <div className="border-t border-border pt-12 space-y-8">
        <div className="max-w-2xl space-y-2">
          <Badge variant="outline">কোর দক্ষতা ও প্রযুক্তি</Badge>
          <h2 className="text-3xl font-extrabold text-text-primary">
            প্রযুক্তি স্ট্যাক ও ইঞ্জিনিয়ারিং স্পেশালাইজেশন
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-lg border border-border bg-surface/30 p-5 space-y-3">
            <h3 className="font-bold text-text-primary text-sm flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              ফ্রন্টএন্ড ও ডিজাইন সিস্টেম
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, WCAG 2.1 AA এক্সেসিবিলিটি, রেসপন্সিভ মোবাইল আর্কিটেকচার।
            </p>
          </div>

          <div className="rounded-lg border border-border bg-surface/30 p-5 space-y-3">
            <h3 className="font-bold text-text-primary text-sm flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              এজ ও সার্ভারলেস
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Cloudflare Workers (workerd), V8 Isolate সিকিউরিটি, Edge ক্যাশিং, KV, Durable Objects, Cloudflare R2 স্টোরেজ।
            </p>
          </div>

          <div className="rounded-lg border border-border bg-surface/30 p-5 space-y-3">
            <h3 className="font-bold text-text-primary text-sm flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              ডাটাবেস ও স্টোরেজ
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Cloudflare D1 (SQLite), Drizzle ORM, PostgreSQL, Redis/KV ক্যাশিং, টাইপ-সেফ কোয়েরি এবং মাইগ্রেশন।
            </p>
          </div>

          <div className="rounded-lg border border-border bg-surface/30 p-5 space-y-3">
            <h3 className="font-bold text-text-primary text-sm flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              পেমেন্ট ও ট্র্যাকিং
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              বিকাশ PGW, নগদ, SSLCommerz, Stripe Elements, Meta Pixel + CAPI ডেডুপ্লিকেশন, GA4 এনহ্যান্সড মেজারমেন্ট।
            </p>
          </div>
        </div>
      </div>

      {/* Consultation Banner */}
      <div className="rounded-2xl border border-border bg-surface/60 p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
          আপনার পরবর্তী প্রজেক্টের জন্য আর্কিটেকচারাল পরামর্শ প্রয়োজন?
        </h2>
        <p className="text-text-muted text-sm sm:text-base max-w-xl mx-auto">
          সরাসরি একটি টেকনিক্যাল কনসালটেশন শিডিউল করুন অথবা প্রজেক্টের কোটেশন রিকোয়েস্ট পাঠিয়ে আপনার লক্ষ্য, সময় ও বাজেট নিয়ে আলোচনা করুন।
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary" asChild>
            <Link href="/get-a-quote">
              প্রজেক্ট কোটেশন চান
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">সরাসরি বার্তা পাঠান</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
