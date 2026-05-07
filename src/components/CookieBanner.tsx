import * as React from 'react';
import { Button } from './ui/button';
import type { Locale } from '@/lib/i18n';

interface CookieBannerProps {
  lang?: Locale;
  ga4Id?: string;
}

const ui = {
  pl: {
    text: 'Ta strona używa plików cookie do analizy ruchu (Google Analytics). Twoje dane są przetwarzane zgodnie z RODO.',
    accept: 'Akceptuję',
    decline: 'Odrzucam',
  },
  en: {
    text: 'This site uses cookies for traffic analysis (Google Analytics). Your data is processed in accordance with GDPR.',
    accept: 'Accept',
    decline: 'Decline',
  },
  de: {
    text: 'Diese Website verwendet Cookies zur Verkehrsanalyse (Google Analytics). Ihre Daten werden gemäß DSGVO verarbeitet.',
    accept: 'Akzeptieren',
    decline: 'Ablehnen',
  },
};

export function CookieBanner({ lang = 'pl', ga4Id }: CookieBannerProps) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const choice = localStorage.getItem('cookie-consent');
    if (!choice) setVisible(true);
    if (choice === 'accepted' && ga4Id) loadGa4(ga4Id);
  }, [ga4Id]);

  function accept() {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
    if (ga4Id) loadGa4(ga4Id);
    window.dispatchEvent(new CustomEvent('cookie-consent', { detail: { accepted: true } }));
  }

  function decline() {
    localStorage.setItem('cookie-consent', 'declined');
    setVisible(false);
  }

  if (!visible) return null;

  const t = ui[lang];

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 z-[200] mx-auto max-w-[640px] rounded-xl border border-border bg-surface-light p-5 shadow-deep md:left-auto md:right-6 md:w-[420px]"
    >
      <p className="mb-4 text-sm leading-relaxed text-secondary">{t.text}</p>
      <div className="flex gap-3">
        <Button size="sm" onClick={accept} className="flex-1">
          {t.accept}
        </Button>
        <Button size="sm" variant="outline" onClick={decline} className="flex-1">
          {t.decline}
        </Button>
      </div>
    </div>
  );
}

function loadGa4(id: string) {
  if (document.getElementById('ga4-script')) return;
  const s = document.createElement('script');
  s.id = 'ga4-script';
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  s.async = true;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer ?? [];
  function gtag(...args: unknown[]) { window.dataLayer.push(args); }
  gtag('js', new Date());
  gtag('config', id);
}

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}
