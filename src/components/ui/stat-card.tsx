'use client';

import React, { memo } from 'react';
import { fortuneColors } from '@/lib/theme/colors';
import { useAnimatedNumber } from '@/hooks/use-interactions';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  currency?: string;
  format?: 'currency' | 'number' | 'percentage';
  trend?: {
    value: number;
    label: string;
    isPositive?: boolean;
  };
  icon?: React.ReactNode;
  className?: string;
}

/**
 * StatCard - Tarjeta de estadística optimizada con animaciones
 */
export const StatCard = memo<StatCardProps>(({
  title,
  value,
  currency = 'MXN',
  format = 'number',
  trend,
  icon,
  className = '',
}) => {
  // Animar el valor numéricamente
  const animatedValue = useAnimatedNumber(value, 1500) as number;

  const formatValue = (val: number) => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('es-MX', {
          style: 'currency',
          currency,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(val);
      case 'percentage':
        return `${val.toFixed(1)}%`;
      default:
        return new Intl.NumberFormat('es-MX').format(val);
    }
  };

  return (
    <div
      className={`
        relative overflow-hidden
        rounded-2xl p-6
        bg-white/85 backdrop-blur-xl
        border shadow-lg
        transition-all duration-300
        hover:translate-y-[-4px] hover:shadow-2xl
        ${className}
      `}
      style={{
        borderColor: `${fortuneColors.primary.gold}30`,
      }}
    >
      {/* Background gradient */}
      <div 
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: fortuneColors.gradients.goldGlow,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              {title}
            </p>
            <div className="mt-3 flex items-baseline gap-2">
              <h2 
                className="text-4xl font-extrabold tabular-nums"
                style={{ color: fortuneColors.luxury.navy }}
              >
                {formatValue(animatedValue)}
              </h2>
            </div>

            {trend && (
              <div className="mt-3 flex items-center gap-2">
                <span 
                  className="flex items-center gap-1 text-sm font-semibold"
                  style={{ 
                    color: trend.isPositive !== false
                      ? fortuneColors.accent.emerald 
                      : fortuneColors.accent.ruby 
                  }}
                >
                  {trend.isPositive !== false ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {trend.value > 0 ? '+' : ''}{trend.value}%
                </span>
                <span className="text-sm text-slate-600">{trend.label}</span>
              </div>
            )}
          </div>

          {icon && (
            <div 
              className="rounded-xl p-3 shadow-lg"
              style={{
                backgroundColor: `${fortuneColors.primary.gold}20`,
              }}
            >
              <div style={{ color: fortuneColors.primary.darkGold }}>
                {icon}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

StatCard.displayName = 'StatCard';

/**
 * StatGrid - Grid de estadísticas optimizado
 */
export const StatGrid = memo<{ children: React.ReactNode; className?: string }>(
  ({ children, className = '' }) => {
    return (
      <div className={`grid gap-6 md:grid-cols-2 xl:grid-cols-3 ${className}`}>
        {children}
      </div>
    );
  }
);

StatGrid.displayName = 'StatGrid';

export default StatCard;
