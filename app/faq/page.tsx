import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AccordionItem } from "@/components/ui/accordion";
import { ArrowRight, HelpCircle } from "lucide-react";
import { getCmsFaqs } from "@/lib/cms";

export const metadata = {
  title: "সাধারণ জিজ্ঞাসা (FAQ) | Projukti Labs",
  description:
    "আমাদের ইঞ্জিনিয়ারিং সার্ভিস, বাজেট নির্ধারণ, পেমেন্ট পদ্ধতি, মেইনটেন্যান্স SLA এবং সোর্স কোড মালিকানা সম্পর্কিত সাধারণ প্রশ্নের খোলামেলা উত্তর।",
};

const DEFAULT_FAQ_CATEGORIES = [
  {
    category: "প্রজেক্ট পরিকল্পনা ও বাজেট নির্ধারণ",
    items: [
      {
        question: "আপনারা কীভাবে প্রজেক্টের খরচ এবং ডেলিভারির সময়সীমা নির্ধারণ করেন?",
        answer: "আমাদের স্ট্যান্ডার্ড প্রোডাক্টাইজড প্যাকেজগুলোর (যেমন ল্যান্ডিং পেজ + মেটা পিক্সেল, কমপ্লিট ই-কমার্স প্ল্যাটফর্ম, এবং মেইনটেন্যান্স রিটেইনার) ক্ষেত্রে সুনির্দিষ্ট স্কোপ এবং ফিক্সড প্রাইসিং রয়েছে। আর কাস্টম ওয়েব অ্যাপ্লিকেশনের ক্ষেত্রে আমরা আপনার কারিগরি প্রয়োজনীয়তা গভীরভাবে বিশ্লেষণ করে চুক্তি স্বাক্ষরের আগেই একটি পূর্ণাঙ্গ স্কোপ অব ওয়ার্ক (SOW) ও মাইলফলক-ভিত্তিক বাজেট প্রস্তাব দিই।",
      },
      {
        question: "আমার প্রজেক্টের কোড আসলে কারা লিখবে? কোনো থার্ড পার্টিকে সাবকন্ট্রাক্ট করা হবে?",
        answer: "না, কোনোভাবেই না। প্রতিটি প্রজেক্টের আর্কিটেকচার এবং কোড সরাসরি আমাদের কোর ইঞ্জিনিয়ারিং টিম তৈরি করে—যার সার্বিক তত্ত্বাবধান করেন প্রতিষ্ঠাতা ও প্রিন্সিপাল সফটওয়্যার আর্কিটেক্ট মো. পারভেজুল ইসলাম। আমরা কখনোই কাজ নিয়ে অন্য কোনো অপরিচিত ফ্রিল্যান্সার বা অনভিজ্ঞ ইন্টার্নদের দিয়ে করাই না।",
      },
      {
        question: "প্রজেক্ট চলাকালীন যোগাযোগ ও অগ্রগতি কীভাবে পর্যবেক্ষণ করব?",
        answer: "আপনার পছন্দের মাধ্যমে (WhatsApp, Slack বা ইমেল) নিয়মিত মাইলফলক আপডেট দেওয়া হবে। প্রতিটি ধাপ সম্পন্ন হলে আপনি একটি প্রাইভেট স্টেজিং প্রিভিউ লিংক পাবেন—যার মাধ্যমে সরাসরি ব্রাউজারে লাইভ প্রজেক্টের অগ্রগতি পরীক্ষা করতে পারবেন।",
      },
    ],
  },
  {
    category: "কারিগরি আর্কিটেকচার ও পারফরম্যান্স",
    items: [
      {
        question: "ওয়ার্ডপ্রেসের বদলে আপনারা Next.js ও Cloudflare দিয়ে কেন সাইট তৈরি করেন?",
        answer: "সাধারণ ওয়ার্ডপ্রেস সাইটগুলো ভারী পিএইচপি সার্ভার ও ডজন ডজন প্লাগইনের ওপর নির্ভরশীল থাকে। ফলে মোবাইলে লোড হতে ৩ থেকে ৬ সেকেন্ড সময় নেয়, ট্রাফিক বাড়লে ক্র্যাশ করে এবং নিয়মিত সিকিউরিটি ঝুঁকিতে পড়ে। অন্যদিকে Next.js App Router এবং Cloudflare Edge ব্যবহার করায় আপনার ওয়েবসাইট বিশ্বব্যাপী উচ্চগতির এজ নেটওয়ার্কে সাব-সেকেন্ড স্পিডে লোড হয় এবং সিকিউরিটি থাকে অত্যন্ত নিরাপদ।",
      },
      {
        question: "ব্রাউজার মেটা পিক্সেল ও সার্ভার-সাইড Conversions API (CAPI)-এর মধ্যে পার্থক্য কী?",
        answer: "ব্রাউজার মেটা পিক্সেল অ্যাড-ব্লকার, স্লো মোবাইল নেটওয়ার্ক এবং iOS প্রাইভেসি রেস্ট্রিকশনের কারণে ২০% থেকে ৪০% কনভার্শন ডাটা মিস করে। আমাদের মেটা পিক্সেল + CAPI ডুয়াল সলিউশনে ব্রাউজার ও এজ সার্ভার উভয় দিক থেকেই ম্যাচিং ইউনিক আইডি দিয়ে ইভেন্ট পাঠানো হয়। ফলে মেটা অ্যাডস সঠিক ডাটা পায়, বিজ্ঞাপনের আরওআই (ROAS) বৃদ্ধি পায় এবং কাস্টমার একুইজিশন খরচ কমে আসে।",
      },
      {
        question: "আপনারা কি Core Web Vitals ও মোবাইল স্পিডের নিশ্চয়তা দেন?",
        answer: "আমরা মোবাইল ৪জি নেটওয়ার্কে সাব-১.২ সেকেন্ড LCP (Largest Contentful Paint), ০.০৫-এর নিচে CLS (Layout Shift) এবং ১৫০ms-এর নিচে INP অর্জনের স্পষ্ট ইঞ্জিনিয়ারিং স্ট্যান্ডার্ড বজায় রাখি। প্রতিটি সাইট ডেলিভারির পূর্বে Chrome DevTools দিয়ে পারফরম্যান্স অডিট ও ভেরিফাই করা হয়।",
      },
    ],
  },
  {
    category: "পেমেন্ট মাধ্যম ও কোডের মালিকানা",
    items: [
      {
        question: "আপনারা কী কী মাধ্যমে পেমেন্ট গ্রহণ করেন?",
        answer: "বাংলাদেশি ক্লায়েন্টদের জন্য আমরা সরাসরি ব্যাংক ট্রান্সফার (BEFTN/NPSB), বিকাশ এবং নগদ মার্চেন্ট পেমেন্ট গ্রহণ করি। আন্তর্জাতিক ক্লায়েন্টদের জন্য রয়েছে সরাসরি আন্তর্জাতিক ব্যাংক ওয়্যার (SWIFT/ACH) এবং Stripe-এর মাধ্যমে ডেবিট/ক্রেডিট কার্ড পেমেন্ট (USD / GBP)।",
      },
      {
        question: "পেমেন্টের কিস্তি বা মাইলফলক কীভাবে নির্ধারিত হয়?",
        answer: "সাধারণত চুক্তি স্বাক্ষরের সময় ৫০% মবিলাইজেশন ডিপোজিট এবং কাজ সম্পন্ন হয়ে ক্লায়েন্ট কর্তৃক স্টেজিং প্রিভিউতে চূড়ান্ত অনুমোদনের পর বাকি ৫০% পরিশোধ করতে হয়। বৃহৎ মাল্টি-মান্থ প্রজেক্টের ক্ষেত্রে কাজের অগ্রগতি অনুযায়ী ৩ থেকে ৪টি সুনির্দিষ্ট মাইলফলকে পেমেন্ট ভাগ করা হয়।",
      },
      {
        question: "প্রজেক্ট সম্পন্ন হওয়ার পর কোডের মালিকানা কার থাকবে?",
        answer: "শতভাগ আপনার। চূড়ান্ত পেমেন্ট সম্পন্ন হওয়ার সাথে সাথেই সম্পূর্ণ Git রিপোজিটরি, ক্লাউড কনফিগারেশন স্ক্রিপ্ট, ডাটাবেস স্কিমা এবং ডকুমেন্টেশনের পূর্ণাঙ্গ মালিকানা ক্লায়েন্টকে হস্তান্তর করা হয়। কোনো প্রকার ভেন্ডর লক-ইন বা লাইসেন্স বিধিনিষেধ থাকে না।",
      },
    ],
  },
  {
    category: "রক্ষণাবেক্ষণ ও টেকনিক্যাল সাপোর্ট",
    items: [
      {
        question: "ওয়েবসাইট বা ই-কমার্স লঞ্চের পর কী ধরনের সাপোর্ট পাওয়া যাবে?",
        answer: "আমাদের প্রতিটি ওয়েব ও ই-কমার্স প্রজেক্টের সাথে লঞ্চ-পরবর্তী ১৪ থেকে ৩০ দিনের ফ্রি টেকনিক্যাল ওয়ারেন্টি অন্তর্ভুক্ত থাকে—যাতে যেকোনো প্রাথমিক বাগ সংশোধন করা হয়। এরপরে ক্লায়েন্টরা আমাদের মাসিক প্রোঅ্যাক্টিভ কেয়ার রিটেইনার প্ল্যানে (Basic, Business, Priority) যুক্ত হতে পারেন সার্বক্ষণিক আপটাইম মনিটরিং, ব্যাকআপ এবং নিয়মিত ডেভেলপমেন্ট সাপোর্টের জন্য।",
      },
      {
        question: "সাইটে হঠাৎ কোনো জরুরি সমস্যা দেখা দিলে আপনারা কত দ্রুত সমাধান করেন?",
        answer: "আমাদের মেইনটেন্যান্স প্ল্যানে ৫ মিনিট পর পর স্বয়ংক্রিয় সাইট হেলথ চেক করা হয়। কোনো ত্রুটি দেখা দিলে আমাদের অন-কল ইঞ্জিনিয়ারের কাছে অ্যালার্ট পৌঁছে যায়। প্ল্যান অনুযায়ী জরুরি রেসপন্স টাইম ১ ঘণ্টা (Custom Retainer) থেকে ৪ ঘণ্টা (Priority Care) এবং ২৪ ঘণ্টার (Business Care) মধ্যে নিশ্চিত করা হয়।",
      },
    ],
  },
];

export default async function FAQPage() {
  const dbFaqs = await getCmsFaqs();

  // Group DB faqs by category if present
  let categories: { category: string; items: { question: string; answer: string }[] }[] = [];
  if (dbFaqs.length > 0) {
    const categoryMap = new Map<string, { question: string; answer: string }[]>();
    for (const f of dbFaqs) {
      const list = categoryMap.get(f.category) ?? [];
      list.push({ question: f.question, answer: f.answer });
      categoryMap.set(f.category, list);
    }
    categories = Array.from(categoryMap.entries()).map(([category, items]) => ({
      category,
      items,
    }));
  } else {
    categories = DEFAULT_FAQ_CATEGORIES;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <Badge variant="accent">স্বচ্ছ ও খোলামেলা তথ্য</Badge>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-text-primary">
          সাধারণ জিজ্ঞাসা (FAQ)
        </h1>
        <p className="text-text-muted text-base sm:text-lg">
          আমরা কীভাবে প্রজেক্টের বাজেট নির্ধারণ করি, কোড আর্কিটেক্ট করি, পেমেন্ট গ্রহণ করি এবং নিয়মিত সাপোর্ট দিই—তার স্পষ্ট উত্তর।
        </p>
      </div>

      {/* Render Dynamic Categories */}
      {categories.map((cat, catIdx) => (
        <div key={cat.category} className="space-y-6">
          <h2 className="text-xl font-bold text-text-primary flex items-center gap-2 border-b border-border pb-3">
            <HelpCircle className="h-5 w-5 text-accent" />
            {cat.category}
          </h2>
          <div className="space-y-3">
            {cat.items.map((item, itemIdx) => (
              <AccordionItem
                key={item.question}
                title={item.question}
                defaultOpen={catIdx === 0 && itemIdx === 0}
              >
                <p className="text-sm text-text-muted leading-relaxed whitespace-pre-line">
                  {item.answer}
                </p>
              </AccordionItem>
            ))}
          </div>
        </div>
      ))}

      {/* CTA Footer */}
      <div className="rounded-2xl border border-border bg-surface/60 p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
          আপনার অন্য কোনো প্রশ্ন রয়েছে?
        </h2>
        <p className="text-text-muted text-sm sm:text-base max-w-xl mx-auto">
          সরাসরি আমাদের টিমের সাথে যোগাযোগ করুন। যেকোনো টেকনিক্যাল বিষয়, কাস্টম ইন্টিগ্রেশন বা প্রজেক্টের বিস্তারিত নিয়ে আলোচনা করতে আমরা প্রস্তুত।
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" variant="primary" asChild>
            <Link href="/contact">
              সরাসরি যোগাযোগ করুন
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/get-a-quote">কোটেশন ফরম পূরণ করুন</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
