# 02 — Requirements and Scope Specification

**Project:** Projukti Labs (`projuktilabs.tech`)  
**Version:** 1.0 (Locked Baseline)  
**Date:** 2026-11-06  

---

## 1. Business Positioning & Dual Identity

Projukti Labs operates under a unified brand (`Projukti Labs — Building Digital Solutions. Engineering the Future.`) that serves two complementary roles without confusing visitors:
1. **Premium Digital Technology Studio & Agency** — Productized web, e-commerce, and maintenance solutions for Bangladesh and international clients.
2. **Founder-Led Technical Portfolio** — Dedicated `/founder` profile highlighting Md Parvezul Islam's engineering expertise, architecture leadership, and selected case studies.

---

## 2. Service Scope Architecture

A core strategic decision of Master Blueprint v1.0 is the strict separation between **Service Categories** (domain classification) and **Productized Services** (ready-to-buy client solutions with dedicated conversion landing pages).

### 2.1 Active Launch Service Categories (v1.0)

Only **three (3)** service categories are active at launch:

#### Category 01: Web Development & Design (`active`)
- **Core Offerings:** Business Website, Corporate Multi-page Website, Personal Portfolio Website, Conversion-focused Landing Page, Custom Website Development, Website Redesign, Admin-managed CMS Website, Website Speed/SEO/UX Optimization.
- **Dedicated Productized Service URLs:**
  - `/services/business-website` — Professional Business Website
  - `/services/landing-page` — High-Converting Landing Page
  - `/services/portfolio-website` — Portfolio Website
  - `/services/corporate-website` — Corporate Website
  - `/services/custom-website` — Custom Website Development
  - `/services/website-redesign` — Website Redesign & Upgrade
  - `/services/landing-page-facebook-pixel` — **Flagship Special Service: Landing Page + Facebook/Meta Pixel Setup**
    - *Core Deliverables:* Responsive conversion UI/UX, product/service presentation, CTA & lead capture form, Meta Pixel installation, `PageView` + `Lead`/`Contact` event setup, basic SEO, performance optimization, and live **Test Events verification**.
    - *Optional Add-ons (Scope-dependent):* Google Tag Manager (GTM) container setup, custom conversion events, Conversions API (CAPI) server-side event deduplication.

#### Category 02: E-commerce & Digital Commerce (`active`)
- **Core Offerings:** Complete E-commerce Website, Single-Vendor Online Store, Digital Product Store, Subscription-based Commerce, E-commerce Redesign, E-commerce Speed & Conversion Optimization, Custom Store Features.
- **Dedicated Productized Service URLs:**
  - `/services/complete-ecommerce-website` — **Flagship Special Service: Complete E-commerce Ready Website**
    - *Core Deliverables:* Responsive storefront, product listing & details, category hierarchy, search & filtering, cart & checkout flow, order management, admin dashboard, inventory management, payment gateway integration (SSLCommerz/bKash/Stripe according to target market), coupon/discount engine, SEO & sitemap, deployment & handover.
    - *Optional Add-ons:* Customer accounts/portals, Meta Pixel + `Purchase`/`InitiateCheckout`/`AddToCart` tracking.
    - *Explicit Commercial Boundary:* Third-party recurring fees (payment gateway fees, SMS gateways, transactional email quotas, shipping APIs, cloud hosting, domain registration) are billed directly to the client and separated from agency development fees.
  - `/services/ready-online-store` — Ready-to-Launch Online Store
  - `/services/digital-product-store` — Digital Product Store
  - `/services/subscription-store` — Subscription E-commerce
  - `/services/ecommerce-redesign` — E-commerce Redesign

#### Category 03: Maintenance & Technical Support (`active`)
- **Core Offerings:** Regular Website Maintenance, Bug Fixing, Security Patches & Updates, Speed Optimization, Content Updates, Backup & Recovery Support, Database Health Maintenance, Ongoing Technical Support.
- **Productized Plan Tiers (`/maintenance` & `/services/website-maintenance`):**
  1. `Basic Care`
  2. `Business Care`
  3. `Priority Care`
  4. `Custom Monthly Retainer`
- **Mandatory Plan Transparency:** Every package must explicitly define response time SLA, monthly support hours, included tasks, excluded tasks, backup frequency, and emergency support rules.

---

### 2.2 Future Service Categories (`coming_soon` / `partner_supported`)

The following **seven (7)** categories exist in the database schema (`service_categories.availability_mode`) for roadmap visibility and waitlist capture, but **must never be marketed as active in-house launch services**:

| Future Category | Initial Status | Visibility Rule |
|---|---|---|
| Custom Software Development | `coming_soon` | Badge only; no fake packages or active checkout |
| AI & Automation | `coming_soon` | Badge only; optional interest capture |
| Mobile App Development | `coming_soon` | Badge only |
| UI/UX & Product Design | `coming_soon` | Badge only |
| Cloud & DevOps | `coming_soon` | Badge only |
| API & System Integration | `coming_soon` | Badge only |
| SEO & Analytics | `coming_soon` | Badge only |

---

## 3. Complete Public Sitemap & Unique Page Composition Requirement

Every public page type must use a **purpose-built layout composition** rather than cloning a single template with swapped headings:

| Route | Purpose | Layout Direction |
|---|---|---|
| `/` | Homepage | Editorial + Premium Agency Showcase (Admin-configurable structured sections) |
| `/about` | About Projukti Labs | Studio philosophy, engineering standards, and operational model |
| `/founder` | Founder Profile | Md Parvezul Islam — Founder-led storytelling, engineering stack, architecture credentials |
| `/services` | Active Services Directory | 3 Active Category matrices + Productized Solution cards + subtle Coming Soon footer section |
| `/services/category/[slug]` | Category Landing Page | Category-specific problem framing, deliverables matrix, and package comparison |
| `/services/[slug]` | Productized Service Detail | Tailored conversion layout (e.g., E-commerce Storefront showcase vs. Meta Pixel Funnel layout) |
| `/maintenance` | Maintenance Overview | SLA matrix, Care Plan comparison table, support workflow, and FAQ |
| `/pricing` | Pricing Overview | Transparent engagement models (Fixed Package, Starting-From, Custom Quote, Monthly Retainer) in BDT/USD |
| `/process` | Our Engineering Process | Discovery → Architecture → UI/UX → Engineering → QA → Launch & Care |
| `/portfolio` | Project Showcase | Filterable visual showcase by category and technology |
| `/portfolio/[slug]` | Project Detail | Problem, solution, architecture stack, gallery, live link |
| `/case-studies` | Deep-Dive Case Studies | Editorial engineering narratives |
| `/case-studies/[slug]` | Individual Case Study | Context, technical challenges, architecture diagrams, verified outcomes |
| `/blog` | Blog Magazine Homepage | Featured article, category filter, search, reading time |
| `/blog/[slug]` | Blog Article | High-readability typography (`Geist` + `Hind Siliguri`), TOC, code highlighting, related posts |
| `/blog/category/[slug]` | Blog Category Archive | Filtered editorial grid |
| `/blog/tag/[slug]` | Blog Tag Archive | Tag-filtered article list |
| `/contact` | General Contact | Minimal conversion layout + Turnstile protection |
| `/get-a-quote` | Structured Project Brief | Multi-step or guided project inquiry form mapped to CRM lead pipeline |
| `/faq` | Frequently Asked Questions | Categorized accordion with `FAQPage` JSON-LD |
| `/privacy-policy` & `/terms` | Legal Pages | Clean legal typography |

---

## 4. Functional vs. Non-Functional Requirements

### 4.1 Launch-Critical Functional Requirements (In Scope)
- Dynamic CMS management for Homepage sections, Services, Portfolio, Case Studies, Blog Posts, Site Settings, and Navigation.
- Inquiry capture (`/contact`, `/get-a-quote`, `/consultation-requests`) creating linked records in `inquiries` and `leads` with CRM status progression (`new` → `reviewing` → `contacted` → `qualified` → `proposal` → `negotiation` → `won` / `lost`).
- Automated Blog Workflow: Draft creation → Content & SEO validation (alt text, broken links, slug uniqueness, meta length) → Human editorial approval → Scheduled publication → Cache & Sitemap revalidation → Social draft preparation.
- Role-Based Access Control (RBAC) for Admin users (`super_admin`, `admin`, `editor`, `manager`, `support`).
- Direct-to-R2 media upload via presigned URLs with metadata cataloged in D1.

### 4.2 Explicit Non-Goals & Exclusions for v1.0
- **No Unapproved AI Auto-Publishing:** AI may assist with drafts, SEO suggestions, or social captions, but **human approval is mandatory** before any post transitions to `published`.
- **No Drag-and-Drop Visual Page Builder:** The Homepage Builder uses **structured, schema-validated section forms** to guarantee design integrity and mobile responsiveness.
- **No Multi-Tenancy:** Single business, single authoritative D1 database. No `tenant_id` columns or multi-tenant isolation layers.
- **No Premature Future Modules:** Do not build client login portals, online payment checkouts, invoicing engines, or incomplete `/bn` machine-translated routes in v1.0.

### 4.3 Non-Functional Targets (Engineering Goals)
- **Performance Targets (Field & Lab Validation Required):** LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1; Lighthouse Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95.
- **Responsive Viewport Matrix:** Zero horizontal overflow from `320px` (Small Mobile) through `375px–430px` (Standard Mobile, app-like navigation & touch targets ≥ 44×44px), `768px` (Tablet), `1024px–1440px` (Desktop), and `1536px+` (Large Desktop).
- **Security:** HttpOnly + Secure + SameSite cookies, CSRF protection, Cloudflare Turnstile on all public mutations, strict Zod validation, RBAC authorization on every `/admin` and `/api/v1/admin` route, and immutable `audit_logs`.

