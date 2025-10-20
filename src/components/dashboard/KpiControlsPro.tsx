'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  BarChart3, 
  TrendingUp, 
  Waves,
  DollarSign 
} from 'lucide-react';

type Timeframe = '30d' | '90d' | '6m' | '1y' | '2y';
type Granularity = 'day' | 'week' | 'month' | undefined;
type Currency = 'MXN' | 'USD';

interface KpiControlsProProps {
  timeframe: Timeframe;
  onTimeframe: (tf: Timeframe) => void;
  granularity?: Granularity;
  onGranularity: (g: Granularity) => void;
  compare: boolean;
  onCompare: (c: boolean) => void;
  smoothing: boolean;
  onSmoothing: (s: boolean) => void;
  currency: Currency;
  onCurrency: (c: Currency) => void;
  prefetch?: (params: any) => void;
}

const timeframes: { value: Timeframe; label: string }[] = [
  { value: '30d', label: '30d' },
  { value: '90d', label: '90d' },
  { value: '6m', label: '6m' },
  { value: '1y', label: '1y' },
  { value: '2y', label: '2y' },
];

const granularities: { value: Granularity; label: string; icon: any }[] = [
  { value: 'day', label: 'Día', icon: Calendar },
  { value: 'week', label: 'Semana', icon: BarChart3 },
  { value: 'month', label: 'Mes', icon: TrendingUp },
];

export function KpiControlsPro({
  timeframe,
  onTimeframe,
  granularity,
  onGranularity,
  compare,
  onCompare,
  smoothing,
  onSmoothing,
  currency,
  onCurrency,
  prefetch,
}: KpiControlsProProps) {
  return (
    <div className="space-y-4">
      {/* Timeframe Selection */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-white/80 mr-2">Periodo:</span>
        {timeframes.map(tf => (
          <Button
            key={tf.value}
            variant={timeframe === tf.value ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => onTimeframe(tf.value)}
            onMouseEnter={() => prefetch?.({ timeframe: tf.value })}
            className={timeframe === tf.value ? 'bg-white text-[#0a1931]' : 'text-white hover:bg-white/10'}
          >
            {tf.label}
          </Button>
        ))}
      </div>

      {/* Granularity, Compare, Smoothing, Currency */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Granularity */}
        <div className="flex items-center gap-1">
          {granularities.map(gran => {
            const Icon = gran.icon;
            return (
              <Button
                key={gran.value}
                variant={granularity === gran.value ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => onGranularity(gran.value)}
                className={granularity === gran.value ? 'bg-white text-[#0a1931]' : 'text-white hover:bg-white/10'}
              >
                <Icon className="h-4 w-4 mr-1" />
                {gran.label}
              </Button>
            );
          })}
        </div>

        <div className="h-6 w-px bg-white/20" />

        {/* Compare Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCompare(!compare)}
          className={compare ? 'bg-white text-[#0a1931]' : 'text-white hover:bg-white/10'}
        >
          <TrendingUp className="h-4 w-4 mr-1" />
          Comparar
        </Button>

        {/* Smoothing Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onSmoothing(!smoothing)}
          className={smoothing ? 'bg-white text-[#0a1931]' : 'text-white hover:bg-white/10'}
        >
          <Waves className="h-4 w-4 mr-1" />
          Suavizar
        </Button>

        <div className="h-6 w-px bg-white/20" />

        {/* Currency Toggle */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCurrency('MXN')}
            className={currency === 'MXN' ? 'bg-white text-[#0a1931]' : 'text-white hover:bg-white/10'}
          >
            <DollarSign className="h-4 w-4 mr-1" />
            MXN
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCurrency('USD')}
            className={currency === 'USD' ? 'bg-white text-[#0a1931]' : 'text-white hover:bg-white/10'}
          >
            <DollarSign className="h-4 w-4 mr-1" />
            USD
          </Button>
        </div>
      </div>
    </div>
  );
}
