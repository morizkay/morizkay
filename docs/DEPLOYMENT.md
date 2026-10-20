# Building and publishing the site

This repository has two public surfaces: `README.md` is the GitHub profile, and the Astro project at the repository root builds the personal website. Keep setup instructions here so they do not appear on the GitHub profile. The nested `morizkay/` directory is not the website's build root.

## Build settings

- **Framework:** Astro 7, static output; no server adapter required.
- **Root directory:** the repository root (`.`).
- **Node.js:** 22.22.0 or newer, as declared in `package.json`.
- **Package manager:** pnpm; use the committed `pnpm-lock.yaml`.
- **Install command:** `pnpm install --frozen-lockfile`.
- **Build command:** `pnpm build`.
- **Publish directory:** `dist`.
- **Required environment variables:** none.
- **Network at build time:** required. Astro downloads Geist and Geist Mono from Google Fonts and self-hosts them under `/_astro/fonts/`; visitors never contact Google.

The required content integrations are already installed: `@astrojs/mdx` and `@astrojs/sitemap` are enabled in `astro.config.mjs`, and `@astrojs/rss` generates the feed in `src/pages/rss.xml.js`. No additional integration installation is needed for Markdown/MDX posts, the sitemap, or RSS.

Serve the generated directory as static files, including its `index.html` files. Preserve the trailing slash on page URLs, for example `/about/` and `/blog/`; this matches `trailingSlash: 'always'` in `astro.config.mjs`. File URLs such as `/rss.xml` and `/robots.txt` retain their extensions without a trailing slash. Configure your static host to serve `404.html` with an HTTP 404 status for unknown routes, rather than rewriting every missing path to the homepage.

## Replacing the previous site

morizkay.com previously served a Next.js site from the separate `morizkay/morizkay.com` repository. Deploying this build replaces it, including its `/pi` install script (`curl -fsSL https://morizkay.com/pi | bash`). That script installs `@morizkay/pi-chrome`, which was not published on npm when checked, so it was not carried over. To keep the URL, put the script at `public/pi` and rebuild. The old repository’s `ssh morizkay.com` server ran on a separate VPS and is unaffected by static hosting, but pointing the domain’s A record at a static host takes SSH away from that VPS.

## Domains and canonical URLs

The primary domain is **https://morizkay.com**. It is configured as Astro's `site`, which is used for canonical metadata, the RSS feed, and the sitemap. The same person owns **rizky.id**; use it as an alternate entry point to this site.

At your hosting provider, attach the domains and enable HTTPS, then configure permanent host-level redirects (HTTP 301 or 308):

| Incoming host | Destination |
| --- | --- |
| `rizky.id` | `https://morizkay.com` |
| `www.rizky.id` | `https://morizkay.com` |
| `www.morizkay.com` | `https://morizkay.com` |

Preserve the complete path and query string. For example, `https://rizky.id/about/?ref=profile` should redirect to `https://morizkay.com/about/?ref=profile`. Redirect HTTP traffic to HTTPS as well. Use your provider's hostname redirect feature: a static Astro build cannot make host-specific redirects itself. DNS records alone do not perform redirects.

Both domains can serve the same build while redirects are being configured, but all generated canonical URLs will still identify `morizkay.com` as the primary host. To intentionally make `rizky.id` primary later, change `site` in `astro.config.mjs`, update the profile's primary website links, reverse the host redirects, and rebuild. Preview deployments should not override the production canonical URL.

The build generates `/sitemap-index.xml` and `/robots.txt`. The robots endpoint reads the sitemap origin from the same Astro configuration so the two cannot drift. These settings prepare the files; DNS, hosting, TLS, and domain redirects must still be configured when deploying.

## Local development

Follow `AGENTS.md` and run the development server in background mode:

```sh
pnpm astro dev --background
pnpm astro dev status
pnpm astro dev logs
pnpm astro dev stop
```

Run `pnpm build && pnpm test` to build and check the production output. The Node-based output check verifies local links and fragments, page metadata, sitemap/RSS/robots consistency, image alt attributes, and exclusion of draft routes and starter content. It does not contact external websites or validate hosting redirects.

Use `pnpm preview` to inspect the build locally. Run `pnpm assets` after editing the artwork in `scripts/generate-assets.mjs` or `public/favicon.svg` to regenerate the social card and favicon, then rebuild. The social card renders with locally installed fonts, so install Geist and Geist Mono first (or point `FONTCONFIG_FILE` at a config that includes them) for an exact match.

## Publishing writing

Posts live in `src/content/blog/` as Markdown or MDX. Their frontmatter is validated in `src/content.config.ts`; `title`, `description`, and `pubDate` are required. Use an ISO date, or an ISO timestamp with an explicit timezone when the publication time matters.

Set `draft: true` while working. The shared `getPublishedPosts()` helper excludes drafts and posts whose `pubDate` is in the future from the blog index, generated post routes, and RSS. It sorts published entries from newest to oldest. `draft` defaults to `false` when omitted, so check it before adding a new file. Starter demonstration posts remain in the source as drafts and are not personal writing.

Publishing requires a new build and deployment. A future publication date does not automatically trigger either; arrange a scheduled deployment if a post must appear at a particular time. Draft files in a public Git repository remain readable in the source even though they are excluded from the website.

After building, inspect `dist/` and verify that the sitemap, RSS, and page canonical tags use the primary domain and include only published pages. After deployment, check both domain redirects with a path and a query string.

## References

- [Astro deployment overview](https://docs.astro.build/en/guides/deploy/)
- [Astro routing](https://docs.astro.build/en/guides/routing/)
- [Content collections](https://docs.astro.build/en/guides/content-collections/)
- [RSS feeds](https://docs.astro.build/en/recipes/rss/)
- [Sitemap integration](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
