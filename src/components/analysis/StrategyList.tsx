/**
 * Strategy List Component
 * Displays and manages the list of investment strategies
 */

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { 
  CheckCircle2, 
  Circle, 
  MoreHorizontal, 
  Trash2, 
  Edit, 
  Target,
  TrendingUp,
  Shield,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { StrategyConfig } from '@/hooks/useStrategies';

export interface StrategyListProps {
  strategies: StrategyConfig[];
  activeStrategy?: StrategyConfig;
  onActivate: (strategyId: string) => void;
  onDeactivate: (strategyId: string) => void;
  onRemove: (strategyId: string) => void;
  onEdit?: (strategy: StrategyConfig) => void;
  className?: string;
}

// Helper function to get risk tolerance styling
const getRiskToleranceConfig = (riskTolerance: StrategyConfig['riskTolerance']) => {
  switch (riskTolerance) {
    case 'conservative':
      return {
        label: 'Conservador',
        color: 'text-success-700',
        bgColor: 'bg-success-100',
        icon: Shield,
      };
    case 'moderate':
      return {
        label: 'Moderado',
        color: 'text-warning-700',
        bgColor: 'bg-warning-100',
        icon: TrendingUp,
      };
    case 'aggressive':
      return {
        label: 'Agresivo',
        color: 'text-error-700',
        bgColor: 'bg-error-100',
        icon: TrendingUp,
      };
    default:
      return {
        label: 'Moderado',
        color: 'text-warning-700',
        bgColor: 'bg-warning-100',
        icon: TrendingUp,
      };
  }
};

// Helper function to get time horizon label
const getTimeHorizonLabel = (timeHorizon: StrategyConfig['timeHorizon']) => {
  switch (timeHorizon) {
    case 'short':
      return 'Corto plazo';
    case 'medium':
      return 'Mediano plazo';
    case 'long':
      return 'Largo plazo';
    default:
      return 'Mediano plazo';
  }
};

export function StrategyList({
  strategies,
  activeStrategy,
  onActivate,
  onDeactivate,
  onRemove,
  onEdit,
  className,
}: StrategyListProps) {
  // State for delete confirmation dialog
  const [strategyToDelete, setStrategyToDelete] = useState<StrategyConfig | null>(null);

  // Handle strategy activation toggle
  const handleToggleActivation = (strategy: StrategyConfig) => {
    if (strategy.isActive) {
      onDeactivate(strategy.id);
    } else {
      onActivate(strategy.id);
    }
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (strategyToDelete) {
      onRemove(strategyToDelete.id);
      setStrategyToDelete(null);
    }
  };

  // Handle delete cancel
  const handleDeleteCancel = () => {
    setStrategyToDelete(null);
  };

  if (strategies.length === 0) {
    return (
      <Card className={cn('fade-in', className)}>
        <CardContent className="p-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
              <Target className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">No hay estrategias</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Crea tu primera estrategia de inversión para comenzar a analizar tu portafolio.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className={cn('fade-in', className)}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-primary" aria-hidden="true" />
            <span>Estrategias de Inversión</span>
            <Badge variant="outline" className="ml-auto">
              {strategies.length} estrategia{strategies.length !== 1 ? 's' : ''}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {strategies.map((strategy) => {
            const isActive = strategy.isActive;
            const riskConfig = getRiskToleranceConfig(strategy.riskTolerance);
            const RiskIcon = riskConfig.icon;
            
            return (
              <div
                key={strategy.id}
                className={cn(
                  'rounded-lg border p-4 transition-all duration-200',
                  isActive 
                    ? 'border-primary/50 bg-primary/5 shadow-sm' 
                    : 'border-border hover:border-primary/30 hover:bg-surface-primary'
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    {/* Activation Toggle */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleActivation(strategy)}
                      className={cn(
                        'h-8 w-8 p-0 rounded-full',
                        isActive && 'text-primary hover:text-primary/80'
                      )}
                      aria-label={isActive ? 'Desactivar estrategia' : 'Activar estrategia'}
                    >
                      {isActive ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <Circle className="h-5 w-5" />
                      )}
                    </Button>

                    {/* Strategy Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className={cn(
                          'font-semibold text-sm truncate',
                          isActive && 'text-primary'
                        )}>
                          {strategy.name}
                        </h4>
                        {isActive && (
                          <Badge variant="default" className="text-xs px-2 py-0.5">
                            Activa
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {strategy.description}
                      </p>

                      {/* Strategy attributes */}
                      <div className="flex items-center space-x-4 text-xs">
                        {/* Risk tolerance */}
                        <div className="flex items-center space-x-1">
                          <div className={cn(
                            'p-1 rounded',
                            riskConfig.bgColor
                          )}>
                            <RiskIcon className={cn('h-3 w-3', riskConfig.color)} />
                          </div>
                          <span className={riskConfig.color}>
                            {riskConfig.label}
                          </span>
                        </div>

                        {/* Time horizon */}
                        <div className="flex items-center space-x-1 text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{getTimeHorizonLabel(strategy.timeHorizon)}</span>
                        </div>

                        {/* Focus areas count */}
                        <div className="text-muted-foreground">
                          {strategy.focusAreas.length} área{strategy.focusAreas.length !== 1 ? 's' : ''}
                        </div>
                      </div>

                      {/* Focus areas preview */}
                      {strategy.focusAreas.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {strategy.focusAreas.slice(0, 3).map((area) => (
                            <Badge
                              key={area}
                              variant="outline"
                              className="text-xs px-1.5 py-0.5 h-auto"
                            >
                              {area}
                            </Badge>
                          ))}
                          {strategy.focusAreas.length > 3 && (
                            <Badge
                              variant="outline"
                              className="text-xs px-1.5 py-0.5 h-auto text-muted-foreground"
                            >
                              +{strategy.focusAreas.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        aria-label="Opciones de estrategia"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleToggleActivation(strategy)}
                        className="cursor-pointer"
                      >
                        {isActive ? (
                          <>
                            <Circle className="h-4 w-4 mr-2" />
                            Desactivar
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Activar
                          </>
                        )}
                      </DropdownMenuItem>
                      
                      {onEdit && (
                        <DropdownMenuItem
                          onClick={() => onEdit(strategy)}
                          className="cursor-pointer"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                      )}
                      
                      <DropdownMenuSeparator />
                      
                      <DropdownMenuItem
                        onClick={() => setStrategyToDelete(strategy)}
                        className="cursor-pointer text-error-600 focus:text-error-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Created/Updated info */}
                <div className="mt-3 pt-3 border-t border-border/50 text-xs text-muted-foreground">
                  Creada: {strategy.createdAt.toLocaleDateString('es-ES')}
                  {strategy.updatedAt.getTime() !== strategy.createdAt.getTime() && (
                    <span className="ml-4">
                      Actualizada: {strategy.updatedAt.toLocaleDateString('es-ES')}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!strategyToDelete} onOpenChange={() => setStrategyToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar estrategia?</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que quieres eliminar la estrategia &quot;{strategyToDelete?.name}&quot;? 
              Esta acción no se puede deshacer.
              {strategyToDelete?.isActive && (
                <span className="block mt-2 text-warning-600 font-medium">
                  Esta estrategia está actualmente activa.
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDeleteCancel}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-error-600 hover:bg-error-700 text-white"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}