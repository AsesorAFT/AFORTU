/**
 * useStreamingLLM Hook
 * Mock implementation for streaming LLM functionality
 * This would be replaced with actual streaming implementation
 */

import { useState, useCallback, useRef, useEffect } from 'react';

export interface StreamingMessage {
  id: string;
  content: string;
  isComplete: boolean;
  timestamp: Date;
}

export interface StreamingState {
  isStreaming: boolean;
  currentMessage: StreamingMessage | null;
  error: string | null;
}

export function useStreamingLLM() {
  const [state, setState] = useState<StreamingState>({
    isStreaming: false,
    currentMessage: null,
    error: null,
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  /**
   * Start streaming analysis insights
   */
  const startStreaming = useCallback(async (prompt: string): Promise<void> => {
    // Cancel any existing stream
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const messageId = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    setState({
      isStreaming: true,
      currentMessage: {
        id: messageId,
        content: '',
        isComplete: false,
        timestamp: new Date(),
      },
      error: null,
    });

    try {
      // Mock streaming response
      const responses = [
        "Analizando tu portafolio...",
        "Analizando tu portafolio... He identificado varios puntos importantes.",
        "Analizando tu portafolio... He identificado varios puntos importantes. Tu diversificación actual muestra oportunidades de mejora.",
        "Analizando tu portafolio... He identificado varios puntos importantes. Tu diversificación actual muestra oportunidades de mejora. Los sectores tecnológicos están sobrerrepresentados, lo cual incrementa la volatilidad.",
        "Analizando tu portafolio... He identificado varios puntos importantes. Tu diversificación actual muestra oportunidades de mejora. Los sectores tecnológicos están sobrerrepresentados, lo cual incrementa la volatilidad. Recomiendo considerar una mayor exposición a sectores defensivos como salud y servicios públicos para balancear el riesgo.",
      ];

      for (let i = 0; i < responses.length; i++) {
        if (abortController.signal.aborted) {
          return;
        }

        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));

        setState(prev => ({
          ...prev,
          currentMessage: prev.currentMessage ? {
            ...prev.currentMessage,
            content: responses[i],
            isComplete: i === responses.length - 1,
          } : null,
        }));
      }

      // Mark as complete
      setState(prev => ({
        ...prev,
        isStreaming: false,
      }));

    } catch (error) {
      if (error instanceof Error && error.message.includes('aborted')) {
        return;
      }

      setState(prev => ({
        ...prev,
        isStreaming: false,
        error: 'Error en el streaming de análisis',
      }));
    }
  }, []);

  /**
   * Stop current streaming
   */
  const stopStreaming = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    setState(prev => ({
      ...prev,
      isStreaming: false,
    }));
  }, []);

  /**
   * Clear current message and reset state
   */
  const clearMessage = useCallback(() => {
    setState({
      isStreaming: false,
      currentMessage: null,
      error: null,
    });
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    ...state,
    startStreaming,
    stopStreaming,
    clearMessage,
  };
}