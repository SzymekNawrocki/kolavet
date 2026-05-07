import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';
import { CATEGORIES } from './lib/categories';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/posts' }),
  schema: z.object({
    pl_title:    z.string(),
    pl_excerpt:  z.string(),
    publishDate: z.string(),
    category:    z.enum(CATEGORIES),
    status:      z.enum(['draft', 'published']).default('draft'),
    coverImage:  z.string().nullish().transform(v => v ?? null),
    en_title:    z.string().optional(),
    en_excerpt:  z.string().optional(),
    de_title:    z.string().optional(),
    de_excerpt:  z.string().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '*/*.mdoc', base: './src/content/pages' }),
  schema: z.object({}),
});

export const collections = { posts, pages };
