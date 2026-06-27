import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GithubLogo, LinkedinLogo, List, X } from '@phosphor-icons/react';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'Blog', path: '/blog' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const socials = [
  { href: 'https://github.com/Jacroney', label: 'GitHub Profile', Icon: GithubLogo },
  { href: 'https://www.linkedin.com/in/joseph-croney/', label: 'LinkedIn Profile', Icon: LinkedinLogo },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) =>
    path === '/blog'
      ? location.pathname.startsWith('/blog')
      : location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-kumo-line bg-kumo-base/80 backdrop-blur-md"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="group flex items-center gap-2 text-lg font-semibold text-kumo-strong">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-kumo-brand transition-transform group-hover:scale-125" />
            Joe Croney
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-kumo-strong'
                    : 'text-kumo-subtle hover:text-kumo-strong'
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-kumo-brand"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
              </Link>
            ))}

            <span className="mx-2 h-5 w-px bg-kumo-line" />

            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 text-kumo-subtle transition-colors hover:text-kumo-brand"
              >
                <Icon size={20} weight="fill" />
              </a>
            ))}
            <ThemeToggle className="ml-1" />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen((open) => !open)}
            className="md:hidden p-2 text-kumo-subtle hover:text-kumo-strong"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-b border-kumo-line bg-kumo-base"
          >
            <div className="px-6 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block rounded-lg px-3 py-2 font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-kumo-tint text-kumo-strong'
                      : 'text-kumo-subtle hover:bg-kumo-tint hover:text-kumo-strong'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center gap-2 pt-3">
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-kumo-subtle transition-colors hover:text-kumo-brand"
                  >
                    <Icon size={22} weight="fill" />
                  </a>
                ))}
                <span className="mx-1 h-5 w-px bg-kumo-line" />
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
