# 09 — Authentication, Authorization & Security Architecture

**Project:** Projukti Labs (`projuktilabs.tech`)  
**Security Posture:** Defense-in-Depth across Cloudflare Edge (WAF/Turnstile), Worker Runtime (`workerd`), Application RBAC, and D1/R2 Storage.

---

## 1. Authentication & Session Lifecycle

### 1.1 Runtime-Compatible Cryptography (`workerd` Web Crypto API)
- **Password Hashing:** Because native C++ `bcrypt`/`argon2` binaries cannot execute inside Cloudflare Workers V8 isolates, password hashing uses **Web Crypto API (`crypto.subtle`) PBKDF2-HMAC-SHA256** (minimum 100,000 iterations with 16-byte cryptographic random salt) or pure-JS `@noble/hashes/scrypt`, compatible with both **Better Auth (`better-auth@1.7.18`)** and our D1 `users.password_hash` column.
- **Session Token Generation & Hashing:**
  1. Generate 32 bytes (256 bits) of cryptographic randomness via `crypto.getRandomValues(new Uint8Array(32))`, encoded as Base64URL (`rawToken`).
  2. Compute `tokenHash = SHA-256(rawToken)` via `crypto.subtle.digest("SHA-256", ...)`.
  3. Store **only `tokenHash`** in `sessions.token_hash` in D1 (if D1 were ever leaked via a read vulnerability, attackers still cannot forge active session cookies!).
  4. Send `rawToken` to the browser in a strict cookie:
     - Name: `__Host-pl_session` (in Production HTTPS; `pl_session` on `localhost` HTTP)
     - Attributes: `HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=604800` (7 days sliding window, refreshed when < 3 days remain).

### 1.2 Login Rate Limiting & Brute-Force Protection
- Before verifying a password hash, `POST /api/v1/auth/login` checks:
  1. **Cloudflare Turnstile Token** via server-side `siteverify`.
  2. **`login_attempts` Window Check:** Max **5 failed attempts per email or IP within 15 minutes**. Exceeding this returns `429 Too Many Requests` with `Retry-After: 900` and logs a security event.
- Password comparison uses constant-time byte comparison (`crypto.subtle.timingSafeEqual`) and dummy hash execution when an email does not exist to prevent timing-based user enumeration.

---

## 2. Role-Based Access Control (RBAC) Matrix

| Permission Domain | `super_admin` | `admin` | `editor` | `manager` | `support` |
|---|---|---|---|---|---|
| **Homepage & CMS Pages (`cms:*`)** | Full | Full | Read/Edit Draft | Read | None |
| **Services & Packages (`services:*`)** | Full | Full | Read | Read | Read |
| **Portfolio & Case Studies (`portfolio:*`)** | Full | Full | Create/Edit | Read | None |
| **Blog & Editorial (`blog:write`, `blog:approve`, `blog:publish`)** | Full | Full | Write + Submit for Review (Publish if granted) | Read | None |
| **Inquiries, Leads & CRM (`crm:*`)** | Full | Full | None | Full | Read Assigned |
| **Maintenance Tickets (`support:*`)** | Full | Full | None | Read | Full |
| **Media Library (`media:*`)** | Full | Full | Upload/Use | Upload/Use | Upload Ticket Attachments |
| **Users, Roles, Security & Audit (`system:*`)** | Full | Read Audit Logs | None | None | None |

### 2.1 Dual-Layer Route Protection
1. **Layer 1 — Edge Middleware (`middleware.ts`):** Intercepts all `/admin/*` and `/api/v1/admin/*` requests. Checks for the presence of the session cookie and attaches strict security headers (`X-Frame-Options: DENY`, `Content-Security-Policy`, `Referrer-Policy`). Unauthenticated requests to `/admin/*` redirect immediately to `/admin/login`.
2. **Layer 2 — Domain Service Guard (`requirePermission(ctx, permissionCode)`):** Every Admin Server Component, Server Action, and `/api/v1/admin/*` Route Handler resolves the session against D1 (`sessions` JOIN `users` JOIN `roles`) and asserts the exact permission code before executing any query or mutation.

---

## 3. Comprehensive Threat Assessment & Mitigation Matrix

| Threat | Risk Level | Likelihood | Impact | Prevention Strategy | Detection Mechanism | Recovery & Verification |
|---|---|---|---|---|---|---|
| **1. Unauthorized Admin Access / Credential Stuffing** | High | Medium | Critical | Turnstile on `/admin/login`, 5-attempt/15m IP+Email lockout in `login_attempts`, WebCrypto password hashing, optional TOTP MFA. | Spike in `login_attempts.succeeded = 0` triggers admin security email alert. | Revoke compromised sessions (`DELETE FROM sessions WHERE user_id = ?`); test lockout in e2e suite. |
| **2. Session Hijacking / XSS Cookie Theft** | High | Low | Critical | `__Host-` prefix, `HttpOnly`, `Secure`, `SameSite=Lax`, SHA-256 hashed tokens in D1, strict CSP disallowing inline `unsafe-eval`. | IP/User-Agent anomaly logging in `sessions` and `audit_logs`. | One-click "Revoke All Sessions" in Admin Security Settings; Playwright cookie flag inspection. |
| **3. Cross-Site Request Forgery (CSRF)** | Medium | Low | High | `SameSite=Lax` cookie + mandatory `Origin` / `Referer` header verification matching `projuktilabs.tech` on all `POST`/`PATCH`/`DELETE` routes. | Logged `403 CSRF Origin Mismatch` in Worker logs. | Reject request before handler execution; automated API security test with forged `Origin`. |
| **4. SQL Injection (SQLi)** | High | Low | Critical | 100% parameterized queries via Drizzle ORM (`eq()`, `sql\`...\`` bound params); zero string-concatenated SQL. | Code review & ESLint rule banning raw template interpolation in SQL. | D1 Time Travel restore if data corrupted; unit tests with SQLi payloads on search/filter endpoints. |
| **5. Cross-Site Scripting (XSS) via Blog MDX / Inquiry Input** | High | Medium | High | Strict Zod sanitization on inquiry inputs; MDX compiled on server with `rehype-sanitize` allowlist (no raw `<script>` or `javascript:` URLs). | Automated content audit checks for disallowed HTML tags. | Sanitize stored content and purge KV/Edge cache; verify with XSS payload test cases. |
| **6. Malicious File Upload / MIME Spoofing to R2** | Medium | Medium | High | Admin-only presigned `PUT` URLs (`aws4fetch`); strict extension + MIME allowlist (`image/webp`, `image/png`, `image/jpeg`, `image/avif`, `application/pdf`); max size enforcement; serve assets from isolated `assets.projuktilabs.tech` domain with `Content-Disposition` / `X-Content-Type-Options: nosniff`. | `/api/v1/admin/media/complete` inspects `env.R2_BUCKET.head(key)` and magic bytes before cataloging. | Delete unverified R2 object immediately if validation fails. |
| **7. Public Inquiry Spam & Bot Floods** | High | High | Medium | Cloudflare Turnstile token verification + IP rate limiting + honeypot field + Zod validation on `/api/v1/inquiries`. | Turnstile failure rate & rate-limit metrics in Cloudflare Analytics. | Block abusive IPs at Cloudflare WAF; test inquiry endpoint with missing/replayed Turnstile tokens. |
| **8. Internal Automation Endpoint Abuse** | Medium | Low | High | `/api/v1/internal/automation/*` requires `X-Internal-Automation-Secret` verified via constant-time `timingSafeEqual` against Worker secret. | Unauthorized `401` attempts logged to `audit_logs` with IP. | Rotate `INTERNAL_AUTOMATION_SECRET` via `wrangler secret put`. |

---

## 4. Privacy & Data Retention Governance

- **Data Minimization:** Public forms collect only business-necessary fields (Name, Email, optional Phone/WhatsApp, Company, Project Brief, Service interest). Raw client IP addresses in `inquiries` are stored as salted SHA-256 hashes (`ip_hash`) for abuse deduplication rather than persistent plaintext tracking.
- **Retention Policy:**
  - `login_attempts`: Automatically pruned after 90 days.
  - `automation_logs`: Automatically pruned after 60 days (`automation_jobs` summary retained for 180 days).
  - Client inquiries/leads: Retained for active business history; supports explicit one-click PII anonymization/deletion upon client request.

