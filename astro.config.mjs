// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: { plugins: [tailwindcss()] },
  integrations: [react(), markdoc(), keystatic()],
});
