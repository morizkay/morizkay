import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import config from '../astro.config.mjs';

// Run after `pnpm build`. Checks generated files without making network requests.
const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'dist');
const site = new URL(config.site);
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
const decode = value => value.replace(/&(?:amp|quot|apos|lt|gt|#(\d+)|#x([\da-f]+));/gi, (entity, decimal, hex) => {
  if (decimal || hex) return String.fromCodePoint(Number.parseInt(decimal ?? hex, decimal ? 10 : 16));
  return { '&amp;': '&', '&quot;': '"', '&apos;': "'", '&lt;': '<', '&gt;': '>' }[entity.toLowerCase()];
});

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory()
    ? walk(path.join(directory, entry.name)) : path.join(directory, entry.name)))).flat();
}

function tags(html) {
  // Generated Astro markup has quoted attributes; ignore raw script/style bodies.
  const markup = html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '');
  return [...markup.matchAll(/<([a-z][\w:-]*)\b([^<>]*?)\/?>/gi)].map(([, name, source]) => ({
    name: name.toLowerCase(),
    attrs: Object.fromEntries([...source.matchAll(/([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>"']+)))?/g)]
      .map(([, key, double, single, bare]) => [key.toLowerCase(), decode(double ?? single ?? bare ?? '')])),
  }));
}

async function localFile(url) {
  if (url.pathname === '/404/') return path.join(output, '404.html');
  const filename = path.join(output, decodeURIComponent(url.pathname));
  if (!filename.startsWith(`${output}${path.sep}`)) return undefined;
  try {
    const info = await stat(filename);
    return info.isDirectory() ? path.join(filename, 'index.html') : filename;
  } catch { return undefined; }
}

const documents = new Map();
async function document(filename) {
  if (!documents.has(filename)) {
    const text = await readFile(filename, 'utf8');
    documents.set(filename, { text, tags: tags(text) });
  }
  return documents.get(filename);
}

let checkedLinks = 0;
async function checkLink(value, base, label, fragment = false) {
  if (!value || /^(?:mailto:|tel:|data:|javascript:)/i.test(value)) return;
  const url = new URL(decode(value), base);
  if (url.origin !== site.origin) return;
  const filename = await localFile(url);
  check(Boolean(filename), `${label}: missing local target ${url.pathname}`);
  if (!filename) return;
  try { await stat(filename); } catch { check(false, `${label}: missing index ${url.pathname}`); return; }
  checkedLinks++;
  if (fragment && url.hash && filename.endsWith('.html')) {
    const target = await document(filename);
    const id = decodeURIComponent(url.hash.slice(1));
    check(target.tags.some(tag => tag.attrs.id === id), `${label}: missing fragment ${url.pathname}#${id}`);
  }
}

let files;
try { files = await walk(output); } catch { throw new Error('No dist directory. Run pnpm build before pnpm test.'); }
const htmlFiles = files.filter(filename => filename.endsWith('.html'));
check(htmlFiles.length >= 5, 'Expected homepage, about, projects, notes, and 404 pages.');
const pageURLs = [];

for (const filename of htmlFiles) {
  const relative = path.relative(output, filename).split(path.sep).join('/');
  const route = `/${relative.replace(/(?:^|\/)index\.html$/, '').replace(/\.html$/, '')}`.replace(/\/$/, '') + '/';
  const expected = new URL(route === '//' ? '/' : route, site).href;
  const { text, tags: elements } = await document(filename);
  const canonical = elements.filter(tag => tag.name === 'link' && tag.attrs.rel === 'canonical');
  check(canonical.length === 1 && canonical[0].attrs.href === expected, `${relative}: canonical must be ${expected}`);
  check(elements.filter(tag => tag.name === 'h1').length === 1, `${relative}: expected exactly one h1`);
  check(elements.some(tag => tag.name === 'main' && tag.attrs.id === 'main'), `${relative}: missing main skip-link target`);
  const metadata = key => elements.find(tag => tag.name === 'meta' && (tag.attrs.property === key || tag.attrs.name === key))?.attrs.content;
  check(Boolean(metadata('description')), `${relative}: missing description`);
  check(metadata('og:url') === expected, `${relative}: Open Graph URL differs from canonical`);
  check(metadata('og:image') === metadata('twitter:image'), `${relative}: social image metadata differs`);
  for (const key of ['og:image', 'twitter:image']) {
    const value = metadata(key);
    check(Boolean(value) && new URL(value, site).origin === site.origin, `${relative}: ${key} must use the canonical origin`);
    if (value) await checkLink(value, expected, `${relative} ${key}`);
  }
  if (relative === '404.html') check(metadata('robots')?.includes('noindex'), '404 page must be noindex');
  else pageURLs.push(expected);
  for (const tag of elements) {
    if (tag.name === 'img') check('alt' in tag.attrs, `${relative}: image lacks alt attribute`);
    for (const attribute of ['href', 'src', 'poster']) {
      if (tag.attrs[attribute]) await checkLink(tag.attrs[attribute], expected, relative, attribute === 'href');
    }
    if (tag.attrs.srcset && !tag.attrs.srcset.startsWith('data:')) {
      for (const candidate of tag.attrs.srcset.split(',')) await checkLink(candidate.trim().split(/\s+/)[0], expected, relative);
    }
  }
  for (const [, resource] of text.matchAll(/url\(["']?([^\s"')]+)["']?\)/g)) await checkLink(resource, expected, relative);
}

const textFiles = files.filter(filename => /\.(?:html|xml|txt|css|js)$/.test(filename));
const publicText = [];
for (const filename of textFiles) {
  const text = await readFile(filename, 'utf8');
  const relative = path.relative(output, filename);
  publicText.push(text);
  for (const [label, pattern] of [
    ['starter placeholder content', /lorem ipsum|welcome to astro|astro blog|example\.com|blog-placeholder/i],
    ['local workspace path', /\/(?:home|Users)\/[^\s/]+\/(?:Developers|\.codex|\.aws)\//],
  ]) check(!pattern.test(text), `${relative}: contains ${label}`);
  if (filename.endsWith('.css')) {
    const base = new URL(path.relative(output, filename).split(path.sep).join('/'), site);
    for (const [, resource] of text.matchAll(/url\(["']?([^\s"')]+)["']?\)/g)) await checkLink(resource, base, relative);
  }
}
check(!files.some(filename => path.basename(filename).startsWith('blog-placeholder')), 'Starter image assets must not be deployed.');

const sitemapIndex = await readFile(path.join(output, 'sitemap-index.xml'), 'utf8');
const sitemapURLs = [...sitemapIndex.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, value]) => decode(value));
const indexedPages = [];
for (const value of sitemapURLs) {
  check(new URL(value).origin === site.origin, 'Sitemap index uses a different origin.');
  await checkLink(value, site, 'Sitemap index');
  const filename = await localFile(new URL(value));
  if (!filename) continue;
  for (const [, location] of (await readFile(filename, 'utf8')).matchAll(/<loc>(.*?)<\/loc>/g)) {
    const url = decode(location);
    check(new URL(url).origin === site.origin, 'Page sitemap uses a different origin.');
    check(new URL(url).pathname.endsWith('/'), `Sitemap page requires trailing slash: ${url}`);
    await checkLink(url, site, 'Page sitemap');
    indexedPages.push(url);
  }
}
check(JSON.stringify([...indexedPages].sort()) === JSON.stringify([...pageURLs].sort()), 'Sitemap must contain exactly the public HTML pages, excluding 404.');

const robots = await readFile(path.join(output, 'robots.txt'), 'utf8');
check(robots.includes(`Sitemap: ${new URL('sitemap-index.xml', site).href}`), 'robots.txt points to the wrong sitemap.');
const rss = await readFile(path.join(output, 'rss.xml'), 'utf8');
for (const [, value] of rss.matchAll(/<link>(.*?)<\/link>/g)) {
  const url = decode(value);
  check(new URL(url).origin === site.origin, 'RSS uses a different origin.');
  await checkLink(url, site, 'RSS');
}

// Drafts and scheduled posts must not leak through routes, listings, feeds, or sitemaps.
for (const filename of await walk(path.join(root, 'src/content/blog'))) {
  if (!/\.mdx?$/.test(filename)) continue;
  const source = await readFile(filename, 'utf8');
  const frontmatter = source.match(/^---\s*\n([\s\S]*?)\n---/)?.[1] ?? '';
  const draft = /^draft:\s*true\s*$/m.test(frontmatter);
  const publicationDate = frontmatter.match(/^pubDate:\s*['"]?([^\n'"]+)['"]?\s*$/m)?.[1];
  const future = publicationDate && new Date(publicationDate).getTime() > Date.now();
  if (!draft && !future) continue;
  const slug = path.relative(path.join(root, 'src/content/blog'), filename).replace(/\.mdx?$/, '').split(path.sep).join('/');
  const route = `/blog/${slug}/`;
  check(!files.includes(path.join(output, 'blog', slug, 'index.html')), `Unpublished post has a generated route: ${slug}`);
  check(!publicText.some(text => text.includes(route)), `Unpublished post route appears in public output: ${slug}`);
}

if (failures.length) {
  console.error(failures.map(failure => `FAIL: ${failure}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Checked ${htmlFiles.length} HTML pages and ${checkedLinks} local references; canonical metadata, sitemap, RSS, robots, and draft exclusions passed.`);
}
