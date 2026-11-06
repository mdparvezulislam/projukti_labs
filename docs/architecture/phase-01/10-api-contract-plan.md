# 10 — API Contract & Endpoint Architecture Plan

**Base URL:** `/api/v1`  
**Protocol:** HTTPS JSON REST API + Next.js Server Component direct module invocation  
**Validation Engine:** Zod (`4.6.7`) at every request boundary  

---

## 1. Architectural Rule: When to Use Route Handlers vs. Direct Module Calls

To avoid duplicate interfaces or unnecessary self-HTTP fetches inside Cloudflare Workers:
1. **Server Components (`app/(public)/**`, `app/admin/**`):** Call Domain Module read services directly in-process (e.g., `await ServicesModule.listActiveServices(db)`), sharing the exact same TypeScript return types and cache layer as the API.
2. **Versioned Route Handlers (`/api/v1/*`):** Used for all client-side mutations (public inquiries, admin CRUD forms, R2 presigned upload coordination), authentication flows, client-side search/filtering, and internal automation webhooks.

---

## 2. Standard JSON Response & Error Envelope

Every `/api/v1/*` endpoint returns a deterministic envelope with an `X-Request-Id` header:

### 2.1 Success Envelope (`200 OK` / `201 Created`)
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "requestId": "req_01J...",
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "totalItems": 42,
      "totalPages": 3
    }
  }
}
```

### 2.2 Error Envelope (`400` / `401` / `403` / `404` / `409` / `422` / `429` / `500`)
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid project inquiry payload.",
    "fieldErrors": {
      "email": ["Please enter a valid email address."],
      "turnstileToken": ["Bot verification token is required."]
    },
    "requestId": "req_01J..."
  }
}
```

---

## 3. Complete Endpoint Catalog (`/api/v1`)

### 3.1 Public Content Read APIs (`Auth: Public` | `Cache: Edge + KV`)

| Method | Route | Purpose | Query Params / Filtering | Rate Limit |
|---|---|---|---|---|
| `GET` | `/api/v1/service-categories` | List active & coming-soon categories | `?mode=active\|all` | 120 req/min/IP |
| `GET` | `/api/v1/services` | List published services & productized packages | `?category=slug&featured=true` | 120 req/min/IP |
| `GET` | `/api/v1/services/:slug` | Full service landing page payload, packages, FAQs | — | 120 req/min/IP |
| `GET` | `/api/v1/projects` | Portfolio items with category/tech filtering | `?category=slug&tech=nextjs&page=1&pageSize=12` | 120 req/min/IP |
| `GET` | `/api/v1/projects/:slug` | Single portfolio project + gallery + linked services | — | 120 req/min/IP |
| `GET` | `/api/v1/case-studies` | Published engineering case studies | `?page=1&pageSize=10` | 120 req/min/IP |
| `GET` | `/api/v1/case-studies/:slug` | Full case study MDX + architecture highlights | — | 120 req/min/IP |
| `GET` | `/api/v1/blog/posts` | Paginated published blog articles | `?category=slug&tag=slug&q=search&page=1` | 120 req/min/IP |
| `GET` | `/api/v1/blog/posts/:slug` | Single blog post + author + related posts | — | 120 req/min/IP |
| `GET` | `/api/v1/blog/categories` | Blog categories with published post counts | — | 120 req/min/IP |
| `GET` | `/api/v1/blog/tags` | Blog tags with published post counts | — | 120 req/min/IP |
| `GET` | `/api/v1/site/settings/public` | Public brand settings, social links, navigation, announcement bar | — | 180 req/min/IP |
| `GET` | `/api/v1/search` | Unified public search across services, portfolio, and blog | `?q=ecommerce&limit=10` | 60 req/min/IP |

---

### 3.2 Public Inquiry & Acquisition APIs (`Auth: Public + Turnstile` | `Idempotent`)

| Method | Route | Purpose | Validation & Security Rules | Rate Limit |
|---|---|---|---|---|
| `POST` | `/api/v1/inquiries` | Submit `/contact` or `/get-a-quote` project brief | Requires `turnstileToken`, `Idempotency-Key` header, Zod schema; creates `inquiries` + `leads` (`stage='new'`) atomically and enqueues notification job. | 5 req / 10 min / IP |
| `GET` | `/api/v1/inquiries/status/:reference` | Check public inquiry status by reference code (`PL-2026-XXXX`) + email match | Requires `?email=...` query match; returns non-sensitive status (`received`, `under_review`, `contacted`). | 15 req / 10 min / IP |
| `POST` | `/api/v1/consultation-requests` | Request discovery call / technical consultation | Requires `turnstileToken` + preferred timezone/slot window; creates inquiry (`type='consultation'`) + lead. | 5 req / 10 min / IP |
| `POST` | `/api/v1/newsletter/subscribe` | Subscribe to Projukti Labs engineering digest | Requires `turnstileToken` + normalized email; idempotent upsert. | 5 req / 10 min / IP |

---

### 3.3 Authentication APIs (`Auth: Session / Public with Turnstile`)

| Method | Route | Purpose | Security & Cookie Behavior | Rate Limit |
|---|---|---|---|---|
| `POST` | `/api/v1/auth/login` | Admin credential login (+ optional TOTP code) | Checks `login_attempts` (max 5/15m), Turnstile, password hash; sets `__Host-pl_session` HttpOnly cookie; logs to `audit_logs`. | 5 req / 15 min / IP+Email |
| `POST` | `/api/v1/auth/logout` | Revoke current session | Sets `sessions.revoked_at`, clears `__Host-pl_session` cookie. | Authenticated |
| `GET` | `/api/v1/auth/session` | Inspect active admin user, role, and permission codes | Reads session cookie → verifies D1 `sessions.token_hash`. | Authenticated |
| `POST` | `/api/v1/auth/refresh` | Sliding session window extension | Extends `expires_at` if session is active and within renewal window. | Authenticated |
| `POST` | `/api/v1/auth/password/forgot` | Request password reset link | Sends time-limited (15m) signed reset token via Email Adapter; always returns `200 OK` to prevent email enumeration. | 3 req / 30 min / IP |
| `POST` | `/api/v1/auth/password/reset` | Complete password reset | Verifies token hash, updates `password_hash`, revokes all existing sessions for that user. | 5 req / 15 min / IP |

---

### 3.4 Admin Service, Portfolio & CMS APIs (`Auth: Session + RBAC Permission`)

| Method | Route | Required Permission | Purpose & Side Effects |
|---|---|---|---|
| `GET` / `POST` | `/api/v1/admin/service-categories` | `services:read` / `services:write` | List or create service categories (`active`, `coming_soon`, `partner_supported`). |
| `PATCH` | `/api/v1/admin/service-categories/:id` | `services:write` | Update category status, order, or copy; invalidates service cache. |
| `GET` / `POST` | `/api/v1/admin/services` | `services:read` / `services:write` | List all services (including drafts) or create new productized service. |
| `GET` / `PATCH` / `DELETE` | `/api/v1/admin/services/:id` | `services:write` | Get, update (packages, features, FAQs, `layout_variant`), or soft-delete service. |
| `POST` | `/api/v1/admin/services/:id/publish` | `services:publish` | Validates required deliverables/SEO fields, sets `status='published'`, revalidates cache & sitemap. |
| `POST` | `/api/v1/admin/services/:id/duplicate` | `services:write` | Clones service structure into a new `draft` with `-copy` slug. |
| `GET` / `POST` / `PATCH` | `/api/v1/admin/projects` & `/case-studies` | `portfolio:write` | Full CRUD for portfolio projects, galleries, and engineering case studies. |
| `GET` / `PATCH` | `/api/v1/admin/cms/homepage` | `cms:write` | Read/update structured `page_sections` for the Homepage Builder. |

---

### 3.5 Admin Blog & Editorial Workflow APIs (`Auth: Session + RBAC`)

| Method | Route | Required Permission | Purpose & Editorial Guardrails |
|---|---|---|---|
| `GET` / `POST` | `/api/v1/admin/posts` | `blog:read` / `blog:write` | Filter articles by status (`draft`, `in_review`, `scheduled`, `published`) or create new draft. |
| `GET` / `PATCH` | `/api/v1/admin/posts/:id` | `blog:write` | Fetch or update article content, tags, category, SEO metadata. |
| `POST` | `/api/v1/admin/posts/:id/revisions` | `blog:write` | Create immutable snapshot in `post_revisions` (`GET` lists revision history). |
| `POST` | `/api/v1/admin/posts/:id/seo-audit` | `blog:write` | Runs deterministic Content & SEO Audit (heading hierarchy, meta length, missing alt text, broken links, internal link suggestions) and stores score. |
| `POST` | `/api/v1/admin/posts/:id/publish` | `blog:publish` | **Enforces Editorial Approval Gate:** sets `approved_by_user_id`, `status='published'`, triggers `BlogPublishWorkflow` (cache, sitemap, RSS, social draft). |
| `POST` | `/api/v1/admin/posts/:id/schedule` | `blog:publish` | Requires human approval + future `scheduledFor` timestamp; schedules publication workflow. |
| `POST` | `/api/v1/admin/posts/:id/unpublish` | `blog:publish` | Reverts article to `draft` and purges public cache. |

---

### 3.6 Admin Business, CRM, Media & Automation APIs (`Auth: Session + RBAC`)

- **Business & CRM (`crm:read`, `crm:write`):**
  - `GET /api/v1/admin/inquiries` — Paginated raw inquiries with filters.
  - `GET / POST /api/v1/admin/leads` — Kanban & table pipeline view (`new` → `won`/`lost`).
  - `GET / PATCH /api/v1/admin/leads/:id` — Update lead stage, assignee, estimated BDT/USD value, next follow-up date.
  - `POST /api/v1/admin/leads/:id/notes` & `GET /api/v1/admin/leads/:id/activities` — Append internal note and inspect chronological activity log.
  - `GET / POST / PATCH /api/v1/admin/follow-ups`, `/api/v1/admin/clients`, `/api/v1/admin/proposals`.
- **Media (`media:upload`, `media:manage`):**
  - `POST /api/v1/admin/media/upload-url` — Generates `aws4fetch` presigned R2 `PUT` URL.
  - `POST /api/v1/admin/media/complete` — Verifies object via `env.R2_BUCKET.head(key)` and inserts `media_assets` record.
  - `GET / PATCH / DELETE /api/v1/admin/media/:id` — Browse library, edit `alt_text`/metadata, or schedule orphan deletion.
- **Automation & Internal Triggers (`system:admin` / `X-Internal-Automation-Secret`):**
  - `GET /api/v1/admin/automation/jobs` & `/logs` — Inspect background job history and step logs.
  - `POST /api/v1/admin/automation/jobs/:id/retry` — Manually re-trigger a failed or dead-letter job.
  - `POST /api/v1/internal/automation/publish-due-posts`, `/seo-audit`, `/sitemap-refresh` — Secret-authenticated internal endpoints invoked by Cron/Workflows.

