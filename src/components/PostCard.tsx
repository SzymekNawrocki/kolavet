import * as React from 'react';
import { Badge } from './ui/badge';
import { CardContent } from './ui/card';
import { categoryLabels, readMoreLabel, type Locale } from '@/lib/i18n';

interface PostCardProps {
  slug:         string;
  title:        string;
  publishDate:  string;
  category:     string;
  excerpt:      string;
  coverImage:   string | null;
  readingTime?: string;
  basePath?:    string;
  lang?:        Locale;
}

export function PostCard({ slug, title, publishDate, category, excerpt, coverImage, readingTime, basePath = '/blog', lang = 'pl' }: PostCardProps) {
  const date = new Date(publishDate).toLocaleDateString(lang === 'pl' ? 'pl-PL' : lang === 'de' ? 'de-DE' : 'en-GB', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  const catLabel = categoryLabels[lang][category] ?? category;
  const cta = readMoreLabel[lang];

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-border bg-surface-light shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-deep hover:border-cyan/30">
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
          <div className="h-full w-full bg-surface-medium" />
        )}
      </a>

      <CardContent className="flex flex-1 flex-col gap-3 pt-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{catLabel}</Badge>
          <time className="text-sm font-medium text-secondary" dateTime={publishDate}>
            {date}
          </time>
          {readingTime && (
            <span className="text-sm text-muted">{readingTime}</span>
          )}
        </div>

        <h2 className="text-lg font-semibold leading-snug text-bright">
          <a
            href={`${basePath}/${slug}`}
            className="transition-colors duration-150 hover:text-cyan focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-cyan"
          >
            {title}
          </a>
        </h2>

        <p className="line-clamp-3 flex-1 text-base leading-relaxed text-secondary">{excerpt}</p>

        <a
          href={`${basePath}/${slug}`}
          className="mt-1 text-sm font-semibold text-cyan transition-colors duration-150 hover:text-cyan-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
          aria-label={`${cta}: ${title}`}
        >
          {cta}
        </a>
      </CardContent>
    </article>
  );
}
