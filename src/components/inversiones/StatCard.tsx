'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ReactNode } from 'react';

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  helper?: string;
  intent?: 'up' | 'down' | 'neutral';
  loading?: boolean;
}

export function StatCard({ icon, label, value, helper, intent = 'neutral', loading }: StatCardProps) {
  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <Skeleton className="h-10 w-10 rounded-full mb-4" />
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-3 w-20" />
        </CardContent>
      </Card>
    );
  }

  const intentColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600',
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-center gap-3 mb-4">
          <div className={`text-2xl ${intentColors[intent]}`}>
            {icon}
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-1">{label}</p>
        <p className={`text-2xl font-bold ${intentColors[intent]}`}>{value}</p>
        {helper && (
          <p className="text-xs text-muted-foreground mt-2">{helper}</p>
        )}
      </CardContent>
    </Card>
  );
}
