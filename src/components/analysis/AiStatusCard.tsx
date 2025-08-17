/**
 * AI Status Card Component
 * Shows the current status of the AI analysis engine
 */

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, Zap, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AiStatusCardProps {
  status: 'idle' | 'processing' | 'completed' | 'error';
  lastAnalysis?: Date;
  analysisCount?: number;
  error?: string | null;
  className?: string;
}

const statusConfig = {
  idle: {
    icon: Bot,
    label: 'Listo',
    description: 'El motor de análisis está listo para procesar',
    badgeVariant: 'secondary' as const,
    iconColor: 'text-muted-foreground',
  },
  processing: {
    icon: Zap,
    label: 'Analizando',
    description: 'Procesando datos del portafolio...',
    badgeVariant: 'default' as const,
    iconColor: 'text-primary animate-pulse',
  },
  completed: {
    icon: CheckCircle,
    label: 'Completado',
    description: 'Análisis completado exitosamente',
    badgeVariant: 'default' as const,
    iconColor: 'text-success-600',
  },
  error: {
    icon: AlertCircle,
    label: 'Error',
    description: 'Error en el análisis',
    badgeVariant: 'destructive' as const,
    iconColor: 'text-error-600',
  },
};

export function AiStatusCard({
  status,
  lastAnalysis,
  analysisCount = 0,
  error,
  className,
}: AiStatusCardProps) {
  const config = statusConfig[status];
  const StatusIcon = config.icon;

  const formatLastAnalysis = (date: Date) => {
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffMinutes < 1) {
      return 'Hace menos de un minuto';
    } else if (diffMinutes === 1) {
      return 'Hace 1 minuto';
    } else if (diffMinutes < 60) {
      return `Hace ${diffMinutes} minutos`;
    } else {
      const diffHours = Math.floor(diffMinutes / 60);
      if (diffHours === 1) {
        return 'Hace 1 hora';
      } else if (diffHours < 24) {
        return `Hace ${diffHours} horas`;
      } else {
        const diffDays = Math.floor(diffHours / 24);
        return `Hace ${diffDays} día${diffDays > 1 ? 's' : ''}`;
      }
    }
  };

  return (
    <Card className={cn(
      'transition-all duration-300 hover:shadow-lg',
      status === 'processing' && 'border-primary/50 shadow-md',
      status === 'error' && 'border-error-200',
      className
    )}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full',
              status === 'processing' && 'ai-gradient-bg',
              status !== 'processing' && 'bg-secondary/10'
            )}>
              <StatusIcon 
                className={cn(
                  'h-5 w-5',
                  status === 'processing' ? 'text-white' : config.iconColor
                )}
                aria-hidden="true"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-sm">Motor de Análisis IA</h3>
                <Badge variant={config.badgeVariant} className="text-xs">
                  {config.label}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {status === 'error' && error ? error : config.description}
              </p>
            </div>
          </div>
          
          {/* Analysis metrics */}
          <div className="text-right text-xs text-muted-foreground space-y-1">
            {analysisCount > 0 && (
              <div>
                {analysisCount} análisis
              </div>
            )}
            {lastAnalysis && status !== 'processing' && (
              <div>
                {formatLastAnalysis(lastAnalysis)}
              </div>
            )}
            {status === 'processing' && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}