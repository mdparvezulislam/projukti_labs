import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ContactForm } from "@/components/forms/contact-form";
import { Mail, Clock, MapPin, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "যোগাযোগ | Projukti Labs",
  description:
    "Projukti Labs-এর সাথে যোগাযোগ করুন। সরাসরি ইঞ্জিনিয়ারিং ইনকোয়ারি, টেকনিক্যাল কনসালটেশন ও প্রজেক্ট প্রস্তাবনা।",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <Badge variant="accent">সরাসরি ইঞ্জিনিয়ারিং চ্যানেল</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-text-primary">
          আমাদের ইঞ্জিনিয়ারিং টিমের সাথে যোগাযোগ করুন
        </h1>
        <p className="text-lg text-text-muted leading-relaxed">
          আমাদের সেবা, টেকনিক্যাল আর্কিটেকচার বা আপনার আসন্ন প্রজেক্ট নিয়ে কোনো প্রশ্ন থাকলে সরাসরি মেসেজ পাঠান। আমরা সাধারণত ২৪ কার্যঘণ্টার মধ্যে প্রতিটি বার্তার উত্তর দিই।
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Contact Form */}
        <div className="lg:col-span-7 space-y-6">
          <ContactForm />
        </div>

        {/* Right Column: Direct Info & Trust Points */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-xl border border-border bg-surface/50 p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold text-text-primary border-b border-border pb-3">
              স্টুডিও তথ্য ও যোগাযোগ
            </h3>

            <div className="space-y-4 text-sm text-text-muted">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-text-primary">অফিসিয়াল ইমেল</p>
                  <a
                    href="mailto:contact@projuktilabs.tech"
                    className="text-accent hover:underline font-mono text-xs sm:text-sm"
                  >
                    contact@projuktilabs.tech
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-text-primary">রেসপন্স SLA</p>
                  <p className="text-xs">সর্বোচ্চ ২৪ কার্যঘণ্টার মধ্যে সরাসরি ইঞ্জিনিয়ারিং রেসপন্স।</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-text-primary">লোকেশন</p>
                  <p className="text-xs">ঢাকা, বাংলাদেশ · বিশ্বব্যাপী ক্লায়েন্ট সেবা।</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-text-primary">গোপনীয়তা ও নিরাপত্তা</p>
                  <p className="text-xs">
                    আপনার প্রজেক্টের তথ্য ও যোগাযোগের বিবরণ সম্পূর্ণ গোপন ও সুরক্ষিত রাখা হয়।
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border/60 bg-surface/30 p-6 space-y-3">
            <h4 className="font-semibold text-text-primary text-sm">বিস্তারিত কোটেশন প্রয়োজন?</h4>
            <p className="text-xs text-text-muted leading-relaxed">
              আপনার বাজেট, সময়সীমা ও নির্দিষ্ট ফিচারের তালিকা প্রস্তুত থাকলে আমাদের কোটেশন ফর্মটি ব্যবহার করুন—যাতে দ্রুত প্রস্তাবনা দেওয়া সম্ভব হয়।
            </p>
            <Button variant="outline" size="sm" asChild className="w-full mt-2">
              <Link href="/get-a-quote">
                প্রজেক্ট কোটেশন ফর্ম খুলুন
                <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
