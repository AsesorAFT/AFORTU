'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { formatCurrency, formatPercent } from '@/lib/formatters';
import { PieChart, TrendingUp, TrendingDown, BarChart3, Eye } from 'lucide-react';
import React from 'react';

interface PortfolioAsset {
  id: string;
  name: string;
  symbol: string;
  shares: number;
  purchasePrice: number;
  currentPrice: number;
  sector: string;
  allocation: number; // percentage of total portfolio
}

interface AssetManagementData {
  contractId: string;
  totalValue: number;
  totalCost: number;
  assets: PortfolioAsset[];
  managementFee: number; // annual percentage
}

interface AssetManagementCardProps {
  data: AssetManagementData;
  className?: string;
}

export function AssetManagementCard({ data, className }: AssetManagementCardProps) {
  const { contractId, totalValue, totalCost, assets, managementFee } = data;
  const totalGainLoss = totalValue - totalCost;
  const gainLossPercent = totalCost > 0 ? (totalGainLoss / totalCost) * 100 : 0;
  const isPositive = totalGainLoss >= 0;

  // Group assets by sector for diversity display
  const sectorAllocation = assets.reduce((acc, asset) => {
    acc[asset.sector] = (acc[asset.sector] || 0) + asset.allocation;
    return acc;
  }, {} as Record<string, number>);

  const topSectors = Object.entries(sectorAllocation)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  // Top performing assets
  const topPerformers = assets
    .map(asset => ({
      ...asset,
      performance: ((asset.currentPrice - asset.purchasePrice) / asset.purchasePrice) * 100
    }))
    .sort((a, b) => b.performance - a.performance)
    .slice(0, 3);

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <PieChart className="h-5 w-5 text-muted-foreground" />
              Asset Management
            </CardTitle>
            <CardDescription>
              Portafolio diversificado de renta variable
            </CardDescription>
          </div>
          <Badge variant="secondary" className="text-xs">
            {contractId}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Performance Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Valor de Mercado</p>
            <p className="text-lg font-semibold">{formatCurrency(totalValue)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Ganancia/Pérdida</p>
            <p className={cn(
              "text-lg font-semibold flex items-center gap-1",
              isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            )}>
              {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              {formatCurrency(Math.abs(totalGainLoss))}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Rendimiento</p>
            <p className={cn(
              "text-lg font-semibold",
              isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            )}>
              {formatPercent(gainLossPercent / 100, { signDisplay: isPositive ? 'exceptZero' : 'always' })}
            </p>
          </div>
        </div>

        {/* Sector Allocation */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Distribución por Sector
          </h4>
          <div className="space-y-2">
            {topSectors.map(([sector, allocation]) => (
              <div key={sector} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm">{sector}</span>
                </div>
                <span className="text-sm font-medium">{formatPercent(allocation / 100)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Mejor Rendimiento
          </h4>
          <div className="space-y-2">
            {topPerformers.map((asset) => (
              <div key={asset.id} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{asset.name}</p>
                  <p className="text-xs text-muted-foreground">{asset.symbol}</p>
                </div>
                <div className="text-right">
                  <p className={cn(
                    "text-sm font-semibold",
                    asset.performance >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  )}>
                    {formatPercent(asset.performance / 100, { signDisplay: 'exceptZero' })}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatCurrency(asset.currentPrice)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Management Fee Info */}
        <div className="p-3 bg-muted/50 rounded-lg border border-muted">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Comisión de Gestión</p>
              <p className="text-sm">{formatPercent(managementFee / 100)} anual</p>
            </div>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {/* Portfolio Link */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Ver portafolio completo en la tabla inferior
          </p>
        </div>
      </CardContent>
    </Card>
  );
}