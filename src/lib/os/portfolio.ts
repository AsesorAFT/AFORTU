/**
 * Derivaciones del resumen patrimonial del prototipo AFORTU OS.
 * Trabaja en centavos para evitar errores de redondeo al sumar importes.
 */

export type AccountGroup =
  | 'inversiones'
  | 'fondos'
  | 'acciones'
  | 'capital-creciente'
  | 'bitforward';

export interface FixedTermDetails {
  /** Fechas ISO (AAAA-MM-DD). */
  start: string;
  end: string;
  termDays: number;
  principal: number;
  /** Tasa anual en porcentaje, p. ej. 10.25 */
  rate: number;
}

export interface DemoAccount {
  id: string;
  group: AccountGroup;
  name: string;
  /** Tipo de cuenta mostrado junto al contrato. */
  kind: string;
  /** Contrato enmascarado, p. ej. "••4821". */
  contract: string;
  value: number;
  previousValue: number;
  fixedTerm?: FixedTermDetails;
}

export const GROUP_ORDER: AccountGroup[] = [
  'inversiones',
  'fondos',
  'acciones',
  'capital-creciente',
  'bitforward',
];

export const GROUP_LABELS: Record<AccountGroup, string> = {
  inversiones: 'Inversiones',
  fondos: 'Fondos',
  acciones: 'Acciones',
  'capital-creciente': 'Capital creciente',
  bitforward: 'BitForward',
};

const toCents = (value: number) => Math.round(value * 100);
const fromCents = (cents: number) => cents / 100;

export function sumValues(values: number[]): number {
  return fromCents(values.reduce((acc, value) => acc + toCents(value), 0));
}

export interface PortfolioSummary {
  total: number;
  previousTotal: number;
  change: number;
  /** Variación porcentual contra el corte anterior. */
  changePct: number;
  accountCount: number;
}

export function portfolioSummary(accounts: DemoAccount[]): PortfolioSummary {
  const total = sumValues(accounts.map((a) => a.value));
  const previousTotal = sumValues(accounts.map((a) => a.previousValue));
  const change = fromCents(toCents(total) - toCents(previousTotal));
  return {
    total,
    previousTotal,
    change,
    changePct: previousTotal === 0 ? 0 : (change / previousTotal) * 100,
    accountCount: accounts.length,
  };
}

export function accountChangePct(account: DemoAccount): number {
  if (account.previousValue === 0) return 0;
  return ((account.value - account.previousValue) / account.previousValue) * 100;
}

export interface DistributionSlice {
  group: AccountGroup;
  label: string;
  value: number;
  /** Porcentaje redondeado; la suma de todos es exactamente 100. */
  percent: number;
}

/**
 * Agrupa por tipo de cuenta y reparte porcentajes con el método del residuo
 * mayor para que la suma visible sea exactamente 100.
 */
export function distribution(accounts: DemoAccount[], decimals = 1): DistributionSlice[] {
  const groups = GROUP_ORDER.map((group) => ({
    group,
    label: GROUP_LABELS[group],
    value: sumValues(accounts.filter((a) => a.group === group).map((a) => a.value)),
  })).filter((g) => g.value > 0);

  const total = sumValues(groups.map((g) => g.value));
  if (total <= 0) return [];

  const units = 100 * 10 ** decimals;
  const raw = groups.map((g) => (g.value / total) * units);
  const floors = raw.map(Math.floor);
  let remaining = units - floors.reduce((acc, n) => acc + n, 0);

  const byRemainder = raw
    .map((r, index) => ({ index, remainder: r - Math.floor(r) }))
    .sort((a, b) => b.remainder - a.remainder || a.index - b.index);

  for (const { index } of byRemainder) {
    if (remaining <= 0) break;
    floors[index] += 1;
    remaining -= 1;
  }

  return groups.map((g, i) => ({ ...g, percent: floors[i] / 10 ** decimals }));
}

export interface Maturity {
  accountId: string;
  name: string;
  contract: string;
  date: string;
  principal: number;
  termDays: number;
}

/** Vencimientos posteriores a la fecha de corte, del más próximo al más lejano. */
export function upcomingMaturities(
  accounts: DemoAccount[],
  afterDate: string,
  limit = 3,
): Maturity[] {
  return accounts
    .filter((a): a is DemoAccount & { fixedTerm: FixedTermDetails } =>
      Boolean(a.fixedTerm && a.fixedTerm.end > afterDate),
    )
    .map((a) => ({
      accountId: a.id,
      name: a.name,
      contract: a.contract,
      date: a.fixedTerm.end,
      principal: a.fixedTerm.principal,
      termDays: a.fixedTerm.termDays,
    }))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit);
}
