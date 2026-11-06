# 00 — Phase 01 Executive Summary

**Project:** Projukti Labs (`projuktilabs.tech`)  
**Founder:** Md Parvezul Islam  
**Tagline:** *Building Digital Solutions. Engineering the Future.*  
**Phase:** 01 — Technical Foundation Planning, Architecture Validation & Engineering Blueprint  
**Date:** 2026-11-06  
**Status:** Completed (Ready for Founder Review & Phase 02 POC Gate)

---

## 1. Project Vision

Projukti Labs is a founder-led premium digital technology studio serving both **Bangladesh (BDT)** and **International (USD)** markets. Rather than operating as a generic brochure agency site or a separate personal portfolio, Projukti Labs unifies nine core capabilities under a single authoritative brand and platform:

1. **Founder-Led Professional Portfolio** (`/founder`) — Establishing technical authority and personal credibility for Md Parvezul Islam without diluting the studio identity.
2. **Digital Technology Studio Website** (`/`, `/about`, `/process`) — Presenting a dark-first, high-contrast, editorial engineering brand.
3. **Productized Service Catalog** (`/services`, `/services/[slug]`) — Selling clearly scoped, outcome-oriented solutions across **3 Active Launch Categories** while keeping 7 future categories strictly in `Coming Soon` or `Partner Supported` mode.
4. **Portfolio & Case Studies** (`/portfolio`, `/case-studies`) — Evidence-driven project showcases and deep-dive technical storytelling.
5. **Automated Technical Blog & Knowledge Platform** (`/blog`) — Human-approved editorial publishing backed by deterministic SEO, sitemap, cache, and distribution workflows.
6. **Client Inquiry & Lead Acquisition Engine** (`/contact`, `/get-a-quote`) — Rate-limited, Turnstile-protected project brief capture feeding directly into an internal CRM pipeline.
7. **Administrative CMS & Business Control Center** (`/admin/*`) — A dedicated SaaS-grade internal dashboard for managing structured homepage sections, services, portfolio items, blog lifecycle, media, inquiries, CRM leads, and automation logs.
8. **Maintenance & Technical Support Retainers** (`/maintenance`) — Tiered ongoing care packages (*Basic Care, Business Care, Priority Care, Custom Retainer*) and support ticket management.
9. **Deterministic Operational Automation** — Event-driven and scheduled background jobs powered by Cloudflare Workflows, Queues, and Cron Triggers.

---

## 2. Verified Current Project State

Prior to executing Phase 01, `/Users/parvez/CODE/projukti_labs` was audited and verified to be an empty directory (`0` files, uninitialized Git repository).

Per explicit Founder confirmation during the Phase 01 Understanding Lock:
- A Git repository was initialized in `/Users/parvez/CODE/projukti_labs`.
- The latest Next.js App Router baseline (`next@16.4.5`, `react@19.3.0`, `tailwindcss@^4`, `typescript@^5`, `@tailwindcss/turbopack@^4`, `babel-plugin-react-compiler@1.0.0`) was scaffolded in-place via `pnpm@11.17.0` (`create-next-app@latest`).
- **No custom application pages, database migrations, authentication flows, or Cloudflare production resources have been deployed**, preserving the Phase 01 boundary prior to the Phase 02 Compatibility Proof of Concept (POC).

---

## 3. Recommended Architecture & Technology Direction

Projukti Labs will be built as a **Single-Repository Modular Monolith** backed by **One Authoritative Production Cloudflare D1 Database**.

| Architectural Layer | Selected Technology | Validation Status |
|---|---|---|
| **Application Framework** | Next.js `16.4.5` (App Router, React `19.3.0`) | **Installed** (Requires Phase 02 `vinext` POC) |
| **Edge Build & Runtime** | `vinext` (`1.4.3`) + Vite + `@cloudflare/vite-plugin` on **Cloudflare Workers** | **Needs Validation (Phase 02 POC)**; fallback: `@opennextjs/cloudflare` |
| **Language & Styling** | TypeScript `5.9.3` + Tailwind CSS v4 + Radix UI / shadcn primitives + `motion` | **Accepted** |
| **Authoritative Database** | **Cloudflare D1** (Managed Serverless SQLite, Single-Database Architecture) | **Accepted** (Requires Phase 02 binding POC) |
| **ORM & Migrations** | **Drizzle ORM** (`drizzle-orm/d1`) + `drizzle-kit` | **Accepted** |
| **Object & Media Storage** | **Cloudflare R2** + Presigned `PUT` URLs via `aws4fetch` (Web Crypto API) | **Accepted** (Requires Phase 02 upload POC) |
| **Edge Caching** | Cloudflare Cache API + **Cloudflare KV** (non-authoritative cache/rate-limits only) | **Accepted** |
| **Async & Durable Jobs** | **Cloudflare Workflows** + **Cloudflare Queues** + Cron Triggers | **Accepted** |
| **Authentication** | **Better Auth** (`better-auth` + Drizzle SQLite adapter) or Oslo/WebCrypto HttpOnly Session Cookies | **Needs Validation (Phase 02 POC)** |
| **Bot & Abuse Protection** | **Cloudflare Turnstile** + Edge Rate Limiting + Zod Server Validation | **Accepted** |

---

## 4. Major Risks & Mitigation Strategy

1. **`vinext` + Next.js 16.4.5 Compatibility Gaps (High Risk / Gate 01):**
   - *Evidence:* `vinext` reimplements the Next.js API surface on Vite for Cloudflare Workers. While layouts, RSC, Route Handlers, Server Actions, and dynamic routes are supported, experimental Next.js 16 features (`"use cache"`, `cacheComponents`, `@tailwindcss/turbopack` build integration, and build-time font/image optimization) have partial support or differ from standard `next build`.
   - *Mitigation:* Phase 02 starts with `npx vinext check` and a strict 17-point POC gate. We will avoid experimental `"use cache"` directives in favor of explicit Cloudflare Cache API / KV helpers, and keep `@opennextjs/cloudflare` as a ready fallback if `vinext` exhibits blocking runtime regressions.
2. **Cloudflare D1 Single-Threaded Writer & Parameter Limits (Medium Risk):**
   - *Evidence:* D1 processes queries single-threadedly per database, caps SQL statement size at 100 KB, caps bound parameters at 100 per query, and does not support long-running interactive TCP transactions.
   - *Mitigation:* Use `db.batch([...])` for atomic multi-table mutations, chunk bulk inserts to ≤ 15 rows per statement, enforce composite indexes on all filter/sort columns, and never store binary blobs in D1.
3. **Node.js Native Addon Incompatibility on Workers (`workerd`) (Medium Risk):**
   - *Evidence:* Libraries relying on native C++ bindings (`sharp`, `bcrypt`, `argon2` native binaries) fail in V8 isolates.
   - *Mitigation:* Use Web Crypto API (`crypto.subtle`) for hashing/signing, `aws4fetch` for S3/R2 signing, and Cloudflare Images / R2 bindings for media handling.

---

## 5. Unresolved Decisions (For Founder Review)

All core business, scope, and stack decisions were locked in Section 23 of the Master Blueprint. Only three operational specifics remain for confirmation before or during Phase 02/03:
1. **Transactional Email Provider Selection:** Resend (recommended for HTTP REST edge compatibility and React Email templates) vs. Cloudflare Email Routing / AWS SES.
2. **Cloudflare Account Tier Confirmation:** Cloudflare Queues and Workflows (and 10 GB D1 capacity) require the **Workers Paid Plan (\$5/month)**. Confirm whether the target Cloudflare account is on Workers Paid or if a Free-tier fallback (Cron Triggers + D1 job table) is needed for initial staging.
3. **Reference HTML Attachment (`Pasted text(20261106-041341).txt`):** The visual tokens (`#09090B`, `#FFDF20`, `Geist`, `Hind Siliguri`, `Caveat`) were extracted in your blueprint; if you have the raw HTML file locally and wish to drop it into `docs/reference/` for micro-interaction inspection prior to Phase 03, we can incorporate any additional CSS details directly.

---

## 6. Phase 01 Outcome

Phase 01 has established a complete, conflict-free 22-document architecture specification (`docs/architecture/phase-01/00..21`) and root `DESIGN.md`, audited the freshly initialized `next@16.4.5` workspace, and defined the exact Phase 02 POC gates required before feature implementation begins.

