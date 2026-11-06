# Projukti Labs (`projuktilabs.tech`)

> **Building Digital Solutions. Engineering the Future.**  
> Premium technology studio engineering ultra-fast web platforms, high-conversion landing pages with verified Meta Pixel tracking, and scalable e-commerce systems for Bangladesh and international clients.

---

## 1. Overview & Launch Scope

Projukti Labs is an independent technology studio and founder portfolio led by **Md Parvezul Islam** (Principal Software Architect). Built as a high-performance modular monolith deployed to the **Cloudflare Workers** edge runtime using **Next.js App Router**, **Vite RSC** (`vinext`), **Tailwind CSS v4**, and **Cloudflare D1** SQLite with **Drizzle ORM**.

### Launch Service Verticals (Active):
1. **Web Development & Design** — High-performance, edge-rendered web platforms, corporate websites, and conversion funnels.
   - *Flagship:* **Landing Page with Meta Pixel & Analytics** (`/services/landing-page-meta-pixel`) — Dual browser & server-side Conversions API (CAPI) deduplication, sub-1.2s mobile LCP, Meta Events Manager verified.
2. **E-commerce & Digital Commerce** — Production-ready digital commerce engines with frictionless checkout and multi-gateway payment processing.
   - *Flagship:* **Complete E-commerce Platform** (`/services/complete-ecommerce-website`) — Native bKash PGW, Nagad, SSLCommerz, and Stripe integration; automated courier parcel dispatch (Steadfast/Pathao); 0% platform revenue commissions.
3. **Maintenance & Technical Support** — Proactive monthly engineering care and disaster recovery retainers.
   - *Flagship:* **Proactive Care Retainers** (`/services/website-maintenance`) — 4 care tiers (Basic, Business, Priority, Custom) backed by 5-minute health monitoring, weekly automated off-site backups, and guaranteed 1h–48h emergency SLAs.

### Future Expansion Verticals (In Pipeline / Coming Soon):
- Custom Software & SaaS Development
- AI Integrations & Automated Workflows
- Cross-Platform Mobile Applications
- UI/UX Design Systems & Discovery
- Cloud Infrastructure & Edge DevOps
- API Architecture & Microservice Integration
- Advanced Technical SEO & Business Analytics

---

## 2. Technical Architecture & Stack

| Layer | Technology | Selection Rationale |
| :--- | :--- | :--- |
| **Framework** | Next.js `16.4.5` (App Router) + React `19` | Modern React Server Components, server actions, streaming SSR |
| **Bundler & Edge Compiler** | Vite `8.3.0` + `vinext@1.4.3` + `@cloudflare/vite-plugin` | Sub-second edge builds (~300 KB uncompressed worker bundle) |
| **Runtime Target** | Cloudflare Workers (`workerd`) | Zero cold starts, 300+ edge PoPs worldwide, isolate security |
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
│   ├── contact/                         # Interactive contact channel & form
│   ├── design-system/                   # Live token & UI primitive preview
│   ├── faq/                             # Categorized business & engineering FAQ
│   ├── founder/                         # Founder manifesto (Md Parvezul Islam)
│   ├── get-a-quote/                     # Structured quotation form with pre-fill support
│   ├── portfolio/                       # Engineering case studies & architectural builds
│   ├── services/                        # Service catalog overview
│   │   ├── [slug]/                      # Generic category & standard service detail
│   │   ├── complete-ecommerce-website/  # Flagship E-commerce service page
│   │   ├── landing-page-meta-pixel/     # Flagship Landing Page + Meta CAPI service page
│   │   └── website-maintenance/         # Flagship Maintenance Retainers service page
│   ├── globals.css                      # Design tokens & dark/light theme variables
│   ├── layout.tsx                       # Root layout with SiteHeader & SiteFooter
│   └── page.tsx                         # Studio homepage
├── components/
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
│   ├── utils.ts                         # cn() and formatting helpers
│   └── validation/                      # API response envelopes & Zod helpers
├── modules/
│   └── services/                        # Strongly-typed service catalog domain module
├── tests/
│   ├── integration/                     # Cloudflare Workers integration tests
│   └── unit/                            # Unit tests (crypto, validation, storage, services)
├── DESIGN.md                            # Canonical design tokens & UX specifications
├── wrangler.jsonc                       # Local simulation & Cloudflare bindings config
└── cloudflare.config.ts                 # Typed worker & Vite deployment configuration
```

---

## 4. Development & Verification Commands

```bash
# Install dependencies
pnpm install

# Type check
pnpm typecheck

# Lint with ESLint
pnpm lint

# Run unit tests
pnpm test

# Build for Cloudflare Workers (vinext edge bundle)
pnpm run build:vinext

# Preview Cloudflare edge worker bundle locally
pnpm run start:vinext --port 4173
```

---

## 5. Security & Commercial Discipline

- **No Fabricated Information:** Zero fake reviews, fake client logos, or fake price countdowns.
- **Data Privacy:** Client inquiries and quotes are logged directly into Cloudflare D1 with unique reference codes (`PL-2026-XXXX`).
- **Owner Rights:** Clients receive 100% source code ownership upon project completion with zero vendor lock-in.

---

© 2026 Projukti Labs (`projuktilabs.tech`). All rights reserved.
