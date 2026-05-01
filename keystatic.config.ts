import { config, collection, singleton, fields } from '@keystatic/core';

export default config({
  storage: { kind: 'local' },

  collections: {
    posts: collection({
      label: 'Posty',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Tytuł' } }),
        publishDate: fields.date({
          label: 'Data publikacji',
          validation: { isRequired: true },
        }),
        category: fields.select({
          label: 'Kategoria',
          options: [
            { label: 'Psy', value: 'psy' },
            { label: 'Koty', value: 'koty' },
            { label: 'Egzotyczne', value: 'egzotyczne' },
            { label: 'Porady', value: 'porady' },
          ],
          defaultValue: 'porady',
        }),
        excerpt: fields.text({
          label: 'Opis skrócony',
          multiline: true,
          validation: { isRequired: true },
        }),
        coverImage: fields.image({
          label: 'Zdjęcie okładki',
          directory: 'public/images/posts',
          publicPath: '/images/posts/',
        }),
        content: fields.markdoc({ label: 'Treść' }),
      },
    }),
  },

  singletons: {
    homePage: singleton({
      label: 'Strona główna',
      path: 'src/content/pages/home',
      schema: {
        // Polish
        heroBadgeLabel:    fields.text({ label: 'PL | Tekst odznaki hero' }),
        heroHeadline:      fields.text({ label: 'PL | Nagłówek hero' }),
        heroSubtext:       fields.text({ label: 'PL | Podtytuł hero', multiline: true }),
        heroCtaLabel:      fields.text({ label: 'PL | Przycisk CTA' }),
        blogSectionHeading: fields.text({ label: 'PL | Nagłówek sekcji bloga' }),
        blogCtaLabel:      fields.text({ label: 'PL | „Pokaż wszystkie"' }),
        featuredPostSlug:  fields.text({
          label: 'Wyróżniony artykuł — slug (opcjonalnie)',
          description: 'Slug posta do wyróżnienia na stronie głównej, np. "moj-pierwszy-artykul". Zostaw puste, żeby ukryć tę sekcję.',
        }),
        // English
        en_heroBadgeLabel:    fields.text({ label: 'EN | Hero badge text' }),
        en_heroHeadline:      fields.text({ label: 'EN | Hero headline' }),
        en_heroSubtext:       fields.text({ label: 'EN | Hero subtext', multiline: true }),
        en_heroCtaLabel:      fields.text({ label: 'EN | CTA button' }),
        en_blogSectionHeading: fields.text({ label: 'EN | Blog section heading' }),
        en_blogCtaLabel:      fields.text({ label: 'EN | "Show all" label' }),
        // German
        de_heroBadgeLabel:    fields.text({ label: 'DE | Hero-Abzeichen' }),
        de_heroHeadline:      fields.text({ label: 'DE | Hero-Überschrift' }),
        de_heroSubtext:       fields.text({ label: 'DE | Hero-Untertext', multiline: true }),
        de_heroCtaLabel:      fields.text({ label: 'DE | CTA-Schaltfläche' }),
        de_blogSectionHeading: fields.text({ label: 'DE | Blog-Abschnittsüberschrift' }),
        de_blogCtaLabel:      fields.text({ label: 'DE | „Alle anzeigen"' }),
      },
    }),

    aboutMe: singleton({
      label: 'O mnie',
      path: 'src/content/pages/about',
      schema: {
        photo: fields.image({
          label: 'Zdjęcie profilowe',
          directory: 'public/images',
          publicPath: '/images/',
        }),
        // Polish
        heading: fields.text({ label: 'PL | Nagłówek strony' }),
        intro:   fields.text({ label: 'PL | Krótki opis', multiline: true }),
        bio:     fields.markdoc({ label: 'PL | Bio (pełna treść)' }),
        // English
        en_heading: fields.text({ label: 'EN | Page heading' }),
        en_intro:   fields.text({ label: 'EN | Short intro', multiline: true }),
        en_bio:     fields.markdoc({ label: 'EN | Full bio' }),
        // German
        de_heading: fields.text({ label: 'DE | Seitenüberschrift' }),
        de_intro:   fields.text({ label: 'DE | Kurze Einführung', multiline: true }),
        de_bio:     fields.markdoc({ label: 'DE | Vollständige Bio' }),
      },
    }),

    faq: singleton({
      label: 'FAQ',
      path: 'src/content/pages/faq',
      schema: {
        heading: fields.text({ label: 'PL | Nagłówek strony', defaultValue: 'Najczęstsze pytania' }),
        intro:   fields.text({ label: 'PL | Wstęp', multiline: true }),
        items: fields.array(
          fields.object({
            question: fields.text({ label: 'PL | Pytanie',    validation: { isRequired: true } }),
            answer:   fields.text({ label: 'PL | Odpowiedź', multiline: true, validation: { isRequired: true } }),
          }),
          { label: 'PL | Pytania', itemLabel: props => props.fields.question.value ?? 'Pytanie' }
        ),
        en_heading: fields.text({ label: 'EN | Page heading' }),
        en_intro:   fields.text({ label: 'EN | Intro', multiline: true }),
        en_items: fields.array(
          fields.object({
            question: fields.text({ label: 'EN | Question' }),
            answer:   fields.text({ label: 'EN | Answer', multiline: true }),
          }),
          { label: 'EN | Questions', itemLabel: props => props.fields.question.value ?? 'Question' }
        ),
        de_heading: fields.text({ label: 'DE | Seitenüberschrift' }),
        de_intro:   fields.text({ label: 'DE | Einführung', multiline: true }),
        de_items: fields.array(
          fields.object({
            question: fields.text({ label: 'DE | Frage' }),
            answer:   fields.text({ label: 'DE | Antwort', multiline: true }),
          }),
          { label: 'DE | Fragen', itemLabel: props => props.fields.question.value ?? 'Frage' }
        ),
      },
    }),

    testimonials: singleton({
      label: 'Opinie',
      path: 'src/content/pages/testimonials',
      schema: {
        items: fields.array(
          fields.object({
            quote:   fields.text({ label: 'Treść opinii', multiline: true, validation: { isRequired: true } }),
            author:  fields.text({ label: 'Imię autora', validation: { isRequired: true } }),
            petName: fields.text({ label: 'Imię zwierzęcia (opcjonalnie)' }),
            petType: fields.text({ label: 'Gatunek (np. "pies", "kot")' }),
          }),
          {
            label: 'Opinie',
            itemLabel: props => props.fields.author.value ?? 'Opinia',
          }
        ),
      },
    }),

    contact: singleton({
      label: 'Kontakt',
      path: 'src/content/pages/contact',
      schema: {
        email: fields.text({ label: 'E-mail' }),
        phone: fields.text({ label: 'Telefon' }),
        // Polish
        heading: fields.text({ label: 'PL | Nagłówek strony' }),
        intro:   fields.text({ label: 'PL | Wstęp', multiline: true }),
        body:    fields.markdoc({ label: 'PL | Dodatkowa treść' }),
        // English
        en_heading: fields.text({ label: 'EN | Page heading' }),
        en_intro:   fields.text({ label: 'EN | Intro', multiline: true }),
        en_body:    fields.markdoc({ label: 'EN | Additional content' }),
        // German
        de_heading: fields.text({ label: 'DE | Seitenüberschrift' }),
        de_intro:   fields.text({ label: 'DE | Einführung', multiline: true }),
        de_body:    fields.markdoc({ label: 'DE | Zusätzlicher Inhalt' }),
      },
    }),
  },
});
