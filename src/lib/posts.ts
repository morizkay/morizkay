import { getCollection } from 'astro:content';

/** The same publication rules apply to pages, listings, and RSS. */
export async function getPublishedPosts(now = new Date()) {
	const posts = await getCollection(
		'blog',
		({ data }) => !data.draft && data.pubDate.getTime() <= now.getTime(),
	);

	return posts.sort(
		(a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime() || a.id.localeCompare(b.id),
	);
}
