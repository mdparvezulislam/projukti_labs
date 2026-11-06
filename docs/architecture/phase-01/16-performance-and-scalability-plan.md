# 16 — Performance, Core Web Vitals & Scalability Plan

**Project:** Projukti Labs (`projuktilabs.tech`)  
**Engineering Principle:** Performance is an architectural constraint enforced at the component, query, and edge-caching levels—not an afterthought.

---

## 1. Core Web Vitals & Lighthouse Targets (Engineering Goals)

*Disclaimer: The metrics below are strict engineering targets to be validated via Playwright Lighthouse audits and real-device testing in Phase 13/14, not pre-claimed results.*

| Metric | Target Threshold | Primary Engineering Levers |
|---|---|---|
| **Largest Contentful Paint (LCP)** | `<= 2.5s` (Target `< 1.8s` on 4G/Fast Edge) | Server-first RSC HTML streaming, edge-cached public pages via Cloudflare Cache API, `fetchPriority="high"` on hero visual, self-hosted preloaded `.woff2` variable fonts. |
| **Interaction to Next Paint (INP)** | `<= 200ms` (Target `< 100ms`) | Minimal client-side JS hydration; avoid heavy React re-renders on scroll; offload validation and filtering to lightweight islands. |
| **Cumulative Layout Shift (CLS)** | `<= 0.1` (Target `< 0.02`) | Explicit `width`/`height` or `aspect-ratio` on all `media_assets`, size-matched `font-display: swap` fallbacks, fixed-height Turnstile widget container (`65px`), skeleton placeholders matching final card geometry. |
| **Lighthouse Performance** | `>= 90` (Mobile & Desktop) | Tree-shaken icons (`lucide-react` individual imports), zero unused third-party scripts on initial load. |
| **Lighthouse Accessibility** | `>= 95` | Semantic landmarks, WCAG AA/AAA token contrast (`#FAFAFA` / `#FFDF20` on `#09090B`), keyboard focus rings, >= 44×44px mobile touch targets. |
| **Lighthouse SEO** | `>= 95` | Complete dynamic metadata, canonical URLs, JSON-LD schemas, semantic heading hierarchy. |

---

## 2. Rendering & Caching Strategy (Cloudflare Workers + D1 + KV)

Because Cloudflare D1 processes writes and uncached reads through a single-threaded SQLite instance per database, **public read traffic must be absorbed at the Cloudflare Edge Cache / KV layer** so D1 handles < 5% of public page views:

1. **Tier 1 — Cloudflare Cache API (Edge POP Cache):**
   - Public pages (`/`, `/services`, `/services/[slug]`, `/portfolio`, `/blog/[slug]`) and public GET APIs (`/api/v1/services`, `/api/v1/blog/posts`) cache rendered responses or serialized JSON read models with `Cache-Control: public, s-maxage=300, stale-while-revalidate=3600`.
2. **Tier 2 — Cloudflare KV Read-Through Cache (`projukti-labs-cache`):**
   - Stores pre-computed JSON payloads for high-frequency composite reads:
     - `cache:site:public_settings` (Navigation, footer, announcement bar)
     - `cache:homepage:sections` (Structured Homepage Builder payload)
     - `cache:services:catalog` (3 Active Categories + Productized Services list)
     - `cache:sitemap:xml` (Generated XML sitemap)
   - **Deterministic Invalidation:** Whenever an Admin publishes or updates an entity in `/admin/*`, the domain service immediately deletes the corresponding KV keys (`await env.KV_CACHE.delete(...)`) and purges the Edge Cache URL.
3. **Tier 3 — Indexed Cloudflare D1 Queries:**
   - Every `WHERE` and `ORDER BY` clause on public and admin queries must hit a composite index verified via `EXPLAIN QUERY PLAN`.
   - Admin tables (`/admin/inquiries`, `/admin/leads`, `/admin/posts`, `/admin/system/audit-logs`) enforce strict cursor or page-size pagination (`default: 20`, `max: 100`).

---

## 3. Media & Image Optimization under `vinext` / Cloudflare Workers

Because native Node.js `sharp` binaries cannot run inside the `workerd` V8 isolate:
1. **Upload-Time Dimensions & Format Check:** Before uploading or inside the Admin Media Uploader, images are inspected for `width` and `height` (stored in `media_assets.width` and `media_assets.height` to prevent CLS) and converted to WebP/AVIF where supported.
2. **Custom `next/image` Loader:** Configured in `next.config.ts` to serve responsive `srcset` widths (`384w`, `640w`, `828w`, `1200w`, `1920w`) via Cloudflare Images transformation URLs (`/cdn-cgi/image/width=...,quality=82,format=auto/...`) or directly from `assets.projuktilabs.tech` (R2 + Cloudflare CDN).

---

## 4. Mobile Performance & Reduced-Motion Engineering

- **Zero Heavy GPU Blur Loops on Mobile:** Ambient hero glows use static radial CSS gradients on viewports `< 768px` instead of animated `filter: blur(120px)` layers that drain mobile battery and drop frame rates.
- **Strict Client Bundle Budget:** Public marketing pages target `< 95 KB` compressed initial client JavaScript. Rich text/MDX authoring (`@tiptap` or CodeMirror) and Kanban boards are dynamically imported exclusively inside `/admin/*` routes.

