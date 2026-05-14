import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiX, FiShield, FiServer, FiCpu } from 'react-icons/fi';
import { projects, type Project } from '@/data/portfolio';
import { useDeviceDetect } from '@/hooks/useDeviceDetect';

const categoryIcons: Record<string, React.ReactNode> = {
  security: <FiShield className="h-3.5 w-3.5" />,
  ai: <FiCpu className="h-3.5 w-3.5" />,
  backend: <FiServer className="h-3.5 w-3.5" />,
  research: <FiCpu className="h-3.5 w-3.5" />,
};

const categoryColors: Record<string, string> = {
  security: 'text-red-400 border-red-400/20 bg-red-400/5',
  ai: 'text-green-400 border-green-400/20 bg-green-400/5',
  backend: 'text-blue-400 border-blue-400/20 bg-blue-400/5',
  research: 'text-purple-400 border-purple-400/20 bg-purple-400/5',
};

function ProjectCard({ project, onTap }: { project: Project; onTap: () => void }) {
  const { deviceType } = useDeviceDetect();
  const isMobile = deviceType === 'mobile';

  return (
    <motion.div
      className="group relative cursor-pointer"
      whileHover={isMobile ? {} : { scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onTap}
      layout
    >
      <div className="glass-panel overflow-hidden p-6 transition-all duration-300 group-hover:border-neon-cyan/20 group-hover:shadow-[0_0_30px_rgba(0,240,255,0.05)]">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-[16px] bg-gradient-to-br from-neon-cyan/5 via-transparent to-electric-purple/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative z-10">
          {/* Category Badge */}
          <div className="mb-3">
            <span
              className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase ${categoryColors[project.category]}`}
            >
              {categoryIcons[project.category]}
              {project.category}
            </span>
          </div>

          <h3 className="mb-2 text-lg font-semibold text-[var(--text-primary)] group-hover:gradient-text transition-all">
            {project.title}
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-[var(--text-muted)]">{project.description}</p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-[var(--card-border)] bg-[var(--card-bg)] px-2 py-0.5 text-[10px] text-[var(--text-muted)]"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Link indicator */}
          {project.links && project.links.length > 0 && (
            <div className="mt-4 flex items-center gap-1 text-xs text-neon-cyan/60">
              <FiExternalLink className="h-3 w-3" />
              <span>View Project</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="fixed inset-0 bg-[var(--modal-overlay)] backdrop-blur-md" onClick={onClose} />
      <motion.div
        className="relative z-10 w-full max-w-lg rounded-2xl border border-[var(--card-border)] bg-[var(--modal-bg)] p-6 shadow-2xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-[var(--text-muted)] transition-colors hover:bg-[var(--card-bg)] hover:text-[var(--text-primary)]"
        >
          <FiX className="h-5 w-5" />
        </button>

        <span
          className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase ${categoryColors[project.category]}`}
        >
          {categoryIcons[project.category]}
          {project.category}
        </span>

        <h2 className="mt-3 text-2xl font-bold text-[var(--text-primary)]">{project.title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">{project.longDescription}</p>

        <div className="mt-4">
          <p className="mb-2 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">Tech Stack</p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] px-3 py-1 text-xs text-[var(--text-secondary)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {project.links && project.links.length > 0 && (
          <div className="mt-6 flex gap-3">
            {project.links.map((link, i) => (
              <motion.a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-neon-cyan/10 px-4 py-2 text-sm text-neon-cyan transition-colors hover:bg-neon-cyan/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiExternalLink className="h-4 w-4" />
                {link.label}
              </motion.a>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { deviceType } = useDeviceDetect();
  const isMobile = deviceType === 'mobile';

  return (
    <section id="projects" className="relative py-20 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block rounded-full border border-electric-purple/20 bg-electric-purple/5 px-4 py-1.5 text-xs font-medium tracking-wider text-electric-purple uppercase">
            Portfolio
          </span>
          <h2 className="mt-4 text-3xl font-bold text-[var(--text-primary)] sm:text-4xl font-[Orbitron]">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="mt-3 text-sm text-[var(--text-muted)] max-w-lg mx-auto">
            {isMobile ? 'Tap cards to explore details' : 'Hover over cards to see details — click to expand'}
          </p>
        </motion.div>

        {/* Project Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <ProjectCard project={project} onTap={() => setSelectedProject(project)} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
