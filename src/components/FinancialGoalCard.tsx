import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Target, DollarSign, TrendingUp } from 'lucide-react';

interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  description?: string;
  category?: string;
}

interface FinancialGoalCardProps {
  goal: FinancialGoal;
  onEdit?: (goal: FinancialGoal) => void;
  onDelete?: (goalId: string) => void;
}

export default function FinancialGoalCard({ goal, onEdit, onDelete }: FinancialGoalCardProps) {
  const progress = (goal.currentAmount / goal.targetAmount) * 100;
  const remaining = goal.targetAmount - goal.currentAmount;

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Target className="h-4 w-4 text-blue-600" />
          {goal.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progreso</span>
              <span className="font-medium">{progress.toFixed(1)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Amounts */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Actual</p>
              <p className="font-medium text-green-600">
                ${goal.currentAmount.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Meta</p>
              <p className="font-medium">
                ${goal.targetAmount.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Remaining */}
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="h-4 w-4 text-orange-500" />
            <span className="text-muted-foreground">
              Faltan: <span className="font-medium">${remaining.toLocaleString()}</span>
            </span>
          </div>

          {/* Deadline */}
          <div className="text-sm">
            <p className="text-muted-foreground">
              Fecha límite: <span className="font-medium">{new Date(goal.deadline).toLocaleDateString()}</span>
            </p>
          </div>

          {/* Description */}
          {goal.description && (
            <p className="text-sm text-muted-foreground">{goal.description}</p>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(goal)}
                className="flex-1"
              >
                <TrendingUp className="h-4 w-4 mr-1" />
                Actualizar
              </Button>
            )}
            {onDelete && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(goal.id)}
                className="text-red-600 hover:text-red-700"
              >
                Eliminar
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}