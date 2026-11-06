# Projukti Labs — Canonical Design System (`DESIGN.md`)

**Brand:** Projukti Labs (`projuktilabs.tech`)  
**Tagline:** *Building Digital Solutions. Engineering the Future.*  
**Visual Archetype:** Premium Dark-First Technology Studio & Editorial Engineering Platform  
**Status:** Locked Baseline v1.0 (Phase 01 Foundation)

---

## 1. Design Philosophy & Anti-Generic Governance

1. **Dark-First Precision:** Built on deep carbon/zinc surfaces (`#09090B` → `#111113` → `#18181B`) with `1px` architectural borders (`#27272A`) and high-contrast off-white typography (`#FAFAFA`).
2. **Restrained Electric Yellow Accent (`#FFDF20`):** Yellow is used strictly as a high-intent focal signal (Primary CTAs with `#09090B` dark text, active navigation indicators, and verified highlights). Never dilute the accent by painting large backgrounds or body text yellow.
3. **Anti-Template Page Composition:** Reusable UI primitives (`Button`, `Badge`, `Card`, `Dialog`) are shared across the platform, but **every page archetype and productized service (`web_conversion`, `ecommerce_showcase`, `pixel_funnel`, `maintenance_plans`) must use a bespoke section composition**.
4. **App-Like Mobile Ergonomics (`320px+`):** Mobile viewports are designed as first-class touch interfaces featuring a `>= 44×44px` tap target floor, safe-area-aware bottom navigation (`Home`, `Services`, `Work`, `Blog`, `About`), and zero horizontal overflow.

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
  --text-primary: #FAFAFA;     /* 19.3:1 on #09090B */
  --text-secondary: #A1A1AA;   /* 8.1:1 on #09090B */
  --text-muted: #82828C;       /* 5.2:1 on #09090B (safe for 12-14px metadata) */

  /* Brand & Semantic Accents */
  --accent-primary: #FFDF20;   /* Pair with #09090B foreground text (15.4:1) */
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

## 3. Typography Tokens

- **`--font-sans` (`Geist`):** Primary English UI, display headings (`letter-spacing: -0.03em`), and body copy (`16px`, `line-height: 1.65`).
- **`--font-mono` (`Geist Mono`):** Technical specifications, SLA metrics, pricing (`font-variant-numeric: tabular-nums`), and inquiry codes.
- **`--font-bengali` (`Hind Siliguri`):** Bangla content and bilingual headings (`17px` body, `line-height: 1.78`, `letter-spacing: 0`).
- **`--font-accent` (`Caveat`):** Reserved strictly for 1–2 word handwritten callout annotations.

---

## 4. Component & Interactive State Rules

Every interactive control (`<button>`, `<a>`, `<input>`, `<select>`, `<dialog>`) must implement all 6 states:
1. **Default:** Crisp `1px` border (`--border-subtle`) or solid `--accent-primary` fill.
2. **Hover:** Smooth `180ms` transition (`--accent-hover` for primary CTA; `--border-strong` + `--bg-elevated` for secondary surfaces).
3. **Active / Pressed:** Subtle `scale(0.985)` feedback.
4. **Focus-Visible:** High-contrast `2px solid var(--accent-primary)` outline with `2px` offset (`outline-offset: 2px`). Never remove focus rings without replacement.
5. **Loading:** Inline SVG spinner + `aria-busy="true"` preserving button width (no layout shift).
6. **Disabled:** `opacity: 0.5`, `cursor: not-allowed`, `disabled` attribute.

