import { load as parseYaml } from 'js-yaml';

export interface PostMeta {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

export interface Post extends PostMeta {
  slug: string;
  content: string;
}

// Raw markdown for every post, loaded at build time.
const rawPosts = import.meta.glob('../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

function slugFromPath(path: string): string {
  return path.split('/').pop()!.replace(/\.md$/, '');
}

function parsePost(path: string, raw: string): Post {
  const match = raw.match(FRONTMATTER_RE);
  if (!match) {
    throw new Error(`Post "${path}" is missing valid frontmatter`);
  }

  const meta = parseYaml(match[1]) as Partial<PostMeta>;
  return {
    slug: slugFromPath(path),
    title: meta.title ?? slugFromPath(path),
    date: meta.date ?? '',
    excerpt: meta.excerpt ?? '',
    tags: meta.tags ?? [],
    content: match[2].trim(),
  };
}

const posts: Post[] = Object.entries(rawPosts)
  .map(([path, raw]) => parsePost(path, raw))
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function getAllPosts(): Post[] {
  return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function formatDate(date: string): string {
  if (!date) return '';
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
