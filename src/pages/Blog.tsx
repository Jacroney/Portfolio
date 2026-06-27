import { motion } from 'framer-motion';
import { Badge, LayerCard, Link } from '@cloudflare/kumo';
import { ArrowRight } from '@phosphor-icons/react';
import Seo from '../components/Seo';
import { getAllPosts, formatDate } from '../lib/posts';
import { Reveal, Stagger, StaggerItem } from '../components/Motion';

const Blog = () => {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen pt-24 pb-16">
      <Seo title="Blog" description="Writing on software, systems, and the projects I build." />
      <div className="max-w-3xl mx-auto px-6">
        <Reveal>
          <h1 className="text-3xl font-bold text-kumo-strong mb-2">Blog</h1>
          <p className="text-kumo-subtle mb-12">
            Notes on software, systems, and the things I build.
          </p>
        </Reveal>

        {posts.length === 0 ? (
          <p className="text-kumo-subtle">No posts yet — check back soon.</p>
        ) : (
          <Stagger className="grid gap-6">
            {posts.map((post) => (
              <StaggerItem key={post.slug}>
                <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}>
                  <LayerCard>
                    <LayerCard.Secondary>{formatDate(post.date)}</LayerCard.Secondary>
                    <LayerCard.Primary>
                      <h2 className="text-xl font-semibold text-kumo-strong mb-2">
                        <Link href={`/blog/${post.slug}`} variant="plain" className="!text-kumo-strong hover:!text-kumo-link">
                          {post.title}
                        </Link>
                      </h2>
                      <p className="text-kumo-default leading-relaxed mb-4">{post.excerpt}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="neutral">{tag}</Badge>
                        ))}
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        variant="plain"
                        className="inline-flex items-center gap-1.5 text-sm font-medium"
                      >
                        Read more <ArrowRight size={15} weight="bold" />
                      </Link>
                    </LayerCard.Primary>
                  </LayerCard>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </div>
    </div>
  );
};

export default Blog;
