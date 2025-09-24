'use server';

/**
 * @fileOverview A Genkit tool for fetching real-time stock prices.
 * 
 * - getStockPrice - A tool that retrieves the current market value of a stock.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const getStockPrice = ai.defineTool(
  {
    name: 'getStockPrice',
    description: 'Returns the current market value of a stock.',
    inputSchema: z.object({
      ticker: z.string().describe('The ticker symbol of the stock (e.g., NVDA, AAPL).'),
    }),
    outputSchema: z.number(),
  },
  async function (input: { ticker: string }): Promise<number> {
    // Import service dynamically inside the tool to avoid webpack issues.
    const { getStockPrice: fetchStockPrice } = await import('@/services/stock-price-service');
    try {
      const result = await fetchStockPrice(input.ticker);
      return result.price;
    } catch (error: any) {
      // Log the error for debugging but return a user-friendly message to the LLM.
      console.error(`Tool Error: getStockPrice failed for ${input.ticker}`, error);
      throw new Error(`Could not retrieve stock price for ${input.ticker}. The symbol may be invalid or the service may be down.`);
    }
  }
);