# 06 — Runtime Compatibility Matrix

**Target Runtime:** Cloudflare Workers (`workerd` V8 Isolate Runtime with `nodejs_compat`)  
**Target Build Adapter:** `vinext@1.4.3` + `@cloudflare/vite-plugin@1.67.0` (Fallback: `@opennextjs/cloudflare@1.20.16`)  
**Framework Baseline:** Next.js `16.4.5` + React `19.3.0`  

---

## 1. Next.js 16.4.5 + `vinext` + Cloudflare Workers Matrix

| Feature / Capability | Officially Documented Support | Known Limitation on `vinext` / Workers | Planned Workaround / Architecture Pattern | Required Phase 02 POC | Risk Level | Decision |
|---|---|---|---|---|---|---|
| **App Router Layouts & Pages (`app/**/page.tsx`)** | Supported in `vinext` & OpenNext | Next.js 16 requires `params` and `searchParams` to be `await`ed (`Promise`) | Always `await params` and `await searchParams` per Next.js 16 contract | POC-01: Render nested public & admin layouts on `wrangler dev` | Low | **Use** |
| **React Server Components (RSC) & Streaming** | Supported in `vinext` | CPU time limit per invocation (default 30s standard / 5m unbound on Paid Workers) | Keep RSC data fetches indexed (<50ms D1 queries); offload slow tasks to Queues/Workflows | POC-02: RSC query to D1 with Suspense boundary | Low | **Use** |
| **Client Components (`"use client"`)** | Supported | Hydration payload increases bundle size if overused | Restrict `"use client"` to interactive islands (forms, filters, dialogs, editors) | POC-01 | Low | **Use** |
| **Route Handlers (`app/api/v1/**/route.ts`)** | Supported (`Request` / `Response` Web APIs) | Node `req`/`res` streams not used; uses standard Web `Request`/`Response` | Write all `/api/v1/*` handlers using Web Standard `Request` and `NextResponse.json()` | POC-03: JSON Route Handler reading D1 & KV | Low | **Use** |
| **Server Actions (`"use server"`)** | Supported in `vinext` | Harder to attach external webhook signatures or versioned public API rate limits | Use `/api/v1/*` Route Handlers for public mutations & external hooks; optional Server Actions for internal Admin UI mutations | POC-04: Admin mutation test | Medium | **Use Route Handlers as primary contract** |
| **Middleware (`middleware.ts` / `proxy.ts`)** | Supported | Next.js 16 evolves middleware conventions; heavy DB calls in middleware add latency to all routes | Keep middleware lightweight (cookie presence check + security headers + redirects); verify session in D1 inside `/admin` layout/API guard | POC-05: Admin route guard & redirect check | Medium | **Use lightweight edge guard** |
| **Experimental `"use cache"` & `cacheComponents`** | Partial in `vinext` | `vinext` does not fully replicate Next.js 16 `"use cache"` profiles or PPR resume semantics | **Do NOT use `"use cache"`**. Use explicit `lib/cache` wrapper over Cloudflare Cache API + KV with explicit key invalidation on CMS publish | POC-06: Cache read/invalidate test | High (if used) → Low (avoided) | **Avoid `"use cache"`; use explicit Cache API / KV** |
| **`generateMetadata`, `sitemap.ts`, `robots.ts`** | Supported | Dynamic DB queries in `sitemap.ts` must handle cold D1 reads cleanly | Query indexed `slug` + `updated_at` from D1 and cache XML output in Cloudflare Cache API / KV | POC-07: Dynamic `/sitemap.xml` & `/robots.txt` | Low | **Use** |
| **Image Optimization (`next/image`)** | Partial in `vinext` | Native `sharp` C++ binary cannot run in `workerd`; build-time image optimization not identical | Configure custom `imageLoader` in `next.config.ts` pointing to Cloudflare Images transformation URL (`/cdn-cgi/image/...`) or pre-optimized WebP/AVIF in R2 | POC-08: Responsive image loader test | Medium | **Use custom Cloudflare R2/Images loader** |
| **Font Optimization (`next/font/google`)** | Partial in `vinext` | `vinext` loads Google Fonts via CDN CSS or local font injection rather than Next's build-time extractor | Self-host variable `.woff2` files for `Geist`, `Hind Siliguri`, and `Caveat` in `public/fonts/` with `font-display: swap` for deterministic zero-external-hop loading | POC-09: Self-hosted variable `.woff2` font test | Low | **Self-host `.woff2` fonts in `public/fonts/`** |
| **Tailwind CSS v4 (`@tailwindcss/turbopack`)** | Requires Vite plugin under `vinext` | `create-next-app@16.4.5` installs `@tailwindcss/turbopack`, which is specific to Next's Turbopack | Add `@tailwindcss/vite` (or `@tailwindcss/postcss`) when configuring `vite.config.ts` for `vinext` in Phase 02 | POC-01: Verify Tailwind v4 CSS compilation in `vinext` | Medium | **Validate in Phase 02 POC** |
| **Node.js APIs (`nodejs_compat`)** | Partial (`node:crypto`, `node:buffer`, `node:AsyncLocalStorage`) | `node:fs`, `node:child_process`, native addons (`bcrypt`, `sharp`) unsupported at runtime | Enforce Web-standard APIs (`crypto.subtle`, `fetch`, `WebSocket`, `TextEncoder`) across all runtime modules | POC-10: Auth hashing & R2 presigning in `workerd` | Low | **Enforce Web Standard APIs** |

---

## 2. Cloudflare Platform Primitives Compatibility Matrix

| Primitive | Binding Type | Local Dev (`wrangler dev`) | Preview Deployment | Production Limits & Constraints | Required Phase 02 POC |
|---|---|---|---|---|---|
| **Cloudflare D1** | `env.DB` (`D1Database`) | Local SQLite persisted in `.wrangler/state/v3/d1` | Isolated Preview D1 DB (`projukti_labs_db_preview`) | 10 GB max size; single-threaded writer; max 100 bound params/query; max 100 KB SQL statement | POC-11: Drizzle migration + `db.batch()` CRUD |
| **Cloudflare R2** | `env.R2_BUCKET` (`R2Bucket`) + S3 API | Local R2 emulation + remote dev bucket for presigned URL tests | Isolated Preview R2 bucket (`projukti-labs-assets-preview`) | Presigned URLs require S3 endpoint + `aws4fetch`; `env.R2_BUCKET.head()` verifies completion | POC-12: Presigned PUT + `head()` verification |
| **Cloudflare KV** | `env.KV_CACHE` (`KVNamespace`) | Local KV emulation in `.wrangler/state` | Isolated Preview KV namespace | Eventually consistent (up to 60s global propagation); max 25 MB value size; 1 write/sec per same key limit | POC-06: Cache get/put/delete |
| **Cloudflare Queues** | `env.JOBS_QUEUE` (`Queue`) | Supported in Wrangler v4 local dev | Preview Queue | Requires Workers Paid plan; max 128 KB message payload; supports automatic retries & DLQ | POC-13: Enqueue & consume test message |
| **Cloudflare Workflows** | `env.PUBLISH_WORKFLOW` (`Workflow`) | Supported in Wrangler v4 (`wrangler dev`) | Preview Workflow | Requires Workers Paid plan; max 1 MB state per step; durable `step.do()` retry semantics | POC-14: 2-step durable workflow execution |
| **Cloudflare Turnstile** | HTTPS `siteverify` API | Official Dummy Sitekey (`1x00000000000000000000AA`) & Secret | Preview hostname allowlisted | Token valid for 300 seconds (5 minutes) and single-use only; must verify on server | POC-15: Dummy token server validation |

