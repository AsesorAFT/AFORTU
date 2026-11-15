import { demoAccounts, demoCutoff } from './demo-data';
import { formatDate, formatMoney, formatPercent, moneyParts } from './format';
import {
  distribution,
  portfolioSummary,
  sumValues,
  upcomingMaturities,
  type DemoAccount,
} from './portfolio';

const account = (overrides: Partial<DemoAccount>): DemoAccount => ({
  id: 'a',
  group: 'fondos',
  name: 'Cuenta',
  kind: 'Fondos',
  contract: '••0000',
  value: 0,
  previousValue: 0,
  ...overrides,
});

describe('portfolioSummary', () => {
  it('suma en centavos sin errores de punto flotante', () => {
    expect(sumValues([0.1, 0.2])).toBe(0.3);
    const summary = portfolioSummary([
      account({ value: 100.1, previousValue: 100 }),
      account({ value: 200.2, previousValue: 200 }),
    ]);
    expect(summary.total).toBe(300.3);
    expect(summary.change).toBe(0.3);
    expect(summary.changePct).toBeCloseTo(0.1, 10);
  });

  it('el total de la demostración coincide con la suma de sus cuentas', () => {
    const summary = portfolioSummary(demoAccounts);
    expect(summary.total).toBe(13354261.67);
    expect(summary.accountCount).toBe(demoAccounts.length);
  });
});

describe('distribution', () => {
  it('agrupa por tipo y los porcentajes suman exactamente 100', () => {
    const slices = distribution(demoAccounts);
    expect(slices.map((s) => s.label)).toEqual([
      'Inversiones',
      'Fondos',
      'Acciones',
      'Capital creciente',
      'BitForward',
    ]);
    const sum = slices.reduce((acc, s) => acc + Math.round(s.percent * 10), 0);
    expect(sum).toBe(1000);
  });

  it('reparte el residuo cuando el redondeo simple no suma 100', () => {
    const slices = distribution([
      account({ group: 'inversiones', value: 1 }),
      account({ group: 'fondos', value: 1 }),
      account({ group: 'acciones', value: 1 }),
    ]);
    expect(slices.map((s) => s.percent)).toEqual([33.4, 33.3, 33.3]);
  });

  it('omite grupos vacíos y devuelve lista vacía sin saldo', () => {
    expect(distribution([account({ value: 0 })])).toEqual([]);
  });
});

describe('upcomingMaturities', () => {
  it('devuelve solo vencimientos posteriores al corte, ordenados', () => {
    const result = upcomingMaturities(demoAccounts, demoCutoff.current);
    expect(result.map((m) => m.date)).toEqual(['2026-11-19', '2027-01-13', '2027-03-01']);
  });

  it('excluye contratos vencidos y respeta el límite', () => {
    const result = upcomingMaturities(
      [
        account({ id: 'vencido', fixedTerm: { start: '2026-01-01', end: '2026-10-01', termDays: 273, principal: 1, rate: 1 } }),
        account({ id: 'b', fixedTerm: { start: '2026-10-01', end: '2026-12-01', termDays: 61, principal: 1, rate: 1 } }),
        account({ id: 'c', fixedTerm: { start: '2026-10-01', end: '2026-11-15', termDays: 45, principal: 1, rate: 1 } }),
      ],
      '2026-10-31',
      1,
    );
    expect(result.map((m) => m.accountId)).toEqual(['c']);
  });
});

describe('format', () => {
  it('formatea importes y porcentajes en es-MX con signo tipográfico', () => {
    expect(formatMoney(13354261.67)).toBe('$13,354,261.67');
    expect(formatMoney(-21310.75, true)).toBe('\u2212$21,310.75');
    expect(moneyParts(5214380.55)).toEqual({ sign: '', integer: '$5,214,380', decimals: '.55' });
    expect(formatPercent(1.3301, { signed: true })).toBe('+1.33%');
    expect(formatPercent(-0.001, { signed: true })).toBe('0.00%');
    expect(formatDate('2027-01-13')).toBe('13 ene 2027');
  });
});
