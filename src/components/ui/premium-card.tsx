'use client';

import React from 'react';
import { fortuneColors } from '@/lib/theme/colors';

interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'glass' | 'elevated' | 'gold' | 'luxury';
  hover?: boolean;
  glow?: boolean;
}

/**
 * PremiumCard - Tarjeta con efectos de glassmorphism y lujo
 */
export const PremiumCard: React.FC<PremiumCardProps> = ({
  children,
  className = '',
  style: customStyle,
  variant = 'glass',
  hover = true,
  glow = false,
}) => {
  const variantStyles = {
    glass: {
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(212, 175, 55, 0.2)',
      boxShadow: fortuneColors.shadows.goldGlow,
    },
    elevated: {
      background: '#FFFFFF',
      backdropFilter: 'none',
      border: '1px solid rgba(0, 0, 0, 0.05)',
      boxShadow: fortuneColors.shadows.luxuryCard,
    },
    gold: {
      background: `linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(255, 255, 255, 0.95) 100%)`,
      backdropFilter: 'blur(20px)',
      border: `1px solid ${fortuneColors.primary.gold}`,
      boxShadow: fortuneColors.shadows.goldGlow,
    },
    luxury: {
      background: fortuneColors.luxury.navy,
      backdropFilter: 'none',
      border: `1px solid ${fortuneColors.primary.darkGold}`,
      boxShadow: fortuneColors.shadows.premium,
    },
  };

  const style = variantStyles[variant];

  return (
    <div
      className={`
        rounded-2xl p-6
        transition-all duration-300 ease-out
        ${hover ? 'hover:translate-y-[-8px] hover:shadow-2xl' : ''}
        ${glow ? 'animate-[goldGlow_3s_ease-in-out_infinite]' : ''}
        ${className}
      `}
      style={{ ...style, ...customStyle }}
    >
      {children}
    </div>
  );
};

interface GlassContainerProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'strong';
}

/**
 * GlassContainer - Contenedor con efecto de vidrio
 */
export const GlassContainer: React.FC<GlassContainerProps> = ({
  children,
  className = '',
  intensity = 'medium',
}) => {
  const intensityStyles = {
    light: {
      background: 'rgba(255, 255, 255, 0.6)',
      backdropFilter: 'blur(10px)',
    },
    medium: {
      background: 'rgba(255, 255, 255, 0.75)',
      backdropFilter: 'blur(20px)',
    },
    strong: {
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(30px)',
    },
  };

  return (
    <div
      className={`
        rounded-xl border border-white/20
        shadow-lg
        ${className}
      `}
      style={intensityStyles[intensity]}
    >
      {children}
    </div>
  );
};

interface GradientCardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: 'goldShine' | 'luxuryDark' | 'wealth';
}

/**
 * GradientCard - Tarjeta con gradientes premium
 */
export const GradientCard: React.FC<GradientCardProps> = ({
  children,
  className = '',
  gradient = 'wealth',
}) => {
  const gradients = {
    goldShine: fortuneColors.gradients.goldShine,
    luxuryDark: fortuneColors.gradients.luxuryDark,
    wealth: fortuneColors.gradients.wealth,
  };

  return (
    <div
      className={`
        rounded-2xl p-8
        shadow-2xl
        transition-all duration-300
        hover:scale-[1.02]
        ${className}
      `}
      style={{
        background: gradients[gradient],
      }}
    >
      {children}
    </div>
  );
};

export default PremiumCard;
