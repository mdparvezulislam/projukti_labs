export interface ServicePackage {
  id: string;
  name: string;
  slug: string;
  priceBdt: number | null;
  priceUsd: number | null;
  billingPeriod?: "one-time" | "monthly" | "custom";
  description: string;
  popular?: boolean;
  slaHours?: number;
  devHours?: number;
  deliverables: string[];
  exclusions: string[];
}

export interface ServiceItem {
  id: string;
  slug: string;
  categorySlug: string;
  name: string;
  tagline: string;
  description: string;
  isFlagship: boolean;
  deliverables: string[];
  exclusions: string[];
  technicalHighlights: string[];
  packages: ServicePackage[];
}

export interface ServiceCategory {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  status: "active" | "coming_soon";
  iconName: string;
  services: ServiceItem[];
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "cat_web_dev",
    slug: "web-development",
    name: "ওয়েব ডেভেলপমেন্ট ও ডিজাইন (Web Development & Design)",
    tagline: "হাই-পারফরম্যান্স, এজ-রেন্ডারড ওয়েব প্ল্যাটফর্ম ও কনভার্শন ইঞ্জিন।",
    description:
      "স্পিড, সার্চ ইঞ্জিন ভিজিবিলিটি এবং সর্বোচ্চ কনভার্শনের জন্য তৈরি আধুনিক ওয়েব আর্কিটেকচার। Next.js, TypeScript ও আধুনিক এজ ক্লাউড অবকাঠামো দ্বারা চালিত।",
    status: "active",
    iconName: "Globe",
    services: [
      {
        id: "srv_landing_page_meta_pixel",
        slug: "landing-page-meta-pixel",
        categorySlug: "web-development",
        name: "ল্যান্ডিং পেজ, মেটা পিক্সেল ও অ্যানালিটিক্স (Landing Page with Meta Pixel & Analytics)",
        tagline: "কনভার্শন-ফোকাসড আর্কিটেকচার। নিখুঁত ডাটা ট্র্যাকিং মেজারমেন্ট।",
        description:
          "সর্বোচ্চ বিক্রয় ও লিড জেনারেশনের জন্য হাই-স্পিড ল্যান্ডিং পেজ—সাথে সার্ভার-সাইড Meta Pixel (CAPI), Google Analytics 4 এবং সম্পূর্ণ ভেরিফাইড ইভেন্ট ট্র্যাকিং।",
        isFlagship: true,
        technicalHighlights: [
          "মোবাইল ৪জি নেটওয়ার্কে সাব-১.২ সেকেন্ড LCP টার্গেট ইঞ্জিনিয়ারিং স্ট্যান্ডার্ড",
          "ক্লায়েন্ট ও সার্ভার-সাইড Meta Conversions API (CAPI) ডেডুপ্লিকেটেড সলিউশন",
          "স্ট্যান্ডার্ড ইভেন্ট স্কিমা: PageView, ViewContent, Contact, Lead, Schedule",
          "হস্তান্তরের পূর্বে Meta Events Manager টেস্ট টুলে শতভাগ ভেরিফিকেশন",
          "রেসপন্সিভ টাচ অপ্টিমাইজেশন ও জিরো লেআউট শিফট (CLS < 0.02)",
        ],
        deliverables: [
          "কাস্টম সিঙ্গেল-পেজ কনভার্শন আর্কিটেকচার ও হাই-ইমপ্যাক্ট হিরো কম্পোজিশন",
          "ক্লায়েন্টের ভেরিফাইড বিজনেস অ্যাকাউন্টে কমপ্লিট Meta Pixel ও CAPI ইন্টিগ্রেশন",
          "Google Analytics 4 এনহ্যান্সড ইভেন্ট ট্র্যাকিং ও স্ক্রোল ডেপথ অ্যানালিটিক্স",
          "৩২০px থেকে ১৯২০px পর্যন্ত সকল ডিভাইসে রেসপন্সিভ মোবাইল-ফার্স্ট ডিজাইন",
          "স্প্যাম-প্রটেক্টেড লিড ক্যাপচার ফর্ম সাথে রেফারেন্স ট্র্যাকিং কোড",
          "টেকনিক্যাল এসইও ফাউন্ডেশন: Open Graph, JSON-LD স্কিমা, সাইটম্যাপ ও robots.txt",
          "লঞ্চ-পরবর্তী ১৪ দিনের ইভেন্ট ট্র্যাকিং ভেরিফিকেশন ও টেকনিক্যাল সাপোর্ট",
        ],
        exclusions: [
          "মেটা বা গুগল অ্যাডভার্টাইজিং বাজেট ও মিডিয়া স্পেন্ড (ক্লায়েন্টের নিজস্ব ব্যয়)",
          "ক্লায়েন্টের নির্দিষ্ট ফটোশুট বা কাস্টম ভিডিও প্রোডাকশন",
          "সাপ্তাহিক অ্যাড ক্যাম্পেইন ম্যানেজমেন্ট (ডেভেলপমেন্ট ও ট্র্যাকিং সেটআপ অন্তর্ভুক্ত)",
          "কাস্টম মাল্টি-স্টেপ ব্যাকএন্ড পোর্টাল (কাস্টম ওয়েব অ্যাপ্লিকেশন সার্ভিসের আওতাধীন)",
        ],
        packages: [
          {
            id: "pkg_lp_starter",
            name: "লঞ্চ স্প্রিন্ট (Launch Sprint)",
            slug: "launch-sprint",
            priceBdt: 25000,
            priceUsd: 250,
            billingPeriod: "one-time",
            description: "দ্রুত প্রোডাক্ট টেস্ট ও ইভেন্ট ভ্যালিডেশনের জন্য হাই-স্পিড ল্যান্ডিং পেজ ও কোর ট্র্যাকিং।",
            deliverables: [
              "সর্বোচ্চ ৫টি কনটেন্ট সেকশন (Hero, Features, Social Proof, FAQ, Lead Form)",
              "Meta Pixel PageView ও Lead ইভেন্ট ইন্টিগ্রেশন",
              "মোবাইল স্পিড অপ্টিমাইজেশন স্ট্যান্ডার্ড",
              "ডাটাবেস / ওয়েবহুক লিড স্টোরেজ",
              "৭ কার্যদিবসে দ্রুত ডেলিভারি",
            ],
            exclusions: ["সার্ভার-সাইড CAPI ডেডুপ্লিকেশন", "কাস্টম ভিডিও ব্যাকগ্রাউন্ড"],
          },
          {
            id: "pkg_lp_pro",
            name: "কনভার্শন প্রো (Conversion Pro)",
            slug: "conversion-pro",
            priceBdt: 45000,
            priceUsd: 450,
            billingPeriod: "one-time",
            popular: true,
            description: "ফুল ফানেল আর্কিটেকচার, কমপ্লিট মেটা পিক্সেল + CAPI ও GA4 মেজারমেন্ট স্যুট।",
            deliverables: [
              "সর্বোচ্চ ৮টি টেইলর্ড সেকশন সাথে ইন্টারঅ্যাক্টিভ ট্যাব, টেস্টমোনিয়াল ও FAQ",
              "ডুয়াল মেটা পিক্সেল ও কনভার্শন এপিআই (CAPI) ইভেন্ট ডেডুপ্লিকেশন",
              "GA4 এনহ্যান্সড মেজারমেন্ট (স্ক্রোল ডেপথ, আউটবাউন্ড ক্লিক, ফর্ম ড্রপ-অফ)",
              "লাইভ মেটা ইভেন্ট ম্যানেজার ভেরিফিকেশন রিপোর্ট",
              "ইমেল নোটিফিকেশন ও রেফারেন্স ট্র্যাকিং কোডযুক্ত লিড ক্যাপচার",
              "১০ কার্যদিবসে কমপ্লিট ডেলিভারি",
            ],
            exclusions: ["বিজ্ঞাপন মিডিয়া বাজেট"],
          },
          {
            id: "pkg_lp_scale",
            name: "গ্রোথ ফানেল স্যুট (Growth Funnel Suite)",
            slug: "growth-funnel-suite",
            priceBdt: 75000,
            priceUsd: 750,
            billingPeriod: "one-time",
            description: "অ্যাডভান্সড ফানেল সিস্টেম—A/B ভ্যারিয়েন্ট স্কাফোল্ডিং, কাস্টম ক্যালকুলেটর ও CRM পাইপলাইন।",
            deliverables: [
              "মাল্টি-স্টেপ ইন্টারঅ্যাক্টিভ লিড কুইজ/ক্যালকুলেটর সম্বলিত ফানেল লেআউট",
              "Meta Pixel, CAPI, Google Ads Tag এবং TikTok Pixel ইন্টিগ্রেশন",
              "সরাসরি CRM পাইপলাইন সাথে অটোমেটিক Slack/WhatsApp/Email অ্যালার্ট",
              "অ্যাডভান্সড Core Web Vitals পারফরম্যান্স টার্গেট (>৯৫ মোবাইল স্কোর বেঞ্চমার্ক)",
              "১৪ কার্যদিবসে ডেলিভারি এবং ৩০ দিনের এক্সটেন্ডেড মনিটরিং",
            ],
            exclusions: ["বিজ্ঞাপন মিডিয়া বাজেট"],
          },
        ],
      },
      {
        id: "srv_corporate_website",
        slug: "corporate-website",
        categorySlug: "web-development",
        name: "করপোরেট ও স্টুডিও ওয়েব প্ল্যাটফর্ম (Corporate & Studio Web Platform)",
        tagline: "আধুনিক স্থাপত্য, এজ-রেন্ডারড গতি এবং সহজ কনটেন্ট ম্যানেজমেন্ট ওয়ার্কফ্লো।",
        description:
          "প্রতিষ্ঠিত প্রতিষ্ঠান, এজেন্সি ও কনসাল্টিং ফার্মের জন্য মাল্টি-পেজ প্রফেশনাল প্ল্যাটফর্ম। Next.js App Router ও সিম্যান্টিক ডিজাইন টোকেন দিয়ে সুনিপুণভাবে নির্মিত।",
        isFlagship: false,
        technicalHighlights: [
          "বিশ্বজুড়ে তাৎক্ষণিক পেজ ডেলিভারির জন্য এজ SSR / SSG হাইব্রিড ক্যাশিং",
          "অটোমেটেড ব্লগ, কেস স্টাডি ও নিউজ পাবলিশিং ওয়ার্কফ্লো",
          "WCAG 2.1 AA এক্সেসিবল নেভিগেশন, ফর্ম ও কালার কনট্রাস্ট",
        ],
        deliverables: [
          "সম্পূর্ণ মাল্টি-পেজ ওয়েবসাইট (Home, About, Services, Case Studies, Contact ইত্যাদি)",
          "ব্লগ, সেবাসমূহ ও পোর্টফোলিও পরিচালনার সহজ কনটেন্ট ম্যানেজমেন্ট",
          "ডাটাবেস পারসিস্টেন্সযুক্ত ডায়নামিক ইনকোয়ারি রাউটিং",
          "অটোমেটেড XML সাইটম্যাপ ও সার্চ কনসোল সেটআপ",
        ],
        exclusions: [
          "প্রোপ্রাইটারি থার্ড-পার্টি CMS লাইসেন্স ফি (যদি প্রযোজ্য হয়)",
          "স্পেশালাইজড টেকনিক্যাল রিসার্চ কনটেন্ট রাইটিং",
        ],
        packages: [
          {
            id: "pkg_corp_starter",
            name: "কোম্পানি স্ট্যান্ডার্ড (Company Standard)",
            slug: "company-standard",
            priceBdt: 60000,
            priceUsd: 600,
            billingPeriod: "one-time",
            description: "প্রতিষ্ঠিত স্টুডিও ও সার্ভিস ফার্মের জন্য প্রফেশনাল করপোরেট ওয়েব উপস্থিতি।",
            deliverables: [
              "সর্বোচ্চ ৬টি কাস্টম পেজ",
              "ইনকোয়ারি ও লিড ক্যাপচার সিস্টেম",
              "কমপ্লিট টেকনিক্যাল এসইও সেটআপ",
              "মোবাইল-ফার্স্ট রেসপন্সিভ আর্কিটেকচার",
            ],
            exclusions: ["মাল্টিপল ল্যাঙ্গুয়েজ লোকালাইজেশন"],
          },
          {
            id: "pkg_corp_scale",
            name: "এন্টারপ্রাইজ স্টুডিও (Enterprise Studio)",
            slug: "enterprise-studio",
            priceBdt: 120000,
            priceUsd: 1200,
            billingPeriod: "one-time",
            description: "ডায়নামিক কেস স্টাডি ইঞ্জিন, ক্যারিয়ার পোর্টাল ও ব্লগ সম্বলিত পূর্ণাঙ্গ করপোরেট প্ল্যাটফর্ম।",
            deliverables: [
              "সর্বোচ্চ ১৫টি কাস্টম পেজ",
              "ব্লগ CMS ও কেস স্টাডি সিস্টেম",
              "কাস্টম ক্যারিয়ার / অ্যাপ্লিকেশন ফর্ম",
              "হাই-স্পিড পারফরম্যান্স অপ্টিমাইজেশন",
            ],
            exclusions: ["ইন্ট্রানেট / ইন্টারনাল ERP পোর্টাল ইন্টিগ্রেশন"],
          },
        ],
      },
    ],
  },
  {
    id: "cat_ecommerce",
    slug: "ecommerce",
    name: "ই-কমার্স ও ডিজিটাল কমার্স (E-commerce & Digital Commerce)",
    tagline: "লোকাল ও আন্তর্জাতিক পেমেন্ট গেটওয়ে সম্বলিত নির্ভরযোগ্য কমার্স প্ল্যাটফর্ম।",
    description:
      "হাই-কনভার্টিং অনলাইন স্টোরফ্রন্ট, দ্রুতগতির কার্ট ও চেকআউট, নির্ভুল অর্ডার ট্র্যাকিং এবং নিরাপদ পেমেন্ট গেটওয়ে ইন্টিগ্রেশন।",
    status: "active",
    iconName: "ShoppingCart",
    services: [
      {
        id: "srv_complete_ecommerce",
        slug: "complete-ecommerce-website",
        categorySlug: "ecommerce",
        name: "কমপ্লিট ই-কমার্স প্ল্যাটফর্ম (Complete E-commerce Platform)",
        tagline: "শক্তিশালী স্টোরফ্রন্ট, সিমলেস চেকআউট, অটোমেটেড অর্ডার ইঞ্জিন ও নির্ভরযোগ্য পেমেন্ট গেটওয়ে।",
        description:
          "সর্বোচ্চ বিক্রয় নিশ্চিত করতে একটি পূর্ণাঙ্গ ই-কমার্স সলিউশন। আল্ট্রা-ফাস্ট প্রোডাক্ট ব্রাউজিং, কাস্টমার কার্ট, গেস্ট ও ইউজার চেকআউট, লোকাল ও গ্লোবাল পেমেন্ট এবং শক্তিশালী অ্যাডমিন অর্ডার কন্ট্রোল।",
        isFlagship: true,
        technicalHighlights: [
          "অপটিমিস্টিক UI সহ সাব-১০০ms ইনস্ট্যান্ট কার্ট আপডেট",
          "ক্লায়েন্টের নিজস্ব মার্চেন্ট অ্যাকাউন্টে পেমেন্ট ইন্টিগ্রেশন: bKash PGW, Nagad, SSLCommerz ও Stripe",
          "রিয়েল-টাইম অর্ডার ভ্যালিডেশন, ইনভেন্টরি রিজার্ভেশন ও ফ্রড প্রিভেনশন স্কাফোল্ডিং",
          "রেফারেন্স ট্র্যাকিং কোডসহ অটোমেটেড SMS ও ইমেল ট্রানজ্যাকশন কনফার্মেশন",
          "স্টুডিওর পক্ষ থেকে ০% প্ল্যাটফর্ম সেলস কমিশন রয়্যালটি (কোনো হিডেন পার-অর্ডার ফি নেই)",
        ],
        deliverables: [
          "আধুনিক রেসপন্সিভ স্টোরফ্রন্ট: ক্যাটালগ, ক্যাটাগরি, প্রোডাক্ট ফিল্টারিং ও কুইক ভিউ",
          "গেস্ট চেকআউট ও অ্যাড্রেস অটো-সেভ সুবিধা সম্বলিত ফ্র্রিকশনলেস ২-স্টেপ চেকআউট",
          "পেমেন্ট গেটওয়ে ইন্টিগ্রেশন: বিকাশ (bKash PGW), নগদ, SSLCommerz ও Stripe",
          "অ্যাডমিনিস্ট্রেটিভ কমার্স ড্যাশবোর্ড: অর্ডার, প্রোডাক্ট, ইনভেন্টরি, কুপন ও রিপোর্ট",
          "অর্ডার প্লেসড, পেইড, শিপড ও ডেলিভারড স্ট্যাটাসে ট্রানজ্যাকশনাল SMS/ইমেল ট্রিগার",
          "ই-কমার্স Meta Pixel ও GA4 স্ট্যান্ডার্ড Purchase ইভেন্ট ট্র্যাকিং",
          "লঞ্চ-পরবর্তী ৩০ দিনের টেকনিক্যাল ওয়ারেন্টি ও কমপ্লিট হ্যান্ডওভার ডকুমেন্টেশন",
        ],
        exclusions: [
          "পেমেন্ট গেটওয়ে অপারেটরের প্রতি ট্রানজ্যাকশন ফি (সরাসরি বিকাশ/SSLCommerz/Stripe-কে প্রদেয়)",
          "থার্ড-পার্টি বাল্ক SMS বান্ডেল চার্জ (ক্লায়েন্টের নিজস্ব গেটওয়ে থেকে প্রদেয়)",
          "৫০টির অতিরিক্ত প্রোডাক্টের ম্যানুয়াল ডাটা এন্ট্রি (বাল্ক CSV ইমপোর্ট টুল সরবরাহ করা হয়)",
          "কুরিয়ার এপিআই অ্যাকাউন্ট ফি (পাঠাও/স্টেডফাস্ট মার্চেন্ট অ্যাকাউন্ট ক্লায়েন্টের নিজস্ব)",
        ],
        packages: [
          {
            id: "pkg_ecom_starter",
            name: "কমার্স স্টার্টার (Commerce Starter)",
            slug: "commerce-starter",
            priceBdt: 65000,
            priceUsd: 650,
            billingPeriod: "one-time",
            description: "বুটিroll ব্র্যান্ড ও একক ক্যাটাগরির ডিরেক্ট-টু-কনজিউমার শপের জন্য প্রয়োজনীয় ই-কমার্স প্ল্যাটফর্ম।",
            deliverables: [
              "সর্বোচ্চ ১০০ প্রোডাক্টের ক্যাটালগ ধারণক্ষমতা",
              "বিকাশ / নগদ বা SSLCommerz পেমেন্ট গেটওয়ে ইন্টিগ্রেশন",
              "অ্যাডমিন অর্ডার ম্যানেজমেন্ট ও অটোমেটিক ইনভয়েস জেনারেটর",
              "মোবাইল-ফার্স্ট অপ্টিমাইজড শপিং কার্ট ও চেকআউট",
              "১৪ কার্যদিবসে রেডি প্ল্যাটফর্ম লঞ্চ",
            ],
            exclusions: ["মাল্টি-কারেন্সি ইন্টারন্যাশনাল সুইচিং", "অটোমেটেড কুরিয়ার বুকিং এপিআই"],
          },
          {
            id: "pkg_ecom_growth",
            name: "গ্রোথ স্টোরফ্রন্ট (Growth Storefront)",
            slug: "growth-storefront",
            priceBdt: 110000,
            priceUsd: 1100,
            billingPeriod: "one-time",
            popular: true,
            description: "লোকাল ও ইন্টারন্যাশনাল পেমেন্ট, ডিসকাউন্ট রুল ও অটো কুরিয়ার সিঙ্ক সম্বলিত পূর্ণাঙ্গ কমার্স ইঞ্জিন।",
            deliverables: [
              "আনলিমিটেড প্রোডাক্ট ক্যাটালগ ও মাল্টি-ভ্যারিয়েন্ট (সাইজ, কালার, সাইজ চার্ট)",
              "মাল্টিপল পেমেন্ট গেটওয়ে: SSLCommerz, বিকাশ PGW ও Stripe",
              "অটোমেটেড কুরিয়ার এপিআই ইন্টিগ্রেশন (পাঠাও / স্টেডফাস্ট পার্সেল ডিসপ্যাচ)",
              "ডিসকাউন্ট কুপন, ফ্ল্যাশ সেল ও কাস্টমার অর্ডার হিস্ট্রি পোর্টাল",
              "ই-কমার্স GA4 এবং Meta Pixel Purchase ইভেন্ট ট্র্যাকিং",
              "২১ কার্যদিবসে কমপ্লিট ডেলিভারি",
            ],
            exclusions: ["মাল্টি-ভেন্ডর মার্কেটপ্লেস পেআউট ইঞ্জিন"],
          },
          {
            id: "pkg_ecom_scale",
            name: "কাস্টম স্কেল কমার্স (Custom Scale Commerce)",
            slug: "custom-scale-commerce",
            priceBdt: 180000,
            priceUsd: 1800,
            billingPeriod: "one-time",
            description: "হাই-ভলিউম কমার্স আর্কিটেকচার—হেডলেস ক্যাপাবিলিটি, কাস্টম সিঙ্ক ও মাল্টি-ওয়্যারহাউস সাপোর্ট।",
            deliverables: [
              "এজ ক্যাশিং সম্বলিত হাই-কনকারেন্সি কাস্টম চেকআউট ইঞ্জিন",
              "ডুয়াল কারেন্সি (BDT ও USD) অটো-জিওলোকেশন সুইচার",
              "কাস্টম ওয়্যারহাউস ও ইনভেন্টরি সিনক্রোনাইজেশন এপিআই",
              "কমপ্রিহেনসিভ অ্যানালিটিক্স ড্যাশবোর্ড ও ক্লায়েন্ট রিপোর্টিং সিস্টেম",
              "৩০ কার্যদিবসে ডেডিকেটেড স্টেজিং টেস্ট পিরিয়ডসহ লঞ্চ",
            ],
            exclusions: ["ফিজিক্যাল ওয়্যারহাউস হার্ডওয়্যার সেটআপ"],
          },
        ],
      },
      {
        id: "srv_headless_commerce",
        slug: "headless-commerce",
        categorySlug: "ecommerce",
        name: "হেডলেস স্টোরফ্রন্ট সলিউশন (Headless Storefront Solution)",
        tagline: "সাব-সেকেন্ড পেজ ট্রানজিশন ও এক্সটার্নাল কমার্স ব্যাকএন্ডের আধুনিক সংমিশ্রণ।",
        description:
          "আপনার বিদ্যমান Shopify, Medusa বা কাস্টম ব্যাকএন্ডের সাথে কানেক্ট করুন আল্ট্রা-ফাস্ট Next.js এজ স্টোরফ্রন্ট—অবিশ্বাস্য স্পিড ও অনন্য ব্র্যান্ড অভিজ্ঞতার জন্য।",
        isFlagship: false,
        technicalHighlights: [
          "ইনক্রিমেন্টাল স্ট্যাটিক রিজেনারেশনসহ জিরো-লেটেন্সি এজ পেজ রেন্ডারিং",
          "কমার্স ব্যাকএন্ডের সাথে সরাসরি GraphQL ও REST API সংযোগ",
        ],
        deliverables: [
          "কাস্টম ফ্রন্টএন্ড থিম ও অপ্টিমাইজড চেকআউট ব্রিজ",
          "ডায়নামিক প্রোডাক্ট সার্চ ও ফেসেটেড ফিল্টারিং",
          "ব্যাকএন্ড এপিআই-এর সাথে সিমলেস কার্ট সিনক্রোনাইজেশন",
        ],
        exclusions: ["ব্যাকএন্ড ই-কমার্স হোস্টিং ও ইনফ্রাস্ট্রাকচার ফি"],
        packages: [
          {
            id: "pkg_headless_pro",
            name: "হেডলেস ব্রিজ (Headless Bridge)",
            slug: "headless-bridge",
            priceBdt: 95000,
            priceUsd: 950,
            billingPeriod: "one-time",
            description: "আপনার বর্তমান Shopify বা কাস্টম ব্যাকএন্ডের সাথে সরাসরি সংযুক্ত আধুনিক Next.js স্টোরফ্রন্ট।",
            deliverables: ["বেসপোক Next.js স্টোরফ্রন্ট", "কার্ট ব্রিজ", "ক্যাটালগ সিঙ্ক", "১৪ কার্যদিবসে ডেলিভারি"],
            exclusions: ["ব্যাকএন্ড স্টোর ডাটা মাইগ্রেশন"],
          },
        ],
      },
    ],
  },
  {
    id: "cat_maintenance",
    slug: "maintenance-support",
    name: "ওয়েবসাইট মেইনটেন্যান্স ও টেকনিক্যাল সাপোর্ট (Maintenance & Technical Support)",
    tagline: "প্রোঅ্যাক্টিভ ইঞ্জিনিয়ারিং কেয়ার, সিকিউরিটি প্যাচিং এবং এসএলএ-সমর্থিত সাপোর্ট।",
    description:
      "ডাউনটাইম, সাইবার ঝুঁকি এবং টেকনিক্যাল সমস্যার সম্পূর্ণ সমাধান। প্রোডাকশন ওয়েবসাইট, ই-কমার্স এবং ওয়েব অ্যাপ্লিকেশনের জন্য মাসিক রিটেইনার প্ল্যান।",
    status: "active",
    iconName: "ShieldCheck",
    services: [
      {
        id: "srv_website_maintenance",
        slug: "website-maintenance",
        categorySlug: "maintenance-support",
        name: "ওয়েবসাইট মেইনটেন্যান্স ও টেকনিক্যাল রিটেইনার (Website Maintenance & Retainer)",
        tagline: "জিরো ডাউনটাইম নিশ্চয়তা। প্রোঅ্যাক্টিভ সিকিউরিটি, পারফরম্যান্স এবং ডেডিকেটেড সাপোর্ট।",
        description:
          "একটি সুনির্দিষ্ট মাসিক ইঞ্জিনিয়ারিং পার্টনারশিপ—যা নিশ্চিত করে হাই আপটাইম মনিটরিং, অটোমেটেড অফ-সাইট ব্যাকআপ, রেগুলার সিকিউরিটি আপডেট এবং নিয়মিত নতুন ফিচারের জন্য ডেডিকেটেড ডেভেলপার আওয়ার।",
        isFlagship: true,
        technicalHighlights: [
          "স্বয়ংক্রিয় অ্যালার্টসহ সার্বক্ষণিক আপটাইম ও SSL সার্টিফিকেট মনিটরিং",
          "নিয়মিত ডাটাবেস ও স্ট্যাটিক অ্যাসেট স্ন্যাপশট অফ-সাইট ব্যাকআপ",
          "প্রোডাকশন ডেপ্লয়মেন্টের পূর্বে স্টেজিং পরিবেশে সিকিউরিটি প্যাচ টেস্টিং",
          "নিয়মিত Core Web Vitals অডিট এবং স্পিড রিগ্রেশন প্রতিরোধ",
          "কেয়ার টিয়ার অনুসারে গ্যারান্টেড এসএলএ (SLA) রেসপন্স টাইম অপশন",
        ],
        deliverables: [
          "অটোমেটেড অফ-সাইট ডাটাবেস ব্যাকআপ ও নিয়মিত রিস্টোরেশন ড্রিল",
          "Next.js, Node.js ও ডিপেন্ডেন্সি সিকিউরিটি আপডেট ব্যবস্থাপনা",
          "২৪/৭ স্বয়ংক্রিয় সাইট আপটাইম ও সিকিউরিটি পর্যবেক্ষণ",
          "নতুন ফিচার, কনটেন্ট আপডেট বা UI পরিবর্তনের জন্য ডেডিকেটেড ডেভেলপার আওয়ার",
          "মাসিক এক্সিকিউটিভ হেলথ ও পারফরম্যান্স রিপোর্ট",
          "জরুরি ক্রিটিক্যাল বাগ ফিক্সিং সাপোর্ট (কেয়ার টিয়ারের SLA অনুযায়ী)",
        ],
        exclusions: [
          "ওয়েবসাইটের সম্পূর্ণ নতুন আর্কিটেকচারাল রিডিজাইন (আলাদা প্রজেক্ট হিসেবে বিবেচ্য)",
          "অব্যবহৃত মাসিক ডেভেলপার আওয়ার ৬০ দিনের বেশি রোল-ওভার হয় না",
          "সার্ভার ও থার্ড-পার্টি SaaS সাবস্ক্রিপশন ফি (ক্লায়েন্টের প্রোভাইডারে প্রদেয়)",
          "স্ক্র্যাচ থেকে নতুন কনটেন্ট রাইটিং বা গ্রাফিক ডিজাইন (ক্লায়েন্ট অ্যাসেট ফরম্যাটিং অন্তর্ভুক্ত)",
        ],
        packages: [
          {
            id: "pkg_maint_basic",
            name: "বেসিক কেয়ার (Basic Care)",
            slug: "basic-care",
            priceBdt: 8000,
            priceUsd: 80,
            billingPeriod: "monthly",
            slaHours: 48,
            devHours: 0,
            description: "ব্যবসার ওয়েবসাইট চালু, নিরাপদ ও ব্যাকআপযুক্ত রাখার জন্য প্রয়োজনীয় মৌলিক সুরক্ষা।",
            deliverables: [
              "সাপ্তাহিক অফ-সাইট ব্যাকআপ ও ভেরিফিকেশন",
              "১৫-মিনিট ইন্টারভালে আপটাইম ও SSL মনিটরিং",
              "মাসিক কোর ডিপেন্ডেন্সি সিকিউরিটি আপডেট",
              "জরুরি ইনসিডেন্ট ট্রায়াজ (৪৮-ঘণ্টা SLA রেসপন্স অপশন)",
              "মাসিক হেলথ স্ট্যাটাস ইমেল সামারি",
            ],
            exclusions: ["ডেডিকেটেড ডেভেলপমেন্ট আওয়ার", "সেম-ডে ইমার্জেন্সি সাপোর্ট"],
          },
          {
            id: "pkg_maint_business",
            name: "বিজনেস কেয়ার (Business Care)",
            slug: "business-care",
            priceBdt: 18000,
            priceUsd: 180,
            billingPeriod: "monthly",
            popular: true,
            slaHours: 24,
            devHours: 4,
            description: "গ্রোয়িং কমার্শিয়াল ওয়েবসাইট ও অনলাইন স্টোরের জন্য প্রোঅ্যাক্টিভ রক্ষণাবেক্ষণ ও নিয়মিত ডেভেলপমেন্ট।",
            deliverables: [
              "দৈনিক ডাটাবেস ব্যাকআপ ও সাপ্তাহিক ভেরিফিকেশন",
              "৫-মিনিট আপটাইম মনিটরিং সাথে ইনস্ট্যান্ট হোয়াটসঅ্যাপ/ইমেল অ্যালার্ট",
              "UI টুইক ও কনটেন্ট আপডেটের জন্য প্রতি মাসে ৪ ঘণ্টা ডেডিকেটেড ডেভেলপার সময়",
              "মাসিক পারফরম্যান্স অডিট ও ডাটাবেস অপ্টিমাইজেশন",
              "নন-ক্রিটিক্যাল টিকেটের জন্য ২৪-ঘণ্টা SLA রেসপন্স টাইম",
              "বিস্তারিত মাসিক টেকনিক্যাল রিপোর্ট",
            ],
            exclusions: ["এন্টারপ্রাইজ অন-কল ডেডিকেটেড ইঞ্জিনিয়ার"],
          },
          {
            id: "pkg_maint_priority",
            name: "প্রায়োরিটি কেয়ার (Priority Care)",
            slug: "priority-care",
            priceBdt: 38000,
            priceUsd: 380,
            billingPeriod: "monthly",
            slaHours: 4,
            devHours: 10,
            description: "হাই-ট্রাফিক পোর্টাল ও ই-কমার্স স্টোরের জন্য মিশন-ক্রিটিক্যাল ইঞ্জিনিয়ারিং সাপোর্ট।",
            deliverables: [
              "প্রতি মাসে ১০ ঘণ্টা ডেডিকেটেড সিনিয়র ডেভেলপার সময়",
              "জরুরি ইস্যুতে ৪-ঘণ্টা ইমার্জেন্সি SLA ও সরাসরি ফোন/হোয়াটসঅ্যাপ সাপোর্ট",
              "প্রোডাকশন আপডেটের পূর্বে স্টেজিং এনভায়রনমেন্টে টেস্টিং",
              "ধারাবাহিক সিকিউরিটি অডিট ও সিক্রেট রোটেশন সহায়তা",
              "ডাটাবেস ইনডেক্সিং ও CDN ক্যাশিং ফাইন-টিউনিং",
              "দ্বিসাপ্তাহিক ইঞ্জিনিয়ারিং চেক-ইন কল",
            ],
            exclusions: ["ফুল-টিম ডেডিকেটেড স্টাফ অগমেন্টেশন"],
          },
          {
            id: "pkg_maint_custom",
            name: "কাস্টম রিটেইনার (Custom Retainer)",
            slug: "custom-retainer",
            priceBdt: null,
            priceUsd: null,
            billingPeriod: "custom",
            slaHours: 1,
            devHours: 25,
            description: "লার্জ এন্টারপ্রাইজ ও মিশন-ক্রিটিক্যাল প্ল্যাটফর্মের জন্য বেসপোক SLA ও ইঞ্জিনিয়ারিং ক্যাপাসিটি।",
            deliverables: [
              "প্রয়োজনমতো মাসিক ডেভেলপমেন্ট আওয়ার (২০+ ঘণ্টা)",
              "১-ঘণ্টা ক্রিটিক্যাল রেসপন্স SLA সাথে ২৪/৭ অন-কল কভারেজ",
              "প্রিন্সিপাল সফটওয়্যার আর্কিটেক্টের সাথে ডেডিকেটেড চ্যানেল (Slack/WhatsApp)",
              "মাল্টি-রিজিয়ন ফেইলওভার ও ডিজাস্টার রিকভারি ড্রিল",
              "কাস্টম ক্লাউড ইনফ্রাস্ট্রাকচার ও CI/CD পাইপলাইন ম্যানেজমেন্ট",
            ],
            exclusions: [],
          },
        ],
      },
      {
        id: "srv_speed_security_audit",
        slug: "speed-security-audit",
        categorySlug: "maintenance-support",
        name: "পারফরম্যান্স ও সিকিউরিটি অডিট (Performance & Security Audit)",
        tagline: "Core Web Vitals প্রোফাইলিং, সিকিউরিটি হেডার এবং এজ ক্যাশিং অপ্টিমাইজেশন।",
        description:
          "ওয়েবসাইটের স্লো স্পিড, অতিরিক্ত লোডিং টাইম, সিকিউরিটি দুর্বলতা এবং ট্র্যাকিং এরর স্থায়ীভাবে সমাধান করার জন্য একটি ওয়ান-অফ অডিট ও ফিক্সিং প্যাকেজ।",
        isFlagship: false,
        technicalHighlights: [
          "Chrome DevTools ট্রেস বিশ্লেষণ ও জাভাস্ক্রিপ্ট বান্ডেল অপ্টিমাইজেশন",
          "Content Security Policy (CSP), HSTS এবং CORS সিকিউরিটি হেডার হার্ডেনিং",
        ],
        deliverables: [
          "বিফোর-অ্যান্ড-আফটার বেঞ্চমার্কসহ ২০+ পয়েন্টের পূর্ণাঙ্গ অডিট রিপোর্ট",
          "বান্ডেল স্প্লিটিং ও অ্যাসেট ক্যাশিং-এর সরাসরি কোড রিমেডিয়েশন",
          "এজ ক্যাশ রুলস সেটআপ ও আধুনিক ইমেজ অপ্টিমাইজেশন পাইপলাইন",
        ],
        exclusions: ["হোস্টিং প্রোভাইডারের সার্ভার হার্ডওয়্যার রিপ্লেসমেন্ট ফি"],
        packages: [
          {
            id: "pkg_audit_oneoff",
            name: "ডিপ অডিট অ্যান্ড ফিক্স (Deep Audit & Fix)",
            slug: "deep-audit-and-fix",
            priceBdt: 30000,
            priceUsd: 300,
            billingPeriod: "one-time",
            description: "ওয়েবসাইটের গতি বৃদ্ধি এবং সার্বিক নিরাপত্তা জোরদার করার জন্য কমপ্লিট স্প্রিন্ট।",
            deliverables: [
              "ফুল সাইট প্রোফাইলিং ও অডিট",
              "সরাসরি কোড লেভেলে সমাধান",
              "সিকিউরিটি হেডার ইমপ্লিমেন্টেশন",
              "গতি ও পারফরম্যান্স উন্নতি নিশ্চিতকরণ",
            ],
            exclusions: ["সম্পূর্ণ ব্যাকএন্ড রিরাইট"],
          },
        ],
      },
    ],
  },
  // Future Categories (Coming Soon / Pipeline)
  {
    id: "cat_software_dev",
    slug: "software-development",
    name: "কাস্টম সফটওয়্যার ও SaaS ডেভেলপমেন্ট (Custom Software & SaaS)",
    tagline: "স্কেলেবল ক্লাউড আর্কিটেকচার, ইন্টারনাল অপারেশন পোর্টাল ও মাল্টি-টেন্যান্ট SaaS সলিউশন।",
    description:
      "টাইপ-সেফটি, ক্লিন ডোমেইন বাউন্ডারি এবং স্কেলেবল ডাটা লেয়ার দিয়ে নির্মিত এন্টারপ্রাইজ গ্রেড ওয়েব অ্যাপ্লিকেশন।",
    status: "coming_soon",
    iconName: "Code2",
    services: [],
  },
  {
    id: "cat_ai_automation",
    slug: "ai-automation",
    name: "এআই ইন্টিগ্রেশন ও ওয়ার্কফ্লো অটোমেশন (AI & Automation)",
    tagline: "ইন্টেলিজেন্ট এআই পাইপলাইন, ডকুমেন্ট এক্সট্র্যাকশন ও ব্যাকগ্রাউন্ড অটোমেশন।",
    description:
      "ম্যানুয়াল কাজ কমিয়ে ব্যবসায়িক সিদ্ধান্ত দ্রুত করতে বাস্তবমুখী কাস্টম AI ইন্টিগ্রেশন।",
    status: "coming_soon",
    iconName: "Cpu",
    services: [],
  },
  {
    id: "cat_mobile_apps",
    slug: "mobile-apps",
    name: "ক্রস-প্ল্যাটফর্ম মোবাইল অ্যাপস (Mobile Apps)",
    tagline: "iOS ও Android-এর জন্য হাই-পারফরমিং ও রেসপন্সিভ মোবাইল অ্যাপ্লিকেশন।",
    description:
      "React Native এবং আধুনিক মোবাইল ডিজাইন সিস্টেমের সমন্বয়ে তৈরি ইউনিফাইড কোডবেস অ্যাপ।",
    status: "coming_soon",
    iconName: "Smartphone",
    services: [],
  },
  {
    id: "cat_ui_ux",
    slug: "ui-ux-design",
    name: "UI/UX ডিজাইন ও ডিজাইন সিস্টেম (UI/UX Design Systems)",
    tagline: "ইউজার-সেন্ট্রিক ডিজাইন আর্কিটেকচার, ইন্টারেক্টিভ ওয়্যারফ্রেম ও স্কেলেবল ডিজাইন টোকেন।",
    description:
      "ভিজ্যুয়াল সৌন্দর্য ও আধুনিক ফ্রন্টএন্ড কোডের মেলবন্ধনে তৈরি টেকসই ইন্টারফেস সিস্টেম।",
    status: "coming_soon",
    iconName: "Palette",
    services: [],
  },
  {
    id: "cat_cloud_devops",
    slug: "cloud-devops",
    name: "ক্লাউড ইনফ্রাস্ট্রাকচার ও এজ ডেভঅপস (Cloud & Edge DevOps)",
    tagline: "সার্ভারলেস ডেপ্লয়মেন্ট, কন্টেইনারাইজেশন ও স্বয়ংক্রিয় CI/CD পাইপলাইন।",
    description:
      "Cloudflare, AWS ও GCP-তে উচ্চ-কার্যক্ষমতা সম্পন্ন ও নিরাপদ ক্লাউড আর্কিটেকচার।",
    status: "coming_soon",
    iconName: "Cloud",
    services: [],
  },
  {
    id: "cat_api_integration",
    slug: "api-integration",
    name: "এপিআই আর্কিটেকচার ও মাইক্রোসার্ভিস ইন্টিগ্রেশন (API Integration)",
    tagline: "রোবাস্ট REST ও GraphQL এপিআই, নিরাপদ ওয়েবহুক ও থার্ড-পার্টি সিস্টেম ব্রিজ।",
    description:
      "হিসাবরক্ষণ, ইআরপি, সিআরএম ও পেমেন্ট সিস্টেমকে সংযুক্ত করতে উচ্চ-গতির ইন্টিগ্রেশন লেয়ার।",
    status: "coming_soon",
    iconName: "Share2",
    services: [],
  },
  {
    id: "cat_seo_analytics",
    slug: "seo-analytics",
    name: "টেকনিক্যাল এসইও ও বিজনেস অ্যানালিটিক্স (Technical SEO & Analytics)",
    tagline: "প্রোগ্রাম্যাটিক এসইও, স্ট্রাকচার্ড ডাটা ও এন্ড-টু-এন্ড কাস্টমার অ্যাট্রিবিউশন মডেলিং।",
    description:
      "সার্চ র্যাঙ্কিং বৃদ্ধি, Core Web Vitals অপ্টিমাইজেশন ও কাস্টমাইজড বিজনেস ইন্টেলিজেন্স রিপোর্টিং।",
    status: "coming_soon",
    iconName: "BarChart3",
    services: [],
  },
];

export function getActiveCategories(): ServiceCategory[] {
  return SERVICE_CATEGORIES.filter((c) => c.status === "active");
}

export function getFutureCategories(): ServiceCategory[] {
  return SERVICE_CATEGORIES.filter((c) => c.status === "coming_soon");
}

export function getCategoryBySlug(slug: string): ServiceCategory | undefined {
  return SERVICE_CATEGORIES.find((c) => c.slug === slug);
}

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  for (const cat of SERVICE_CATEGORIES) {
    const s = cat.services.find((item) => item.slug === slug);
    if (s) return s;
  }
  return undefined;
}

export function getFlagshipServices(): ServiceItem[] {
  const result: ServiceItem[] = [];
  for (const cat of SERVICE_CATEGORIES) {
    for (const s of cat.services) {
      if (s.isFlagship) {
        result.push(s);
      }
    }
  }
  return result;
}
