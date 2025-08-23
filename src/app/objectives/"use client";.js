"use client";

import React, { useState, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle, Target, Shield, PiggyBank, TrendingUp, Info, Calculator, Landmark, PlusCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const strategicObjectives = [
  "Lanzar nuestra app AFORTU con análisis predictivo para darte insights únicos.",
  "Expandir nuestras opciones de inversión con portafolios alineados a criterios ESG (Ambientales, Sociales y de Gobernanza).",
  "Integrar tu Plan Personal de Retiro (PPR) con nuevas estrategias de aportación mensual para maximizar tu futuro.",
  "Mejorar tu experiencia con una bitácora de seguimiento optimizada para una visión 360° de tu cuenta."
];

const initialFinancialGoals = [
  {
    id: 'ppr',
    icon: Shield,
    title: "Plan Personal de Retiro (PPR)",
    description: "Construye hoy tu tranquilidad del mañana.",
    current: 450000,
    goal: 10000000,
    monthlyContribution: 5000,
    color: "from-primary to-primary/80"
  },
  {
    id: 'emergency',
    icon: PiggyBank,
    title: "Fondo de Emergencia",
    description: "Cubre 6 meses de vida sin preocupaciones.",
    current: 150000,
    goal: 300000,
    monthlyContribution: 2000,
    color: "from-teal-500 to-cyan-400"
  },
  {
    id: 'portfolio',
    icon: TrendingUp,
    title: "Crecimiento del Portafolio",
    description: "Rinde a tope tu patrimonio: meta 15% anual.",
    current: 12,
    goal: 15,
    isPercentage: true,
    color: "from-fuchsia-600 to-pink-500"
  }
];

const MOCK_PORTFOLIO_VALUE = 1261187.69;

// Utilidad para formato de moneda
const formatMoney = (amount: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(amount);


const FinancialGoalCard = ({ goal }: { goal: typeof initialFinancialGoals[0] }) => {
    const { toast } = useToast();
    const [extraContribution, setExtraContribution] = useState(10000);
    const [term, setTerm] = useState(5);

    const progress = goal.isPercentage
      ? (goal.current / goal.goal) * 100
      : (goal.current / goal.goal) * 100;

    const projectedGrowth = useMemo(() => {
        if (!extraContribution || !term) return 0;
        // Assuming a conservative 12% annual compound interest for simulation
        const annualRate = 0.12;
        return extraContribution * Math.pow((1 + annualRate), term);
    }, [extraContribution, term]);

    const handleMakeContribution = () => {
        toast({
            title: "Aportación Exitosa",
            description: `Se ha realizado tu aportación mensual de ${formatMoney(goal.monthlyContribution || 0)} a tu ${goal.title}.`,
        })
    }

    return (
        <Card className="shadow-md border-border/50 transition-all hover:border-primary/40 group flex flex-col h-full">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
                        <goal.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-grow">
                        <CardTitle>{goal.title}</CardTitle>
                        <CardDescription className="text-xs">{goal.description}</CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="flex-grow flex flex-col gap-4">
                <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                        {goal.isPercentage ? (
                            <span className="text-sm"><span className="font-bold text-2xl text-primary">{goal.current}%</span> / <span className="font-semibold text-muted-foreground">{goal.goal}%</span></span>
                        ) : (
                            <span className="text-sm">
                                <span className="font-bold text-2xl text-primary">{formatMoney(goal.current)}</span> /
                                <span className="font-semibold text-muted-foreground">{formatMoney(goal.goal)}</span>
                            </span>
                        )}
                        <span className="font-bold text-lg text-primary">{progress.toFixed(1)}%</span>
                    </div>
                    <Progress value={progress} className={`h-2 rounded-full [&>div]:bg-gradient-to-r ${goal.color}`} />
                </div>

                {goal.monthlyContribution !== undefined && (
                    <div className="mt-auto space-y-4">
                        {/* Aportación Mensual */}
                        <div className="bg-muted/40 p-3 rounded-lg border border-border/50">
                             <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-xs text-muted-foreground">Aportación Mensual Programada</p>
                                    <p className="font-bold text-lg">{formatMoney(goal.monthlyContribution)}</p>
                                </div>
                                <Button onClick={handleMakeContribution} className="h-9 px-4">Realizar Aportación</Button>
                            </div>
                        </div>
                        
                        {/* Simulador de Aportación Extraordinaria */}
                        <div className="bg-muted/40 p-3 rounded-lg border border-border/50">
                            <h5 className="font-semibold text-sm mb-2">Simulador de Aportación Extraordinaria</h5>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor={`extra-amount-${goal.id}`} className="text-xs">Monto a Aportar (MXN)</Label>
                                    <Input 
                                        id={`extra-amount-${goal.id}`}
                                        type="number" 
                                        value={extraContribution}
                                        onChange={(e) => setExtraContribution(parseFloat(e.target.value) || 0)}
                                        placeholder="10,000"
                                        className="h-9"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor={`term-${goal.id}`} className="text-xs">Plazo de Inversión</Label>
                                    <Select value={String(term)} onValueChange={(val) => setTerm(Number(val))}>
                                        <SelectTrigger id={`term-${goal.id}`} className="h-9">
                                            <SelectValue placeholder="Selecciona un plazo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">1 año</SelectItem>
                                            <SelectItem value="3">3 años</SelectItem>
                                            <SelectItem value="5">5 años</SelectItem>
                                            <SelectItem value="10">10 años</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                             <div className="text-center bg-background/50 text-primary p-3 rounded-md mt-3">
                                <p className="text-xs font-semibold text-muted-foreground">CRECIMIENTO ESTIMADO DE TU APORTACIÓN EXTRA</p>
                                <p className="text-2xl font-bold">{formatMoney(projectedGrowth)}</p>
                             </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};


export default function ObjectivesPage() {
  const [liquidityAmount, setLiquidityAmount] = useState(MOCK_PORTFOLIO_VALUE);

  const calculatedLiquidity = useMemo(() => liquidityAmount * 0.10, [liquidityAmount]);

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Sticky Header */}
      <header className="sticky top-[60px] z-10 bg-background/95 backdrop-blur-sm border-b -mx-6 px-6 py-4 mb-2">
        <div className="flex items-center gap-4">
          <Target className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">Objetivos y Metas</h1>
            <p className="text-muted-foreground">Tu mapa hacia la libertad financiera.</p>
          </div>
          <div className="ml-auto flex gap-2">
            <Button variant="outline" size="sm" className="rounded-full">Ver Reporte</Button>
            <Button variant="default" size="sm" className="rounded-full"><PlusCircle className="mr-2 h-4 w-4" />Nueva Meta</Button>
          </div>
        </div>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Financial Goals */}
        <div className="flex flex-col gap-6">
            {initialFinancialGoals.map((goal) => (
                <FinancialGoalCard key={goal.id} goal={goal} />
            ))}
        </div>

        {/* Liquidity and Strategic Objectives */}
        <div className="flex flex-col gap-8">
          {/* Liquidity Card */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Landmark className="h-5 w-5 text-primary" />
                Liquidez Estructurada
              </CardTitle>
              <CardDescription>Accede a liquidez sin desinvertir tu portafolio.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="space-y-2">
                    <Label htmlFor="portfolio-value">Valor Total del Portafolio (MXN)</Label>
                    <Input
                    id="portfolio-value"
                    type="number"
                    value={liquidityAmount}
                    onChange={e => setLiquidityAmount(parseFloat(e.target.value) || 0)}
                    />
                </div>
              <div className="flex gap-2 items-center text-sm">
                <Calculator className="h-4 w-4 text-primary" />
                <span>Liquidez disponible (10%):</span>
                <span className="text-lg font-bold text-primary">{formatMoney(calculatedLiquidity)}</span>
              </div>
              <div className="rounded-lg bg-accent/50 border border-border p-3 flex gap-3 items-start">
                <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-xs text-muted-foreground">
                  La liquidez estructurada es una herramienta poderosa para emergencias u oportunidades, pero debe usarse con responsabilidad. Consulta a tu asesor para evaluar si es la mejor opción.
                </p>
              </div>
              <Button className="w-full mt-2 rounded-full">Solicitar Liquidez</Button>
            </CardContent>
          </Card>

          {/* Strategic Objectives */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex gap-2 items-center">
                <TrendingUp className="h-5 w-5 text-primary" />
                Nuestras mejoras para ti
              </CardTitle>
              <CardDescription>Conoce las innovaciones que estamos implementando para potenciar tu experiencia.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {strategicObjectives.map((objective, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{objective}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
