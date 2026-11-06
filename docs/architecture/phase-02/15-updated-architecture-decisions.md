# 15 — Updated Architecture Decision Records (Phase 02 Updates)

**Project:** Projukti Labs (`projuktilabs.tech`)  
**Date:** 2026-11-06  

---

## ADR-002 (Updated): Next.js 16.4.5 + vinext on Cloudflare Workers
- **Original Status (Phase 01):** Needs Validation (Phase 02 POC Gate)
- **Updated Status (Phase 02):** **ACCEPTED & VALIDATED**
- **Validation Evidence:**
  - `pnpm exec vinext check` reported 0 blockers (83% compatibility).
  - Multi-environment build (`build:vinext`) succeeded in 1.9s.
  - Runtime preview on port 4173 verified React Server Components, Client Component hydration, Next.js 16 async params (`await params`), dynamic metadata, and Route Handlers with 0 crashes.
  - Fallback to `@opennextjs/cloudflare` was not required.

---

## ADR-003 (Updated): Cloudflare D1 + Drizzle ORM Single Database
- **Original Status (Phase 01):** Accepted (Binding POC in Phase 02)
- **Updated Status (Phase 02):** **ACCEPTED & LOCALLY VALIDATED**
- **Validation Evidence:**
  - `drizzle-kit@0.31.11` generated clean SQLite migration `0000_glossy_mantis.sql`.
  - Migration applied cleanly to local D1 via `wrangler d1 migrations apply projukti_labs_db --local`.
  - Direct SQL query returned created tables (`poc_records`, `system_health_checks`).
  - Drizzle factory helper `getDb(d1)` compiles type-safely.

---

## ADR-004 (Updated): Direct Browser-to-R2 Uploads via aws4fetch
- **Original Status (Phase 01):** Accepted (Upload POC in Phase 02)
- **Updated Status (Phase 02):** **ACCEPTED & VALIDATED**
- **Validation Evidence:**
  - `aws4fetch@1.0.20` signed S3-compatible presigned `PUT` URLs using standard Web Crypto API (`crypto.subtle`).
  - Generated URLs verified in unit test with valid AWS4 signature structure and configurable TTL.
  - Confirmed 0 Node.js native dependencies.

---

## ADR-005 (Updated): WebCrypto Session Authentication + RBAC
- **Original Status (Phase 01):** Needs Validation (Phase 02 POC Gate)
- **Updated Status (Phase 02):** **ACCEPTED & VALIDATED**
- **Validation Evidence:**
  - Web Crypto API PBKDF2-SHA256 (100,000 iterations) executed in 40ms inside Worker isolate.
  - 256-bit random session token generation and SHA-256 database digest hashing verified via unit tests.

