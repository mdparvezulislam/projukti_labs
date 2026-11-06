# 03 — Technical Research and Official Sources

**Research Date:** 2026-11-06  
**Scope:** Verification of Cloudflare Edge Runtime, `vinext`, Next.js 16.4.5, D1, Drizzle ORM, R2, KV, Queues, Workflows, Turnstile, and Authentication compatibility.

---

## 1. Local Package Registry Verification (`2026-11-06`)

All candidate packages were queried against the live npm registry using `pnpm view` from `/Users/parvez/CODE/projukti_labs`:

| Package | Verified Latest Version | Status in Workspace |
|---|---|---|
| `next` | `16.4.5` | Installed in `package.json` |
| `react` / `react-dom` | `19.3.0` (`19.3.1` available) | Installed in `package.json` |
| `tailwindcss` | `4.3.4` | Installed in `package.json` |
| `typescript` | `5.9.3` | Installed in `package.json` |
| `wrangler` | `4.158.0` | Installed globally on host |
| `vinext` | `1.4.3` | Candidate for Phase 02 POC |
| `@cloudflare/vite-plugin` | Checked in Phase 02 | Candidate for Phase 02 POC |
| `@opennextjs/cloudflare` | Verified active | Fallback adapter if `vinext` blocks |
| `drizzle-orm` / `drizzle-kit` | Verified active | Candidate for Phase 02 POC |
| `better-auth` | Verified active | Candidate for Phase 02 POC |

---

## 2. Primary Technical Research Findings

### 2.1 `vinext` & Next.js 16 on Cloudflare Workers
- **What is Confirmed:**
  - `vinext` (currently `v1.4.3`) is Cloudflare's Vite-based plugin and compatibility layer that reimplements the public Next.js API surface (App Router & Pages Router) so Next.js applications compile via Vite and deploy directly to Cloudflare Workers (`workerd`).
  - `vinext` includes a built-in CLI scanner (`npx vinext check`) to audit an existing Next.js project for unsupported imports or conventions before deployment.
  - Core App Router primitives—nested layouts, React Server Components (RSC), Client Components, Route Handlers (`app/api/.../route.ts`), Server Actions, dynamic route segments (`[slug]`), `generateMetadata`, `sitemap.ts`, and `robots.ts`—are supported in `vinext`.
- **Known Limitations & Differences from Node.js Next.js:**
  1. **Experimental Next.js 16 Caching (`"use cache"` & `cacheComponents`):** Only partially implemented in `vinext`. Cache profiles, fine-grained tag revalidation, and Partial Prerendering (PPR) shells do not behave identically to Vercel/Node Next.js 16.
  2. **Build-Time Font & Image Pipelines:** `vinext` does not run Next.js's heavy build-time `sharp` image optimization pipeline. Request-time image optimization relies on Cloudflare Images bindings or custom loaders; Google Fonts are loaded via CSS/CDN rather than build-time self-extraction.
  3. **Turbopack vs. Vite:** `create-next-app@16.4.5` scaffolds `@tailwindcss/turbopack`. Under `vinext`, Vite is the bundler, meaning Tailwind CSS v4 should use `@tailwindcss/vite` or PostCSS so styles compile cleanly in both dev and production builds.
- **Official References:**
  - Cloudflare Workers Next.js Guide: `https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/` (Reviewed: 2026-11-06)
  - Cloudflare `vinext` Repository & Compatibility Docs: `https://github.com/cloudflare/vinext` (Reviewed: 2026-11-06)
  - OpenNext Cloudflare Adapter (Fallback): `https://opennext.js.org/cloudflare` (Reviewed: 2026-11-06)

---

### 2.2 Cloudflare D1 & Drizzle ORM (`drizzle-orm/d1`)
- **What is Confirmed:**
  - Cloudflare D1 is a managed serverless relational database built on SQLite.
  - Drizzle ORM provides a first-class driver (`drizzle-orm/d1`) and migration generator (`drizzle-kit` with `dialect: "sqlite"`).
  - Foreign keys are enforced by default in D1 (`PRAGMA foreign_keys = ON`).
  - Point-in-time recovery is built in via **D1 Time Travel** (`wrangler d1 time-travel restore`), retaining up to 30 days of minute-by-minute history on the Workers Paid plan (rate-limited to 10 restores per 10 minutes).
- **Hard Platform Limits (Must Design Around):**
  - **Maximum Database Size:** 10 GB per database (Workers Paid plan; 500 MB on Free plan).
  - **Execution Model:** Single-threaded query execution per database (single-writer queue). A slow unindexed query blocks subsequent queries on that database instance.
  - **Maximum SQL Statement Length:** 100,000 bytes (100 KB).
  - **Maximum Bound Parameters per Query:** 100 parameters per statement in D1 API bindings. (Wait: If a table has 10 columns, a multi-row `INSERT` can insert at most 10 rows per statement before hitting the 100-parameter ceiling!).
  - **Maximum Row / String / BLOB Size:** 2 MB (2,000,000 bytes).
  - **Transactions & Migrations:** D1 does not support stateful multi-roundtrip interactive TCP transactions across async network calls. Atomic multi-statement writes must use `db.batch([...])`. During schema migrations that alter tables with foreign keys, `PRAGMA defer_foreign_keys = ON;` must be used inside the migration transaction.
- **Official References:**
  - Cloudflare D1 Platform Limits: `https://developers.cloudflare.com/d1/platform/limits/` (Reviewed: 2026-11-06)
  - Cloudflare D1 Foreign Keys & Transactions: `https://developers.cloudflare.com/d1/build-with-d1/foreign-keys/` (Reviewed: 2026-11-06)
  - Cloudflare D1 Time Travel: `https://developers.cloudflare.com/d1/reference/time-travel/` (Reviewed: 2026-11-06)
  - Drizzle ORM D1 Documentation: `https://orm.drizzle.team/docs/connect-cloudflare-d1` (Reviewed: 2026-11-06)

---

### 2.3 Cloudflare R2 & Presigned Upload Architecture
- **What is Confirmed:**
  - Cloudflare R2 provides S3-compatible object storage with zero egress fees.
  - Worker bindings (`env.R2_BUCKET`) provide fast in-worker `.get()`, `.put()`, `.head()`, and `.delete()` operations, **but native R2 bindings do not expose a method to generate browser-facing presigned URLs**.
  - To generate S3-compatible presigned `PUT` URLs inside a Cloudflare Worker without heavy AWS SDK v3 Node.js dependencies, the official Cloudflare-recommended library is **`aws4fetch`**, which uses the standard Web Crypto API (`crypto.subtle`) and `fetch`.
  - After the browser uploads directly to R2 via the presigned `PUT` URL, the Worker verifies the uploaded object using `await env.R2_BUCKET.head(storageKey)` (checking actual byte size, `httpEtag`, and content type) before inserting the metadata row into D1 `media_assets`.
- **Official References:**
  - Cloudflare R2 Presigned URLs Guide: `https://developers.cloudflare.com/r2/api/s3/presigned-urls/` (Reviewed: 2026-11-06)
  - Cloudflare R2 Workers API Reference: `https://developers.cloudflare.com/r2/api/workers/workers-api-reference/` (Reviewed: 2026-11-06)

---

### 2.4 Cloudflare Workflows, Queues, KV & Cron Triggers
- **What is Confirmed:**
  - **Cloudflare Workflows** (`WorkflowEntrypoint`, `step.do`, `step.sleep`, `step.sleepUntil`) provide durable, multi-step background execution with automatic per-step retries, state persistence, and observability. Workflows can be triggered via HTTP/Worker bindings, Queues, or Cron schedules.
  - **Cloudflare Queues** provide guaranteed asynchronous message delivery with configurable batching, retries, and Dead Letter Queues (DLQ).
  - **Cloudflare KV** is an eventually consistent, low-latency key-value store (reads are fast at edge POPs; writes take up to 60 seconds to propagate globally). KV must **never** be used as an authoritative transactional store, only for read-heavy cached payloads and edge configuration snapshots.
- **Official References:**
  - Cloudflare Workflows Documentation: `https://developers.cloudflare.com/workflows/` (Reviewed: 2026-11-06)
  - Cloudflare Queues Documentation: `https://developers.cloudflare.com/queues/` (Reviewed: 2026-11-06)
  - Cloudflare KV Documentation: `https://developers.cloudflare.com/kv/` (Reviewed: 2026-11-06)

---

### 2.5 Authentication on Cloudflare Workers (`workerd`)
- **What is Confirmed:**
  - Traditional Node.js password hashing libraries (`bcrypt`, native `argon2`) fail on Cloudflare Workers because they require native C++ addons.
  - **Better Auth** (`better-auth` + `@better-auth/drizzle-adapter`) natively supports Cloudflare Workers (`workerd`), Drizzle ORM (`provider: "sqlite"`), and D1 per-request bindings (`createAuth(env.DB)`), using Web Crypto API primitives (`crypto.subtle`) for hashing and token generation.
  - Alternatively, a lightweight **Custom WebCrypto + Oslo (`@oslojs/crypto`, `@oslojs/encoding`) Session Manager** (~150 LOC) over D1 `users` and `sessions` tables using `PBKDF2-HMAC-SHA256` (or pure-JS `@noble/hashes/scrypt`) with `SHA-256` hashed session tokens in `HttpOnly; Secure; SameSite=Lax` cookies provides zero-magic control over our exact 7 RBAC tables (`users`, `sessions`, `roles`, `permissions`, `role_permissions`, `login_attempts`, `audit_logs`).
- **Official References:**
  - Better Auth Drizzle & Cloudflare Workers Guide: `https://www.better-auth.com/docs/adapters/drizzle` (Reviewed: 2026-11-06)
  - Cloudflare Web Crypto API Docs: `https://developers.cloudflare.com/workers/runtime-apis/web-crypto/` (Reviewed: 2026-11-06)

