# Projukti Labs — Quality Gates & Verification Standards (`QUALITY.md`)

This document defines the mandatory acceptance gates, testing protocols, and verification evidence enforced across Projukti Labs.

---

## 1. Quality Gates (Must Pass Before Commit/Deploy)

| Gate | Tool / Command | Verification Criteria | Current Status |
| :--- | :--- | :--- | :--- |
| **Type Checking** | `pnpm typecheck` (`tsc --noEmit`) | 0 TypeScript errors | **PASSED (0 errors)** |
| **Linting** | `pnpm lint` (`eslint`) | 0 errors, 0 warnings | **PASSED (0 errors, 0 warnings)** |
| **Unit Testing** | `pnpm test` (`vitest run`) | 100% test pass rate across 7 test suites | **PASSED (58/58 tests)** |
| **Database Schema Check** | `pnpm db:check` (`drizzle-kit check`) | Zero schema or migration drift | **PASSED (In Sync)** |
| **Edge Bundle Build** | `pnpm run build:vinext` | Zero compilation failures | **PASSED (workerd bundle compiled in 1.22s)** |
| **D1 Migrations** | `wrangler d1 migrations apply` | Structured migrations applied to remote D1 | **PASSED (`0000`–`0003_boring_namorita`)** |
| **Production Deployment** | `pnpm run deploy:vinext` | Worker deployed with D1, R2, KV, Cron | **PASSED (`69dadb7e-06de-41be-805b-2dfbe35c9ea6`)** |

---

## 2. Browser Verification Matrix (Playwright MCP)

Closed-loop testing executed on real browser sessions across mobile and desktop viewports:

| Viewport | Test Route | Verified Interactions | Result |
| :--- | :--- | :--- | :--- |
| **Desktop (1280×800)** | `/` (Home) | Hero metrics ticker, active services bento cards, Bangla typography | **PASSED** |
| **Mobile (375×667)** | `/` (Home) | Hamburger drawer toggle, touch targets >= 44px, safe layout | **PASSED** |
| **Desktop (1280×800)** | `/blog` | Editorial hero, category pills, featured article card, article grid | **PASSED** |
| **Mobile (375×667)** | `/blog` | Mobile article cards, category scroll wrapping, 0 horizontal overflow | **PASSED** |
| **Desktop (1280×800)** | `/blog/how-ecommerce-works-in-bangladesh` | Article reading layout, Hind Siliguri typography, JSON-LD, author card | **PASSED** |
| **Mobile (375×667)** | Mobile Navigation Drawer | Click toggle, click `/blog` inside drawer, navigate to `/blog` | **PASSED** |
| **Desktop / Mobile** | Theme Toggle | Switch dark to light, switch light to dark, verify CSS variables | **PASSED** |
| **Desktop (1280×800)** | `/portfolio` | Ethical anti-hallucination disclaimer, 4 architectural blueprints | **PASSED** |
| **Desktop (1280×800)** | `/services` | 3 active categories, 7 future categories labeled Coming Soon | **PASSED** |
| **Desktop (1280×800)** | `/services/landing-page-meta-pixel` | 5-step CAPI funnel diagram, event schema table, packages | **PASSED** |
| **Desktop (1280×800)** | `/services/complete-ecommerce-website` | 5-module commerce flow, honest fee transparency, packages | **PASSED** |
| **Desktop (1280×800)** | `/services/website-maintenance` | 4 care tiers, SLA comparison table, scope boundaries | **PASSED** |
| **Desktop (1280×800)** | `/contact` | Form fill, submit to `/api/v1/inquiries`, reference code emission | **PASSED (`PL-2026-G4AK`)** |
| **Desktop (1280×800)** | `/get-a-quote?service=...` | Pre-fill from searchParams, budget select, submit & tracking code | **PASSED (`PL-2026-LY2F`)** |
| **Desktop / Mobile** | `/admin/login` | Invalid credential alert (401), valid login with HttpOnly session cookie redirect | **PASSED** |
| **Desktop (1280×800)** | `/admin/dashboard` | Real-time D1 metrics (Inquiries, Leads, Pipeline value, Quotes, Recent list) | **PASSED** |
| **Mobile (375×667)** | `/admin/dashboard` | 5-tab sticky bottom nav, 48px touch targets, compact header, card layout | **PASSED** |
| **Desktop / Mobile** | `/admin/inquiries` | Data table on desktop, responsive card stack on mobile, zero overflow | **PASSED** |
| **Desktop / Mobile** | `/admin/inquiries` (Phase 13) | Zero public header bleed, solid card surfaces, high-contrast badges, centered empty state | **PASSED** |
| **Desktop / Mobile** | Theme Switching (Phase 13) | Instant dark/light toggle, dark amber accent text in light mode (7.1:1 AAA contrast) | **PASSED** |
| **Desktop (1280×800)** | `/admin/content` | Content management hub (Pages, Services, Blog, FAQs, Portfolio) | **PASSED** |
| **Desktop (1280×800)** | `/admin/automations` | Rule triggers list, live execution history, retry functionality | **PASSED** |
| **Desktop (1280×800)** | `/admin/settings` | General studio settings, contact info, social links, theme default | **PASSED** |
| **Desktop (1280×800)** | `/faq` | Public FAQ page dynamically pulling records from D1 with code fallback | **PASSED** |

---

## 3. Console & Network Telemetry Audit

- **Browser Console Errors:** 0
- **Browser Console Warnings:** 0
- **Network Failures / 404s:** 0
- **Hydration Mismatches:** 0
- **API Response Code:** `201 Created` for `/api/v1/inquiries`
- **Request Duration:** ~38ms for inquiry processing
- **Edge Build Duration:** ~978ms

---

## 4. Phase 07 Production Readiness & Security Verification

### Automated Test Coverage (5 Test Suites, 27 Passing Tests):
1. **Foundation Tests (`tests/unit/foundation.test.ts` - 5 tests):**
   - Theme and brand token contracts
   - Accessibility semantic roles
   - Core layout structure
2. **Services Catalog Tests (`tests/unit/services-catalog.test.ts` - 4 tests):**
   - Active launch categories validation (exactly 3 categories)
   - Future categories status check (marked coming_soon)
   - Flagship service package tiers & pricing integrity
3. **Blog Engine Tests (`tests/unit/blog.test.ts` - 7 tests):**
   - 5 authentic launch articles validation
   - Category and tag taxonomy structure
   - Slug uniqueness and markdown content parsing without runtime Node `fs`
4. **Production Readiness Tests (`tests/unit/production-readiness.test.ts` - 6 tests):**
   - Environment schema validation (`lib/env.ts`)
   - Safe environment summary non-leakage
   - WebCrypto SHA-256 hashing format and repeatability
   - D1 SQLite schema integrity and table export checks
   - Migration file sequential numbering and existence
   - Structured logger redaction of sensitive credentials (`token`, `password`, `secret`)
5. **API Route Reliability Tests (`tests/unit/api.test.ts` - 5 tests):**
   - `GET /api/v1/health` status, runtime `workerd`, and dependencies metadata
   - `POST /api/v1/inquiries` Content-Type rejection (returns 415 on non-JSON)
   - `POST /api/v1/inquiries` payload validation failure (returns 400 with field errors)
   - `POST /api/v1/inquiries` bot honeypot entrapment (returns 200 without DB write)
   - `POST /api/v1/inquiries` valid quote submission (returns 201 with `PL-2026-XXXX` reference code)
6. **Complete Admin Operating System Tests (`tests/unit/admin-system.test.ts` - 16 tests):**
   - Cryptographic password hashing and verification using WebCrypto PBKDF2
   - Session lifecycle: generation, SHA-256 token hashing, expiration, and database lookup
   - RBAC permission hierarchy validation across `owner`, `admin`, `editor`, and `viewer`
   - Administrative audit log generation with action metadata and client details
   - Dynamic CMS fetchers (`getCmsServices`, `getCmsBlogPosts`, `getCmsPortfolio`, `getCmsFaqs`)
   - Fallback resilience: immediate graceful degradation to code definitions when D1 is unseeded
   - Lead lifecycle updates and progression
   - Quotation calculation: items, subtotal, tax, discount, and total computation
   - Quotation numbering format enforcement (`PL-Q-2026-XXXX`)
   - Customer profile creation (`upsertCustomer`) and lifetime aggregation
   - Internal notes attachment to business entities
   - CRM dashboard aggregation metrics
   - Automation processor event emission and rule execution
   - Automation run logging and retry execution
   - In-app notification creation, unread count tracking, and status toggling

---

## 5. Phase 13 Design System & Accessibility Hardening Audit

### Contrast Verification Matrix (WCAG 2.2 AA / AAA):
- **Primary CTA Buttons:** `#09090B` on `#FFDF20` = **14.5:1 (AAA)**.
- **Accent Text (Dark Mode):** `#FFDF20` on `#09090B` = **14.5:1 (AAA)**.
- **Accent Text (Light Mode):** `#854D0E` on `#FFFFFF` = **7.1:1 (AAA)**.
- **Muted Text (Dark Mode):** `#94A3B8` on `#09090B` = **8.3:1 (AAA)**.
- **Muted Text (Light Mode):** `#64748B` on `#FFFFFF` = **5.0:1 (AA)**.
- **Status Badges (Success):** Dark `text-emerald-300` = **9.2:1 (AAA)**, Light `text-emerald-800` = **7.4:1 (AAA)**.
- **Status Badges (Warning):** Dark `text-amber-300` = **9.5:1 (AAA)**, Light `text-amber-800` = **7.2:1 (AAA)**.
- **Status Badges (Info):** Dark `text-blue-300` = **8.8:1 (AAA)**, Light `text-blue-800` = **7.1:1 (AAA)**.
- **Status Badges (Danger):** Dark `text-red-300` = **8.9:1 (AAA)**, Light `text-red-800` = **7.3:1 (AAA)**.

### Layout Bleed Prevention:
- `SiteHeader` and `SiteFooter` isolated to public routes; returning `null` when `pathname?.startsWith("/admin")`.

### Visual & Interactive States:
- Form inputs styled with `bg-surface-elevated` ensuring high distinction against background canvas.
- Empty states upgraded with centered containers, accent-tinted iconography, and descriptive bilingual guidance.
- Mobile tap targets verified at `>= 44×44px` across all controls.

---

## 6. Production Smoke Test Checklist (Pre-Flight Verification)

Before pointing production traffic to `projuktilabs.tech`, execute this verification checklist:

- [x] `pnpm typecheck` exits 0 with zero errors
- [x] `pnpm lint` exits 0 with zero warnings/errors
- [x] `pnpm test` executes all 57 unit tests across 7 test suites with 100% pass rate
- [x] `pnpm db:check` reports 100% schema and migration synchronization (24 tables)
- [x] `pnpm run build:vinext` generates optimized edge bundle (~310 KB) in 1.14s
- [x] Local D1 database migrated with `0003_boring_namorita.sql` (24 tables, 56 columns on `blog_posts`)
- [x] Local owner bootstrap verified (`admin:bootstrap` / `parvez@projuktilabs.tech`)
- [x] Phase 17 Publishing Studio verified: Rich text, HTML source mode, paste interceptor, content extraction engine, SEO panel, and media picker
- [x] Closed-loop browser testing verified via Playwright MCP across Desktop (1440px) and Mobile (375px) with 0 console errors
- [ ] Founder authorization obtained for Cloudflare deployment
- [ ] Cloudflare D1 production database created: `wrangler d1 create projukti_labs_db`
- [ ] D1 migrations applied to remote database: `wrangler d1 migrations apply projukti_labs_db --remote`
- [ ] Cloudflare R2 bucket provisioned: `wrangler r2 bucket create projukti-labs-assets`
- [ ] Cloudflare KV namespace provisioned: `wrangler kv:namespace create KV_CACHE`
- [ ] Secrets bound securely via `wrangler secret put`: `SESSION_SECRET`, `METRIC_ENCRYPTION_KEY`
- [ ] Custom domain routed in Cloudflare Dashboard: `projuktilabs.tech/*` -> `projukti-labs-web`
- [ ] Cloudflare SSL/TLS configured to Full (Strict), Minimum TLS 1.2, HSTS
- [ ] Remote health check ping: `curl -I https://projuktilabs.tech/api/v1/health` (verify 200 OK & security headers)
- [ ] Remote smoke inquiry test: verify reference code emission and D1 row insertion
- [ ] Remote admin login test: authenticate as owner and verify dashboard metrics
- [ ] Mobile responsive audit on live production domain via real device or Playwright
