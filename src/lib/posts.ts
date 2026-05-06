import fs from 'node:fs';
import path from 'node:path';
import { getCollection } from 'astro:content';
import { calculateReadingTime } from './reading-time';
import type { Locale } from './i18n';

export interface PostData {
  slug: string;
  title: string;
  publishDate: string;
  category: string;
  excerpt: string;
  coverImage: string | null;
  readingTime: string;
}

export function readRaw(id: string): string {
  try {
    return fs.readFileSync(path.join(process.cwd(), 'src/content/posts', `${id}.mdoc`), 'utf-8');
  } catch {
    return '';
  }
}

export async function getPosts(lang: Locale = 'pl'): Promise<PostData[]> {
  const posts = await getCollection('posts');
  return posts
    .sort((a, b) => new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime())
    .map(post => ({
      slug:        post.id,
      title:       post.data.title,
      publishDate: post.data.publishDate,
      category:    post.data.category,
      excerpt:     post.data.excerpt,
      coverImage:  post.data.coverImage ?? null,
      readingTime: calculateReadingTime(readRaw(post.id), lang),
    }));
}

export async function getRelatedPosts(currentId: string, category: string, lang: Locale = 'pl'): Promise<PostData[]> {
  const posts = await getCollection('posts');
  return posts
    .filter(p => p.id !== currentId && p.data.category === category)
    .sort((a, b) => new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime())
    .slice(0, 3)
    .map(p => ({
      slug:        p.id,
      title:       p.data.title,
      publishDate: p.data.publishDate,
      category:    p.data.category,
      excerpt:     p.data.excerpt,
      coverImage:  p.data.coverImage ?? null,
      readingTime: calculateReadingTime(readRaw(p.id), lang),
    }));
}
