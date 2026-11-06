# 11 — Security Validation & Baseline Report

**Project:** Projukti Labs (`projuktilabs.tech`)  
**Scope:** Phase 02 Technical Baseline & Cryptographic Boundary  

---

## 1. Implemented Security Controls

1. **Web Crypto Password Derivation:**
   - Evaluated PBKDF2-HMAC-SHA256 with 100,000 iterations and 16-byte random salt.
   - Verified that no native C++ binaries (`bcrypt`, `argon2`) are imported into Worker code.
2. **Session Storage Hash Isolation:**
   - 256-bit random session tokens are hashed with SHA-256 before database insertion.
   - An attacker gaining read-only access to SQLite D1 cannot forge active session cookies.
3. **Payload Sanitization & Boundary Validation:**
   - All API inputs are parsed using strict Zod schemas.
   - Unexpected or malicious fields are stripped or rejected with HTTP 422 before executing database operations.
4. **Header-Based Tracing & Error Isolation:**
   - Every API response includes a unique `x-request-id` UUID header.
   - Internal stack traces, raw SQL queries, and environment details are completely suppressed from client error payloads.
5. **Direct Storage Upload Security:**
   - S3 presigned PUT URLs enforce specific `Content-Type` headers and time-limited expiration.
   - Bypasses Worker memory buffers, eliminating upload DoS vulnerabilities on Workers.

---

## 2. Tested vs. Untested Controls

- **Tested:** WebCrypto hashing, token entropy, Zod error mapping, presigned URL signature generation.
- **Untested in Phase 02 (Scheduled for later phases):** Live Cloudflare Turnstile token validation against Cloudflare's verification endpoint (Phase 09), CSRF Origin header verification on admin mutations (Phase 08), production WAF IP rate limiting (Phase 13).

