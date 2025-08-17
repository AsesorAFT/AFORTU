'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/formatters';
import { TrendingUp, TrendingDown, Briefcase } from 'lucide-react';
import React from 'react';

interface TotalInvestmentCardProps {
  totalValue: number;
  totalGainLoss: number;
  gainLossPercent: number;
  description?: string;
  className?: string;
}

export function TotalInvestmentCard({ 
  totalValue, 
  totalGainLoss, 
  gainLossPercent,
  description = "Patrimonio total en inversiones",
  className 
}: TotalInvestmentCardProps) {
  const isPositive = totalGainLoss >= 0;
  const trend = isPositive ? 'up' : 'down';

  return (
    <Card className={cn("bg-gradient-to-r from-primary to-primary/90 text-primary-foreground", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardDescription className="text-primary-foreground/80 text-sm">
              {description}
            </CardDescription>
            <CardTitle 
              className="text-3xl md:text-4xl font-bold tracking-tight"
              aria-label={`Patrimonio total: ${formatCurrency(totalValue)}`}
            >
              {formatCurrency(totalValue)}
            </CardTitle>
          </div>
          <Briefcase className="h-8 w-8 text-primary-foreground/80" />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center gap-2">
          <div 
            className={cn(
              'flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold',
              isPositive 
                ? 'bg-green-500/20 text-green-100' 
                : 'bg-red-500/20 text-red-100'
            )}
            aria-label={`Rendimiento: ${isPositive ? 'ganancia' : 'pérdida'} de ${formatCurrency(Math.abs(totalGainLoss))}`}
          >
            {trend === 'up' ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span>
              {formatCurrency(Math.abs(totalGainLoss))}
            </span>
            <span className="text-primary-foreground/60">
              ({Math.abs(gainLossPercent).toFixed(2)}%)
            </span>
          </div>
        </div>
        <p className="text-xs text-primary-foreground/70 mt-2">
          {isPositive ? 'Rendimiento positivo' : 'Pérdida actual'} en el período
        </p>
      </CardContent>
    </Card>
  );
}