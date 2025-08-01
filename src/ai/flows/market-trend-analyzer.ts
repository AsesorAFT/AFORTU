
'use server';

/**
 * @fileOverview Market trend analysis AI agent.
 *
 * - analyzeMarketTrends - A function that handles the market trend analysis process.
 * - MarketTrendAnalyzerInput - The input type for the analyzeMarketTrends function.
 * - MarketTrendAnalyzerOutput - The return type for the analyzeMarketTrends function.
 */

import {ai} from '@/ai/genkit';
import { MarketTrendAnalyzerInput, MarketTrendAnalyzerInputSchema, MarketTrendAnalyzerOutput, MarketTrendAnalyzerOutputSchema } from '../schemas/market';


export async function analyzeMarketTrends(input: MarketTrendAnalyzerInput): Promise<MarketTrendAnalyzerOutput> {
  return analyzeMarketTrendsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'marketTrendAnalyzerPrompt',
  input: {schema: MarketTrendAnalyzerInputSchema},
  output: {schema: MarketTrendAnalyzerOutputSchema},
  prompt: `You are a financial advisor specializing in analyzing market trends and providing insights on potential investment opportunities.

You will use the following information to analyze the market trends, identify potential investment opportunities, and provide recommendations for financial advisors.

Market Description: {{{marketDescription}}}

Based on the above description, provide a summary of the current market trends, insights on potential investment opportunities, potential risks, and recommendations for financial advisors. Focus on actionable advice and insights.

Summary:
Insights:
Risks:
Recommendations:`,
});

const analyzeMarketTrendsFlow = ai.defineFlow(
  {
    name: 'analyzeMarketTrendsFlow',
    inputSchema: MarketTrendAnalyzerInputSchema,
    outputSchema: MarketTrendAnalyzerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
