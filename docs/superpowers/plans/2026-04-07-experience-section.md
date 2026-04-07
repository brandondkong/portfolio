# Experience Section + Sanity Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Sanity-backed Experience section and fix the broken Work section integration.

**Architecture:** New `experience` Sanity document type fetched in an `Experience.astro` component. Fix the existing `Work.astro` to properly query and render Sanity project data using `@sanity/image-url`. Both sections compose into `index.astro` using the existing `Section` component.

**Tech Stack:** Astro, Sanity, @sanity/image-url, Tailwind CSS

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `sanity/experienceType.ts` | Experience document schema |
| Modify | `sanity/index.ts` | Register experience type |
| Create | `src/lib/sanity.ts` | Sanity image URL helper |
| Modify | `src/components/ProjectCard.astro` | Accept string URL for `image` prop |
| Modify | `src/components/landing/Work.astro` | Fix GROQ query, types, and image handling |
| Create | `src/components/landing/Experience.astro` | Experience section component |
| Modify | `src/pages/index.astro` | Wire up Work and Experience components |

---

### Task 1: Install `@sanity/image-url`

- [ ] **Step 1: Install the package**

```bash
bun add @sanity/image-url
```

- [ ] **Step 2: Commit**

```bash
git add package.json bun.lock
git commit -m "chore: add @sanity/image-url dependency"
```

---

### Task 2: Create Sanity image URL helper

**Files:**
- Create: `src/lib/sanity.ts`

- [ ] **Step 1: Create the helper**

```ts
// src/lib/sanity.ts
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { sanityClient } from "sanity:client";

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/sanity.ts
git commit -m "feat: add sanity image URL builder helper"
```

---

### Task 3: Fix ProjectCard to accept image URLs

**Files:**
- Modify: `src/components/ProjectCard.astro`

ProjectCard currently types `image` as `string` but uses Astro's `<Image>` component which expects `ImageMetadata`. Since Sanity images come as URLs, switch to a plain `<img>` tag for URL strings.

- [ ] **Step 1: Update ProjectCard**

Replace the entire component with:

```astro
---
interface Props {
    image: string;
    name: string;
};

const { image, name } = Astro.props;
---

<div
class="project-card w-full h-auto aspect-square border border-border relative overflow-hidden group"
>
    <img
    src={image}
    alt={name}
    width={800}
    height={800}
    loading="lazy"
    class="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-normal"
    />
    <div class="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-overlay to-transparent p-14 opacity-0 group-hover:opacity-100 transition-opacity duration-normal flex items-end">
        <p class="text-background font-normal text-5xl tracking-tight">{name}</p>
    </div>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ProjectCard.astro
git commit -m "fix: update ProjectCard to use img tag for URL-based images"
```

---

### Task 4: Fix Work section

**Files:**
- Modify: `src/components/landing/Work.astro`

- [ ] **Step 1: Rewrite Work.astro with correct query, types, and image handling**

```astro
---
import type { SanityDocument } from "@sanity/client";
import { sanityClient } from "sanity:client";
import { urlFor } from "../../lib/sanity";

import Section from "../Section.astro";
import ProjectCard from "../ProjectCard.astro";

interface Project extends SanityDocument {
  title: string;
  slug: { current: string };
  coverImage: {
    asset: { _ref: string; _type: string };
  };
}

const PROJECTS_QUERY = `*[_type == "project" && defined(slug.current)]|order(_createdAt desc)[0...12]{ _id, title, slug, coverImage }`;
const projects = await sanityClient.fetch<Project[]>(PROJECTS_QUERY);
---

<Section title="Work" buttonText="Show More" class="pt-8 pb-20 flex flex-col gap-12">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    {projects.map((project) => (
      <ProjectCard
        name={project.title}
        image={urlFor(project.coverImage).width(800).height(800).url()}
      />
    ))}
  </div>
</Section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/landing/Work.astro
git commit -m "fix: correct Work section GROQ query, types, and image handling"
```

---

### Task 5: Create Experience Sanity schema

**Files:**
- Create: `sanity/experienceType.ts`
- Modify: `sanity/index.ts`

- [ ] **Step 1: Create the schema type**

```ts
// sanity/experienceType.ts
import { defineField, defineType } from "sanity";

export const experienceType = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({
      name: "company",
      title: "Company",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "date",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "company",
      subtitle: "role",
    },
  },
});
```

- [ ] **Step 2: Register the type in the schema index**

Update `sanity/index.ts`:

```ts
import { projectType } from "./projectType";
import { experienceType } from "./experienceType";

export const schemaTypes = [projectType, experienceType];
```

- [ ] **Step 3: Commit**

```bash
git add sanity/experienceType.ts sanity/index.ts
git commit -m "feat: add experience document type to Sanity schema"
```

---

### Task 6: Create Experience component

**Files:**
- Create: `src/components/landing/Experience.astro`

- [ ] **Step 1: Create the component**

```astro
---
import type { SanityDocument } from "@sanity/client";
import { sanityClient } from "sanity:client";

import Section from "../Section.astro";
import Text from "../Text.astro";

interface Experience extends SanityDocument {
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
  description: string | null;
  order: number;
}

const EXPERIENCE_QUERY = `*[_type == "experience"]|order(order asc){ _id, company, role, startDate, endDate, description, order }`;
const experiences = await sanityClient.fetch<Experience[]>(EXPERIENCE_QUERY);

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function formatRange(start: string, end: string | null): string {
  return `${formatDate(start)} — ${end ? formatDate(end) : "Present"}`;
}
---

<Section title="Experience" class="pt-8 pb-20 flex flex-col gap-12">
  <div class="flex flex-col">
    {experiences.map((exp, i) => (
      <div class:list={["py-6 flex flex-col gap-2", i !== experiences.length - 1 && "border-b border-border"]}>
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <Text variant="body" class="font-medium">{exp.company}</Text>
            <Text variant="label" class="text-muted hidden sm:inline">/</Text>
            <Text variant="label" class="text-muted">{exp.role}</Text>
          </div>
          <Text variant="label" class="text-muted">{formatRange(exp.startDate, exp.endDate)}</Text>
        </div>
        {exp.description && (
          <Text variant="label" class="text-muted max-w-2xl">{exp.description}</Text>
        )}
      </div>
    ))}
  </div>
</Section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/landing/Experience.astro
git commit -m "feat: add Experience section component with Sanity integration"
```

---

### Task 7: Wire up index.astro

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Update index.astro to use Work and Experience components**

```astro
---
import Base from "../layouts/Base.layout.astro";
import Hero from "../components/landing/Hero.astro";
import Work from "../components/landing/Work.astro";
import Experience from "../components/landing/Experience.astro";
import Section from "../components/Section.astro";
import Text from "../components/Text.astro";
---

<Base>
  <Hero />
  <Work />
  <Experience />

  <Section title="About" buttonText="Show More" class="pt-8 pb-20 flex flex-col gap-12">
    <Text variant="body-lg" class="text-justify max-w-2xl">
      I collaborate with businesses of all sizes worldwide, using the latest technologies. My designs have also earned multiple awards.
    </Text>
  </Section>
</Base>
```

- [ ] **Step 2: Verify the dev server builds without errors**

```bash
bun run dev
```

Visit `http://localhost:4321` and confirm:
- Work section renders (may be empty if no Sanity data yet)
- Experience section renders (may be empty if no Sanity data yet)
- About section still appears below Experience
- Sanity Studio accessible at `/admin`

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: wire up Work and Experience sections in index page"
```
