// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// SITE_URL is the public address of the site. It is set to the real GitHub Pages
// address at deployment (Phase 4); the placeholder is fine for local preview.
const site = process.env.SITE_URL || 'https://username.github.io';

export default defineConfig({
  site,
  integrations: [sitemap()],
  server: { host: true, port: 4321 },
  vite: {
    plugins: [tailwindcss()],
    server: { watch: { usePolling: process.env.WATCH_POLLING === 'true' } },
  },
});
