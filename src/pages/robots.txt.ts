import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
	if (!site) throw new Error('Set the canonical site URL in astro.config.mjs.');

	const sitemap = new URL('sitemap-index.xml', site);
	return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap.href}\n`, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
