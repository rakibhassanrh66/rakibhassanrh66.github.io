import { motion } from 'framer-motion';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export default function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <motion.button
      onClick={onToggle}
      className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-md transition-colors hover:bg-[var(--glass-bg)]"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Sun icon */}
      <motion.svg
        className="absolute h-5 w-5 text-yellow-400"
        fill="currentColor"
        viewBox="0 0 24 24"
        animate={{
          opacity: isDark ? 0 : 1,
          rotate: isDark ? 180 : 0,
          scale: isDark ? 0.5 : 1,
        }}
        transition={{ duration: 0.4 }}
      >
        <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </motion.svg>
      {/* Moon icon */}
      <motion.svg
        className="absolute h-5 w-5 text-neon-cyan"
        fill="currentColor"
        viewBox="0 0 24 24"
        animate={{
          opacity: isDark ? 1 : 0,
          rotate: isDark ? 0 : -180,
          scale: isDark ? 1 : 0.5,
        }}
        transition={{ duration: 0.4 }}
      >
        <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </motion.svg>
    </motion.button>
  );
}
