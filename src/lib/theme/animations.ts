/**
 * AFORTU Animation System
 * Animaciones y transiciones premium
 */

export const animations = {
  // Duraciones
  duration: {
    instant: '100ms',
    fast: '200ms',
    normal: '300ms',
    slow: '500ms',
    verySlow: '800ms',
  },

  // Easing functions premium
  easing: {
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    elastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
    easeIn: 'cubic-bezier(0.7, 0, 0.84, 0)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },

  // Keyframes CSS
  keyframes: {
    fadeIn: `
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `,
    fadeInUp: `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,
    slideInLeft: `
      @keyframes slideInLeft {
        from {
          opacity: 0;
          transform: translateX(-30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
    `,
    slideInRight: `
      @keyframes slideInRight {
        from {
          opacity: 0;
          transform: translateX(30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
    `,
    scaleIn: `
      @keyframes scaleIn {
        from {
          opacity: 0;
          transform: scale(0.9);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
    `,
    shimmer: `
      @keyframes shimmer {
        0% {
          background-position: -1000px 0;
        }
        100% {
          background-position: 1000px 0;
        }
      }
    `,
    goldGlow: `
      @keyframes goldGlow {
        0%, 100% {
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.2);
        }
        50% {
          box-shadow: 0 0 40px rgba(212, 175, 55, 0.4);
        }
      }
    `,
    pulse: `
      @keyframes pulse {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.7;
        }
      }
    `,
  },
};

export const transitions = {
  // Transiciones predefinidas
  all: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
  fast: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
  transform: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
  opacity: 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)',
  colors: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), color 300ms cubic-bezier(0.4, 0, 0.2, 1)',
  shadow: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)',
};

/**
 * Variants de Framer Motion para componentes
 */
export const motionVariants = {
  // Card entrance
  cardEnter: {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  },

  // Stagger children
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  },

  // Fade in up
  fadeInUp: {
    hidden: { 
      opacity: 0, 
      y: 20,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  },

  // Scale on hover
  scaleOnHover: {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    tap: { scale: 0.98 },
  },

  // Gold glow effect
  goldGlow: {
    initial: { 
      boxShadow: '0 8px 32px rgba(212, 175, 55, 0.15)',
    },
    hover: { 
      boxShadow: '0 12px 48px rgba(212, 175, 55, 0.35)',
      transition: {
        duration: 0.3,
      },
    },
  },
};

export default {
  animations,
  transitions,
  motionVariants,
};
