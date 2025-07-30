import { z } from 'genkit';

export const MarketTrendAnalyzerInputSchema = z.object({
  marketDescription: z
    .string()
    .describe(
      'A description of the market, including recent events and trends.'
    ),
});
export type MarketTrendAnalyzerInput = z.infer<typeof MarketTrendAnalyzerInputSchema>;

export const MarketTrendAnalyzerOutputSchema = z.object({
  summary: z.string().describe('A summary of the current market trends.'),
  insights: z.string().describe('Insights on potential investment opportunities.'),
  risks: z.string().describe('Potential risks associated with the market trends.'),
  recommendations: z.string().describe('Recommendations for financial advisors.'),
});
export type MarketTrendAnalyzerOutput = z.infer<typeof MarketTrendAnalyzerOutputSchema>;
