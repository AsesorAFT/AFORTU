import { useState, useEffect } from 'react';

export interface FxRate {
  from: string;
  to: string;
  rate: number;
  timestamp: string;
}

/**
 * Hook para obtener el tipo de cambio más reciente USD -> MXN
 * En producción, esto se conectaría a una API real de tipos de cambio
 */
export function useFxLatest() {
  const [data, setData] = useState<FxRate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchFxRate = async () => {
      try {
        setIsLoading(true);
        
        // Simulación de API - en producción usar una API real como:
        // - https://api.exchangerate-api.com/v4/latest/USD
        // - https://api.fixer.io/latest
        // - Banco de México API
        
        // Por ahora, retornamos un valor simulado
        const mockRate: FxRate = {
          from: 'USD',
          to: 'MXN',
          rate: 17.25, // Tipo de cambio simulado
          timestamp: new Date().toISOString(),
        };

        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setData(mockRate);
        setError(null);
      } catch (err) {
        setError(err as Error);
        // Fallback a un valor por defecto
        setData({
          from: 'USD',
          to: 'MXN',
          rate: 17.0,
          timestamp: new Date().toISOString(),
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchFxRate();

    // Actualizar cada 5 minutos
    const interval = setInterval(fetchFxRate, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    data,
    isLoading,
    error,
  };
}
