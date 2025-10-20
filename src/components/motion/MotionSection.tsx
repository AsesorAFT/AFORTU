'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode, ElementType } from 'react';

interface MotionSectionProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Componente wrapper para animaciones de entrada con Framer Motion
 * Permite especificar el elemento HTML a renderizar (div, section, header, etc.)
 */
export function MotionSection({ 
  as: Component = 'div', 
  children, 
  className = '',
  delay = 0 
}: MotionSectionProps) {
  const MotionComponent = motion(Component) as any;

  return (
    <MotionComponent
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}
