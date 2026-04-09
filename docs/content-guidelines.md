# Content Guidelines

Guidelines for Sanity CMS content to ensure the site renders consistently across all screen sizes.

## Blog Posts

| Field | Limit | Notes |
|---|---|---|
| Title | 70 characters max | Used as card heading and page `<h1>`. Long titles break layout on mobile and affect SEO meta. |
| Excerpt | 160 characters max | Shown on blog cards. Keep to 2-3 lines for consistent card heights in the grid. |
| Cover Image | 1600x800px min (2:1) | Rendered at `aspect-2/1`, served at 800x400. Upload at 2x for retina. |
| Body Images | 1600px wide min | Displayed full-width inside a `max-w-2xl` prose column. 1600px covers retina. |
| Body Image Alt | Always fill in | Required for accessibility and SEO. |
| Tags | 3-4 max, 1-2 words each | Rendered as pills that wrap. Too many or too long pushes card height. |

## Works / Projects

| Field | Limit | Notes |
|---|---|---|
| Title | 30 characters max | Overlaid on cover image in cards. Long titles crowd the overlay. |
| Cover Image | 1600x1600px min (1:1) | Rendered as a square. Compose for center-crop. |
| Description | 300 characters max | Shown as small body text in a `max-w-2xl` column. A short paragraph. |
| Feature Title | 40 characters max | Single-line heading. |
| Feature Description | 200 characters max | Brief explanation, not a full paragraph. |
| Gallery Images | 1600px wide min | Use a consistent aspect ratio within each project's gallery. |

## Experience

| Field | Limit | Notes |
|---|---|---|
| Role | Keep concise | Displayed inline next to company name. |
| Description | Optional, short paragraph | Not always shown, keep brief if used. |

## Companies

| Field | Limit | Notes |
|---|---|---|
| Logo | Square, 128x128px min | Transparent PNG or SVG. Rendered at 32x32px. |

## Education

| Field | Limit | Notes |
|---|---|---|
| Logo | Square, 128x128px min | Transparent PNG or SVG. Rendered at 32x32px. |

## Skills

| Field | Limit | Notes |
|---|---|---|
| Icon | Square, 200x200px min | Transparent PNG or SVG. Rendered at 24x24px. |

## Site Settings

| Field | Limit | Notes |
|---|---|---|
| Currently Text | 300 characters max | Shown in the "Currently" section on the about page. |

## General Image Tips

- Always upload at 2x the display size for retina screens
- Use consistent aspect ratios within grids (blog cards, gallery)
- Prefer PNG with transparency for logos/icons, JPEG/WebP for photos
- Keep file sizes reasonable — Sanity's CDN handles resizing, but source quality matters
