/**
 * Utilidades de formateo para números, monedas y porcentajes
 */

export const fmtMXN = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const fmtUSD = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const fmtPCT = new Intl.NumberFormat('es-MX', {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const fmtNumber = new Intl.NumberFormat('es-MX', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

/**
 * Formatea un número como moneda según el código de moneda especificado
 * @param value - Valor numérico a formatear
 * @param currency - Código de moneda ISO (MXN, USD, EUR, etc.)
 * @returns String formateado como moneda
 */
export function formatCurrency(value: number, currency: string = 'MXN'): string {
  const formatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(value);
}

/**
 * Formatea un número como porcentaje
 * @param value - Valor decimal (0.05 = 5%)
 * @returns String formateado como porcentaje
 */
export function formatPercentage(value: number): string {
  return fmtPCT.format(value);
}

/**
 * Formatea un número con separadores de miles
 * @param value - Valor numérico
 * @returns String formateado con separadores
 */
export function formatNumber(value: number): string {
  return fmtNumber.format(value);
}

/**
 * Formatea una fecha en formato corto español
 * @param date - Fecha a formatear
 * @returns String formateado (ej: "15 ene 2025")
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(d);
}

/**
 * Formatea una fecha en formato largo español
 * @param date - Fecha a formatear
 * @returns String formateado (ej: "15 de enero de 2025")
 */
export function formatDateLong(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d);
}

/**
 * Abrevia números grandes (1000 -> 1K, 1000000 -> 1M)
 * @param value - Valor numérico
 * @returns String abreviado
 */
export function abbreviateNumber(value: number): string {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(1)}B`;
  }
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toFixed(0);
}
