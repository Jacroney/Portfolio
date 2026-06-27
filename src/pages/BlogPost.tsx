import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Badge, Link } from '@cloudflare/kumo';
import { ArrowLeft } from '@phosphor-icons/react';
import Seo from '../components/Seo';
import { getPostBySlug, formatDate } from '../lib/posts';
import { Reveal } from '../components/Motion';

const PROSE_CLASSES = [
  'prose max-w-none',
  'prose-headings:text-kumo-strong prose-headings:font-semibold',
  'prose-p:text-kumo-default prose-li:text-kumo-default',
  'prose-strong:text-kumo-strong prose-a:text-kumo-link',
  'prose-code:text-kumo-default prose-code:before:content-none prose-code:after:content-none',
  'prose-pre:bg-kumo-recessed prose-pre:ring-1 prose-pre:ring-kumo-line',
  'prose-blockquote:text-kumo-subtle prose-blockquote:border-kumo-line',
  'prose-hr:border-kumo-line prose-th:text-kumo-strong prose-td:text-kumo-default',
].join(' ');

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <Seo title="Post not found" />
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-2xl font-bold text-kumo-strong mb-4">Post not found</h1>
          <p className="text-kumo-default mb-6">That post doesn't exist or may have been moved.</p>
          <Link href="/blog" variant="plain" className="inline-flex items-center gap-1.5">
            <ArrowLeft size={15} weight="bold" /> Back to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <Seo title={post.title} description={post.excerpt} type="article" />
      <div className="max-w-3xl mx-auto px-6">
        <Reveal>
          <Link href="/blog" variant="plain" className="inline-flex items-center gap-1.5 text-sm">
            <ArrowLeft size={15} weight="bold" /> Back to blog
          </Link>

          <header className="mt-6 mb-8">
            <p className="text-sm text-kumo-subtle mb-2">{formatDate(post.date)}</p>
            <h1 className="text-3xl md:text-4xl font-bold text-kumo-strong mb-4 tracking-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="neutral">{tag}</Badge>
              ))}
            </div>
          </header>
        </Reveal>

        <Reveal delay={0.05}>
          <div className={PROSE_CLASSES}>
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default BlogPost;
