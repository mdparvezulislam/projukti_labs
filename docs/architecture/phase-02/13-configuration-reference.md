# 13 — Configuration Reference

**Project:** Projukti Labs (`projuktilabs.tech`)  
**Phase:** 02 — Compatibility POC & Project Foundation  

---

## 1. File Map & Architectural Roles

| File Path | Tool / Ecosystem | Purpose |
|---|---|---|
| `vite.config.ts` | Vite / vinext | Multi-environment build pipeline configuring RSC, SSR, and client output for Cloudflare Workers. |
| `cloudflare.config.ts` | Cloudflare CLI (`cf`) | Defines worker entrypoint, compatibility date, and binding options for D1, R2, KV, and Assets. |
| `wrangler.jsonc` | Wrangler v4 | Configuration file for local simulation (`wrangler dev`), migrations, and typed bindings (`wrangler types`). |
| `postcss.config.mjs` | PostCSS | Injects `@tailwindcss/postcss` for Tailwind CSS v4 style compilation. |
| `drizzle.config.ts` | Drizzle Kit | SQLite migration engine pointing to `db/schema/index.ts` and outputting SQL to `db/migrations/`. |
| `eslint.config.mjs` | ESLint v9 | Flat configuration incorporating Next.js Web Vitals and TypeScript rules with appropriate ignore patterns. |
| `tsconfig.json` | TypeScript | Strict type checking with `@/*` path aliases. |
| `worker-configuration.d.ts` | Cloudflare Workers | Auto-generated ambient TypeScript declarations for `CloudflareEnv`. |
| `.env.example` | Environment | Safe reference template of all expected runtime variables and secrets. |
| `package.json` | pnpm | Locked dependencies and scripts: `build:vinext`, `dev:vinext`, `start:vinext`, `test`, `typecheck`, `lint`. |

