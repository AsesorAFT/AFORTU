'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { PremiumCard } from '@/components/ui/premium-card';
import { LoadingSpinner, SkeletonDashboard } from '@/components/ui/skeleton';
import { fortuneColors } from '@/lib/theme/colors';
import {
  ArrowUpRight,
  Building,
  CalendarClock,
  CheckCircle2,
  FileText,
  Flag,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  Sparkles,
} from 'lucide-react';

const kpis = [
  {
    label: 'Valor patrimonial',
    value: '$48.2M',
    currency: 'MXN',
    trend: '+4.3%',
    trendLabel: 'este mes',
    isPositive: true,
    icon: TrendingUp,
  },
  {
    label: 'Liquidez disponible',
    value: '$6.4M',
    currency: 'MXN',
    trend: '82%',
    trendLabel: 'Objetivo cubierto',
    isPositive: true,
    icon: Sparkles,
  },
  {
    label: 'Riesgo agregado',
    value: 'Moderado',
    currency: '',
    trend: '7.9%',
    trendLabel: 'Volatilidad anualizada',
    isPositive: true,
    icon: ShieldCheck,
  },
];

const objectives = [
  {
    name: 'Preservar capital familiar',
    progress: 78,
    deadline: 'Dic 2025',
    status: 'En curso',
  },
  {
    name: 'Expandir holding inmobiliario',
    progress: 52,
    deadline: 'Jun 2026',
    status: 'Explorando oportunidades',
  },
  {
    name: 'Fondo de becas familiares',
    progress: 34,
    deadline: 'Ene 2027',
    status: 'Diseño de fideicomiso',
  },
];

const recommendations = [
  {
    title: 'Rebalanceo táctico',
    description:
      'Reduce 5% exposición a renta variable US y migra a deuda corporativa grado de inversión MX para mantener el perfil moderado.',
    impact: 'Impacto estimado: -0.7% volatilidad',
    priority: 'high',
  },
  {
    title: 'Blindaje fiscal',
    description:
      'Activa la estructura holding en España antes del cierre trimestral para aprovechar el convenio de doble tributación.',
    impact: 'Recomendado por mesa fiscal AFORTU',
    priority: 'medium',
  },
  {
    title: 'Gobierno corporativo',
    description:
      'Agenda comité familiar extraordinario para actualizar protocolo de sucesión conforme a nueva incorporación accionaria.',
    impact: 'Propuesto por asesor jurídico',
    priority: 'low',
  },
];

const timeline = [
  {
    title: 'Comité de inversión',
    description: 'Revisión trimestral con estrategas AFORTU PRO',
    date: '11 marzo · 10:00 h',
    icon: CalendarClock,
  },
  {
    title: 'Entrega de reporte fiscal',
    description: 'Resumen multi-país + documentación CFDI',
    date: '18 marzo · 13:00 h',
    icon: FileText,
  },
  {
    title: 'Workshop sucesión',
    description: 'Sesión con familia y notario asignado',
    date: '27 marzo · 17:00 h',
    icon: Building,
  },
];

export default function DashboardPagePremium() {
  const [isLoading, setIsLoading] = useState(false);

  // Memoize calculations
  const totalProgress = useMemo(() => {
    return Math.round(objectives.reduce((sum, obj) => sum + obj.progress, 0) / objectives.length);
  }, []);

  if (isLoading) {
    return <SkeletonDashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="space-y-8 p-6 lg:p-10">
        {/* Hero Section con Glassmorphism */}
        <section className="relative overflow-hidden rounded-3xl">
          {/* Gradient Background */}
          <div 
            className="absolute inset-0 opacity-90"
            style={{
              background: fortuneColors.gradients.luxuryDark,
            }}
          />
          
          {/* Glass overlay */}
          <div className="relative backdrop-blur-xl">
            <div className="flex flex-col gap-6 p-8 lg:flex-row lg:items-center lg:justify-between lg:p-12">
              <div className="animate-fade-in-up">
                <Badge 
                  className="mb-4 text-sm font-semibold shadow-lg"
                  style={{
                    backgroundColor: fortuneColors.primary.gold,
                    color: fortuneColors.luxury.charcoal,
                  }}
                >
                  <Sparkles className="mr-1 h-3 w-3" />
                  Cuenta PRO
                </Badge>
                <h1 className="text-4xl font-bold text-white lg:text-5xl">
                  Bienvenido de nuevo
                </h1>
                <p className="mt-3 max-w-2xl text-lg text-slate-200">
                  Tu vista consolidada de patrimonio. Datos actualizados cada 15 minutos.
                </p>
              </div>
              <Button 
                className="self-start shadow-2xl transition-all hover:scale-105"
                style={{
                  backgroundColor: fortuneColors.primary.gold,
                  color: fortuneColors.luxury.charcoal,
                }}
                size="lg"
              >
                Ver reporte mensual
                <ArrowUpRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-blue-500/20 to-transparent blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-gradient-to-br from-yellow-500/20 to-transparent blur-3xl" />
        </section>

        {/* KPIs Grid con animaciones */}
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {kpis.map((kpi, index) => (
            <PremiumCard 
              key={kpi.label} 
              variant="glass"
              hover
              className="animate-scale-in"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                    {kpi.label}
                  </p>
                  <div className="mt-3 flex items-baseline gap-2">
                    <h2 
                      className="text-4xl font-extrabold"
                      style={{ color: fortuneColors.luxury.charcoal }}
                    >
                      {kpi.value}
                    </h2>
                    {kpi.currency && (
                      <span className="text-lg font-medium text-slate-500">
                        {kpi.currency}
                      </span>
                    )}
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <span 
                      className="flex items-center gap-1 text-sm font-semibold"
                      style={{ 
                        color: kpi.isPositive 
                          ? fortuneColors.accent.emerald 
                          : fortuneColors.accent.ruby 
                      }}
                    >
                      {kpi.isPositive ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      {kpi.trend}
                    </span>
                    <span className="text-sm text-slate-600">{kpi.trendLabel}</span>
                  </div>
                </div>
                <div 
                  className="rounded-xl p-3 shadow-lg"
                  style={{
                    backgroundColor: `${fortuneColors.primary.gold}20`,
                  }}
                >
                  <kpi.icon 
                    className="h-6 w-6"
                    style={{ color: fortuneColors.primary.darkGold }}
                  />
                </div>
              </div>
            </PremiumCard>
          ))}
        </section>

        {/* Main Content Grid */}
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Objetivos Estratégicos */}
          <PremiumCard variant="elevated" hover={false}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle 
                    className="text-2xl font-bold"
                    style={{ color: fortuneColors.luxury.charcoal }}
                  >
                    Objetivos estratégicos
                  </CardTitle>
                  <CardDescription className="mt-2 text-slate-600">
                    Seguimiento de tus metas con tu asesor AFORTU
                  </CardDescription>
                </div>
                <Badge 
                  variant="outline"
                  style={{
                    borderColor: fortuneColors.primary.gold,
                    color: fortuneColors.primary.darkGold,
                  }}
                >
                  {totalProgress}% promedio
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {objectives.map((objective, index) => (
                <div 
                  key={objective.name} 
                  className="space-y-3 rounded-xl border bg-gradient-to-br from-white to-slate-50/50 p-5 shadow-sm transition-all hover:shadow-md"
                  style={{
                    borderColor: `${fortuneColors.primary.gold}30`,
                  }}
                >
                  <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <p 
                        className="text-lg font-semibold"
                        style={{ color: fortuneColors.luxury.charcoal }}
                      >
                        {objective.name}
                      </p>
                      <p className="text-sm text-slate-500">
                        {objective.status} · Hito {objective.deadline}
                      </p>
                    </div>
                    <Badge 
                      style={{
                        backgroundColor: `${fortuneColors.primary.gold}20`,
                        color: fortuneColors.primary.darkGold,
                      }}
                    >
                      {objective.progress}% avance
                    </Badge>
                  </div>
                  <div className="relative">
                    <Progress 
                      value={objective.progress} 
                      className="h-2.5"
                      style={{
                        backgroundColor: `${fortuneColors.neutral[200]}`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </PremiumCard>

          {/* Recomendaciones */}
          <PremiumCard variant="gold" hover={false}>
            <CardHeader className="pb-4">
              <CardTitle 
                className="text-2xl font-bold"
                style={{ color: fortuneColors.luxury.charcoal }}
              >
                Recomendaciones
              </CardTitle>
              <CardDescription className="text-slate-600">
                Insights generados por IA y validados por expertos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendations.map((item) => (
                <div 
                  key={item.title} 
                  className="rounded-xl border bg-white/80 p-4 backdrop-blur-sm transition-all hover:shadow-md"
                  style={{
                    borderColor: `${fortuneColors.primary.gold}40`,
                  }}
                >
                  <div className="flex items-start gap-2">
                    <div 
                      className="mt-0.5 h-2 w-2 rounded-full"
                      style={{
                        backgroundColor: 
                          item.priority === 'high' 
                            ? fortuneColors.accent.ruby
                            : item.priority === 'medium'
                            ? fortuneColors.accent.topaz
                            : fortuneColors.accent.sapphire,
                      }}
                    />
                    <div className="flex-1">
                      <p 
                        className="font-semibold"
                        style={{ color: fortuneColors.luxury.charcoal }}
                      >
                        {item.title}
                      </p>
                      <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                      <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        {item.impact}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </PremiumCard>
        </section>

        {/* Timeline y Checklist */}
        <section className="grid gap-6 lg:grid-cols-2">
          {/* Próximos Hitos */}
          <PremiumCard variant="glass">
            <CardHeader>
              <CardTitle 
                className="text-2xl font-bold"
                style={{ color: fortuneColors.luxury.charcoal }}
              >
                Próximos hitos
              </CardTitle>
              <CardDescription>
                Mantén al equipo sincronizado
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {timeline.map((event, index) => (
                <div 
                  key={event.title} 
                  className="flex items-start gap-4 rounded-xl border bg-white/60 p-4 backdrop-blur-sm transition-all hover:bg-white/80"
                  style={{
                    borderColor: `${fortuneColors.primary.gold}30`,
                  }}
                >
                  <div 
                    className="rounded-lg p-2.5"
                    style={{
                      backgroundColor: `${fortuneColors.primary.gold}20`,
                    }}
                  >
                    <event.icon 
                      className="h-5 w-5"
                      style={{ color: fortuneColors.primary.darkGold }}
                    />
                  </div>
                  <div className="flex-1">
                    <p 
                      className="font-semibold"
                      style={{ color: fortuneColors.luxury.charcoal }}
                    >
                      {event.title}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">{event.description}</p>
                    <p className="mt-2 text-xs font-medium text-slate-500">{event.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </PremiumCard>

          {/* Checklist */}
          <PremiumCard variant="elevated">
            <CardHeader>
              <CardTitle 
                className="text-2xl font-bold"
                style={{ color: fortuneColors.luxury.charcoal }}
              >
                Checklist de cumplimiento
              </CardTitle>
              <CardDescription>
                Mantén el blindaje legal activo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 rounded-xl border bg-gradient-to-br from-emerald-50/50 to-white p-4">
                <CheckCircle2 
                  className="mt-1 h-5 w-5"
                  style={{ color: fortuneColors.accent.emerald }}
                />
                <div className="flex-1">
                  <p 
                    className="text-sm font-semibold"
                    style={{ color: fortuneColors.luxury.charcoal }}
                  >
                    Validar KYC de socios internacionales
                  </p>
                  <p className="text-xs text-slate-500">Última actualización hace 12 días</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border bg-gradient-to-br from-amber-50/50 to-white p-4">
                <ShieldCheck 
                  className="mt-1 h-5 w-5"
                  style={{ color: fortuneColors.accent.topaz }}
                />
                <div className="flex-1">
                  <p 
                    className="text-sm font-semibold"
                    style={{ color: fortuneColors.luxury.charcoal }}
                  >
                    Actualizar pólizas de seguro patrimonial
                  </p>
                  <p className="text-xs text-slate-500">Vencen en 28 días</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border bg-gradient-to-br from-blue-50/50 to-white p-4">
                <Flag 
                  className="mt-1 h-5 w-5"
                  style={{ color: fortuneColors.accent.sapphire }}
                />
                <div className="flex-1">
                  <p 
                    className="text-sm font-semibold"
                    style={{ color: fortuneColors.luxury.charcoal }}
                  >
                    Confirmar onboarding de entidad en Delaware
                  </p>
                  <p className="text-xs text-slate-500">Documentación pendiente</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full transition-all hover:scale-[1.02]"
                style={{
                  borderColor: fortuneColors.primary.gold,
                  color: fortuneColors.luxury.charcoal,
                }}
              >
                Ver checklist completo
              </Button>
            </CardContent>
          </PremiumCard>
        </section>
      </div>
    </div>
  );
}
