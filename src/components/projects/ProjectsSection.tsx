import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiShield,
  FiTerminal,
  FiExternalLink,
  FiCopy,
  FiCheck,
  FiChevronDown,
  FiChevronUp,
  FiCode,
  FiCpu,
  FiLayers,
} from 'react-icons/fi';
import { projects, type Project } from '@/data/portfolio';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedThreat, setExpandedThreat] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Verified Systems' },
    { id: 'security', label: 'Offensive Security' },
    { id: 'systems', label: 'Systems & Architecture' },
    { id: 'ai', label: 'Applied AI' },
    { id: 'research', label: 'Research' },
  ];

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  function toggleThreat(id: string) {
    setExpandedThreat((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function copyClone(url: string, id: string) {
    navigator.clipboard.writeText(`git clone ${url}.git`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <section
      id="projects"
      aria-label="Engineering Projects & Case Studies"
      className="py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[var(--color-hairline)]"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[var(--color-hairline)]">
          <div className="space-y-2">
            <div className="telemetry-chip">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
              <span>SYSTEMS_INDEX // 05 REPOSITORIES</span>
            </div>
            <h2 className="type-h1 text-[var(--color-ink)]">
              Selected Systems & Case Studies
            </h2>
            <p className="type-body text-[var(--color-ink-muted)] max-w-xl">
              Concrete architectural implementations. Every project is verified against real GitHub source code, security threat models, and operational constraints.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`btn-base btn-sm rounded-full text-xs font-mono transition-colors ${
                    isSelected
                      ? 'bg-[var(--color-ink)] text-[var(--color-canvas)] font-semibold'
                      : 'bg-[var(--color-surface-2)] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] border border-[var(--color-hairline)]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Case Studies List (Asymmetric Split-Pane Architecture) */}
        <div className="space-y-8">
          {filteredProjects.map((project, index) => {
            const isThreatOpen = expandedThreat[project.id];
            const isCopied = copiedId === project.id;
            const indexStr = String(index + 1).padStart(2, '0');

            return (
              <article
                key={project.id}
                className="panel-surface p-6 sm:p-8 rounded-[var(--radius-lg)] hover:border-[var(--color-hairline-strong)] transition-all space-y-6"
              >
                {/* Case Study Meta Topbar */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--color-hairline)] text-xs font-mono text-[var(--color-ink-faint)]">
                  <div className="flex items-center gap-3">
                    <span className="text-[var(--color-accent)] font-semibold">
                      // {indexStr}. SPECIMEN
                    </span>
                    <span className="text-[var(--color-hairline-strong)]">|</span>
                    <span className="uppercase text-[var(--color-ink-muted)]">
                      {project.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {project.featured && (
                      <span className="px-2 py-0.5 rounded bg-[var(--color-accent-subtle)] text-[var(--color-accent)] text-[11px] font-semibold border border-[var(--color-accent)]/20">
                        FEATURED SYSTEM
                      </span>
                    )}
                    <span className="text-[11px] text-[var(--color-ink-faint)]">
                      SHA-256 VERIFIED
                    </span>
                  </div>
                </div>

                {/* Asymmetric Split Layout: Left Narrative (65%) / Right Spec Rail (35%) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Narrative & Threat Model */}
                  <div className="lg:col-span-8 space-y-4">
                    <div>
                      <h3 className="type-h2 text-[var(--color-ink)]">
                        {project.title}
                      </h3>
                      <div className="text-sm font-mono text-[var(--color-accent)] mt-0.5">
                        {project.tagline}
                      </div>
                    </div>

                    <p className="type-body text-[var(--color-ink-muted)]">
                      {project.longDescription}
                    </p>

                    {/* Architectural Overview Box */}
                    <div className="p-4 rounded-[var(--radius-md)] bg-[var(--color-surface-2)] border border-[var(--color-hairline)] text-xs font-mono space-y-1">
                      <div className="text-[10px] text-[var(--color-ink-faint)] uppercase tracking-wider">
                        // ARCHITECTURAL OVERVIEW
                      </div>
                      <p className="text-[var(--color-ink)] leading-relaxed font-sans text-xs">
                        {project.architectureOverview}
                      </p>
                    </div>

                    {/* Expandable Threat Model Drawer */}
                    {project.threatModelNotes && (
                      <div className="border border-[var(--color-hairline)] rounded-[var(--radius-md)] overflow-hidden">
                        <button
                          onClick={() => toggleThreat(project.id)}
                          className="w-full px-4 py-2.5 bg-[var(--color-surface-2)] text-left flex items-center justify-between text-xs font-mono text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <FiShield className="text-[var(--color-accent)]" size={13} />
                            <span>SECURITY & THREAT MODEL NOTES</span>
                          </span>
                          {isThreatOpen ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
                        </button>

                        <AnimatePresence>
                          {isThreatOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="px-4 py-3 bg-[var(--color-canvas)] text-xs text-[var(--color-ink-muted)] border-t border-[var(--color-hairline)] font-mono leading-relaxed"
                            >
                              {project.threatModelNotes}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Spec Rail & Verified Actions (35%) */}
                  <div className="lg:col-span-4 space-y-5 lg:border-l lg:border-[var(--color-hairline)] lg:pl-8">
                    {/* Key Metrics / Verified Stats */}
                    {project.stats && (
                      <div className="space-y-3">
                        <div className="text-[11px] font-mono text-[var(--color-ink-faint)] uppercase tracking-wider">
                          // SPECIFICATIONS
                        </div>
                        <div className="space-y-2">
                          {project.stats.map((stat) => (
                            <div
                              key={stat.label}
                              className="flex items-center justify-between text-xs font-mono py-1 border-b border-[var(--color-hairline)]"
                            >
                              <span className="text-[var(--color-ink-faint)]">{stat.label}</span>
                              <span className="text-[var(--color-ink)] font-semibold text-right">
                                {stat.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tech Stack Chips */}
                    <div className="space-y-2">
                      <div className="text-[11px] font-mono text-[var(--color-ink-faint)] uppercase tracking-wider">
                        // TECH STACK
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-[var(--radius-sm)] bg-[var(--color-surface-2)] border border-[var(--color-hairline)] text-[11px] font-mono text-[var(--color-ink-muted)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Triggers */}
                    <div className="pt-2 space-y-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-base btn-md btn-secondary w-full justify-between"
                      >
                        <span className="flex items-center gap-2">
                          <FiCode size={15} />
                          <span>View Source Code</span>
                        </span>
                        <FiExternalLink size={14} className="text-[var(--color-ink-faint)]" />
                      </a>

                      <button
                        onClick={() => copyClone(project.githubUrl, project.id)}
                        className="btn-base btn-sm btn-ghost w-full justify-center text-xs font-mono"
                      >
                        {isCopied ? (
                          <>
                            <FiCheck size={13} className="text-emerald-500 mr-1.5" />
                            <span className="text-emerald-500">git clone command copied</span>
                          </>
                        ) : (
                          <>
                            <FiCopy size={13} className="mr-1.5" />
                            <span>Copy git clone command</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
