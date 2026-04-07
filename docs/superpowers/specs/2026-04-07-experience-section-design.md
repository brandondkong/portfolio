# Experience Section + Sanity Fixes Design

## Summary

Add an Experience section to the portfolio (between Work and About) backed by Sanity CMS, and fix existing issues in the Sanity-powered Work section.

## Sanity Schema: `experience`

New document type with the following fields:

| Field       | Type             | Required | Notes                          |
|-------------|------------------|----------|--------------------------------|
| company     | string           | yes      | Company name                   |
| role        | string           | yes      | Job title                      |
| startDate   | date             | yes      | Start date                     |
| endDate     | date             | no       | Null = "Present"               |
| description | text             | no       | Brief description of work      |
| order       | number           | yes      | Manual sort order (ascending)  |

Register the new type in `sanity/index.ts` alongside `projectType`.

## Experience Component (`src/components/landing/Experience.astro`)

- Fetches all `experience` documents from Sanity, ordered by `order` ascending
- Uses the existing `Section` component with `title="Experience"`
- Each entry renders as:
  - **Top row**: Company and role (left), formatted date range (right)
  - **Below**: Description in muted text
- Entries separated by `border-b border-border` (last entry has no border)
- Date formatting: "MMM YYYY - MMM YYYY" or "MMM YYYY - Present"
- Typography: company in `font-medium`, role as body text, dates in `label` variant, description in muted color

## Fix Work Section

### Current issues in `src/components/landing/Work.astro`:
1. Not imported in `index.astro`
2. GROQ query fetches `publishedAt` (not in schema) and misses `coverImage`
3. `typeof projectType[]` is not a valid document type
4. `project.name` doesn't exist (field is `title`)
5. Passing a string to `image` prop which expects `ImageMetadata`

### Fixes:
- Define a `Project` TypeScript interface: `{ _id: string; title: string; slug: { current: string }; coverImage: SanityImageSource }`
- Update GROQ query: `*[_type == "project" && defined(slug.current)]|order(_createdAt desc)[0...12]{ _id, title, slug, coverImage }`
- Use `@sanity/image-url` to build image URLs from `coverImage`
- Update ProjectCard to accept a `src` string (image URL) in addition to or instead of `ImageMetadata`, OR render project images directly in Work.astro without ProjectCard
- Pass `project.title` to `name` prop
- Import and use `Work.astro` in `index.astro`

## Page Structure (index.astro)

```
<Base>
  <Hero />
  <Work />
  <Experience />
  <Section title="About" ...> ... </Section>
</Base>
```

## Dependencies

- `@sanity/image-url` package (for building image URLs from Sanity image references)
- Existing: `@sanity/astro`, `@sanity/client`
