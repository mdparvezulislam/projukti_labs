import { Badge } from "@/components/ui/badge";
import { QuoteForm } from "@/components/forms/quote-form";
import { ShieldCheck, Clock, FileText } from "lucide-react";

export const metadata = {
  title: "প্রজেক্ট কোটেশন রিকোয়েস্ট | Projukti Labs",
  description:
    "আপনার প্রজেক্টের রিকোয়ারমেন্ট সাবমিট করে সুনির্দিষ্ট স্কোপ অব ওয়ার্ক, টেকনিক্যাল মাইলফলক প্ল্যান এবং স্বচ্ছ কোটেশন গ্রহণ করুন।",
};

interface PageProps {
  searchParams: Promise<{ service?: string; package?: string }>;
}

export default async function GetAQuotePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const initialService = params?.service || "";
  const initialPackage = params?.package || "";

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <Badge variant="accent">সুশৃঙ্খল পার্টনারশিপ</Badge>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-text-primary">
          প্রজেক্টের কোটেশন ও বাজেট প্রস্তাবনা চান
        </h1>
        <p className="text-base sm:text-lg text-text-muted leading-relaxed">
          আপনার প্রজেক্টের প্রয়োজনীয়তা, সম্ভাব্য সময়সীমা এবং বাজেট উল্লেখ করুন। আমরা আপনার স্পেসিফিকেশন পর্যালোচনা করে ২৪ কার্যঘণ্টার মধ্যে একটি আনুষ্ঠানিক স্কোপ অব ওয়ার্ক (SOW) প্রদান করব।
        </p>
      </div>

      {/* Trust Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center gap-3 rounded-lg border border-border/80 bg-surface/40 p-4">
          <Clock className="h-5 w-5 text-accent shrink-0" />
          <div className="text-xs">
            <span className="font-semibold text-text-primary block">২৪ ঘণ্টার মধ্যে রিভিউ</span>
            <span className="text-text-muted">সরাসরি ইঞ্জিনিয়ারদের বিশ্লেষণ</span>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-border/80 bg-surface/40 p-4">
          <FileText className="h-5 w-5 text-accent shrink-0" />
          <div className="text-xs">
            <span className="font-semibold text-text-primary block">ফিক্সড মাইলফলক</span>
            <span className="text-text-muted">কোনো লুকানো বা অতিরিক্ত চার্জ নেই</span>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-border/80 bg-surface/40 p-4">
          <ShieldCheck className="h-5 w-5 text-accent shrink-0" />
          <div className="text-xs">
            <span className="font-semibold text-text-primary block">কোডের ১০০% মালিকানা</span>
            <span className="text-text-muted">জিরো ভেন্ডর লক-ইন</span>
          </div>
        </div>
      </div>

      {/* Form Component */}
      <QuoteForm initialService={initialService} initialPackage={initialPackage} />
    </div>
  );
}
