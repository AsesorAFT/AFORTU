'use client';

import React, { memo } from 'react';
import { Button } from '@/components/ui/button';
import { fortuneColors } from '@/lib/theme/colors';
import { useRipple } from '@/hooks/use-interactions';
import { Loader2 } from 'lucide-react';

interface PremiumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'navy' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  ripple?: boolean;
}

/**
 * PremiumButton - Botón optimizado con efectos premium
 */
export const PremiumButton = memo<PremiumButtonProps>(({
  children,
  variant = 'gold',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  ripple = true,
  className = '',
  onClick,
  disabled,
  ...props
}) => {
  const createRipple = useRipple();

  const variantStyles = {
    gold: {
      backgroundColor: fortuneColors.primary.gold,
      color: fortuneColors.luxury.charcoal,
      border: 'none',
      hover: {
        backgroundColor: fortuneColors.primary.lightGold,
        boxShadow: fortuneColors.shadows.goldGlowHover,
      },
    },
    navy: {
      backgroundColor: fortuneColors.luxury.charcoal,
      color: fortuneColors.primary.gold,
      border: 'none',
      hover: {
        backgroundColor: fortuneColors.luxury.slate,
        boxShadow: fortuneColors.shadows.premium,
      },
    },
    outline: {
      backgroundColor: 'transparent',
      color: fortuneColors.luxury.charcoal,
      border: `2px solid ${fortuneColors.primary.gold}`,
      hover: {
        backgroundColor: `${fortuneColors.primary.gold}10`,
        borderColor: fortuneColors.primary.darkGold,
      },
    },
    ghost: {
      backgroundColor: 'transparent',
      color: fortuneColors.luxury.charcoal,
      border: 'none',
      hover: {
        backgroundColor: `${fortuneColors.neutral[100]}`,
      },
    },
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (ripple && !disabled && !isLoading) {
      createRipple(e);
    }
    onClick?.(e);
  };

  const currentStyle = variantStyles[variant];

  return (
    <button
      className={`
        relative overflow-hidden
        inline-flex items-center justify-center gap-2
        font-semibold rounded-xl
        transition-all duration-300 ease-out
        disabled:opacity-50 disabled:cursor-not-allowed
        hover:scale-105 active:scale-95
        shadow-lg hover:shadow-2xl
        ${sizeStyles[size]}
        ${className}
      `}
      style={{
        backgroundColor: currentStyle.backgroundColor,
        color: currentStyle.color,
        border: currentStyle.border,
      }}
      onClick={handleClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {!isLoading && leftIcon && <span className="inline-flex">{leftIcon}</span>}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="inline-flex">{rightIcon}</span>}

      {/* Ripple styles */}
      <style jsx>{`
        .ripple {
          position: absolute;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.4);
          transform: scale(0);
          animation: ripple-animation 0.6s ease-out;
          pointer-events: none;
        }

        @keyframes ripple-animation {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </button>
  );
});

PremiumButton.displayName = 'PremiumButton';

/**
 * ButtonGroup - Grupo de botones con estilo premium
 */
export const ButtonGroup = memo<{ children: React.ReactNode; className?: string }>(
  ({ children, className = '' }) => {
    return (
      <div className={`inline-flex gap-2 ${className}`}>
        {children}
      </div>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';

export default PremiumButton;
