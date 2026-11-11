import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchOrReduced, setIsTouchOrReduced] = useState(true);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Smooth spring physics for trailing dot
  const springX = useSpring(rawX, { stiffness: 450, damping: 28 });
  const springY = useSpring(rawY, { stiffness: 450, damping: 28 });

  useEffect(() => {
    // Check if device is touch or prefers reduced motion
    const touchQuery = window.matchMedia('(pointer: coarse)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    function checkSupport() {
      const unsupported = touchQuery.matches || motionQuery.matches;
      setIsTouchOrReduced(unsupported);
    }

    checkSupport();
    touchQuery.addEventListener('change', checkSupport);
    motionQuery.addEventListener('change', checkSupport);

    const handleMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if target or ancestor is interactive
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = Boolean(
          target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer')
        );
        setIsPointer(interactive);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      touchQuery.removeEventListener('change', checkSupport);
      motionQuery.removeEventListener('change', checkSupport);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [rawX, rawY, isVisible]);

  if (isTouchOrReduced || !isVisible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* State-aware expanding ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-[var(--color-ink-faint)]"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isPointer ? 36 : 8,
          height: isPointer ? 36 : 8,
          backgroundColor: isPointer ? 'transparent' : 'var(--color-ink)',
          borderColor: isPointer ? 'var(--color-accent)' : 'transparent',
          opacity: isPointer ? 0.9 : 0.7,
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      />
    </div>
  );
};

export default CustomCursor;
