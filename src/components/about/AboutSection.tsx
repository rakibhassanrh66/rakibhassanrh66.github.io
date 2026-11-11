import React from 'react';
import {
  FiShield,
  FiTerminal,
  FiCheckCircle,
  FiAward,
  FiCalendar,
  FiMapPin,
  FiGlobe,
  FiBookOpen,
} from 'react-icons/fi';
import {
  portfolioData,
  skillGroups,
  experience,
  education,
  certifications,
  achievements,
  languages,
} from '@/data/portfolio';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      aria-label="Technical Matrix, Experience & Credentials"
      className="scroll-mt-20 py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[var(--color-hairline)]"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-3 pb-6 border-b border-[var(--color-hairline)]">
          <div className="telemetry-chip">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
            <span>OPERATIONAL_BACKGROUND // PROFILE & MATRIX</span>
          </div>
          <h2 className="type-h1 text-[var(--color-ink)]">
            Technical Architecture & Credentials
          </h2>
          <p className="type-body text-[var(--color-ink-muted)] max-w-2xl">
            {portfolioData.summary}
          </p>
        </div>

        {/* 1. Technical Capability Matrix (Categorized Taxonomy) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="type-h2 text-[var(--color-ink)]">
              1. Systems & Security Matrix
            </h3>
            <span className="text-xs font-mono text-[var(--color-ink-faint)]">
              CLASSIFIED TAXONOMY
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skillGroups.map((group) => (
              <div
                key={group.category}
                className="panel-surface p-6 rounded-[var(--radius-lg)] space-y-4 hover:border-[var(--color-hairline-strong)] transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[var(--color-accent)] uppercase">
                    <FiShield size={14} />
                    <span>{group.category}</span>
                  </div>
                  <p className="text-xs text-[var(--color-ink-muted)] font-mono leading-relaxed">
                    {group.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-4 border-t border-[var(--color-hairline)]">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between py-1 text-xs font-mono text-[var(--color-ink)]"
                    >
                      <span className="truncate pr-2">{skill.name}</span>
                      <span className="text-[10px] text-[var(--color-ink-faint)] px-1.5 py-0.5 rounded bg-[var(--color-surface-2)] shrink-0">
                        {skill.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Professional Experience & Academic Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-6 border-t border-[var(--color-hairline)]">
          {/* Left: Professional Work History */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--color-hairline)]">
              <h3 className="type-h2 text-[var(--color-ink)] flex items-center gap-2">
                <FiTerminal size={18} className="text-[var(--color-accent)]" />
                <span>Professional Experience</span>
              </h3>
              <span className="text-xs font-mono text-[var(--color-ink-faint)]">
                INDUSTRY
              </span>
            </div>

            <div className="space-y-6">
              {experience.map((item) => (
                <div
                  key={item.role + item.organization}
                  className="panel-surface p-6 rounded-[var(--radius-lg)] space-y-3"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="text-sm font-semibold text-[var(--color-ink)]">
                      {item.role}
                    </h4>
                    <span className="text-xs font-mono text-[var(--color-accent)] font-semibold">
                      {item.period}
                    </span>
                  </div>

                  <div className="text-xs font-mono text-[var(--color-ink-muted)] flex items-center gap-3">
                    <span>{item.organization}</span>
                    <span>•</span>
                    <span className="text-[var(--color-ink-faint)]">{item.location}</span>
                  </div>

                  <ul className="space-y-1.5 text-xs text-[var(--color-ink-muted)] pt-2 border-t border-[var(--color-hairline)]">
                    {item.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[var(--color-accent)] select-none">›</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Academic Foundation */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--color-hairline)]">
              <h3 className="type-h2 text-[var(--color-ink)] flex items-center gap-2">
                <FiBookOpen size={18} className="text-[var(--color-accent)]" />
                <span>Academic Record</span>
              </h3>
              <span className="text-xs font-mono text-[var(--color-ink-faint)]">
                EDUCATION
              </span>
            </div>

            <div className="space-y-6">
              {education.map((item) => (
                <div
                  key={item.degree}
                  className="panel-surface p-6 rounded-[var(--radius-lg)] space-y-3"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="text-sm font-semibold text-[var(--color-ink)]">
                      {item.degree}
                    </h4>
                    <span className="text-xs font-mono text-[var(--color-accent)] font-semibold">
                      {item.period}
                    </span>
                  </div>

                  <div className="text-xs font-mono text-[var(--color-ink-muted)] flex items-center gap-3">
                    <span>{item.institution}</span>
                    <span>•</span>
                    <span className="text-emerald-500 font-semibold">{item.grade}</span>
                  </div>

                  <ul className="space-y-1 text-xs text-[var(--color-ink-muted)] pt-2 border-t border-[var(--color-hairline)]">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[var(--color-accent)] select-none">›</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Verified Certifications & Personal Milestones */}
        <div className="pt-6 border-t border-[var(--color-hairline)] space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="type-h2 text-[var(--color-ink)]">
              3. Verified Credentials & Milestones
            </h3>
            <span className="text-xs font-mono text-[var(--color-ink-faint)]">
              VERIFICATIONS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.title}
                className="panel-surface p-5 rounded-[var(--radius-lg)] flex items-start gap-3.5"
              >
                <div className="w-8 h-8 rounded-full bg-[var(--color-surface-2)] border border-[var(--color-hairline-strong)] flex items-center justify-center text-[var(--color-accent)] shrink-0 mt-0.5">
                  <FiAward size={15} />
                </div>
                <div className="space-y-1 text-left">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="text-xs font-semibold text-[var(--color-ink)]">
                      {cert.title}
                    </h4>
                    <span className="text-[11px] font-mono text-[var(--color-ink-faint)] shrink-0">
                      {cert.issued}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-[var(--color-accent)]">
                    {cert.issuer}
                  </div>
                  <p className="text-xs text-[var(--color-ink-muted)] leading-relaxed">
                    {cert.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Personal Milestones / Endurance Accomplishments */}
          <div className="panel-surface p-6 rounded-[var(--radius-lg)] space-y-3 mt-6">
            <div className="text-xs font-mono font-semibold text-[var(--color-accent)] uppercase">
              // ENDURANCE & COMMUNITY RECORD
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {achievements.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-[var(--color-ink)] font-mono">
                  <FiCheckCircle size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
