import { getDb } from "@/lib/db";
import {
  services,
  servicePackages,
  blogPosts,
  portfolioProjects,
  faqs,
  siteSettings,
  pageSections,
  automationRules,
} from "@/db/schema";
import { SERVICE_CATEGORIES } from "@/modules/services/data";
import { BLOG_POSTS } from "@/modules/blog/data";
import { count } from "drizzle-orm";

/**
 * Seeds initial content from codebase into Cloudflare D1 if tables are empty.
 * Guarantees zero data loss and seamless transition to database-driven CMS.
 */
export async function seedDatabaseIfEmpty() {
  const db = getDb();

  // 1. Seed Site Settings
  const settingsCount = await db.select({ count: count() }).from(siteSettings);
  if (Number(settingsCount[0]?.count ?? 0) === 0) {
    const defaultSettings = [
      { id: "set_general", key: "general", value: {
        siteName: "Projukti Labs",
        tagline: "Building Digital Solutions. Engineering the Future.",
        description: "বাংলাদেশের ব্যবসা ও আন্তর্জাতিক ক্লায়েন্টদের জন্য প্রিমিয়াম সফটওয়্যার আর্কিটেকচার, মেটা পিক্সেল CAPI ল্যান্ডিং পেজ ও স্কেলেবল ই-কমার্স সলিউশন।",
        contactEmail: "contact@projuktilabs.tech",
        contactPhone: "+880 1700-000000",
        address: "Dhaka, Bangladesh",
        currency: "BDT",
        timezone: "Asia/Dhaka",
        maintenanceMode: false,
      }},
      { id: "set_seo", key: "seo", value: {
        titleTemplate: "%s | Projukti Labs",
        defaultDescription: "Building Digital Solutions. Engineering the Future. Premium technology studio and software engineering consultancy.",
        ogImage: "/og-image.png",
        enableSitemap: true,
      }},
      { id: "set_notifications", key: "notifications", value: {
        emailAlertsEnabled: false,
        adminAlertEmail: "contact@projuktilabs.tech",
        inquiryAlerts: true,
        leadAlerts: true,
      }},
    ];

    for (const s of defaultSettings) {
      await db.insert(siteSettings).values({
        id: s.id,
        key: s.key,
        value: s.value,
        updatedAt: new Date(),
      }).onConflictDoNothing();
    }
  }

  // 2. Seed Services and Service Packages
  const servicesCount = await db.select({ count: count() }).from(services);
  if (Number(servicesCount[0]?.count ?? 0) === 0) {
    for (const cat of SERVICE_CATEGORIES) {
      for (const s of cat.services) {
        await db.insert(services).values({
          id: s.id,
          slug: s.slug,
          categorySlug: s.categorySlug,
          name: s.name,
          tagline: s.tagline,
          description: s.description,
          isFlagship: s.isFlagship,
          status: cat.status,
          sortOrder: 0,
          deliverables: s.deliverables,
          exclusions: s.exclusions,
          technicalHighlights: s.technicalHighlights,
          createdAt: new Date(),
          updatedAt: new Date(),
        }).onConflictDoNothing();

        for (const pkg of s.packages) {
          await db.insert(servicePackages).values({
            id: pkg.id,
            serviceId: s.id,
            slug: pkg.slug,
            name: pkg.name,
            priceBdt: pkg.priceBdt,
            priceUsd: pkg.priceUsd,
            billingPeriod: pkg.billingPeriod ?? "one-time",
            description: pkg.description,
            isPopular: pkg.popular ?? false,
            slaHours: pkg.slaHours ?? null,
            deliverables: pkg.deliverables,
            exclusions: pkg.exclusions,
            sortOrder: 0,
            updatedAt: new Date(),
          }).onConflictDoNothing();
        }
      }
    }
  }

  // 3. Seed Blog Posts
  const blogCount = await db.select({ count: count() }).from(blogPosts);
  if (Number(blogCount[0]?.count ?? 0) === 0) {
    for (const post of BLOG_POSTS) {
      await db.insert(blogPosts).values({
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        tags: post.tags,
        coverImage: post.coverImage ?? null,
        status: "published",
        isFeatured: post.featured ?? false,
        readTime: `${post.readingTimeMinutes} মিনিট`,
        seoTitle: post.seoTitle ?? post.title,
        seoDescription: post.seoDescription ?? post.excerpt,
        publishedAt: new Date(post.publishedAt),
        createdAt: new Date(post.publishedAt),
        updatedAt: new Date(post.publishedAt),
      }).onConflictDoNothing();
    }
  }

  // 4. Seed Portfolio Projects
  const portfolioCount = await db.select({ count: count() }).from(portfolioProjects);
  if (Number(portfolioCount[0]?.count ?? 0) === 0) {
    const initialProjects = [
      {
        id: "prj_01",
        slug: "projukti-labs-engine",
        title: "Projukti Labs Studio Engine v1.0",
        category: "এজ সিস্টেম ও ওয়েব আর্কিটেকচার",
        badge: "লাইভ প্রোডাকশন",
        projectType: "লাইভ প্ল্যাটফর্ম",
        overview: "Projukti Labs-এর অফিসিয়াল ওয়েব প্ল্যাটফর্ম—যা Cloudflare Workers-এর এজ মডুলার মনোলিথ আর্কিটেকচারে তৈরি। এতে রয়েছে Next.js App Router, Vite RSC কম্পাইলেশন, Drizzle ORM এবং Cloudflare D1 ডাটাবেস।",
        metrics: [
          { label: "মোবাইল LCP স্পিড", value: "< ১.১s" },
          { label: "এজ বান্ডেল সাইজ", value: "২৯৯ KB" },
          { label: "টাইপ সেফটি", value: "১০০%" },
          { label: "কোল্ড স্টার্ট ল্যাটেন্সি", value: "০ms" },
        ],
        stack: ["Next.js 16", "React 19", "Cloudflare Workers", "D1 SQLite", "Drizzle ORM", "Tailwind CSS"],
        deliverables: [
          "Vite + vinext এজ বিল্ড ইন্টিগ্রেশন যা Cloudflare Workers-এ আল্ট্রা-ফাস্ট SSR নিশ্চিত করে",
          "WCAG 2.1 AA এক্সেসিবিলিটি স্ট্যান্ডার্ড সমর্থিত ডার্ক-ফার্স্ট রেসপন্সিভ ডিজাইন সিস্টেম",
          "Cloudflare D1-এ হোস্টকৃত ইন্টিগ্রেটেড ইনকোয়ারি ও লিড ট্র্যাকিং ডাটাবেস লেয়ার",
        ],
        linkUrl: "/",
        linkText: "লাইভ প্ল্যাটফর্ম দেখুন",
        isFeatured: true,
        sortOrder: 1,
      },
      {
        id: "prj_02",
        slug: "meta-pixel-capi-funnel",
        title: "কনভার্শন-ইঞ্জিনিয়ার্ড ফানেল সাথে মেটা CAPI",
        category: "ওয়েব ডেভেলপমেন্ট ও অ্যানালিটিক্স",
        badge: "আর্কিটেকচারাল ব্লুপ্রিন্ট",
        projectType: "কনসেপ্ট ও ব্লুপ্রিন্ট",
        overview: "উচ্চ-গতির কনভার্শন ল্যান্ডিং পেজ সিস্টেম—যাতে রয়েছে ডুয়াল-লেয়ার টেলিমেট্রি: ব্রাউজার মেটা পিক্সেল এবং সার্ভার-সাইড Conversions API (CAPI) ইভেন্ট ডেডুপ্লিকেশন।",
        metrics: [
          { label: "ডাটা ট্র্যাকিং ড্রপ-অফ", value: "০%" },
          { label: "মোবাইল স্পিড স্কোর", value: "৯৮/১০০" },
          { label: "মোবাইল LCP বেঞ্চমার্ক", value: "১.২s" },
          { label: "মেটা ইভেন্ট কোয়ালিটি", value: "> ৯.০" },
        ],
        stack: ["Edge SSR", "Meta CAPI SDK", "Cloudflare Edge", "WebCrypto", "Tailwind CSS"],
        deliverables: [
          "ইভেন্ট আইডি ম্যাচিং দ্বারা ব্রাউজার ও সার্ভার মেটা ইভেন্ট ডেডুপ্লিকেশন",
          "কোর ওয়েব ভাইটালস অপটিমাইজড মোবাইল-ফার্স্ট লেআউট ও ফর্ম",
          "ক্লাউডফ্লেয়ার টার্নস্টাইল সমন্বিত বট-সুরক্ষিত লিড ফানেল",
        ],
        linkUrl: "/services/landing-page-meta-pixel",
        linkText: "সলিউশন আর্কিটেকচার দেখুন",
        isFeatured: true,
        sortOrder: 2,
      },
      {
        id: "prj_03",
        slug: "high-volume-ecommerce-engine",
        title: "হাই-ভলিউম ডিজিটাল কমার্স প্ল্যাটফর্ম",
        category: "ই-কমার্স ও পেমেন্ট অটোমেশন",
        badge: "আর্কিটেকচারাল ব্লুপ্রিন্ট",
        projectType: "কনসেপ্ট ও ব্লুপ্রিন্ট",
        overview: "বাংলাদেশের গ্রাহক আচরণের উপযোগী কাস্টম ই-কমার্স প্ল্যাটফর্ম। এতে bKash পেমেন্ট গেটওয়ে, Nagad ও কুরিয়ার পার্সেল ডিসপ্যাচ API সরাসরি ইন্টিগ্রেটেড।",
        metrics: [
          { label: "চেকআউট স্টেপস", value: "১-পেজ" },
          { label: "পেমেন্ট গেটওয়ে কমিশন", value: "০% স্টুডিও ফি" },
          { label: "কুরিয়ার পার্সেল ক্রিয়েশন", value: "অটোমেটেড" },
          { label: "সার্ভার স্কেলেবিলিটি", value: "১০k কনকারেন্ট" },
        ],
        stack: ["Next.js App Router", "bKash PGW API", "Pathao/Steadfast API", "D1 SQL", "Tailwind CSS"],
        deliverables: [
          "১-পেজ ফ্র্রিকশনলেস মোবাইল চেকআউট সাথে কাস্টমার ওটিপি ভেরিফিকেশন",
          "সরাসরি মার্চেন্ট একাউন্টে bKash PGW ও SSLCommerz গেটওয়ে হ্যান্ডশেক",
          "অর্ডার প্লেস করার সাথে সাথে কুরিয়ার পার্সেল ক্রিয়েশন ও অটো ট্র্যাকিং কোড",
        ],
        linkUrl: "/services/complete-ecommerce-website",
        linkText: "কমার্স ব্লুপ্রিন্ট দেখুন",
        isFeatured: true,
        sortOrder: 3,
      },
      {
        id: "prj_04",
        slug: "proactive-maintenance-mesh",
        title: "এন্টারপ্রাইজ মনিটরিং ও প্রোঅ্যাক্টিভ মেইনটেন্যান্স সিস্টেম",
        category: "মেইনটেন্যান্স ও টেক সাপোর্ট",
        badge: "ইঞ্জিনিয়ারিং ফ্রেমওয়ার্ক",
        projectType: "সার্ভিস ফ্রেমওয়ার্ক",
        overview: "সার্ভার হেলথ মনিটরিং ও আপটাইম প্রোটেকশন সিস্টেম। সাইট ডাউন হলে বা সিকিউরিটি ত্রুটি ধরা পড়লে তাৎক্ষণিক অটো-অ্যালার্ট ও রিকভারি টাস্ক তৈরি হয়।",
        metrics: [
          { label: "মনিটরিং ইন্টারভাল", value: "প্রতি ৫ মিনিট" },
          { label: "ইমার্জেন্সি রেসপন্স SLA", value: "< ১ ঘণ্টা" },
          { label: "অফ-সাইট ব্যাকআপ", value: "দৈনিক / সাপ্তাহিক" },
          { label: "সিকিউরিটি প্যাচিং", value: "প্রোঅ্যাক্টিভ" },
        ],
        stack: ["Cron Triggers", "Uptime Monitoring", "Disaster Recovery", "Off-site R2 Backups"],
        deliverables: [
          "২৪/৭ অটোমেটেড এন্ডপয়েন্ট ও ডাটাবেস পিং মনিটরিং",
          "সাপ্তাহিক ও মাসিক অফ-সাইট এনক্রিপ্টেড ব্যাকআপ এক্সপোর্ট",
          "প্রোঅ্যাক্টিভ কোড ডিপেন্ডেন্সি অডিট ও ফ্রেমওয়ার্ক সিকিউরিটি প্যাচিং",
        ],
        linkUrl: "/services/website-maintenance",
        linkText: "মেইনটেন্যান্স ফ্রেমওয়ার্ক দেখুন",
        isFeatured: false,
        sortOrder: 4,
      },
    ];

    for (const p of initialProjects) {
      await db.insert(portfolioProjects).values({
        id: p.id,
        slug: p.slug,
        title: p.title,
        category: p.category,
        badge: p.badge,
        projectType: p.projectType,
        overview: p.overview,
        metrics: p.metrics,
        stack: p.stack,
        deliverables: p.deliverables,
        linkUrl: p.linkUrl,
        linkText: p.linkText,
        isFeatured: p.isFeatured,
        sortOrder: p.sortOrder,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }).onConflictDoNothing();
    }
  }

  // 5. Seed FAQs
  const faqCount = await db.select({ count: count() }).from(faqs);
  if (Number(faqCount[0]?.count ?? 0) === 0) {
    const initialFaqs = [
      {
        id: "faq_01",
        category: "প্রজেক্ট পরিকল্পনা ও বাজেট নির্ধারণ",
        question: "আপনারা কীভাবে প্রজেক্টের খরচ এবং ডেলিভারির সময়সীমা নির্ধারণ করেন?",
        answer: "আমাদের স্ট্যান্ডার্ড প্রোডাক্টাইজড প্যাকেজগুলোর (যেমন ল্যান্ডিং পেজ + মেটা পিক্সেল, কমপ্লিট ই-কমার্স প্ল্যাটফর্ম, এবং মেইনটেন্যান্স রিটেইনার) ক্ষেত্রে সুনির্দিষ্ট স্কোপ এবং ফিক্সড প্রাইসিং রয়েছে। আর কাস্টম ওয়েব অ্যাপ্লিকেশনের ক্ষেত্রে আমরা আপনার কারিগরি প্রয়োজনীয়তা গভীরভাবে বিশ্লেষণ করে চুক্তি স্বাক্ষরের আগেই একটি পূর্ণাঙ্গ স্কোপ অব ওয়ার্ক (SOW) ও মাইলফলক-ভিত্তিক বাজেট প্রস্তাব দিই।",
        sortOrder: 1,
      },
      {
        id: "faq_02",
        category: "প্রজেক্ট পরিকল্পনা ও বাজেট নির্ধারণ",
        question: "আমার প্রজেক্টের কোড আসলে কারা লিখবে? কোনো থার্ড পার্টিকে সাবকন্ট্রাক্ট করা হবে?",
        answer: "না, কোনোভাবেই না। প্রতিটি প্রজেক্টের আর্কিটেকচার এবং কোড সরাসরি আমাদের কোর ইঞ্জিনিয়ারিং টিম তৈরি করে—যার সার্বিক তত্ত্বাবধান করেন প্রতিষ্ঠাতা ও প্রিন্সিপাল সফটওয়্যার আর্কিটেক্ট মো. পারভেজুল ইসলাম। আমরা কখনোই কাজ নিয়ে অন্য কোনো অপরিচিত ফ্রিল্যান্সার বা অনভিজ্ঞ ইন্টার্নদের দিয়ে করাই না।",
        sortOrder: 2,
      },
      {
        id: "faq_03",
        category: "প্রজেক্ট পরিকল্পনা ও বাজেট নির্ধারণ",
        question: "প্রজেক্ট চলাকালীন যোগাযোগ ও অগ্রগতি কীভাবে পর্যবেক্ষণ করব?",
        answer: "আপনার পছন্দের মাধ্যমে (WhatsApp, Slack বা ইমেল) নিয়মিত মাইলফলক আপডেট দেওয়া হবে। প্রতিটি ধাপ সম্পন্ন হলে আপনি একটি প্রাইভেট স্টেজিং প্রিভিউ লিংক পাবেন—যার মাধ্যমে সরাসরি ব্রাউজারে লাইভ প্রজেক্টের অগ্রগতি পরীক্ষা করতে পারবেন।",
        sortOrder: 3,
      },
      {
        id: "faq_04",
        category: "কারিগরি আর্কিটেকচার ও পারফরম্যান্স",
        question: "আপনারা কি ওয়ার্ডপ্রেস বা রেডিমেড টেমপ্লেট ব্যবহার করেন নাকি কাস্টম কোডিং করেন?",
        answer: "আমরা আধুনিক প্রোডাকশন-গ্রেড আর্কিটেকচার (Next.js, React, TypeScript, Tailwind CSS এবং Cloudflare Edge) ব্যবহার করে কাস্টম সমাধান তৈরি করি। ৫০-৬০টি প্লাগইন নির্ভর ধীরগতির ওয়ার্ডপ্রেস সাইটের বদলে আমাদের সাইটগুলো লাইটওয়েট, অত্যন্ত নিরাপদ এবং বিদ্যুৎগতির লোডিং স্পিড প্রদান করে।",
        sortOrder: 4,
      },
      {
        id: "faq_05",
        category: "কারিগরি আর্কিটেকচার ও পারফরম্যান্স",
        question: "মোবাইল ডিভাইসে ওয়েবসাইটের গতি এবং Core Web Vitals পারফরম্যান্স কেমন হবে?",
        answer: "আমরা মোবাইল-ফার্স্ট ইঞ্জিনিয়ারিং অনুসরণ করি। আমাদের সাইটগুলো এমনভাবে অপটিমাইজ করা হয় যাতে 4G মোবাইল নেটওয়ার্কেও Largest Contentful Paint (LCP) ১.২ সেকেন্ডের নিচে থাকে এবং Google Core Web Vitals অডিটে ১০০% গ্রিন স্কোর অর্জন করে।",
        sortOrder: 5,
      },
      {
        id: "faq_06",
        category: "পেমেন্ট গেটওয়ে ও সেলস কমিশন",
        question: "ই-কমার্স সাইটের বিক্রয়ের ওপর কি আপনারা কোনো পার্সেন্টেজ বা কমিশন কাটেন?",
        answer: "একেবারেই না। আমরা প্রজেক্ট ডেভেলপমেন্ট এবং মেইনটেন্যান্সের জন্য নির্দিষ্ট পারিশ্রমিক নিই। আপনার প্ল্যাটফর্মের বিক্রয় বা ট্রানজ্যাকশনের ওপর Projukti Labs কোনো ধরনের রাজস্ব কমিশন বা ফি দাবি করে না। পেমেন্ট গেটওয়ের নির্ধারিত চার্জ (যেমন bKash PGW ১.২% - ১.৫%) সরাসরি আপনার অ্যাকাউন্টে প্রসেস হবে।",
        sortOrder: 6,
      },
      {
        id: "faq_07",
        category: "সোর্স কোডের মালিকানা ও সিকিউরিটি",
        question: "প্রজেক্ট সম্পন্ন হওয়ার পর সোর্স কোড ও ডাটাবেসের মালিকানা কার থাকবে?",
        answer: "চূড়ান্ত পেমেন্ট পরিশোধের সাথে সাথে প্রজেক্টের ১০০% সোর্স কোড, ডাটাবেস স্কিমা এবং ক্লাউড অ্যাকাউন্টের পূর্ণ মালিকানা আপনার কাছে হস্তান্তর করা হবে। আমরা কোনো ভেন্ডর লক-ইন বা কৃত্রিম মালিকানা শর্ত চাপিয়ে দিই না।",
        sortOrder: 7,
      },
    ];

    for (const f of initialFaqs) {
      await db.insert(faqs).values({
        id: f.id,
        category: f.category,
        question: f.question,
        answer: f.answer,
        sortOrder: f.sortOrder,
        isActive: true,
        updatedAt: new Date(),
      }).onConflictDoNothing();
    }
  }

  // 6. Seed Page Sections (Homepage)
  const sectionsCount = await db.select({ count: count() }).from(pageSections);
  if (Number(sectionsCount[0]?.count ?? 0) === 0) {
    const defaultSections = [
      {
        id: "sec_home_hero",
        pageSlug: "home",
        sectionKey: "hero",
        title: "Building Digital Solutions. Engineering the Future.",
        subtitle: "আমরা বাংলাদেশের ব্যবসা ও আধুনিক উদ্যোগগুলোর জন্য উচ্চ-গতির ওয়েব অ্যাপ্লিকেশন, মেটা পিক্সেল ট্র্যাকড ল্যান্ডিং পেজ এবং স্কেলেবল ডিজিটাল কমার্স সিস্টেম তৈরি করি।",
        content: {
          ctaPrimaryText: "প্রজেক্টের বাজেট জানুন",
          ctaPrimaryLink: "/get-a-quote",
          ctaSecondaryText: "সার্ভিসগুলো দেখুন",
          ctaSecondaryLink: "/services",
          badge: "প্রিমিয়াম টেকনোলজি স্টুডিও",
        },
        sortOrder: 1,
      },
      {
        id: "sec_home_metrics",
        pageSlug: "home",
        sectionKey: "metrics",
        title: "ইঞ্জিনিয়ারিং বেঞ্চমার্ক ও পারফরম্যান্স",
        subtitle: "কোনো ফাঁকা প্রতিশ্রুতি নয়—আমাদের প্রতিটি সিস্টেম নিখুঁত কারিগরি মেট্রিক্স ও স্ট্যান্ডার্ড মেনে নির্মিত।",
        content: {
          metrics: [
            { label: "মোবাইল LCP স্পিড", value: "< ১.২s" },
            { label: "টাইপ সেফটি", value: "১০০%" },
            { label: "গ্লোবাল এজ নেটওয়ার্ক", value: "৩০০+ PoPs" },
            { label: "এক্সেসিবিলিটি", value: "WCAG 2.1" },
          ],
        },
        sortOrder: 2,
      },
    ];

    for (const sec of defaultSections) {
      await db.insert(pageSections).values({
        id: sec.id,
        pageSlug: sec.pageSlug,
        sectionKey: sec.sectionKey,
        title: sec.title,
        subtitle: sec.subtitle,
        content: sec.content,
        isActive: true,
        sortOrder: sec.sortOrder,
        updatedAt: new Date(),
      }).onConflictDoNothing();
    }
  }

  // 7. Seed Default Automation Rules
  const autoCount = await db.select({ count: count() }).from(automationRules);
  if (Number(autoCount[0]?.count ?? 0) === 0) {
    const defaultRules = [
      {
        id: "rul_new_inquiry",
        name: "নতুন ইনকোয়ারি প্রসেসিং ও অ্যালার্ট",
        eventType: "inquiry.created",
        description: "নতুন ইনকোয়ারি আসলে স্বয়ংক্রিয়ভাবে একটি লিড তৈরি করে এবং অ্যাডমিন ড্যাশবোর্ডে নোটিফিকেশন পাঠায়।",
        isActive: true,
        config: { autoCreateLead: true, notifyAdmin: true, priority: "high" },
      },
      {
        id: "rul_lead_stage",
        name: "লিড স্টেজ আপডেট ট্র্যাকিং",
        eventType: "lead.stage_changed",
        description: "কোনো লিডের স্টেজ পরিবর্তিত হলে অ্যাক্টিভিটি টাইমলাইনে লগ তৈরি করে।",
        isActive: true,
        config: { recordActivity: true },
      },
      {
        id: "rul_quote_followup",
        name: "কোটেশন ফলো-আপ অ্যালার্ট",
        eventType: "quote.created",
        description: "নতুন কোটেশন তৈরির পর নির্দিষ্ট সময়ের মধ্যে ফলো-আপের রিমাইন্ডার নোটিফিকেশন তৈরি করে।",
        isActive: true,
        config: { reminderHours: 48 },
      },
      {
        id: "rul_scheduled_blog",
        name: "শিডিউলড ব্লগ পোস্ট অটো-পাবলিশিং",
        eventType: "blog.scheduled_publish",
        description: "নির্ধারিত সময় অতিক্রম করলে ড্রাফট ও শিডিউলড ব্লগ পোস্ট স্বয়ংক্রিয়ভাবে লাইভ করে।",
        isActive: true,
        config: { checkIntervalMinutes: 15 },
      },
      {
        id: "rul_system_health",
        name: "সিস্টেম ও ডাটাবেস হেলথ মনিটরিং",
        eventType: "system.health_check",
        description: "Cloudflare D1, KV এবং R2 সংযোগ পর্যবেক্ষণ করে এবং ত্রুটি থাকলে সতর্কবার্তা প্রদান করে।",
        isActive: true,
        config: { intervalMinutes: 60 },
      },
    ];

    for (const r of defaultRules) {
      await db.insert(automationRules).values({
        id: r.id,
        name: r.name,
        eventType: r.eventType,
        description: r.description,
        isActive: r.isActive,
        config: r.config,
        createdAt: new Date(),
        updatedAt: new Date(),
      }).onConflictDoNothing();
    }
  }

  return { success: true, message: "Database seeding complete." };
}
