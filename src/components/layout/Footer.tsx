import React, { useState, useEffect } from 'react';
import { FiArrowUp, FiExternalLink, FiShield, FiClock, FiTerminal } from 'react-icons/fi';
import { portfolioData, socialLinks } from '@/data/portfolio';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [dhakaTime, setDhakaTime] = useState<string>('');

  useEffect(() => {
    function updateClock() {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now);
      setDhakaTime(formatted);
    }

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer
      aria-label="Colophon & Site Specifications"
      className="border-t border-[var(--color-hairline)] bg-[var(--color-surface-1)] text-[var(--color-ink)] pt-16 pb-12 px-4 sm:px-6 md:px-8 lg:px-12"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Architectural 4-Column Directory */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 text-xs font-mono">
          {/* Col 1: Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[var(--color-surface-2)] border border-[var(--color-hairline-strong)] flex items-center justify-center font-bold text-xs">
                {portfolioData.monogram}
              </span>
              <span className="text-sm font-semibold tracking-tight text-[var(--color-ink)] font-sans">
                {portfolioData.name}
              </span>
            </div>
            <p className="text-xs text-[var(--color-ink-muted)] leading-relaxed font-sans max-w-sm">
              Cybersecurity Engineer & Systems Architect based in Dhaka, Bangladesh. Specializing in offensive testing, Linux server administration, and verified software infrastructure.
            </p>
            <div className="inline-flex items-center gap-2 text-[11px] text-[var(--color-ink-faint)]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{portfolioData.availability}</span>
            </div>
          </div>

          {/* Col 2: System Specifications (3 cols) */}
          <div className="lg:col-span-3 space-y-2">
            <span className="text-[11px] text-[var(--color-accent)] font-semibold uppercase">
              // SYSTEM SPECIFICATIONS
            </span>
            <div className="space-y-1.5 text-[var(--color-ink-muted)] pt-1">
              <div>HOST: arch-linux-x86_64</div>
              <div>KERNEL: 6.12-LTS hardened</div>
              <div>STANDARD: STRIDE // ASVS v4</div>
              <div>PGP: {portfolioData.pgpKeyId}</div>
            </div>
          </div>

          {/* Col 3: Navigation Index (2 cols) */}
          <div className="lg:col-span-2 space-y-2">
            <span className="text-[11px] text-[var(--color-accent)] font-semibold uppercase">
              // INDEX
            </span>
            <div className="flex flex-col space-y-1 pt-1 text-[var(--color-ink-muted)]">
              <a href="#hero" className="hover:text-[var(--color-ink)] transition-colors">
                01. Overview
              </a>
              <a href="#projects" className="hover:text-[var(--color-ink)] transition-colors">
                02. Projects
              </a>
              <a href="#about" className="hover:text-[var(--color-ink)] transition-colors">
                03. Matrix & Stack
              </a>
              <a href="#contact" className="hover:text-[var(--color-ink)] transition-colors">
                04. Contact
              </a>
            </div>
          </div>

          {/* Col 4: Network Channels & Live Telemetry (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-[11px] text-[var(--color-accent)] font-semibold uppercase">
              // NETWORK CHANNELS
            </span>
            <div className="flex flex-col space-y-1 pt-1 text-[var(--color-ink-muted)]">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between hover:text-[var(--color-ink)] transition-colors py-0.5"
                >
                  <span>{s.name}</span>
                  <span className="text-[var(--color-ink-faint)] flex items-center gap-1">
                    <span>{s.handle}</span>
                    <FiExternalLink size={11} />
                  </span>
                </a>
              ))}
            </div>

            {/* Live Dhaka Clock */}
            <div className="pt-2 border-t border-[var(--color-hairline)] flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1 text-[var(--color-ink-faint)]">
                <FiClock size={12} />
                <span>DHAKA_TIME [UTC+6]:</span>
              </span>
              <span className="font-semibold text-[var(--color-ink)]">
                {dhakaTime || '18:00:00'}
              </span>
            </div>
          </div>
        </div>

        {/* Monumental Subdued Sign-Off Wordmark */}
        <div className="pt-8 border-t border-[var(--color-hairline)] select-none">
          <div className="text-[clamp(2.5rem,8vw,7rem)] font-extrabold tracking-tighter text-[var(--color-hairline-strong)]/40 leading-none text-center sm:text-left">
            RAKIB HASSAN
          </div>
        </div>

        {/* Baseline Metadata & Back-to-Top */}
        <div className="pt-6 border-t border-[var(--color-hairline)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--color-ink-faint)]">
          <div>
            &copy; {currentYear} {portfolioData.name}. All verified engineering rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span>BUILT WITH REACT 19 & VITE</span>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="hover:text-[var(--color-ink)] transition-colors flex items-center gap-1 font-semibold"
            >
              <span>BACK TO TOP</span>
              <FiArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
