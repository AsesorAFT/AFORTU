'use client';

import { Button } from '@/components/ui/button';
import { DollarSign } from 'lucide-react';

interface PreferencesBarProps {
  fxRate: number;
}

export function PreferencesBar({ fxRate }: PreferencesBarProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
      <div className="flex items-center gap-2">
        <DollarSign className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Tipo de cambio: <span className="font-medium">1 USD = ${fxRate.toFixed(2)} MXN</span>
        </span>
      </div>
      <Button variant="ghost" size="sm" className="ml-auto">
        Preferencias
      </Button>
    </div>
  );
}
