/**
 * Formatos es-MX deterministas (mismo resultado en servidor y navegador).
 */

const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const MINUS = '\u2212';

const amountFormatter = new Intl.NumberFormat('es-MX', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

function signOf(value: number, signed: boolean): string {
  if (!signed || value === 0) return '';
  return value > 0 ? '+' : MINUS;
}

export interface MoneyParts {
  sign: string;
  integer: string;
  decimals: string;
}

/** Divide un importe en signo, parte entera con símbolo y decimales: "$12,345" + ".67". */
export function moneyParts(value: number, signed = false): MoneyParts {
  const [integer, decimals] = amountFormatter.format(Math.abs(value)).split('.');
  return { sign: signOf(value, signed), integer: `$${integer}`, decimals: `.${decimals}` };
}

export function formatMoney(value: number, signed = false): string {
  const { sign, integer, decimals } = moneyParts(value, signed);
  return `${sign}${integer}${decimals}`;
}

export function formatPercent(value: number, { signed = false, decimals = 2 } = {}): string {
  const rounded = Number(Math.abs(value).toFixed(decimals));
  return `${signOf(rounded === 0 ? 0 : value, signed)}${rounded.toFixed(decimals)}%`;
}
