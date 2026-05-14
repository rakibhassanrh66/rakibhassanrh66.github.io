import { motion } from 'framer-motion';
import { FiHeart } from 'react-icons/fi';
import SocialLinks from '@/components/ui/SocialLinks';
import { portfolioData } from '@/data/portfolio';

const footerLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[var(--divider)] py-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Logo */}
          <motion.a
            href="#hero"
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-neon-cyan to-electric-purple">
              <span className="text-xs font-bold text-white font-[Orbitron]">RH</span>
            </div>
            <span className="text-sm font-semibold text-[var(--text-secondary)] font-[Orbitron] tracking-wider">
              RAKIB<span className="text-neon-cyan">.dev</span>
            </span>
          </motion.a>

          {/* Nav Links */}
          <div className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-xs text-[var(--text-muted)] transition-colors hover:text-neon-cyan"
                whileHover={{ y: -1 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* Social */}
          <SocialLinks iconSize="sm" />
        </div>

        <div className="mt-8 flex flex-col items-center gap-2 border-t border-[var(--divider)] pt-6 sm:flex-row sm:justify-between">
          <p className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
            &copy; {year} {portfolioData.name}.
            Generis occidio.
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            Dhaka, Bangladesh &bull;
          </p>
        </div>
      </div>
    </footer>
  );
}
