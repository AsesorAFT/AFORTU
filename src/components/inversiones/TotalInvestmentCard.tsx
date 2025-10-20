'use client';

import { Card, CardContent } from '@/components/ui/card';
import { ReactNode } from 'react';

interface TotalInvestmentCardProps {
  totalLabel: string;
  subtitle: ReactNode;
  children?: ReactNode;
}

export function TotalInvestmentCard({ totalLabel, subtitle, children }: TotalInvestmentCardProps) {
  return (
    <Card className="bg-gradient-to-br from-[#0a1931] to-[#185adb] text-white">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <p className="text-sm opacity-90 mb-2">Valor Total del Portafolio</p>
            <h2 className="text-4xl font-bold">{totalLabel}</h2>
            <div className="text-sm opacity-75 mt-2">{subtitle}</div>
          </div>
          {children && (
            <div className="pt-4 border-t border-white/20">
              {children}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
