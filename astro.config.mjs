// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Wajib diisi supaya @astrojs/sitemap jalan — tanpa ini integrasinya di-skip
  // dan sitemap-index.xml tidak pernah dibuat.
  site: 'https://himafi.netlify.app',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    mdx(),
    sitemap({
      // /utility masih placeholder "under construction" — jangan disubmit
      // ke mesin pencari sebagai halaman kosong.
      filter: (page) => !page.includes('/utility'),
    }),
  ]
});