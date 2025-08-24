'use client';

import React from 'react';
import { Target, Calculator, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import dynamic from 'next/dynamic';

// Importación dinámica del componente de meta financiera
const FinancialGoalCard = dynamic(() => import('@/components/FinancialGoalCard'), {
  loading: () => <div>Cargando meta...</div>,
  ssr: false,
});

const initialFinancialGoals = [
  {
    id: '1',
    name: 'Fondo de emergencia',
    amount: 10000,
    progress: 3500,
    description: 'Ahorro para imprevistos',
    targetAmount: 10000,
    currentAmount: 3500,
    deadline: '2024-12-31',
  },
  {
    id: '2',
    name: 'Viaje a Japón',
    amount: 5000,
    progress: 1200,
    description: 'Vacaciones soñadas',
    targetAmount: 5000,
    currentAmount: 1200,
    deadline: '2025-06-30',
  },
];

export default function FinancialGoalsPage() {
  // Aquí puedes agregar state y lógica para metas, aportaciones, etc.

  return (
    <div className="flex flex-col gap-8 pb-12">
      <header className="sticky top-[60px] z-10 bg-[hsl(var(--background))]/95 border-b -mx-6 px-6 py-4 mb-2">
        <div className="flex items-center gap-4">
          <Target className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Tus metas financieras</h1>
            <p className="text-muted-foreground">Administra, simula y cumple tus metas.</p>
          </div>
          <div className="ml-auto flex gap-2">
            <Button variant="outline" size="sm" className="rounded-full">Ver Reporte</Button>
            <Button variant="default" size="sm" className="rounded-full">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nueva Meta
            </Button>
          </div>
        </div>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        {/* SOLO metas financieras del usuario */}
        <div className="flex flex-col gap-6">
          {initialFinancialGoals.map(goal => (
            <FinancialGoalCard key={goal.id} goal={goal} />
          ))}
        </div>
        {/* Simulador o acciones relacionadas */}
        <div className="flex flex-col gap-8">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Simulador de liquidez
              </CardTitle>
              <CardDescription>
                ¿Cuánta liquidez puedes obtener sin desinvertir?
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Simulador aquí, relacionado con las metas */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}