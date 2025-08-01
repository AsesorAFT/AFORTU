'use server';

/**
 * @fileOverview AI-powered business insights from portfolio data flow.
 *
 * - analyzePortfolioData - A function that generates business insights from portfolio data.
 * - AnalyzePortfolioDataInput - The input type for the analyzePortfolioData function.
 * - AnalyzePortfolioDataOutput - The return type for the analyzePortfolioData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzePortfolioDataInputSchema = z.object({
  portfolioData: z
    .string()
    .describe(
      'A detailed record of client portfolio data, including asset allocations, performance history, and investment goals.'
    ),
  marketTrends: z
    .string()
    .describe('Information about current market trends and economic indicators.'),
});
export type AnalyzePortfolioDataInput = z.infer<typeof AnalyzePortfolioDataInputSchema>;

const AnalyzePortfolioDataOutputSchema = z.object({
  keyInsights: z
    .string()
    .describe('A summary of key insights derived from the portfolio data.'),
  anomaliesDetected: z
    .string()
    .describe('Identification of any anomalies or unusual patterns in the portfolio data.'),
  potentialRisks: z
    .string()
    .describe('An assessment of potential risks associated with the portfolio.'),
  opportunitiesIdentified: z
    .string()
    .describe('Identification of potential investment opportunities.'),
});
export type AnalyzePortfolioDataOutput = z.infer<typeof AnalyzePortfolioDataOutputSchema>;

export async function analyzePortfolioData(input: AnalyzePortfolioDataInput): Promise<AnalyzePortfolioDataOutput> {
  return analyzePortfolioDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzePortfolioDataPrompt',
  input: {schema: AnalyzePortfolioDataInputSchema},
  output: {schema: AnalyzePortfolioDataOutputSchema},
  prompt: `You are an AI-powered financial advisor specializing in analyzing portfolio data to generate insights and identify anomalies.

You will use the following information to analyze the portfolio data and provide key insights, detect anomalies, assess potential risks, and identify opportunities.

Portfolio Data: {{{portfolioData}}}
Market Trends: {{{marketTrends}}}

Based on the portfolio data and market trends, provide:

1. Key Insights: A summary of the key insights derived from the portfolio data.
2. Anomalies Detected: Identification of any anomalies or unusual patterns in the portfolio data.
3. Potential Risks: An assessment of potential risks associated with the portfolio.
4. Opportunities Identified: Identification of potential investment opportunities.

Format your output clearly and concisely.
`,
});

const analyzePortfolioDataFlow = ai.defineFlow(
  {
    name: 'analyzePortfolioDataFlow',
    inputSchema: AnalyzePortfolioDataInputSchema,
    outputSchema: AnalyzePortfolioDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
