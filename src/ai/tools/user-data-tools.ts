'use server';

/**
 * @fileOverview Genkit tools for fetching user-specific data.
 */

import { ai } from '@/ai/genkit';
import { fetchUserPortfolio, fetchBusinessData, fetchBusinessGoals, fetchInvoices, fetchContracts, fetchInvestmentPlans, fetchAccountLog } from '@/services/user-data-service';
import { z } from 'zod';

export const getUserPortfolio = ai.defineTool(
  {
    name: 'getUserPortfolio',
    description: 'Retrieves the current user\'s investment portfolio from the database.',
    inputSchema: z.object({}),
    outputSchema: z.string(),
  },
  async () => {
    return await fetchUserPortfolio();
  }
);

export const getBusinessData = ai.defineTool(
    {
        name: 'getBusinessData',
        description: 'Retrieves the current user\'s historical business data from the database.',
        inputSchema: z.object({}),
        outputSchema: z.string(),
    },
    async () => {
        return await fetchBusinessData();
    }
);

export const getBusinessGoals = ai.defineTool(
    {
        name: 'getBusinessGoals',
        description: 'Retrieves the current user\'s defined business goals from the database.',
        inputSchema: z.object({}),
        outputSchema: z.string(),
    },
    async () => {
        return await fetchBusinessGoals();
    }
);

export const getUserInvoices = ai.defineTool(
    {
        name: 'getUserInvoices',
        description: 'Retrieves the user\'s invoice history, including status and amounts.',
        inputSchema: z.object({}),
        outputSchema: z.string(),
    },
    async () => {
        return await fetchInvoices();
    }
);

export const getUserContracts = ai.defineTool(
    {
        name: 'getUserContracts',
        description: 'Retrieves the user\'s contracts for services and investments.',
        inputSchema: z.object({}),
        outputSchema: z.string(),
    },
    async () => {
        return await fetchContracts();
    }
);

export const getUserInvestmentPlans = ai.defineTool(
    {
        name: 'getUserInvestmentPlans',
        description: 'Retrieves the user\'s long-term investment plans and their progress.',
        inputSchema: z.object({}),
        outputSchema: z.string(),
    },
    async () => {
        return await fetchInvestmentPlans();
    }
);

export const getAccountLog = ai.defineTool(
    {
        name: 'getAccountLog',
        description: 'Retrieves the log of activities and interactions performed by the AFORTU advisor for the user\'s account.',
        inputSchema: z.object({}),
        outputSchema: z.string(),
    },
    async () => {
        return await fetchAccountLog();
    }
);
