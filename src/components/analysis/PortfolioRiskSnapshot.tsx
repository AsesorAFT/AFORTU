/**
 * Portfolio Risk Snapshot Component
 * Displays portfolio composition and risk metrics with visual charts
 */

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { 
  PieChart as PieChartIcon,
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PortfolioItem } from '@/utils/analysis/mockAnalyzePortfolioBatch';

export interface PortfolioRiskSnapshotProps {
  portfolioItems: PortfolioItem[];
  className?: string;
}

// Chart colors using our design system
const CHART_COLORS = [
  'hsl(var(--brand-primary-500))',
  'hsl(var(--brand-secondary-400))',
  'hsl(var(--brand-success-500))',
  'hsl(var(--brand-warning-500))',
  'hsl(var(--brand-error-500))',
  'hsl(var(--brand-primary-300))',
  'hsl(var(--brand-secondary-600))',
  'hsl(var(--brand-success-300))',
];

export function PortfolioRiskSnapshot({ portfolioItems, className }: PortfolioRiskSnapshotProps) {
  // Calculate portfolio metrics
  const totalValue = portfolioItems.reduce((sum, item) => sum + item.currentValue, 0);
  
  // Prepare data for pie chart (top holdings)
  const pieChartData = portfolioItems
    .sort((a, b) => b.currentValue - a.currentValue)
    .slice(0, 8) // Show top 8 holdings
    .map(item => ({
      name: item.symbol,
      value: item.currentValue,
      percentage: (item.currentValue / totalValue) * 100,
      change: item.changePercent,
    }));

  // Calculate sector distribution
  const sectorData = portfolioItems.reduce((acc, item) => {
    const sector = item.sector || 'Otros';
    if (!acc[sector]) {
      acc[sector] = { value: 0, count: 0 };
    }
    acc[sector].value += item.currentValue;
    acc[sector].count += 1;
    return acc;
  }, {} as Record<string, { value: number; count: number }>);

  const sectorChartData = Object.entries(sectorData)
    .map(([sector, data]) => ({
      sector,
      value: data.value,
      percentage: (data.value / totalValue) * 100,
      count: data.count,
    }))
    .sort((a, b) => b.value - a.value);

  // Calculate risk metrics
  const positiveItems = portfolioItems.filter(item => item.changePercent >= 0);
  const negativeItems = portfolioItems.filter(item => item.changePercent < 0);
  const avgChange = portfolioItems.reduce((sum, item) => sum + item.changePercent, 0) / portfolioItems.length;

  // Calculate weighted risk score
  const riskScore = portfolioItems.reduce((sum, item) => {
    const weight = item.weight || (item.currentValue / totalValue);
    const riskContribution = Math.abs(item.changePercent) * weight;
    return sum + riskContribution;
  }, 0);

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border border-border rounded-lg shadow-lg p-3">
          <p className="font-semibold">{data.name || data.sector}</p>
          <p className="text-sm">
            Valor: ${data.value.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-sm">
            Porcentaje: {data.percentage.toFixed(1)}%
          </p>
          {data.change !== undefined && (
            <p className={cn(
              'text-sm font-medium',
              data.change >= 0 ? 'text-success-600' : 'text-error-600'
            )}>
              Cambio: {data.change >= 0 ? '+' : ''}{data.change.toFixed(2)}%
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={cn('fade-in', className)}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <PieChartIcon className="h-5 w-5 text-primary" aria-hidden="true" />
          <span>Snapshot del Portafolio</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Portfolio Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-surface-primary rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <DollarSign className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="text-xs font-medium text-muted-foreground">Valor Total</span>
            </div>
            <p className="text-lg font-bold">
              ${totalValue.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
            </p>
          </div>
          
          <div className="p-3 bg-surface-primary rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <PieChartIcon className="h-4 w-4 text-secondary-600" aria-hidden="true" />
              <span className="text-xs font-medium text-muted-foreground">Posiciones</span>
            </div>
            <p className="text-lg font-bold">{portfolioItems.length}</p>
          </div>
          
          <div className="p-3 bg-surface-primary rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              {avgChange >= 0 ? (
                <TrendingUp className="h-4 w-4 text-success-600" aria-hidden="true" />
              ) : (
                <TrendingDown className="h-4 w-4 text-error-600" aria-hidden="true" />
              )}
              <span className="text-xs font-medium text-muted-foreground">Cambio Prom.</span>
            </div>
            <p className={cn(
              'text-lg font-bold',
              avgChange >= 0 ? 'text-success-600' : 'text-error-600'
            )}>
              {avgChange >= 0 ? '+' : ''}{avgChange.toFixed(2)}%
            </p>
          </div>
          
          <div className="p-3 bg-surface-primary rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <AlertCircle className="h-4 w-4 text-warning-600" aria-hidden="true" />
              <span className="text-xs font-medium text-muted-foreground">Riesgo</span>
            </div>
            <p className="text-lg font-bold text-warning-600">
              {(riskScore * 100).toFixed(1)}
            </p>
          </div>
        </div>

        {/* Performance Distribution */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-success-50 border border-success-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-success-800">Posiciones Positivas</span>
              <TrendingUp className="h-4 w-4 text-success-600" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-success-700">Cantidad:</span>
                <span className="font-semibold">{positiveItems.length}</span>
              </div>
              <Progress 
                value={(positiveItems.length / portfolioItems.length) * 100} 
                className="h-2 bg-success-100"
              />
            </div>
          </div>
          
          <div className="p-3 bg-error-50 border border-error-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-error-800">Posiciones Negativas</span>
              <TrendingDown className="h-4 w-4 text-error-600" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-error-700">Cantidad:</span>
                <span className="font-semibold">{negativeItems.length}</span>
              </div>
              <Progress 
                value={(negativeItems.length / portfolioItems.length) * 100} 
                className="h-2 bg-error-100"
              />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Holdings Pie Chart */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Principales Posiciones</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={CHART_COLORS[index % CHART_COLORS.length]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip content={customTooltip} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              {pieChartData.map((item, index) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-sm flex-shrink-0"
                    style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                  ></div>
                  <span className="truncate font-medium">{item.name}</span>
                  <span className="text-muted-foreground ml-auto">
                    {item.percentage.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sector Distribution */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Distribución por Sector</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sectorChartData} layout="horizontal">
                  <XAxis type="number" domain={[0, 'dataMax']} />
                  <YAxis type="category" dataKey="sector" tick={{ fontSize: 12 }} />
                  <Tooltip content={customTooltip} />
                  <Bar 
                    dataKey="value" 
                    fill="hsl(var(--brand-primary-500))" 
                    radius={[0, 4, 4, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Risk Concentration Warning */}
        {pieChartData.some(item => item.percentage > 20) && (
          <div className="p-4 bg-warning-50 border border-warning-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-warning-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div className="space-y-1">
                <h5 className="font-semibold text-sm text-warning-800">
                  Concentración de Riesgo Detectada
                </h5>
                <p className="text-xs text-warning-700">
                  Una o más posiciones representan más del 20% del portafolio. 
                  Considera diversificar para reducir el riesgo de concentración.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}