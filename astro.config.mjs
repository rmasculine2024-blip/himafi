// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Wajib diisi supaya @astrojs/sitemap jalan — tanpa ini integrasinya di-skip
  // dan sitemap-index.xml tidak pernah dibuat.
  //
  // Diambil dari env supaya fork/salinan yang dideploy ke situs Netlify lain
  // menghasilkan canonical, og:image, dan sitemap yang menunjuk ke dirinya
  // sendiri — bukan ke himafi.netlify.app. Netlify mengisi `URL` otomatis;
  // `SITE_URL` untuk override manual di luar Netlify.
  site:
    process.env.SITE_URL ?? process.env.URL ?? 'https://himafi.netlify.app',

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