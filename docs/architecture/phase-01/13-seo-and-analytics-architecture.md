# 13 — SEO, Structured Data & Analytics Architecture

**Canonical Domain:** `https://projuktilabs.tech`  
**Target Markets:** Bangladesh (`BDT`) + International (`USD`)  
**Language Strategy:** English-First (`en`) at Launch with Localization-Ready Content Architecture for Bangla (`bn`)

---

## 1. Technical SEO Foundation

SEO is baked directly into the Next.js App Router + D1 data model rather than bolted on after launch:

1. **Dynamic Metadata Resolution (`generateMetadata`):**
   - Every public route resolves its `seo_metadata` record (or deterministic fallback from entity `title`, `excerpt`/`short_summary`, and `featured_media_id`) to emit:
     - `<title>` (`50–60` characters, suffixed with `| Projukti Labs`)
     - `<meta name="description">` (`140–160` characters)
     - `<link rel="canonical" href="https://projuktilabs.tech/..." />` (Strips tracking params like `?utm_*` or `?fbclid=*` to prevent duplicate content indexing)
     - Open Graph (`og:title`, `og:description`, `og:image` `1200×630`, `og:type`, `og:site_name`)
     - Twitter Card (`summary_large_image`)
     - `robots` directives (`index, follow` for published active pages; `noindex, nofollow` for `/admin/*`, `/api/*`, preview deployments, and unpublished drafts).
2. **Dynamic XML Sitemap (`app/sitemap.ts`):**
   - Queries D1 for all `published` services (only in `active` categories), portfolio projects, case studies, blog articles, and static pages.
   - Cached in Cloudflare Cache API / KV and automatically invalidated whenever `BlogPublishWorkflow` or `publishService` runs.
3. **Redirect Engine (`redirects` Table):**
   - Edge middleware checks a cached lookup map of active 301/302 rules in KV/D1 so any renamed slug seamlessly redirects without losing search equity.

---

## 2. JSON-LD Structured Data Matrix

Every public route injects validated Schema.org JSON-LD via a dedicated `<StructuredData data={...} />` Server Component:

| Page Type | Schema.org `@type` | Key Properties Included |
|---|---|---|
| **Homepage (`/`)** | `Organization` + `WebSite` (`ProfessionalService`) | `name: "Projukti Labs"`, `url: "https://projuktilabs.tech"`, `founder` (`Person` reference), `areaServed: ["BD", "Worldwide"]`, `sameAs` social profiles. |
| **Founder (`/founder`)** | `ProfilePage` + `Person` | `name: "Md Parvezul Islam"`, `jobTitle: "Founder & Principal Engineer"`, `worksFor: "Projukti Labs"`, `knowsAbout` technical stack. |
| **Productized Service (`/services/[slug]`)** | `Service` (+ `FAQPage` when `service_faqs` exist) | `name`, `serviceType`, `provider` (`Projukti Labs`), `areaServed`, `hasOfferCatalog` (mapped from `service_packages`). |
| **Blog Article (`/blog/[slug]`)** | `TechArticle` / `BlogPosting` | `headline`, `description`, `image`, `datePublished`, `dateModified`, `author` (`Person`), `publisher` (`Organization`). |
| **All Nested Public Routes** | `BreadcrumbList` | Hierarchical path from `Home` → `Category` → `Current Page`. |
| **FAQ Page (`/faq`)** | `FAQPage` | Verified `Question` and `AcceptedAnswer` pairs. |

---

## 3. Multilingual Readiness Strategy (`en` Primary + `bn` Ready)

- **Launch v1.0 Rule:** Public routes serve clean canonical URLs (`/services/business-website`, `/blog/...`) in English so international and Bangladeshi clients see 100% complete, high-craft pages without broken half-translated UI strings.
- **Bilingual Blog Support from Day 1:** Blog articles (`posts`) can be authored in either English or Bangla (or mixed code/technical prose) using `Geist` + `Hind Siliguri` typography and per-article `lang` attributes (`en` or `bn`).
- **Future `/bn` Locale Expansion:** Because all copy-bearing tables support optional `_bn` columns or locale-keyed JSON sections without hardcoding text inside components, `/bn/*` route prefixes can be enabled in a future phase without database re-architecture.

---

## 4. Analytics, Meta Pixel & Privacy-Conscious Tracking Architecture

Because Projukti Labs specifically sells **High-Converting Landing Pages + Meta Pixel Setup** (`/services/landing-page-facebook-pixel`) and **E-commerce Tracking**, our own platform must demonstrate textbook tracking engineering:

1. **Zero-Cookie Baseline Analytics:** **Cloudflare Web Analytics** is enabled by default for lightweight, privacy-first Core Web Vitals and traffic measurement without invasive cookie banners.
2. **Configurable Marketing Tag Layer (`site_settings`):**
   - Supports optional Google Tag Manager (`GTM-XXXX`), Google Analytics 4 (`G-XXXX`), and Meta Pixel (`PIXEL_ID`) managed via Admin Marketing Settings.
3. **Standardized Event Taxonomy & Deduplication:**
   - Every conversion interaction emits a deterministic `event_id` (UUID) so client-side `fbq('track', eventName, payload, { eventID })` and optional server-side Conversions API (CAPI) events deduplicate cleanly:
     - `PageView` — All public page navigations.
     - `ViewContent` — Viewing a Productized Service page (`/services/[slug]`) with `content_name` and `content_category`.
     - `InitiateCheckout` / `LeadIntent` — Opening `/get-a-quote` or selecting a specific Service Package.
     - `Lead` / `Contact` — Verified `201 Created` response from `POST /api/v1/inquiries` or `POST /api/v1/consultation-requests`.

