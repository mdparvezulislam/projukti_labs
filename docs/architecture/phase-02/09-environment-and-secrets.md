# 09 — Environment & Secret Management Report

**Project:** Projukti Labs (`projuktilabs.tech`)  
**Security Policy:** Strict Zero-Secret-in-Git Boundary  

---

## 1. Environment Variable Architecture

Environment configuration is split into public runtime variables and sensitive secrets:

| Variable Name | Classification | Storage Location | Example / Dummy Value |
|---|---|---|---|
| `ENVIRONMENT` | Public Config | `wrangler.jsonc` `vars` | `"development"` |
| `APP_URL` | Public Config | `wrangler.jsonc` `vars` | `"http://localhost:3000"` |
| `AUTH_SECRET` | Sensitive Secret | `.env.local` / `wrangler secret` | `dev_secret_must_be_at_least_32_characters...` |
| `TURNSTILE_SITE_KEY` | Public Key | `.env.local` | `1x00000000000000000000AA` (Cloudflare test key) |
| `TURNSTILE_SECRET_KEY` | Sensitive Secret | `.env.local` / `wrangler secret` | `1x0000000000000000000000000000000AA` (Cloudflare test secret) |
| `R2_ACCOUNT_ID` | Operational Config | `.env.local` / `wrangler secret` | `local-simulated-account` |
| `R2_ACCESS_KEY_ID` | Sensitive Secret | `.env.local` / `wrangler secret` | `local-simulated-access-key` |
| `R2_SECRET_ACCESS_KEY` | Sensitive Secret | `.env.local` / `wrangler secret` | `local-simulated-secret-key` |
| `R2_BUCKET_NAME` | Operational Config | `wrangler.jsonc` `r2_buckets` | `"projukti-labs-assets"` |

---

## 2. Git Safety Verification

- Checked `.gitignore`: `.env*`, `.wrangler/`, `.cloudflare/output/`, `.next/`, and credentials are appropriately excluded from tracking.
- Created [`.env.example`](file:///Users/parvez/CODE/projukti_labs/.env.example) documenting all required parameters without exposing any live credentials.

