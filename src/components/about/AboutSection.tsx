import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiServer, FiTool, FiCode, FiCpu, FiGlobe, FiBookOpen } from 'react-icons/fi';
import { portfolioData, skills, education, experience, languages, achievements, certifications } from '@/data/portfolio';
import { useDeviceDetect } from '@/hooks/useDeviceDetect';

const categoryIcons: Record<string, React.ReactNode> = {
  security: <FiShield className="h-4 w-4" />,
  backend: <FiServer className="h-4 w-4" />,
  tools: <FiTool className="h-4 w-4" />,
  programming: <FiCode className="h-4 w-4" />,
  ai: <FiCpu className="h-4 w-4" />,
  languages: <FiGlobe className="h-4 w-4" />,
};

const categoryLabels: Record<string, string> = {
  security: 'Security & Systems',
  backend: 'Backend & APIs',
  tools: 'Tools & Platforms',
  programming: 'Programming',
  ai: 'AI & Analytics',
  languages: 'Languages',
};

function SkillBar({ name, level, delay = 0 }: { name: string; level: number; delay?: number }) {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
    >
      <div className="mb-1 flex items-center justify-between">
        <span className="text-xs text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">{name}</span>
        <span className="text-[10px] text-[var(--text-muted)]">{level}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-[var(--input-bg)]">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-electric-purple"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.2, duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  const [activeCategory, setActiveCategory] = useState<string>('security');
  const { deviceType } = useDeviceDetect();
  const isMobile = deviceType === 'mobile';

  const categories = [...new Set(skills.map((s) => s.category))];
  const filteredSkills = skills.filter((s) => s.category === activeCategory);

  return (
    <section id="about" className="relative py-20 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block rounded-full border border-neon-cyan/20 bg-neon-cyan/5 px-4 py-1.5 text-xs font-medium tracking-wider text-neon-cyan uppercase">
            About
          </span>
          <h2 className="mt-4 text-3xl font-bold text-[var(--text-primary)] sm:text-4xl font-[Orbitron]">
            Security<span className="gradient-text"> Engineer</span>
          </h2>
        </motion.div>

        <div className={`grid gap-10 ${isMobile ? 'grid-cols-1' : 'grid-cols-5'}`}>
          {/* Profile Card */}
          <motion.div
            className={`glass-panel p-6 ${isMobile ? '' : 'col-span-2'}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-neon-cyan to-electric-purple text-lg font-bold text-white">
                RH
              </div>
              <div>
                <h3 className="font-semibold text-[var(--text-primary)]">{portfolioData.name}</h3>
                <p className="text-xs text-[var(--text-muted)]">{portfolioData.role}</p>
              </div>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-[var(--text-secondary)]">{portfolioData.aboutDetail}</p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Projects', value: '5+' },
                { label: 'Experience', value: '1+ yr' },
                { label: 'Certifications', value: '2+' },
                { label: 'Languages', value: '4' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-3 py-2.5 text-center"
                >
                  <div className="text-lg font-bold gradient-text">{stat.value}</div>
                  <div className="text-[10px] text-[var(--text-muted)]">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Skills Panel */}
          <motion.div
            className={`glass-panel p-6 ${isMobile ? '' : 'col-span-3'}`}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Category tabs */}
            <div className="mb-6 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                    activeCategory === cat
                      ? 'bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/30'
                      : 'bg-[var(--card-bg)] text-[var(--text-muted)] border border-[var(--card-border)] hover:text-[var(--text-primary)]'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {categoryIcons[cat]}
                  {categoryLabels[cat]}
                </motion.button>
              ))}
            </div>

            <div className="space-y-4">
              {filteredSkills.map((skill, i) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={i * 0.05} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Education & Experience */}
        <div className={`mt-10 grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
          {/* Education */}
          <motion.div
            className="glass-panel p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">
              <FiBookOpen className="text-neon-cyan" /> Education
            </h3>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <div key={i} className="border-l-2 border-neon-cyan/20 pl-4">
                  <p className="text-sm font-medium text-[var(--text-primary)]">{edu.degree}</p>
                  <p className="text-xs text-[var(--text-muted)]">{edu.institution}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-[10px] text-[var(--text-muted)]">{edu.period}</span>
                    {edu.grade && (
                      <span className="rounded-full bg-neon-cyan/10 px-2 py-0.5 text-[10px] text-neon-cyan">
                        {edu.grade}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Experience & Certifications */}
          <motion.div
            className="glass-panel p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">
              <FiShield className="text-neon-cyan" /> Experience & Recognition
            </h3>
            <div className="space-y-4">
              {experience.map((exp, i) => (
                <div key={i} className="border-l-2 border-electric-purple/20 pl-4">
                  <p className="text-sm font-medium text-[var(--text-primary)]">{exp.role}</p>
                  <p className="text-xs text-[var(--text-muted)]">{exp.company} — {exp.location}</p>
                  <span className="text-[10px] text-[var(--text-muted)]">{exp.period}</span>
                </div>
              ))}
              {certifications.map((cert, i) => (
                <div key={i} className="border-l-2 border-neon-cyan/20 pl-4">
                  <p className="text-sm font-medium text-[var(--text-secondary)]">{cert.title}</p>
                  <p className="text-xs text-[var(--text-muted)]">{cert.description}</p>
                </div>
              ))}
              {/* Languages */}
              <div className="border-l-2 border-electric-purple/20 pl-4">
                <p className="text-sm font-medium text-[var(--text-secondary)] mb-1">Languages</p>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <span
                      key={lang.name}
                      className="rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] px-2 py-0.5 text-[10px] text-[var(--text-muted)]"
                    >
                      {lang.name}: {lang.level}
                    </span>
                  ))}
                </div>
              </div>
              {/* Achievements */}
              <div className="border-l-2 border-neon-cyan/20 pl-4">
                <p className="text-sm font-medium text-[var(--text-secondary)] mb-1">Achievements</p>
                <ul className="space-y-1">
                  {achievements.map((a, i) => (
                    <li key={i} className="text-xs text-[var(--text-muted)]">• {a}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
