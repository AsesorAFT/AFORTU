/**
 * useStrategies Hook
 * Manages investment strategies with CRUD operations and active strategy selection
 */

import { useState, useCallback } from 'react';

export interface StrategyConfig {
  id: string;
  name: string;
  description: string;
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  timeHorizon: 'short' | 'medium' | 'long';
  focusAreas: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Predefined strategy templates
const defaultStrategies: StrategyConfig[] = [
  {
    id: 'conservative-stable',
    name: 'Crecimiento Estable',
    description: 'Estrategia conservadora enfocada en preservación de capital con crecimiento moderado a largo plazo.',
    riskTolerance: 'conservative',
    timeHorizon: 'long',
    focusAreas: ['Bonos', 'Dividendos', 'ETFs diversificados'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'moderate-balanced',
    name: 'Balance Moderado',
    description: 'Combinación equilibrada de crecimiento y estabilidad con diversificación sectorial.',
    riskTolerance: 'moderate',
    timeHorizon: 'medium',
    focusAreas: ['Acciones', 'Bonos', 'REITs', 'International'],
    isActive: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'growth-technology',
    name: 'Crecimiento Tecnológico',
    description: 'Enfoque en sectores de alta innovación y crecimiento con mayor tolerancia al riesgo.',
    riskTolerance: 'aggressive',
    timeHorizon: 'long',
    focusAreas: ['Technology', 'Healthcare', 'Clean Energy', 'Emerging Markets'],
    isActive: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function useStrategies() {
  // Initialize with default strategies
  const [strategies, setStrategies] = useState<StrategyConfig[]>(defaultStrategies);

  // Get active strategy
  const activeStrategy = strategies.find(strategy => strategy.isActive) || strategies[0];

  /**
   * Add a new strategy
   */
  const addStrategy = useCallback((strategyData: Omit<StrategyConfig, 'id' | 'isActive' | 'createdAt' | 'updatedAt'>) => {
    const newStrategy: StrategyConfig = {
      ...strategyData,
      id: `strategy-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      isActive: false, // New strategies start as inactive
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setStrategies(prev => [...prev, newStrategy]);
    return newStrategy;
  }, []);

  /**
   * Activate a strategy (deactivates others)
   */
  const activateStrategy = useCallback((strategyId: string) => {
    setStrategies(prev => prev.map(strategy => ({
      ...strategy,
      isActive: strategy.id === strategyId,
      updatedAt: strategy.id === strategyId ? new Date() : strategy.updatedAt,
    })));
  }, []);

  /**
   * Deactivate a strategy
   */
  const deactivateStrategy = useCallback((strategyId: string) => {
    setStrategies(prev => prev.map(strategy => 
      strategy.id === strategyId 
        ? { ...strategy, isActive: false, updatedAt: new Date() }
        : strategy
    ));
  }, []);

  /**
   * Remove a strategy
   */
  const removeStrategy = useCallback((strategyId: string) => {
    setStrategies(prev => {
      const updatedStrategies = prev.filter(strategy => strategy.id !== strategyId);
      
      // If we removed the active strategy, activate the first available one
      const hasActiveStrategy = updatedStrategies.some(strategy => strategy.isActive);
      if (!hasActiveStrategy && updatedStrategies.length > 0) {
        updatedStrategies[0].isActive = true;
        updatedStrategies[0].updatedAt = new Date();
      }
      
      return updatedStrategies;
    });
  }, []);

  /**
   * Update an existing strategy
   */
  const updateStrategy = useCallback((strategyId: string, updates: Partial<Omit<StrategyConfig, 'id' | 'createdAt'>>) => {
    setStrategies(prev => prev.map(strategy =>
      strategy.id === strategyId
        ? { ...strategy, ...updates, updatedAt: new Date() }
        : strategy
    ));
  }, []);

  /**
   * Get a strategy by ID
   */
  const getStrategy = useCallback((strategyId: string) => {
    return strategies.find(strategy => strategy.id === strategyId);
  }, [strategies]);

  /**
   * Reset to default strategies
   */
  const resetToDefaults = useCallback(() => {
    setStrategies(defaultStrategies.map(strategy => ({
      ...strategy,
      createdAt: new Date(),
      updatedAt: new Date(),
    })));
  }, []);

  /**
   * Get strategies by criteria
   */
  const getStrategiesByCriteria = useCallback((criteria: {
    riskTolerance?: StrategyConfig['riskTolerance'];
    timeHorizon?: StrategyConfig['timeHorizon'];
    focusArea?: string;
  }) => {
    return strategies.filter(strategy => {
      if (criteria.riskTolerance && strategy.riskTolerance !== criteria.riskTolerance) {
        return false;
      }
      if (criteria.timeHorizon && strategy.timeHorizon !== criteria.timeHorizon) {
        return false;
      }
      if (criteria.focusArea && !strategy.focusAreas.includes(criteria.focusArea)) {
        return false;
      }
      return true;
    });
  }, [strategies]);

  return {
    // State
    strategies,
    activeStrategy,
    
    // Actions
    addStrategy,
    activateStrategy,
    deactivateStrategy,
    removeStrategy,
    updateStrategy,
    
    // Queries
    getStrategy,
    getStrategiesByCriteria,
    
    // Utilities
    resetToDefaults,
  };
}

// Export the strategy configuration type for external use
export type { StrategyConfig };