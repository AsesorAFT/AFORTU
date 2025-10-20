'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { InvestmentPlan } from '@/types/cav';
import { formatCurrency, formatDate } from '@/lib/formatters';

interface ContributionPlansCardProps {
  plans: InvestmentPlan[];
  contactLink: string;
}

export function ContributionPlansCard({ plans, contactLink }: ContributionPlansCardProps) {
  const activePlans = plans.filter(p => p.status === 'active');
  const totalAccumulated = activePlans.reduce((sum, p) => sum + p.accumulated, 0);
  const monthlyTotal = activePlans.reduce((sum, p) => sum + p.monthlyAmount, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Planes de Aportación</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Total Acumulado</p>
          <p className="text-2xl font-bold">{formatCurrency(totalAccumulated)}</p>
        </div>

        <div className="p-3 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground">Aportación Mensual</p>
          <p className="text-lg font-medium">{formatCurrency(monthlyTotal)}</p>
        </div>

        {activePlans.length > 0 ? (
          <div className="space-y-2">
            {activePlans.slice(0, 2).map(plan => (
              <div key={plan.id} className="p-3 bg-muted rounded-lg">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-medium text-sm">{plan.name}</p>
                  <Badge variant="secondary" className="text-xs">
                    {plan.frequency}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {formatCurrency(plan.monthlyAmount)}/mes
                </p>
              </div>
            ))}
            {activePlans.length > 2 && (
              <p className="text-xs text-muted-foreground text-center">
                +{activePlans.length - 2} planes más
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No tienes planes activos
          </p>
        )}

        <Button asChild variant="outline" className="w-full">
          <Link href={contactLink}>Crear nuevo plan</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
