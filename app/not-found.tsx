import Link from "next/link";
import { ArrowLeft, Home, Compass, BookOpen, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "৪০৪ — পৃষ্ঠা খুঁজে পাওয়া যায়নি | Projukti Labs",
  description: "আপনি যে পৃষ্ঠাটি খুঁজছেন তা সরানো হয়েছে বা মুছে ফেলা হয়েছে।",
};

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="max-w-xl w-full text-center space-y-6 sm:space-y-8">
        {/* Animated Badge & Code */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-brand-orange/30 bg-brand-orange/10 text-xs font-mono font-bold text-brand-orange-strong dark:text-accent shadow-2xs">
            <span>ত্রুটি ৪০৪ • Page Not Found</span>
          </div>
          <h1 className="text-6xl sm:text-8xl font-black font-mono tracking-tight text-text-primary">
            404
          </h1>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-extrabold text-text-primary tracking-tight">
            দুঃখিত, এই পেজটি খুঁজে পাওয়া যায়নি
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-md mx-auto">
            আপনি যে পৃষ্ঠাটি খুঁজছেন তা স্থানান্তর করা হয়েছে, মুছে ফেলা হয়েছে অথবা আপনার প্রবেশ করা লিঙ্কে কোনো ভুল থাকতে পারে।
          </p>
        </div>

        {/* Helpful Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Link
            href="/"
            className="flex items-center gap-3 p-3.5 rounded-2xl border border-border bg-surface hover:border-accent hover:shadow-warm-sm transition-all text-left group"
          >
            <div className="h-9 w-9 rounded-xl bg-surface-muted flex items-center justify-center text-accent group-hover:scale-105 transition-transform shrink-0">
              <Home className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-text-primary group-hover:text-accent transition-colors">মূল হোমপেজ</p>
              <p className="text-[11px] text-text-muted truncate">সলিউশন ও স্টুডিও ওভারভিউ</p>
            </div>
          </Link>

          <Link
            href="/services"
            className="flex items-center gap-3 p-3.5 rounded-2xl border border-border bg-surface hover:border-accent hover:shadow-warm-sm transition-all text-left group"
          >
            <div className="h-9 w-9 rounded-xl bg-surface-muted flex items-center justify-center text-accent group-hover:scale-105 transition-transform shrink-0">
              <Compass className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-text-primary group-hover:text-accent transition-colors">আমাদের সার্ভিসসমূহ</p>
              <p className="text-[11px] text-text-muted truncate">ই-কমার্স, ওয়েব ও ট্র্যাকিং</p>
            </div>
          </Link>

          <Link
            href="/blog"
            className="flex items-center gap-3 p-3.5 rounded-2xl border border-border bg-surface hover:border-accent hover:shadow-warm-sm transition-all text-left group"
          >
            <div className="h-9 w-9 rounded-xl bg-surface-muted flex items-center justify-center text-accent group-hover:scale-105 transition-transform shrink-0">
              <BookOpen className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-text-primary group-hover:text-accent transition-colors">প্রযুক্তি ব্লগ</p>
              <p className="text-[11px] text-text-muted truncate">বিশ্লেষণ ও কেস স্টাডি</p>
            </div>
          </Link>

          <Link
            href="/contact"
            className="flex items-center gap-3 p-3.5 rounded-2xl border border-border bg-surface hover:border-accent hover:shadow-warm-sm transition-all text-left group"
          >
            <div className="h-9 w-9 rounded-xl bg-surface-muted flex items-center justify-center text-accent group-hover:scale-105 transition-transform shrink-0">
              <Mail className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-text-primary group-hover:text-accent transition-colors">যোগাযোগ ও সাপোর্ট</p>
              <p className="text-[11px] text-text-muted truncate">সহায়তার জন্য মেসেজ দিন</p>
            </div>
          </Link>
        </div>

        {/* Primary Action Button */}
        <div className="pt-2">
          <Link href="/">
            <Button variant="primary" size="md" className="gap-2 rounded-full px-6 shadow-warm-sm">
              <ArrowLeft className="h-4 w-4" />
              <span>হোমপেজে ফিরে যান</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
