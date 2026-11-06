# 21 — Architecture Decision Records (ADRs)

**Project:** Projukti Labs (`projuktilabs.tech`)  
**Date:** 2026-11-06  

---

## ADR-001: Modular Monolith Architecture in a Single Repository
- **Status:** Accepted
- **Context:** Projukti Labs combines a public studio website, founder portfolio, productized service catalog, blog CMS, client inquiry/CRM pipeline, maintenance portal, and background automations.
- **Options Considered:**
  1. **Single-Repository Modular Monolith** (Next.js App Router with bounded `modules/*` and shared D1 database).
  2. Separate Frontend App + Standalone Backend API Server + Separate Admin SPA.
  3. Microservices per domain (CMS service, CRM service, Blog service).
- **Decision:** Adopt a **Single-Repository Modular Monolith** (`Option 1`).
- **Reasons:** Eliminates cross-repo type drift, CORS overhead, and multi-service deployment complexity while keeping strict domain boundaries in `modules/*`.
- **Consequences & Risks:** Requires discipline so `app/*` routes call `modules/*` interfaces rather than writing raw SQL in UI components.
- **Evidence:** Blueprint Section 17 & Section 23.

---

## ADR-002: Next.js 16.4.5 + `vinext` on Cloudflare Workers with OpenNext Fallback
- **Status:** Needs Validation (Phase 02 POC Gate)
- **Context:** The Founder selected Next.js App Router deployed on Cloudflare Workers via `vinext` + Vite. Next.js `16.4.5` (with React `19.3.0` and Tailwind v4) was initialized in `/Users/parvez/CODE/projukti_labs`.
- **Options Considered:**
  1. **Next.js `16.4.5` + `vinext@1.4.3` + `@cloudflare/vite-plugin@1.67.0`** as primary path, with **`@opennextjs/cloudflare@1.20.16`** as pre-validated fallback.
  2. Standard Node.js VPS / Docker hosting outside Cloudflare Workers.
  3. Replacing Next.js with Astro or React Router v7.
- **Decision:** Proceed with `Option 1`, subject to passing the 17-point Phase 02 POC Gate (`18-technical-poc-test-plan.md`). Avoid experimental Next.js 16 `"use cache"` directives in favor of explicit Cloudflare Cache API + KV helpers.
- **Reasons:** Honors the locked baseline while protecting the project from any beta compatibility regression in `vinext`.
- **Consequences & Risks:** Must validate Tailwind v4 Vite compilation and custom `next/image` loader in Phase 02 before building UI pages.
- **Evidence:** Cloudflare Next.js & `vinext` docs (`03-technical-research-and-sources.md`).

---

## ADR-003: Single Authoritative Cloudflare D1 Database with Drizzle ORM
- **Status:** Accepted (Binding POC in Phase 02)
- **Context:** Projukti Labs requires relational integrity across 7 domains (Auth, Services, Portfolio, Blog, CRM, Maintenance, CMS/Automation) for a single business entity.
- **Options Considered:**
  1. **Single Cloudflare D1 Database (`projukti_labs_db`) + Drizzle ORM (`0.45.4`)**.
  2. Multi-tenant database schema with `tenant_id` on every table.
  3. Dual-write across D1 and KV as competing sources of truth.
- **Decision:** Use **One Authoritative Cloudflare D1 Database** (`Option 1`) with zero multi-tenancy columns; use KV strictly as a disposable read-through cache.
- **Reasons:** Eliminates distributed data inconsistency and unnecessary query complexity; Drizzle compiles to lightweight SQL with native `db.batch()` support.
- **Consequences & Risks:** Must respect D1's 100-bound-parameter limit per statement, 10 GB max size, and single-threaded writer via composite indexing and Edge caching.
- **Evidence:** Cloudflare D1 Limits & Drizzle ORM docs (`07-database-design.md`).

---

## ADR-004: Direct Browser-to-R2 Uploads via `aws4fetch` Presigned URLs
- **Status:** Accepted (Upload POC in Phase 02)
- **Context:** Admin users upload high-resolution portfolio galleries, blog images, and service media to Cloudflare R2 (`projukti-labs-assets`).
- **Options Considered:**
  1. **Presigned `PUT` URLs signed in Worker via `aws4fetch` + post-upload `env.R2_BUCKET.head()` verification**.
  2. Streaming multipart file uploads directly through the Next.js Worker request body.
  3. Storing base64/BLOB images inside D1.
- **Decision:** Adopt `Option 1` (Direct Browser-to-R2 Presigned `PUT` + `.head()` verification).
- **Reasons:** Bypasses Worker CPU/memory limits, keeps binary blobs out of D1, and uses `aws4fetch` which runs natively on `workerd` Web Crypto API without Node.js AWS SDK bloat.
- **Consequences & Risks:** Requires configuring CORS on the R2 bucket for `https://projuktilabs.tech` and `http://localhost:3000`.
- **Evidence:** Cloudflare R2 Presigned URLs documentation (`03-technical-research-and-sources.md`).

---

## ADR-005: WebCrypto Session Authentication + 5-Role RBAC in D1
- **Status:** Needs Validation (Phase 02 POC Gate)
- **Context:** The `/admin` control panel requires secure authentication, brute-force protection (`login_attempts`), session revocation (`sessions`), granular RBAC (`roles`, `permissions`, `role_permissions`), and immutable `audit_logs` inside Cloudflare Workers.
- **Options Considered:**
  1. **WebCrypto PBKDF2-SHA256 + SHA-256 Hashed Session Tokens (`__Host-pl_session` HttpOnly Cookie) / `better-auth@1.7.18` Drizzle SQLite Adapter**.
  2. External SaaS Auth (Clerk / Auth0).
  3. Node-based `bcrypt` + JWTs in `localStorage`.
- **Decision:** Adopt `Option 1`. Never store tokens in `localStorage`; store only `SHA-256(token)` in D1 `sessions.token_hash`.
- **Reasons:** 100% compatible with `workerd` V8 isolate (`crypto.subtle`), zero external per-seat SaaS cost, instant server-side session revocation, and native integration with our 7 security tables.
- **Evidence:** `09-authentication-and-security-architecture.md`.

---

## ADR-006: Structured Homepage & Page Section Builder (No Freeform Drag-and-Drop)
- **Status:** Accepted
- **Context:** The Founder requires the ability to edit Homepage sections (Hero, Featured Services, Featured Projects, Testimonials, Blog Highlights, CTA) from `/admin`.
- **Options Considered:**
  1. **Schema-Validated Structured Section Builder (`page_sections` with Zod-typed JSON payloads and ordering)**.
  2. Full visual WYSIWYG drag-and-drop CSS canvas builder.
- **Decision:** Implement `Option 1` (Structured Section Builder) and attach a `layout_variant` enum (`web_conversion`, `ecommerce_showcase`, `pixel_funnel`, `maintenance_plans`) to `services` so each page archetype has a bespoke, high-craft layout without allowing broken mobile DOM layouts.
- **Reasons:** Guarantees 100% responsive stability (`320px–1920px`), strict brand token adherence, and fast SSR performance.
- **Evidence:** Master Blueprint Section 4.4 & Section 8.

---

## ADR-007: Deterministic Automation First + Mandatory Human Approval Gate for AI Drafts
- **Status:** Accepted
- **Context:** Projukti Labs automates blog publishing, SEO audits, sitemap updates, inquiry alerts, and follow-up reminders using Cloudflare Workflows, Queues, and Cron Triggers.
- **Options Considered:**
  1. **Deterministic Workflows for operations + Mandatory Human Editorial Approval (`approved_by_user_id`) before any AI-assisted or scheduled blog draft can become `published`**.
  2. Fully autonomous AI auto-blogging that publishes directly to `/blog`.
- **Decision:** Adopt `Option 1`.
- **Reasons:** Prevents hallucinated technical claims, duplicate content penalties, and brand dilution while automating 100% of the repetitive SEO, cache, sitemap, RSS, and notification work.
- **Evidence:** Master Blueprint Section 7 & Section 12 (`14-automation-and-background-jobs.md`).

---

## ADR-008: Strict 3 Active Launch Categories vs. 7 Coming-Soon Categories
- **Status:** Accepted
- **Context:** Projukti Labs has a long-term vision covering 10 technology domains, but initial operational delivery focuses on 3 core studio strengths.
- **Options Considered:**
  1. **Enforce `availability_mode = 'active'` for only 3 categories (`Web Development & Design`, `E-commerce & Digital Commerce`, `Maintenance & Technical Support`) and `coming_soon` / `partner_supported` for the other 7 categories at the database and API level**.
  2. Advertise all 10 categories as active services immediately at launch.
- **Decision:** Adopt `Option 1`.
- **Reasons:** Protects commercial honesty, sharpens conversion focus on high-margin productized packages (`/services/landing-page-facebook-pixel`, `/services/complete-ecommerce-website`), and keeps the database extensible when future categories are activated.
- **Evidence:** Master Blueprint Section 1, 2, 3 & Section 23.

