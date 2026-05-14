import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';
import { projects, skills } from '@/data/portfolio';

interface SearchResult {
  type: 'project' | 'skill' | 'section';
  label: string;
  section?: string;
}

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const sections = [
  { label: 'Hero', id: 'hero' },
  { label: 'About', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
];

export default function SearchBar({ isOpen, onClose }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const allResults: SearchResult[] = [
    ...projects.map((p) => ({ type: 'project' as const, label: p.title, section: 'projects' })),
    ...skills.map((s) => ({ type: 'skill' as const, label: s.name, section: 'about' })),
    ...sections.map((s) => ({ type: 'section' as const, label: s.label, section: s.id })),
  ];

  const filtered = query
    ? allResults.filter((r) => r.label.toLowerCase().includes(query.toLowerCase()))
    : allResults.slice(0, 8);

  const handleSelect = (result: SearchResult) => {
    const sectionId = result.section || result.label.toLowerCase();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setQuery('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="fixed inset-0 bg-[var(--modal-overlay)] backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative z-10 w-full max-w-lg rounded-2xl border border-[var(--search-border)] bg-[var(--search-bg)] p-4 shadow-2xl backdrop-blur-xl"
            initial={{ scale: 0.9, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: -20 }}
          >
            <div className="flex items-center gap-3 rounded-xl border border-[var(--search-border)] bg-[var(--card-bg)] px-4 py-3">
              <FiSearch className="text-neon-cyan h-5 w-5" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, skills, sections..."
                className="flex-1 bg-transparent text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                  <FiX className="h-4 w-4" />
                </button>
              )}
              <kbd className="hidden rounded-md border border-[var(--search-border)] px-2 py-0.5 text-xs text-[var(--text-muted)] sm:block">
                ESC
              </kbd>
            </div>
            <div className="mt-3 max-h-64 overflow-y-auto">
              {filtered.map((result, i) => (
                <motion.button
                  key={`${result.type}-${result.label}-${i}`}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--search-item-hover)] hover:text-[var(--text-primary)]"
                  onClick={() => handleSelect(result)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <span className="rounded-md bg-[var(--card-bg)] px-2 py-0.5 text-[10px] uppercase text-[var(--text-muted)]">
                    {result.type}
                  </span>
                  {result.label}
                </motion.button>
              ))}
              {filtered.length === 0 && (
                <p className="py-4 text-center text-sm text-[var(--text-muted)]">No results found</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
