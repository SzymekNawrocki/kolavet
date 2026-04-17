import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/posts' }),
  schema: z.object({
    title: z.object({ name: z.string(), slug: z.string() }),
    publishDate: z.string(),
    category: z.enum(['psy', 'koty', 'egzotyczne', 'porady']),
    excerpt: z.string(),
    coverImage: z.string().nullable(),
  }),
});

export const collections = { posts };
