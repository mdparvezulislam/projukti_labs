# Projukti Labs — Technical Architecture (`ARCHITECTURE.md`)

**Target Runtime:** Cloudflare Workers (`workerd`)  
**Deployment Toolchain:** Next.js `16.4.5` + Vite `8.3.0` + `vinext@1.4.3` + `@cloudflare/vite-plugin`  
**Database:** Cloudflare D1 (SQLite) with Drizzle ORM `0.45.4`  
**Object Storage:** Cloudflare R2 via S3-compatible `aws4fetch`  
**Architecture Style:** Modular Monolith with Type-Safe Domain Boundaries  
**Status:** Phase 01–17 Production Architecture, Live Cloudflare Workers & D1 Deployment Verified

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

---

## 6. Security Architecture & HTTP Hardening

1. **Security Headers Pipeline:**
   - Evaluated at both application edge SSR (`next.config.ts` headers) and static asset delivery (`public/_headers`).
   - `Content-Security-Policy`:
     - `default-src 'self'`: Strict default boundary.
     - `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com`: Supports React Server Components hydration and Cloudflare Turnstile anti-bot challenges.
     - `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`: Supports Google Fonts stylesheet integration and Tailwind v4 CSS variables.
     - `font-src 'self' https://fonts.gstatic.com data:`: Whitelists Hind Siliguri Bengali font glyph files.
     - `connect-src 'self' https://challenges.cloudflare.com`: Secure API telemetry and verification.
     - `img-src 'self' data: https:`: Allows safe data URLs and authenticated image CDNs.
     - `frame-ancestors 'none'`: Mitigates clickjacking completely.
   - `X-Content-Type-Options: nosniff`: Prevents MIME-sniffing exploits.
   - `X-Frame-Options: DENY`: Blocks framing across all origins.
   - `Referrer-Policy: strict-origin-when-cross-origin`: Shields referrer data on cross-origin requests.
   - `Permissions-Policy: camera=(), microphone=(), geolocation=()`: Disables unwanted browser hardware features.
   - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`: Enforces TLS across all user visits.

2. **API Route Defenses (`/api/v1/inquiries`):**
   - **Content-Type Enforcement:** Requires `application/json`; returns `415 Unsupported Media Type` otherwise.
   - **Payload Sizing:** Hard limit of 64 KB; returns `413 Payload Too Large`.
   - **Honeypot Trap:** Hidden field `website_url`. If populated by automated bots, silently accepts with a dummy reference code without persisting to D1.
   - **Rate Limiting & Duplicate Rejection:** In-memory tracking rejecting submissions with identical email addresses within 15 seconds (`429 Too Many Requests`).
   - **Privacy Preserving Telemetry:** Client IP address is never stored in plaintext; hashed via standard WebCrypto SHA-256 before logging or audit checks.
   - **Sanitized Failure Modes:** Raw D1/SQLite exceptions are caught, logged server-side via structured logger, and masked with user-friendly Bangla messages (`apiError("DATABASE_ERROR", ...)`).

---

## 7. Environment & Configuration Pipeline

1. **Type-Safe Configuration (`lib/env.ts`):**
   - Validated against a strict Zod schema enforcing `ENVIRONMENT` (`development` | `preview` | `production`), `APP_URL`, and Cloudflare service binding names (`DB`, `KV_CACHE`, `ASSETS_BUCKET`).
   - Cloudflare Worker execution context bindings resolved safely via `getCloudflareBindings()` checking `process.env` and Worker execution context.
2. **Secret Non-Leakage Standard:**
   - Helper function `getSafeEnvironmentSummary()` provides sanitized metadata without exposing sensitive tokens or internal keys.
   - `.env.example` committed to repository with all standard config keys, while `.dev.vars*` is strictly ignored in `.gitignore`.

---

## 8. Observability & Health Telemetry

1. **Structured Server Logger (`lib/logger.ts`):**
   - Emits structured JSON logs containing `timestamp`, `level` (`debug`, `info`, `warn`, `error`), `context`, and optional `requestId`.
   - **Automatic Credential Redaction:** Scans object payloads recursively and redacts fields matching sensitive patterns (`token`, `password`, `secret`, `authorization`, `cookie`, `creditcard`, `cvv`, `apikey`, `turnstilesecretkey`, `r2secretaccesskey`).
2. **Health Check Endpoint (`/api/v1/health`):**
   - Returns system operational status (`ok`), active edge runtime (`workerd`), environment label, dependency pings (D1 Database, R2 Object Storage, KV Cache), and request correlation ID (`meta.requestId`).

---

## 9. Database Reliability & D1 Disaster Recovery

1. **Single Authoritative Database:**
   - Cloudflare D1 SQLite is the sole production database. No competing databases or outside connection layers.
   - Schema defined exclusively via Drizzle ORM (`db/schema/index.ts`).
   - Migration integrity verified via `drizzle-kit check` (`pnpm db:check`).
2. **Disaster Recovery & Backup Procedures:**
   - **Point-in-Time Recovery:** Cloudflare D1 provides automated daily snapshots and continuous transaction logging on paid Workers plans.
   - **Pre-Migration Export:** Before running any schema migration on production, a manual snapshot is created:
     ```bash
     wrangler d1 export projukti_labs_db --remote --output="./db/backups/backup-$(date +%Y%m%d%H%M%S).sql"
     ```
   - **Emergency Restore:**
     ```bash
     wrangler d1 execute projukti_labs_db --remote --file="./db/backups/backup-TIMESTAMP.sql"
     ```

---

## 10. Production Deployment & Domain Routing Specification

1. **Domain & Route Configuration:**
   - **Target Domain:** `projuktilabs.tech`
   - **Cloudflare DNS:** Apex `@` mapped to Cloudflare Worker `projukti-labs-web` via Custom Domain route. `www.projuktilabs.tech` routed via CNAME or Worker Custom Domain.
   - **SSL/TLS Configuration:** Full (Strict) mode, Always Use HTTPS enabled, Minimum TLS 1.2, HSTS enabled.
2. **Deployment Execution Flow (When Authorized by Founder):**
   - Gate 1: `pnpm typecheck && pnpm lint && pnpm test && pnpm db:check`
   - Gate 2: Edge build verification via `pnpm run build:vinext`
   - Gate 3: D1 remote migration apply: `npx wrangler d1 migrations apply projukti_labs_db --remote`
   - Gate 4: Worker deployment: `pnpm run deploy:vinext`
   - Gate 5: Production smoke test (Health check, Inquiry submission, Mobile verification)
   - Rollback Procedure: Instant zero-downtime rollback using `wrangler rollback` to previous active deployment.

---

## 11. Admin Operating System Architecture (Phases 08–12)

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Admin Surface (/admin)                          │
│     Mobile App Shell (<768px: 5-Tab Bar)  |  Desktop (Collapsible)     │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   Unified Admin Security Gateway                       │
│    Cookie: pl_admin_session (HttpOnly, Secure, SameSite=Lax, 7-Day)   │
│    RBAC Matrix: owner > admin > editor > viewer                       │
│    Cryptographic Engine: WebCrypto PBKDF2 (100k iter) + SHA-256 tokens │
│    Audit Logger: admin_audit_logs (user, action, entity, diff, ip)     │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
           ┌─────────────────────────┼─────────────────────────┐
           ▼                         ▼                         ▼
┌─────────────────────┐   ┌─────────────────────┐   ┌─────────────────────┐
│  Admin REST APIs    │   │  CMS & Dynamic Web  │   │  CRM & Automation   │
│  (/api/admin/*)     │   │  (lib/cms/index.ts) │   │  (lib/crm, auto)    │
│  - 18 Endpoints     │   │  - Pages & Sections │   │  - Inquiries & Leads│
│  - Auth & Sessions  │   │  - Services & Pkgs  │   │  - Quotes & Clients │
│  - Content CRUD     │   │  - Blog & Portfolio │   │  - Event Processor  │
│  - CRM Operations   │   │  - Dynamic Fallback │   │  - Notifications    │
└──────────┬──────────┘   └──────────┬──────────┘   └──────────┬──────────┘
           │                         │                         │
           └─────────────────────────┼─────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│                  Universal D1 Client & Storage Layer                   │
│   Cloudflare Workers: bindings.DB (Native D1 isolate binding)          │
│   Node.js 22 Runtime: node:sqlite DatabaseSync direct file shim        │
│   Sole Authority: Cloudflare D1 (21 Entities via Drizzle ORM)          │
└────────────────────────────────────────────────────────────────────────┘
```

1. **Authentication, Session & RBAC Pipeline:**
   - **Password Security:** WebCrypto PBKDF2 with 100,000 iterations, 16-byte random salt, and SHA-256 digest (`lib/auth/crypto.ts`).
   - **Session Token Security:** 256-bit cryptographically secure random token generated client-side, stored hashed with SHA-256 in `admin_sessions`. Session cookie is `pl_admin_session`, flagged `HttpOnly`, `SameSite=Lax`, `Secure` in production, with a 7-day TTL.
   - **RBAC Governance:** 4 roles (`owner`, `admin`, `editor`, `viewer`). Actions are guarded by `requireAdminAuth(req, permission)`.
   - **Audit Trail:** Every mutating administrative action records an entry in `admin_audit_logs` capturing user ID, action name, target entity, timestamp, client IP, and user agent.

2. **21 D1 Entities (Authoritative Database Schema):**
   - **Authentication:** `adminUsers`, `adminSessions`, `adminAuditLogs`.
   - **CMS Content:** `siteSettings`, `pageSections`, `services`, `servicePackages`, `blogPosts`, `portfolioProjects`, `faqs`, `mediaAssets`.
   - **CRM & Sales:** `inquiries`, `leads`, `quotes`, `customers`, `internalNotes`.
   - **Automation & Telemetry:** `automationRules`, `automationRuns`, `notifications`, `poc_records`, `system_health_checks`.

3. **Universal D1 Execution Engine (`lib/db/index.ts`):**
   - In Cloudflare Workers production, uses the native `bindings.DB`.
   - In Node.js 22 (Next.js development, CLI bootstrap, Vitest test suite), uses a transparent D1 shim backed by built-in `node:sqlite` (`DatabaseSync`), directly reading and writing to the local Wrangler D1 SQLite file.

4. **Event-Driven Business Automation Engine (`lib/automation/processor.ts`):**
   - Business events triggered synchronously or asynchronously (`inquiry.created`, `lead.stage_changed`, `quote.created`, `blog.scheduled_publish`, `system.health_check`).
   - Rule Runner checks configured triggers and conditions in `automation_rules` and executes actions (`send_notification`, `create_lead_from_inquiry`, `notify_owner_high_value`).
   - Full execution history stored in `automation_runs` with error logging and retry support (`retryAutomationRun`).
   - In-app notification center (`notifications`) provides instant visibility for admin users.

5. **Dynamic CMS & Public Fallback Synchronization:**
   - Public pages query dynamic content via `lib/cms/index.ts` (`getCmsServices`, `getCmsBlogPosts`, `getCmsPortfolio`, `getCmsFaqs`, `getCmsPageSection`).
   - **Zero-Downtime Guarantee:** If database is cold, unseeded, or temporarily unreachable, helpers automatically return canonical code fallbacks without breaking the public website.

---

## 6. Cloudflare Production Infrastructure

- **Worker:** `projukti-labs-web` running on Cloudflare Workers edge runtime (`workerd`) via `@vinext/cloudflare` (Version: `69dadb7e-06de-41be-805b-2dfbe35c9ea6`).
- **Worker Entrypoint (`server/worker.ts`):** Unifies HTTP request handling (`fetch`) with Cloudflare Cron Triggers (`scheduled`).
- **Custom Domains:** `projuktilabs.tech` (Canonical Root Host) and `www.projuktilabs.tech` (HTTP 308 Permanent Canonical Redirect via `proxy.ts`).
- **Direct Worker URL:** `https://projukti-labs-web.uniquestorebd23.workers.dev`.
- **Cloudflare D1:** `projukti-labs-production` (`8b1097c3-c930-477f-b8bc-81a498ac0f41`) bound as `env.DB`, containing 25 tables with applied migrations `0000`, `0001`, `0002`, `0003`.
- **Cloudflare R2 Storage:** `projukti-labs-assets` bound as `env.R2_BUCKET`. Public streaming via `/api/media/[...key]` with immutable caching headers.
- **Cloudflare KV Cache:** `4c3a552b441e491c8d781f198bbb4316` bound as `env.KV_CACHE` and `env.VINEXT_KV_CACHE`.
- **Cloudflare Cron Trigger:** `schedule: * * * * *` executing automated background blog publishing and scheduled tasks.
- **Health Check Endpoint:** `/api/v1/health` providing live telemetry of database, storage, and cache dependencies.
- **KV Cache Namespace:** `4c3a552b441e491c8d781f198bbb4316` bound as `VINEXT_KV_CACHE` and `KV_CACHE`.
- **R2 Storage:** `projukti-labs-assets` bound as `env.R2_BUCKET`.
- **Health Check:** `/api/v1/health` returning live database, storage, and cache connectivity states.

---

## 7. Blog Publishing Studio & Content Architecture (Phase 17)

1. **Editorial Data Model & Schema Expansion:**
   - **`blog_posts`:** Expanded from 17 to 56 columns supporting rich editorial content, subtitle, `content_format` ('html' | 'markdown'), plain text extract, author attribution, cover image metadata, SEO meta tags, social cards (OG & Twitter), word count, reading time, heading count, paragraph count, and JSON-encoded Table of Contents.
   - **`blog_categories`:** Normalized categories with unique slugs, names, descriptions, and sort order.
   - **`blog_tags`:** Normalized tags with slug and usage timestamps.
   - **`blog_post_revisions`:** Append-only revision history storing article snapshots, author ID, and revision notes on every significant save.

2. **Deterministic Smart Content Extraction Engine (`lib/cms/blog-extractor.ts`):**
   - Pure, zero-dependency parser working synchronously across Cloudflare Workers and Node runtimes.
   - Extracts H1 / first-line title candidates and warns on multiple H1 elements.
   - Generates clean, URL-safe slugs with deterministic Bengali transliteration and collision resolution.
   - Computes reading time using a calibrated 180 words/min rate.
   - Derives H2–H4 hierarchy with stable anchor slugs for public Table of Contents navigation.
   - Scans and scores vocabulary to suggest relevant categories and tags with confidence ratings.

3. **HTML Sanitization & Security Policy (`lib/cms/sanitizer.ts`):**
   - Defense-in-depth HTML sanitizer built to execute safely in edge workers without heavy browser DOM libraries.
   - Strips `<script>`, `<style>`, `<iframe>`, `<object>`, `<embed>`, `<form>`, and comment blocks.
   - Purges all inline event handlers (`onclick`, `onload`, `onerror`, etc.).
   - Enforces safe URL protocols (`https:`, `http:`, `/`, `#`, `mailto:`) and blocks `javascript:`.
   - Automatically injects `target="_blank" rel="noopener noreferrer"` on external hyperlinks.

4. **Dual-Format Public Rendering Pipeline:**
   - `MarkdownRenderer` / `ArticleRenderer` dynamically detects whether stored content is HTML or Markdown.
   - For HTML: Applies strict sanitization and renders in Tailwind prose container with customized typography and responsive tables.
   - For Markdown: Parses AST lines into semantic React elements with code snippets and blockquotes.
   - Preserves 100% backward compatibility with pre-existing Markdown articles while seamlessly supporting modern rich text posts.

