# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at localhost:4321 (includes Keystatic admin at /keystatic)
npm run build     # Build static site to ./dist/
npm run preview   # Preview production build locally
npx astro check  # TypeScript type-check all .astro files
```

No lint or test scripts are configured yet.

## Project Context

Personal blog for Michalina, a veterinary doctor. Content focuses on animal health, pet care,
and veterinary insights written for pet owners. The tone is warm, trustworthy, and expert —
like advice from a vet you already know.

## Tech Stack

- **Framework**: Astro (static site generation, island architecture)
- **CMS**: Keystatic (file-based CMS, Git-backed, no external database)
- **Styling**: CSS custom properties + scoped component styles (no Tailwind)
- **Fonts**: Lora + Inter via Google Fonts
- **Deployment**: Static output (Astro `output: 'static'`)

## Architecture

### Astro + Keystatic Integration

Keystatic requires two route files that proxy all CMS admin traffic:

- `src/pages/keystatic/[...params].astro` — serves the Keystatic React UI
- `src/pages/api/keystatic/[...params].ts` — handles Keystatic's API calls

React (`@astrojs/react`) is installed **exclusively** for Keystatic's admin interface — blog content pages use only Astro components. Do not use React components outside of Keystatic integration files.

Content is authored in Markdoc (`@astrojs/markdoc`). Blog posts live in `src/content/posts/` as `.mdoc` files. The content schema is defined in `keystatic.config.ts` (root) and mirrored in `src/content/config.ts` for Astro's content collections.

### Data Flow

1. Keystatic writes `.mdoc` files + frontmatter to `src/content/posts/`
2. Astro reads them via `getCollection('posts')` at build time
3. Dynamic blog routes use `getStaticPaths` to generate one page per post
4. Images are stored in `public/images/` and referenced by path

### Key Files

| File | Purpose |
|------|---------|
| `keystatic.config.ts` | CMS schema — collections and singletons |
| `src/content/config.ts` | Astro content collection schema (must match Keystatic) |
| `src/styles/tokens.css` | CSS custom properties for all design tokens |
| `astro.config.mjs` | Integrations: react, markdoc, keystatic, sitemap |

## Design System

**DESIGN.md is the single source of truth for all visual decisions.**

Before building any component:
1. Read the relevant section in DESIGN.md
2. Use only colors, fonts, spacing, and radii defined there
3. Never introduce new colors outside the palette
4. Never use a font other than Lora (headings) or Inter (body)

Key values to memorize:
```
Background:    #F9F5F0   Accent:         #7B9E87
Text:          #2C2C2C   Secondary:      #C4956A
Card surface:  #FFFFFF   Muted text:     #7A7068
Border:        rgba(0,0,0,0.08)
```

## Workflow Rules

### Plan Mode Before Implementation
**Always enter Plan Mode before implementing a component, page, or feature.**
- Outline the component structure, props, and CSS approach
- Identify which DESIGN.md tokens apply
- Get confirmation before writing code
- Exception: trivial one-line fixes do not require Plan Mode

### Component Standards
- Each component lives in `src/components/`
- Scoped `<style>` blocks only — no global style leakage
- Use CSS custom properties for all design tokens (defined in `src/styles/tokens.css`)
- Mobile-first responsive styles
- Every interactive element must have a visible focus state (`outline: 2px solid #7B9E87`)

### Keystatic CMS
- Content schema defined in `keystatic.config.ts`
- Blog posts stored as Markdoc in `src/content/posts/`
- Images stored in `public/images/`
- Never hardcode content that belongs in the CMS

### Astro Conventions
- Pages in `src/pages/`
- Layouts in `src/layouts/`
- Content collections via `src/content/config.ts`
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
- Critical CSS inlined, non-critical deferred

### Accessibility
- All images require meaningful `alt` text (empty `alt=""` only for decorative images)
- Heading hierarchy: one `<h1>` per page, logical `h2` → `h3` order
- Color contrast: verify against ratios in DESIGN.md Section 8 before using any color pair
- Keyboard navigation: tab order must be logical, all interactive elements focusable
- ARIA labels on icon-only buttons and ambiguous links
- `lang="pl"` on `<html>` (content is in Polish)

### Best Practices
- No console errors or warnings in production
- No mixed content (all assets over HTTPS)
- Valid, semantic HTML — use `<article>`, `<nav>`, `<main>`, `<aside>`, `<footer>` correctly
- `<meta charset="UTF-8">` and `<meta name="viewport">` always present

### SEO
- Every page: unique `<title>` and `<meta name="description">`
- Blog posts: Open Graph tags (`og:title`, `og:description`, `og:image`)
- Canonical URLs via Astro's `<SEO>` or manual `<link rel="canonical">`
- Structured data (JSON-LD) for blog posts: `BlogPosting` schema
- `robots.txt` and `sitemap.xml` generated by `@astrojs/sitemap`

## Code Style

- No comments unless the WHY is non-obvious
- No unused variables, imports, or CSS rules
- Prefer named exports over default exports for components
- TypeScript for all `.ts` and `.astro` files — no `any` types
- CSS: BEM-like class naming (`.post-card__title`, `.nav__link--active`)

## Content Guidelines

- Tone: warm, expert, personal — Michalina writes in first person
- Categories must match those defined in Keystatic schema
- Every post must have: title, date, category, excerpt, cover image, body
- Cover images: minimum 1200×630px for Open Graph compatibility
