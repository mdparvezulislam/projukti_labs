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
    name: "Web Development & Design",
    tagline: "Modern, responsive websites designed to communicate your brand, support your business and create a professional online presence.",
    description:
      "We design and build clean, fast, search-optimized websites and web applications using Next.js, React, and modern web standards. From focused conversion landing pages to comprehensive business portals.",
    status: "active",
    iconName: "Globe",
    services: [
      {
        id: "srv_landing_page_meta_pixel",
        slug: "landing-page-meta-pixel",
        categorySlug: "web-development",
        name: "Landing Page with Meta Pixel",
        tagline: "Launch a focused landing page designed to present your offer clearly, guide visitors toward action and support Meta Pixel-based marketing measurement.",
        description:
          "A high-speed, conversion-focused landing page built with clean responsive design and dual-layer Meta Pixel + Conversions API (CAPI) event tracking so your advertising campaigns receive accurate, deduplicated event data.",
        isFlagship: true,
        technicalHighlights: [
          "Target mobile LCP under 1.2s on 4G cellular networks with zero layout shift",
          "Dual-layer browser Meta Pixel and server-side Conversions API (CAPI) event deduplication",
          "Standardized event schema: PageView, ViewContent, Contact, Lead, and Schedule",
          "Pre-handover verification in Meta Events Manager test events console",
          "Responsive mobile ergonomics with strict 44x44px touch target compliance",
        ],
        deliverables: [
          "Custom conversion-engineered single-page layout with high-impact hero structure",
          "Complete Meta Pixel and Conversions API (CAPI) setup on your verified business account",
          "Google Analytics 4 enhanced event tracking and scroll depth measurement",
          "Fluid responsive design across mobile (320px+), tablet, and desktop viewports",
          "Bot-protected lead capture form with instant email and webhook notification routing",
          "Technical SEO foundation: Open Graph tags, JSON-LD structured data, sitemap, and robots.txt",
          "14-day post-launch event tracking verification and technical warranty support",
        ],
        exclusions: [
          "Advertising media spend (payable directly to Meta or Google)",
          "Custom on-site photography or video production shoots",
          "Ongoing weekly ad campaign management (setup and verification included)",
          "Complex multi-tier backend portals (covered under custom web application scope)",
        ],
        packages: [
          {
            id: "pkg_lp_starter",
            name: "Launch Sprint",
            slug: "launch-sprint",
            priceBdt: 25000,
            priceUsd: 250,
            billingPeriod: "one-time",
            description: "Fast-to-market conversion landing page with core sections and standard Meta Pixel event tracking.",
            deliverables: [
              "Up to 5 content sections (Hero, Features, Why Us, FAQs, Lead Capture)",
              "Browser Meta Pixel PageView and Lead event integration",
              "Mobile speed optimization and clean responsive design",
              "Database and email lead capture storage",
              "7 business days delivery",
            ],
            exclusions: ["Server-side CAPI deduplication", "Custom video background processing"],
          },
          {
            id: "pkg_lp_pro",
            name: "Conversion Pro",
            slug: "conversion-pro",
            priceBdt: 45000,
            priceUsd: 450,
            billingPeriod: "one-time",
            popular: true,
            description: "Full-funnel landing page with dual Meta Pixel + CAPI deduplication and GA4 enhanced measurement.",
            deliverables: [
              "Up to 8 tailored sections with interactive tabs, testimonials, and accordion FAQs",
              "Dual browser Meta Pixel and server-side Conversions API (CAPI) deduplication",
              "GA4 enhanced measurement (scroll depth, outbound clicks, form abandonment)",
              "Live verification report in Meta Events Manager test console",
              "Lead capture with email notifications and reference tracking codes",
              "10 business days delivery",
            ],
            exclusions: ["Advertising media budget"],
          },
          {
            id: "pkg_lp_scale",
            name: "Growth Funnel Suite",
            slug: "growth-funnel-suite",
            priceBdt: 75000,
            priceUsd: 750,
            billingPeriod: "one-time",
            description: "Advanced funnel system with multi-step interactive workflows, CRM pipelines, and multi-channel telemetry.",
            deliverables: [
              "Multi-step interactive lead quiz or pricing calculator component",
              "Meta Pixel, CAPI, Google Ads Tag, and TikTok Pixel integration",
              "Direct CRM pipeline integration with automatic Slack/WhatsApp/Email notifications",
              "Advanced Core Web Vitals optimization (>95 mobile score benchmark)",
              "14 business days delivery with 30-day extended monitoring",
            ],
            exclusions: ["Advertising media budget"],
          },
        ],
      },
      {
        id: "srv_corporate_website",
        slug: "corporate-website",
        categorySlug: "web-development",
        name: "Business Website Development",
        tagline: "Custom multi-page web platforms built for speed, SEO, and long-term brand credibility.",
        description:
          "Professional multi-page business websites for growing companies, agencies, and consultancies. Built with Next.js App Router and semantic design tokens for effortless maintenance and search visibility.",
        isFlagship: false,
        technicalHighlights: [
          "Edge SSR / SSG hybrid caching for instant page delivery worldwide",
          "Automated blog, case study, and announcement publishing workflow",
          "WCAG 2.1 AA accessible navigation, form controls, and color contrast",
        ],
        deliverables: [
          "Complete multi-page website (Home, About, Services, Case Studies, Contact)",
          "Easy-to-use content management for services, articles, and portfolio entries",
          "Dynamic inquiry routing with persistent database storage",
          "Automated XML sitemap, robots.txt, and Google Search Console configuration",
        ],
        exclusions: [
          "Proprietary third-party CMS licensing fees",
          "Specialized technical research copywriting from scratch",
        ],
        packages: [
          {
            id: "pkg_corp_starter",
            name: "Company Standard",
            slug: "company-standard",
            priceBdt: 60000,
            priceUsd: 600,
            billingPeriod: "one-time",
            description: "Essential professional web presence for service firms, consultancies, and established studios.",
            deliverables: [
              "Up to 6 custom pages with responsive layouts",
              "Inquiry capture system with email alerts",
              "Complete technical SEO and structured data setup",
              "Mobile-first responsive architecture",
            ],
            exclusions: ["Multi-language localization"],
          },
          {
            id: "pkg_corp_scale",
            name: "Enterprise Studio",
            slug: "enterprise-studio",
            priceBdt: 120000,
            priceUsd: 1200,
            billingPeriod: "one-time",
            description: "Comprehensive corporate platform with dynamic case study engine, career portal, and content management.",
            deliverables: [
              "Up to 15 custom pages with modular components",
              "Blog CMS and portfolio case study system",
              "Custom career application or quotation workflows",
              "High-speed edge performance optimization",
            ],
            exclusions: ["Custom internal ERP or intranet portal integration"],
          },
        ],
      },
    ],
  },
  {
    id: "cat_ecommerce",
    slug: "ecommerce",
    name: "E-commerce & Digital Commerce",
    tagline: "Build a modern online store with the essential tools to manage products, orders, customers and your digital business.",
    description:
      "High-converting online storefronts, instant-response carts, frictionless checkouts, reliable order management, and secure payment gateway integrations for Bangladesh and global sales.",
    status: "active",
    iconName: "ShoppingCart",
    services: [
      {
        id: "srv_complete_ecommerce",
        slug: "complete-ecommerce-website",
        categorySlug: "ecommerce",
        name: "Complete E-commerce Website",
        tagline: "A complete e-commerce website built around your business requirements, with product management, customer-facing shopping features, order workflows and an administrative control panel.",
        description:
          "A full-featured online store tailored to your brand, featuring rapid product browsing, optimistic cart updates, single-page mobile checkouts, local payment gateways (bKash PGW, Nagad, SSLCommerz) and international processing (Stripe), and complete admin order management.",
        isFlagship: true,
        technicalHighlights: [
          "Sub-100ms instant cart updates using optimistic UI state management",
          "Direct merchant account payment integrations: bKash PGW, Nagad, SSLCommerz, and Stripe",
          "Real-time order validation, inventory reservation, and fraud prevention safeguards",
          "Automated transactional SMS and email confirmations with reference tracking codes",
          "0% studio sales commissions (no hidden per-order fees or percentage deductions)",
        ],
        deliverables: [
          "Modern responsive storefront: product catalog, category navigation, filtering, and quick view",
          "Frictionless checkout with guest checkout and address auto-save",
          "Payment gateway integration: bKash PGW, Nagad, SSLCommerz, and Stripe",
          "Administrative commerce dashboard: orders, products, inventory, coupons, and reports",
          "Transactional notifications for order placed, paid, shipped, and delivered states",
          "E-commerce Meta Pixel and GA4 standard Purchase event tracking",
          "30-day post-launch technical warranty and complete handover documentation",
        ],
        exclusions: [
          "Payment gateway per-transaction fees (payable directly to bKash / SSLCommerz / Stripe)",
          "Third-party bulk SMS bundle charges (payable to your SMS gateway provider)",
          "Manual data entry for more than 50 products (bulk CSV import tool provided)",
          "Courier API account registration fees (Pathao / Steadfast merchant accounts)",
        ],
        packages: [
          {
            id: "pkg_ecom_starter",
            name: "Commerce Starter",
            slug: "commerce-starter",
            priceBdt: 65000,
            priceUsd: 650,
            billingPeriod: "one-time",
            description: "Essential online store for boutique brands and single-category retail shops.",
            deliverables: [
              "Up to 100 products catalog capacity",
              "bKash / Nagad or SSLCommerz payment gateway integration",
              "Admin order management with automated invoice generation",
              "Mobile-first optimized shopping cart and checkout",
              "14 business days delivery",
            ],
            exclusions: ["Multi-currency international switching", "Automated courier dispatch API"],
          },
          {
            id: "pkg_ecom_growth",
            name: "Growth Storefront",
            slug: "growth-storefront",
            priceBdt: 110000,
            priceUsd: 1100,
            billingPeriod: "one-time",
            popular: true,
            description: "Complete commerce engine with multi-gateway payments, discount rules, and automated courier sync.",
            deliverables: [
              "Unlimited product catalog with multi-variant options (size, color, specifications)",
              "Multiple payment gateways: SSLCommerz, bKash PGW, and Stripe",
              "Automated courier API integration (Pathao / Steadfast parcel dispatch)",
              "Discount coupons, promotional rules, and customer order history portal",
              "E-commerce GA4 and Meta Pixel Purchase event telemetry",
              "21 business days delivery",
            ],
            exclusions: ["Multi-vendor marketplace payout engine"],
          },
          {
            id: "pkg_ecom_scale",
            name: "Custom Scale Commerce",
            slug: "custom-scale-commerce",
            priceBdt: 180000,
            priceUsd: 1800,
            billingPeriod: "one-time",
            description: "High-volume commerce architecture with edge caching, custom synchronization, and multi-warehouse support.",
            deliverables: [
              "High-concurrency custom checkout engine with edge caching",
              "Dual currency (BDT and USD) with automatic geolocation currency switcher",
              "Custom warehouse and external inventory synchronization APIs",
              "Comprehensive analytics dashboard and executive reporting system",
              "30 business days delivery with dedicated staging testing period",
            ],
            exclusions: ["Physical warehouse hardware setup"],
          },
        ],
      },
      {
        id: "srv_headless_commerce",
        slug: "headless-commerce",
        categorySlug: "ecommerce",
        name: "Digital Product Store",
        tagline: "Dedicated commerce platforms for digital products, software access, and automated delivery.",
        description:
          "Fast storefronts tailored for digital product delivery, digital licenses, subscription management, and instant access workflows.",
        isFlagship: false,
        technicalHighlights: [
          "Zero-latency edge page rendering with incremental static regeneration",
          "Automated instant delivery of keys, credentials, or downloadable assets upon payment",
        ],
        deliverables: [
          "Custom digital product catalog and instant fulfillment workflows",
          "Dynamic product search and faceted filtering",
          "Automated account provisioning and transaction email receipts",
        ],
        exclusions: ["Third-party SaaS API subscription costs"],
        packages: [
          {
            id: "pkg_headless_pro",
            name: "Digital Delivery Suite",
            slug: "digital-delivery-suite",
            priceBdt: 95000,
            priceUsd: 950,
            billingPeriod: "one-time",
            description: "Modern digital commerce storefront with automated instant product delivery upon verified payment.",
            deliverables: ["Custom Next.js digital storefront", "Instant delivery workflow", "Product license manager", "14 business days delivery"],
            exclusions: ["External licensing server hosting fees"],
          },
        ],
      },
    ],
  },
  {
    id: "cat_maintenance",
    slug: "maintenance-support",
    name: "Maintenance & Technical Support",
    tagline: "Keep your website maintained, updated and technically supported with practical ongoing assistance.",
    description:
      "Reliable ongoing engineering care, security patching, off-site backups, and SLA-backed troubleshooting to prevent downtime and keep your web platforms running smoothly.",
    status: "active",
    iconName: "ShieldCheck",
    services: [
      {
        id: "srv_website_maintenance",
        slug: "website-maintenance",
        categorySlug: "maintenance-support",
        name: "Website Maintenance",
        tagline: "Practical website maintenance and technical support to help keep your existing website updated, stable and easier to manage.",
        description:
          "A structured monthly engineering retainer providing continuous uptime monitoring, automated off-site database backups, security patching, and dedicated developer hours for routine adjustments and new features.",
        isFlagship: true,
        technicalHighlights: [
          "Continuous uptime and SSL certificate validity monitoring with automated alerts",
          "Automated off-site database snapshots and static asset backup retention",
          "Security patch verification in staging before production deployment",
          "Regular Core Web Vitals profiling to prevent performance regressions",
          "Guaranteed SLA response time tiers according to your plan",
        ],
        deliverables: [
          "Automated off-site database backups with periodic restoration drills",
          "Next.js, Node.js, and dependency security update management",
          "24/7 automated site uptime and error monitoring",
          "Dedicated developer hours each month for UI tweaks, content updates, and features",
          "Monthly executive health, security, and performance report",
          "Priority emergency bug-fixing support matching your plan's SLA",
        ],
        exclusions: [
          "Complete architectural redesign of the website (quoted as a separate project)",
          "Unused monthly developer hours do not roll over beyond 60 days",
          "Third-party server and SaaS subscription fees (payable to your provider)",
          "Copywriting or branding from scratch (asset formatting and publishing included)",
        ],
        packages: [
          {
            id: "pkg_maint_basic",
            name: "Basic Care",
            slug: "basic-care",
            priceBdt: 8000,
            priceUsd: 80,
            billingPeriod: "monthly",
            slaHours: 48,
            devHours: 0,
            description: "Essential baseline protection to keep your website online, secure, and reliably backed up.",
            deliverables: [
              "Weekly off-site backup with integrity verification",
              "15-minute interval uptime and SSL certificate monitoring",
              "Monthly core dependency security updates",
              "Emergency incident triage (48-hour SLA response)",
              "Monthly health status email summary",
            ],
            exclusions: ["Dedicated development hours", "Same-day emergency support"],
          },
          {
            id: "pkg_maint_business",
            name: "Business Care",
            slug: "business-care",
            priceBdt: 18000,
            priceUsd: 180,
            billingPeriod: "monthly",
            popular: true,
            slaHours: 24,
            devHours: 4,
            description: "Proactive maintenance and regular developer hours for growing commercial websites and online stores.",
            deliverables: [
              "Daily database backups and weekly verification checks",
              "5-minute uptime monitoring with instant WhatsApp and email alerts",
              "4 dedicated developer hours each month for UI tweaks and content updates",
              "Monthly performance audit and database optimization",
              "24-hour SLA response time for non-critical tickets",
              "Detailed monthly technical report",
            ],
            exclusions: ["Dedicated on-call full-time engineer"],
          },
          {
            id: "pkg_maint_priority",
            name: "Priority Care",
            slug: "priority-care",
            priceBdt: 38000,
            priceUsd: 380,
            billingPeriod: "monthly",
            slaHours: 4,
            devHours: 10,
            description: "Mission-critical engineering support and fast turnaround for high-traffic portals and e-commerce stores.",
            deliverables: [
              "10 dedicated senior developer hours each month",
              "4-hour emergency SLA with direct phone and WhatsApp channel",
              "Pre-deployment testing in dedicated staging environments",
              "Continuous security audits and secret rotation assistance",
              "Database indexing and CDN edge cache tuning",
              "Bi-weekly engineering check-in calls",
            ],
            exclusions: ["Full-team dedicated staff augmentation"],
          },
          {
            id: "pkg_maint_custom",
            name: "Custom Retainer",
            slug: "custom-retainer",
            priceBdt: null,
            priceUsd: null,
            billingPeriod: "custom",
            slaHours: 1,
            devHours: 25,
            description: "Bespoke SLA, dedicated capacity, and direct architectural consulting for large platforms.",
            deliverables: [
              "Flexible monthly engineering capacity (20+ hours)",
              "1-hour critical response SLA with 24/7 emergency escalation",
              "Direct communication channel with Principal Software Architect (Slack / WhatsApp)",
              "Multi-region failover planning and disaster recovery drills",
              "Custom cloud infrastructure and CI/CD pipeline management",
            ],
            exclusions: [],
          },
        ],
      },
      {
        id: "srv_speed_security_audit",
        slug: "speed-security-audit",
        categorySlug: "maintenance-support",
        name: "Performance & Security Audit",
        tagline: "Core Web Vitals profiling, security headers, and edge caching optimization.",
        description:
          "A comprehensive one-off audit and remediation sprint to diagnose slow page loads, security vulnerabilities, and tracking errors.",
        isFlagship: false,
        technicalHighlights: [
          "Chrome DevTools trace analysis and JavaScript bundle optimization",
          "Content Security Policy (CSP), HSTS, and CORS security header hardening",
        ],
        deliverables: [
          "Comprehensive 20+ point audit report with before-and-after benchmarks",
          "Direct code remediation for bundle splitting and asset caching",
          "Edge cache rules setup and modern image optimization pipeline",
        ],
        exclusions: ["Hosting provider server hardware replacement fees"],
        packages: [
          {
            id: "pkg_audit_oneoff",
            name: "Deep Audit & Fix",
            slug: "deep-audit-and-fix",
            priceBdt: 30000,
            priceUsd: 300,
            billingPeriod: "one-time",
            description: "Complete sprint to enhance website speed and reinforce overall infrastructure security.",
            deliverables: [
              "Full site profiling and audit",
              "Direct code-level remediation",
              "Security header implementation",
              "Performance improvement verification",
            ],
            exclusions: ["Complete backend rewrite"],
          },
        ],
      },
    ],
  },
  // Future Categories (Coming Soon / Pipeline)
  {
    id: "cat_software_dev",
    slug: "software-development",
    name: "Custom Software & SaaS",
    tagline: "Scalable cloud architecture, internal operations portals, and multi-tenant SaaS solutions.",
    description:
      "Enterprise-grade web applications engineered with clean domain boundaries, type safety, and resilient relational data layers.",
    status: "coming_soon",
    iconName: "Code2",
    services: [],
  },
  {
    id: "cat_ai_automation",
    slug: "ai-automation",
    name: "AI & Workflow Automation",
    tagline: "Intelligent AI pipelines, document processing, and background event automations.",
    description:
      "Pragmatic custom AI and background workers to streamline business operations and reduce manual overhead.",
    status: "coming_soon",
    iconName: "Cpu",
    services: [],
  },
  {
    id: "cat_mobile_apps",
    slug: "mobile-apps",
    name: "Cross-Platform Mobile Apps",
    tagline: "High-performance and responsive mobile applications for iOS and Android.",
    description:
      "Unified codebase applications combining React Native with modern mobile design systems and offline synchronization.",
    status: "coming_soon",
    iconName: "Smartphone",
    services: [],
  },
  {
    id: "cat_ui_ux",
    slug: "ui-ux-design",
    name: "UI/UX & Design Systems",
    tagline: "User-centric design architecture, interactive wireframes, and scalable design tokens.",
    description:
      "Durable design systems and thoughtful interface aesthetics tailored for production web applications.",
    status: "coming_soon",
    iconName: "Palette",
    services: [],
  },
  {
    id: "cat_cloud_devops",
    slug: "cloud-devops",
    name: "Cloud & Edge DevOps",
    tagline: "Serverless deployments, container isolation, and automated CI/CD pipelines.",
    description:
      "High-availability and cost-effective cloud architectures deployed across Cloudflare Workers, AWS, and modern Linux VPS.",
    status: "coming_soon",
    iconName: "Cloud",
    services: [],
  },
  {
    id: "cat_api_integration",
    slug: "api-integration",
    name: "API Integration & Microservices",
    tagline: "Robust REST and GraphQL APIs, secure webhooks, and third-party system bridges.",
    description:
      "Resilient integration layers connecting payment gateways, ERPs, CRMs, and accounting systems.",
    status: "coming_soon",
    iconName: "Share2",
    services: [],
  },
  {
    id: "cat_seo_analytics",
    slug: "seo-analytics",
    name: "Technical SEO & Analytics",
    tagline: "Programmatic SEO, structured data schemas, and end-to-end attribution modeling.",
    description:
      "Search visibility engineering, Core Web Vitals optimization, and customized business telemetry dashboards.",
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
