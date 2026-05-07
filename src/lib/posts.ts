import fs from 'node:fs';
import path from 'node:path';
import { getCollection } from 'astro:content';
import { calculateReadingTime } from './reading-time';
import type { Locale } from './i18n';

export interface PostData {
  slug:        string;
  title:       string;
  publishDate: string;
  category:    string;
  excerpt:     string;
  coverImage:  string | null;
  readingTime: string;
  lang:        Locale;
}

export function readRaw(id: string): string {
  try {
    return fs.readFileSync(path.join(process.cwd(), 'src/content/posts', `${id}.mdoc`), 'utf-8');
  } catch {
    return '';
  }
}

function resolveTitle(data: Record<string, unknown>, lang: Locale): string {
  return (data[`${lang}_title`] as string | undefined) ?? (data.pl_title as string) ?? '';
}

function resolveExcerpt(data: Record<string, unknown>, lang: Locale): string {
  return (data[`${lang}_excerpt`] as string | undefined) ?? (data.pl_excerpt as string) ?? '';
}

export async function getPosts(lang: Locale = 'pl'): Promise<PostData[]> {
  const posts = await getCollection('posts');
  return posts
    .sort((a, b) => new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime())
    .map(post => ({
      slug:        post.id,
      title:       resolveTitle(post.data as Record<string, unknown>, lang),
      publishDate: post.data.publishDate,
      category:    post.data.category,
      excerpt:     resolveExcerpt(post.data as Record<string, unknown>, lang),
      coverImage:  post.data.coverImage ?? null,
      readingTime: calculateReadingTime(readRaw(post.id), lang),
      lang,
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
      title:       resolveTitle(p.data as Record<string, unknown>, lang),
      publishDate: p.data.publishDate,
      category:    p.data.category,
      excerpt:     resolveExcerpt(p.data as Record<string, unknown>, lang),
      coverImage:  p.data.coverImage ?? null,
      readingTime: calculateReadingTime(readRaw(p.id), lang),
      lang,
    }));
}
