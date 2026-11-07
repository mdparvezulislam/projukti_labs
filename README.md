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

### Blog Engine & Professional Publishing Studio (Phases 06 & 17):
- **Professional Editorial Studio (`/admin/content/blog`):** Modern two-column writing studio inspired by WordPress/Ghost/Shopify editorial workspaces.
- **Advanced Rich Text Editor:** Visual editing, HTML Source code mode, Markdown mode, bidirectional sync, paste interceptor, tables, code blocks, blockquotes, checklists, and keyboard shortcuts.
- **Deterministic Smart Content Extraction:** "Analyze Content" engine extracts title candidates, clean URL slugs, excerpts, H2–H4 Table of Contents, word counts, reading times, category suggestions, and suggested tags.
- **Advanced SEO Control Center:** Live Google Search snippet simulation, OpenGraph / Facebook card and Twitter / X social previews, canonical URLs, robots index/follow toggles, and rule-based SEO quality audit.
- **Featured Image & Media Management:** Dual input (Image URL + File upload with MIME/size validation), truthful R2 storage binding check, alt text, and media library picker.
- **Autosave & Revisions:** 3-second debounced autosave preventing D1 write spam, version-aware post revisions (`blog_post_revisions`), and draft/publish workflows.
- **Public Blog Rendering (`/blog`, `/blog/[slug]`):** Dual-format renderer supporting both Markdown and sanitized HTML, responsive tables, styled code snippets, breadcrumbs, TOC, and schema.org JSON-LD structured data.

### Complete Admin Operating System & Real CMS Workflows (Phases 08–16):
- **Full-featured Admin Portal (`/admin`):** Secure dashboard managing CRM leads, structured quotes (`PL-Q-2026-XXXX`), customer records, dynamic CMS content, internal team notes, and automated business workflows.
- **Dynamic Multi-Section CMS & Package Pricing:** All 5 core homepage sections and service package pricing tiers (BDT/USD) can be edited in real time, persisting to Cloudflare D1 and immediately updating public website pages.
- **Authoritative Database & CMS Integration:** 21 entities managed via Cloudflare D1 and Drizzle ORM. Public website reads dynamic content with immediate fallback to code definitions.
- **Mobile-App-Like Ergonomics (<768px):** 5-tab sticky bottom navigation (`admin-mobile-nav.tsx`), 48px touch targets, compact header with notification alerts, and zero horizontal scrollbar overflow.
- **Event-Driven Automation Engine:** Trigger workflows on inquiry creation, lead progression, quote generation, and scheduled publishing, backed by execution logging and retry handling.

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
│   ├── admin/                           # Complete Admin Panel (Dashboard, CRM, Content, System)
│   ├── api/
│   │   ├── admin/                       # 18 Admin REST Endpoints (Auth, CMS, CRM, Automations)
│   │   └── v1/                          # Public APIs (health, inquiries, poc)
│   ├── about/                           # Studio philosophy & origin story
│   ├── blog/                            # Blog engine routes (listing, article, category, tag)
│   ├── contact/                         # Interactive contact channel & form
│   ├── design-system/                   # Live token & UI primitive preview
│   ├── faq/                             # Categorized business & engineering FAQ (D1 dynamic)
│   ├── founder/                         # Founder manifesto (Md Parvezul Islam)
│   ├── get-a-quote/                     # Structured quotation form with pre-fill support
│   ├── portfolio/                       # Engineering case studies & architectural blueprints
│   ├── services/                        # Service catalog overview & details
│   ├── globals.css                      # Design tokens, Hind Siliguri, & dark/light theme
│   ├── layout.tsx                       # Root layout (lang="bn-BD", Hind Siliguri font setup)
│   ├── page.tsx                         # Studio homepage (D1 dynamic hero)
│   ├── robots.ts                        # Next.js Metadata Route for robots.txt
│   └── sitemap.ts                       # Next.js Metadata Route for sitemap.xml
├── components/
│   ├── admin/                           # Admin Shell, 5-tab Mobile Nav, Sidebar, Header
│   ├── blog/                            # MarkdownRenderer & blog UI components
│   ├── forms/                           # Accessible forms (ContactForm, QuoteForm)
│   ├── layout/                          # SiteHeader, SiteFooter, ThemeToggle
│   └── ui/                              # Button, Badge, Card, Input, Textarea, Modal, Accordion
├── db/
│   ├── migrations/                      # Drizzle SQL migration files (0000, 0001, 0002)
│   └── schema/                          # 21 authoritative entities (Auth, CMS, CRM, Automation)
├── lib/
│   ├── auth/                            # WebCrypto PBKDF2 hashing, sessions, RBAC, bootstrap
│   ├── automation/                      # Event bus, rule runner, execution history & notifications
│   ├── cloudflare/                      # Cloudflare R2 presigned URL helpers
│   ├── cms/                             # CMS data bridge, dynamic queries & seeders
│   ├── crm/                             # CRM engine (leads, quotes, customers, notes, metrics)
│   ├── db/                              # Universal D1 client + Node 22 sqlite fallback shim
│   ├── env.ts                           # Zod-validated environment schema & bindings resolver
│   ├── logger.ts                        # Edge structured JSON logger with secret redaction
│   ├── utils.ts                         # cn() and formatting helpers
│   └── validation/                      # API response envelopes & Zod helpers
├── modules/
│   ├── blog/                            # Blog data, Zod schemas, & query helper functions
│   └── services/                        # Strongly-typed service catalog domain module
├── public/
│   └── _headers                         # Production HTTP security headers for Cloudflare
├── scripts/
│   └── bootstrap-owner.ts               # CLI owner initialization script
├── tests/
│   ├── integration/                     # Cloudflare Workers integration tests
│   └── unit/                            # 43 unit tests across 6 test suites
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

# Run all unit tests (Vitest: 43 tests across 6 suites)
pnpm test

# Verify database schema & migration integrity
pnpm db:check

# Bootstrap initial Admin Owner account (interactive / scripted)
pnpm admin:bootstrap

# Build for Cloudflare Workers (vinext edge bundle)
pnpm run build:vinext

# Preview Cloudflare edge worker bundle locally
pnpm run start:vinext --port 4173

# Deploy directly to Cloudflare Workers production
pnpm run deploy:vinext
```

---

## 5. Cloudflare Production Infrastructure

The Projukti Labs production environment is deployed and active on Cloudflare Workers:

| Resource | Value |
| :--- | :--- |
| **Production Domain** | [`https://projuktilabs.tech`](https://projuktilabs.tech) (Canonical Root Host) |
| **WWW Subdomain** | [`https://www.projuktilabs.tech`](https://www.projuktilabs.tech) (Permanent HTTP 308 Redirect via `proxy.ts`) |
| **Worker Direct URL** | [`https://projukti-labs-web.uniquestorebd23.workers.dev`](https://projukti-labs-web.uniquestorebd23.workers.dev) |
| **Cloudflare Worker** | `projukti-labs-web` (workerd edge runtime, version `69dadb7e-06de-41be-805b-2dfbe35c9ea6`) |
| **Cloudflare Account ID** | `c4338616aa08d7d524b19d64519efd7f` |
| **Zone ID** | `8f389288b4ebe4fb74da7f8ed7d9d55a` (`projuktilabs.tech`) |
| **Nameservers** | `jade.ns.cloudflare.com`, `miles.ns.cloudflare.com` |
| **Production Database** | Cloudflare D1: `projukti-labs-production` (`8b1097c3-c930-477f-b8bc-81a498ac0f41`) — 25 Tables |
| **Database Binding** | `env.DB` |
| **KV Cache Namespace** | `4c3a552b441e491c8d781f198bbb4316` (`VINEXT_KV_CACHE` & `KV_CACHE`) |
| **R2 Storage Bucket** | `projukti-labs-assets` (`env.R2_BUCKET`), served via `/api/media/[...key]` |
| **Cron Trigger** | `schedule: * * * * *` (Native Cloudflare Cron publishing engine) |
| **Health Check Endpoint** | [`https://projuktilabs.tech/api/v1/health`](https://projuktilabs.tech/api/v1/health) |

### Remote Database Backup Command:
```bash
pnpm exec wrangler d1 export projukti-labs-production --remote --output backups/d1-backup-$(date +%Y%m%d%H%M%S).sql
```

### Live Worker Real-Time Logs:
```bash
pnpm exec wrangler tail projukti-labs-web
```

### Applying Remote D1 Migrations:
```bash
pnpm exec wrangler d1 migrations apply projukti-labs-production --remote
```

### Seeding or Syncing CMS Data to Remote Production D1:
```bash
pnpm exec wrangler d1 execute projukti-labs-production --remote --file=db/seed-production-cms.sql
```

### Production Deployment Command:
```bash
pnpm run deploy:vinext
```

---

## 6. Security & Commercial Discipline

- **No Fabricated Information:** Zero fake reviews, fake client logos, or fake price countdowns. Portfolio projects are explicitly labeled as architectural concepts and blueprints.
- **Data Privacy:** Client inquiries and quotes are logged directly into Cloudflare D1 with unique reference codes (`PL-2026-XXXX`).
- **Owner Rights:** Clients receive 100% source code ownership upon project completion with zero vendor lock-in.

---

© 2026 Projukti Labs (`projuktilabs.tech`). All rights reserved.
