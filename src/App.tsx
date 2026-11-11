import { useState, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/layout/Navigation';
import HeroSection from '@/components/hero/HeroSection';
import Footer from '@/components/layout/Footer';
import CursorGlow from '@/components/ui/CursorGlow';
import { DesignSystemPreview } from '@/components/DesignSystemPreview';
import { useTheme } from '@/hooks/useTheme';
import { useDeviceDetect } from '@/hooks/useDeviceDetect';

// Lazy load heavy sections
const AboutSection = lazy(() => import('@/components/about/AboutSection'));
const ProjectsSection = lazy(() => import('@/components/projects/ProjectsSection'));
const ContactSection = lazy(() => import('@/components/contact/ContactSection'));

function SectionFallback() {
  return (
    <div className="flex items-center justify-center py-32">
      <motion.div
        className="h-8 w-8 rounded-full border-2 border-neon-cyan/30 border-t-neon-cyan"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

export default function App() {
  const { toggleTheme, isDark } = useTheme();
  const { deviceType, isLowPower } = useDeviceDetect();
  const [activeSection, setActiveSection] = useState('hero');
  const [showDesignSystem, setShowDesignSystem] = useState(() => {
    return typeof window !== 'undefined' && window.location.search.includes('design-system');
  });

  if (showDesignSystem) {
    return <DesignSystemPreview onClose={() => setShowDesignSystem(false)} />;
  }

  // Track active section for nav highlighting
  useEffect(() => {
    const sections = ['hero', 'about', 'projects', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500">
      {/* Cursor reactive glow — desktop only */}
      {deviceType === 'desktop' && !isLowPower && <CursorGlow enabled={true} />}

      {/* Navigation */}
      <Navigation
        isDark={isDark}
        onToggleTheme={toggleTheme}
        activeSection={activeSection}
      />

      {/* Main Content */}
      <main>
        <HeroSection />

        <Suspense fallback={<SectionFallback />}>
          <AboutSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <ProjectsSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <ContactSection />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
