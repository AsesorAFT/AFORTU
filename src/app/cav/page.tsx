'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PremiumCard } from '@/components/ui/premium-card';
import { StatCard } from '@/components/ui/stat-card';
import { fortuneColors } from '@/lib/theme/colors';
import {
  TrendingUp,
  Clock,
  DollarSign,
  Calendar,
  FileText,
  Download,
  Plus,
  ArrowUpRight,
  AlertCircle,
  CheckCircle2,
  CircleDot,
} from 'lucide-react';

// Datos de ejemplo de contratos CAV
const cavContracts = [
  {
    id: 'CAV-001',
    title: 'Renta Fija Gobierno MX',
    amount: 5000000,
    currency: 'MXN',
    apr: 12.5,
    startDate: '2024-01-15',
    endDate: '2025-01-15',
    daysRemaining: 88,
    status: 'active',
    returns: 625000,
  },
  {
    id: 'CAV-002',
    title: 'Deuda Corporativa AAA',
    amount: 3500000,
    currency: 'MXN',
    apr: 10.8,
    startDate: '2024-03-01',
    endDate: '2025-03-01',
    daysRemaining: 134,
    status: 'active',
    returns: 378000,
  },
  {
    id: 'CAV-003',
    title: 'Bonos Gubernamentales USD',
    amount: 250000,
    currency: 'USD',
    apr: 8.5,
    startDate: '2024-06-01',
    endDate: '2025-06-01',
    daysRemaining: 226,
    status: 'active',
    returns: 21250,
  },
  {
    id: 'CAV-004',
    title: 'Cetes 28 días',
    amount: 2000000,
    currency: 'MXN',
    apr: 11.2,
    startDate: '2024-09-15',
    endDate: '2024-10-13',
    daysRemaining: -6,
    status: 'completed',
    returns: 224000,
  },
];

const portfolioSummary = {
  totalInvested: 10750000,
  totalReturns: 1248250,
  avgAPR: 10.75,
  activeContracts: 3,
  completedContracts: 1,
  nextMaturity: 88,
};

export default function CAVPage() {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredContracts = useMemo(() => {
    if (filter === 'all') return cavContracts;
    return cavContracts.filter((c) => c.status === filter);
  }, [filter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return fortuneColors.accent.emerald;
      case 'completed':
        return fortuneColors.neutral[500];
      default:
        return fortuneColors.accent.ruby;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Activo';
      case 'completed':
        return 'Completado';
      default:
        return 'Pendiente';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="space-y-8 p-6 lg:p-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl">
          <div
            className="absolute inset-0 opacity-90"
            style={{
              background: fortuneColors.gradients.luxuryDark,
            }}
          />

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
                  <TrendingUp className="mr-1 h-3 w-3" />
                  CAV Premium
                </Badge>
                <h1 className="text-4xl font-bold text-white lg:text-5xl">
                  Contratos a Vencimiento
                </h1>
                <p className="mt-3 max-w-2xl text-lg text-slate-200">
                  Gestión profesional de tus contratos cerrados con tasa APR garantizada
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
                <Plus className="mr-2 h-5 w-5" />
                Nuevo Contrato
              </Button>
            </div>
          </div>

          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-blue-500/20 to-transparent blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-gradient-to-br from-yellow-500/20 to-transparent blur-3xl" />
        </section>

        {/* Resumen de Portfolio */}
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Capital Invertido"
            value={portfolioSummary.totalInvested}
            format="currency"
            currency="MXN"
            icon={<DollarSign className="h-6 w-6" />}
          />
          <StatCard
            title="Rendimientos Totales"
            value={portfolioSummary.totalReturns}
            format="currency"
            currency="MXN"
            trend={{
              value: portfolioSummary.avgAPR,
              label: 'APR promedio',
              isPositive: true,
            }}
            icon={<TrendingUp className="h-6 w-6" />}
          />
          <StatCard
            title="Contratos Activos"
            value={portfolioSummary.activeContracts}
            format="number"
            icon={<CheckCircle2 className="h-6 w-6" />}
          />
          <StatCard
            title="Próximo Vencimiento"
            value={portfolioSummary.nextMaturity}
            format="number"
            trend={{
              value: portfolioSummary.nextMaturity,
              label: 'días restantes',
              isPositive: true,
            }}
            icon={<Clock className="h-6 w-6" />}
          />
        </section>

        {/* Filtros */}
        <PremiumCard variant="glass">
          <div className="flex items-center justify-between">
            <div>
              <h2
                className="text-2xl font-bold"
                style={{ color: fortuneColors.luxury.charcoal }}
              >
                Mis Contratos
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                {filteredContracts.length} contrato(s) encontrado(s)
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
                style={
                  filter === 'all'
                    ? {
                        backgroundColor: fortuneColors.primary.gold,
                        color: fortuneColors.luxury.charcoal,
                      }
                    : {}
                }
              >
                Todos
              </Button>
              <Button
                variant={filter === 'active' ? 'default' : 'outline'}
                onClick={() => setFilter('active')}
                style={
                  filter === 'active'
                    ? {
                        backgroundColor: fortuneColors.primary.gold,
                        color: fortuneColors.luxury.charcoal,
                      }
                    : {}
                }
              >
                Activos
              </Button>
              <Button
                variant={filter === 'completed' ? 'default' : 'outline'}
                onClick={() => setFilter('completed')}
                style={
                  filter === 'completed'
                    ? {
                        backgroundColor: fortuneColors.primary.gold,
                        color: fortuneColors.luxury.charcoal,
                      }
                    : {}
                }
              >
                Completados
              </Button>
            </div>
          </div>
        </PremiumCard>

        {/* Lista de Contratos */}
        <section className="grid gap-6 lg:grid-cols-2">
          {filteredContracts.map((contract) => (
            <PremiumCard key={contract.id} variant="elevated" hover>
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3
                        className="text-lg font-bold"
                        style={{ color: fortuneColors.luxury.charcoal }}
                      >
                        {contract.title}
                      </h3>
                      <Badge
                        variant="outline"
                        style={{
                          borderColor: getStatusColor(contract.status),
                          color: getStatusColor(contract.status),
                        }}
                      >
                        {getStatusLabel(contract.status)}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-500">{contract.id}</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>

                {/* Monto y APR */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                      Capital
                    </p>
                    <p
                      className="mt-1 text-2xl font-extrabold"
                      style={{ color: fortuneColors.luxury.charcoal }}
                    >
                      {new Intl.NumberFormat('es-MX', {
                        style: 'currency',
                        currency: contract.currency,
                        minimumFractionDigits: 0,
                      }).format(contract.amount)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                      Tasa APR
                    </p>
                    <p
                      className="mt-1 flex items-baseline gap-1 text-2xl font-extrabold"
                      style={{ color: fortuneColors.accent.emerald }}
                    >
                      {contract.apr}%
                      <span className="text-sm font-medium text-slate-500">anual</span>
                    </p>
                  </div>
                </div>

                {/* Rendimientos */}
                <div
                  className="rounded-lg p-3"
                  style={{
                    backgroundColor: `${fortuneColors.accent.emerald}10`,
                  }}
                >
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-600">
                    Rendimientos Proyectados
                  </p>
                  <p
                    className="mt-1 text-xl font-bold"
                    style={{ color: fortuneColors.accent.emerald }}
                  >
                    {new Intl.NumberFormat('es-MX', {
                      style: 'currency',
                      currency: contract.currency,
                      minimumFractionDigits: 0,
                    }).format(contract.returns)}
                  </p>
                </div>

                {/* Fechas */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-600">
                      {new Date(contract.startDate).toLocaleDateString('es-MX')} -{' '}
                      {new Date(contract.endDate).toLocaleDateString('es-MX')}
                    </span>
                  </div>
                  {contract.status === 'active' && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <span
                        className="font-semibold"
                        style={{ color: fortuneColors.accent.sapphire }}
                      >
                        {contract.daysRemaining} días restantes
                      </span>
                    </div>
                  )}
                </div>

                {/* Acciones */}
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    style={{
                      borderColor: fortuneColors.primary.gold,
                      color: fortuneColors.luxury.charcoal,
                    }}
                  >
                    Ver Detalles
                    <ArrowUpRight className="ml-1 h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </PremiumCard>
          ))}
        </section>

        {/* Info adicional */}
        <PremiumCard variant="gold">
          <div className="flex items-start gap-4">
            <div
              className="rounded-lg p-3"
              style={{
                backgroundColor: `${fortuneColors.primary.gold}40`,
              }}
            >
              <AlertCircle
                className="h-6 w-6"
                style={{ color: fortuneColors.luxury.charcoal }}
              />
            </div>
            <div className="flex-1">
              <h3
                className="text-lg font-bold"
                style={{ color: fortuneColors.luxury.charcoal }}
              >
                Información Importante
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Los Contratos a Vencimiento (CAV) son instrumentos de inversión con tasa
                fija garantizada. El capital está protegido hasta el vencimiento del
                contrato. Para consultas o nuevas inversiones, contacta a tu asesor
                AFORTU.
              </p>
              <Button
                variant="link"
                className="mt-2 p-0"
                style={{ color: fortuneColors.primary.darkGold }}
              >
                Más información sobre CAV
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </PremiumCard>
      </div>
    </div>
  );
}
