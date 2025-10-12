'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const x = useSpring(0, { stiffness: 250, damping: 30, mass: 0.6 });
  const y = useSpring(0, { stiffness: 250, damping: 30, mass: 0.6 });
  const secondaryX = useSpring(0, { stiffness: 150, damping: 35, mass: 0.6 });
  const secondaryY = useSpring(0, { stiffness: 150, damping: 35, mass: 0.6 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setEnabled(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setEnabled(event.matches);
    };
    mediaQuery.addEventListener('change', listener);

    return () => {
      mediaQuery.removeEventListener('change', listener);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (event: MouseEvent) => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        x.set(event.clientX - 16);
        y.set(event.clientY - 16);
        secondaryX.set(event.clientX - 6);
        secondaryY.set(event.clientY - 6);
      });
    };

    window.addEventListener('mousemove', handleMove);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener('mousemove', handleMove);
    };
  }, [enabled, secondaryX, secondaryY, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[999] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-300/80 bg-amber-200/20 mix-blend-difference lg:block"
        style={{ x, y }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[999] hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300 mix-blend-difference lg:block"
        style={{ x: secondaryX, y: secondaryY }}
      />
    </>
  );
}
