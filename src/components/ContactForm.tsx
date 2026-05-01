import * as React from 'react';
import { Button } from './ui/button';
import type { Locale } from '@/lib/i18n';

interface ContactFormProps {
  lang?: Locale;
  accessKey?: string;
}

const labels: Record<Locale, {
  name: string; namePlaceholder: string;
  email: string;
  message: string; messagePlaceholder: string;
  send: string; sending: string;
  success: string; error: string;
}> = {
  pl: {
    name: 'Imię i nazwisko', namePlaceholder: 'Jan Kowalski',
    email: 'Adres e-mail',
    message: 'Wiadomość', messagePlaceholder: 'W czym mogę pomóc?',
    send: 'Wyślij wiadomość', sending: 'Wysyłanie…',
    success: 'Dziękuję! Odezwę się wkrótce.',
    error: 'Coś poszło nie tak. Spróbuj ponownie lub napisz bezpośrednio na e-mail.',
  },
  en: {
    name: 'Full name', namePlaceholder: 'Jane Smith',
    email: 'Email address',
    message: 'Message', messagePlaceholder: 'How can I help?',
    send: 'Send message', sending: 'Sending…',
    success: 'Thank you! I will get back to you soon.',
    error: 'Something went wrong. Please try again or email me directly.',
  },
  de: {
    name: 'Vor- und Nachname', namePlaceholder: 'Max Mustermann',
    email: 'E-Mail-Adresse',
    message: 'Nachricht', messagePlaceholder: 'Wie kann ich helfen?',
    send: 'Nachricht senden', sending: 'Wird gesendet…',
    success: 'Danke! Ich melde mich bald.',
    error: 'Etwas ist schiefgelaufen. Bitte erneut versuchen oder direkt per E-Mail schreiben.',
  },
};

export function ContactForm({ lang = 'pl', accessKey = '' }: ContactFormProps) {
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const l = labels[lang];

  const inputClass =
    'w-full rounded-lg border border-border bg-surface-medium px-4 py-3 text-sm text-bright placeholder:text-muted transition-colors focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/20';
  const labelClass = 'mb-1.5 block text-sm font-semibold text-secondary';

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const formData = new FormData(e.currentTarget);
    if (accessKey) formData.append('access_key', accessKey);
    try {
      const res  = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
      const data = await res.json() as { success: boolean };
      setStatus(data.success ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <p className="rounded-xl border border-cyan/20 bg-cyan/5 px-6 py-10 text-center text-base font-semibold text-cyan">
        {l.success}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div>
        <label htmlFor="cf-name" className={labelClass}>{l.name}</label>
        <input
          id="cf-name" name="name" type="text" required
          placeholder={l.namePlaceholder}
          className={inputClass}
          autoComplete="name"
        />
      </div>
      <div>
        <label htmlFor="cf-email" className={labelClass}>{l.email}</label>
        <input
          id="cf-email" name="email" type="email" required
          className={inputClass}
          autoComplete="email"
        />
      </div>
      <div>
        <label htmlFor="cf-message" className={labelClass}>{l.message}</label>
        <textarea
          id="cf-message" name="message" rows={5} required
          placeholder={l.messagePlaceholder}
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === 'error' && (
        <p role="alert" className="text-sm font-semibold text-pink">{l.error}</p>
      )}

      <div>
        <Button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? l.sending : l.send}
        </Button>
      </div>
    </form>
  );
}
