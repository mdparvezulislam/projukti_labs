# 04 — Technology Stack Evaluation

**Evaluation Date:** 2026-11-06  
**Methodology:** Evidence-based comparison across runtime compatibility, operational complexity, cost, and long-term maintainability on the Cloudflare Edge platform.

---

## 1. Master Technology Stack Summary

| Layer | Proposed Choice | Verified Version | Alternatives Considered | Recommendation Status | Confidence |
|---|---|---|---|---|---|
| **App Framework** | Next.js (App Router) | `16.4.5` (Installed) | Astro 5, Remix / React Router v7, TanStack Start | **Accepted** | High |
| **Edge Runtime / Build** | `vinext` + `@cloudflare/vite-plugin` | `1.4.3` / `1.67.0` | `@opennextjs/cloudflare` (`1.20.16`) | **Needs Validation (Phase 02 POC)** | Medium-High |
| **UI & Styling** | Tailwind CSS v4 + Radix UI / shadcn | `4.3.4` (Installed) | Vanilla Extract, CSS Modules, Mantine | **Accepted** | High |
| **Animation** | `motion` (Framer Motion) + CSS | `14.9.1` | GSAP, CSS-only transitions | **Accepted** | High |
| **Forms & Validation** | `react-hook-form` + `zod` | `7.91.0` / `4.6.7` | TanStack Form, Valibot | **Accepted** | High |
| **Database** | Cloudflare D1 (SQLite) | Managed Edge Service | Turso (libSQL), Neon (Serverless Postgres) | **Accepted** | High |
| **ORM & Migrations** | `drizzle-orm` + `drizzle-kit` | `0.45.4` / `0.31.11` | Prisma (Edge), Kysely | **Accepted** | High |
| **Media Storage** | Cloudflare R2 + `aws4fetch` | Managed Edge Service | AWS S3, UploadThing, Cloudinary | **Accepted** | High |
| **Edge Cache** | Cloudflare Cache API + KV | Managed Edge Service | Upstash Redis | **Accepted** | High |
| **Async / Background** | Cloudflare Workflows + Queues | Managed Edge Service | Inngest, Trigger.dev | **Accepted** | High |
| **Authentication** | WebCrypto Session + RBAC / `better-auth` | Custom / `1.7.18` | NextAuth v5 (Auth.js), Clerk | **Needs Validation (Phase 02 POC)** | High |

---

## 2. Detailed Layer-by-Layer Trade-off Analysis

### 2.1 Application Framework & Cloudflare Workers Adapter (`vinext` vs. `@opennextjs/cloudflare`)
- **Proposed Choice:** Next.js `16.4.5` App Router running on Cloudflare Workers via `vinext@1.4.3` + `@cloudflare/vite-plugin@1.67.0`.
- **Alternatives:**
  1. `@opennextjs/cloudflare@1.20.16` (OpenNext adapter that post-processes standard `next build` output for Cloudflare Workers).
  2. React Router v7 / Astro on Cloudflare Workers.
- **Compatibility Evidence:**
  - Cloudflare actively develops `vinext` to run Next.js App Router conventions directly on Vite and `workerd` with fast HMR and smaller worker bundles.
  - However, Next.js `16.4.5` introduces React 19.3 and `@tailwindcss/turbopack`. While standard App Router RSC, Route Handlers, Server Actions, and dynamic routes work in `vinext`, experimental `"use cache"` and `next/image` build-time optimization require care.
- **Advantages:** Fast Vite builds, native Worker binding access (`env.DB`, `env.R2`), unified Cloudflare deployment.
- **Limitations:** `vinext` is evolving rapidly; edge cases with bleeding-edge Next.js 16 internals can occur.
- **Cost & Operational Complexity:** Low cost (\$5/mo Workers Paid covers 10M requests); moderate initial setup complexity mitigated by Phase 02 POC.
- **Recommendation & Fallback Rule:** Proceed with `vinext@1.4.3` in Phase 02 POC (`npx vinext check`). If any critical App Router feature in `next@16.4.5` fails the Phase 02 POC gate, switch the build adapter to `@opennextjs/cloudflare@1.20.16` without changing a single line of application UI, database, or domain module code.

---

### 2.2 Database & ORM (Cloudflare D1 + Drizzle ORM `0.45.4`)
- **Proposed Choice:** Single authoritative Cloudflare D1 database accessed via `drizzle-orm/d1` (`0.45.4`) and managed via `drizzle-kit` (`0.31.11`).
- **Alternatives:**
  - *Prisma ORM:* Requires heavy WASM query engine bundle on Workers, eating into Worker size limits and cold-start budgets.
  - *Turso / Neon:* Introduces external network hops outside Cloudflare's internal backbone and additional billing accounts.
- **Compatibility Evidence:** Drizzle ORM compiles directly to zero-overhead SQL strings and supports D1's native `.batch()` API and SQLite dialect natively.
- **Advantages:** Ultra-lightweight bundle (<30 KB), zero egress cost, co-located with Cloudflare Workers, built-in Time Travel point-in-time recovery.
- **Limitations:** 10 GB max DB size, single-threaded writer per DB, 100 bound parameters per query, no multi-roundtrip TCP transactions.
- **Recommendation:** **Accepted (High Confidence).**

---

### 2.3 Authentication Strategy (Custom WebCrypto + Drizzle RBAC vs. `better-auth@1.7.18` vs. Auth.js)
- **Proposed Choice:** Evaluate **`better-auth@1.7.18` (with `@better-auth/drizzle-adapter`)** alongside a **Custom WebCrypto + Drizzle Session Service** during Phase 02 POC, mapped directly to our 7 security tables (`users`, `sessions`, `roles`, `permissions`, `role_permissions`, `login_attempts`, `audit_logs`).
- **Alternatives:**
  - *Clerk / Auth0:* External SaaS dependency, recurring per-MAU cost, and split user state outside our authoritative D1 database.
  - *NextAuth / Auth.js v5:* Historical friction with Cloudflare Workers edge runtime, implicit Node crypto dependencies, and rigid schema expectations that conflict with custom RBAC and `login_attempts` tracking.
- **Advantages of Selected Direction:**
  - Runs 100% on `workerd` Web Crypto API (`crypto.subtle` PBKDF2-SHA256 / SHA-256 session token hashing).
  - Stores all session, role, permission, rate-limit (`login_attempts`), and audit (`audit_logs`) records in our single D1 database.
  - Uses strict `HttpOnly; Secure; SameSite=Lax` cookies with zero tokens exposed to `localStorage`.
- **Recommendation:** **Accepted for Phase 02 POC Validation (High Confidence).**

---

### 2.4 File & Media Storage (Cloudflare R2 + `aws4fetch`)
- **Proposed Choice:** Cloudflare R2 bucket (`projukti-labs-assets`) with browser-to-R2 presigned `PUT` uploads signed via `aws4fetch` and verified via Worker `env.R2_BUCKET.head()`.
- **Alternatives:**
  - *AWS S3:* Charges egress bandwidth fees on every public portfolio/blog image view.
  - *Streaming files through Worker body:* Hits Worker memory/CPU limits on large high-resolution portfolio galleries or PDF case studies.
- **Advantages:** Zero egress fees, global Cloudflare CDN caching on custom domain (`assets.projuktilabs.tech`), zero Worker memory pressure during upload.
- **Recommendation:** **Accepted (High Confidence).**

---

### 2.5 Background Jobs & Automation (Cloudflare Workflows + Queues + Cron)
- **Proposed Choice:** Cloudflare Workflows for durable multi-step pipelines (blog publication, SEO audit, weekly reports) + Cloudflare Queues for buffered event ingestion (inquiry email dispatch, media post-processing) + Cron Triggers for scheduled wakeups.
- **Alternatives:**
  - *Inngest / Trigger.dev:* Adds third-party SaaS dependencies and external webhook signing overhead.
  - *Unmonitored `waitUntil()` promises:* Limited to 30 seconds after response and lacks durable retries or dead-letter recovery.
- **Advantages:** Native binding integration (`env.WORKFLOW`, `env.QUEUE`), step-level retry persistence, mirrored status tracking in D1 `automation_jobs` and `automation_logs`.
- **Recommendation:** **Accepted (High Confidence).**

