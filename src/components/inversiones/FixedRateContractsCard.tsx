'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { CAVContract } from '@/types/cav';
import { formatCurrency, formatDate } from '@/lib/formatters';

interface FixedRateContractsCardProps {
  contracts: CAVContract[];
  requestLink: string;
}

export function FixedRateContractsCard({ contracts, requestLink }: FixedRateContractsCardProps) {
  const activeContracts = contracts.filter(c => c.status === 'active');
  const totalValue = activeContracts.reduce((sum, c) => sum + c.currentValue, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Contratos Tasa Fija</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Valor Total</p>
          <p className="text-2xl font-bold">{formatCurrency(totalValue)}</p>
        </div>

        {activeContracts.length > 0 ? (
          <div className="space-y-2">
            {activeContracts.slice(0, 3).map(contract => (
              <div key={contract.id} className="p-3 bg-muted rounded-lg">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-medium text-sm">{contract.name}</p>
                  <Badge variant="secondary" className="text-xs">
                    {(contract.rate * 100).toFixed(2)}%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Vence: {formatDate(contract.maturityDate)}
                </p>
              </div>
            ))}
            {activeContracts.length > 3 && (
              <p className="text-xs text-muted-foreground text-center">
                +{activeContracts.length - 3} contratos más
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No tienes contratos activos
          </p>
        )}

        <Button asChild variant="outline" className="w-full">
          <Link href={requestLink}>Solicitar nuevo contrato</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
