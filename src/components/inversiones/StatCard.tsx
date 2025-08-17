'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideProps, Briefcase, DollarSign, TrendingUp, Banknote, Calendar, TrendingDown, AlertTriangle, CheckCircle, Flame, ListTodo, Hourglass, PartyPopper, UserCheck, Target, BarChart3, PieChart } from 'lucide-react';
import React from 'react';

// Define a mapping from string names to icon components
const iconMap: { [key: string]: React.ElementType<LucideProps> } = {
  briefcase: Briefcase,
  dollarSign: DollarSign,
  trendingUp: TrendingUp,
  banknote: Banknote,
  calendar: Calendar,
  trendingDown: TrendingDown,
  alertTriangle: AlertTriangle,
  checkCircle: CheckCircle,
  flame: Flame,
  listTodo: ListTodo,
  hourglass: Hourglass,
  partyPopper: PartyPopper,
  userCheck: UserCheck,
  target: Target,
  barChart3: BarChart3,
  pieChart: PieChart,
};

// Intent styling map for different card purposes
const intentStyles = {
  default: '',
  success: 'border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/50',
  warning: 'border-yellow-200 bg-yellow-50/50 dark:border-yellow-800 dark:bg-yellow-950/50',
  danger: 'border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/50',
  info: 'border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/50',
} as const;

interface StatCardProps {
  title: string;
  value: string;
  trend?: 'up' | 'down';
  iconName: keyof typeof iconMap;
  description?: string | null;
  intent?: keyof typeof intentStyles;
  className?: string;
  ariaLabel?: string;
}

export function StatCard({ 
  title, 
  value, 
  trend, 
  iconName, 
  description, 
  intent = 'default',
  className,
  ariaLabel 
}: StatCardProps) {
  const Icon = iconMap[iconName];

  return (
    <Card 
      className={cn(intentStyles[intent], className)}
      aria-labelledby={ariaLabel ? undefined : `stat-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
      aria-label={ariaLabel}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle 
          className="text-sm font-medium"
          id={ariaLabel ? undefined : `stat-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
        >
          {title}
        </CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <div className="text-2xl font-bold">{value}</div>
          {trend && (
            <span
              className={cn(
                'text-xs font-semibold flex items-center gap-1',
                trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              )}
              aria-label={`Tendencia ${trend === 'up' ? 'al alza' : 'a la baja'}`}
            >
              {trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            </span>
          )}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}