# Projukti Labs — Quality Gates & Verification Standards (`QUALITY.md`)

This document defines the mandatory acceptance gates and testing protocols enforced across Projukti Labs.

---

## 1. Quality Gates (Must Pass Before Commit/Deploy)

| Gate | Tool / Command | Verification Criteria | Current Status |
| :--- | :--- | :--- | :--- |
| **Type Checking** | `pnpm typecheck` (`tsc --noEmit`) | 0 TypeScript errors | **PASSED** |
| **Linting** | `pnpm lint` (`eslint`) | 0 errors, 0 warnings | **PASSED** |
| **Unit Testing** | `pnpm test` (`vitest run`) | 100% test pass rate | **PASSED (9/9 tests)** |
| **Edge Bundle Build** | `pnpm run build:vinext` | Zero compilation failures, bundle < 1 MB | **PASSED (300 KB)** |
| **D1 Migrations** | `wrangler d1 execute` | Structured Drizzle schema applied locally | **PASSED (`0001_silly_spiral`)** |

---

## 2. Browser Verification Matrix (Playwright MCP)

Closed-loop testing executed on real browser sessions across mobile and desktop viewports:

| Viewport | Test Route | Verified Interactions | Result |
| :--- | :--- | :--- | :--- |
| **Desktop (1280×800)** | `/` (Home) | Hero metrics ticker, active services bento cards, footer landmarks | **PASSED** |
| **Mobile (375×812)** | `/` (Home) | Hamburger drawer toggle, touch targets >= 44px, safe layout | **PASSED** |
| **Desktop (1280×800)** | `/services` | 3 active categories, 7 future categories labeled Coming Soon | **PASSED** |
| **Desktop (1280×800)** | `/services/landing-page-meta-pixel` | 5-step CAPI funnel diagram, event schema table, packages | **PASSED** |
| **Desktop (1280×800)** | `/services/complete-ecommerce-website` | 5-module commerce flow, honest fee transparency, packages | **PASSED** |
| **Desktop (1280×800)** | `/services/website-maintenance` | 4 care tiers, SLA comparison table, scope boundaries | **PASSED** |
| **Desktop (1280×800)** | `/contact` | Form fill, submit to `/api/v1/inquiries`, reference code emission | **PASSED (`PL-2026-G4AK`)** |
| **Desktop (1280×800)** | `/get-a-quote?service=...` | Pre-fill from searchParams, budget select, submit & tracking code | **PASSED (`PL-2026-LY2F`)** |
| **Desktop (1280×800)** | Header theme toggle | Light/Dark theme switch, `:focus-visible` styling | **PASSED** |

---

## 3. Console & Network Telemetry Audit

- **Browser Console Errors:** 0
- **Browser Console Warnings:** 0
- **Network Failures / 404s:** 0
- **API Response Code:** `201 Created` for `/api/v1/inquiries`
- **Request Duration:** ~38ms for inquiry processing

