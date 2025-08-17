'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { formatCurrency, formatPercent, formatDate } from '@/lib/formatters';
import { Banknote, Calendar, TrendingUp, Clock } from 'lucide-react';
import React from 'react';

interface FixedRateContract {
  id: string;
  initialCapital: number;
  currentValue: number;
  interestRate: number;
  termMonths: number;
  startDate: string;
  maturityDate: string;
  status: 'active' | 'mature' | 'pending';
}

interface FixedRateContractsCardProps {
  contracts: FixedRateContract[];
  className?: string;
}

export function FixedRateContractsCard({ contracts, className }: FixedRateContractsCardProps) {
  const activeContracts = contracts.filter(contract => contract.status === 'active');
  const totalValue = activeContracts.reduce((sum, contract) => sum + contract.currentValue, 0);
  const totalInitialCapital = activeContracts.reduce((sum, contract) => sum + contract.initialCapital, 0);
  const totalGainLoss = totalValue - totalInitialCapital;
  const averageRate = activeContracts.length > 0 
    ? activeContracts.reduce((sum, contract) => sum + contract.interestRate, 0) / activeContracts.length 
    : 0;

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Banknote className="h-5 w-5 text-muted-foreground" />
              Inversión a Tasa Fija
            </CardTitle>
            <CardDescription>
              Contratos de inversión con rendimiento garantizado
            </CardDescription>
          </div>
          <Badge variant="secondary" className="text-xs">
            {activeContracts.length} {activeContracts.length === 1 ? 'contrato' : 'contratos'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Valor Actual</p>
            <p className="text-lg font-semibold">{formatCurrency(totalValue)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Rendimiento</p>
            <p className={cn(
              "text-lg font-semibold flex items-center gap-1",
              totalGainLoss >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            )}>
              <TrendingUp className="h-4 w-4" />
              {formatCurrency(totalGainLoss)}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Tasa Promedio</p>
            <p className="text-lg font-semibold">{formatPercent(averageRate / 100)}</p>
          </div>
        </div>

        {/* Contract List */}
        {activeContracts.length > 0 ? (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Contratos Activos</h4>
            {activeContracts.slice(0, 3).map((contract) => {
              const gainLoss = contract.currentValue - contract.initialCapital;
              const progress = ((new Date().getTime() - new Date(contract.startDate).getTime()) / 
                             (new Date(contract.maturityDate).getTime() - new Date(contract.startDate).getTime())) * 100;
              
              return (
                <div key={contract.id} className="p-3 bg-muted/30 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Contrato {contract.id}</p>
                    <Badge variant="outline" className="text-xs">
                      {formatPercent(contract.interestRate / 100)} anual
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="text-muted-foreground">Capital Inicial</p>
                      <p className="font-medium">{formatCurrency(contract.initialCapital)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Valor Actual</p>
                      <p className="font-medium">{formatCurrency(contract.currentValue)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>Vence: {formatDate(contract.maturityDate, 'short')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {Math.round(progress)}% completado
                      </span>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div 
                      className="bg-primary rounded-full h-1.5 transition-all duration-300"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
            
            {activeContracts.length > 3 && (
              <p className="text-xs text-muted-foreground text-center py-2">
                Y {activeContracts.length - 3} contratos más...
              </p>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Banknote className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No hay contratos de tasa fija activos</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}