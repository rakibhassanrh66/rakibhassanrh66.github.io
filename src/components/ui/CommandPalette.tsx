import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiExternalLink, FiFileText, FiSun, FiMoon, FiMail, FiTerminal, FiShield } from 'react-icons/fi';
import { projects, portfolioData } from '@/data/portfolio';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  isDark,
  onToggleTheme,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Command items
  const items = [
    // Sections
    { id: 'sec-hero', category: 'Navigation', title: 'Home / Terminal Overview', shortcut: 'H', action: () => scrollTo('hero') },
    { id: 'sec-projects', category: 'Navigation', title: 'Selected Projects & Case Studies', shortcut: 'P', action: () => scrollTo('projects') },
    { id: 'sec-about', category: 'Navigation', title: 'Technical Matrix & Background', shortcut: 'A', action: () => scrollTo('about') },
    { id: 'sec-contact', category: 'Navigation', title: 'Contact & Security Inquiries', shortcut: 'C', action: () => scrollTo('contact') },
    
    // Quick Actions
    { id: 'act-cv', category: 'Actions', title: 'Download Technical CV (PDF)', icon: <FiFileText />, action: () => window.open(portfolioData.cvUrl, '_blank') },
    { id: 'act-email', category: 'Actions', title: `Copy Email (${portfolioData.email})`, icon: <FiMail />, action: () => navigator.clipboard.writeText(portfolioData.email) },
    { id: 'act-theme', category: 'Actions', title: isDark ? 'Switch to Light Surface' : 'Switch to Dark Canvas', icon: isDark ? <FiSun /> : <FiMoon />, action: onToggleTheme },

    // Featured Projects
    ...projects.map((p) => ({
      id: `proj-${p.id}`,
      category: 'Projects',
      title: `${p.title} — ${p.tagline}`,
      icon: <FiTerminal />,
      action: () => {
        window.open(p.githubUrl, '_blank');
      },
    })),
  ];

  const filtered = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  function scrollTo(id: string) {
    onClose();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Keyboard navigation inside palette
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
          onClose();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Palette Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -8 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-xl overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-hairline-strong)] bg-[var(--color-surface-1)] shadow-2xl"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 border-b border-[var(--color-hairline)]">
              <FiSearch className="text-[var(--color-ink-muted)] shrink-0" size={18} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Search projects, sections, or commands..."
                className="w-full h-14 px-3 bg-transparent text-[var(--color-ink)] placeholder-[var(--color-ink-faint)] focus:outline-none text-sm"
              />
              <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-mono rounded bg-[var(--color-surface-2)] text-[var(--color-ink-faint)] border border-[var(--color-hairline)]">
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-sm text-[var(--color-ink-faint)] font-mono">
                  No commands matching "{query}"
                </div>
              ) : (
                filtered.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        item.action();
                        onClose();
                      }}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[var(--radius-md)] text-left transition-colors text-sm ${
                        isSelected
                          ? 'bg-[var(--color-surface-2)] text-[var(--color-ink)]'
                          : 'text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]'
                      }`}
                    >
                      <div className="flex items-center gap-3 truncate">
                        <span className="text-[var(--color-ink-faint)] shrink-0">
                          {item.icon || <FiShield size={15} />}
                        </span>
                        <span className="truncate">{item.title}</span>
                      </div>
                      <span className="text-[11px] font-mono text-[var(--color-ink-faint)] shrink-0 pl-2">
                        {item.category}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Affordances */}
            <div className="px-4 py-2 border-t border-[var(--color-hairline)] bg-[var(--color-surface-2)] flex items-center justify-between text-[11px] font-mono text-[var(--color-ink-faint)]">
              <div className="flex items-center gap-3">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
              </div>
              <div>⌘K / Ctrl+K</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
