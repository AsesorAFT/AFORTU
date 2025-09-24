
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideProps, Briefcase, DollarSign, TrendingUp, Banknote, Calendar, TrendingDown, AlertTriangle, CheckCircle, Flame, ListTodo, Hourglass, PartyPopper, UserCheck } from 'lucide-react';
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
  userCheck: UserCheck
};

interface StatCardProps {
  title: string;
  value: string;
  trend?: 'up' | 'down';
  iconName: keyof typeof iconMap;
  description: string | null;
}

export function StatCard({ title, value, trend, iconName, description }: StatCardProps) {
  const Icon = iconMap[iconName];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
            <div className="text-2xl font-bold">{value}</div>
            {trend && (
            <span
                className={cn(
                'text-xs font-semibold flex items-center',
                trend === 'up' ? 'text-green-600' : 'text-red-600'
                )}
            >
                {trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            </span>
            )}
        </div>
        {description !== null && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardContent>
    </Card>
  );
}
