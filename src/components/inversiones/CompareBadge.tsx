'use client';

import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface CompareBadgeProps {
  deltaPct: number;
}

export function CompareBadge({ deltaPct }: CompareBadgeProps) {
  const isPositive = deltaPct >= 0;
  const Icon = isPositive ? TrendingUp : TrendingDown;
  const variant = isPositive ? 'default' : 'destructive';

  return (
    <Badge variant={variant} className="gap-1">
      <Icon className="h-3 w-3" />
      {isPositive ? '+' : ''}{(deltaPct * 100).toFixed(2)}%
    </Badge>
  );
}
