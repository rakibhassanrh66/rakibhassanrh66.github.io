import { motion } from 'framer-motion';
import { FiClock, FiMapPin } from 'react-icons/fi';
import { useTimeZone } from '@/hooks/useTimeZone';

export default function TimeZone() {
  const tz = useTimeZone();

  return (
    <motion.div
      className="flex items-center gap-4 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-3 text-xs backdrop-blur-md"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex items-center gap-1.5 text-[var(--text-muted)]">
        <FiMapPin className="h-3 w-3 text-neon-cyan" />
        <span>{tz.visitorRegion}</span>
        <span className="text-[var(--text-muted)]">•</span>
        <FiClock className="h-3 w-3 text-neon-cyan" />
        <span className="text-[var(--text-secondary)]">{tz.visitorTime}</span>
      </div>
      <div className="h-3 w-px bg-[var(--divider)]" />
      <div className="flex items-center gap-1.5 text-[var(--text-muted)]">
        <span>Dhaka</span>
        <span className="text-[var(--text-secondary)]">{tz.myTime}</span>
        <span className="rounded-full bg-neon-cyan/10 px-1.5 py-0.5 text-[10px] text-neon-cyan">
          {tz.timeDiff}
        </span>
      </div>
    </motion.div>
  );
}
