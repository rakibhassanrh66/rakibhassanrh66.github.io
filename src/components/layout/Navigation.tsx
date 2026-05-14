import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';
import ThemeToggle from '@/components/ui/ThemeToggle';
import SearchBar from '@/components/ui/SearchBar';
import CVDownload from '@/components/ui/CVDownload';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useDeviceDetect } from '@/hooks/useDeviceDetect';

interface NavProps {
  isDark: boolean;
  onToggleTheme: () => void;
  activeSection: string;
}

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation({ isDark, onToggleTheme, activeSection }: NavProps) {
  const { scrollDirection, isAtTop } = useScrollPosition();
  const { deviceType } = useDeviceDetect();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = deviceType === 'mobile';

  // Auto-hide logic
  const shouldHide = !isAtTop && scrollDirection === 'down' && !mobileMenuOpen;
  const navBg = isAtTop
    ? 'bg-transparent'
    : 'bg-[var(--nav-bg)] backdrop-blur-xl border-b border-[var(--nav-border)]';

  // Keyboard shortcut
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed left-0 right-0 top-0 z-50 transition-colors duration-500 ${navBg}`}
        animate={{ y: shouldHide ? -100 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <motion.a
            href="#hero"
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-neon-cyan to-electric-purple">
              <span className="text-sm font-bold text-white font-[Orbitron]">RH</span>
            </div>
            <span className="hidden text-sm font-semibold text-[var(--text-primary)] sm:block font-[Orbitron] tracking-wider">
              RAKIB<span className="text-neon-cyan">.dev</span>
            </span>
          </motion.a>

          {/* Desktop Nav */}
          {!isMobile && (
            <div className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                    activeSection === link.href.slice(1)
                      ? 'text-neon-cyan'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                  {activeSection === link.href.slice(1) && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-neon-cyan/10 border border-neon-cyan/20"
                      layoutId="activeNav"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.a>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] px-3 py-2 text-xs text-[var(--text-muted)] backdrop-blur-md transition-colors hover:text-[var(--text-primary)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Search (⌘K)"
            >
              <FiSearch className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden rounded border border-[var(--card-border)] px-1.5 py-0.5 text-[10px] lg:inline">
                ⌘K
              </kbd>
            </motion.button>

            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />

            {isMobile && (
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--text-secondary)] backdrop-blur-md"
                whileTap={{ scale: 0.9 }}
              >
                {mobileMenuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
              </motion.button>
            )}

            {!isMobile && <CVDownload variant="inline" />}
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && isMobile && (
            <motion.div
              className="border-t border-[var(--divider)] bg-[var(--mobile-menu-bg)] px-4 py-4 backdrop-blur-xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`rounded-xl px-4 py-3 text-sm transition-colors ${
                      activeSection === link.href.slice(1)
                        ? 'bg-neon-cyan/10 text-neon-cyan'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--card-bg)] hover:text-[var(--text-primary)]'
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <div className="mt-2 pt-2 border-t border-[var(--divider)]">
                  <CVDownload variant="button" className="w-full justify-center" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <SearchBar isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
