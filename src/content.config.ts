import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    publishDate: z.string(),
    category: z.enum(['psy', 'koty', 'egzotyczne', 'porady']),
    excerpt: z.string(),
    coverImage: z.string().nullish().transform(v => v ?? null),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '*/*.mdoc', base: './src/content/pages' }),
  schema: z.object({}),
});

export const collections = { posts, pages };
