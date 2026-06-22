import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const SITE_URL = 'https://josephcroney.com';
const SITE_TITLE = 'Joe Croney';
const SITE_DESCRIPTION =
  'Notes on software, systems, and the things I build.';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = join(__dirname, '..', 'src', 'content', 'blog');
const OUTPUT = join(__dirname, '..', 'public', 'rss.xml');

function escapeXml(value) {
  return String(value).replace(/[<>&'"]/g, (char) => {
    switch (char) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case "'":
        return '&apos;';
      case '"':
        return '&quot;';
      default:
        return char;
    }
  });
}

const posts = readdirSync(BLOG_DIR)
  .filter((file) => file.endsWith('.md'))
  .map((file) => {
    const slug = file.replace(/\.md$/, '');
    const { data } = matter(readFileSync(join(BLOG_DIR, file), 'utf-8'));
    return {
      slug,
      title: data.title ?? slug,
      excerpt: data.excerpt ?? '',
      date: data.date ? new Date(data.date) : new Date(0),
    };
  })
  .sort((a, b) => b.date - a.date);

const items = posts
  .map(
    (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid>${SITE_URL}/blog/${post.slug}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${post.date.toUTCString()}</pubDate>
    </item>`
  )
  .join('\n');

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}/blog</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

writeFileSync(OUTPUT, rss, 'utf-8');
console.log(`Generated ${OUTPUT} with ${posts.length} post(s).`);
