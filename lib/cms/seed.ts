import { getDb } from "@/lib/db";
import {
  services,
  servicePackages,
  blogPosts,
  portfolioProjects,
  faqs,
  siteSettings,
  pageSections,
} from "@/db/schema";
import { SERVICE_CATEGORIES } from "@/modules/services/data";
import { BLOG_POSTS } from "@/modules/blog/data";
import { count, eq, like } from "drizzle-orm";

export const VERIFIED_PORTFOLIO_PROJECTS = [
  {
    id: "prj_01",
    slug: "unique-store-bd",
    title: "Unique Store BD",
    category: "E-commerce Platform",
    badge: "Live Platform",
    projectType: "Founder-owned Product",
    overview:
      "An e-commerce platform designed to manage products, orders, customer experiences, and digital commerce operations for customers in Bangladesh. Architected as a single-store, single-database application with automated encrypted backups.",
    metrics: [
      { label: "Architecture", value: "Single-store D1" },
      { label: "Checkout", value: "1-Page Flow" },
      { label: "Backups", value: "Encrypted R2" },
      { label: "Status", value: "Live / Operational" },
    ],
    stack: [
      "Next.js 16 (App Router)",
      "React 19",
      "TypeScript",
      "Drizzle ORM",
      "Cloudflare D1 (SQLite)",
      "Tailwind CSS v4",
      "Base UI",
      "Shadcn UI",
    ],
    deliverables: [
      "Comprehensive digital product catalog with fast category filtering and search",
      "Frictionless single-page mobile checkout workflow tailored for local shoppers",
      "Administrative dashboard for order management, customer records, and coupon rules",
      "Automated off-site database backups with age-encryption to Cloudflare R2",
    ],
    linkUrl: "https://uniquestorebd.com",
    linkText: "View Project",
    isFeatured: true,
    sortOrder: 1,
    isPublished: true,
  },
  {
    id: "prj_02",
    slug: "searcher-bot-premium",
    title: "Searcher BOT Premium & DLM Engine",
    category: "Search Engine & Developer Utility",
    badge: "In Development",
    projectType: "Software Tool / Search Engine",
    overview:
      "A high-performance authorized record search and automated download management system engineered with Rust-based Tantivy indexing, zero server-side result persistence, and sub-50ms query processing.",
    metrics: [
      { label: "Search Engine", value: "Rust Tantivy" },
      { label: "P99 Latency", value: "< 50ms" },
      { label: "Persistence", value: "Zero Disk Save" },
      { label: "Database", value: "PostgreSQL 18" },
    ],
    stack: [
      "Next.js 16",
      "FastAPI (Python 3.12)",
      "Tantivy 0.22+ (Rust)",
      "PostgreSQL 18",
      "Redis 7.4",
      "Docker Compose",
    ],
    deliverables: [
      "Rust-based Tantivy memory-mapped inverted index delivering sub-50ms query response",
      "Zero server-side search result persistence architecture with direct client memory streaming",
      "Multi-source asynchronous download queue and stream manager with automated verification",
    ],
    linkUrl: "/portfolio",
    linkText: "Technical Overview",
    isFeatured: true,
    sortOrder: 2,
    isPublished: true,
  },
  {
    id: "prj_03",
    slug: "all-in-one-shop",
    title: "All In One Shop (AIO)",
    category: "E-commerce & Telegram Platform",
    badge: "Prototype",
    projectType: "Founder-owned Platform",
    overview:
      "An integrated commerce platform combining a modern web storefront with an automated Telegram bot through a shared backend architecture and centralized PostgreSQL database.",
    metrics: [
      { label: "Channels", value: "Web + Telegram" },
      { label: "Database", value: "PostgreSQL 16" },
      { label: "Deployment", value: "Docker / Dokploy" },
      { label: "Status", value: "In Development" },
    ],
    stack: [
      "Next.js 16",
      "Python Telegram Bot",
      "PostgreSQL 16",
      "Docker Compose",
      "Tailwind CSS v4",
    ],
    deliverables: [
      "Centralized product catalog and order processing synchronized across web and Telegram",
      "Asynchronous Telegram bot customer workflows for order placement and status updates",
      "Containerized deployment environment with persistent storage and backup planning",
    ],
    linkUrl: "/portfolio",
    linkText: "Architecture Details",
    isFeatured: true,
    sortOrder: 3,
    isPublished: true,
  },
  {
    id: "prj_04",
    slug: "multi-domain-checker",
    title: "Multi-Domain Checker Platform",
    category: "Developer Utility & Audit Suite",
    badge: "Prototype",
    projectType: "Software Tool / Developer Utility",
    overview:
      "An engineering-focused platform designed for structured domain auditing, multi-target batch processing, and secure administration with role-based access control.",
    metrics: [
      { label: "Framework", value: "FastAPI / Python" },
      { label: "Audit Suite", value: "v3.0 Suite" },
      { label: "Processing", value: "Batch Async" },
      { label: "Access Control", value: "Strict RBAC" },
    ],
    stack: [
      "Python 3.12",
      "FastAPI",
      "Docker",
      "Pytest",
      "React",
      "SQLite / Supabase",
    ],
    deliverables: [
      "Multi-target batch processing workflows with strict upload verification and record limits",
      "Comprehensive audit logging, role-based access control, and sensitive data redaction",
      "Tested asynchronous auditing pipeline delivering structured output and status reports",
    ],
    linkUrl: "/portfolio",
    linkText: "Technical Overview",
    isFeatured: true,
    sortOrder: 4,
    isPublished: true,
  },
  {
    id: "prj_05",
    slug: "pro-access-shop",
    title: "Pro Access Shop",
    category: "Digital Products & Online Store",
    badge: "Prototype",
    projectType: "Online Store / Digital Products",
    overview:
      "An online store platform focused on digital product delivery, automated account workflows, and responsive shopping experiences with real-time state synchronization.",
    metrics: [
      { label: "Domain", value: "proaccess.shop" },
      { label: "Stack", value: "Next.js + Mongo" },
      { label: "Realtime", value: "Pusher Sockets" },
      { label: "Status", value: "In Development" },
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "MongoDB (Mongoose)",
      "NextAuth",
      "Tailwind CSS v4",
      "Pusher",
    ],
    deliverables: [
      "Digital product fulfillment workflow and instant customer transaction notifications",
      "Real-time state synchronization via Pusher WebSockets for live status updates",
      "Clean administrative catalog and order management dashboard",
    ],
    linkUrl: "/portfolio",
    linkText: "Product Overview",
    isFeatured: false,
    sortOrder: 5,
    isPublished: true,
  },
  {
    id: "prj_06",
    slug: "pro-access-movie",
    title: "Pro Access Movie",
    category: "Media Web Platform",
    badge: "Prototype",
    projectType: "Experimental Media Project",
    overview:
      "A media-focused web platform project designed around content discovery, organized browsing, and a modern streaming-style user experience.",
    metrics: [
      { label: "Interface", value: "Streaming UX" },
      { label: "Backend", value: "Supabase" },
      { label: "Framework", value: "Next.js App Router" },
      { label: "Status", value: "In Development" },
    ],
    stack: [
      "Next.js App Router",
      "Supabase",
      "Tailwind CSS",
      "TypeScript",
    ],
    deliverables: [
      "Media catalog exploration interface with category filtering and fast search",
      "Modern responsive streaming-style video presentation layout with adaptive controls",
    ],
    linkUrl: "/portfolio",
    linkText: "Interface Overview",
    isFeatured: false,
    sortOrder: 6,
    isPublished: true,
  },
  {
    id: "prj_07",
    slug: "dropshopnn-os",
    title: "DropshopNN Enterprise Commerce OS",
    category: "Commerce Software Architecture",
    badge: "Architecture Concept",
    projectType: "Product Architecture Blueprint",
    overview:
      "A commerce operating system concept focused on managing multi-channel product operations, inventory workflows, and digital commerce business administration.",
    metrics: [
      { label: "Architecture", value: "Modular Monolith" },
      { label: "Scope", value: "Multi-channel OS" },
      { label: "Inventory", value: "Centralized Sync" },
      { label: "Status", value: "Conceptual Design" },
    ],
    stack: [
      "Distributed System Blueprint",
      "Modular Microservices",
      "High-throughput Relational DB",
    ],
    deliverables: [
      "Architectural blueprints for high-volume catalog processing and multi-vendor models",
      "Order lifecycle state machines and centralized multi-warehouse inventory sync",
      "Enterprise multi-feature commerce workflow and audit specifications",
    ],
    linkUrl: "/portfolio",
    linkText: "Blueprint Summary",
    isFeatured: false,
    sortOrder: 7,
    isPublished: true,
  },
];

export const VERIFIED_FAQS = [
  {
    id: "faq_01",
    category: "Project Scoping & Quotations",
    question: "How do you scope projects and determine costs?",
    answer:
      "For productized offerings—such as our Landing Page with Meta Pixel, Complete E-commerce Website, and Maintenance Retainers—we provide defined deliverables and transparent fixed pricing tiers. For custom web applications, we analyze your functional and technical requirements upfront to provide a detailed Scope of Work (SOW) and milestone-based quotation before any contract is signed.",
    sortOrder: 1,
  },
  {
    id: "faq_02",
    category: "Project Scoping & Quotations",
    question: "Who writes the code and manages project architecture?",
    answer:
      "All systems are directly architected and engineered by our in-house engineering team under the leadership of Founder & Principal Software Architect Md Parvezul Islam. We do not subcontract client projects to unknown third parties or unverified freelancers.",
    sortOrder: 2,
  },
  {
    id: "faq_03",
    category: "Project Scoping & Quotations",
    question: "How can I track progress during project development?",
    answer:
      "We maintain direct communication via your preferred professional channel (WhatsApp, Slack, or Email) with regular milestone updates. You receive a private staging URL to review live builds and test functionality in real browsers before deployment.",
    sortOrder: 3,
  },
  {
    id: "faq_04",
    category: "Technical Architecture & Performance",
    question: "Why do you build with Next.js and modern edge runtimes instead of generic templates?",
    answer:
      "Traditional template-heavy sites frequently suffer from plugin bloat, slow mobile load times (3–6 seconds), high vulnerability risks, and frequent crashes under traffic spikes. We build clean, modular web platforms with Next.js App Router, React, TypeScript, and edge cloud runtimes that achieve sub-second page loads, tight type-safety, and robust security.",
    sortOrder: 4,
  },
  {
    id: "faq_05",
    category: "Technical Architecture & Performance",
    question: "What is the difference between browser Meta Pixel and server-side Conversions API (CAPI)?",
    answer:
      "Browser Meta Pixel alone misses 20% to 40% of conversion data due to ad-blockers, iOS privacy protections, and unstable mobile connections. Our dual-layer solution dispatches matching unique Event IDs from both the client browser and the edge server. Meta deduplicates matching events, giving your ad campaigns accurate data, better audience targeting, and lower cost-per-acquisition.",
    sortOrder: 5,
  },
  {
    id: "faq_06",
    category: "E-commerce & Payment Gateways",
    question: "Which payment gateways do you integrate for online stores?",
    answer:
      "For Bangladesh-focused stores, we integrate direct merchant accounts for bKash PGW, Nagad, and SSLCommerz. For international trade, we support Stripe (credit/debit cards). All funds settle directly into your verified merchant accounts with 0% studio commissions or per-order royalties.",
    sortOrder: 6,
  },
  {
    id: "faq_07",
    category: "Code Ownership & Security",
    question: "Who owns the source code and database upon project completion?",
    answer:
      "You do. Upon final project settlement, 100% of the repository source code, cloud configuration scripts, database schema, and technical documentation are transferred to your organization. Projukti Labs enforces zero vendor lock-in.",
    sortOrder: 7,
  },
  {
    id: "faq_08",
    category: "Maintenance & Technical Support",
    question: "What ongoing support is provided after launch?",
    answer:
      "Every new website and e-commerce project includes a complimentary 14-to-30-day post-launch technical warranty to resolve initial bugs. Afterwards, clients can subscribe to our monthly Maintenance Retainers (Basic Care, Business Care, Priority Care) for ongoing uptime monitoring, security patching, off-site backups, and dedicated developer hours.",
    sortOrder: 8,
  },
];

export const VERIFIED_PAGE_SECTIONS = [
  {
    id: "sec_home_hero",
    pageSlug: "home",
    sectionKey: "hero",
    title: "Build Your Digital Future with Projukti Labs.",
    subtitle:
      "We design and develop modern websites, e-commerce platforms and custom digital solutions that help businesses move forward.",
    content: {
      eyebrow: "PROFESSIONAL DIGITAL SOLUTIONS",
      badge: "PROFESSIONAL DIGITAL SOLUTIONS",
      supportingLine: "From business websites to complete digital commerce solutions.",
      ctaPrimaryText: "Start a Project",
      ctaPrimaryLink: "/get-a-quote",
      ctaSecondaryText: "Explore Our Work",
      ctaSecondaryLink: "/portfolio",
    },
    sortOrder: 1,
  },
  {
    id: "sec_home_intro",
    pageSlug: "home",
    sectionKey: "intro",
    title: "Technology Built Around Your Business.",
    subtitle:
      "Every business has different goals. We focus on understanding your requirements and building digital solutions that fit the way you work.",
    content: {
      pillars: [
        {
          title: "Thoughtful Design",
          description: "Clean, responsive user interfaces that represent your brand properly and feel natural across all devices.",
        },
        {
          title: "Reliable Engineering",
          description: "Built on modern, type-safe foundations like Next.js, React, and structured relational databases for long-term stability.",
        },
        {
          title: "Practical Solutions",
          description: "We focus on solving real operational problems and driving verified business outcomes without unnecessary complexity.",
        },
      ],
    },
    sortOrder: 2,
  },
  {
    id: "sec_home_services",
    pageSlug: "home",
    sectionKey: "services",
    title: "What We Do",
    subtitle: "Practical digital services for businesses, entrepreneurs and growing brands.",
    content: {
      categoriesCount: 3,
    },
    sortOrder: 3,
  },
  {
    id: "sec_home_projects",
    pageSlug: "home",
    sectionKey: "projects",
    title: "Selected Projects",
    subtitle:
      "Explore software products and digital platforms developed through practical engineering and continuous improvement.",
    content: {
      note: "Truthfully categorized with verified ownership, architecture, and live operational status.",
    },
    sortOrder: 4,
  },
  {
    id: "sec_home_why_us",
    pageSlug: "home",
    sectionKey: "why_us",
    title: "Why Work With Us",
    subtitle: "Direct collaboration with senior engineers, clean architecture, and practical digital solutions designed for real business growth.",
    content: {
      reasons: [
        {
          title: "Business-focused development",
          description: "We align software architecture with your business model, customer workflows, and measurable objectives.",
        },
        {
          title: "Modern technology",
          description: "High-performance applications built with Next.js, React, TypeScript, and edge cloud infrastructure.",
        },
        {
          title: "Responsive design",
          description: "Layouts engineered from 320px mobile viewports up to ultrawide desktop screens with zero layout shifts.",
        },
        {
          title: "Practical solutions",
          description: "We prioritize features you actually need, eliminating bloated dependencies and artificial complexity.",
        },
        {
          title: "Clear communication",
          description: "Direct collaboration with the software architect building your project, without agency account managers.",
        },
        {
          title: "Maintainable architecture",
          description: "Clean codebases, type-safe API contracts, and structured databases that your business owns completely.",
        },
      ],
    },
    sortOrder: 5,
  },
  {
    id: "sec_home_process",
    pageSlug: "home",
    sectionKey: "process",
    title: "How We Work",
    subtitle: "A transparent, milestone-driven approach from initial discovery to deployment and ongoing support.",
    content: {
      steps: [
        {
          number: "1",
          name: "Discover",
          description: "Understand your business goals, target audience, technical requirements, and core constraints.",
        },
        {
          number: "2",
          name: "Plan",
          description: "Define scope, deliverable specifications, system architecture, milestones, and transparent timelines.",
        },
        {
          number: "3",
          name: "Design",
          description: "Build clean, intuitive user interfaces and ergonomic mobile experiences that present your offer clearly.",
        },
        {
          number: "4",
          name: "Develop",
          description: "Implement type-safe application code, integrate secure databases, and verify APIs thoroughly.",
        },
        {
          number: "5",
          name: "Deliver",
          description: "Verify cross-browser performance, configure domain hosting, and execute a smooth production launch.",
        },
        {
          number: "6",
          name: "Support",
          description: "Provide agreed warranty support, proactive uptime monitoring, backups, and regular technical maintenance.",
        },
      ],
    },
    sortOrder: 6,
  },
  {
    id: "sec_home_cta",
    pageSlug: "home",
    sectionKey: "cta",
    title: "Have a Project in Mind?",
    subtitle: "Let's discuss your idea and find the right digital solution for your business.",
    content: {
      buttonText: "Discuss Your Project",
      buttonLink: "/get-a-quote",
      secondaryText: "Contact Us",
      secondaryLink: "/contact",
    },
    sortOrder: 7,
  },
];

export const VERIFIED_SITE_SETTINGS = [
  {
    id: "set_general",
    key: "general",
    value: {
      siteName: "Projukti Labs",
      tagline: "Building Digital Solutions. Engineering the Future.",
      description:
        "Projukti Labs is a technology-focused digital solutions studio building modern websites, e-commerce platforms, and practical software solutions.",
      contactEmail: "contact@projuktilabs.tech",
      founder: "Md Parvezul Islam",
      founderRole: "Founder & Principal Software Architect",
      address: "Dhaka, Bangladesh",
      currency: "BDT",
      timezone: "Asia/Dhaka",
      maintenanceMode: false,
    },
  },
  {
    id: "set_seo",
    key: "seo",
    value: {
      titleTemplate: "%s | Projukti Labs",
      defaultTitle: "Projukti Labs | Building Digital Solutions. Engineering the Future.",
      defaultDescription:
        "We design and develop modern websites, e-commerce platforms and custom digital solutions that help businesses move forward.",
      canonicalDomain: "https://projuktilabs.tech",
      ogImage: "/og-image.png",
      enableSitemap: true,
    },
  },
  {
    id: "set_notifications",
    key: "notifications",
    value: {
      emailAlertsEnabled: false,
      adminAlertEmail: "contact@projuktilabs.tech",
      inquiryAlerts: true,
      leadAlerts: true,
    },
  },
];

/**
 * Seeds initial content from codebase into Cloudflare D1 if tables are empty.
 */
export async function seedDatabaseIfEmpty() {
  const db = getDb();

  // 1. Seed Site Settings
  const settingsCount = await db.select({ count: count() }).from(siteSettings);
  if (Number(settingsCount[0]?.count ?? 0) === 0) {
    for (const s of VERIFIED_SITE_SETTINGS) {
      await db
        .insert(siteSettings)
        .values({
          id: s.id,
          key: s.key,
          value: s.value,
          updatedAt: new Date(),
        })
        .onConflictDoNothing();
    }
  }

  // 2. Seed Services and Service Packages
  const servicesCount = await db.select({ count: count() }).from(services);
  if (Number(servicesCount[0]?.count ?? 0) === 0) {
    for (const cat of SERVICE_CATEGORIES) {
      for (const s of cat.services) {
        await db
          .insert(services)
          .values({
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
          })
          .onConflictDoNothing();

        for (const pkg of s.packages) {
          await db
            .insert(servicePackages)
            .values({
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
            })
            .onConflictDoNothing();
        }
      }
    }
  }

  // 3. Seed Blog Posts
  const blogCount = await db.select({ count: count() }).from(blogPosts);
  if (Number(blogCount[0]?.count ?? 0) === 0) {
    for (const post of BLOG_POSTS) {
      await db
        .insert(blogPosts)
        .values({
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
          readTime: `${post.readingTimeMinutes} min read`,
          seoTitle: post.seoTitle ?? post.title,
          seoDescription: post.seoDescription ?? post.excerpt,
          publishedAt: new Date(post.publishedAt),
          createdAt: new Date(post.publishedAt),
          updatedAt: new Date(post.publishedAt),
        })
        .onConflictDoNothing();
    }
  }

  // 4. Seed Portfolio Projects
  const portfolioCount = await db.select({ count: count() }).from(portfolioProjects);
  if (Number(portfolioCount[0]?.count ?? 0) === 0) {
    for (const p of VERIFIED_PORTFOLIO_PROJECTS) {
      await db
        .insert(portfolioProjects)
        .values({
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
          isPublished: p.isPublished,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .onConflictDoNothing();
    }
  }

  // 5. Seed FAQs
  const faqCount = await db.select({ count: count() }).from(faqs);
  if (Number(faqCount[0]?.count ?? 0) === 0) {
    for (const f of VERIFIED_FAQS) {
      await db
        .insert(faqs)
        .values({
          id: f.id,
          category: f.category,
          question: f.question,
          answer: f.answer,
          sortOrder: f.sortOrder,
          isActive: true,
          updatedAt: new Date(),
        })
        .onConflictDoNothing();
    }
  }

  // 6. Seed Page Sections
  const sectionsCount = await db.select({ count: count() }).from(pageSections);
  if (Number(sectionsCount[0]?.count ?? 0) === 0) {
    for (const sec of VERIFIED_PAGE_SECTIONS) {
      await db
        .insert(pageSections)
        .values({
          id: sec.id,
          pageSlug: sec.pageSlug,
          sectionKey: sec.sectionKey,
          title: sec.title,
          subtitle: sec.subtitle,
          content: sec.content,
          isActive: true,
          sortOrder: sec.sortOrder,
          updatedAt: new Date(),
        })
        .onConflictDoNothing();
    }
  }

  return { success: true, message: "Database seeding complete." };
}

/**
 * Synchronizes and updates verified content into Cloudflare D1.
 * Cleans up temporary test artifacts, updates site settings, page sections,
 * services, packages, portfolio projects, and FAQs.
 */
export async function syncCmsContentToDatabase() {
  const db = getDb();

  // 1. Clean up automated test artifacts
  await db.delete(portfolioProjects).where(like(portfolioProjects.id, "prj_test_%"));

  // 2. Upsert Site Settings
  for (const s of VERIFIED_SITE_SETTINGS) {
    const existing = await db.select().from(siteSettings).where(eq(siteSettings.key, s.key)).limit(1);
    if (existing.length > 0) {
      await db.update(siteSettings).set({ value: s.value, updatedAt: new Date() }).where(eq(siteSettings.key, s.key));
    } else {
      await db.insert(siteSettings).values({ id: s.id, key: s.key, value: s.value, updatedAt: new Date() });
    }
  }

  // 3. Upsert Page Sections
  for (const sec of VERIFIED_PAGE_SECTIONS) {
    const existing = await db.select().from(pageSections).where(eq(pageSections.id, sec.id)).limit(1);
    if (existing.length > 0) {
      await db.update(pageSections).set({
        pageSlug: sec.pageSlug,
        sectionKey: sec.sectionKey,
        title: sec.title,
        subtitle: sec.subtitle,
        content: sec.content,
        isActive: true,
        sortOrder: sec.sortOrder,
        updatedAt: new Date(),
      }).where(eq(pageSections.id, sec.id));
    } else {
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
      });
    }
  }

  // 4. Upsert Services & Packages
  for (const cat of SERVICE_CATEGORIES) {
    for (const s of cat.services) {
      const existingService = await db.select().from(services).where(eq(services.id, s.id)).limit(1);
      if (existingService.length > 0) {
        await db.update(services).set({
          slug: s.slug,
          categorySlug: s.categorySlug,
          name: s.name,
          tagline: s.tagline,
          description: s.description,
          isFlagship: s.isFlagship,
          status: cat.status,
          deliverables: s.deliverables,
          exclusions: s.exclusions,
          technicalHighlights: s.technicalHighlights,
          updatedAt: new Date(),
        }).where(eq(services.id, s.id));
      } else {
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
        });
      }

      for (const pkg of s.packages) {
        const existingPkg = await db.select().from(servicePackages).where(eq(servicePackages.id, pkg.id)).limit(1);
        if (existingPkg.length > 0) {
          await db.update(servicePackages).set({
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
            updatedAt: new Date(),
          }).where(eq(servicePackages.id, pkg.id));
        } else {
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
          });
        }
      }
    }
  }

  // 5. Upsert Verified Portfolio Projects
  for (const p of VERIFIED_PORTFOLIO_PROJECTS) {
    const existingPrj = await db.select().from(portfolioProjects).where(eq(portfolioProjects.id, p.id)).limit(1);
    if (existingPrj.length > 0) {
      await db.update(portfolioProjects).set({
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
        isPublished: p.isPublished,
        updatedAt: new Date(),
      }).where(eq(portfolioProjects.id, p.id));
    } else {
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
        isPublished: p.isPublished,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }

  // 6. Upsert Verified FAQs
  for (const f of VERIFIED_FAQS) {
    const existingFaq = await db.select().from(faqs).where(eq(faqs.id, f.id)).limit(1);
    if (existingFaq.length > 0) {
      await db.update(faqs).set({
        category: f.category,
        question: f.question,
        answer: f.answer,
        sortOrder: f.sortOrder,
        isActive: true,
        updatedAt: new Date(),
      }).where(eq(faqs.id, f.id));
    } else {
      await db.insert(faqs).values({
        id: f.id,
        category: f.category,
        question: f.question,
        answer: f.answer,
        sortOrder: f.sortOrder,
        isActive: true,
        updatedAt: new Date(),
      });
    }
  }

  // 7. Upsert Blog Posts
  for (const post of BLOG_POSTS) {
    const existingPost = await db.select().from(blogPosts).where(eq(blogPosts.id, post.id)).limit(1);
    if (existingPost.length > 0) {
      await db.update(blogPosts).set({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        tags: post.tags,
        coverImage: post.coverImage ?? null,
        status: "published",
        isFeatured: post.featured ?? false,
        readTime: `${post.readingTimeMinutes} min read`,
        seoTitle: post.seoTitle ?? post.title,
        seoDescription: post.seoDescription ?? post.excerpt,
        updatedAt: new Date(),
      }).where(eq(blogPosts.id, post.id));
    } else {
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
        readTime: `${post.readingTimeMinutes} min read`,
        seoTitle: post.seoTitle ?? post.title,
        seoDescription: post.seoDescription ?? post.excerpt,
        publishedAt: new Date(post.publishedAt),
        createdAt: new Date(post.publishedAt),
        updatedAt: new Date(post.publishedAt),
      });
    }
  }

  return { success: true, message: "CMS synchronization and content transformation complete." };
}
