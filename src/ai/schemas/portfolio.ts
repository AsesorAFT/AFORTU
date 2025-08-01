import { z } from 'zod';

export const AnalyzePortfolioInputSchema = z.object({
  portfolioDescription: z
    .string()
    .describe(
      'A description of the current portfolio, including the assets, their weights, and any relevant financial goals. This is optional, if not provided, the getUserPortfolio tool should be used.'
    ).optional(),
  riskTolerance: z
    .string()
    .describe('The client’s risk tolerance (e.g., low, medium, high).'),
  investmentHorizon: z
    .string()
    .describe('The client’s investment horizon (e.g., short, medium, long term).'),
});
export type AnalyzePortfolioInput = z.infer<typeof AnalyzePortfolioInputSchema>;

export const AnalyzePortfolioOutputSchema = z.object({
  diversificationSuggestions: z
    .string()
    .describe(
      'Sugerencias para diversificar el portafolio para reducir el riesgo y mejorar los rendimientos.'
    ),
  riskManagementSuggestions: z
    .string()
    .describe(
      'Sugerencias para gestionar el riesgo en el portafolio, basadas en la tolerancia al riesgo y el horizonte de inversión del cliente.'
    ),
  overallAssessment: z
    .string()
    .describe('Una evaluación general del portafolio y su idoneidad.'),
});
export type AnalyzePortfolioOutput = z.infer<typeof AnalyzePortfolioOutputSchema>;
