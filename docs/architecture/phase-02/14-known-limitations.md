# 14 — Known Limitations & Technical Constraints

**Project:** Projukti Labs (`projuktilabs.tech`)  
**Review Date:** 2026-11-06  

---

## 1. Runtime & Framework Limitations

1. **Next.js 16 Experimental `"use cache"` & `cacheComponents`:**
   - *Limitation:* Partially implemented in `vinext@1.4.3`.
   - *Workaround:* Avoid `"use cache"` directive. Use explicit Cloudflare Cache API and KV helpers with deterministic key invalidation.
2. **Next.js Build-Time Image Processing (`sharp`):**
   - *Limitation:* Native C++ `sharp` binaries cannot run inside Cloudflare Workers (`workerd`).
   - *Workaround:* Custom `next/image` loader directing requests to Cloudflare Images / pre-optimized WebP assets in R2.
3. **Cloudflare D1 Bound Parameters Limit:**
   - *Limitation:* SQLite statements on D1 cap bound query parameters at 100 per statement.
   - *Workaround:* Bulk inserts must be chunked via `chunkedBatchInsert()` utility inside atomic `db.batch([...])`.
4. **Cloudflare D1 Single-Threaded Writer:**
   - *Limitation:* D1 query processing per database is single-threaded.
   - *Workaround:* Public pages must be served from Edge Cache / KV; all query filters must use composite indexes.
5. **Local R2 Emulation Differences:**
   - *Limitation:* Local Miniflare R2 emulation may not replicate production S3 Presigned PUT CORS behavior without explicit header rules.
   - *Workaround:* Tested signature generation via `aws4fetch` unit tests; live remote bucket testing will be finalized during preview staging.

