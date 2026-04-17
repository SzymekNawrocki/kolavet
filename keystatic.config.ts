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
          validation: { isRequired: true },
        }),
        content: fields.markdoc({ label: 'Treść' }),
      },
    }),
  },

  singletons: {
    aboutMe: singleton({
      label: 'O mnie',
      path: 'src/content/pages/about',
      schema: {
        heading: fields.text({ label: 'Nagłówek' }),
        bio: fields.markdoc({ label: 'Bio' }),
        photo: fields.image({
          label: 'Zdjęcie',
          directory: 'public/images',
          publicPath: '/images/',
        }),
      },
    }),
    contact: singleton({
      label: 'Kontakt',
      path: 'src/content/pages/contact',
      schema: {
        heading: fields.text({ label: 'Nagłówek' }),
        email: fields.text({ label: 'Email' }),
        body: fields.markdoc({ label: 'Treść' }),
      },
    }),
  },
});
