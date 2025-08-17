/**
 * Shared formatter utilities for currency, percentages, and compact numbers
 * Used across the Inversiones (Investments) section and other components
 */

/**
 * Formats a number as currency (USD)
 * @param value - The numeric value to format
 * @param options - Additional formatting options
 * @returns Formatted currency string (e.g., "$1,234.56")
 */
export function formatCurrency(
  value: number, 
  options: { 
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    compact?: boolean;
  } = {}
): string {
  const {
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
    compact = false
  } = options;

  if (compact && Math.abs(value) >= 1000) {
    return formatCompactCurrency(value);
  }

  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits,
    maximumFractionDigits,
  });
}

/**
 * Formats large numbers in compact form (e.g., 1.2M, 5.6K)
 * @param value - The numeric value to format
 * @returns Compact formatted currency string
 */
export function formatCompactCurrency(value: number): string {
  const absValue = Math.abs(value);
  const sign = value < 0 ? '-' : '';
  
  if (absValue >= 1_000_000) {
    return `${sign}$${(absValue / 1_000_000).toFixed(1)}M`;
  } else if (absValue >= 1_000) {
    return `${sign}$${(absValue / 1_000).toFixed(1)}K`;
  } else {
    return formatCurrency(value, { maximumFractionDigits: 0 });
  }
}

/**
 * Formats a number as a percentage
 * @param value - The numeric value (as decimal, e.g., 0.1923 for 19.23%)
 * @param options - Additional formatting options
 * @returns Formatted percentage string (e.g., "19.23%")
 */
export function formatPercent(
  value: number,
  options: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    signDisplay?: 'auto' | 'always' | 'exceptZero' | 'negative' | 'never';
  } = {}
): string {
  const {
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
    signDisplay = 'auto'
  } = options;

  return (value * 100).toLocaleString('en-US', {
    minimumFractionDigits,
    maximumFractionDigits,
    signDisplay,
  }) + '%';
}

/**
 * Formats a number with thousands separators
 * @param value - The numeric value to format
 * @param options - Additional formatting options
 * @returns Formatted number string (e.g., "1,234.56")
 */
export function formatNumber(
  value: number,
  options: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    signDisplay?: 'auto' | 'always' | 'exceptZero' | 'negative' | 'never';
  } = {}
): string {
  const {
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
    signDisplay = 'auto'
  } = options;

  return value.toLocaleString('en-US', {
    minimumFractionDigits,
    maximumFractionDigits,
    signDisplay,
  });
}

/**
 * Formats a date string for display
 * @param dateString - The date string to format
 * @param format - The format type ('short', 'medium', 'long')
 * @returns Formatted date string
 */
export function formatDate(
  dateString: string,
  format: 'short' | 'medium' | 'long' = 'medium'
): string {
  const date = new Date(dateString);
  
  const options: Intl.DateTimeFormatOptions = {
    short: { month: 'short', day: 'numeric', year: 'numeric' },
    medium: { month: 'short', day: 'numeric', year: 'numeric' },
    long: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  }[format] as Intl.DateTimeFormatOptions;

  return date.toLocaleDateString('es-ES', options);
}