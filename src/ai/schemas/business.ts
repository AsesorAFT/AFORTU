import { z } from 'genkit';

export const GenerateBusinessInsightsInputSchema = z.object({
  historicalData: z
    .string()
    .describe(
      'Un registro detallado de datos históricos del negocio, incluyendo ingresos, gastos e información de clientes.'
    ),
  marketTrends: z
    .string()
    .describe('Información sobre las tendencias actuales del mercado y análisis de la competencia.'),
  businessGoals: z
    .string()
    .describe('Una descripción de las metas y objetivos del negocio.'),
});
export type GenerateBusinessInsightsInput = z.infer<typeof GenerateBusinessInsightsInputSchema>;

export const GenerateBusinessInsightsOutputSchema = z.object({
  revenueForecast: z
    .string()
    .describe('Una predicción de los ingresos futuros basada en datos históricos y tendencias del mercado.'),
  expenseOptimizationSuggestions: z
    .string()
    .describe('Sugerencias para optimizar gastos y mejorar la rentabilidad.'),
  customerAcquisitionStrategies: z
    .string()
    .describe('Estrategias para adquirir nuevos clientes y retener a los existentes.'),
  riskAssessment: z
    .string()
    .describe('Una evaluación de los riesgos y oportunidades potenciales para el negocio.'),
  keyTrends: z
    .string()
    .describe('Identificación de tendencias en ingresos, gastos y rentabilidad')
});
export type GenerateBusinessInsightsOutput = z.infer<typeof GenerateBusinessInsightsOutputSchema>;
