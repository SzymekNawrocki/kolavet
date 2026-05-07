# Kolavet — Production Ship Plan

## Decisions Made

| Area | Decision |
|------|----------|
| Blog i18n | One post entry with PL / EN / DE content tabs, shared `coverImage`, `publishDate`, `category` |
| CMS auth | Keystatic Cloud — Michalina logs in at `/admin` with GitHub account |
| Hosting | Must support SSR (Netlify or Vercel) — Keystatic Cloud requires it |
| Newsletter | MailerLite |
| Analytics | Google Analytics 4 + GDPR cookie consent banner |
| Component org | Hybrid — `ui/`, `blog/`, `nav/` subdirs + everything else flat |
| OG images | Astro static OG image generation |

---

## Folder Structure (Target State)

```
src/
├── assets/
├── components/
│   ├── ui/              # shadcn/ui primitives (unchanged)
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── separator.tsx
│   │   └── sheet.tsx
│   ├── blog/            # Blog-specific components
│   │   ├── AuthorCard.astro
│   │   ├── BlogFilter.tsx
│   │   ├── PostCard.tsx
│   │   ├── ShareButtons.tsx
│   │   └── TableOfContents.astro
│   ├── nav/             # Navigation components
│   │   ├── Footer.astro
│   │   ├── Nav.astro
│   │   └── NavClient.tsx
│   ├── AboutTeaser.astro
│   ├── CategoryGrid.astro
│   ├── CookieBanner.tsx       # NEW — GDPR consent
│   ├── ContactForm.tsx
│   ├── FaqSection.astro
│   ├── HeroSection.astro
│   ├── ImagePlaceholder.astro
│   ├── NewsletterCTA.astro
│   └── Testimonials.astro
├── content/
│   ├── posts/           # .mdoc files per language: slug.pl.mdoc, slug.en.mdoc, slug.de.mdoc
│   └── pages/
├── layouts/
│   └── BaseLayout.astro
├── lib/
│   ├── categories.ts
│   ├── cms.ts
│   ├── i18n.ts
│   ├── posts.ts         # deepened — locale-transparent PostData[]
│   ├── reading-time.ts
│   └── utils.ts
├── pages/
│   ├── index.astro              # / (PL homepage)
│   ├── 404.astro
│   ├── rss.xml.ts
│   ├── api/
│   │   └── newsletter.ts        # NEW — MailerLite signup endpoint
│   ├── blog/
│   │   ├── index.astro          # /blog (PL listing)
│   │   └── [slug].astro         # /blog/[slug] (PL post)
│   └── [lang]/
│       ├── index.astro          # /en/, /de/ homepages
│       └── blog/
│           ├── index.astro      # /en/blog, /de/blog listing
│           └── [slug].astro     # NEW — /en/blog/[slug], /de/blog/[slug]
└── styles/
    └── global.css
```

---

## Phase 1 — SSR + Keystatic Cloud Auth

**Goal:** Michalina can log in at `kolavet.pl/admin` with her GitHub account and edit all content.

**Why first:** Keystatic Cloud requires SSR. Everything else depends on the deployment target being settled.

### Tasks

- [ ] **1.1** Install SSR adapter
  ```bash
  npx astro add netlify
  # or: npx astro add vercel
  ```

- [ ] **1.2** Update `astro.config.mjs`
  ```js
  import netlify from '@astrojs/netlify';
  export default defineConfig({
    output: 'hybrid',   // static by default, SSR where needed
    adapter: netlify(),
    // ... rest unchanged
  });
  ```
  `output: 'hybrid'` keeps all pages statically generated except the Keystatic admin routes.

- [ ] **1.3** Create a Keystatic Cloud project at [keystatic.cloud](https://keystatic.cloud)
  - Sign in with GitHub
  - Create a new project linked to the `kolavet` GitHub repo
  - Note the project `team` and `project` slugs

- [ ] **1.4** Update `keystatic.config.ts` storage
  ```ts
  import { config } from '@keystatic/core';
  export default config({
    storage: {
      kind: 'cloud',
    },
    cloud: {
      project: 'your-team/kolavet',
    },
    ui: {
      navigation: {
        // renames /keystatic → /admin handled by Keystatic Cloud config
      },
    },
    // ... collections + singletons unchanged
  });
  ```

- [ ] **1.5** Set environment variables
  ```
  KEYSTATIC_GITHUB_CLIENT_ID=...
  KEYSTATIC_GITHUB_CLIENT_SECRET=...
  KEYSTATIC_SECRET=...   # random 32-char string
  ```
  Add to `.env.local` (dev) and Netlify/Vercel dashboard (prod).

- [ ] **1.6** Update `astro.config.mjs` — remove the `isDev` guard
  ```js
  // Before:
  ...(isDev ? [keystatic()] : [])
  // After:
  keystatic()
  ```
  Keystatic Cloud handles its own auth — the admin UI is safe to expose.

- [ ] **1.7** Deploy to Netlify/Vercel, verify `/keystatic` (or `/admin`) is accessible and requires login.

**Done when:** Michalina can log in, see the CMS dashboard, and edit a singleton field that reflects on the live site.

---

## Phase 2 — Multilingual Blog Posts

**Goal:** One Keystatic entry per article with PL / EN / DE content. Routes `/blog/[slug]`, `/en/blog/[slug]`, `/de/blog/[slug]` all work.

### 2.1 Keystatic schema redesign

Update the `posts` collection in `keystatic.config.ts`:

```ts
posts: collection({
  label: 'Blog Posts',
  slugField: 'slug',
  path: 'src/content/posts/*',
  format: { data: 'yaml', contentField: 'pl_content' },
  schema: {
    slug:        fields.slug({ name: { label: 'Slug' } }),
    publishDate: fields.date({ label: 'Publish Date' }),
    category:    fields.select({ label: 'Category', options: CATEGORIES.map(c => ({ label: CATEGORY_LABELS_PL[c], value: c })), defaultValue: 'porady' }),
    coverImage:  fields.image({ label: 'Cover Image', directory: 'public/images/posts', publicPath: '/images/posts/' }),

    // Polish
    pl_title:   fields.text({ label: 'Title (PL)' }),
    pl_excerpt: fields.text({ label: 'Excerpt (PL)', multiline: true }),
    pl_content: fields.markdoc({ label: 'Content (PL)' }),

    // English
    en_title:   fields.text({ label: 'Title (EN)', validation: { isRequired: false } }),
    en_excerpt: fields.text({ label: 'Excerpt (EN)', multiline: true, validation: { isRequired: false } }),
    en_content: fields.markdoc({ label: 'Content (EN)' }),

    // German
    de_title:   fields.text({ label: 'Title (DE)', validation: { isRequired: false } }),
    de_excerpt: fields.text({ label: 'Excerpt (DE)', multiline: true, validation: { isRequired: false } }),
    de_content: fields.markdoc({ label: 'Content (DE)' }),
  },
}),
```

### 2.2 Update `src/content.config.ts`

```ts
const posts = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/posts' }),
  schema: z.object({
    publishDate: z.string(),
    category:    z.enum(CATEGORIES),
    coverImage:  z.string().nullish().transform(v => v ?? null),
    pl_title:    z.string(),
    pl_excerpt:  z.string(),
    en_title:    z.string().optional(),
    en_excerpt:  z.string().optional(),
    de_title:    z.string().optional(),
    de_excerpt:  z.string().optional(),
  }),
});
```

### 2.3 Deepen `src/lib/posts.ts`

Callers pass a locale, get back flat `PostData[]` — locale-transparent interface:

```ts
export interface PostData {
  id:          string;   // slug
  title:       string;   // resolved for locale
  excerpt:     string;
  publishDate: string;
  category:    Category;
  coverImage:  string | null;
  readingTime: number;
  lang:        Locale;
}

export async function getPosts(lang: Locale): Promise<PostData[]> {
  const raw = await getCollection('posts');
  return raw
    .map(post => toPostData(post, lang))
    .filter(p => p.title)          // skip posts with no translation yet
    .sort((a, b) => b.publishDate.localeCompare(a.publishDate));
}

function toPostData(post: CollectionEntry<'posts'>, lang: Locale): PostData {
  const title   = post.data[`${lang}_title`]   ?? post.data.pl_title;
  const excerpt = post.data[`${lang}_excerpt`] ?? post.data.pl_excerpt;
  return {
    id:          post.id,
    title,
    excerpt,
    publishDate: post.data.publishDate,
    category:    post.data.category,
    coverImage:  post.data.coverImage,
    readingTime: calculateReadingTime(excerpt + title),
    lang,
  };
}
```

### 2.4 Create locale blog routes

**`src/pages/[lang]/blog/[slug].astro`** — mirrors `blog/[slug].astro` but uses `lang` param:

```astro
---
export async function getStaticPaths() {
  const langs: Locale[] = ['en', 'de'];
  const paths = [];
  for (const lang of langs) {
    const posts = await getPosts(lang);
    for (const post of posts) {
      paths.push({ params: { lang, slug: post.id }, props: { post, lang } });
    }
  }
  return paths;
}
---
```

### 2.5 Update `[lang]/blog/index.astro`

Replace placeholder content with real `getPosts(lang)` call + `BlogFilter` component.

### 2.6 Migrate existing posts

Run a one-time script to rename existing `.mdoc` files to the new YAML+Markdoc format with `pl_` prefixed fields. Existing content becomes the Polish version.

### 2.7 Move blog components

```
src/components/PostCard.tsx         → src/components/blog/PostCard.tsx
src/components/BlogFilter.tsx       → src/components/blog/BlogFilter.tsx
src/components/AuthorCard.astro     → src/components/blog/AuthorCard.astro
src/components/ShareButtons.tsx     → src/components/blog/ShareButtons.tsx
src/components/TableOfContents.astro → src/components/blog/TableOfContents.astro
src/components/Nav.astro            → src/components/nav/Nav.astro
src/components/NavClient.tsx        → src/components/nav/NavClient.tsx
src/components/Footer.astro         → src/components/nav/Footer.astro
```

Update all import paths across `src/pages/` and other components.

**Done when:** `/blog/my-post`, `/en/blog/my-post`, `/de/blog/my-post` all render, each in the correct language with graceful fallback to PL when EN/DE content is empty.

---

## Phase 3 — Production Essentials

### 3.1 OG Images

Use Astro's built-in endpoint to generate OG images at build time.

- [ ] Create `src/pages/og/[slug].png.ts` — generates per-post OG image (title + site logo + vet photo)
- [ ] Create `src/pages/og/page/[name].png.ts` — generates generic page OG image
- [ ] Update `BaseLayout.astro` — populate `og:image` for all pages, not just blog posts
- [ ] Dimensions: 1200×630px, matches design system colors

### 3.2 Canonical Tags

Currently missing. Add to `BaseLayout.astro`:

```html
<link rel="canonical" href={new URL(Astro.url.pathname, Astro.site).href} />
```

### 3.3 Google Analytics 4 + Cookie Consent

GA4 requires user consent before firing in the EU (GDPR).

- [ ] Create `src/components/CookieBanner.tsx` (`client:load`)
  - Shows on first visit
  - "Accept" / "Decline" buttons
  - Stores choice in `localStorage`
  - Dispatches custom event `cookie-consent` on accept
- [ ] Add GA4 script to `BaseLayout.astro` — loads only after consent event fires:
  ```html
  <script is:inline>
    window.addEventListener('cookie-consent', () => {
      // dynamically inject GA4 script
    });
  </script>
  ```
- [ ] Add GA4 Measurement ID to `.env`: `PUBLIC_GA4_ID=G-XXXXXXXXXX`

### 3.4 MailerLite Newsletter

- [ ] Create `src/pages/api/newsletter.ts` (SSR endpoint)
  ```ts
  export const POST: APIRoute = async ({ request }) => {
    const { email } = await request.json();
    const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.MAILERLITE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, groups: [import.meta.env.MAILERLITE_GROUP_ID] }),
    });
    return new Response(JSON.stringify({ ok: res.ok }), { status: res.ok ? 200 : 500 });
  };
  ```
- [ ] Update `NewsletterCTA.astro` — wire form to POST `/api/newsletter`
- [ ] Add `MAILERLITE_API_KEY` and `MAILERLITE_GROUP_ID` to `.env` and deployment dashboard
- [ ] Add success/error state to the newsletter form UI

### 3.5 Images in Keystatic

Already handled in Phase 2 schema — `fields.image()` allows Michalina to upload cover images directly from the admin. Verify the upload path (`public/images/posts/`) exists and is in `.gitignore` exclusion list correctly.

---

## Phase 4 — Content Complete

**Goal:** All real content in place, ready to go live.

### Keystatic Singletons (all three languages)

| Singleton | PL | EN | DE |
|-----------|----|----|-----|
| `homePage` | headline, subtext, CTA labels, featured post | ✓ | ✓ |
| `aboutMe` | bio, photo, journey timeline | ✓ | ✓ |
| `faq` | heading, intro, 5–8 questions | ✓ | ✓ |
| `contact` | phone, email, heading | ✓ | ✓ |
| `testimonials` | 3–6 real testimonials | — | — |

### Blog Posts (minimum viable)

- [ ] 5 posts in Polish (real, not placeholder)
- [ ] Titles + excerpts translated to EN and DE for each post (full content optional at launch)
- [ ] Each post has a real cover image (uploaded via Keystatic)

### Final Checks

- [ ] Run Lighthouse on `/`, `/blog`, `/blog/[slug]`, `/en/`, `/en/blog/[slug]`
  - Target: 100 / 100 / 100 / 100 on all pages
- [ ] Check all three locale homepages render correctly
- [ ] Test contact form submission (web3forms)
- [ ] Test newsletter signup (MailerLite)
- [ ] Verify sitemap at `/sitemap-index.xml` includes all routes
- [ ] Verify `robots.txt` points to sitemap
- [ ] Verify OG images render correctly (use [opengraph.xyz](https://www.opengraph.xyz) to preview)
- [ ] Check 404 page works
- [ ] RSS feed at `/rss.xml` is valid
- [ ] No console errors in production build

---

## Risks & Notes

| Risk | Mitigation |
|------|------------|
| Keystatic Cloud free tier limits | Check current limits at keystatic.cloud before committing. Fallback: GitHub OAuth with branch-based editing. |
| `output: 'hybrid'` breaks static export | Test `astro build` locally after adapter install. Most pages stay static — only `/api/*` and Keystatic routes are SSR. |
| Existing post files need migration | Write a one-time migration script before going live. Do not migrate manually. |
| GA4 + GDPR | Cookie consent banner is non-negotiable for a Polish/EU audience. Do not load GA4 without it. |
| EN/DE blog content lag | Launch is fine with only Polish content. EN/DE fields in Keystatic show as empty — `getPosts('en')` falls back to PL titles, which is acceptable for MVP. |

---

## Implementation Order

```
Phase 1 (SSR + CMS auth)     ← start here, unblocks everything
    ↓
Phase 2 (multilingual posts)  ← biggest lift, do while Phase 3 work is small
    ↓
Phase 3 (prod essentials)     ← parallelize 3.1–3.5, they're independent
    ↓
Phase 4 (content)             ← Michalina's work, done in Keystatic admin
    ↓
Launch
```
