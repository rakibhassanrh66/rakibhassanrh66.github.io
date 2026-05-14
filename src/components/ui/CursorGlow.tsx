import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface CursorGlowProps {
  enabled?: boolean;
}

export default function CursorGlow({ enabled = true }: CursorGlowProps) {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 150, damping: 15 });
  const springY = useSpring(cursorY, { stiffness: 150, damping: 15 });
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 200);
      cursorY.set(e.clientY - 200);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [enabled, cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <motion.div
      ref={glowRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden="true"
    >
      <motion.div
        className="absolute h-[400px] w-[400px] rounded-full opacity-20 blur-[80px]"
        style={{
          x: springX,
          y: springY,
          background:
            'radial-gradient(circle, rgba(0,240,255,0.4) 0%, rgba(168,85,247,0.2) 50%, transparent 70%)',
        }}
      />
    </motion.div>
  );
}
