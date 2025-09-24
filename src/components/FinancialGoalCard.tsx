import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface FinancialGoalCardProps {
  goal: {
    id: number;
    name: string;
    amount: number;
    progress: number;
    description: string;
  };
}

const FinancialGoalCard: React.FC<FinancialGoalCardProps> = ({ goal }) => {
  const percent = Math.min(100, Math.round((goal.progress / goal.amount) * 100));
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>{goal.name}</CardTitle>
        <CardDescription>{goal.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-2 text-sm text-muted-foreground">
          Meta: ${goal.amount.toLocaleString()}<br />
          Progreso: ${goal.progress.toLocaleString()} ({percent}%)
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-primary h-2.5 rounded-full"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialGoalCard;
