'use client';

import { useCallback, useMemo, useRef } from 'react';

/**
 * useMemoizedCallback - Hook optimizado para callbacks
 */
export function useMemoizedCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList
): T {
  return useCallback(callback, deps);
}

/**
 * useDebounce - Hook para debounce
 */
export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    }) as T,
    [callback, delay]
  );
}

/**
 * useThrottle - Hook para throttle
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  limit: number
): T {
  const inThrottle = useRef(false);

  return useCallback(
    ((...args: Parameters<T>) => {
      if (!inThrottle.current) {
        callback(...args);
        inThrottle.current = true;
        setTimeout(() => {
          inThrottle.current = false;
        }, limit);
      }
    }) as T,
    [callback, limit]
  );
}

/**
 * useMemoizedValue - Hook para valores memoizados con computación costosa
 */
export function useMemoizedValue<T>(
  factory: () => T,
  deps: React.DependencyList
): T {
  return useMemo(factory, deps);
}

/**
 * useFormatCurrency - Hook para formatear moneda (memoizado)
 */
export function useFormatCurrency(locale: string = 'es-MX', currency: string = 'MXN') {
  return useMemo(() => {
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return (value: number) => formatter.format(value);
  }, [locale, currency]);
}

/**
 * useFormatNumber - Hook para formatear números (memoizado)
 */
export function useFormatNumber(locale: string = 'es-MX') {
  return useMemo(() => {
    const formatter = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

    return (value: number) => formatter.format(value);
  }, [locale]);
}

/**
 * useFormatPercentage - Hook para formatear porcentajes (memoizado)
 */
export function useFormatPercentage(locale: string = 'es-MX', decimals: number = 2) {
  return useMemo(() => {
    const formatter = new Intl.NumberFormat(locale, {
      style: 'percent',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

    return (value: number) => formatter.format(value / 100);
  }, [locale, decimals]);
}

/**
 * useComputedValue - Hook para cálculos complejos optimizados
 */
export function useComputedValue<T, R>(
  data: T[],
  computeFn: (data: T[]) => R,
  deps: React.DependencyList = []
): R {
  return useMemo(() => {
    return computeFn(data);
  }, [data, ...deps]);
}

/**
 * usePrevious - Hook para mantener el valor anterior
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useMemo(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

/**
 * useStableReference - Hook para mantener referencia estable
 */
export function useStableReference<T>(value: T): React.MutableRefObject<T> {
  const ref = useRef<T>(value);

  useMemo(() => {
    ref.current = value;
  }, [value]);

  return ref;
}

export default {
  useMemoizedCallback,
  useDebounce,
  useThrottle,
  useMemoizedValue,
  useFormatCurrency,
  useFormatNumber,
  useFormatPercentage,
  useComputedValue,
  usePrevious,
  useStableReference,
};
