# 03 — vinext & Next.js Runtime Validation Report

**Project:** Projukti Labs (`projuktilabs.tech`)  
**Framework:** Next.js `16.4.5` App Router  
**Adapter:** `vinext@1.4.3` + Vite `8.3.0`  
**Target Runtime:** Cloudflare Workers (`workerd` V8 isolates)  

---

## 1. Scanner Results (`vinext check`)

Executed `pnpm exec vinext check` on the initialized repository:
- **Imports:** 2/2 fully supported:
  - `next/font/google`: Self-hosted with fallback metrics.
  - `next/image`: Local images served via internal route, remote images via `@unpic/react`.
- **Project Structure:** App Router, layouts, and pages detected and confirmed compatible.
- **Config Flags Noted:**
  - `turbopack`: Ignored under Vite (handled via PostCSS / Tailwind plugin).
  - `reactCompiler`: Configured via Babel / `vinext({ react: { compiler: true } })`.
  - `cacheComponents`: Experimental (avoided in Phase 01 ADR in favor of Cloudflare Cache API).
- **Overall Score:** 83% compatible (6 supported, 3 partial, 0 blockers).

---

## 2. Multi-Environment Build Verification (`build:vinext`)

Running `pnpm run build:vinext` executes the 5-stage Vite compilation pipeline:
1. `[1/5]` Client references analysis (`rsc` environment).
2. `[2/5]` Server references analysis (`ssr` environment).
3. `[3/5]` RSC environment build (compiles components into React flight payload format).
4. `[4/5]` Client environment build (chunks, CSS, font preloads).
5. `[5/5]` SSR environment build (Worker entrypoint bundle).

**Result:** Completed successfully in **1.9 seconds**. Output generated in `.cloudflare/output/v0/workers/default/`.

---

## 3. Runtime Verification on Worker Preview (`start:vinext`)

Ran `pnpm run start:vinext` (listening on `http://localhost:4173/`) and tested endpoints:

### 3.1 React Server Components (RSC)
- Route: `/poc/server-component`
- Result: Evaluated `new Date().toISOString()` server-side and streamed HTML payload with zero client JS errors.

### 3.2 Client Component Islands
- Route: `/poc/client-component`
- Result: Hydrated client-side `useState` counter island; click events update state without hydration mismatch.

### 3.3 Next.js 16 Async Dynamic Route Parameters
- Route: `/poc/dynamic/test-service-slug`
- Contract: `export default async function Page({ params }: { params: Promise<{ slug: string }> })`
- Result: Successfully `await`ed `params.slug` and rendered `<strong>test-service-slug</strong>`.

### 3.4 Dynamic Server Metadata
- Route: `/poc/metadata`
- Result: Server-rendered `<title>` and `<meta name="description">` and OpenGraph tags in `<head>`.

### 3.5 API Route Handlers
- Route: `GET /api/v1/health`
- Result: Returned HTTP 200 with JSON payload `{"status":"ok","runtime":"workerd"}` and custom `x-request-id` header.

