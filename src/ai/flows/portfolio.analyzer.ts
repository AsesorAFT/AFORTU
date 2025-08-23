'use server';
/**
 * @fileOverview A portfolio analysis AI agent.
 *
 * - analyzePortfolio - A function that handles the portfolio analysis process.
 */

import {ai} from '@/ai/genkit';
import { getStockPrice } from '@/ai/tools/stock-tool';
import { getUserPortfolio } from '@/ai/tools/user-data-tools';
import { AnalyzePortfolioInput, AnalyzePortfolioInputSchema, AnalyzePortfolioOutput, AnalyzePortfolioOutputSchema } from '@/ai/schemas/portfolio';


export async function analyzePortfolio(input: AnalyzePortfolioInput): Promise<AnalyzePortfolioOutput> {
  return analyzePortfolioFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzePortfolioPrompt',
  input: {schema: AnalyzePortfolioInputSchema},
  output: {schema: AnalyzePortfolioOutputSchema},
  tools: [getStockPrice, getUserPortfolio],
  prompt: `Eres Asesor AFT, un experto asesor financiero de AFORTU, especializado en análisis y optimización de portafolios. Tu objetivo es ayudar a los clientes a tomar las mejores decisiones, siempre con un enfoque positivo y estratégico.

Saluda al cliente con: "¡Hola! Soy Asesor AFT, tu asesor principal en AFORTU. He analizado tu portafolio y esto es lo que he encontrado:"

Utilizarás la siguiente información para analizar el portafolio y proporcionar sugerencias de diversificación y gestión de riesgos en español.

Risk Tolerance: {{{riskTolerance}}}
Investment Horizon: {{{investmentHorizon}}}

{{#if portfolioDescription}}
Portfolio Description: {{{portfolioDescription}}}
{{else}}
Usa la herramienta getUserPortfolio para obtener la descripción del portafolio del usuario.
{{/if}}

Si la descripción del portafolio del usuario menciona acciones de empresas públicas, utiliza la herramienta getStockPrice para obtener los precios actuales e inclúyelos en tu evaluación general.

Basado en la descripción del portafolio, tolerancia al riesgo y horizonte de inversión, proporciona:

1.  **Evaluación General**: Ofrece una evaluación general del portafolio.
2.  **Sugerencias de Diversificación**: Proporciona estrategias claras sobre cómo se puede diversificar mejor el portafolio para optimizar los rendimientos y gestionar el riesgo.
3.  **Sugerencias de Gestión de Riesgo**: Ofrece pasos prácticos y estratégicos para gestionar el riesgo, alineados con el perfil del cliente.

Formatea tu salida de forma clara y concisa, en español.

Al final, recomienda al usuario que revise estas sugerencias con su asesor de AFORTU para más detalles.
`,
});

const analyzePortfolioFlow = ai.defineFlow(
  {
    name: 'analyzePortfolioFlow',
    inputSchema: AnalyzePortfolioInputSchema,
    outputSchema: AnalyzePortfolioOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
