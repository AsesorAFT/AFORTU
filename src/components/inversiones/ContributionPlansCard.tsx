"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { InvestmentPlan } from "@/types/cav";
import { formatCurrency } from "@/lib/formatters";

interface ContributionPlansCardProps {
  plans: InvestmentPlan[];
  contactLink: string;
}

export function ContributionPlansCard({
  plans,
  contactLink,
}: ContributionPlansCardProps) {
  const availablePlans = plans;
  const minimumAmount =
    availablePlans.length > 0
      ? Math.min(...availablePlans.map((plan) => plan.minAmount))
      : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Planes de Aportación</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Opciones disponibles</p>
          <p className="text-2xl font-bold">{availablePlans.length}</p>
        </div>

        <div className="p-3 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground">Monto inicial desde</p>
          <p className="text-lg font-medium">{formatCurrency(minimumAmount)}</p>
        </div>

        {availablePlans.length > 0 ? (
          <div className="space-y-2">
            {availablePlans.slice(0, 2).map((plan) => (
              <div key={plan.id} className="p-3 bg-muted rounded-lg">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-medium text-sm">{plan.name}</p>
                  <Badge variant="secondary" className="text-xs">
                    Riesgo {plan.riskLevel}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Desde {formatCurrency(plan.minAmount)}
                </p>
              </div>
            ))}
            {availablePlans.length > 2 && (
              <p className="text-xs text-muted-foreground text-center">
                +{availablePlans.length - 2} opciones más
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No hay opciones disponibles
          </p>
        )}

        <Button asChild variant="outline" className="w-full">
          <Link href={contactLink}>Crear nuevo plan</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
