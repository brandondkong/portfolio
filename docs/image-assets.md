# Required Image Assets

## 1. `public/og-default.png` — Default Open Graph Image

- **Dimensions:** 1200 × 630px
- **Format:** PNG
- **Location:** `apps/kong.ly/public/og-default.png`
- **Purpose:** Fallback social share image for pages without a specific cover (homepage, about, contact, blog index, works index)
- **What it should be:** Your personal brand card — white background (`white`) with black text (`black`) matching your site's color scheme, your name "Brandon Kong" in large text, tagline "Software Engineer & Designer", and your site URL `kong.ly`. Think of it as your digital business card that appears when someone shares your link on Twitter/LinkedIn/Discord.

## 2. `public/favicon.ico` — ICO Favicon

- **Dimensions:** 32 × 32px (multi-size ICO with 16×16 and 32×32 recommended)
- **Format:** ICO
- **Location:** `apps/kong.ly/public/favicon.ico`
- **Purpose:** Browser tab icon for older browsers that don't support SVG favicons (Safari < 15, some Android browsers)
- **What it should be:** A simplified version of your logo/brand mark. A bold "K" or your initials "BK" — black mark on white background (or inverted, your preference). Keep it simple — at 16px, details disappear.

## 3. `public/favicon.svg` — SVG Favicon (replace current Astro default)

- **Dimensions:** Any (vector, will scale)
- **Format:** SVG
- **Location:** `apps/kong.ly/public/favicon.svg`
- **Purpose:** Modern browser tab icon. Currently shows the default Astro rocket logo.
- **What it should be:** Same brand mark as the ICO but as a clean vector. Advantage: can use `prefers-color-scheme` media query inside the SVG to flip colors in dark/light mode.

## 4. `public/apple-touch-icon.png` — Apple Touch Icon

- **Dimensions:** 180 × 180px
- **Format:** PNG
- **Location:** `apps/kong.ly/public/apple-touch-icon.png`
- **Purpose:** Icon shown when someone adds your site to their iPhone/iPad home screen
- **What it should be:** Your brand mark on a solid background, with some padding (the OS applies rounded corners automatically). No transparency — use a solid `white` or `black` background depending on your brand preference.

## 5. Manifest Icons (referenced in `public/site.webmanifest`)

### `public/android-chrome-192x192.png`

- **Dimensions:** 192 × 192px
- **Format:** PNG
- **Location:** `apps/kong.ly/public/android-chrome-192x192.png`
- **Purpose:** Android home screen icon

### `public/android-chrome-512x512.png`

- **Dimensions:** 512 × 512px
- **Format:** PNG
- **Location:** `apps/kong.ly/public/android-chrome-512x512.png`
- **Purpose:** Android splash screen icon

### What they should be

Same brand mark as apple-touch-icon, scaled up. Match the same background/foreground colors you chose for the apple-touch-icon. The 512px version is also used for PWA splash screens.
