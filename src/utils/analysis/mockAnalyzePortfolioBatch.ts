/**
 * Mock Portfolio Analysis Function
 * Simulates AI-powered portfolio analysis with AbortController support
 */

export interface PortfolioItem {
  symbol: string;
  name: string;
  weight: number;
  currentValue: number;
  change: number;
  changePercent: number;
  sector?: string;
}

export interface AnalysisStrategy {
  id: string;
  name: string;
  description: string;
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  timeHorizon: 'short' | 'medium' | 'long';
  focusAreas: string[];
}

export interface ExecutiveAnalysisResult {
  overallRisk: 'low' | 'medium' | 'high';
  diversificationScore: number; // 0-100
  keyInsights: string[];
  recommendations: string[];
  potentialReturns: {
    conservative: number;
    expected: number;
    optimistic: number;
  };
  riskFactors: string[];
  marketOutlook: string;
  lastUpdated: Date;
}

/**
 * Mock function that simulates portfolio analysis
 * Supports AbortController to prevent race conditions
 */
export async function mockAnalyzePortfolioBatch(
  portfolioItems: PortfolioItem[],
  strategy: AnalysisStrategy,
  signal?: AbortSignal
): Promise<ExecutiveAnalysisResult> {
  // Check if the request was aborted before starting
  if (signal?.aborted) {
    throw new Error('Analysis was aborted');
  }

  // Simulate AI processing time
  const processingTime = 2000 + Math.random() * 3000; // 2-5 seconds
  
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(resolve, processingTime);
    
    // Handle abort signal
    if (signal) {
      signal.addEventListener('abort', () => {
        clearTimeout(timeout);
        reject(new Error('Analysis was aborted'));
      });
    }
  });

  // Check again after processing delay
  if (signal?.aborted) {
    throw new Error('Analysis was aborted');
  }

  // Calculate portfolio metrics
  const totalValue = portfolioItems.reduce((sum, item) => sum + item.currentValue, 0);
  const weightedRisk = portfolioItems.reduce((sum, item) => {
    const riskMultiplier = Math.abs(item.changePercent) / 100;
    return sum + (item.weight * riskMultiplier);
  }, 0);

  // Determine overall risk based on strategy and portfolio composition
  let overallRisk: 'low' | 'medium' | 'high';
  if (strategy.riskTolerance === 'conservative' || weightedRisk < 0.05) {
    overallRisk = 'low';
  } else if (strategy.riskTolerance === 'aggressive' || weightedRisk > 0.15) {
    overallRisk = 'high';
  } else {
    overallRisk = 'medium';
  }

  // Calculate diversification score
  const uniqueSectors = new Set(portfolioItems.map(item => item.sector || 'Unknown')).size;
  const maxPossibleSectors = 11; // Standard sector classification
  const diversificationScore = Math.min((uniqueSectors / maxPossibleSectors) * 100, 100);

  // Generate insights based on portfolio and strategy
  const insights: string[] = [];
  const recommendations: string[] = [];

  if (diversificationScore < 50) {
    insights.push('Tu portafolio muestra concentración sectorial que podría incrementar el riesgo.');
    recommendations.push('Considera diversificar en sectores como tecnología, salud o bienes raíces.');
  }

  if (weightedRisk > 0.1) {
    insights.push('Los activos de alta volatilidad representan una porción significativa del portafolio.');
    if (strategy.riskTolerance === 'conservative') {
      recommendations.push('Rebalancea hacia activos de menor volatilidad como bonos o ETFs diversificados.');
    }
  }

  if (strategy.timeHorizon === 'long') {
    insights.push('Tu horizonte de inversión a largo plazo permite aprovechar el crecimiento compuesto.');
    recommendations.push('Considera incrementar la exposición a activos de crecimiento y mercados emergentes.');
  }

  // Add strategy-specific insights
  strategy.focusAreas.forEach(area => {
    if (area === 'ESG') {
      insights.push('Las inversiones ESG han mostrado resiliencia y crecimiento sostenido.');
      recommendations.push('Evalúa fondos ESG que alineen con tus valores y objetivos financieros.');
    } else if (area === 'Technology') {
      insights.push('El sector tecnológico continúa siendo un motor de innovación e crecimiento.');
      recommendations.push('Mantén exposición moderada a tecnología para capturar oportunidades de crecimiento.');
    }
  });

  // Calculate potential returns based on risk level
  const baseReturn = 0.06; // 6% base
  const riskMultipliers = {
    low: { conservative: 0.8, expected: 1.0, optimistic: 1.2 },
    medium: { conservative: 0.9, expected: 1.3, optimistic: 1.6 },
    high: { conservative: 0.7, expected: 1.5, optimistic: 2.0 }
  };

  const multipliers = riskMultipliers[overallRisk];
  const potentialReturns = {
    conservative: baseReturn * multipliers.conservative,
    expected: baseReturn * multipliers.expected,
    optimistic: baseReturn * multipliers.optimistic
  };

  // Generate risk factors
  const riskFactors: string[] = [];
  if (overallRisk === 'high') {
    riskFactors.push('Alta volatilidad del portafolio');
    riskFactors.push('Concentración en sectores cíclicos');
  }
  if (diversificationScore < 60) {
    riskFactors.push('Diversificación limitada');
  }
  riskFactors.push('Riesgo de mercado general');
  riskFactors.push('Inflación y cambios en tasas de interés');

  // Generate market outlook
  const outlooks = [
    'El mercado muestra signos de estabilización con oportunidades selectivas.',
    'Se espera volatilidad moderada con tendencia alcista a mediano plazo.',
    'Las condiciones macroeconómicas favorecen una estrategia defensiva.',
    'Oportunidades de crecimiento en sectores tecnológicos y sostenibles.'
  ];
  
  const marketOutlook = outlooks[Math.floor(Math.random() * outlooks.length)];

  return {
    overallRisk,
    diversificationScore: Math.round(diversificationScore),
    keyInsights: insights,
    recommendations,
    potentialReturns,
    riskFactors,
    marketOutlook,
    lastUpdated: new Date()
  };
}