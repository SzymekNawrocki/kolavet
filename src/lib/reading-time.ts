import type { Locale } from './i18n';

export function calculateReadingTime(rawContent: string, lang: Locale = 'pl'): string {
  const text = rawContent
    .replace(/---[\s\S]*?---/, '')
    .replace(/\{%[\s\S]*?%\}/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#*`_~>|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const words = text.split(' ').filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));

  const labels: Record<Locale, string> = {
    pl: `${minutes} min czytania`,
    en: `${minutes} min read`,
    de: `${minutes} Min. Lesezeit`,
  };

  return labels[lang];
}
