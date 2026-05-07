# Vercel + Keystatic Cloud Deployment Plan

## Decisions (grilled and locked)

| Decision | Answer |
|----------|--------|
| Hosting | Vercel free (Hobby), Astro `output: 'hybrid'` |
| CMS auth | Keystatic Cloud → GitHub OAuth (one-click for Michalina) |
| GitHub account | Developer's account; Michalina added as collaborator |
| Content storage | Keystatic GitHub backend — commits to this repo |
| Image storage | GitHub repo (`public/images/posts/`) — no external service |
| Publish timing | ~30–60 s (commit → Vercel auto-deploy) |
| Draft/published | ✅ Implemented — defaults to draft, visible in Keystatic UI |
| Domain DNS | kolavet.pl on LH.PL → A record → Vercel |
| Email | Gmail / Google Workspace — LH.PL ignored |
| Newsletter API | `/api/newsletter` — needs `prerender = false`, works once hybrid is on |

---

## Step 1 — Install Vercel adapter

```bash
npx astro add vercel
```

This installs `@astrojs/vercel` and patches `astro.config.mjs` automatically.

---

## Step 2 — Update `astro.config.mjs`

```js
// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://kolavet.pl',
  output: 'hybrid',        // all pages static by default; /api/* and Keystatic = SSR
  adapter: vercel(),
  vite: { plugins: [tailwindcss()] },
  integrations: [react(), markdoc(), keystatic(), sitemap()],
  //                                 ↑ no isDev guard — Keystatic Cloud handles auth
});
```

---

## Step 3 — Update `keystatic.config.ts` storage

Change `storage` from `local` to `cloud` and add the `cloud` block:

```ts
export default config({
  storage: {
    kind: 'cloud',
  },
  cloud: {
    project: 'YOUR_TEAM/kolavet',  // fill in after Step 4
  },
  // ... rest of config unchanged
});
```

---

## Step 4 — Set up Keystatic Cloud project

1. Go to [keystatic.cloud](https://keystatic.cloud) → sign in with **your GitHub account**
2. Create a new project → link to the `kolavet` GitHub repo
3. Copy the **team slug** and **project slug** → fill into `keystatic.config.ts` above
4. In the Keystatic Cloud project settings → **Collaborators** → add Michalina's GitHub account (or your account for her to use)

---

## Step 5 — Set up GitHub OAuth app

Keystatic Cloud needs a GitHub OAuth app to authenticate users.

1. GitHub → Settings → Developer settings → OAuth Apps → **New OAuth App**
2. Fill in:
   - Application name: `Kolavet CMS`
   - Homepage URL: `https://kolavet.pl`
   - Authorization callback URL: `https://kolavet.pl/api/keystatic/github/callback`
3. Click **Register application**
4. Copy **Client ID** → `KEYSTATIC_GITHUB_CLIENT_ID`
5. Click **Generate a new client secret** → `KEYSTATIC_GITHUB_CLIENT_SECRET`
6. Generate a random secret for `KEYSTATIC_SECRET`:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

---

## Step 6 — Add the newsletter API endpoint

Create `src/pages/api/newsletter.ts`:

```ts
export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const { email } = await request.json().catch(() => ({ email: '' }));

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid email' }), { status: 400 });
  }

  const apiKey  = import.meta.env.MAILERLITE_API_KEY;
  const groupId = import.meta.env.MAILERLITE_GROUP_ID;

  if (!apiKey) {
    return new Response(JSON.stringify({ ok: false, error: 'Not configured' }), { status: 500 });
  }

  const body: Record<string, unknown> = { email };
  if (groupId) body.groups = [groupId];

  const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return new Response(JSON.stringify({ ok: res.ok }), { status: res.ok ? 200 : 500 });
};
```

---

## Step 7 — Environment variables

### Local dev — create `.env.local` (never commit this file)

```env
# Keystatic Cloud OAuth
KEYSTATIC_GITHUB_CLIENT_ID=Ov23li...
KEYSTATIC_GITHUB_CLIENT_SECRET=...
KEYSTATIC_SECRET=<32-char hex from Step 5>

# MailerLite (add when ready)
MAILERLITE_API_KEY=eyJ...
MAILERLITE_GROUP_ID=123456789

# Google Analytics (add when ready)
PUBLIC_GA4_ID=G-XXXXXXXXXX
```

### Vercel dashboard — Project → Settings → Environment Variables

Add the same variables. Mark `KEYSTATIC_GITHUB_CLIENT_SECRET` and `MAILERLITE_API_KEY` as **Sensitive**.

---

## Step 8 — Deploy to Vercel

Recommended: GitHub integration (auto-deploys on every commit).

1. Push this branch to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import `kolavet` repo
3. Framework preset: **Astro** (auto-detected)
4. Add all env vars from Step 7
5. Click **Deploy**

Every time Michalina saves a post in Keystatic, it commits to GitHub, Vercel detects the commit, rebuilds in ~30–60 s, and the site updates.

---

## Step 9 — Point DNS on LH.PL

1. Log in to LH.PL panel → Domains → kolavet.pl → DNS management
2. Find the **A record** for `@` (root domain) and `www`
3. Change both to Vercel's IP — Vercel will show you the exact IP/CNAME after Step 8
4. Propagation: 5 min to 24 h

In Vercel: Project → Settings → Domains → Add `kolavet.pl` and `www.kolavet.pl`.

---

## Step 10 — Verify

| Check | Expected |
|-------|----------|
| `kolavet.pl` loads | Homepage renders |
| `kolavet.pl/keystatic` | Redirects to GitHub OAuth → lands in Keystatic UI |
| Michalina creates a post | Sets status → **Opublikowany**, saves → commit appears on GitHub |
| Vercel auto-deploys | Build triggered within seconds of commit |
| Post appears on site | ~30–60 s after save |
| Cover photo uploads | Image appears in `public/images/posts/` in GitHub repo |
| Newsletter form | POST to `/api/newsletter` returns 200 |
| RSS feed | `/rss.xml` contains only published posts |
| Sitemap | `/sitemap-index.xml` contains all public routes |
| Draft post | Does NOT appear on site, does NOT get a static page |
| Cookie banner | First visit shows banner; accept fires GA4 |

---

## Code changes summary

| File | Change |
|------|--------|
| `astro.config.mjs` | Add `output: 'hybrid'`, `adapter: vercel()`, remove `isDev` guard |
| `keystatic.config.ts` | `storage: { kind: 'cloud' }` + `cloud.project` |
| `src/pages/api/newsletter.ts` | Create (template above) |
| `.env.local` | Create with all secrets (gitignored) |
| Vercel dashboard | Mirror env vars |
| LH.PL DNS | A record → Vercel IP |

---

## Risks

| Risk | Mitigation |
|------|------------|
| `output: 'hybrid'` breaks static pages | Run `astro build` locally after adapter install before deploying |
| Keystatic Cloud free tier | 1 project, limited collaborators — fine for this use case; check at keystatic.cloud if limits change |
| Images grow the repo | Non-issue for years at blog scale; migrate to Cloudinary if repo hits 1 GB |
| `KEYSTATIC_SECRET` leaked | Generate fresh; never commit `.env.local`; add to `.gitignore` |
| DNS propagation delay | Do DNS change last, after everything else is verified on the Vercel preview URL |
