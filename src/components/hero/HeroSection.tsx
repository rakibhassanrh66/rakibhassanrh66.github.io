import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowDown, FiDownload, FiMail, FiShield, FiTerminal, FiExternalLink } from 'react-icons/fi';
import { portfolioData } from '@/data/portfolio';
import { SystemTelemetrySpecimen } from '@/components/hero/SystemTelemetrySpecimen';

export const HeroSection: React.FC = () => {
  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <section
      id="hero"
      aria-label="Introduction & Systems Overview"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden border-b border-[var(--color-hairline)]"
    >
      {/* Subtle technical background grid */}
      <div className="absolute inset-0 technical-grid pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column (60%): Editorial Introduction & Action Hierarchy */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Operational Status Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--color-hairline-strong)] bg-[var(--color-surface-2)] text-[12px] font-mono text-[var(--color-ink-muted)]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{portfolioData.availability}</span>
          </div>

          {/* Master Display Headline */}
          <h1 className="type-display text-[var(--color-ink)] max-w-2xl">
            {portfolioData.role}
          </h1>

          {/* Narrative Thesis */}
          <p className="type-body text-[var(--color-ink-muted)] max-w-xl">
            {portfolioData.headline} {portfolioData.tagline}
          </p>

          {/* Standardized Action Button Matrix (44px fixed height) */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => scrollTo('projects')}
              className="btn-base btn-md btn-primary"
            >
              <span>Explore Case Studies</span>
              <FiArrowDown size={16} />
            </button>

            <a
              href={portfolioData.cvUrl}
              download="Rakib_Hassan_CV.pdf"
              className="btn-base btn-md btn-secondary"
            >
              <FiDownload size={16} />
              <span>Download CV (PDF)</span>
            </a>

            <button
              onClick={() => scrollTo('contact')}
              className="btn-base btn-md btn-ghost"
            >
              <FiMail size={16} />
              <span>Direct Inquiry</span>
            </button>
          </div>

          {/* Monospace System Telemetry Rail */}
          <div className="pt-6 border-t border-[var(--color-hairline)] grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono text-[var(--color-ink-faint)]">
            <div>
              <span className="block text-[10px] text-[var(--color-ink-muted)]">PGP_FINGERPRINT</span>
              <span className="truncate">{portfolioData.pgpKeyId}</span>
            </div>
            <div>
              <span className="block text-[10px] text-[var(--color-ink-muted)]">CORE_STACK</span>
              <span>LINUX // PYTHON // DART</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="block text-[10px] text-[var(--color-ink-muted)]">LOCATION_BASE</span>
              <span>DHAKA, BD [UTC+6]</span>
            </div>
          </div>
        </div>

        {/* Right Column (40%): Live Specimen Enclave & Visual Anchor */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-end space-y-6">
          <SystemTelemetrySpecimen />

          {/* Physical Verification Card (Profile + Status) */}
          <div className="w-full max-w-lg p-3 rounded-[var(--radius-md)] border border-[var(--color-hairline)] bg-[var(--color-surface-2)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/images/rakib.jpg"
                alt="Rakib Hassan"
                className="w-10 h-10 rounded-full object-cover border border-[var(--color-hairline-strong)]"
              />
              <div>
                <div className="text-xs font-semibold text-[var(--color-ink)]">
                  {portfolioData.name}
                </div>
                <div className="text-[11px] font-mono text-[var(--color-ink-faint)]">
                  B.Sc. CSE (Cyber Security) · Daffodil Univ
                </div>
              </div>
            </div>
            <a
              href="https://github.com/rakibhassanrh66"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors p-1"
              aria-label="GitHub Profile"
            >
              <FiExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
