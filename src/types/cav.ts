/**
 * Tipos para Contratos de Ahorro con Valor (CAV)
 */

export interface CAVContract {
  id: string;
  title: string;
  amount: number;
  currency: 'MXN' | 'USD' | 'EUR';
  apr: number;
  startDate: string;
  endDate: string;
  daysRemaining: number;
  status: 'active' | 'completed' | 'pending';
  returns: number;
  type: 'fixed-rate' | 'variable-rate';
  investmentPlan?: string;
}

export interface CAVPortfolioSummary {
  totalInvested: number;
  totalReturns: number;
  avgAPR: number;
  activeContracts: number;
  completedContracts: number;
  nextMaturity: number;
}

export interface InvestmentPlan {
  id: string;
  name: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  minTerm: number; // días
  maxTerm: number; // días
  baseAPR: number;
  riskLevel: 'bajo' | 'moderado' | 'alto';
}

export interface CAVSettings {
  contracts: CAVContract[];
  portfolioSummary: CAVPortfolioSummary;
  investmentPlans: InvestmentPlan[];
  lastUpdated: string;
}

export const DEFAULT_CAV_SETTINGS: CAVSettings = {
  contracts: [
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
      type: 'fixed-rate',
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
      type: 'fixed-rate',
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
      type: 'fixed-rate',
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
      type: 'fixed-rate',
    },
  ],
  portfolioSummary: {
    totalInvested: 10750000,
    totalReturns: 1248250,
    avgAPR: 10.75,
    activeContracts: 3,
    completedContracts: 1,
    nextMaturity: 88,
  },
  investmentPlans: [
    {
      id: 'plan-gov',
      name: 'Renta Fija Gubernamental',
      description: 'Inversiones en instrumentos de deuda del gobierno mexicano',
      minAmount: 100000,
      maxAmount: 10000000,
      minTerm: 28,
      maxTerm: 365,
      baseAPR: 11.5,
      riskLevel: 'bajo',
    },
    {
      id: 'plan-corp',
      name: 'Deuda Corporativa Premium',
      description: 'Bonos de empresas con calificación AAA',
      minAmount: 500000,
      maxAmount: 50000000,
      minTerm: 90,
      maxTerm: 720,
      baseAPR: 10.8,
      riskLevel: 'moderado',
    },
    {
      id: 'plan-intl',
      name: 'Bonos Internacionales',
      description: 'Diversificación en mercados internacionales',
      minAmount: 100000,
      maxAmount: 5000000,
      minTerm: 180,
      maxTerm: 1095,
      baseAPR: 8.5,
      riskLevel: 'moderado',
    },
  ],
  lastUpdated: new Date().toISOString(),
};
