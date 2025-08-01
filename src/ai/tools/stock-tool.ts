'use server';

/**
 * @fileOverview A Genkit tool for fetching real-time stock prices.
 * 
 * - getStockPrice - A tool that retrieves the current market value of a stock.
 */

import { ai } from '@/ai/genkit';
import { getStockPrice as fetchStockPrice } from '@/services/stock-price-service';
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
  async (input) => {
    try {
      const result = await fetchStockPrice(input.ticker);
      return result.price;
    } catch (error: any) {
        // Log the error for debugging but return a user-friendly message to the LLM.
        // The LLM can then decide how to relay this information.
        console.error(`Tool Error: getStockPrice failed for ${input.ticker}`, error);
        // It's often better to throw an error that the LLM can interpret.
        // Depending on the prompt, it might retry or inform the user.
        throw new Error(`Could not retrieve stock price for ${input.ticker}. The symbol may be invalid or the service may be down.`);
    }
  }
);
