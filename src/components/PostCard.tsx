import * as React from 'react';
import { Badge } from './ui/badge';
import { CardContent } from './ui/card';
import { categoryLabels, readMoreLabel, type Locale } from '@/lib/i18n';

interface PostCardProps {
  slug:        string;
  title:       string;
  publishDate: string;
  category:    string;
  excerpt:     string;
  coverImage:  string | null;
  basePath?:   string;
  lang?:       Locale;
}

export function PostCard({ slug, title, publishDate, category, excerpt, coverImage, basePath = '/blog', lang = 'pl' }: PostCardProps) {
  const date = new Date(publishDate).toLocaleDateString(lang === 'pl' ? 'pl-PL' : lang === 'de' ? 'de-DE' : 'en-GB', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  const catLabel = categoryLabels[lang][category] ?? category;
  const cta = readMoreLabel[lang];

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-deep">
      <a
        href={`${basePath}/${slug}`}
        className="block aspect-video overflow-hidden"
        tabIndex={-1}
        aria-hidden="true"
      >
        {coverImage ? (
          <img
            src={coverImage}
            alt=""
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
            width={640}
            height={360}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="h-full w-full bg-cream-alt" />
        )}
      </a>

      <CardContent className="flex flex-1 flex-col gap-3 pt-6">
        <div className="flex items-center gap-3">
          <Badge>{catLabel}</Badge>
          <time className="text-sm font-medium text-muted" dateTime={publishDate}>
            {date}
          </time>
        </div>

        <h2 className="font-serif text-lg font-semibold leading-snug text-ink">
          <a
            href={`${basePath}/${slug}`}
            className="transition-colors duration-150 hover:text-sage focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-sage"
          >
            {title}
          </a>
        </h2>

        <p className="line-clamp-3 flex-1 text-base leading-relaxed text-muted">{excerpt}</p>

        <a
          href={`${basePath}/${slug}`}
          className="mt-1 text-sm font-semibold text-sage transition-colors duration-150 hover:text-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
          aria-label={`${cta}: ${title}`}
        >
          {cta}
        </a>
      </CardContent>
    </article>
  );
}
