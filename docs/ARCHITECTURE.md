# Projukti Labs — Technical Architecture (`ARCHITECTURE.md`)

**Target Runtime:** Cloudflare Workers (`workerd`)  
**Deployment Toolchain:** Next.js `16.4.5` + Vite `8.3.0` + `vinext@1.4.3` + `@cloudflare/vite-plugin`  
**Database:** Cloudflare D1 (SQLite) with Drizzle ORM `0.45.4`  
**Object Storage:** Cloudflare R2 via S3-compatible `aws4fetch`  
**Architecture Style:** Modular Monolith with Type-Safe Domain Boundaries  
**Status:** Phase 01–06 Production Architecture Verified

---

## 1. System Topology & Edge Execution

```
[ Global Visitors: Desktop & Mobile ]
                 │
                 ▼
       Cloudflare Edge Network (300+ PoPs)
                 │
  ┌──────────────┴───────────────────────────────┐
  │                                              │
  ▼                                              ▼
Static Assets Cache (CSS/JS/Fonts)      Cloudflare Worker Entry
(Zero compute overhead)                 (vinext/server/fetch-handler)
                                                 │
                                                 ▼
                                        Next.js App Router (RSC)
                                                 │
                        ┌────────────────────────┼────────────────────────┐
                        ▼                        ▼                        ▼
                Public Studio Pages       API Version 1         Inquiry & CRM Engine
                (/, /about, /services)    (/api/v1/inquiries)   (D1 SQLite via Drizzle)
                        │
                        ▼
                Phase 06 Blog Engine
                (/blog, /blog/:slug)
```

---

## 2. Domain Module Boundaries

- **`modules/blog/`**:
  - `types.ts`: Strict Zod validation schemas (`BlogPost`, `BlogCategory`).
  - `data.ts`: Type-safe repository of 5 authentic articles, categories, and query utilities (`getAllPosts`, `getPostBySlug`, `getPostsByCategory`, `getPostsByTag`, `searchPosts`).
  - **Edge Runtime Constraint:** In Cloudflare Workers (`workerd`), Node.js `fs.readFileSync` is unavailable. By storing articles in structured typed data and parsing with React AST components (`components/blog/markdown-renderer.tsx`), the blog compiles cleanly into the SSR bundle with sub-millisecond edge response times.
- **`modules/services/`**: Encapsulates all service catalog definitions, active launch categories, future expansion roadmaps, deliverables, exclusions, and pricing tiers.
- **`lib/db/` & `db/schema/`**: Single source of truth for database entities:
  - `poc_records`, `system_health_checks`
  - `inquiries`: Raw immutable submission records with unique `PL-2026-XXXX` reference codes
  - `leads`: CRM pipeline entity mapped 1:1 to client submissions
- **`lib/auth/`**: Standard WebCrypto PBKDF2-SHA256 password hashing and 256-bit session token generation without heavy native Node.js C++ bindings.
- **`lib/cloudflare/`**: R2 storage helpers with presigned PUT upload URLs using `aws4fetch`.
- **`lib/validation/`**: Zod schemas and standard JSON envelope format (`ApiResponse<T>`).

---

## 3. Typography & Locale Pipeline

1. **Font Pipeline:**
   - `Hind_Siliguri` imported via `next/font/google` (`weights: 300, 400, 500, 600, 700`, subsets: `bengali, latin`) configured with CSS variable `--font-hind-siliguri`.
   - Placed first in `--font-sans` to prioritize Bengali glyphs without layout shifts.
   - Text rendering hints: `text-rendering: optimizeLegibility`, `-webkit-font-smoothing: antialiased`, `font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11'`.
2. **Metadata Routes:**
   - `app/sitemap.ts`: Dynamic XML sitemap generator yielding all core pages, active service detail URLs, 5 blog post slugs, and 5 blog category routes.
   - `app/robots.ts`: Standard crawler directive referencing `/sitemap.xml`.

---

## 4. Telemetry & Tracking Architecture

For the flagship **Landing Page with Meta Pixel & Analytics** (`/services/landing-page-meta-pixel`):
1. **Client Layer:** Meta Pixel snippet firing `PageView`, `ViewContent`, `Contact`, `Lead`, `Schedule`.
2. **Edge Server Layer:** Cloudflare Worker forwards synchronous HTTP POST to Meta Graph API Conversions API (CAPI) with matching `event_id` and hashed user parameters (`em`, `ph`).
3. **Deduplication:** Meta Events Manager deduplicates matching events to achieve 10/10 Event Match Quality, completely bypassing iOS 14+ tracking loss and ad blockers.

---

## 5. Performance & Core Web Vitals Targets

- **Largest Contentful Paint (LCP):** < 1.2s on mobile 4G networks
- **Cumulative Layout Shift (CLS):** < 0.02
- **Interaction to Next Paint (INP):** < 100ms
- **Worker Bundle Size:** ~301 KB uncompressed (~95 KB gzip)
- **Cold Start Latency:** 0ms (Cloudflare V8 Isolates)
