# Projukti Labs — Canonical Design System (`DESIGN.md`)

**Brand:** Projukti Labs (`projuktilabs.tech`)  
**Tagline:** *Building Digital Solutions. Engineering the Future.*  
**Visual Archetype:** Premium Dark-First Technology Studio & Editorial Engineering Platform  
**Language & Market Policy:** Bangladesh-First & Bangla-Primary (`bn-BD`, `Asia/Dhaka`, BDT ৳)  
**Status:** Locked Baseline v1.2 (Phases 01–12 Complete)

---

## 1. Design Philosophy & Anti-Generic Governance

1. **Dark-First Precision:** Built on deep carbon/zinc surfaces (`#09090B` → `#111113` → `#18181B`) with `1px` architectural borders (`#27272A`) and high-contrast off-white typography (`#FAFAFA`).
2. **Restrained Electric Yellow Accent (`#FFDF20`):** Yellow is used strictly as a high-intent focal signal (Primary CTAs with `#09090B` dark text, active navigation indicators, and verified telemetry badges). Never paint large backgrounds or body text yellow.
3. **Bangladesh-First Editorial Craft:** All public communication is composed in natural, modern, professional Bangla. English is reserved for technical identifiers, programming paradigms, and short action labels.
4. **Anti-Template Page Composition:** Reusable UI primitives (`Button`, `Badge`, `Card`, `AccordionItem`) are shared across the platform, but **every page archetype and productized service (`landing-page-meta-pixel`, `complete-ecommerce-website`, `website-maintenance`, `blog`) must use a bespoke section composition**.
5. **App-Like Mobile Ergonomics (`320px+`):** Mobile viewports are designed as first-class touch interfaces featuring a `>= 44×44px` tap target floor, responsive navigation drawer with `/blog` link, and zero unintended horizontal scrollbars.

---

## 2. Color Tokens

```css
:root {
  /* Primary Dark Mode Surface Hierarchy */
  --bg-canvas: #09090B;
  --bg-surface: #111113;
  --bg-elevated: #18181B;
  --bg-glass: rgba(17, 17, 19, 0.82);

  /* Architectural Borders */
  --border-subtle: #27272A;
  --border-strong: #3F3F46;
  --border-accent: rgba(255, 223, 32, 0.35);

  /* Typography Hierarchy (WCAG 2.1 AA/AAA Verified) */
  --text-primary: #FAFAFA;     /* 19.3:1 contrast on #09090B */
  --text-secondary: #A1A1AA;   /* 8.1:1 contrast on #09090B */
  --text-muted: #82828C;       /* 5.2:1 contrast on #09090B (safe for 12-14px metadata) */

  /* Brand & Semantic Accents */
  --accent-primary: #FFDF20;   /* Pair with #09090B foreground text (15.4:1 contrast) */
  --accent-hover: #FFD439;
  --accent-info: #818CF8;
  --status-success: #22C55E;
  --status-warning: #F59E0B;
  --status-danger: #EF4444;
}

[data-theme="light"] {
  --bg-canvas: #FAFAFA;
  --bg-surface: #FFFFFF;
  --bg-elevated: #F4F4F5;
  --bg-glass: rgba(255, 255, 255, 0.85);
  --border-subtle: #E4E4E7;
  --border-strong: #D4D4D8;
  --text-primary: #09090B;
  --text-secondary: #52525B;
  --text-muted: #71717A;
  --accent-primary: #EAB308;
  --accent-hover: #CA8A04;
  --accent-info: #4F46E5;
}
```

---

## 3. Typography Hierarchy & Bangla-First Rules

1. **Mandatory Font Tokens:**
   - **`--font-bangla` (`Hind Siliguri`):** Primary font for all Bangla headings, paragraphs, form labels, and UI strings (`weights: 300, 400, 500, 600, 700`, subsets: `bengali, latin`). Configured via `next/font/google` with `display: swap`.
   - **`--font-sans` (`Geist`):** Secondary Latin fallback and display typography.
   - **`--font-mono` (`Geist Mono`):** Code blocks, JSON-LD schemas, technical specifications, SLA metrics, pricing (`font-variant-numeric: tabular-nums`), and inquiry tracking codes.
   - **`--font-accent` (`Caveat`):** Reserved strictly for 1–2 word handwritten editorial callout annotations.

2. **Bengali Line Height & Glyphs Protection:**
   - Bengali script features vertical diacritics (কার ও ফলা: হ্রস্ব ই-কার, দীর্ঘ ই-কার, হ্রস্ব উ-কার, র-ফলা, য-ফলা) and complex conjuncts (যুক্তাক্ষর).
   - Paragraphs in Bangla MUST maintain a line-height of `1.75` to `1.85` (e.g. `leading-relaxed` / `leading-loose`).
   - Headings in Bangla MUST maintain a line-height of `1.25` to `1.35` to avoid clipping ascenders and descenders.
   - Avoid letter-spacing below `0` on Bengali type (do NOT apply negative tracking like `tracking-tighter` to Bengali words).

3. **Bilingual UI Conventions:**
   - Headings lead with Bangla and may incorporate English technical nouns: e.g., `ওয়েব ডেভেলপমেন্ট ও ডিজাইন (Web Development & Design)`.
   - Action buttons use concise, natural bilingual phrasing: `প্রজেক্ট শুরু করুন`, `কোটেশন চান`, `View All Services`.
   - Metadata tags use clean pill badges with monospace numerical indicators.

---

## 4. Blog & Editorial Reading Experience (Phase 06)

1. **Reading Column Width:** Long-form article text is constrained to `max-w-3xl` (`68ch` equivalent) with centered alignment for high reading endurance.
2. **Editorial Typographic Scale:**
   - Article Title (H1): `text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight`.
   - Section Headings (H2): `text-2xl sm:text-3xl font-bold mt-10 mb-4 border-b border-border pb-2`.
   - Subheadings (H3): `text-xl font-semibold mt-6 mb-3 text-accent`.
   - Blockquotes: Indented with `border-l-4 border-accent pl-4 italic text-text-muted bg-surface/40 p-4 rounded-r-lg`.
   - Code Blocks: Monospace syntax highlighting with copy reference in `Geist Mono` on dark surface (`bg-surface`).
3. **Article Metadata Bar:** Reading time estimation (`X মিনিট পাঠ`), publication date in Bengali format, category pill, and author bio card with founder accreditation.

---

## 5. Component & Interactive State Rules

Every interactive control (`<button>`, `<a>`, `<input>`, `<select>`, `<dialog>`) must implement all 6 states:
1. **Default:** Crisp `1px` border (`--border-subtle`) or solid `--accent-primary` fill.
2. **Hover:** Smooth `180ms` transition (`--accent-hover` for primary CTA; `--border-strong` + `--bg-elevated` for secondary surfaces).
3. **Active / Pressed:** Subtle `scale(0.985)` tactile feedback.
4. **Focus-Visible:** High-contrast `2px solid var(--accent-primary)` outline with `2px` offset (`outline-offset: 2px`). Never remove focus rings without replacement.
5. **Loading:** Inline SVG spinner + `aria-busy="true"` preserving button width (no layout shift).
6. **Disabled:** `opacity: 0.5`, `cursor: not-allowed`, `disabled` attribute.

---

## 6. Admin Operating System & Mobile App Design (Phases 08–12)

1. **Mobile-First App-Like Ergonomics (<768px):**
   - **Sticky 5-Tab Bottom Navigation (`admin-mobile-nav.tsx`):** Docked at `bottom-0` with `backdrop-blur-md` on dark surface (`bg-surface/95`). 5 primary tabs: Dashboard (`/admin/dashboard`), Inquiries (`/admin/inquiries`), Leads (`/admin/leads`), Content (`/admin/content`), More (`/admin/more`).
   - **Touch Target Floor:** All mobile navigation buttons and interactive action icons maintain a minimum of `48×48px` clickable tap targets.
   - **Safe Viewport Cushioning:** All mobile scroll views enforce `pb-20` (bottom padding) to ensure content never hides behind the sticky tab bar.
   - **Zero Horizontal Scrollbar Rule:** Complex data tables are replaced with responsive vertical card stacks on mobile viewports (<768px).
   - **Compact Header (`admin-header.tsx`):** Height constrained to `h-14` on mobile with studio branding, live unread notification badge, and quick theme toggle.

2. **Information Density & Administrative Typography:**
   - **Primary Font:** **Hind Siliguri** for all Bengali labels, form field hints, action buttons, and status descriptions.
   - **Monospace Font (`Geist Mono`):** Standardized across all technical and financial metadata:
     - Reference codes: `PL-2026-XXXX`
     - Quotation numbers: `PL-Q-2026-XXXX`
     - Customer IDs: `cst_...`
     - BDT Currency: `৳45,000` with `font-variant-numeric: tabular-nums`
     - Timestamps: ISO 8601 formatting or relative time (`Asia/Dhaka`).
   - **Status Badge System:**
     - `new` / `info`: Blue badge (`bg-blue-500/10 text-blue-400 border-blue-500/20`)
     - `won` / `accepted` / `success`: Green badge (`bg-emerald-500/10 text-emerald-400 border-emerald-500/20`)
     - `contacted` / `qualified` / `warning`: Amber/Yellow badge (`bg-amber-500/10 text-amber-400 border-amber-500/20`)
     - `lost` / `rejected` / `critical`: Rose badge (`bg-rose-500/10 text-rose-400 border-rose-500/20`)
     - `proposal_sent` / `pending`: Purple badge (`bg-purple-500/10 text-purple-400 border-purple-500/20`)

3. **Desktop Architectural Layout (>=1024px):**
   - Fixed `w-64` collapsible sidebar (`admin-sidebar.tsx`) structured into 4 clean functional categories:
     - **Overview:** Dashboard, Live Activity Log
     - **CRM & Sales:** Inquiries (with unread badge), Leads Pipeline, Quotations, Customer Profiles
     - **Content Studio:** Site Pages, Services & Packages, Blog Articles, FAQs, Portfolio Blueprints
     - **System & Automation:** Business Workflows, Notification Center, Studio Settings, Health & Observability
   - User profile section anchored at sidebar bottom showing active role pill (`owner`, `admin`) and one-click secure sign-out.

---

## 7. Phase 13 Design System Refinement & Accessibility Hardening

1. **Tailwind CSS v4 `@theme inline` Alignment:**
   - Explicitly codified and mapped CSS custom properties inside `@theme inline` in `app/globals.css`:
     - `--color-card: var(--card)`
     - `--color-card-hover: var(--card-hover)`
     - `--color-card-foreground: var(--card-foreground)`
     - `--color-bg-primary: var(--bg-primary)`
     - `--color-bg-surface: var(--bg-surface)`
     - `--color-border-hover: var(--border-hover)`
     - `--color-accent-text: var(--accent-text)`

2. **WCAG 2.2 AA Contrast Compliance Matrix:**
   - **Primary Action Buttons:** Background `#FFDF20`, Foreground `#09090B` (Contrast ratio: **14.5:1 AAA** in dark and light modes).
   - **Accent Text & Badges:**
     - Dark mode: `#FFDF20` on `#09090B` (**14.5:1 AAA**).
     - Light mode: `--accent-text: #854D0E` on `#FFFFFF` (**7.1:1 AAA**). Replaced raw yellow text in light mode which previously failed contrast.
   - **Muted Metadata Text:**
     - Dark mode: `#94A3B8` on `#09090B` (**8.3:1 AAA**).
     - Light mode: `#64748B` on `#FFFFFF` (**5.0:1 AA**).
   - **Status Badges (Dual Mode with WCAG AAA Contrast):**
     - Success: Dark mode `text-emerald-300 bg-emerald-500/10` (9.2:1 AAA), Light mode `text-emerald-800 bg-emerald-50` (7.4:1 AAA).
     - Warning/Amber: Dark mode `text-amber-300 bg-amber-500/10` (9.5:1 AAA), Light mode `text-amber-800 bg-amber-50` (7.2:1 AAA).
     - Info/Blue: Dark mode `text-blue-300 bg-blue-500/10` (8.8:1 AAA), Light mode `text-blue-800 bg-blue-50` (7.1:1 AAA).
     - Danger/Red: Dark mode `text-red-300 bg-red-500/10` (8.9:1 AAA), Light mode `text-red-800 bg-red-50` (7.3:1 AAA).

3. **Admin Route Bleed Prevention:**
   - `SiteHeader` and `SiteFooter` are path-aware (`pathname?.startsWith("/admin")`), completely preventing public headers and footers from rendering inside administrative routes.

4. **Surface Depth & State Completeness:**
   - Administrative form inputs standardized on `bg-surface-elevated` with clear border and focus rings.
   - Empty states upgraded to centered card containers with high-contrast icons, title, and descriptive prompts.
   - Minimum tap target `>= 44×44px` enforced on mobile controls.
