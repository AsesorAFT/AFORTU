import { useState, useEffect } from 'react';

export type Timeframe = '30d' | '90d' | '6m' | '1y' | '2y';
export type Granularity = 'day' | 'week' | 'month';
export type Currency = 'MXN' | 'USD';

export interface KpiPoint {
  firstValue: number;
  lastValue: number;
  changeAbs: number;
  changePct: number;
}

export interface KpiSeries {
  totalValue: KpiPoint;
  fixed: KpiPoint;
  assetMgmt: KpiPoint;
  aport: KpiPoint;
}

export interface KpiMeta {
  timeframe: string;
  granularity: string;
  currency: Currency;
}

export interface KpiCompare {
  totalValue?: { deltaPct: number };
  fixed?: { deltaPct: number };
  assetMgmt?: { deltaPct: number };
  aport?: { deltaPct: number };
}

export interface KpiData {
  series: KpiSeries;
  meta: KpiMeta;
  compare?: KpiCompare;
}

interface UseKpiSeriesParams {
  timeframe: Timeframe;
  granularity?: Granularity;
  compare?: 'prev';
  smoothing?: number;
  fx?: Currency;
}

/**
 * Hook para obtener series de KPIs con diferentes parámetros
 * Simula datos de rendimiento de inversiones
 */
export function useKpiSeriesParams2(params: UseKpiSeriesParams) {
  const [data, setData] = useState<KpiData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 300));

      // Generar datos simulados basados en los parámetros
      const mockData: KpiData = {
        series: {
          totalValue: {
            firstValue: 1000000,
            lastValue: 1250000,
            changeAbs: 250000,
            changePct: 0.25,
          },
          fixed: {
            firstValue: 300000,
            lastValue: 350000,
            changeAbs: 50000,
            changePct: 0.167,
          },
          assetMgmt: {
            firstValue: 500000,
            lastValue: 650000,
            changeAbs: 150000,
            changePct: 0.30,
          },
          aport: {
            firstValue: 200000,
            lastValue: 250000,
            changeAbs: 50000,
            changePct: 0.25,
          },
        },
        meta: {
          timeframe: params.timeframe,
          granularity: params.granularity || 'day',
          currency: params.fx || 'MXN',
        },
      };

      // Agregar comparación si está habilitada
      if (params.compare === 'prev') {
        mockData.compare = {
          totalValue: { deltaPct: 0.05 },
          fixed: { deltaPct: 0.03 },
          assetMgmt: { deltaPct: 0.08 },
          aport: { deltaPct: 0.04 },
        };
      }

      setData(mockData);
      setIsLoading(false);
    };

    fetchData();
  }, [params.timeframe, params.granularity, params.compare, params.smoothing, params.fx]);

  const prefetch = (newParams: Partial<UseKpiSeriesParams>) => {
    // En producción, esto haría prefetch de datos
    console.log('Prefetching with params:', newParams);
  };

  return {
    data,
    isLoading,
    prefetch,
  };
}
