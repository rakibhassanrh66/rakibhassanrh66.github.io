import { motion } from 'framer-motion';
import { FiDownload } from 'react-icons/fi';
import { portfolioData } from '@/data/portfolio';

interface CVDownloadProps {
  variant?: 'button' | 'inline';
  className?: string;
}

export default function CVDownload({ variant = 'button', className = '' }: CVDownloadProps) {

  const handleDownload = async () => {
    const fileUrl = '/Rakib_Hassan_CV.pdf';

    try {
      const response = await fetch(fileUrl);
      if (!response.ok) throw new Error('File not found');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'Rakib_Hassan_CV.pdf';
      a.style.display = 'none';

      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  if (variant === 'inline') {
    return (
      <motion.button
        onClick={handleDownload}
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-neon-cyan transition-colors hover:text-[var(--text-primary)] ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Download CV"
      >
        <FiDownload className="h-3 w-3" />
        CV
      </motion.button>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <motion.button
        onClick={handleDownload}
        className="group flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-6 py-3 text-sm font-medium text-neon-cyan transition-all hover:bg-neon-cyan/20 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        aria-label="Download CV"
      >
        <FiDownload className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
        Download CV
      </motion.button>

      <motion.a
        href={`mailto:${portfolioData.email}`}
        className="rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] px-6 py-3 text-sm font-medium text-[var(--text-secondary)] backdrop-blur-md transition-all hover:border-electric-purple/50 hover:text-[var(--text-primary)]"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        Hire Me
      </motion.a>
    </div>
  );
}