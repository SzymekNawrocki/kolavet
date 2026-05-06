import * as React from 'react';
import { PostCard } from './PostCard';
import { categoryLabels, type Locale } from '@/lib/i18n';
import { CATEGORIES } from '@/lib/categories';
import type { PostData } from '@/lib/posts';

const POSTS_PER_PAGE = 9;

export type { PostData };

interface BlogFilterProps {
  posts: PostData[];
  lang?: Locale;
}

const ui: Record<Locale, { placeholder: string; all: string; noResults: string; count: (n: number) => string }> = {
  pl: {
    placeholder: 'Szukaj artykułów...',
    all:         'Wszystkie',
    noResults:   'Brak artykułów pasujących do wyszukiwania.',
    count:       n => `${n} ${n === 1 ? 'artykuł' : 'artykułów'}`,
  },
  en: {
    placeholder: 'Search articles...',
    all:         'All',
    noResults:   'No articles found.',
    count:       n => `${n} ${n === 1 ? 'article' : 'articles'}`,
  },
  de: {
    placeholder: 'Artikel suchen...',
    all:         'Alle',
    noResults:   'Keine Artikel gefunden.',
    count:       n => `${n} ${n === 1 ? 'Artikel' : 'Artikel'}`,
  },
};

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage:  number;
  totalPages:   number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages: (number | '…')[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push('…');
    const start = Math.max(2, currentPage - 1);
    const end   = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push('…');
    pages.push(totalPages);
  }

  const btnBase = 'rounded px-3.5 py-2 text-sm font-semibold transition-colors duration-150';

  return (
    <nav aria-label="Paginacja" className="mt-12 flex items-center justify-center gap-1">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${btnBase} text-secondary hover:text-bright disabled:pointer-events-none disabled:opacity-30`}
        aria-label="Poprzednia strona"
      >
        ←
      </button>

      {pages.map((page, i) =>
        page === '…' ? (
          <span key={`ellipsis-${i}`} className="px-2 py-2 text-sm text-muted">…</span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            aria-current={currentPage === page ? 'page' : undefined}
            className={`${btnBase} ${
              currentPage === page
                ? 'bg-cyan text-dark'
                : 'text-secondary hover:bg-surface-medium hover:text-bright'
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${btnBase} text-secondary hover:text-bright disabled:pointer-events-none disabled:opacity-30`}
        aria-label="Następna strona"
      >
        →
      </button>
    </nav>
  );
}

export function BlogFilter({ posts, lang = 'pl' }: BlogFilterProps) {
  const [query, setQuery]                   = React.useState('');
  const [debouncedQuery, setDebouncedQuery] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState<string | null>(null);
  const [currentPage, setCurrentPage]       = React.useState(1);

  React.useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(query), 200);
    return () => clearTimeout(id);
  }, [query]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, debouncedQuery]);

  const filtered = React.useMemo(() => {
    let result = posts;
    if (activeCategory) {
      result = result.filter(p => p.category === activeCategory);
    }
    if (debouncedQuery.trim()) {
      const q = debouncedQuery.toLowerCase();
      result = result.filter(
        p => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
      );
    }
    return result;
  }, [posts, activeCategory, debouncedQuery]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const pagePosts  = filtered.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  const t         = ui[lang];
  const catLabels = categoryLabels[lang];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const chipClass = (active: boolean) =>
    `rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan ${
      active
        ? 'bg-cyan text-dark'
        : 'bg-surface-medium text-secondary hover:text-bright'
    }`;

  return (
    <div>
      {/* Search + category chips */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={t.placeholder}
          aria-label={t.placeholder}
          className="w-full rounded-lg border border-border bg-surface-medium px-4 py-2.5 text-sm text-bright placeholder:text-muted focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/20 sm:max-w-xs"
        />

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtruj według kategorii">
          <button
            onClick={() => setActiveCategory(null)}
            className={chipClass(activeCategory === null)}
          >
            {t.all}
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={chipClass(activeCategory === cat)}
            >
              {catLabels[cat] ?? cat}
            </button>
          ))}
        </div>
      </div>

      {/* Result count */}
      <p className="mb-8 text-sm text-secondary">{t.count(filtered.length)}</p>

      {/* Post grid */}
      {pagePosts.length > 0 ? (
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3" role="list">
          {pagePosts.map(post => (
            <li key={post.slug}>
              <PostCard
                slug={post.slug}
                title={post.title}
                publishDate={post.publishDate}
                category={post.category}
                excerpt={post.excerpt}
                coverImage={post.coverImage}
                readingTime={post.readingTime}
                lang={lang}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-12 text-center text-base text-secondary">{t.noResults}</p>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
