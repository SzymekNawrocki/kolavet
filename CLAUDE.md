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
- **Fonts**: Outfit (headings/serif) + Geist (body/sans) via Google Fonts
- **Deployment**: Static output (Astro default)

## Architecture

### Astro + Keystatic Integration

Keystatic v5 **automatically injects its own routes** — do NOT create manual route files for it.
The admin UI is available at `/keystatic` in dev mode without any extra configuration.

React (`@astrojs/react`) is used for two purposes:
1. **Keystatic admin interface** — auto-injected at `/keystatic`
2. **shadcn/ui components** — interactive UI components in `src/components/ui/` and `src/components/*.tsx`

**Hydration rules**: Only add `client:load` or `client:visible` when the component needs browser interactivity (e.g. `NavClient` uses `client:load` because it contains a Sheet/Dialog, `ContactForm` uses `client:load` for form submission). Purely presentational React components (e.g. `PostCard`, `Badge`, `Button`, `Card`) render server-side with no directive — no JavaScript is shipped to the browser.

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
| `keystatic.config.ts` | CMS schema — collections (`posts`) and singletons (`homePage`, `aboutMe`, `contact`, `faq`, `testimonials`) |
| `src/content.config.ts` | Astro 6 content collection schema with `glob` loader (must match Keystatic) |
| `src/styles/global.css` | Tailwind v4 entry point — `@theme` tokens, `@source`, `@layer base` globals, keyframe animations |
| `src/layouts/BaseLayout.astro` | Root layout — SEO, OG tags, Google Fonts, named `head` slot; accepts `lang` prop |
| `astro.config.mjs` | Vite plugin: tailwindcss; Keystatic excluded from production builds (dev-only) |
| `src/lib/utils.ts` | `cn()` utility (clsx + tailwind-merge) — import in all React components |
| `src/lib/i18n.ts` | Locale constants, nav links per locale, `getLocalePaths()` helper |
| `src/lib/reading-time.ts` | `calculateReadingTime()` — used in blog post and post card |
| `src/components/ui/` | shadcn/ui components: `button`, `badge`, `card`, `sheet`, `separator`, `input` |
| `src/components/NavClient.tsx` | React nav — desktop links + mobile Sheet + PL/EN/DE switcher, `client:load` |
| `src/components/PostCard.tsx` | React post card — uses `Badge` + `CardContent`, server-rendered |
| `src/components/ContactForm.tsx` | React contact form — web3forms submission, `client:load` |
| `src/components/ImagePlaceholder.astro` | Image wrapper with glow frame + dot-grid placeholder when `src` is null |
| `src/components/Testimonials.astro` | Keystatic-driven testimonial grid (`singletons.testimonials`) |
| `src/components/NewsletterCTA.astro` | Newsletter signup section — i18n-aware, no backend wired yet |
| `src/components/AboutTeaser.astro` | About teaser section used on `/en/` and `/de/` index pages |
| `src/components/AuthorCard.astro` | Author byline card shown on blog posts |
| `src/components/ShareButtons.tsx` | Social share buttons (Facebook, X, copy-link) for blog posts |
| `src/components/TableOfContents.astro` | Auto-generated TOC injected on blog posts |
| `components.json` | shadcn/ui CLI config — defines aliases, style, and icon library |

### Homepage Section Order (`src/pages/index.astro`)

1. Hero (headline, subtext, CTA buttons, vet photo)
2. Featured Post (optional, driven by `homePage.featuredPostSlug`)
3. Latest Posts (3 most recent, links to `/blog`)
4. Category Cards (Psy / Koty / Egzotyczne / Porady — with SVG icons)
5. Testimonials (`<Testimonials />`)
6. About Me (portrait collage, bio prose, journey timeline)
7. Newsletter CTA (`<NewsletterCTA />`)
8. FAQ (accordion-free list, driven by `singletons.faq`)
9. Contact (card-wrapped phone/email + `<ContactForm />`)
10. Footer

### Tailwind v4 Critical Notes

- `@source "../**/*.{astro,ts,tsx,js}"` in `global.css` is required — Tailwind v4 does not auto-scan `.astro` or `.tsx` files
- Global base styles must be inside `@layer base {}` — unlayered CSS overrides `@layer utilities` and breaks all utility classes
- Custom tokens live in `@theme {}` and generate utilities: `--color-cyan` → `bg-cyan`, `text-cyan`, `border-cyan`
- Typography plugin: `@plugin "@tailwindcss/typography"` in `global.css`
- Animate plugin: `@plugin "tailwindcss-animate"` in `global.css` — required for Sheet open/close animations
- Keyframe animations defined in `global.css`: `fadeInUp`, `float`, `glowPulse`, `scaleIn`, `slideInLeft`, `slideInRight`, `shimmer`
- Scroll-reveal pattern: add `reveal` class + `[animation:...]` — JS in `BaseLayout` toggles `in-view` to start the animation

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
4. Never use a font other than Outfit (headings) or Geist (body)

The design is a **dark/neon** theme — deep navy backgrounds with cyan as the primary accent.

Key Tailwind class → color mapping:
```
bg-dark / text-bright      →  #0A0E27 / #F5F7FA   (page bg / primary text)
bg-surface-light           →  #1A1E3F              (card/section surface)
bg-surface-medium          →  #252D4A              (elevated surface)
text-secondary             →  #B8BED1              (body / supporting text)
text-muted                 →  #7A8399              (captions, labels)
text-cyan / bg-cyan        →  #00D9FF              (primary accent)
text-cyan-dark             →  #00A8CC              (hover state)
text-pink / bg-pink        →  #FF006E              (secondary accent)
text-yellow / bg-yellow    →  #FFBE0B              (tertiary accent)
border-border              →  rgba(0,217,255,0.15) (card/section borders)
shadow-card / shadow-deep  →  cyan-tinted multi-layer shadows
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
- Heading sizes must be responsive: use a smaller base size with `md:`/`lg:` scaling (e.g. `text-[2rem] md:text-[3rem]`)
- Every interactive element must have `focus-visible:outline-2 focus-visible:outline-cyan focus-visible:outline-offset-2`
- `@` path alias resolves to `src/` — use `@/lib/utils`, `@/components/ui/button`, etc.
- Ambient background lights: sections use absolutely-positioned blurred gradient orbs (`bg-cyan/8`, `bg-pink/6`, `bg-yellow/6`) with `[animation:float_Ns_ease-in-out_infinite]`. Always pair with `relative overflow-hidden` on the section and `relative z-10` on the content container.

### i18n (Internationalisation)

- Three locales: `pl` (default, no prefix), `en` (`/en/`), `de` (`/de/`)
- Locale utilities in `src/lib/i18n.ts`: `LOCALES`, `Locale`, `navLinks`, `getLocalePaths()`
- Polish content lives at root paths (`/`, `/blog`)
- About / Contact / FAQ for all locales are **inline sections** on the homepage (`#o-mnie`, `#kontakt`, `#faq`) — there are no separate page files for these
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
- Singletons: `homePage`, `aboutMe`, `contact`, `faq`, `testimonials` — all wired up, all locale-aware
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
- Images: use `<Image />` from `astro:assets` or `<ImagePlaceholder>` — never raw `<img>` without width/height
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
