# Projukti Labs — Project Master Specification (`PROJECT.md`)

**Repository:** `projukti-labs`  
**Domain:** `projuktilabs.tech`  
**Founder:** Md Parvezul Islam (Principal Software Architect)  
**Tagline:** Building Digital Solutions. Engineering the Future.  
**Baseline Version:** v1.6 Production Release Candidate (Phase 01–16 Complete — Admin Operating System, Real CMS Workflows, Business Operations & Production Readiness Verified)  
**Primary Target Market:** Bangladesh (`bn-BD`, `Asia/Dhaka`, default currency BDT ৳)  
**Language Policy:** Bangla-First / Bangla-Primary with selective English technical terms  

---

## 1. Project Positioning & Vision

Projukti Labs is an independent, premium technology studio and software engineering consultancy. It combines:
1. **Bangladesh-First Engineering Leadership:** Built ground-up for Bangladeshi enterprises, DTC brands, and startups, with secondary international client support. Communication, conversion funnels, and pricing are optimized for Bangladesh.
2. **Founder-Led Software Architecture:** Directed by **Md Parvezul Islam**, Principal Software Architect, providing hands-on technical governance over code reviews, schema migrations, and performance profiling without intermediary account managers.
3. **Productized Development Offerings:** Fixed-price, transparently scoped packages with clear deliverables, technical SLAs, and zero hidden platform royalties or per-sale commissions.
4. **Engineering Integrity:** Eliminating fragile agency templates (e.g. 60-plugin WordPress installations) in favor of high-availability, edge-rendered applications built on Next.js App Router and Cloudflare Workers.
5. **Dual-Market Infrastructure:** Deep native support for Bangladesh's commerce ecosystem (bKash PGW, Nagad, SSLCommerz, Pathao/Steadfast courier APIs) alongside international standards (Stripe, SWIFT, GDPR compliance, WCAG 2.1 AA).

---

## 2. Mandatory Language & Typography Policy

1. **Bangla-Primary Rule:** All public customer-facing surfaces (Homepage, About, Services, Flagship Solutions, Portfolio, Blog, FAQ, Contact, and Quotation) are written in natural, modern, professional Bangla.
2. **Selective English Terms:** English is preserved where natural for tech terms, industry abbreviations, and short bilingual badges (e.g., "Web Development", "E-commerce", "Meta Pixel & CAPI", "Next.js", "Get a Quote", "Cloudflare Workers").
3. **Mandatory Typography Hierarchy:**
   - **Primary Font (Bangla):** **Hind Siliguri** (`weights: 300, 400, 500, 600, 700`, subsets: `bengali, latin`). Configured via `next/font/google` with `display: swap`.
   - **Latin Secondary:** `Geist Sans`.
   - **Code & Metadata:** `Geist Mono`.
   - **Decorative Accents:** `Caveat`.
4. **Locale Settings:** `html lang="bn-BD"`, OpenGraph `locale: "bn_BD"`, timezone `Asia/Dhaka`, default currency `BDT` (৳).

---

## 3. Commercial Scope & Service Catalog

### Active Launch Verticals (3 Verticals Only):
- **01. Web Development & Design (ওয়েব ডেভেলপমেন্ট ও ডিজাইন)**
  - Flagship: *Landing Page with Meta Pixel & Analytics* (`/services/landing-page-meta-pixel`)
  - Standard: *Corporate & Studio Web Platform* (`/services/corporate-website`)
- **02. E-commerce & Digital Commerce (ই-কমার্স ও ডিজিটাল কমার্স)**
  - Flagship: *Complete Production-Ready E-commerce Platform* (`/services/complete-ecommerce-website`)
  - Standard: *Headless Storefront & Catalog Solution* (`/services/headless-commerce`)
- **03. Maintenance & Technical Support (ওয়েবসাইট মেইনটেন্যান্স ও টেক সাপোর্ট)**
  - Flagship: *Proactive Website Maintenance & Technical Retainer* (`/services/website-maintenance`)
  - Standard: *Performance & Security Hardening Audit* (`/services/speed-security-audit`)

### Strategic Future Pipeline (Strictly Research / Coming Soon):
1. Custom Software & SaaS Development
2. AI Integrations & Automated Workflows
3. Cross-Platform Mobile Applications
4. UI/UX Design Systems & Product Discovery
5. Cloud Infrastructure & Edge DevOps
6. API Architecture & Microservice Integration
7. Advanced Technical SEO & Business Analytics

---

## 4. Phase 06 — Blog Engine & Content Architecture

1. **Runtime Isolation & Edge Compatibility:** In Cloudflare Workers (`workerd`), Node.js `fs.readFileSync` is unavailable at request time. The blog system houses typed articles in `modules/blog/data.ts` and parses Markdown using safe React AST components (`components/blog/markdown-renderer.tsx`) without runtime Node `fs` or `dangerouslySetInnerHTML`.
2. **Authentic Launch Articles (5 Articles):**
   - `why-business-needs-professional-website` (Featured)
   - `how-ecommerce-works-in-bangladesh`
   - `website-speed-and-core-web-vitals-guide`
   - `meta-pixel-and-conversion-tracking-explained`
   - `why-website-maintenance-is-essential`
3. **Taxonomy & Discovery:**
   - 5 Categories: `web-development`, `ecommerce`, `digital-marketing`, `website-performance`, `business-tech`.
   - Tag filtering (`/blog/tag/[slug]`) and Category filtering (`/blog/category/[slug]`).
   - JSON-LD `Article` structured data and OpenGraph `article` metadata on all post pages.
   - Integrated into XML sitemap (`/sitemap.xml`) and `robots.txt`.

---

## 5. Commercial Claim & Business Integrity Standard

1. **Portfolio Anti-Hallucination Policy:** Portfolio entries are explicitly labeled as *"আর্কিটেকচারাল কনসেপ্ট ও কারিগরি ব্লুপ্রিন্ট" (Architectural Concepts & Blueprints)* or Projukti Labs' own live engine architecture, preventing fabricated client claims.
2. **Performance Benchmarks:** `<1.2s LCP`, telemetry, and SLA response times are framed as engineering benchmark targets and care tier options rather than blanket unconditional guarantees.
3. **Integration Reality:** Meta CAPI and payment gateway integrations are implemented directly on clients' verified Business Manager and merchant accounts.
4. **Zero Studio Royalty:** The studio charges 0% ongoing sales commission on client e-commerce stores (third-party payment gateway fees are settled directly with providers).

---

## 6. Phase 07 — Production Readiness, Security Hardening & Cloudflare Deployment Preparation

1. **Environment & Configuration Hardening:**
   - Strict runtime configuration schema via Zod (`lib/env.ts`) distinguishing `development`, `preview`, and `production`.
   - `.env.example` committed to repository with all public configuration keys and deployment secrets template.
   - `wrangler.jsonc` configured with distinct environments (`preview`, `production`) specifying bindings and custom domain routes (`projuktilabs.tech/*`).
2. **Application Security & Hardening:**
   - **Inquiry API Security (`/api/v1/inquiries`):** Strict JSON Content-Type validation (415), 64 KB maximum payload limit (413), silent honeypot bot trap (`website_url`), 15-second duplicate submission rejection (429), WebCrypto SHA-256 IP anonymization, and sanitized database error reporting.
   - **Enterprise Security Headers:** Configured in `next.config.ts` and `public/_headers` (strict Content Security Policy, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, `Strict-Transport-Security`).
3. **Observability & Health Checks:**
   - Structured JSON logging (`lib/logger.ts`) with automatic credential redaction (`token`, `password`, `secret`, `authorization`, `cookie`, `creditcard`).
   - Hardened `/api/v1/health` endpoint returning system status, isolate runtime (`workerd`), dependency health (D1, R2, KV), and environment without credential leakage.
4. **Cloudflare Deployment & Domain Onboarding Playbook:**
   - Production Worker: `projukti-labs-web`.
   - Authoritative Production Database: Cloudflare D1 `projukti_labs_db` via Drizzle ORM (`pnpm db:check` verified).
   - Domain delegation for `projuktilabs.tech`: Cloudflare Zone, Full (Strict) SSL/TLS, Minimum TLS 1.2, HSTS, Apex `@` and `www` custom domain routing.
   - Disaster recovery: Automated D1 point-in-time recovery, scheduled JSON exports, and zero-downtime rollback workflow (`wrangler rollback`).
5. **Production Action Boundary Compliance:**
   - All Phase 07 implementation and validation performed locally.
   - Strictly NO remote Cloudflare deployments, NO remote DNS modifications, and NO cloud database mutations executed without explicit founder authorization.

---

## 7. Phases 08–12 — Complete Admin Operating System

1. **Mission & Operating Architecture:**
   - Transformed Projukti Labs into a database-driven business platform powered solely by Cloudflare D1 + Drizzle ORM.
   - Comprehensive Admin Panel (`/admin`) allowing the founder to manage website content, inbound inquiries, CRM pipeline, quotations, customers, and business automation workflows.
2. **Authoritative Database & CMS Integration:**
   - 21 D1 entities across Authentication, CMS, CRM, and Business Automation (`0002_slippery_firedrake.sql`).
   - Dynamic public website pages (Homepage, FAQ, Portfolio, Services, Blog) dynamically query D1 with immediate code fallback.
3. **Enterprise CRM & Sales Operations:**
   - Inquiry lifecycle progression (`new` → `contacted` → `qualified` → `proposal_sent` → `won` → `lost` → `spam`).
   - Quotation generator emitting standardized numbering (`PL-Q-2026-XXXX`) with line items, tax/discounts, and customer linking.
   - Centralized customer profiles (`cst_...`) with lifetime deal and quotation tracking.
4. **Event-Driven Business Automation:**
   - Automated event triggers on inquiry creation, lead stage change, quote generation, and scheduled publishing.
   - In-app notification center with real-time counters and execution logs (`automationRuns`) with retry capabilities.
5. **Mobile-App-Like Ergonomics (<768px):**
   - 5-tab sticky bottom navigation bar, 48px touch targets, zero horizontal scrollbar overflow, and high information density.

---

## 8. Implementation Status Matrix

| Phase | Milestone | Status | Verified Gates |
|---|---|---|---|
| **Phase 01** | Technical Planning & Architecture | **DONE** | Documentation complete |
| **Phase 02** | Cloudflare Workers Runtime POC | **DONE** | D1, KV, RSC edge verification |
| **Phase 03** | Dark-First Design System | **DONE** | Hind Siliguri, Tailwind v4, WCAG AA |
| **Phase 04** | Core Public Website Pages | **DONE** | Home, About, Founder, FAQ, Contact, Quote |
| **Phase 05** | Productized Services & Inquiry Routing | **DONE** | 3 Flagships, D1 lead tracking |
| **Phase 06** | Bangla-First Upgrade & Blog Engine | **DONE** | 5 articles, SSR edge bundle, Playwright QA |
| **Phase 07** | Production Readiness & Security Hardening | **DONE** | 27 tests passing, headers, D1 check, edge build |
| **Phase 08** | Authentication, Sessions & RBAC | **DONE** | WebCrypto PBKDF2, HttpOnly cookie, audit logs |
| **Phase 09** | Authoritative D1 CMS Architecture | **DONE** | 21 D1 tables, D1 seed, public-CMS bridge |
| **Phase 10** | CRM & Customer Operations Engine | **DONE** | Inquiries, leads, quotes (PL-Q-2026-XXXX), customers |
| **Phase 11** | Business Automation & Notifications | **DONE** | Event bus, rules runner, execution retry |
| **Phase 12** | Admin UI/UX & Mobile Operating System | **DONE** | 18 APIs, 12 views, 5-tab mobile nav, 43 tests |
