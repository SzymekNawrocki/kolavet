import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts');
  const sorted = posts
    .filter(p => p.data.status === 'published')
    .sort((a, b) => new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime());

  return rss({
    title:       'Kolavet — Blog weterynaryjny Michaliny',
    description: 'Porady weterynaryjne, zdrowie zwierząt i opieka nad pupilami.',
    site:        context.site!,
    items:       sorted.map(post => ({
      title:       post.data.pl_title,
      description: post.data.pl_excerpt,
      pubDate:     new Date(post.data.publishDate),
      link:        `/blog/${post.id}/`,
    })),
    customData: '<language>pl-PL</language>',
  });
}
