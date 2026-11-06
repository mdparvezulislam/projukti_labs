# Projukti Labs (`projuktilabs.tech`)

> **Building Digital Solutions. Engineering the Future.**  
> Premium technology studio engineering ultra-fast web platforms, high-conversion landing pages with verified Meta Pixel tracking, and scalable e-commerce systems for Bangladesh and international clients.

---

## 1. Overview & Launch Scope

Projukti Labs is an independent technology studio and founder portfolio led by **Md Parvezul Islam** (Principal Software Architect). Built as a high-performance modular monolith deployed to the **Cloudflare Workers** edge runtime using **Next.js App Router**, **Vite RSC** (`vinext`), **Tailwind CSS v4**, and **Cloudflare D1** SQLite with **Drizzle ORM**.

### Language & Market Policy:
- **Primary Market:** Bangladesh (`bn-BD`, `Asia/Dhaka`, default currency BDT ৳).
- **Primary Language:** Bangla-First across all public surfaces, with Hind Siliguri typography.
- **English Policy:** Preserved for technical terminology, developer metadata, and concise bilingual action badges.

### Launch Service Verticals (Active):
1. **Web Development & Design (ওয়েব ডেভেলপমেন্ট ও ডিজাইন)** — High-performance, edge-rendered web platforms, corporate websites, and conversion funnels.
   - *Flagship:* **Landing Page with Meta Pixel & Analytics** (`/services/landing-page-meta-pixel`) — Dual browser & server-side Conversions API (CAPI) deduplication, sub-1.2s mobile LCP benchmark target, Meta Events Manager test verified.
2. **E-commerce & Digital Commerce (ই-কমার্স ও ডিজিটাল কমার্স)** — Production-ready digital commerce engines with frictionless checkout and multi-gateway payment processing.
   - *Flagship:* **Complete E-commerce Platform** (`/services/complete-ecommerce-website`) — Native bKash PGW, Nagad, SSLCommerz, and Stripe integration; automated courier parcel dispatch (Steadfast/Pathao); 0% platform revenue commissions.
3. **Maintenance & Technical Support (ওয়েবসাইট মেইনটেন্যান্স ও টেক সাপোর্ট)** — Proactive monthly engineering care and disaster recovery retainers.
   - *Flagship:* **Proactive Care Retainers** (`/services/website-maintenance`) — 4 care tiers (Basic, Business, Priority, Custom) backed by 5-minute health monitoring, weekly automated off-site backups, and guaranteed 1h–48h emergency SLAs.

### Blog Engine & Knowledge Platform (Phase 06):
- Dedicated build-time blog system compatible with Cloudflare Workers runtime (zero runtime Node `fs` dependencies).
- 5 authentic launch articles on web development, e-commerce, digital marketing, website speed, and software maintenance.
- Categories (`/blog/category/[slug]`), Tags (`/blog/tag/[slug]`), and Search (`searchPosts`).
- XML Sitemap (`/sitemap.xml`) and `robots.txt` generation.

---

## 2. Technical Architecture & Stack

| Layer | Technology | Selection Rationale |
| :--- | :--- | :--- |
| **Framework** | Next.js `16.4.5` (App Router) + React `19` | Modern React Server Components, server actions, streaming SSR |
| **Bundler & Edge Compiler** | Vite `8.3.0` + `vinext@1.4.3` + `@cloudflare/vite-plugin` | Sub-second edge builds (~300 KB uncompressed worker bundle) |
| **Runtime Target** | Cloudflare Workers (`workerd`) | Zero cold starts, 300+ edge PoPs worldwide, isolate security |
| **Typography** | `Hind_Siliguri` + `Geist` + `Geist_Mono` + `Caveat` | Natural Bangla glyph rendering with optimal line heights |
| **Styling & Tokens** | Tailwind CSS v4 + PostCSS | Dark-first design tokens, semantic CSS variables, zero runtime CSS bloat |
| **Database & ORM** | Cloudflare D1 (SQLite) + Drizzle ORM `0.45.4` | Edge-local SQL queries, 100% type safety, structured migrations |
| **Object Storage** | Cloudflare R2 + `aws4fetch` | S3-compatible asset storage with signed presigned PUT uploads |
| **Validation** | Zod `4.6.7` | Runtime request body validation with structured error responses |
| **A11y & Testing** | Vitest + Playwright MCP | WCAG 2.1 AA accessible semantics, closed-loop browser verification |

---

## 3. Directory Structure

```text
projukti_labs/
├── app/                                 # Next.js App Router Pages & API Endpoints
│   ├── api/v1/
│   │   ├── health/                      # Edge health check
│   │   ├── inquiries/                   # Public inquiry & quote submission endpoint
│   │   └── poc/                         # Verification POC endpoints
│   ├── about/                           # Studio philosophy & origin story
│   ├── blog/                            # Blog engine routes (listing, article, category, tag)
│   ├── contact/                         # Interactive contact channel & form
│   ├── design-system/                   # Live token & UI primitive preview
│   ├── faq/                             # Categorized business & engineering FAQ
│   ├── founder/                         # Founder manifesto (Md Parvezul Islam)
│   ├── get-a-quote/                     # Structured quotation form with pre-fill support
│   ├── portfolio/                       # Engineering case studies & architectural blueprints
│   ├── services/                        # Service catalog overview
│   │   ├── [slug]/                      # Generic category & standard service detail
│   │   ├── complete-ecommerce-website/  # Flagship E-commerce service page
│   │   ├── landing-page-meta-pixel/     # Flagship Landing Page + Meta CAPI service page
│   │   └── website-maintenance/         # Flagship Maintenance Retainers service page
│   ├── globals.css                      # Design tokens, Hind Siliguri, & dark/light theme
│   ├── layout.tsx                       # Root layout (lang="bn-BD", Hind Siliguri font setup)
│   ├── page.tsx                         # Studio homepage
│   ├── robots.ts                        # Next.js Metadata Route for robots.txt
│   └── sitemap.ts                       # Next.js Metadata Route for sitemap.xml
├── components/
│   ├── blog/                            # MarkdownRenderer & blog UI components
│   ├── forms/                           # Accessible forms (ContactForm, QuoteForm)
│   ├── layout/                          # SiteHeader, SiteFooter, ThemeToggle
│   └── ui/                              # Button, Badge, Card, Input, Textarea, Modal, Accordion
├── db/
│   ├── migrations/                      # Drizzle SQL migration files
│   └── schema/                          # Drizzle schema (poc_records, inquiries, leads, etc.)
├── lib/
│   ├── auth/                            # WebCrypto PBKDF2 password & session utilities
│   ├── cloudflare/                      # Cloudflare R2 presigned URL helpers
│   ├── db/                              # Drizzle D1 database client factory
│   ├── env.ts                           # Zod-validated environment schema & bindings resolver
│   ├── logger.ts                        # Edge structured JSON logger with secret redaction
│   ├── utils.ts                         # cn() and formatting helpers
│   └── validation/                      # API response envelopes & Zod helpers
├── modules/
│   ├── blog/                            # Blog data, Zod schemas, & query helper functions
│   └── services/                        # Strongly-typed service catalog domain module
├── public/
│   └── _headers                         # Production HTTP security headers for Cloudflare
├── tests/
│   ├── integration/                     # Cloudflare Workers integration tests
│   └── unit/                            # Unit tests (crypto, validation, storage, services, blog, api, production)
├── .env.example                         # Environment variables and Cloudflare bindings template
├── DESIGN.md                            # Canonical design tokens & UX specifications
├── wrangler.jsonc                       # Multi-environment Cloudflare Workers configuration
└── cloudflare.config.ts                 # Typed worker & Vite deployment configuration
```

---

## 4. Development & Verification Commands

```bash
# Install dependencies
pnpm install

# Type check (TypeScript)
pnpm typecheck

# Lint with ESLint
pnpm lint

# Run all unit tests (Vitest: 27 tests across 5 suites)
pnpm test

# Verify database schema & migration integrity
pnpm db:check

# Build for Cloudflare Workers (vinext edge bundle)
pnpm run build:vinext

# Preview Cloudflare edge worker bundle locally
pnpm run start:vinext --port 4173
```

---

## 5. Security & Commercial Discipline

- **No Fabricated Information:** Zero fake reviews, fake client logos, or fake price countdowns. Portfolio projects are explicitly labeled as architectural concepts and blueprints.
- **Data Privacy:** Client inquiries and quotes are logged directly into Cloudflare D1 with unique reference codes (`PL-2026-XXXX`).
- **Owner Rights:** Clients receive 100% source code ownership upon project completion with zero vendor lock-in.

---

© 2026 Projukti Labs (`projuktilabs.tech`). All rights reserved.
