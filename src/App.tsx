import { forwardRef, lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Link as RouterLink,
} from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { LinkProvider, type LinkComponentProps } from '@cloudflare/kumo';
import Navbar from './components/Navbar';

// Route-level code splitting keeps the markdown/syntax-highlighting deps
// (only used by the blog) out of the initial bundle.
const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));

/**
 * Bridges Kumo's `href`-based links to React Router. Internal app routes
 * (paths starting with "/" and without a file extension) navigate client-side;
 * everything else — external URLs, mailto:, and static files like the résumé
 * PDF — renders as a plain anchor.
 */
const AppLink = forwardRef<HTMLAnchorElement, LinkComponentProps>(
  ({ href, to, ...rest }, ref) => {
    const target = href ?? to ?? '';
    const isInternal = target.startsWith('/') && !/\.[a-z0-9]+$/i.test(target);
    if (!isInternal) {
      return <a ref={ref} href={target} {...rest} />;
    }
    return <RouterLink ref={ref} to={target} {...rest} />;
  },
);
AppLink.displayName = 'AppLink';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      >
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <LinkProvider component={AppLink}>
        <div className="min-h-screen bg-kumo-canvas">
          <Navbar />
          <main>
            <AnimatedRoutes />
          </main>
        </div>
      </LinkProvider>
    </Router>
  );
}

export default App;
