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
    tagline: "High-performance, edge-rendered web platforms and conversion engines.",
    description:
      "Modern web architecture engineered for speed, search visibility, and maximum conversion rates. Built on Next.js, TypeScript, and edge cloud infrastructure.",
    status: "active",
    iconName: "Globe",
    services: [
      {
        id: "srv_landing_page_meta_pixel",
        slug: "landing-page-meta-pixel",
        categorySlug: "web-development",
        name: "Landing Page with Meta Pixel & Analytics",
        tagline: "Engineered for Conversion. Measured with Absolute Precision.",
        description:
          "A high-speed, conversion-engineered landing page paired with server-grade Meta Pixel, Google Analytics 4, and automated event verification. Eliminates tracking drop-offs.",
        isFlagship: true,
        technicalHighlights: [
          "Sub-1.2s Largest Contentful Paint (LCP) on mobile 4G networks",
          "Dual client-side & server-side Meta Conversions API (CAPI) deduplication",
          "Standardized event schema: PageView, ViewContent, Contact, Lead, Schedule",
          "Meta Events Manager test tool verified before final sign-off",
          "Zero layout shift (CLS < 0.02) with responsive touch optimization",
        ],
        deliverables: [
          "Bespoke single-page conversion architecture and high-impact hero composition",
          "Complete Meta Pixel integration with Test Events verification report",
          "Google Analytics 4 enhanced event tracking integration",
          "Mobile-first responsive engineering tested across 320px–1920px viewports",
          "Interactive contact/lead capture form with spam protection & reference code",
          "Technical SEO foundation: Open Graph tags, JSON-LD Schema, sitemap, robots.txt",
          "14-day post-launch event verification and tracking warranty",
        ],
        exclusions: [
          "Third-party advertising budget and media spend",
          "Client-specific photography and video production (stock assets curated)",
          "Ongoing weekly ad campaign management (development & tracking setup only)",
          "Custom multi-step backend portal (available under custom web applications)",
        ],
        packages: [
          {
            id: "pkg_lp_starter",
            name: "Launch Sprint",
            slug: "launch-sprint",
            priceBdt: 25000,
            priceUsd: 250,
            billingPeriod: "one-time",
            description: "Essential high-speed landing page with core tracking for rapid product or event validation.",
            deliverables: [
              "Up to 5 content sections (Hero, Features, Social Proof, FAQ, Lead Form)",
              "Meta Pixel PageView & Lead event integration",
              "Sub-1.5s mobile speed optimization",
              "D1 / Webhook lead storage",
              "7-day delivery timeline",
            ],
            exclusions: ["Server-side CAPI deduplication", "Custom video background production"],
          },
          {
            id: "pkg_lp_pro",
            name: "Conversion Pro",
            slug: "conversion-pro",
            priceBdt: 45000,
            priceUsd: 450,
            billingPeriod: "one-time",
            popular: true,
            description: "Complete funnel architecture with comprehensive Meta Pixel + CAPI and GA4 measurement.",
            deliverables: [
              "Up to 8 tailored sections with interactive tabs, testimonials & FAQ accordion",
              "Dual Meta Pixel + Conversions API event deduplication",
              "GA4 Enhanced Measurement (scroll depth, outbound clicks, form abandonment)",
              "Live Meta Events Manager verification with recorded proof",
              "Lead capture with email notification & reference code",
              "10-day delivery timeline",
            ],
            exclusions: ["Third-party ad media spend"],
          },
          {
            id: "pkg_lp_scale",
            name: "Growth Funnel Suite",
            slug: "growth-funnel-suite",
            priceBdt: 75000,
            priceUsd: 750,
            billingPeriod: "one-time",
            description: "Advanced conversion system with A/B variant scaffolding, custom calculators, and CRM pipeline handoff.",
            deliverables: [
              "Comprehensive funnel layout with multi-step interactive lead quiz/calculator",
              "Full Meta Pixel, CAPI, Google Ads Tag, and TikTok Pixel integration",
              "Direct CRM pipeline integration with automatic Slack/WhatsApp/Email alerts",
              "Advanced Core Web Vitals optimization score guarantee (>95 mobile)",
              "14-day delivery timeline with 30-day extended monitoring",
            ],
            exclusions: ["Third-party media ad spend"],
          },
        ],
      },
      {
        id: "srv_corporate_website",
        slug: "corporate-website",
        categorySlug: "web-development",
        name: "Corporate & Studio Web Platform",
        tagline: "Modern architecture, edge-rendered performance, and CMS content workflows.",
        description:
          "Multi-page corporate website for modern companies, technology studios, and consulting firms. Engineered with Next.js App Router and semantic design tokens.",
        isFlagship: false,
        technicalHighlights: [
          "Edge SSR / SSG hybrid caching for instant international page delivery",
          "Automated blog and news publishing system",
          "WCAG 2.1 AA accessible navigation, forms, and color contrast",
        ],
        deliverables: [
          "Complete multi-page site (Home, About, Services, Case Studies, Team, Contact)",
          "Content management capability for news, services, and team members",
          "Dynamic contact inquiry routing with database persistence",
          "Automated XML sitemaps and search console verification setup",
        ],
        exclusions: [
          "Third-party CMS software licensing fees (if proprietary CMS chosen)",
          "Copywriting for specialized technical whitepapers",
        ],
        packages: [
          {
            id: "pkg_corp_starter",
            name: "Company Standard",
            slug: "company-standard",
            priceBdt: 60000,
            priceUsd: 600,
            billingPeriod: "one-time",
            description: "Professional corporate presence for established studios and service firms.",
            deliverables: ["Up to 6 custom pages", "Contact inquiry system", "Full SEO setup", "Mobile-first responsive build"],
            exclusions: ["Multi-language localization"],
          },
          {
            id: "pkg_corp_scale",
            name: "Enterprise Studio",
            slug: "enterprise-studio",
            priceBdt: 120000,
            priceUsd: 1200,
            billingPeriod: "one-time",
            description: "Comprehensive corporate portal with dynamic case study engine, career portal, and blog system.",
            deliverables: ["Up to 15 pages", "Blog CMS & Case Studies", "Custom career/application form", "Performance guarantee"],
            exclusions: ["Intranet / ERP portal integration"],
          },
        ],
      },
    ],
  },
  {
    id: "cat_ecommerce",
    slug: "ecommerce",
    name: "E-commerce & Digital Commerce",
    tagline: "Reliable commerce architecture with local and international payment integration.",
    description:
      "Production-grade storefronts, resilient cart-to-checkout flows, order management, and secure payment gateway integrations for Bangladesh and global markets.",
    status: "active",
    iconName: "ShoppingCart",
    services: [
      {
        id: "srv_complete_ecommerce",
        slug: "complete-ecommerce-website",
        categorySlug: "ecommerce",
        name: "Complete Production-Ready E-commerce Platform",
        tagline: "Robust storefront, frictionless checkout, automated order engine, and secure payment gateways.",
        description:
          "An end-to-end e-commerce solution engineered for conversion. Features fast product browsing, customer cart, guest and authenticated checkout, local & global payments, and admin order control.",
        isFlagship: true,
        technicalHighlights: [
          "Sub-100ms client cart state updates with optimistic UI reconciliation",
          "Direct payment gateway integration: SSLCommerz, bKash, Nagad, and Stripe",
          "Real-time order validation, inventory reservation, and fraud check scaffolding",
          "Automated SMS and email transaction confirmations with reference tracking",
          "Zero third-party marketplace monthly software revenue fees",
        ],
        deliverables: [
          "Modern responsive storefront: catalog, categories, product filters, quick view",
          "Frictionless 2-step checkout supporting guest checkout and address auto-save",
          "Integrated payment gateways: bKash PGW, Nagad, SSLCommerz, and Stripe",
          "Administrative commerce dashboard: orders, products, inventory, coupons, reports",
          "Transactional SMS/email triggers on Order Placed, Paid, Shipped, Delivered",
          "E-commerce Meta Pixel & GA4 standard purchase events with currency telemetry",
          "30-day post-launch technical warranty and handover documentation",
        ],
        exclusions: [
          "Payment gateway operator per-transaction merchant fees (paid to bKash/SSL/Stripe directly)",
          "Third-party SMS credit packages (purchased directly from SMS provider)",
          "Manual product data entry over 50 SKU seed items (bulk CSV import tool provided)",
          "Courier API subscription fees (Pathao/Steadfast accounts held by client)",
        ],
        packages: [
          {
            id: "pkg_ecom_starter",
            name: "Commerce Starter",
            slug: "commerce-starter",
            priceBdt: 65000,
            priceUsd: 650,
            billingPeriod: "one-time",
            description: "Essential e-commerce platform for boutique brands and single-category direct-to-consumer stores.",
            deliverables: [
              "Up to 100 products catalog capacity",
              "bKash / Nagad or SSLCommerz payment integration",
              "Admin order management & invoice generator",
              "Mobile-first shopping cart and checkout",
              "14-day launch timeline",
            ],
            exclusions: ["Multi-currency international switcher", "Automated courier API booking"],
          },
          {
            id: "pkg_ecom_growth",
            name: "Growth Storefront",
            slug: "growth-storefront",
            priceBdt: 110000,
            priceUsd: 1100,
            billingPeriod: "one-time",
            popular: true,
            description: "Full-scale commerce engine with local + international gateways, discount rules, and automated courier sync.",
            deliverables: [
              "Unlimited products catalog with multi-variant options (size, color, weight)",
              "Multi-gateway checkout: SSLCommerz, bKash PGW, and Stripe",
              "Automated courier API integration (Steadfast / Pathao parcel dispatch)",
              "Discount coupons, flash sales, and customer order history portal",
              "E-commerce GA4 and Meta Pixel Purchase event tracking",
              "21-day launch timeline",
            ],
            exclusions: ["Multi-vendor marketplace vendor payout engine"],
          },
          {
            id: "pkg_ecom_scale",
            name: "Custom Scale Commerce",
            slug: "custom-scale-commerce",
            priceBdt: 180000,
            priceUsd: 1800,
            billingPeriod: "one-time",
            description: "High-volume, bespoke commerce architecture with headless capabilities, ERP sync, and multi-warehouse support.",
            deliverables: [
              "Bespoke high-concurrency checkout with edge caching",
              "Dual currency (BDT & USD) auto-geolocation switcher",
              "Custom warehouse & inventory synchronization API",
              "Comprehensive administrative analytics and automated client reports",
              "30-day launch timeline with dedicated staging test period",
            ],
            exclusions: ["Physical warehouse hardware integration"],
          },
        ],
      },
      {
        id: "srv_headless_commerce",
        slug: "headless-commerce",
        categorySlug: "ecommerce",
        name: "Headless Storefront & Catalog Solution",
        tagline: "Decoupled storefront with sub-second page transitions and external inventory APIs.",
        description:
          "Supercharge Shopify, Medusa, or custom commerce backends with a bespoke Next.js edge storefront for ultra-fast load times and unique brand aesthetics.",
        isFlagship: false,
        technicalHighlights: [
          "Zero-latency edge page rendering with incremental static revalidation",
          "Direct GraphQL/REST integration to commerce backends",
        ],
        deliverables: [
          "Custom front-end theme and checkout bridge",
          "Dynamic product search and faceted filtering",
          "Seamless cart sync with backend commerce API",
        ],
        exclusions: ["Backend e-commerce hosting infrastructure fees"],
        packages: [
          {
            id: "pkg_headless_pro",
            name: "Headless Bridge",
            slug: "headless-bridge",
            priceBdt: 95000,
            priceUsd: 950,
            billingPeriod: "one-time",
            description: "Modern headless frontend connected to your existing Shopify or custom backend.",
            deliverables: ["Bespoke Next.js storefront", "Cart bridge", "Catalog synchronization", "14-day delivery"],
            exclusions: ["Backend store data migration"],
          },
        ],
      },
    ],
  },
  {
    id: "cat_maintenance",
    slug: "maintenance-support",
    name: "Maintenance & Technical Support",
    tagline: "Proactive engineering care, security patching, and SLA-backed continuous support.",
    description:
      "Eliminate downtime, security vulnerabilities, and technical debt. Ongoing retainer plans for production websites, web applications, and e-commerce platforms.",
    status: "active",
    iconName: "ShieldCheck",
    services: [
      {
        id: "srv_website_maintenance",
        slug: "website-maintenance",
        categorySlug: "maintenance-support",
        name: "Proactive Website Maintenance & Technical Retainer",
        tagline: "Zero downtime surprises. Proactive security, performance, and dedicated engineering hours.",
        description:
          "A structured monthly engineering retainer guaranteeing uptime, automated off-site backups, security dependency patches, and dedicated monthly development hours for continuous improvements.",
        isFlagship: true,
        technicalHighlights: [
          "Continuous 5-minute uptime and TLS certificate monitoring with automated incident alerts",
          "Automated weekly database and asset snapshot verification",
          "Staged security vulnerability patching before production deployment",
          "Quarterly Core Web Vitals profiling and speed regression prevention",
          "Guaranteed SLA response times backed by direct developer escalation",
        ],
        deliverables: [
          "Automated off-site database & static asset backups with monthly restoration drills",
          "Node.js, Next.js, and dependency security update management",
          "Continuous uptime and SSL certificate validity monitoring",
          "Dedicated monthly engineering hours for feature tweaks, banners, and enhancements",
          "Monthly Executive Health & Security Report with recommendations",
          "Emergency critical bug resolution within guaranteed SLA window",
        ],
        exclusions: [
          "Complete website redesigns or major architectural rewrites (handled as separate project sprints)",
          "Unused monthly development hours do not roll over past 60 days",
          "Third-party hosting/SaaS subscription fees (invoiced directly by service providers)",
          "Content copywriting and graphic design from scratch (formatting client assets is included)",
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
            description: "Essential insurance for business websites that need security, backups, and guaranteed uptime.",
            deliverables: [
              "Weekly off-site backup verification",
              "15-minute uptime and SSL monitoring",
              "Monthly core dependency security updates",
              "Emergency incident triage (48-hour response SLA)",
              "Monthly health status email summary",
            ],
            exclusions: ["Dedicated development hours", "Same-day emergency SLA"],
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
            description: "Proactive maintenance and development support for growing commercial websites and online stores.",
            deliverables: [
              "Daily database backup & weekly verification",
              "5-minute uptime monitoring with instant WhatsApp/email alert",
              "4 hours dedicated developer time every month for UI tweaks & content updates",
              "Monthly performance audit & database query optimization",
              "24-hour response SLA for non-critical support tickets",
              "Detailed monthly engineering report",
            ],
            exclusions: ["Bespoke enterprise on-call SLA"],
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
            description: "Mission-critical engineering retainer for high-traffic websites, portals, and e-commerce stores.",
            deliverables: [
              "10 hours dedicated developer time every month",
              "4-hour emergency SLA with direct phone/WhatsApp engineer access",
              "Staging environment testing before all production updates",
              "Continuous automated security audit & secret rotation assistance",
              "Database indexing & CDN caching tuning",
              "Bi-weekly engineering check-in",
            ],
            exclusions: ["Full team staff augmentation"],
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
            description: "Bespoke SLA and dedicated engineering capacity for enterprise platforms and high-stakes products.",
            deliverables: [
              "Tailored monthly development hours (20+ hrs)",
              "1-hour critical response SLA with 24/7 on-call coverage",
              "Dedicated Slack or WhatsApp team channel with the Principal Architect",
              "Multi-region failover and disaster recovery drills",
              "Custom infrastructure and CI/CD workflow management",
            ],
            exclusions: [],
          },
        ],
      },
      {
        id: "srv_speed_security_audit",
        slug: "speed-security-audit",
        categorySlug: "maintenance-support",
        name: "Performance & Security Hardening Audit",
        tagline: "Comprehensive Core Web Vitals profiling, security headers, and edge caching optimization.",
        description:
          "A one-off deep-dive audit and remediation package to resolve slow page speeds, high TTFB, security misconfigurations, and broken tracking.",
        isFlagship: false,
        technicalHighlights: [
          "Chrome DevTools trace analysis and JavaScript bundle unbloating",
          "Content Security Policy (CSP), HSTS, and CORS header hardening",
        ],
        deliverables: [
          "Exhaustive 20+ point audit report with before-and-after benchmarks",
          "Direct code remediation for bundle splitting and asset caching",
          "Edge cache rule setup and image optimization pipeline",
        ],
        exclusions: ["Hosting provider server replacement fees"],
        packages: [
          {
            id: "pkg_audit_oneoff",
            name: "Deep Audit & Fix",
            slug: "deep-audit-and-fix",
            priceBdt: 30000,
            priceUsd: 300,
            billingPeriod: "one-time",
            description: "Complete performance overhaul and security hardening sprint.",
            deliverables: ["Full site profiling", "Direct code fixes", "Security header implementation", "Speed guarantee"],
            exclusions: ["Full backend rewrite"],
          },
        ],
      },
    ],
  },
  // Future Categories (Coming Soon / Pipeline)
  {
    id: "cat_software_dev",
    slug: "software-development",
    name: "Custom Software & SaaS Development",
    tagline: "Scalable cloud architectures, internal operations portals, and multi-tenant SaaS products.",
    description:
      "Enterprise-grade custom web applications built with type safety, clean domain boundaries, and scalable data layers.",
    status: "coming_soon",
    iconName: "Code2",
    services: [],
  },
  {
    id: "cat_ai_automation",
    slug: "ai-automation",
    name: "AI Integrations & Automated Workflows",
    tagline: "Intelligent agent pipelines, document extraction, and background workflow automation.",
    description:
      "Practical AI integrations that eliminate repetitive manual labor and accelerate business decision cycles.",
    status: "coming_soon",
    iconName: "Cpu",
    services: [],
  },
  {
    id: "cat_mobile_apps",
    slug: "mobile-apps",
    name: "Cross-Platform Mobile Applications",
    tagline: "Responsive, native-feeling mobile applications built for iOS and Android.",
    description:
      "Unified codebase mobile solutions powered by React Native and modern mobile design systems.",
    status: "coming_soon",
    iconName: "Smartphone",
    services: [],
  },
  {
    id: "cat_ui_ux",
    slug: "ui-ux-design",
    name: "Product Discovery & UI/UX Design Systems",
    tagline: "User-centered design architecture, wireframes, and scalable design tokens.",
    description:
      "Interface design systems that bridge visual craft with production-ready design tokens.",
    status: "coming_soon",
    iconName: "Palette",
    services: [],
  },
  {
    id: "cat_cloud_devops",
    slug: "cloud-devops",
    name: "Cloud Infrastructure & Edge DevOps",
    tagline: "Serverless deployments, container orchestration, and continuous integration pipelines.",
    description:
      "High-availability infrastructure architectures on Cloudflare, AWS, and GCP with automated CI/CD.",
    status: "coming_soon",
    iconName: "Cloud",
    services: [],
  },
  {
    id: "cat_api_integration",
    slug: "api-integration",
    name: "API Architecture & Microservice Integration",
    tagline: "Robust REST & GraphQL APIs, secure webhooks, and third-party platform bridges.",
    description:
      "Well-documented, high-throughput integration layers connecting accounting, ERP, CRM, and payment systems.",
    status: "coming_soon",
    iconName: "Share2",
    services: [],
  },
  {
    id: "cat_seo_analytics",
    slug: "seo-analytics",
    name: "Advanced Technical SEO & Business Analytics",
    tagline: "Data pipelines, structured search data, and end-to-end customer attribution modeling.",
    description:
      "Programmatic SEO architecture, Core Web Vitals optimization, and customized business intelligence reporting.",
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

