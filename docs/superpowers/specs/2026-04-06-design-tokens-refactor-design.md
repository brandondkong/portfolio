# Design Tokens & Styling Refactor

## Goal

Replace hardcoded Tailwind values with a centralized token system using Tailwind v4's `@theme` directive. Standardize spacing, colors, typography, and transitions across all components for consistency and maintainability.

## Approach

All tokens defined as CSS custom properties inside `@theme` in `global.css`. Tailwind v4 auto-generates utility classes from these (e.g., `--color-border` becomes `border-border`).

---

## Token Definitions

### Colors

| Token | Value | Usage |
|---|---|---|
| `--color-foreground` | `black` | Text, icons, dots |
| `--color-background` | `white` | Page background |
| `--color-muted` | `#737373` (neutral-500) | Secondary/subtle text |
| `--color-border` | `#f5f5f5` (neutral-100) | All borders |
| `--color-surface` | `#f5f5f5` (neutral-100) | Button backgrounds, card fills |
| `--color-overlay` | `rgba(0,0,0,0.8)` | Gradient overlays (project cards) |

### Typography — Display Scale

| Token | Value | Usage |
|---|---|---|
| `--text-display-sm` | `72px` | Display text on mobile |
| `--text-display-md` | `120px` | Display text on tablet |
| `--text-display-lg` | `168px` | Display text on desktop |

### Spacing

| Token | Value | Usage |
|---|---|---|
| `--spacing-section-x` | `1.25rem` (default) / `5rem` (sm+) | Horizontal section padding |
| `--spacing-section-gap` | `3rem` | Gap between section children |

### Transitions

| Token | Value | Usage |
|---|---|---|
| `--duration-fast` | `200ms` | Cursor, button hover |
| `--duration-normal` | `500ms` | Card scale, overlay fade |
| `--ease-default` | `ease` | Default easing |

---

## Component Changes

### global.css

Expand `@theme inline` with all token definitions. Add `--color-*`, `--text-display-*`, `--spacing-*`, `--duration-*`, and `--ease-*` tokens.

### Section.astro

- Replace `px-6 sm:px-20` with token-based padding (use `--spacing-section-x`)
- Border color: `border-neutral-100` -> `border-border`

### Navbar.astro

- Border: `border-neutral-100` -> `border-border`
- Dot color: `bg-black` -> `bg-foreground`
- Logo text: implicitly uses foreground (already inherits black)

### Hero.astro

- Title sizes: `text-[72px] md:text-[120px] lg:text-[168px]` -> `text-display-sm md:text-display-md lg:text-display-lg`
- No other changes needed — font weights and tracking stay as-is since they're one-off design decisions for the hero

### Button.astro

- Background: `bg-neutral-100` -> `bg-surface`
- Hover: `hover:bg-black hover:text-white` -> `hover:bg-foreground hover:text-background`
- Transition duration: `duration-300` -> `duration-fast` (closer to 200ms for snappy button feel)

### ProjectCard.astro

- Border: `border` -> `border border-border`
- Overlay gradient: `from-black/80` -> `from-overlay`
- Text color: `text-white` -> `text-background`
- Transition duration: `duration-500` -> `duration-normal`
- Image hover transition: `duration-500` -> `duration-normal`

### Cursor.astro

- Transition: `0.2s ease` -> `var(--duration-fast) var(--ease-default)` (plain CSS, not Tailwind utilities)
- No other changes — cursor is a self-contained component with its own specific values

---

## Out of Scope

- Dark mode
- Additional color palette
- Typography scale beyond display sizes (Tailwind defaults are fine for body/heading text)
- Restructuring page layout or component hierarchy (beyond token swaps)
- Fragment Mono font usage (not yet used anywhere)

---

## File Impact

| File | Change Type |
|---|---|
| `src/styles/global.css` | Token definitions added to `@theme` |
| `src/components/Section.astro` | Token class swaps |
| `src/components/Navbar.astro` | Token class swaps |
| `src/components/Hero.astro` | Display size token swaps |
| `src/components/Button.astro` | Token class swaps |
| `src/components/ProjectCard.astro` | Token class swaps |
| `src/components/Cursor.astro` | CSS variable references |
