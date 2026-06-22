import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { getAllPosts, formatDate } from '../lib/posts';

const Blog = () => {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen pt-24 pb-16">
      <Seo
        title="Blog"
        description="Writing on software, systems, and the projects I build."
      />
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog</h1>
        <p className="text-gray-500 mb-12">
          Notes on software, systems, and the things I build.
        </p>

        {posts.length === 0 ? (
          <p className="text-gray-500">No posts yet — check back soon.</p>
        ) : (
          <div className="space-y-12">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="border-b border-gray-100 pb-10 last:border-0"
              >
                <p className="text-sm text-gray-400 mb-2">{formatDate(post.date)}</p>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="hover:text-gray-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/blog/${post.slug}`}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
