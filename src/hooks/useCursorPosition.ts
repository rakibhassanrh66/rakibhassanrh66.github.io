import { useState, useEffect } from 'react';

interface CursorPosition {
  x: number;
  y: number;
  normalizedX: number; // 0 to 1
  normalizedY: number; // 0 to 1
}

export function useCursorPosition(enabled: boolean = true): CursorPosition {
  const [pos, setPos] = useState<CursorPosition>({ x: 0, y: 0, normalizedX: 0.5, normalizedY: 0.5 });

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (e: MouseEvent) => {
      setPos({
        x: e.clientX,
        y: e.clientY,
        normalizedX: e.clientX / window.innerWidth,
        normalizedY: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [enabled]);

  return pos;
}
