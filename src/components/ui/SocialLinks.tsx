import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { socialLinks } from '@/data/portfolio';

const iconMap: Record<string, React.ReactNode> = {
  github: <FiGithub className="h-5 w-5" />,
  linkedin: <FiLinkedin className="h-5 w-5" />,
  email: <FiMail className="h-5 w-5" />,
};

interface SocialLinksProps {
  className?: string;
  iconSize?: 'sm' | 'md' | 'lg';
}

export default function SocialLinks({ className = '', iconSize = 'md' }: SocialLinksProps) {
  const sizeClass = iconSize === 'lg' ? 'h-12 w-12' : iconSize === 'sm' ? 'h-8 w-8' : 'h-10 w-10';
  const iconSizes = iconSize === 'lg' ? 'h-6 w-6' : iconSize === 'sm' ? 'h-4 w-4' : 'h-5 w-5';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socialLinks.map((link) => (
        <motion.a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${sizeClass} flex items-center justify-center rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-md text-[var(--text-secondary)] transition-colors hover:border-neon-cyan/50 hover:text-neon-cyan`}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          aria-label={link.name}
        >
          <span className={iconSizes}>{iconMap[link.icon] || <FiMail className={iconSizes} />}</span>
        </motion.a>
      ))}
    </div>
  );
}
