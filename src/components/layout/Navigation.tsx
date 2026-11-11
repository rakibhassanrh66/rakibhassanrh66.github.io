import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX, FiCommand, FiDownload } from 'react-icons/fi';
import { CommandPalette } from '@/components/ui/CommandPalette';
import { portfolioData } from '@/data/portfolio';
import { useScrollPosition } from '@/hooks/useScrollPosition';

interface NavigationProps {
  isDark: boolean;
  onToggleTheme: () => void;
  activeSection: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  isDark,
  onToggleTheme,
  activeSection,
}) => {
  const { scrollY, scrollDirection, isAtTop } = useScrollPosition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#hero', id: 'hero' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Stack & Matrix', href: '#about', id: 'about' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  // Auto-hide navigation logic
  const shouldHide = scrollY > 120 && scrollDirection === 'down' && !mobileMenuOpen;

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    setMobileMenuOpen(false);
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 flex justify-center px-4 pt-3 sm:pt-4 transition-transform duration-300 pointer-events-none ${
          shouldHide ? '-translate-y-24' : 'translate-y-0'
        }`}
      >
        <nav
          aria-label="Primary"
          className="pointer-events-auto w-full max-w-4xl h-14 px-3 sm:px-4 rounded-full border border-[var(--color-hairline)] bg-[var(--color-surface-1)]/90 backdrop-blur-md shadow-lg flex items-center justify-between transition-colors"
        >
          {/* Brand Monogram */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2 group px-2 text-decoration-none"
            aria-label="Rakib Hassan Portfolio Home"
          >
            <span className="w-8 h-8 rounded-full bg-[var(--color-surface-2)] border border-[var(--color-hairline-strong)] flex items-center justify-center font-mono text-xs font-semibold text-[var(--color-ink)] group-hover:border-[var(--color-accent)] transition-colors">
              {portfolioData.monogram}
            </span>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-semibold tracking-tight text-[var(--color-ink)] leading-none">
                {portfolioData.name}
              </span>
              <span className="text-[10px] font-mono text-[var(--color-ink-faint)] leading-tight mt-0.5">
                SEC_ENG // DHAKA
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    isActive
                      ? 'text-[var(--color-ink)] font-semibold'
                      : 'text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-full bg-[var(--color-surface-2)] border border-[var(--color-hairline)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </div>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2">
            {/* Command Palette Trigger */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="btn-base btn-sm btn-ghost gap-1 px-2.5 text-xs text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] border border-[var(--color-hairline)] rounded-full"
              aria-label="Open Command Palette"
            >
              <FiCommand size={13} />
              <span className="hidden sm:inline font-mono text-[11px]">⌘K</span>
            </button>

            {/* Quick CV Download (Desktop) */}
            <a
              href={portfolioData.cvUrl}
              download="Rakib_Hassan_CV.pdf"
              className="hidden sm:inline-flex btn-base btn-sm btn-secondary rounded-full"
              aria-label="Download CV"
            >
              <FiDownload size={13} />
              <span>CV</span>
            </a>

            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface-2)] transition-colors border border-[var(--color-hairline)]"
              aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {isDark ? <FiSun size={15} /> : <FiMoon size={15} />}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] border border-[var(--color-hairline)]"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <FiX size={16} /> : <FiMenu size={16} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed top-20 inset-x-4 z-40 p-4 rounded-[var(--radius-lg)] border border-[var(--color-hairline-strong)] bg-[var(--color-surface-1)]/98 backdrop-blur-lg shadow-2xl md:hidden space-y-3"
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-2.5 rounded-[var(--radius-md)] text-sm font-medium transition-colors ${
                    activeSection === link.id
                      ? 'bg-[var(--color-surface-2)] text-[var(--color-ink)] font-semibold'
                      : 'text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-[var(--color-hairline)] flex items-center justify-between">
              <a
                href={portfolioData.cvUrl}
                download="Rakib_Hassan_CV.pdf"
                className="btn-base btn-sm btn-secondary w-full justify-center"
              >
                <FiDownload size={14} />
                <span>Download Technical CV</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        isDark={isDark}
        onToggleTheme={onToggleTheme}
      />
    </>
  );
};

export default Navigation;
