'use client';

import React from 'react';
import { cn } from "@/lib/utils"
import { fortuneColors } from '@/lib/theme/colors';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'shimmer';
}

function Skeleton({
  className,
  variant = 'rectangular',
  width,
  height,
  animation = 'shimmer',
  ...props
}: SkeletonProps) {
  const variantStyles = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
    card: 'rounded-2xl',
  };

  const animationStyles = {
    pulse: 'animate-pulse bg-muted',
    shimmer: 'animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]',
  };

  const style: React.CSSProperties = {
    width: width || '100%',
    height: height || (variant === 'text' ? '1rem' : '100%'),
  };

  return (
    <div
      className={cn(
        variantStyles[variant],
        animationStyles[animation],
        className
      )}
      style={style}
      {...props}
    />
  );
}

/**
 * SkeletonCard - Skeleton de tarjeta premium
 */
const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={cn("p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200", className)}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="text" width={80} height={20} />
        </div>

        {/* Title */}
        <Skeleton variant="text" width="60%" height={24} />

        {/* Content */}
        <div className="space-y-2">
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="90%" />
        </div>

        {/* Footer */}
        <div className="flex gap-2 pt-4">
          <Skeleton variant="rectangular" width={100} height={36} />
          <Skeleton variant="rectangular" width={100} height={36} />
        </div>
      </div>
    </div>
  );
};

/**
 * SkeletonDashboard - Skeleton para dashboard
 */
const SkeletonDashboard: React.FC = () => {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="space-y-3">
        <Skeleton variant="text" width="40%" height={32} />
        <Skeleton variant="text" width="60%" height={20} />
      </div>

      {/* Balance Card */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50">
        <Skeleton variant="text" width={150} height={20} className="mb-4" />
        <Skeleton variant="text" width={280} height={48} className="mb-2" />
        <Skeleton variant="text" width={120} height={24} />
      </div>

      {/* Grid de cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>

      {/* Chart skeleton */}
      <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200">
        <Skeleton variant="text" width="30%" height={24} className="mb-6" />
        <Skeleton variant="rectangular" height={300} />
      </div>
    </div>
  );
};

/**
 * SkeletonTable - Skeleton para tablas
 */
const SkeletonTable: React.FC<{ rows?: number }> = ({ rows = 5 }) => {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex gap-4 pb-3 border-b border-gray-200">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} variant="text" width={`${20 + i * 10}%`} height={20} />
        ))}
      </div>

      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 py-3">
          {[1, 2, 3, 4].map((j) => (
            <Skeleton key={j} variant="text" width={`${20 + j * 10}%`} height={16} />
          ))}
        </div>
      ))}
    </div>
  );
};

/**
 * LoadingSpinner - Spinner de carga premium
 */
const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          sizes[size],
          'border-gray-200 border-t-transparent rounded-full animate-spin'
        )}
        style={{
          borderTopColor: fortuneColors.primary.gold,
        }}
      />
    </div>
  );
};

/**
 * LoadingOverlay - Overlay de carga premium
 */
const LoadingOverlay: React.FC<{ message?: string }> = ({ message = 'Cargando...' }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="p-8 rounded-2xl bg-white/95 backdrop-blur-xl shadow-2xl">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-sm font-medium text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export { 
  Skeleton, 
  SkeletonCard, 
  SkeletonDashboard, 
  SkeletonTable,
  LoadingSpinner,
  LoadingOverlay 
};
