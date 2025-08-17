'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, MessageCircle, FileText, ExternalLink } from 'lucide-react';
import Link from 'next/link';

// Import our new modular components
import { StatCard } from '@/components/inversiones/StatCard';
import { TotalInvestmentCard } from '@/components/inversiones/TotalInvestmentCard';
import { FixedRateContractsCard } from '@/components/inversiones/FixedRateContractsCard';
import { AssetManagementCard } from '@/components/inversiones/AssetManagementCard';
import { ContributionPlansCard } from '@/components/inversiones/ContributionPlansCard';

// Import existing components to reuse
import { PortfolioTable } from '@/components/dashboard/portfolio-table';

// Import formatters
import { formatCurrency } from '@/lib/formatters';

// Mock data interfaces (similar to dashboard page)
interface PortfolioItem {
  id: string;
  name: string;
  symbol: string;
  shares: number;
  purchasePrice: number;
  purchaseDate: string;
  currentPrice?: number;
}

// Mock data for demonstration (similar to dashboard page structure)
const initialPortfolio: PortfolioItem[] = [
  {
    id: '1',
    name: 'Apple Inc.',
    symbol: 'AAPL',
    shares: 10,
    purchasePrice: 150.00,
    purchaseDate: '2024-01-15',
    currentPrice: 175.50,
  },
  {
    id: '2',
    name: 'Microsoft Corporation',
    symbol: 'MSFT',
    shares: 8,
    purchasePrice: 300.00,
    purchaseDate: '2024-02-20',
    currentPrice: 320.25,
  },
  {
    id: '3',
    name: 'NVIDIA Corporation',
    symbol: 'NVDA',
    shares: 5,
    purchasePrice: 400.00,
    purchaseDate: '2024-03-10',
    currentPrice: 450.75,
  }
];

const mockFixedRateContracts = [
  {
    id: 'INV-TF-01',
    initialCapital: 1050000,
    currentValue: 1211187.69,
    interestRate: 19.23,
    termMonths: 24,
    startDate: '2024-07-29',
    maturityDate: '2026-07-29',
    status: 'active' as const,
  }
];

const mockContributionPlans = [
  {
    id: 'plan-retirement',
    name: 'Fondo de Jubilación',
    targetAmount: 500000,
    currentAmount: 125000,
    monthlyContribution: 5000,
    startDate: '2024-01-01',
    targetDate: '2030-12-31',
    status: 'active' as const,
    category: 'retirement' as const,
  },
  {
    id: 'plan-emergency',
    name: 'Fondo de Emergencia',
    targetAmount: 100000,
    currentAmount: 75000,
    monthlyContribution: 2500,
    startDate: '2023-06-01',
    targetDate: '2024-12-31',
    status: 'active' as const,
    category: 'emergency' as const,
  }
];

export default function InversionesPage() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(initialPortfolio);

  // Calculate portfolio totals (similar to dashboard logic)
  const totalPortfolioValue = portfolio.reduce((sum, item) => {
    const currentPrice = item.currentPrice || item.purchasePrice;
    return sum + (currentPrice * item.shares);
  }, 0);

  const totalPurchaseValue = portfolio.reduce((sum, item) => {
    return sum + (item.purchasePrice * item.shares);
  }, 0);

  const portfolioGainLoss = totalPortfolioValue - totalPurchaseValue;
  const portfolioGainLossPercent = totalPurchaseValue > 0 ? (portfolioGainLoss / totalPurchaseValue) * 100 : 0;

  // Fixed Rate totals
  const fixedRateTotal = mockFixedRateContracts.reduce((sum, contract) => sum + contract.currentValue, 0);
  const fixedRateInitial = mockFixedRateContracts.reduce((sum, contract) => sum + contract.initialCapital, 0);
  const fixedRateGainLoss = fixedRateTotal - fixedRateInitial;

  // Contribution Plans totals
  const contributionPlansTotal = mockContributionPlans.reduce((sum, plan) => sum + plan.currentAmount, 0);

  // Total investment calculations
  const totalInvestmentValue = fixedRateTotal + totalPortfolioValue + contributionPlansTotal;
  const totalInvestmentCost = fixedRateInitial + totalPurchaseValue + contributionPlansTotal; // For plans, current = cost
  const totalGainLoss = totalInvestmentValue - totalInvestmentCost;
  const totalGainLossPercent = totalInvestmentCost > 0 ? (totalGainLoss / totalInvestmentCost) * 100 : 0;

  // Asset Management mock data
  const assetManagementData = {
    contractId: 'INV-AM-01',
    totalValue: totalPortfolioValue,
    totalCost: totalPurchaseValue,
    assets: portfolio.map(item => ({
      ...item,
      currentPrice: item.currentPrice || item.purchasePrice, // Ensure currentPrice is defined
      sector: item.symbol === 'AAPL' ? 'Tecnología' : item.symbol === 'MSFT' ? 'Software' : 'Semiconductores',
      allocation: (item.shares * (item.currentPrice || item.purchasePrice)) / totalPortfolioValue * 100,
    })),
    managementFee: 1.25, // 1.25% annual fee
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
        <div className="container mx-auto px-4 py-6">
          {/* Navigation Actions */}
          <div className="flex items-center justify-between mb-6">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver al Dashboard
              </Button>
            </Link>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <FileText className="h-4 w-4" />
                Solicitar Cambio
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Page Title */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Inversiones</h1>
            <p className="text-muted-foreground text-lg">
              Gestiona y monitorea todas tus inversiones desde un solo lugar
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Total Investment Hero Card */}
          <TotalInvestmentCard 
            totalValue={totalInvestmentValue}
            totalGainLoss={totalGainLoss}
            gainLossPercent={totalGainLossPercent}
          />

          {/* KPI Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard 
              title="Tasa Fija" 
              value={formatCurrency(fixedRateTotal)}
              trend={fixedRateGainLoss >= 0 ? 'up' : 'down'}
              iconName="banknote" 
              description="Inversiones garantizadas"
              intent="success"
            />
            <StatCard 
              title="Asset Management" 
              value={formatCurrency(totalPortfolioValue)}
              trend={portfolioGainLoss >= 0 ? 'up' : 'down'}
              iconName="pieChart" 
              description="Portafolio diversificado"
            />
            <StatCard 
              title="Planes de Aportación" 
              value={formatCurrency(contributionPlansTotal)}
              iconName="target" 
              description="Ahorro programado"
              intent="info"
            />
            <StatCard 
              title="Rendimiento Total" 
              value={formatCurrency(Math.abs(totalGainLoss))}
              trend={totalGainLoss >= 0 ? 'up' : 'down'}
              iconName="trendingUp" 
              description={`${totalGainLossPercent.toFixed(2)}% total`}
              intent={totalGainLoss >= 0 ? 'success' : 'danger'}
            />
          </div>

          {/* Domain Blocks */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Fixed Rate Contracts */}
            <FixedRateContractsCard contracts={mockFixedRateContracts} />
            
            {/* Asset Management */}
            <AssetManagementCard data={assetManagementData} />
            
            {/* Contribution Plans */}
            <ContributionPlansCard plans={mockContributionPlans} />
          </div>

          {/* Portfolio Table Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle>Portafolio de Asset Management</CardTitle>
                  <CardDescription>
                    Detalle completo de activos en renta variable - Contrato {assetManagementData.contractId}
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Ver Análisis
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <PortfolioTable portfolio={portfolio} setPortfolio={setPortfolio} />
            </CardContent>
          </Card>

          {/* Compliance Footer */}
          <Card className="border-l-4 border-l-muted-foreground/20 bg-muted/30">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="text-muted-foreground text-sm leading-relaxed">
                  <p className="font-medium mb-2">Información Importante:</p>
                  <p>
                    Las inversiones están sujetas a riesgos de mercado y pueden variar en valor. 
                    Los rendimientos pasados no garantizan resultados futuros. AFORTU está regulado 
                    por la CNBV y forma parte del sistema de protección al inversionista. 
                    Consulta siempre a tu asesor financiero antes de tomar decisiones de inversión.
                  </p>
                  <p className="mt-2 text-xs">
                    Última actualización: {new Date().toLocaleDateString('es-ES')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}