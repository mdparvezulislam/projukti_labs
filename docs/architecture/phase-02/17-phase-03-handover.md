# 17 — Phase 03 Handover Specification

**Target Phase:** Phase 03 — Design System & Shared UI Foundation  
**Handover Date:** 2026-11-06  
**Status:** Ready to Proceed upon Founder Approval  

---

## 1. Verified Stable Dependencies from Phase 02

The following foundations are fully tested and locked for Phase 03:
- **Build & Dev Toolchain:** `vinext@1.4.3` + Vite + `@cloudflare/vite-plugin` running App Router with HMR and production Worker bundling.
- **Styling Pipeline:** Tailwind CSS v4 configured with `@tailwindcss/postcss` and PostCSS.
- **Font Strategy:** Variable fonts (`Geist`, `Geist Mono`, `Hind Siliguri`, `Caveat`) configured in App Router with zero layout shift.
- **Database Client:** Drizzle ORM connecting to local Cloudflare D1 with active schema and migrations.
- **API Standard:** Standard JSON envelopes with UUID request IDs and Zod validation error mappers.
- **Quality Gates:** `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm run build:vinext` passing with 0 errors.

---

## 2. Phase 03 Scope & Immediate Objectives

In Phase 03, the team will implement the design system codified in [`DESIGN.md`](file:///Users/parvez/CODE/projukti_labs/DESIGN.md):
1. **Design Tokens & Theme Variables:** Map `--bg-canvas` (`#09090B`), `--bg-surface` (`#111113`), `--bg-elevated` (`#18181B`), hairline borders (`#27272A`), electric yellow CTA (`#FFDF20`), and text hierarchy (`#FAFAFA` / `#A1A1AA` / `#82828C`) into `app/globals.css`.
2. **Accessible Core Primitives (`components/ui/*`):**
   - Button (Primary Yellow CTA, Secondary Dark Surface, Outline, Ghost, Danger)
   - Badge / Pill (Active, Coming Soon, Category tags)
   - Card (Bento module, elevated surface, hairline border hover states)
   - Input / Textarea (Form fields with label, helper, and high-contrast focus rings)
   - Dialog / Modal (Accessible dialog with focus trapping and keyboard dismiss)
3. **Responsive Layout Shell (`components/layout/*`):**
   - Header with glassmorphism backdrop blur
   - App-like Mobile Bottom Navigation (`Home`, `Services`, `Work`, `Blog`, `About`)
   - Sticky Mobile CTA bar
   - Fluid typography and viewport hardening for `320px` to `1536px+`
4. **Closed-Loop Browser QA:** Playwright tests verifying responsive stability and accessibility contrast across mobile (`375px`) and desktop (`1280px`).

