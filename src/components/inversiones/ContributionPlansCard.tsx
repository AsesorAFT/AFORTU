'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { formatCurrency, formatDate } from '@/lib/formatters';
import { Target, Calendar, TrendingUp, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import React from 'react';

interface ContributionPlan {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  monthlyContribution: number;
  startDate: string;
  targetDate: string;
  status: 'active' | 'paused' | 'completed' | 'behind';
  category: 'retirement' | 'emergency' | 'education' | 'investment' | 'other';
}

interface ContributionPlansCardProps {
  plans: ContributionPlan[];
  className?: string;
}

const categoryLabels = {
  retirement: 'Jubilación',
  emergency: 'Emergencia',
  education: 'Educación',
  investment: 'Inversión',
  other: 'Otros'
};

const statusConfig = {
  active: {
    label: 'Activo',
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    icon: CheckCircle
  },
  paused: {
    label: 'Pausado',
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    icon: Clock
  },
  completed: {
    label: 'Completado',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    icon: CheckCircle
  },
  behind: {
    label: 'Atrasado',
    color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    icon: AlertCircle
  }
};

export function ContributionPlansCard({ plans, className }: ContributionPlansCardProps) {
  const activePlans = plans.filter(plan => plan.status === 'active');
  const totalTarget = plans.reduce((sum, plan) => sum + plan.targetAmount, 0);
  const totalCurrent = plans.reduce((sum, plan) => sum + plan.currentAmount, 0);
  const totalMonthly = activePlans.reduce((sum, plan) => sum + plan.monthlyContribution, 0);
  const overallProgress = totalTarget > 0 ? (totalCurrent / totalTarget) * 100 : 0;

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Target className="h-5 w-5 text-muted-foreground" />
              Planes de Aportación
            </CardTitle>
            <CardDescription>
              Ahorro programado para objetivos específicos
            </CardDescription>
          </div>
          <Badge variant="secondary" className="text-xs">
            {plans.length} {plans.length === 1 ? 'plan' : 'planes'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Total Ahorrado</p>
            <p className="text-lg font-semibold">{formatCurrency(totalCurrent)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Objetivo Total</p>
            <p className="text-lg font-semibold">{formatCurrency(totalTarget)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Aportación Mensual</p>
            <p className="text-lg font-semibold text-primary">
              {formatCurrency(totalMonthly)}
            </p>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Progreso General</p>
            <p className="text-sm text-muted-foreground">
              {overallProgress.toFixed(1)}%
            </p>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary rounded-full h-2 transition-all duration-300"
              style={{ width: `${Math.min(overallProgress, 100)}%` }}
            />
          </div>
        </div>

        {/* Individual Plans */}
        {plans.length > 0 ? (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Planes Individuales</h4>
            {plans.slice(0, 4).map((plan) => {
              const progress = plan.targetAmount > 0 ? (plan.currentAmount / plan.targetAmount) * 100 : 0;
              const StatusIcon = statusConfig[plan.status].icon;
              
              // Calculate estimated completion date based on current monthly contribution
              const remainingAmount = Math.max(0, plan.targetAmount - plan.currentAmount);
              const monthsToComplete = plan.monthlyContribution > 0 ? Math.ceil(remainingAmount / plan.monthlyContribution) : 0;
              
              return (
                <div key={plan.id} className="p-3 bg-muted/30 rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{plan.name}</p>
                        <Badge 
                          variant="secondary" 
                          className={cn("text-xs", statusConfig[plan.status].color)}
                        >
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusConfig[plan.status].label}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {categoryLabels[plan.category]}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="text-muted-foreground">Ahorrado</p>
                      <p className="font-medium">{formatCurrency(plan.currentAmount)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Objetivo</p>
                      <p className="font-medium">{formatCurrency(plan.targetAmount)}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Progreso</span>
                      <span className="font-medium">{progress.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div 
                        className={cn(
                          "rounded-full h-1.5 transition-all duration-300",
                          progress >= 100 ? "bg-green-500" : "bg-primary"
                        )}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>Meta: {formatDate(plan.targetDate, 'short')}</span>
                    </div>
                    {plan.status === 'active' && monthsToComplete > 0 && (
                      <span className="text-muted-foreground">
                        ~{monthsToComplete} meses restantes
                      </span>
                    )}
                  </div>

                  {plan.status === 'active' && (
                    <div className="pt-2 border-t border-muted">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <TrendingUp className="h-3 w-3" />
                        <span>Aportación mensual: {formatCurrency(plan.monthlyContribution)}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            
            {plans.length > 4 && (
              <p className="text-xs text-muted-foreground text-center py-2">
                Y {plans.length - 4} planes más...
              </p>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Target className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No hay planes de aportación configurados</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}