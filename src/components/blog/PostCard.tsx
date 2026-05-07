import * as React from 'react';
import { Badge } from '../ui/badge';
import { CardContent } from '../ui/card';
import { categoryLabels, readMoreLabel, type Locale } from '@/lib/i18n';

interface PostCardProps {
  slug:         string;
  title:        string;
  publishDate:  string;
  category:     string;
  excerpt:      string;
  coverImage:   string | null;
  readingTime?: string;
  lang?:        Locale;
}

export function PostCard({ slug, title, publishDate, category, excerpt, coverImage, readingTime, lang = 'pl' }: PostCardProps) {
  const basePath = lang === 'pl' ? '/blog' : `/${lang}/blog`;
  const date = new Date(publishDate).toLocaleDateString(lang === 'pl' ? 'pl-PL' : lang === 'de' ? 'de-DE' : 'en-GB', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  const catLabel = categoryLabels[lang][category] ?? category;
  const cta = readMoreLabel[lang];

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface-light shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-deep hover:border-cyan/40 hover:shadow-[0_8px_32px_rgba(0,217,255,0.12)]">
      <a
        href={`${basePath}/${slug}`}
        className="relative block aspect-video overflow-hidden"
        tabIndex={-1}
        aria-hidden="true"
      >
        {coverImage ? (
          <>
            <img
              src={coverImage}
              alt=""
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
              width={640}
              height={360}
              loading="lazy"
              decoding="async"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </>
        ) : (
          <div className="relative h-full w-full bg-surface-medium [background-image:radial-gradient(circle,rgba(0,217,255,0.07)_1px,transparent_1px)] [background-size:20px_20px]">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan/6 via-transparent to-pink/4" />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="h-14 w-14 text-cyan/20" viewBox="0 0 48 48" fill="currentColor" aria-hidden="true">
                <ellipse cx="24" cy="34" rx="9" ry="7"/>
                <circle cx="13" cy="22" r="5"/>
                <circle cx="35" cy="22" r="5"/>
                <circle cx="8" cy="31" r="4"/>
                <circle cx="40" cy="31" r="4"/>
              </svg>
            </div>
          </div>
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
