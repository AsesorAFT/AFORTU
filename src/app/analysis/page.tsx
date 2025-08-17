/**
 * Analysis Page - Centro de Análisis AFORTU
 * Modular analysis interface with strategy management and AI-powered insights
 */

'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  FileDown, 
  Settings, 
  Moon, 
  Sun,
  Zap,
  BarChart3,
  TrendingUp,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

// Import our new components and hooks
import { AiStatusCard } from '@/components/analysis/AiStatusCard';
import { StrategyConfigurator } from '@/components/analysis/StrategyConfigurator';
import { StrategyList } from '@/components/analysis/StrategyList';
import { ExecutiveSummary } from '@/components/analysis/ExecutiveSummary';
import { PortfolioRiskSnapshot } from '@/components/analysis/PortfolioRiskSnapshot';
import { InsightAccordion, type InsightSection } from '@/components/analysis/InsightAccordion';
import { ScenarioQuickButtons } from '@/components/analysis/ScenarioQuickButtons';

import { useStrategies, type StrategyConfig } from '@/hooks/useStrategies';
import { useExecutiveAnalysis } from '@/hooks/useExecutiveAnalysis';
import { useStreamingLLM } from '@/hooks/useStreamingLLM';
import { exportPortfolioReportPDF } from '@/utils/pdf/exportPortfolioReport';
import type { PortfolioItem, AnalysisStrategy } from '@/utils/analysis/mockAnalyzePortfolioBatch';

import { cn } from '@/lib/utils';

// Mock portfolio data for demonstration
const initialPositions: PortfolioItem[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    weight: 0.25,
    currentValue: 25000,
    change: 150,
    changePercent: 0.8,
    sector: 'Technology',
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    weight: 0.20,
    currentValue: 20000,
    change: -80,
    changePercent: -0.4,
    sector: 'Technology',
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    weight: 0.15,
    currentValue: 15000,
    change: 200,
    changePercent: 1.5,
    sector: 'Technology',
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    weight: 0.15,
    currentValue: 15000,
    change: -300,
    changePercent: -2.1,
    sector: 'Automotive',
  },
  {
    symbol: 'JNJ',
    name: 'Johnson & Johnson',
    weight: 0.10,
    currentValue: 10000,
    change: 50,
    changePercent: 0.5,
    sector: 'Healthcare',
  },
  {
    symbol: 'JPM',
    name: 'JPMorgan Chase',
    weight: 0.10,
    currentValue: 10000,
    change: -25,
    changePercent: -0.25,
    sector: 'Financial',
  },
  {
    symbol: 'KO',
    name: 'Coca-Cola Company',
    weight: 0.05,
    currentValue: 5000,
    change: 20,
    changePercent: 0.4,
    sector: 'Consumer Goods',
  },
];

export default function AnalysisPage() {
  const { toast } = useToast();
  
  // State management
  const [advanced, setAdvanced] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showStrategyConfig, setShowStrategyConfig] = useState(false);
  const [portfolioItems] = useState<PortfolioItem[]>(initialPositions);
  const [analysisCount, setAnalysisCount] = useState(0);

  // Hooks
  const {
    strategies,
    activeStrategy,
    addStrategy,
    activateStrategy,
    deactivateStrategy,
    removeStrategy,
  } = useStrategies();

  const {
    data: executiveData,
    loading: executiveLoading,
    error: executiveError,
    lastUpdated: executiveLastUpdated,
    run: runExecutiveAnalysis,
    clearError: clearExecutiveError,
  } = useExecutiveAnalysis();

  const {
    isStreaming,
    currentMessage,
    error: streamingError,
    startStreaming,
    stopStreaming,
    clearMessage,
  } = useStreamingLLM();

  // Dark mode toggle
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // Build insights for accordion
  const insightSections: InsightSection[] = useMemo(() => {
    if (!executiveData) return [];

    const sections: InsightSection[] = [];

    if (executiveData.keyInsights.length > 0) {
      sections.push({
        id: 'insights',
        title: 'Insights Clave',
        type: 'insight',
        items: executiveData.keyInsights,
        priority: 'high',
        badge: `${executiveData.keyInsights.length}`,
      });
    }

    if (executiveData.recommendations.length > 0) {
      sections.push({
        id: 'recommendations',
        title: 'Recomendaciones',
        type: 'recommendation',
        items: executiveData.recommendations,
        priority: 'high',
        badge: 'Acción',
      });
    }

    if (executiveData.riskFactors.length > 0) {
      sections.push({
        id: 'risks',
        title: 'Factores de Riesgo',
        type: 'risk',
        items: executiveData.riskFactors,
        priority: executiveData.overallRisk === 'high' ? 'high' : 'medium',
        badge: executiveData.overallRisk === 'high' ? 'Alto' : 'Monitor',
      });
    }

    // Add streaming insights if available
    if (currentMessage && currentMessage.content) {
      sections.push({
        id: 'streaming',
        title: 'Análisis en Tiempo Real',
        type: 'analysis',
        items: [currentMessage.content],
        badge: isStreaming ? 'En vivo' : 'Completado',
      });
    }

    return sections;
  }, [executiveData, currentMessage, isStreaming]);

  // Handle strategy creation
  const handleStrategySave = (strategyData: Omit<StrategyConfig, 'id' | 'isActive' | 'createdAt' | 'updatedAt'>) => {
    const newStrategy = addStrategy(strategyData);
    setShowStrategyConfig(false);
    toast({
      title: 'Estrategia creada',
      description: `La estrategia "${newStrategy.name}" ha sido creada exitosamente.`,
    });
  };

  // Handle executive analysis execution
  const handleRunAnalysis = async () => {
    if (!activeStrategy) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Selecciona una estrategia activa antes de ejecutar el análisis.',
      });
      return;
    }

    clearExecutiveError();

    const analysisStrategy: AnalysisStrategy = {
      id: activeStrategy.id,
      name: activeStrategy.name,
      description: activeStrategy.description,
      riskTolerance: activeStrategy.riskTolerance,
      timeHorizon: activeStrategy.timeHorizon,
      focusAreas: activeStrategy.focusAreas,
    };

    const result = await runExecutiveAnalysis(portfolioItems, analysisStrategy);
    
    if (result) {
      setAnalysisCount(prev => prev + 1);
      toast({
        title: 'Análisis completado',
        description: 'El resumen ejecutivo ha sido actualizado con nuevos insights.',
      });
    }
  };

  // Handle scenario selection
  const handleScenarioSelect = async (scenarioId: string) => {
    if (scenarioId === 'custom-analysis') {
      setShowStrategyConfig(true);
      return;
    }

    // Start streaming analysis based on scenario
    const scenarioPrompts = {
      'quick-analysis': 'Realizar un análisis rápido del portafolio actual',
      'risk-assessment': 'Evaluar detalladamente los riesgos del portafolio',
      'growth-opportunities': 'Identificar oportunidades de crecimiento',
      'esg-analysis': 'Analizar aspectos de sostenibilidad ESG',
      'diversification': 'Evaluar y optimizar la diversificación',
      'income-focus': 'Optimizar para generación de ingresos',
    };

    const prompt = scenarioPrompts[scenarioId as keyof typeof scenarioPrompts] || scenarioPrompts['quick-analysis'];
    clearMessage();
    await startStreaming(prompt);
  };

  // Handle PDF export
  const handleExportPDF = async () => {
    try {
      const reportData = {
        portfolioItems,
        executiveSummary: executiveData,
        strategy: activeStrategy ? {
          name: activeStrategy.name,
          description: activeStrategy.description,
          riskTolerance: activeStrategy.riskTolerance,
          timeHorizon: activeStrategy.timeHorizon,
        } : undefined,
        clientInfo: {
          name: 'Cliente AFORTU',
        },
      };

      await exportPortfolioReportPDF(reportData);
      
      toast({
        title: 'Reporte exportado',
        description: 'El reporte PDF ha sido descargado exitosamente.',
      });
    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast({
        variant: 'destructive',
        title: 'Error de exportación',
        description: 'No se pudo generar el reporte PDF.',
      });
    }
  };

  // Get AI status
  const getAiStatus = (): 'idle' | 'processing' | 'completed' | 'error' => {
    if (executiveError || streamingError) return 'error';
    if (executiveLoading || isStreaming) return 'processing';
    if (executiveData || currentMessage?.isComplete) return 'completed';
    return 'idle';
  };

  return (
    <div className="min-h-screen bg-surface-background">
      {/* Header */}
      <div className="border-b bg-surface-elevated">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold ai-gradient-text">
                Centro de Análisis AFORTU
              </h1>
              <p className="text-text-secondary mt-1">
                Análisis inteligente de portafolios con IA avanzada
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Mode Toggle */}
              <div className="flex items-center space-x-2">
                <Label htmlFor="advanced-mode" className="text-sm">
                  {advanced ? 'Avanzado' : 'Simple'}
                </Label>
                <Switch
                  id="advanced-mode"
                  checked={advanced}
                  onCheckedChange={setAdvanced}
                />
              </div>

              {/* Theme Toggle */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setDarkMode(!darkMode)}
                aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              >
                {darkMode ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>

              {/* Export PDF */}
              <Button
                variant="outline"
                onClick={handleExportPDF}
                disabled={!executiveData}
                className="flex items-center space-x-2"
              >
                <FileDown className="h-4 w-4" />
                <span>Exportar PDF</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Controls & Strategy */}
          <div className="space-y-6">
            {/* AI Status */}
            <AiStatusCard
              status={getAiStatus()}
              lastAnalysis={executiveLastUpdated || undefined}
              analysisCount={analysisCount}
              error={executiveError || streamingError}
            />

            {/* Strategy Management */}
            {!showStrategyConfig ? (
              <StrategyList
                strategies={strategies}
                activeStrategy={activeStrategy}
                onActivate={activateStrategy}
                onDeactivate={deactivateStrategy}
                onRemove={removeStrategy}
                onEdit={() => setShowStrategyConfig(true)}
              />
            ) : (
              <StrategyConfigurator
                onSave={handleStrategySave}
                onCancel={() => setShowStrategyConfig(false)}
              />
            )}

            {/* Quick Actions */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Button
                    onClick={handleRunAnalysis}
                    disabled={executiveLoading || !activeStrategy}
                    className="w-full ai-gradient-bg text-white hover:opacity-90"
                  >
                    {executiveLoading ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Analizando...
                      </>
                    ) : (
                      <>
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Ejecutar Análisis
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => setShowStrategyConfig(true)}
                    className="w-full"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Nueva Estrategia
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column - Analysis Results */}
          <div className="space-y-6">
            {/* Executive Summary */}
            {executiveData && (
              <ExecutiveSummary data={executiveData} />
            )}

            {/* Error Display */}
            {(executiveError || streamingError) && (
              <Card className="border-error-200 bg-error-50">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-5 w-5 text-error-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-error-800">Error en el Análisis</h4>
                      <p className="text-sm text-error-700 mt-1">
                        {executiveError || streamingError}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearExecutiveError}
                        className="mt-2 border-error-300 text-error-700"
                      >
                        Reintentar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Insights Accordion */}
            {insightSections.length > 0 && (
              <InsightAccordion
                sections={insightSections}
                defaultOpenSections={['insights', 'streaming']}
              />
            )}

            {/* Scenario Quick Buttons */}
            {advanced && (
              <ScenarioQuickButtons
                onScenarioSelect={handleScenarioSelect}
                loading={isStreaming}
              />
            )}
          </div>

          {/* Right Column - Portfolio Overview */}
          <div className="space-y-6">
            {/* Portfolio Risk Snapshot */}
            <PortfolioRiskSnapshot portfolioItems={portfolioItems} />

            {/* Streaming Output */}
            {(isStreaming || currentMessage) && (
              <Card className="border-primary-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-primary" />
                      <span>Análisis en Tiempo Real</span>
                    </h4>
                    {isStreaming && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={stopStreaming}
                        className="text-xs"
                      >
                        Detener
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    {currentMessage && (
                      <p className="text-sm leading-relaxed text-text-secondary">
                        {currentMessage.content}
                      </p>
                    )}
                    
                    {isStreaming && (
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        </div>
                        <span>Generando insights...</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
