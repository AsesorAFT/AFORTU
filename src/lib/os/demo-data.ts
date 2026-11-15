/**
 * DATOS DE DEMOSTRACIÓN — prototipo AFORTU OS.
 * Cliente, contratos, importes, casos y publicaciones son ficticios.
 * No provienen de ninguna fuente real ni de servicios del portal.
 */
import type { DemoAccount } from './portfolio';

export const DEMO_LABEL = 'Datos de demostración';
export const DEMO_SOURCE = 'Datos ficticios del prototipo';

export const demoClient = {
  name: 'Alejandra Ríos Medina',
  firstName: 'Alejandra',
  initials: 'AR',
};

export const demoCutoff = {
  current: '2026-10-31',
  previous: '2026-09-30',
  currency: 'MXN',
} as const;

/**
 * Capital creciente: interés simple, base 360, calculado al corte para la demostración.
 * BitForward: se conserva como cuenta de activos digitales; su integración real
 * con el portal está pendiente de comprobar.
 */
export const demoAccounts: DemoAccount[] = [
  {
    id: 'mandato',
    group: 'inversiones',
    name: 'Mandato de inversión',
    kind: 'Inversiones',
    contract: '••4821',
    value: 5214380.55,
    previousValue: 5145930.35,
  },
  {
    id: 'fondo-deuda',
    group: 'fondos',
    name: 'Fondo de deuda corto plazo',
    kind: 'Fondos',
    contract: '••3307',
    value: 2486912.18,
    previousValue: 2468007.85,
  },
  {
    id: 'acciones',
    group: 'acciones',
    name: 'Acciones globales',
    kind: 'Acciones',
    contract: '••5590',
    value: 1932445.9,
    previousValue: 1953756.65,
  },
  {
    id: 'cc-91',
    group: 'capital-creciente',
    name: 'Capital creciente 91 días',
    kind: 'Capital creciente',
    contract: '••1184',
    value: 1530750.0,
    previousValue: 1517510.42,
    fixedTerm: { start: '2026-08-20', end: '2026-11-19', termDays: 91, principal: 1500000, rate: 10.25 },
  },
  {
    id: 'cc-182',
    group: 'capital-creciente',
    name: 'Capital creciente 182 días',
    kind: 'Capital creciente',
    contract: '••1191',
    value: 1031800.0,
    previousValue: 1022672.22,
    fixedTerm: { start: '2026-07-15', end: '2027-01-13', termDays: 182, principal: 1000000, rate: 10.6 },
  },
  {
    id: 'cc-364',
    group: 'capital-creciente',
    name: 'Capital creciente 364 días',
    kind: 'Capital creciente',
    contract: '••1172',
    value: 805181.25,
    previousValue: 798141.67,
    fixedTerm: { start: '2026-03-02', end: '2027-03-01', termDays: 364, principal: 750000, rate: 10.9 },
  },
  {
    id: 'bitforward',
    group: 'bitforward',
    name: 'BitForward',
    kind: 'Activos digitales',
    contract: '••7710',
    value: 352791.79,
    previousValue: 339410.12,
  },
];

export interface DemoCase {
  id: string;
  area: string;
  title: string;
  stage: number;
  stages: number;
  stageName: string;
  nextStep: string;
  due: string;
}

export const demoCases: DemoCase[] = [
  {
    id: 'legado',
    area: 'Legado',
    title: 'Plan de legado',
    stage: 3,
    stages: 5,
    stageName: 'Revisión de documentos',
    nextStep: 'Entregar actas y escrituras pendientes',
    due: '2026-11-28',
  },
  {
    id: 'fiscal',
    area: 'Fiscal y Contable',
    title: 'Declaración anual 2026',
    stage: 2,
    stages: 4,
    stageName: 'Integración de constancias',
    nextStep: 'Compartir constancias de retenciones',
    due: '2027-01-29',
  },
];

export interface DemoPublication {
  id: string;
  topic: string;
  title: string;
  source: string;
  date: string;
  minutes: number;
}

export const demoPublications: DemoPublication[] = [
  {
    id: 'tasa-fija-inflacion',
    topic: 'Renta fija',
    title: 'Cómo leer una tasa fija frente a la inflación',
    source: 'Análisis AFORTU',
    date: '2026-11-10',
    minutes: 4,
  },
  {
    id: 'liquidez-horizonte',
    topic: 'Patrimonio',
    title: 'Liquidez y horizonte: ordenar los vencimientos del año',
    source: 'Análisis AFORTU',
    date: '2026-11-06',
    minutes: 6,
  },
  {
    id: 'retiro-cierre',
    topic: 'Retiro',
    title: 'Qué revisar de tu plan de retiro antes del cierre fiscal',
    source: 'Análisis AFORTU',
    date: '2026-11-03',
    minutes: 5,
  },
];

/** Accesos de OS+. Sus funciones no se definen en el prototipo: integración pendiente. */
export const osPlusTools = [
  { id: 'atlas', name: 'Atlas' },
  { id: 'intelligence', name: 'Intelligence' },
  { id: 'analisis', name: 'Análisis' },
] as const;
