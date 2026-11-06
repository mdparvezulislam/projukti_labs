# 12 — Design System Foundation & Page Composition Blueprint

**Project:** Projukti Labs (`projuktilabs.tech`)  
**Aesthetic Direction:** Premium Dark-First Technology Studio (derived from supplied Dark Tech/Education HTML Reference)  
**Canonical Token Reference:** Mirrored in root [`DESIGN.md`](file:///Users/parvez/CODE/projukti_labs/DESIGN.md)

---

## 1. Brand Color System & WCAG 2.1 AA Contrast Validation

The visual language pairs deep Zinc/Carbon surfaces (`#09090B` / `#111113` / `#18181B`), crisp high-contrast off-white typography (`#FAFAFA`), hairline borders (`#27272A`), and restrained electric yellow (`#FFDF20`) exclusively for primary focal CTAs and key highlights.

| CSS Variable | Semantic Role | Dark Mode (Primary) | Light Mode (Token-Ready) | Contrast vs. `#09090B` | WCAG AA Status |
|---|---|---|---|---|---|
| `--bg-canvas` | Main page background | `#09090B` | `#FAFAFA` | — | Base Surface |
| `--bg-surface` | Cards & content modules | `#111113` | `#FFFFFF` | 1.07:1 (paired with `--border-subtle`) | Pass (Border-delineated) |
| `--bg-elevated` | Modals, popovers, sticky nav | `#18181B` | `#F4F4F5` | 1.18:1 (paired with border & shadow) | Pass |
| `--border-subtle` | Card & section hairline borders | `#27272A` | `#E4E4E7` | — | Structural |
| `--border-strong` | Hover/Active input & card border | `#3F3F46` | `#D4D4D8` | — | Interactive |
| `--text-primary` | Headings & primary body copy | `#FAFAFA` | `#09090B` | **19.3:1** | **AAA Pass** |
| `--text-secondary` | Supporting descriptions & prose | `#A1A1AA` | `#52525B` | **8.1:1** | **AAA Pass** |
| `--text-muted` | Metadata, timestamps, captions | `#71717A` | `#71717A` | **4.3:1** (Use `#82828C` = **5.2:1** for <14px text) | **AA Pass (with `#82828C` on small metadata)** |
| `--accent-primary` | Brand CTA surface & key badges | `#FFDF20` | `#EAB308` | **15.4:1** (Dark text `#09090B` on `#FFDF20`) | **AAA Pass** |
| `--accent-hover` | Primary CTA hover state | `#FFD439` | `#CA8A04` | **14.3:1** (with `#09090B` text) | **AAA Pass** |
| `--accent-info` | Technical / architectural callouts | `#818CF8` | `#4F46E5` | **6.8:1** | **AA Pass** |
| `--status-success` | Active badge, verified metrics | `#22C55E` | `#16A34A` | **8.8:1** | **AAA Pass** |
| `--status-warning` | Coming soon / review state | `#F59E0B` | `#D97706` | **8.7:1** | **AAA Pass** |
| `--status-danger` | Form validation error & destructive | `#EF4444` | `#DC2626` | **5.4:1** | **AA Pass** |

### Strict Color Governance Rules:
1. **Yellow (`#FFDF20`) Discipline:** Never use `#FFDF20` as a large section background or for long-form paragraph text. Reserve it strictly for Primary CTA buttons (paired with `#09090B` dark text, `font-weight: 600`), active indicators, and micro-highlights.
2. **Metadata Contrast Refinement:** Because `#71717A` against `#18181B` elevated cards yields `3.65:1` (slightly below the 4.5:1 threshold for 12–13px text), small metadata inside elevated cards must use `#8A8A93` (`4.65:1`) to guarantee WCAG 2.1 AA compliance.
3. **Ambient Glow Restraint:** Subtle radial indigo/violet (`rgba(129, 140, 248, 0.08)`) or warm gold (`rgba(255, 223, 32, 0.06)`) ambient lighting is restricted to hero backdrops and flagship callout containers—never applied randomly to every card.

---

## 2. Typography System (`Geist` + `Hind Siliguri` + `Caveat`)

| Font Family | CSS Variable | Role | Weights & Loading Strategy |
|---|---|---|---|
| **Geist Sans** | `--font-sans` | Primary English UI, headings, navigation, technical metrics | Variable `.woff2` (`400`–`700`), `font-display: swap`, tight tracking (`-0.03em` on headings) |
| **Geist Mono** | `--font-mono` | Code snippets, API references, reference codes (`PL-2026-XXXX`), pricing numerals (`tabular-nums`) | Variable `.woff2` (`400`–`600`) |
| **Hind Siliguri** | `--font-bengali` | Bangla UI labels, bilingual blog articles, regional copy | `.woff2` (`400`, `500`, `600`, `700`), `line-height: 1.75` to prevent vowel-mark (`কার`/`ফলা`) clipping |
| **Caveat** | `--font-accent` | Strictly limited handwritten callout annotations (e.g., Founder signature note or hero pointer) | `.woff2` (`600`), never used for headings or body paragraphs |

### Fluid Typographic Scale (`clamp()`)
- **Hero Display (`h1` Homepage/Flagship):** `clamp(2.25rem, 4.5vw + 1rem, 4.25rem)` (`36px` mobile → `68px` desktop), `line-height: 1.08`, `letter-spacing: -0.035em`.
- **Page Heading (`h1` Standard):** `clamp(2rem, 3.5vw + 0.75rem, 3.5rem)` (`32px` → `56px`), `line-height: 1.12`.
- **Section Heading (`h2`):** `clamp(1.625rem, 2.5vw + 0.5rem, 2.75rem)` (`26px` → `44px`), `line-height: 1.18`.
- **Card / Sub-section Heading (`h3`):** `clamp(1.25rem, 1.5vw + 0.5rem, 1.625rem)` (`20px` → `26px`), `line-height: 1.28`.
- **Body Large (Lead Paragraph):** `clamp(1.0625rem, 0.4vw + 0.95rem, 1.1875rem)` (`17px` → `19px`), `line-height: 1.65`.
- **Body Base:** `1rem` (`16px` English / `17px` Bangla), `line-height: 1.65` (English) / `1.78` (Bangla), max measure `68ch`.
- **Metadata / Badge / Eyebrow:** `0.75rem`–`0.875rem` (`12px`–`14px`), uppercase tracking `0.06em` for eyebrows.

---

## 3. Layout, Spacing, Radii & Motion System

- **Container Widths:**
  - Marketing / Studio Container: `max-w-7xl` (`1280px`) with responsive horizontal padding (`px-4 sm:px-6 lg:px-8`).
  - Editorial / Blog Reader Container: `max-w-3xl` (`768px`) centered with sticky side TOC on desktop (`1280px+`).
  - Admin Dashboard Container: Fluid `100%` (`max-w-[1600px]`) with collapsible `260px` sidebar.
- **Border Radii:** Cards `16px` (`rounded-2xl`), Inner panels/buttons `10px` (`rounded-lg`), Badges/Pills `9999px` (`rounded-full`).
- **Motion System:**
  - Micro-interactions (button/card hover, border illumination, active nav indicator): `150ms–220ms cubic-bezier(0.22, 1, 0.36, 1)`.
  - Section Entrance: Scroll-triggered once (`280ms–350ms`, `translateY(12px) -> 0`, `opacity: 0 -> 1`).
  - Accessibility & Mobile Guardrail: Full `@media (prefers-reduced-motion: reduce)` support disabling transforms; zero heavy cursor-following blur filters on touch devices.

---

## 4. Responsive Breakpoints & App-Like Mobile Experience (`320px+`)

| Breakpoint Tier | Viewport Range | Layout & Ergonomic Rules |
|---|---|---|
| **Small Mobile** | `320px–374px` | Single-column fluid stack; compact header; zero horizontal scroll; text wraps cleanly without clipping. |
| **Standard Mobile** | `375px–430px` | Primary mobile design target; **App-like Bottom Navigation Bar** (`Home`, `Services`, `Work`, `Blog`, `About`) + non-intrusive floating/sticky `"Get a Quote"` action bar with `env(safe-area-inset-bottom)` padding. |
| **Large Mobile** | `431px–639px` | Full-width interactive cards; touch targets strictly `>= 44×44px`; native mobile keyboard `inputMode`/`autoComplete` on all forms. |
| **Tablet** | `640px–1023px` | 2-column Bento & service grids; collapsible drawer navigation; horizontal package comparison scroll with snap indicators. |
| **Laptop / Desktop** | `1024px–1535px` | 12-column architectural grid; top glassmorphic sticky header (`backdrop-filter: blur(12px)`); split sticky storytelling sections. |
| **Large Desktop** | `1536px+` | Locked `1280px–1440px` max content container with balanced ambient margin framing. |

---

## 5. Distinct Page Composition Matrix (Anti-Template Rule)

Every page type is assigned a distinct structural blueprint (`services.layout_variant` in D1 for service pages):

| Page / Variant | Unique Visual & Conversion Composition |
|---|---|
| **Homepage (`/`)** | Editorial Asymmetric Hero + Live Architecture Capabilities Ticker + 3 Active Service Bento Pillars + Flagship Solution Spotlight + Selected Case Studies + Founder Engineering Note + Structured Conversion Footer. |
| **Web Service Detail (`web_conversion`)** | Business Outcome Hero + Before/After Performance & UX Comparison + Interactive Deliverables Checklist + Tiered Package Matrix + 6-Step Engineering Timeline + Contextual Inquiry Drawer. |
| **Complete E-commerce (`ecommerce_showcase`)** | Interactive Storefront & Mobile Checkout Preview Hero + Architecture Stack Diagram (Catalog → Cart → Payment Gateway → Admin Order Engine) + Included vs. 3rd-Party Fee Transparency Matrix + Package Comparison. |
| **Landing Page + Meta Pixel (`pixel_funnel`)** | Conversion Funnel Architecture Hero + Visual Event Tracking Flow Diagram (`PageView` → `ViewContent` → `Lead`/`Contact` + Test Events Verification Preview) + Speed/CRO Checklist + Package Matrix. |
| **Maintenance (`maintenance_plans`)** | Uptime & 6-Layer Security Monitoring Hero + SLA Response Time Matrix (`Basic` vs. `Business` vs. `Priority` vs. `Custom`) + Included/Excluded Task Accordion + Retainer Onboarding Flow. |
| **Founder (`/founder`)** | Editorial Portrait & Engineering Manifesto + Technical Architecture Philosophy + Systems Built & Core Stack + Direct Consultation CTA. |
| **Blog Article (`/blog/[slug]`)** | Distraction-Free Editorial Reader (`68ch` measure) + Sticky Table of Contents + Verified Author Bio + Copyable Syntax-Highlighted Code Blocks + Related Engineering Posts. |
| **Admin Panel (`/admin/*`)** | High-Density Dark SaaS Workspace + Command Palette (`Cmd+K`) + Status-Badged Data Tables + Drag-Ordered Structured Section Builder + Kanban Lead Pipeline. |

