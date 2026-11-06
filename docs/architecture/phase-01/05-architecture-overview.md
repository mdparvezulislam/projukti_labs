# 05 — Architecture Overview

**Project:** Projukti Labs (`projuktilabs.tech`)  
**Architectural Pattern:** Single-Repository Modular Monolith on Cloudflare Edge  
**Database Pattern:** Single-Business, Single Authoritative Cloudflare D1 Database  

---

## 1. System Context Diagram

Projukti Labs runs entirely at the Cloudflare Edge, minimizing network hops, eliminating egress costs, and keeping all compute, relational data, object storage, caching, and durable workflows inside a single unified platform boundary.

```mermaid
flowchart TD
    Visitor["Public Visitor (Desktop / Mobile 320px+)"]
    Admin["Founder & Admin Staff (RBAC Roles)"]

    subgraph Edge["Cloudflare Edge Security & Delivery"]
        DNS["Cloudflare DNS + SSL + CDN"]
        WAF["WAF + Rate Limiting + Turnstile Bot Verification"]
    end

    subgraph Compute["Cloudflare Workers Runtime (workerd)"]
        App["Next.js 16.4.5 App Router + vinext"]
        PublicUI["Public Website (SSR / RSC)"]
        AdminUI["Admin SaaS Control Panel (/admin/*)"]
        API["Versioned API Layer (/api/v1/*)"]
        Auth["WebCrypto Session & RBAC Guard"]
    end

    subgraph Storage["Cloudflare State & Storage Layer"]
        D1[("Cloudflare D1\nAuthoritative SQLite DB\n(projukti_labs_db)")]
        R2[("Cloudflare R2\nMedia & Asset Storage\n(projukti-labs-assets)")]
        KV[("Cloudflare KV\nEdge Cache & Rate Limits\n(projukti-labs-cache)")]
    end

    subgraph Async["Cloudflare Durable Automation Layer"]
        Queues["Cloudflare Queues\n(projukti-labs-jobs)"]
        Workflows["Cloudflare Workflows\n(Publish, SEO Audit, Reports)"]
        Cron["Cron Triggers\n(Scheduled Tasks)"]
    end

    ExternalEmail["Transactional Email Provider\n(Adapter: Resend / SES)"]

    Visitor --> DNS --> WAF --> PublicUI
    Visitor --> WAF --> API
    Admin --> DNS --> WAF --> Auth --> AdminUI
    Admin --> WAF --> Auth --> API

    PublicUI --> D1
    PublicUI --> KV
    AdminUI --> D1
    API --> D1
    API --> KV
    API --> R2
    Admin -. "Direct Presigned PUT Upload" .-> R2

    API --> Queues --> Workflows
    Cron --> Workflows
    Workflows --> D1
    Workflows --> R2
    Workflows --> KV
    Workflows --> ExternalEmail
```

---

## 2. Modular Monolith Application Architecture

Rather than scattering database queries inside React components or building microservices, the codebase enforces a strict **3-tier internal layering**:

1. **Presentation & Routing Layer (`app/`, `components/`):**
   - `app/(public)/*`: Server Components by default; fetches read models via Domain Module Services; renders tailored page compositions.
   - `app/admin/*`: Protected by middleware + server-side RBAC session verification; provides CMS and CRM management views.
   - `app/api/v1/*`: Versioned HTTP endpoints for public inquiries, auth, admin mutations, media upload signing, and internal workflow triggers.
2. **Domain Modules Layer (`modules/*`):**
   - Encapsulates all business logic, Zod input schemas, authorization assertions, cache invalidation calls, and Drizzle queries per bounded domain (`auth`, `services`, `portfolio`, `blog`, `inquiries`, `crm`, `maintenance`, `media`, `seo`, `notifications`, `automation`, `cms`).
3. **Infrastructure & Platform Layer (`lib/*`, `db/*`, `workflows/*`):**
   - `lib/db`: Per-request Drizzle D1 client factory (`getDb(env.DB)`).
   - `lib/cloudflare`: Binding accessors for R2, KV, Queues, Workflows, and Turnstile verification.
   - `lib/auth`: Session token hashing, cookie serialization, and permission evaluation.
   - `lib/cache`: Unified read-through cache helper (Cloudflare Cache API + KV fallback) and tag/key invalidation.

---

## 3. Core Data-Flow Diagrams

### 3.1 Secure Direct-to-R2 Media Upload Flow

Binary files never pass through D1, and large uploads never buffer inside Worker memory:

```mermaid
sequenceDiagram
    autonumber
    actor Admin as Admin User (Browser)
    participant API as Worker API (/api/v1/admin/media)
    participant R2 as Cloudflare R2 Bucket
    participant D1 as Cloudflare D1 Database

    Admin->>API: POST /upload-url (filename, mimeType, sizeBytes, category)
    API->>API: Verify Session + RBAC ("media:upload")
    API->>API: Validate MIME allowlist & size limit (e.g. <= 15MB)
    API->>API: Generate UUID storageKey & sign PUT URL via aws4fetch (15m TTL)
    API-->>Admin: 200 OK { uploadUrl, storageKey, expiresAt }
    Admin->>R2: PUT <uploadUrl> (Binary file stream directly to R2)
    R2-->>Admin: 200 OK (ETag)
    Admin->>API: POST /complete { storageKey, altText, title, width, height }
    API->>R2: env.R2_BUCKET.head(storageKey)
    R2-->>API: Object Metadata (verified size, contentType, etag)
    API->>D1: INSERT INTO media_assets & audit_logs (db.batch)
    API-->>Admin: 201 Created { assetId, publicUrl }
```

---

### 3.2 Client Inquiry to CRM Lead Pipeline Flow

```mermaid
sequenceDiagram
    autonumber
    actor Client as Prospective Client
    participant API as POST /api/v1/inquiries
    participant Turnstile as Cloudflare Turnstile
    participant D1 as Cloudflare D1 Database
    participant Queue as Cloudflare Queue
    participant Workflow as Notification Workflow

    Client->>API: Submit Quote / Contact Brief + Turnstile Token
    API->>API: Edge Rate Limit Check (IP + Fingerprint)
    API->>Turnstile: siteverify(token, remoteip)
    Turnstile-->>API: { success: true }
    API->>API: Zod Schema Validation & Sanitization
    API->>D1: db.batch([INSERT inquiry, INSERT lead (status='new'), INSERT lead_activity])
    API->>Queue: Enqueue "INQUIRY_SUBMITTED" job (inquiryId, referenceCode)
    API-->>Client: 201 Created { referenceCode: "PL-2026-XXXX" }
    Queue->>Workflow: Trigger InquiryNotificationWorkflow
    Workflow->>D1: Record automation_jobs status='running'
    Workflow->>Workflow: Step 1: Send Client Confirmation Email
    Workflow->>Workflow: Step 2: Send Founder/Admin Alert Email
    Workflow->>D1: Step 3: Update notification_logs & automation_jobs='completed'
```

---

### 3.3 Automated Blog Publishing & SEO Pipeline Flow

```mermaid
flowchart LR
    Draft["1. Draft Authoring\n(Human or AI-Assisted Draft)"] --> Audit["2. Automated Quality & SEO Audit\n(Slug, Meta, Alt Text, Broken Links)"]
    Audit --> Review["3. Human Editorial Gate\n(Mandatory Admin Approval)"]
    Review --> Schedule["4. Publish Immediately\nor Schedule (scheduled_at)"]
    Schedule --> CronWF["5. Cloudflare Workflow\n(BlogPublishWorkflow)"]
    CronWF --> Revalidate["6. Cache + XML Sitemap\n+ RSS Feed Refresh"]
    Revalidate --> Social["7. Generate Social Post Draft\n& Log Completion in D1"]
```

