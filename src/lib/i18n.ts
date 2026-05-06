export const LOCALES = ['pl', 'en', 'de'] as const;
export type Locale = (typeof LOCALES)[number];

export function detectLocale(pathname: string): Locale {
  if (pathname.startsWith('/en')) return 'en';
  if (pathname.startsWith('/de')) return 'de';
  return 'pl';
}

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
    { href: '/',         label: 'Strona główna' },
    { href: '/blog',     label: 'Blog' },
    { href: '/#faq',     label: 'FAQ' },
    { href: '/#o-mnie',  label: 'O mnie' },
    { href: '/#kontakt', label: 'Kontakt' },
  ],
  en: [
    { href: '/en/',      label: 'Home' },
    { href: '/en/blog',  label: 'Blog' },
    { href: '/#faq',     label: 'FAQ' },
    { href: '/#o-mnie',  label: 'About' },
    { href: '/#kontakt', label: 'Contact' },
  ],
  de: [
    { href: '/de/',      label: 'Startseite' },
    { href: '/de/blog',  label: 'Blog' },
    { href: '/#faq',     label: 'FAQ' },
    { href: '/#o-mnie',  label: 'Über mich' },
    { href: '/#kontakt', label: 'Kontakt' },
  ],
};

const pageEquivalents: Record<string, Record<Locale, string>> = {
  '/':     { pl: '/',     en: '/en/',     de: '/de/' },
  '/blog': { pl: '/blog', en: '/en/blog', de: '/de/blog' },
};

export function getLocalePaths(currentPath: string): Record<Locale, string> {
  const clean = currentPath.length > 1 ? currentPath.replace(/\/$/, '') : currentPath;

  let path = clean;
  if (path.startsWith('/en')) path = path.slice(3) || '/';
  else if (path.startsWith('/de')) path = path.slice(3) || '/';

  const normalised = path.length > 1 ? path.replace(/\/$/, '') : path;

  if (normalised.startsWith('/blog/')) {
    return { pl: '/blog', en: '/en/blog', de: '/de/blog' };
  }

  return pageEquivalents[normalised] ?? { pl: '/', en: '/en/', de: '/de/' };
}
