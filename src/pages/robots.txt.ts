import type { APIRoute } from "astro";

// Dibuat lewat endpoint, bukan file statis di public/, karena baris Sitemap
// wajib berupa URL absolut. Kalau di-hardcode, salinan/fork yang dideploy ke
// alamat lain akan menunjuk sitemap situs aslinya.
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL("sitemap-index.xml", site).href;

  return new Response(
    `User-agent: *
Allow: /
Disallow: /utility

Sitemap: ${sitemap}
`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
};
