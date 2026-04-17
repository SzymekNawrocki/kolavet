// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://kolavet.pl',
  vite: { plugins: [tailwindcss()] },
  integrations: [react(), markdoc(), keystatic(), sitemap()],
});
