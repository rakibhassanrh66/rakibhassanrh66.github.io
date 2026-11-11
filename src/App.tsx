import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/layout/Navigation';
import HeroSection from '@/components/hero/HeroSection';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import { DesignSystemPreview } from '@/components/DesignSystemPreview';
import { useTheme } from '@/hooks/useTheme';
import { useDeviceDetect } from '@/hooks/useDeviceDetect';
import { FiX } from 'react-icons/fi';

// Lazy load sections
const ProjectsSection = lazy(() => import('@/components/projects/ProjectsSection'));
const AboutSection = lazy(() => import('@/components/about/AboutSection'));
const ContactSection = lazy(() => import('@/components/contact/ContactSection'));

function SectionFallback() {
  return (
    <div className="flex items-center justify-center py-24" aria-label="Loading section">
      <div className="w-6 h-6 rounded-full border-2 border-[var(--color-hairline-strong)] border-t-[var(--color-accent)] animate-spin" />
    </div>
  );
}

export default function App() {
  const { toggleTheme, isDark } = useTheme();
  const { deviceType, isLowPower } = useDeviceDetect();
  const [activeSection, setActiveSection] = useState('hero');
  const [returningNotice, setReturningNotice] = useState<string | null>(null);
  const [showDesignSystem, setShowDesignSystem] = useState(() => {
    return typeof window !== 'undefined' && window.location.search.includes('design-system');
  });

  const sectionOrder = ['hero', 'projects', 'about', 'contact'];

  // Smart Site: Returning visitor detection
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const lastVisit = localStorage.getItem('last_visit_timestamp');
      const now = Date.now();
      if (lastVisit) {
        const hoursAgo = Math.round((now - parseInt(lastVisit, 10)) / (1000 * 60 * 60));
        if (hoursAgo < 72) {
          setReturningNotice('Welcome back · Resuming session');
          setTimeout(() => setReturningNotice(null), 5000);
        }
      }
      localStorage.setItem('last_visit_timestamp', now.toString());
    } catch {
      // Ignore storage errors in private browsing
    }
  }, []);

  // Keyboard navigation: J (next section) / K (previous section)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Don't intercept when user is typing in inputs
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'j' || e.key === 'J') {
        const currentIndex = sectionOrder.indexOf(activeSection);
        if (currentIndex < sectionOrder.length - 1) {
          const nextId = sectionOrder[currentIndex + 1];
          document.getElementById(nextId)?.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (e.key === 'k' || e.key === 'K') {
        const currentIndex = sectionOrder.indexOf(activeSection);
        if (currentIndex > 0) {
          const prevId = sectionOrder[currentIndex - 1];
          document.getElementById(prevId)?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection]);

  // Section Observer for Nav Spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-25% 0px -65% 0px' }
    );

    sectionOrder.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  if (showDesignSystem) {
    return <DesignSystemPreview onClose={() => setShowDesignSystem(false)} />;
  }

  return (
    <div className="relative min-h-screen bg-[var(--color-canvas)] text-[var(--color-ink)] selection:bg-[var(--color-accent)] selection:text-black">
      {/* Skip to Content Accessibility Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 rounded bg-[var(--color-ink)] text-[var(--color-canvas)] text-xs font-mono font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
      >
        Skip to main content
      </a>

      {/* State-aware hardware cursor */}
      <CustomCursor />

      {/* Returning Visitor Quiet Toast */}
      <AnimatePresence>
        {returningNotice && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-4 z-40 px-3 py-1.5 rounded-full bg-[var(--color-surface-2)] border border-[var(--color-hairline-strong)] text-xs font-mono text-[var(--color-ink)] shadow-lg flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>{returningNotice}</span>
            <button
              onClick={() => setReturningNotice(null)}
              className="text-[var(--color-ink-faint)] hover:text-[var(--color-ink)]"
            >
              <FiX size={12} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Floating Navigation Shell */}
      <Navigation
        isDark={isDark}
        onToggleTheme={toggleTheme}
        activeSection={activeSection}
      />

      {/* Main Landmark */}
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Projects (Case Studies) */}
        <Suspense fallback={<SectionFallback />}>
          <ProjectsSection />
        </Suspense>

        {/* 3. About, Skills & Credentials */}
        <Suspense fallback={<SectionFallback />}>
          <AboutSection />
        </Suspense>

        {/* 4. Contact & Inquiries */}
        <Suspense fallback={<SectionFallback />}>
          <ContactSection />
        </Suspense>
      </main>

      {/* Colophon & Architectural Footer */}
      <Footer />
    </div>
  );
}
