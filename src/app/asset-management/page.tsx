'use client';

import { Suspense, useMemo, useState } from 'react';
import { useAfortuSettings } from '@/hooks/use-afortu-settings';
import { useKpiSeriesParams2 } from '@/hooks/use-kpi-series-extended';
import { useUserPreferences } from '@/hooks/use-user-preferences';
import { useFxLatest } from '@/hooks/use-fx-latest';

import { MotionSection } from '@/components/motion/MotionSection';
import { KpiControlsPro } from '@/components/dashboard/KpiControlsPro';
import { StatCard } from '@/components/inversiones/StatCard';
import { TotalInvestmentCard } from '@/components/inversiones/TotalInvestmentCard';
import { FixedRateContractsCard } from '@/components/inversiones/FixedRateContractsCard';
import { AssetManagementCard } from '@/components/inversiones/AssetManagementCard';
import { ContributionPlansCard } from '@/components/inversiones/ContributionPlansCard';
import { InversionesLoadingSkeleton } from '@/components/inversiones/LoadingSkeleton';
import { InversionesHotkeys } from '@/components/inversiones/Hotkeys';
import { PreferencesBar } from '@/components/inversiones/PreferencesBar';
import { CompareBadge } from '@/components/inversiones/CompareBadge';

import { Wallet, Landmark, TrendingUp, PiggyBank, AreaChart, Target } from 'lucide-react';
import { fmtMXN, fmtPCT, formatCurrency } from '@/lib/formatters';

type Granularity = 'day' | 'week' | 'month';
type Timeframe = '30d' | '90d' | '1y' | '6m' | '2y';

const fmtUSD = (v: number) => formatCurrency(v, 'USD');

function AssetManagementContent() {
  const { settings, enrichedFixedContracts, enrichedContributionPlans, portfolioSummary, isLoaded } = useAfortuSettings();
  const { prefs, update: updatePrefs } = useUserPreferences();
  const { data: fxData } = useFxLatest();

  // Mantén una sola fuente de verdad para el tipo de cambio
  const usdToMxn = fxData?.rate ?? 17.0; // USD→MXN

  const [timeframe, setTimeframe] = useState<Timeframe>('90d');
  const [granularity, setGranularity] = useState<Granularity | undefined>();
  const [compare, setCompare] = useState(false);
  const [smoothing, setSmoothing] = useState(false);

  const { data, isLoading, prefetch } = useKpiSeriesParams2({
    timeframe,
    granularity,
    compare: compare ? 'prev' : undefined,
    smoothing: smoothing ? 7 : undefined,
    fx: prefs.currency, // la serie ya viene en la moneda seleccionada
  });

  const investedUsd = useMemo(
    () => {
      // Portfolio puede no existir en CAVSettings, usar 0 como default
      return 0;
    },
    [settings]
  );

  const s = data?.series;
  const m = data?.meta;
  const cmp = data?.compare;

  const currencyFmt = prefs.currency === 'MXN' ? fmtMXN.format : (v: number) => fmtUSD(v);

  const loading = !isLoaded || isLoading;

  if (loading) return <InversionesLoadingSkeleton />;

  // Asumimos que portfolioSummary.totalInvested está en USD (base contable)
  const portfolioUsd = portfolioSummary?.totalInvested ?? 0;
  const portfolioMxn = portfolioUsd * usdToMxn;

  const investedMxn = investedUsd * usdToMxn;
  const gainUsd = portfolioUsd - investedUsd;
  const gainMxn = portfolioMxn - investedMxn;

  const totalValue = s?.totalValue.lastValue ?? 0;

  return (
    <>
      <InversionesHotkeys />
      <div className="mx-auto max-w-7xl py-10 px-4 sm:px-6 lg:px-8 space-y-12">
        <MotionSection as="header" className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-headline">
            Centro Patrimonial
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl">
            Vista consolidada y desglosada del valor de tus activos, rendimientos y
            estrategias bajo la gestión de AFORTU.
          </p>
          <div className="pt-2">
            {/* PreferencesBar espera USD→MXN */}
            <PreferencesBar fxRate={usdToMxn} />
          </div>
        </MotionSection>

        <MotionSection as="div" className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <AreaChart className="w-5 h-5 text-accent" />
            Rendimiento General
          </h2>
          <TotalInvestmentCard
            totalLabel={currencyFmt(totalValue)}
            subtitle={
              <div className="flex items-center gap-2">
                <span>
                  {m?.timeframe} ({m?.granularity})
                </span>
                {cmp?.totalValue && <CompareBadge deltaPct={cmp.totalValue.deltaPct} />}
              </div>
            }
          >
            <KpiControlsPro
              timeframe={timeframe}
              onTimeframe={setTimeframe}
              granularity={granularity}
              onGranularity={setGranularity}
              compare={compare}
              onCompare={setCompare}
              smoothing={smoothing}
              onSmoothing={setSmoothing}
              currency={prefs.currency}
              onCurrency={(c: any) => updatePrefs('currency', c)}
              prefetch={prefetch}
            />
          </TotalInvestmentCard>
        </MotionSection>

        <MotionSection as="div" className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Target className="w-5 h-5 text-accent" />
            Desglose de Cartera
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={<Wallet aria-label="Valor total" />}
              label="Valor Total"
              value={s ? currencyFmt(s.totalValue.lastValue) : '-'}
              helper={s ? `Inicial: ${currencyFmt(s.totalValue.firstValue)}` : undefined}
              intent={s && s.totalValue.changeAbs >= 0 ? 'up' : 'down'}
              loading={isLoading}
            />
            <StatCard
              icon={<Landmark aria-label="Tasa fija" />}
              label="Tasa Fija"
              value={s ? currencyFmt(s.fixed.lastValue) : '-'}
              helper={s ? `Rend: ${fmtPCT.format(s.fixed.changePct)}` : undefined}
              intent={s && s.fixed.changeAbs >= 0 ? 'up' : 'down'}
              loading={isLoading}
            />
            <StatCard
              icon={<TrendingUp aria-label="Asset Management" />}
              label="Asset Mgmt"
              value={s ? currencyFmt(s.assetMgmt.lastValue) : '-'}
              helper={s ? `Rend: ${fmtPCT.format(s.assetMgmt.changePct)}` : undefined}
              intent={s && s.assetMgmt.changeAbs >= 0 ? 'up' : 'down'}
              loading={isLoading}
            />
            <StatCard
              icon={<PiggyBank aria-label="Aportaciones" />}
              label="Aportaciones"
              value={s ? currencyFmt(s.aport.lastValue) : '-'}
              helper={s ? `Total: ${fmtPCT.format(s.aport.changePct)}` : undefined}
              intent={s && s.aport.changeAbs >= 0 ? 'up' : 'down'}
              loading={isLoading}
            />
          </div>
        </MotionSection>

        <MotionSection as="div" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FixedRateContractsCard
              contracts={enrichedFixedContracts}
              requestLink="/consultoria"
            />

            <AssetManagementCard
              contracts={settings.contracts.filter((c: any) => c.type === 'inversión')}
              valueMxn={portfolioMxn}
              investedMxn={investedMxn}
              gainMxn={gainMxn}
              contactLink="/consultoria"
            />

            <ContributionPlansCard
              plans={enrichedContributionPlans}
              contactLink="/consultoria"
            />
          </div>
        </MotionSection>

        <footer className="pt-8 text-center text-xs text-muted-foreground">
          Datos con fines ilustrativos. Para información oficial, consulta tus estados de cuenta.
        </footer>
      </div>
    </>
  );
}

export default function AssetManagementPage() {
  return (
    <Suspense fallback={<InversionesLoadingSkeleton />}>
      <AssetManagementContent />
    </Suspense>
  );
}
