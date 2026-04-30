export const LOCALES = ['pl', 'en', 'de'] as const;
export type Locale = (typeof LOCALES)[number];

export const localeLabels: Record<Locale, string> = { pl: 'PL', en: 'EN', de: 'DE' };

export const categoryLabels: Record<Locale, Record<string, string>> = {
  pl: { psy: 'Psy', koty: 'Koty', egzotyczne: 'Egzotyczne', porady: 'Porady' },
  en: { psy: 'Dogs', koty: 'Cats', egzotyczne: 'Exotic', porady: 'Tips' },
  de: { psy: 'Hunde', koty: 'Katzen', egzotyczne: 'Exoten', porady: 'Tipps' },
};

export const readMoreLabel: Record<Locale, string> = {
  pl: 'Czytaj dalej',
  en: 'Read more',
  de: 'Weiterlesen',
};

export const navLinks: Record<Locale, { href: string; label: string }[]> = {
  pl: [
    { href: '/',        label: 'Strona główna' },
    { href: '/blog',    label: 'Blog' },
    { href: '/o-mnie',  label: 'O mnie' },
    { href: '/kontakt', label: 'Kontakt' },
  ],
  en: [
    { href: '/en/',        label: 'Home' },
    { href: '/en/blog',    label: 'Blog' },
    { href: '/en/about',   label: 'About' },
    { href: '/en/contact', label: 'Contact' },
  ],
  de: [
    { href: '/de/',        label: 'Startseite' },
    { href: '/de/blog',    label: 'Blog' },
    { href: '/de/about',   label: 'Über mich' },
    { href: '/de/contact', label: 'Kontakt' },
  ],
};

// Maps a neutral path segment to its locale-specific URL
const pageEquivalents: Record<string, Record<Locale, string>> = {
  '/':        { pl: '/',        en: '/en/',        de: '/de/' },
  '/blog':    { pl: '/blog',    en: '/en/blog',    de: '/de/blog' },
  '/about':   { pl: '/o-mnie', en: '/en/about',   de: '/de/about' },
  '/contact': { pl: '/kontakt', en: '/en/contact', de: '/de/contact' },
};

export function getLocalePaths(currentPath: string): Record<Locale, string> {
  // Strip trailing slash (except root)
  const clean = currentPath.length > 1 ? currentPath.replace(/\/$/, '') : currentPath;

  // Normalise: strip locale prefix, map PL-specific slugs to neutral keys
  let path = clean;
  if (path.startsWith('/en')) path = path.slice(3) || '/';
  else if (path.startsWith('/de')) path = path.slice(3) || '/';

  if (path === '/o-mnie')  path = '/about';
  if (path === '/kontakt') path = '/contact';

  // Trim trailing slash from normalised path (except root)
  const normalised = path.length > 1 ? path.replace(/\/$/, '') : path;

  return pageEquivalents[normalised] ?? { pl: '/', en: '/en/', de: '/de/' };
}
