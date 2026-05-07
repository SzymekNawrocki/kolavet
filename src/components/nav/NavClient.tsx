import * as React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet';
import { LOCALES, localeLabels, type Locale } from '../../lib/i18n';

interface NavClientProps {
  currentPath: string;
  currentLocale: Locale;
  localePaths: Record<Locale, string>;
  links: { href: string; label: string }[];
}

export function NavClient({ currentPath, currentLocale, localePaths, links }: NavClientProps) {
  const linkClass = (href: string) =>
    `rounded px-3 py-2 text-[0.9375rem] font-semibold tracking-[0.02em] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan ${
      currentPath === href ? 'text-cyan' : 'text-bright hover:text-cyan'
    }`;

  const mobileLinkClass = (href: string) =>
    `block w-full rounded px-3 py-3 text-[0.9375rem] font-semibold tracking-[0.02em] transition-colors duration-150 ${
      currentPath === href ? 'text-cyan' : 'text-bright hover:text-cyan'
    }`;

  const LocaleSwitcher = ({ className = '' }: { className?: string }) => (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label="Wybór języka">
      {LOCALES.map((locale, i) => (
        <React.Fragment key={locale}>
          {i > 0 && <span className="select-none text-xs text-secondary">|</span>}
          <a
            href={localePaths[locale]}
            className={`px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wider rounded transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan ${
              currentLocale === locale
                ? 'text-cyan'
                : 'text-secondary hover:text-bright'
            }`}
            aria-current={currentLocale === locale ? 'true' : undefined}
          >
            {localeLabels[locale]}
          </a>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <>
      <div className="hidden md:flex items-center gap-4">
        <nav role="navigation" aria-label="Główna nawigacja">
          <ul className="flex items-center gap-1" role="list">
            {links.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className={linkClass(href)}
                  aria-current={currentPath === href ? 'page' : undefined}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <LocaleSwitcher />
      </div>

      <div className="md:hidden flex items-center gap-2">
        <LocaleSwitcher />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Otwórz menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetTitle className="sr-only">Menu nawigacyjne</SheetTitle>
            <nav aria-label="Menu mobilne" className="mt-8">
              <ul className="flex flex-col gap-1" role="list">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className={mobileLinkClass(href)}
                      aria-current={currentPath === href ? 'page' : undefined}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
