/**
 * Executive Summary Component
 * Displays key portfolio analysis results in a clear, accessible format
 */

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Shield, 
  AlertTriangle,
  BarChart3,
  Target,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ExecutiveAnalysisResult } from '@/utils/analysis/mockAnalyzePortfolioBatch';

export interface ExecutiveSummaryProps {
  data: ExecutiveAnalysisResult;
  className?: string;
}

const riskLevelConfig = {
  low: {
    icon: Shield,
    label: 'Bajo',
    color: 'text-success-600',
    bgColor: 'bg-success-100',
    borderColor: 'border-success-200',
  },
  medium: {
    icon: AlertTriangle,
    label: 'Moderado',
    color: 'text-warning-600',
    bgColor: 'bg-warning-100',
    borderColor: 'border-warning-200',
  },
  high: {
    icon: AlertTriangle,
    label: 'Alto',
    color: 'text-error-600',
    bgColor: 'bg-error-100',
    borderColor: 'border-error-200',
  },
};

export function ExecutiveSummary({ data, className }: ExecutiveSummaryProps) {
  const riskConfig = riskLevelConfig[data.overallRisk];
  const RiskIcon = riskConfig.icon;

  const formatPercentage = (value: number) => `${(value * 100).toFixed(1)}%`;

  return (
    <Card className={cn('fade-in', className)} aria-live="polite">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-primary" aria-hidden="true" />
          <span>Resumen Ejecutivo</span>
        </CardTitle>
        <div className="text-sm text-muted-foreground">
          Actualizado: {data.lastUpdated.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Risk and Diversification Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Overall Risk */}
          <div className={cn(
            'p-4 rounded-lg border-2',
            riskConfig.bgColor,
            riskConfig.borderColor
          )}>
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-white/50">
                <RiskIcon className={cn('h-5 w-5', riskConfig.color)} aria-hidden="true" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Riesgo General</h4>
                <p className={cn('text-lg font-bold', riskConfig.color)}>
                  {riskConfig.label}
                </p>
              </div>
            </div>
          </div>

          {/* Diversification Score */}
          <div className="p-4 rounded-lg border-2 bg-primary-50 border-primary-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-primary" aria-hidden="true" />
                <h4 className="font-semibold text-sm">Diversificación</h4>
              </div>
              <span className="text-lg font-bold text-primary">
                {data.diversificationScore}/100
              </span>
            </div>
            <Progress 
              value={data.diversificationScore} 
              className="h-2"
              aria-label={`Puntuación de diversificación: ${data.diversificationScore} de 100`}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {data.diversificationScore >= 80 ? 'Excelente diversificación' :
               data.diversificationScore >= 60 ? 'Buena diversificación' :
               data.diversificationScore >= 40 ? 'Diversificación moderada' :
               'Requiere mayor diversificación'}
            </p>
          </div>
        </div>

        {/* Potential Returns */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-success-600" aria-hidden="true" />
            <span>Retornos Potenciales (Anualizados)</span>
          </h4>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-secondary-50 rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">Conservador</div>
              <div className="font-semibold text-secondary-700">
                {formatPercentage(data.potentialReturns.conservative)}
              </div>
            </div>
            <div className="text-center p-3 bg-primary-50 rounded-lg border-2 border-primary-200">
              <div className="text-xs text-muted-foreground mb-1">Esperado</div>
              <div className="font-semibold text-primary text-lg">
                {formatPercentage(data.potentialReturns.expected)}
              </div>
            </div>
            <div className="text-center p-3 bg-success-50 rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">Optimista</div>
              <div className="font-semibold text-success-700">
                {formatPercentage(data.potentialReturns.optimistic)}
              </div>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        {data.keyInsights.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Insights Clave</h4>
            <div className="space-y-2">
              {data.keyInsights.map((insight, index) => (
                <div key={index} className="flex items-start space-x-2 p-3 bg-surface-primary rounded-lg">
                  <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-xs font-semibold mt-0.5 flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-sm text-text-secondary flex-1">{insight}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {data.recommendations.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Recomendaciones</h4>
            <div className="space-y-2">
              {data.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-2 p-3 bg-success-50 rounded-lg border border-success-200">
                  <div className="w-5 h-5 rounded-full bg-success-600 text-white flex items-center justify-center text-xs font-semibold mt-0.5 flex-shrink-0">
                    ✓
                  </div>
                  <p className="text-sm text-success-800 flex-1">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Risk Factors */}
        {data.riskFactors.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-sm flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-warning-600" aria-hidden="true" />
              <span>Factores de Riesgo</span>
            </h4>
            <div className="space-y-1">
              {data.riskFactors.map((factor, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm text-warning-700">
                  <div className="w-1 h-1 bg-warning-600 rounded-full flex-shrink-0"></div>
                  <span>{factor}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Market Outlook */}
        <div className="p-4 bg-surface-elevated rounded-lg border">
          <h4 className="font-semibold text-sm mb-2 flex items-center space-x-2">
            <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
            <span>Perspectiva del Mercado</span>
          </h4>
          <p className="text-sm text-text-secondary">{data.marketOutlook}</p>
        </div>
      </CardContent>
    </Card>
  );
}