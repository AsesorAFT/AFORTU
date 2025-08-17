/**
 * useExecutiveAnalysis Hook
 * Manages executive analysis execution with concurrency control and error handling
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { mockAnalyzePortfolioBatch, type ExecutiveAnalysisResult, type AnalysisStrategy, type PortfolioItem } from '../utils/analysis/mockAnalyzePortfolioBatch';

export interface ExecutiveAnalysisState {
  data: ExecutiveAnalysisResult | null;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

export function useExecutiveAnalysis() {
  // State management
  const [state, setState] = useState<ExecutiveAnalysisState>({
    data: null,
    loading: false,
    error: null,
    lastUpdated: null,
  });

  // AbortController ref for canceling previous requests
  const abortControllerRef = useRef<AbortController | null>(null);

  /**
   * Run executive analysis for a given strategy
   * Automatically cancels any previous running analysis to prevent race conditions
   */
  const run = useCallback(async (
    portfolioItems: PortfolioItem[],
    strategy: AnalysisStrategy
  ): Promise<ExecutiveAnalysisResult | null> => {
    // Cancel any previous analysis
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new AbortController for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    // Validation
    if (!portfolioItems || portfolioItems.length === 0) {
      const errorMsg = 'No se pueden analizar elementos de portafolio vacíos';
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMsg,
        data: null,
      }));
      return null;
    }

    if (!strategy) {
      const errorMsg = 'Se requiere una estrategia válida para el análisis';
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMsg,
        data: null,
      }));
      return null;
    }

    // Set loading state
    setState(prev => ({
      ...prev,
      loading: true,
      error: null,
    }));

    try {
      // Execute the analysis with abort signal
      const result = await mockAnalyzePortfolioBatch(
        portfolioItems,
        strategy,
        abortController.signal
      );

      // Check if this request was aborted
      if (abortController.signal.aborted) {
        return null;
      }

      // Update state with successful result
      setState({
        data: result,
        loading: false,
        error: null,
        lastUpdated: new Date(),
      });

      return result;

    } catch (error) {
      // Handle abort errors silently (they're expected when cancelling)
      if (error instanceof Error && error.message.includes('aborted')) {
        return null;
      }

      // Handle other errors
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Error desconocido durante el análisis';

      console.error('Executive analysis error:', error);

      setState(prev => ({
        ...prev,
        loading: false,
        error: `Error en el análisis: ${errorMessage}`,
        data: null,
      }));

      return null;
    }
  }, []);

  /**
   * Clear the current analysis data
   */
  const clear = useCallback(() => {
    // Cancel any running analysis
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    setState({
      data: null,
      loading: false,
      error: null,
      lastUpdated: null,
    });
  }, []);

  /**
   * Refresh the analysis with the same parameters (if available)
   * Note: This would need the last used parameters to be stored if we want true refresh
   */
  const refresh = useCallback(async (
    portfolioItems: PortfolioItem[],
    strategy: AnalysisStrategy
  ) => {
    return await run(portfolioItems, strategy);
  }, [run]);

  /**
   * Cancel the current analysis if running
   */
  const cancel = useCallback(() => {
    if (abortControllerRef.current && state.loading) {
      abortControllerRef.current.abort();
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Análisis cancelado por el usuario',
      }));
    }
  }, [state.loading]);

  /**
   * Clear any error state
   */
  const clearError = useCallback(() => {
    setState(prev => ({
      ...prev,
      error: null,
    }));
  }, []);

  /**
   * Check if analysis is stale (older than threshold)
   */
  const isStale = useCallback((thresholdMinutes: number = 30): boolean => {
    if (!state.lastUpdated || !state.data) {
      return false;
    }

    const now = new Date();
    const diffMinutes = (now.getTime() - state.lastUpdated.getTime()) / (1000 * 60);
    return diffMinutes > thresholdMinutes;
  }, [state.lastUpdated, state.data]);

  /**
   * Get analysis age in human readable format
   */
  const getAnalysisAge = useCallback((): string | null => {
    if (!state.lastUpdated) {
      return null;
    }

    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - state.lastUpdated.getTime()) / (1000 * 60));

    if (diffMinutes < 1) {
      return 'Hace menos de un minuto';
    } else if (diffMinutes === 1) {
      return 'Hace 1 minuto';
    } else if (diffMinutes < 60) {
      return `Hace ${diffMinutes} minutos`;
    } else {
      const diffHours = Math.floor(diffMinutes / 60);
      if (diffHours === 1) {
        return 'Hace 1 hora';
      } else if (diffHours < 24) {
        return `Hace ${diffHours} horas`;
      } else {
        const diffDays = Math.floor(diffHours / 24);
        return `Hace ${diffDays} día${diffDays > 1 ? 's' : ''}`;
      }
    }
  }, [state.lastUpdated]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    // State
    ...state,
    
    // Computed state
    isStale: isStale(),
    analysisAge: getAnalysisAge(),
    
    // Actions
    run,
    clear,
    refresh,
    cancel,
    clearError,
    
    // Utilities
    isStale: isStale, // Function form for custom threshold
    getAnalysisAge,
  };
}

// Export types for external use
export type { ExecutiveAnalysisState };