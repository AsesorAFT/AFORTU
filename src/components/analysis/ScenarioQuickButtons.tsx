/**
 * Scenario Quick Buttons Component
 * Quick action buttons for common portfolio analysis scenarios
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Shield, 
  TrendingUp, 
  Leaf,
  Globe,
  DollarSign,
  BarChart3,
  RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ScenarioAction {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  variant: 'default' | 'secondary' | 'outline';
  badge?: string;
  disabled?: boolean;
  loading?: boolean;
}

export interface ScenarioQuickButtonsProps {
  onScenarioSelect: (scenarioId: string) => void;
  loading?: boolean;
  className?: string;
}

const defaultScenarios: ScenarioAction[] = [
  {
    id: 'quick-analysis',
    label: 'Análisis Rápido',
    description: 'Evaluación general del portafolio actual',
    icon: Zap,
    variant: 'default',
    badge: 'Rápido',
  },
  {
    id: 'risk-assessment',
    label: 'Evaluación de Riesgo',
    description: 'Análisis detallado de exposición al riesgo',
    icon: Shield,
    variant: 'outline',
    badge: 'Detallado',
  },
  {
    id: 'growth-opportunities',
    label: 'Oportunidades de Crecimiento',
    description: 'Identificar sectores y activos con potencial',
    icon: TrendingUp,
    variant: 'outline',
  },
  {
    id: 'esg-analysis',
    label: 'Análisis ESG',
    description: 'Evaluación de sostenibilidad ambiental y social',
    icon: Leaf,
    variant: 'secondary',
    badge: 'ESG',
  },
  {
    id: 'diversification',
    label: 'Diversificación',
    description: 'Optimizar distribución geográfica y sectorial',
    icon: Globe,
    variant: 'outline',
  },
  {
    id: 'income-focus',
    label: 'Enfoque en Ingresos',
    description: 'Optimizar para dividendos y flujo de caja',
    icon: DollarSign,
    variant: 'secondary',
  },
];

export function ScenarioQuickButtons({
  onScenarioSelect,
  loading = false,
  className,
}: ScenarioQuickButtonsProps) {
  
  const handleScenarioClick = (scenarioId: string) => {
    if (loading) return;
    onScenarioSelect(scenarioId);
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Header */}
      <div className="flex items-center space-x-2">
        <BarChart3 className="h-5 w-5 text-primary" aria-hidden="true" />
        <h3 className="font-semibold text-lg">Escenarios de Análisis</h3>
        {loading && (
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <RefreshCw className="h-4 w-4 animate-spin" aria-hidden="true" />
            <span>Procesando...</span>
          </div>
        )}
      </div>
      
      <p className="text-sm text-muted-foreground">
        Selecciona un escenario para obtener análisis específicos de tu portafolio.
      </p>

      {/* Quick Action Buttons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {defaultScenarios.map((scenario) => {
          const Icon = scenario.icon;
          const isDisabled = loading || scenario.disabled;
          
          return (
            <Button
              key={scenario.id}
              variant={scenario.variant}
              onClick={() => handleScenarioClick(scenario.id)}
              disabled={isDisabled}
              className={cn(
                'h-auto p-4 flex-col items-start space-y-2 text-left relative transition-all duration-200',
                'hover:shadow-md hover:scale-105',
                isDisabled && 'opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-none',
                scenario.variant === 'default' && 'ai-gradient-bg text-white hover:opacity-90'
              )}
              aria-describedby={`${scenario.id}-description`}
            >
              {/* Badge */}
              {scenario.badge && (
                <Badge 
                  variant="outline" 
                  className={cn(
                    'absolute top-2 right-2 text-xs',
                    scenario.variant === 'default' && 'border-white/30 text-white bg-white/10'
                  )}
                >
                  {scenario.badge}
                </Badge>
              )}
              
              {/* Icon and Label */}
              <div className="flex items-center space-x-3 w-full">
                <div className={cn(
                  'p-2 rounded-lg',
                  scenario.variant === 'default' ? 'bg-white/20' : 'bg-primary/10'
                )}>
                  <Icon 
                    className={cn(
                      'h-5 w-5',
                      scenario.variant === 'default' ? 'text-white' : 'text-primary'
                    )} 
                    aria-hidden="true" 
                  />
                </div>
                <span className="font-semibold text-sm">{scenario.label}</span>
              </div>
              
              {/* Description */}
              <p 
                id={`${scenario.id}-description`}
                className={cn(
                  'text-xs leading-relaxed w-full text-left',
                  scenario.variant === 'default' ? 'text-white/90' : 'text-muted-foreground'
                )}
              >
                {scenario.description}
              </p>
              
              {/* Loading indicator for individual scenario */}
              {scenario.loading && (
                <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-lg">
                  <RefreshCw className="h-5 w-5 animate-spin text-primary" aria-hidden="true" />
                </div>
              )}
            </Button>
          );
        })}
      </div>

      {/* Custom Analysis Option */}
      <div className="pt-4 border-t border-border">
        <Button
          variant="outline"
          onClick={() => handleScenarioClick('custom-analysis')}
          disabled={loading}
          className="w-full justify-start space-x-2 h-auto p-4"
        >
          <div className="p-2 bg-secondary/10 rounded-lg">
            <BarChart3 className="h-5 w-5 text-secondary-600" aria-hidden="true" />
          </div>
          <div className="text-left">
            <div className="font-semibold text-sm">Análisis Personalizado</div>
            <p className="text-xs text-muted-foreground">
              Configura parámetros específicos para tu análisis
            </p>
          </div>
        </Button>
      </div>

      {/* Info Banner */}
      <div className="p-3 bg-surface-primary border border-border rounded-lg">
        <div className="flex items-start space-x-2">
          <Zap className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
          <div className="text-xs text-muted-foreground">
            <p className="font-medium mb-1">Powered by AI</p>
            <p>
              Los análisis utilizan inteligencia artificial para proporcionar insights 
              personalizados basados en tu perfil de riesgo y objetivos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}