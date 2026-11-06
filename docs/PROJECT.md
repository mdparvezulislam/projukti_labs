# Projukti Labs — Project Master Specification (`PROJECT.md`)

**Repository:** `projukti-labs`  
**Domain:** `projuktilabs.tech`  
**Founder:** Md Parvezul Islam (Principal Software Architect)  
**Tagline:** Building Digital Solutions. Engineering the Future.  
**Baseline Version:** v1.0 Production Foundation  

---

## 1. Project Positioning & Vision

Projukti Labs is an independent, premium technology studio and engineering consultancy. It combines:
1. **Founder-Led Software Architecture:** Directed by Md Parvezul Islam with hands-on technical governance over code reviews, schema migrations, and performance profiling.
2. **Productized Development Offerings:** Fixed-price, transparently scoped packages with clear deliverables, technical SLAs, and zero hidden platform revenue commissions.
3. **Engineering Integrity:** Eliminating fragile agency templates (e.g. 60-plugin WordPress installations) in favor of high-availability, edge-rendered applications built on Next.js App Router and Cloudflare Workers.
4. **Dual-Market Focus:** Serving high-growth enterprises and boutique direct-to-consumer businesses across Bangladesh (bKash PGW, Nagad, SSLCommerz, Pathao/Steadfast APIs) and international markets (Stripe, SWIFT, GDPR compliance, WCAG 2.1 AA).

---

## 2. Launch Commercial Scope

### Active Launch Verticals:
- **01. Web Development & Design**
  - Flagship: *Landing Page with Meta Pixel & Analytics* (`/services/landing-page-meta-pixel`)
  - Standard: *Corporate & Studio Web Platform* (`/services/corporate-website`)
- **02. E-commerce & Digital Commerce**
  - Flagship: *Complete Production-Ready E-commerce Platform* (`/services/complete-ecommerce-website`)
  - Standard: *Headless Storefront & Catalog Solution* (`/services/headless-commerce`)
- **03. Maintenance & Technical Support**
  - Flagship: *Proactive Website Maintenance & Technical Retainer* (`/services/website-maintenance`)
  - Standard: *Performance & Security Hardening Audit* (`/services/speed-security-audit`)

### Future Expansion Verticals (Strictly Pipeline / Coming Soon):
1. Custom Software & SaaS Development
2. AI Integrations & Automated Workflows
3. Cross-Platform Mobile Applications
4. UI/UX Design Systems & Product Discovery
5. Cloud Infrastructure & Edge DevOps
6. API Architecture & Microservice Integration
7. Advanced Technical SEO & Business Analytics

---

## 3. Core Conversion Journeys

1. **Inquiry Journey (`/contact`):**
   - User submits contact brief.
   - Validated against Zod schema (`/api/v1/inquiries`).
   - Saved to D1 `inquiries` and mapped to `leads` table.
   - Returns unique tracking code: `PL-2026-XXXX`.
2. **Quotation Journey (`/get-a-quote`):**
   - Pre-fills requested service and package from URL parameters (`?service=...&package=...`).
   - Captures budget range (BDT/USD), timeline, and technical specifications.
   - Emits quotation tracking code and enqueues into review SLA queue.
3. **Productized Service Purchase Journey:**
   - Dedicated service page with bespoke architecture diagrams, deliverables, exclusions, and pricing tiers.
   - 1-click CTA links to `/get-a-quote` with pre-filled metadata.
