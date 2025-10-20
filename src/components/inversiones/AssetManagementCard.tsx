'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { formatCurrency } from '@/lib/formatters';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface AssetManagementCardProps {
  contracts: any[];
  valueMxn: number;
  investedMxn: number;
  gainMxn: number;
  contactLink: string;
}

export function AssetManagementCard({ 
  contracts, 
  valueMxn, 
  investedMxn, 
  gainMxn,
  contactLink 
}: AssetManagementCardProps) {
  const gainPct = investedMxn > 0 ? (gainMxn / investedMxn) * 100 : 0;
  const isPositive = gainMxn >= 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Asset Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Valor Actual</p>
          <p className="text-2xl font-bold">{formatCurrency(valueMxn)}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Invertido</p>
            <p className="text-sm font-medium">{formatCurrency(investedMxn)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Ganancia</p>
            <div className={`flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              <p className="text-sm font-medium">
                {formatCurrency(Math.abs(gainMxn))}
              </p>
            </div>
          </div>
        </div>

        <div className="p-3 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground">Rendimiento</p>
          <p className={`text-lg font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '+' : ''}{gainPct.toFixed(2)}%
          </p>
        </div>

        {contracts.length > 0 && (
          <p className="text-xs text-muted-foreground">
            {contracts.length} contrato{contracts.length !== 1 ? 's' : ''} activo{contracts.length !== 1 ? 's' : ''}
          </p>
        )}

        <Button asChild variant="outline" className="w-full">
          <Link href={contactLink}>Contactar asesor</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
