# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at localhost:4321 (includes Keystatic admin at /keystatic)
npm run build     # Build static site to ./dist/
npm run preview   # Preview production build locally
npx astro check   # TypeScript type-check all .astro files
```

No lint or test scripts are configured yet.

## Project Context

Personal blog for Michalina, a veterinary doctor. Content focuses on animal health, pet care,
and veterinary insights written for pet owners. The tone is warm, trustworthy, and expert —
like advice from a vet you already know.

## Tech Stack

- **Framework**: Astro 6 (static site generation, island architecture)
- **CMS**: Keystatic v5 (file-based CMS, Git-backed, no external database)
- **Component Library**: shadcn/ui — React components in `src/components/ui/`, customized to the design system
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite` — utility classes only, no scoped `<style>` blocks
- **Typography plugin**: `@tailwindcss/typography` for article prose
- **Animations**: `tailwindcss-animate` — powers Sheet open/close transitions
- **Icons**: `lucide-react` (used in shadcn components)
- **Fonts**: Lora (headings) + Inter (body) via Google Fonts
- **Deployment**: Static output (Astro default)

## Architecture

### Astro + Keystatic Integration

Keystatic v5 **automatically injects its own routes** — do NOT create manual route files for it.
The admin UI is available at `/keystatic` in dev mode without any extra configuration.

React (`@astrojs/react`) is used for two purposes:
1. **Keystatic admin interface** — auto-injected at `/keystatic`
2. **shadcn/ui components** — interactive UI components in `src/components/ui/` and `src/components/*.tsx`

**Hydration rules**: Only add `client:load` or `client:visible` when the component needs browser interactivity (e.g. `NavClient` uses `client:load` because it contains a Sheet/Dialog). Purely presentational React components (e.g. `PostCard`, `Badge`, `Button`) render server-side with no directive — no JavaScript is shipped to the browser.

Content is authored in Markdoc (`@astrojs/markdoc`). Blog posts live in `src/content/posts/`
as `.mdoc` files. The content schema is defined in `keystatic.config.ts` (root) and mirrored
in `src/content.config.ts` for Astro's content collections.

### Data Flow

1. Keystatic writes `.mdoc` files + frontmatter to `src/content/posts/`
2. Astro reads them via `getCollection('posts')` at build time
3. Dynamic blog routes use `getStaticPaths` + slug from `post.data.title.slug`
4. Images stored in `public/images/` and referenced by path

### Key Files

| File | Purpose |
|------|---------|
| `keystatic.config.ts` | CMS schema — collections (`posts`) and singletons (`homePage`, `aboutMe`, `contact`) |
| `src/content.config.ts` | Astro 6 content collection schema with `glob` loader (must match Keystatic) |
| `src/styles/global.css` | Tailwind v4 entry point — `@theme` tokens, `@source`, `@layer base` globals |
| `src/layouts/BaseLayout.astro` | Root layout — SEO, OG tags, Google Fonts, named `head` slot; accepts `lang` prop |
| `astro.config.mjs` | Vite plugin: tailwindcss; Keystatic excluded from production builds (dev-only) |
| `src/lib/utils.ts` | `cn()` utility (clsx + tailwind-merge) — import in all React components |
| `src/lib/i18n.ts` | Locale constants, nav links per locale, `getLocalePaths()` helper |
| `src/components/ui/` | shadcn/ui components: `button`, `badge`, `card`, `sheet`, `separator` |
| `src/components/NavClient.tsx` | React nav — desktop links + mobile Sheet + PL/EN/DE switcher, `client:load` |
| `src/components/PostCard.tsx` | React post card — uses `Badge` + `CardContent`, server-rendered |
| `components.json` | shadcn/ui CLI config — defines aliases, style, and icon library |

### Tailwind v4 Critical Notes

- `@source "../**/*.{astro,ts,tsx,js}"` in `global.css` is required — Tailwind v4 does not auto-scan `.astro` or `.tsx` files
- Global base styles must be inside `@layer base {}` — unlayered CSS overrides `@layer utilities` and breaks all utility classes
- Custom tokens live in `@theme {}` and generate utilities: `--color-sage` → `bg-sage`, `text-sage`, `border-sage`
- Typography plugin: `@plugin "@tailwindcss/typography"` in `global.css`
- Animate plugin: `@plugin "tailwindcss-animate"` in `global.css` — required for Sheet open/close animations

### Content Collection Schema (Astro 6)

`post.data.title` is a nested object from `fields.slug()`:
```ts
title: { name: string; slug: string }
```
Use `post.data.title.name` for display and `post.data.title.slug` for URL routing.

## Design System

**DESIGN.md is the single source of truth for all visual decisions.**

Before building any component:
1. Read the relevant section in DESIGN.md
2. Use only colors, fonts, spacing, and radii defined there
3. Never introduce new colors outside the palette
4. Never use a font other than Lora (headings) or Inter (body)

Key Tailwind class → color mapping:
```
bg-cream / text-ink        →  #F9F5F0 / #2C2C2C  (page bg / primary text)
text-sage / bg-sage        →  #7B9E87             (primary accent)
text-sage-dark             →  #5C7A68             (hover state)
bg-sage-light / text-sage-dark  →  badge colors
text-muted                 →  #7A7068             (secondary text)
border-border              →  rgba(0,0,0,0.08)    (card/nav borders)
shadow-card / shadow-deep  →  warm multi-layer shadows
```

## Workflow Rules

### Plan Mode Before Implementation
**Always enter Plan Mode before implementing a component, page, or feature.**
- Outline the component structure, props, and Tailwind classes
- Identify which DESIGN.md tokens apply
- Get confirmation before writing code
- Exception: trivial one-line fixes do not require Plan Mode

### Component Standards
- Astro components in `src/components/*.astro`, React/shadcn components in `src/components/*.tsx` and `src/components/ui/*.tsx`
- Use Tailwind utility classes — avoid scoped `<style>` blocks unless unavoidable
- Use `cn()` from `@/lib/utils` for conditional class composition in `.tsx` files
- Use shadcn/ui primitives (`Button`, `Badge`, `Card`, `Sheet`, `Separator`) instead of hand-rolling equivalent patterns
- Mobile-first responsive: default → `md:` (768px) → `lg:` (1024px)
- `sm:` means 640px **and above** — do not use it for mobile-only styles
- Every interactive element must have `focus-visible:outline-2 focus-visible:outline-sage focus-visible:outline-offset-2`
- `@` path alias resolves to `src/` — use `@/lib/utils`, `@/components/ui/button`, etc.

### i18n (Internationalisation)

- Three locales: `pl` (default, no prefix), `en` (`/en/`), `de` (`/de/`)
- Locale utilities in `src/lib/i18n.ts`: `LOCALES`, `Locale`, `navLinks`, `getLocalePaths()`
- Polish pages live at root (`/`, `/blog`, `/o-mnie`, `/kontakt`)
- English and German pages live under `src/pages/[lang]/` (only `en`/`de` in `getStaticPaths`)
- `BaseLayout` accepts a `lang` prop (default `'pl'`) used on `<html lang>`
- `NavClient` receives `links`, `currentLocale`, `localePaths` from `Nav.astro`; renders PL|EN|DE switcher
- Keystatic singletons store locale content as **flat prefixed fields**: `en_heading`, `de_heading`, `en_bio`, etc.
  - Polish fields keep their original names (`heading`, `intro`, `bio`) for backward compatibility
  - EN/DE pages fall back to Polish values when a locale field is empty
- Blog posts stay at Polish-only URLs (`/blog/[slug]`); `[lang]/blog` links there

### Keystatic CMS
- Content schema defined in `keystatic.config.ts`
- Blog posts stored as Markdoc in `src/content/posts/`
- Images stored in `public/images/`
- Never hardcode content that belongs in the CMS
- Singletons: `homePage`, `aboutMe`, `contact` — all wired up, all locale-aware
- Keystatic admin (`/keystatic`) only active in dev mode (`NODE_ENV !== 'production'`)

### Astro Conventions
- Pages in `src/pages/`
- Layouts in `src/layouts/`
- Content collections via `src/content.config.ts` (Astro 6 — uses `glob` loader)
- Use `getStaticPaths` + `getCollection` for dynamic routes
- Prefer Astro components over framework components unless interactivity is required
- If client-side JS is needed, use `client:load` or `client:visible` directives sparingly

## Performance Target: Lighthouse 100/100/100/100

Every change must maintain perfect Lighthouse scores across all four categories:
Performance, Accessibility, Best Practices, SEO.

### Performance
- Images: use `<Image />` from `astro:assets` — never raw `<img>` without width/height
- Fonts: `font-display: swap`, preconnect to `fonts.googleapis.com` and `fonts.gstatic.com`
- No render-blocking scripts — defer or async everything external
- Minimize JavaScript — Astro ships zero JS by default, keep it that way where possible

### Accessibility
- All images require meaningful `alt` text (empty `alt=""` only for decorative images)
- Heading hierarchy: one `<h1>` per page, logical `h2` → `h3` order
- Color contrast: verify against ratios in DESIGN.md Section 8 before using any color pair
- Keyboard navigation: tab order must be logical, all interactive elements focusable
- ARIA labels on icon-only buttons and ambiguous links
- `lang` attribute on `<html>` driven by `BaseLayout`'s `lang` prop — must be set on every page

### Best Practices
- No console errors or warnings in production
- No mixed content (all assets over HTTPS)
- Valid, semantic HTML — use `<article>`, `<nav>`, `<main>`, `<aside>`, `<footer>` correctly
- `<meta charset="UTF-8">` and `<meta name="viewport">` always present

### SEO
- Every page: unique `<title>` and `<meta name="description">`
- Blog posts: Open Graph tags (`og:title`, `og:description`, `og:image`)
- Canonical URL via `<link rel="canonical">` in `BaseLayout`
- Structured data (JSON-LD) for blog posts: `BlogPosting` schema — injected via `slot="head"` with `is:inline`
- `robots.txt` and `sitemap.xml` generated by `@astrojs/sitemap` (site: `https://kolavet.pl`)

## Code Style

- No comments unless the WHY is non-obvious
- No unused variables, imports, or CSS rules
- Prefer named exports over default exports for components
- TypeScript for all `.ts` and `.astro` files — no `any` types

## Content Guidelines

- Tone: warm, expert, personal — Michalina writes in first person
- Primary language: Polish; EN/DE translations maintained via Keystatic locale fields
- Categories: `psy`, `koty`, `egzotyczne`, `porady` (defined in Keystatic schema)
- Every post must have: title, date, category, excerpt, cover image, body
- Cover images: minimum 1200×630px for Open Graph compatibility
