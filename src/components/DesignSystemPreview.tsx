import React from 'react';
import { FiDownload, FiArrowRight, FiTerminal, FiShield, FiCode } from 'react-icons/fi';

interface DesignSystemPreviewProps {
  onClose?: () => void;
}

export const DesignSystemPreview: React.FC<DesignSystemPreviewProps> = ({ onClose }) => {
  return (
    <div className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-ink)] p-8 md:p-16 max-w-6xl mx-auto space-y-16">
      {/* Header */}
      <div className="border-b border-[var(--color-hairline)] pb-6 flex items-center justify-between">
        <div>
          <span className="telemetry-chip mb-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
            DESIGN SYSTEM v2.0 // SPECIFICATION PREVIEW
          </span>
          <h1 className="type-h1 mt-2">Design Tokens & Component Gallery</h1>
          <p className="type-body text-[var(--color-ink-muted)] mt-1">
            Standardized token implementation conforming to <code className="font-mono text-sm">/DESIGN.md</code>.
          </p>
        </div>
        {onClose && (
          <button onClick={onClose} className="btn-base btn-sm btn-secondary">
            Close Preview
          </button>
        )}
      </div>

      {/* 1. Color Palette */}
      <section className="space-y-4">
        <h2 className="type-h2">1. Color Tokens & Surface Hierarchy</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-[var(--radius-md)] bg-[var(--color-canvas)] border border-[var(--color-hairline)]">
            <span className="text-xs font-mono text-[var(--color-ink-faint)]">Canvas</span>
            <div className="text-sm font-semibold mt-1">var(--color-canvas)</div>
          </div>
          <div className="p-4 rounded-[var(--radius-md)] bg-[var(--color-surface-1)] border border-[var(--color-hairline)]">
            <span className="text-xs font-mono text-[var(--color-ink-faint)]">Surface 1</span>
            <div className="text-sm font-semibold mt-1">var(--color-surface-1)</div>
          </div>
          <div className="p-4 rounded-[var(--radius-md)] bg-[var(--color-surface-2)] border border-[var(--color-hairline)]">
            <span className="text-xs font-mono text-[var(--color-ink-faint)]">Surface 2</span>
            <div className="text-sm font-semibold mt-1">var(--color-surface-2)</div>
          </div>
          <div className="p-4 rounded-[var(--radius-md)] bg-[var(--color-surface-3)] border border-[var(--color-hairline)]">
            <span className="text-xs font-mono text-[var(--color-ink-faint)]">Surface 3</span>
            <div className="text-sm font-semibold mt-1">var(--color-surface-3)</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-[var(--radius-md)] bg-[var(--color-surface-1)] border border-[var(--color-accent)]">
            <span className="text-xs font-mono text-[var(--color-accent)]">Single Chromatic Accent</span>
            <div className="text-sm font-semibold text-[var(--color-accent)] mt-1">var(--color-accent)</div>
          </div>
          <div className="p-4 rounded-[var(--radius-md)] bg-[var(--color-surface-1)] border border-[var(--color-hairline-strong)]">
            <span className="text-xs font-mono text-[var(--color-ink-faint)]">Hairline Strong</span>
            <div className="text-sm font-semibold text-[var(--color-ink)] mt-1">var(--color-hairline-strong)</div>
          </div>
          <div className="p-4 rounded-[var(--radius-md)] bg-[var(--color-surface-1)] border border-[var(--color-hairline)]">
            <span className="text-xs font-mono text-[var(--color-ink-faint)]">Hairline Subtle</span>
            <div className="text-sm font-semibold text-[var(--color-ink-muted)] mt-1">var(--color-hairline)</div>
          </div>
        </div>
      </section>

      {/* 2. Standardized Buttons: 3 Sizes x 3 Variants */}
      <section className="space-y-6">
        <div>
          <h2 className="type-h2">2. Standardized Button Matrix</h2>
          <p className="type-body text-[var(--color-ink-muted)] text-sm mt-1">
            Strict heights: Small (36px), Medium (44px), Large (52px). Uniform padding and radius per size.
          </p>
        </div>

        <div className="panel-surface p-6 space-y-6">
          {/* Large Buttons: 52px */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-[var(--color-ink-faint)]">SIZE: LARGE — 52px (btn-lg)</div>
            <div className="flex flex-wrap items-center gap-4">
              <button id="btn-lg-primary" className="btn-base btn-lg btn-primary">
                <FiDownload size={18} />
                <span>Download CV (52px)</span>
              </button>
              <button id="btn-lg-secondary" className="btn-base btn-lg btn-secondary">
                <span>View Case Studies (52px)</span>
                <FiArrowRight size={18} />
              </button>
              <button id="btn-lg-ghost" className="btn-base btn-lg btn-ghost">
                <span>Contact Inquiry (52px)</span>
              </button>
            </div>
          </div>

          <div className="border-t border-[var(--color-hairline)]" />

          {/* Medium Buttons: 44px */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-[var(--color-ink-faint)]">SIZE: MEDIUM — 44px (btn-md)</div>
            <div className="flex flex-wrap items-center gap-4">
              <button id="btn-md-primary" className="btn-base btn-md btn-primary">
                <FiShield size={16} />
                <span>Security Audit (44px)</span>
              </button>
              <button id="btn-md-secondary" className="btn-base btn-md btn-secondary">
                <span>Explore Source (44px)</span>
                <FiCode size={16} />
              </button>
              <button id="btn-md-ghost" className="btn-base btn-md btn-ghost">
                <span>Schedule Call (44px)</span>
              </button>
            </div>
          </div>

          <div className="border-t border-[var(--color-hairline)]" />

          {/* Small Buttons: 36px */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-[var(--color-ink-faint)]">SIZE: SMALL — 36px (btn-sm)</div>
            <div className="flex flex-wrap items-center gap-4">
              <button id="btn-sm-primary" className="btn-base btn-sm btn-primary">
                <span>Filter (36px)</span>
              </button>
              <button id="btn-sm-secondary" className="btn-base btn-sm btn-secondary">
                <FiTerminal size={14} />
                <span>CLI Copy (36px)</span>
              </button>
              <button id="btn-sm-ghost" className="btn-base btn-sm btn-ghost">
                <span>Dismiss (36px)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Fluid Typography */}
      <section className="space-y-4">
        <h2 className="type-h2">3. Fluid Typography Hierarchy</h2>
        <div className="panel-surface p-6 space-y-4">
          <div>
            <div className="text-xs font-mono text-[var(--color-ink-faint)]">type-display (clamp 36px – 60px)</div>
            <div className="type-display">Cybersecurity Engineer & Systems Architect</div>
          </div>
          <div className="border-t border-[var(--color-hairline)] pt-4">
            <div className="text-xs font-mono text-[var(--color-ink-faint)]">type-h1 (clamp 28px – 40px)</div>
            <div className="type-h1">Selected Engineering Systems & Research</div>
          </div>
          <div className="border-t border-[var(--color-hairline)] pt-4">
            <div className="text-xs font-mono text-[var(--color-ink-faint)]">type-h2 (clamp 20px – 26px)</div>
            <div className="type-h2">AccessX: Cyber Recon & Simulation Architecture</div>
          </div>
          <div className="border-t border-[var(--color-hairline)] pt-4">
            <div className="text-xs font-mono text-[var(--color-ink-faint)]">type-body (clamp 16px – 17px, 1.65 line-height)</div>
            <p className="type-body text-[var(--color-ink-muted)] max-w-2xl">
              Engineering high-resilience backend architectures, automated threat modeling, and kernel-level Linux instrumentation. Specializing in applied cryptography, offensive security tooling, and verified cloud infrastructure.
            </p>
          </div>
          <div className="border-t border-[var(--color-hairline)] pt-4">
            <div className="text-xs font-mono text-[var(--color-ink-faint)]">type-caption (clamp 13px – 14px, monospace)</div>
            <div className="type-caption font-mono text-[var(--color-ink-faint)]">
              PGP: 4A8F 9C21 88E0 11B4 · DHAKA, BD [UTC+6] · ARCH LINUX 6.12-LTS
            </div>
          </div>
        </div>
      </section>

      {/* 4. Telemetry Chips & Radius Scale */}
      <section className="space-y-4">
        <h2 className="type-h2">4. Technical Chips & Badges</h2>
        <div className="flex flex-wrap gap-3">
          <span className="telemetry-chip">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
            LIVE TELEMETRY
          </span>
          <span className="telemetry-chip">
            CVE-2024-XXXX MITIGATED
          </span>
          <span className="telemetry-chip">
            DART / FLUTTER ENGINE
          </span>
          <span className="telemetry-chip">
            YOLOV8 INFERENCE: 14MS
          </span>
          <span className="telemetry-chip">
            SHA-256 VERIFIED
          </span>
        </div>
      </section>
    </div>
  );
};
