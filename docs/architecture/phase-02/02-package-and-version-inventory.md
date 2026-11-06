# 02 — Package and Version Inventory

**Project:** Projukti Labs (`projuktilabs.tech`)  
**Package Manager:** `pnpm@11.17.0` (with strict `pnpm-lock.yaml`)  
**Audit Date:** 2026-11-06  

---

## 1. Production Dependencies (`dependencies`)

| Package | Version | Purpose | Runtime Environment |
|---|---|---|---|
| `next` | `16.4.5` | Application framework & App Router conventions | Cloudflare Workers / Node |
| `react` | `19.3.1` | UI library & Server Component runtime | Client & Worker isolate |
| `react-dom` | `19.3.1` | DOM renderer & SSR streaming | Client & Worker isolate |
| `react-server-dom-webpack` | `19.3.1` | React Server Component streaming bridge | Worker isolate |
| `@vinext/cloudflare` | `1.3.3` | Cloudflare Worker runtime bindings adapter | Worker isolate |
| `drizzle-orm` | `0.45.4` | Edge SQLite ORM (`drizzle-orm/d1`) | Worker isolate |
| `zod` | `4.6.7` | Input validation engine | Client & Worker isolate |
| `react-hook-form` | `7.91.0` | Accessible client form state | Client Component island |
| `aws4fetch` | `1.0.20` | WebCrypto S3/R2 presigned URL signer | Worker isolate |

---

## 2. Development Dependencies (`devDependencies`)

| Package | Version | Purpose |
|---|---|---|
| `vinext` | `1.4.3` | Next.js API surface reimplementation for Vite |
| `@cloudflare/vite-plugin` | `2.0.0-beta.v.11` | Vite plugin for Cloudflare Workers environments |
| `vite` | `8.3.0` | Production bundler and development server |
| `@vitejs/plugin-react` | `6.2.1` | React Fast Refresh and JSX transformation |
| `@vitejs/plugin-rsc` | `0.5.38` | Vite plugin for React Server Components |
| `cf` | `1.0.0-beta.27` | Cloudflare configuration CLI and type definitions |
| `drizzle-kit` | `0.31.11` | Drizzle migration generator and schema management |
| `typescript` | `5.9.3` | Static type checker |
| `@types/react` | `^19` | TypeScript declarations for React |
| `@types/react-dom` | `^19` | TypeScript declarations for React DOM |
| `@types/node` | `^20` | Node type definitions |
| `tailwindcss` | `4.3.4` | Styling engine |
| `@tailwindcss/postcss` | `4.3.4` | PostCSS plugin for Tailwind v4 under Vite |
| `@tailwindcss/turbopack` | `4.3.4` | Turbopack integration for fallback `next dev` |
| `babel-plugin-react-compiler` | `1.0.0` | React 19 compiler optimization |
| `eslint` | `^9` (`9.39.5`) | Code quality linter |
| `eslint-config-next` | `16.4.5` | Next.js ESLint ruleset |
| `vitest` | `5.1.0` | Fast unit & integration test runner |
| `@playwright/test` | `1.64.1` | Browser end-to-end and responsive QA |
| `wrangler` | `4.157.0` (Host global: `4.158.0`) | Cloudflare Workers, D1, and R2 CLI |

---

## 3. Dependency Impact & Bundle Verification
- **Zero Native C++ Addons:** Verified no native Node.js binaries (`bcrypt`, `sharp`, `better-sqlite3`) are imported.
- **Worker Bundle Size:** The entire compiled Worker bundle across all POC routes (`.cloudflare/output/v0/workers/default/bundle/ssr/index.js`) is **311.93 kB uncompressed (97.83 kB gzipped)**, well within the 3 MB (Free) and 10 MB (Paid) Cloudflare Workers limits.

