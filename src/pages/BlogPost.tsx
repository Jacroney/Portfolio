import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import Seo from '../components/Seo';
import { getPostBySlug, formatDate } from '../lib/posts';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <Seo title="Post not found" />
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
          <p className="text-gray-600 mb-6">
            That post doesn't exist or may have been moved.
          </p>
          <Link to="/blog" className="text-gray-600 hover:text-gray-900 transition-colors">
            ← Back to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <Seo title={post.title} description={post.excerpt} type="article" />
      <div className="max-w-3xl mx-auto px-6">
        <Link
          to="/blog"
          className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          ← Back to blog
        </Link>

        <header className="mt-6 mb-8">
          <p className="text-sm text-gray-400 mb-2">{formatDate(post.date)}</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="prose prose-gray max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
