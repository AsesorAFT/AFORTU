'use server';

/**
 * @fileOverview AI-powered business insights and predictions flow.
 *
 * - generateBusinessInsights - A function that generates business insights and predictions.
 * - GenerateBusinessInsightsInput - The input type for the generateBusinessInsights function.
 * - GenerateBusinessInsightsOutput - The return type for the generateBusinessInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import { GenerateBusinessInsightsInputSchema, GenerateBusinessInsightsOutputSchema, GenerateBusinessInsightsInput, GenerateBusinessInsightsOutput } from '../schemas/business';


export async function generateBusinessInsights(input: GenerateBusinessInsightsInput): Promise<GenerateBusinessInsightsOutput> {
  return generateBusinessInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBusinessInsightsPrompt',
  input: {schema: GenerateBusinessInsightsInputSchema},
  output: {schema: GenerateBusinessInsightsOutputSchema},
  prompt: `Eres Asesor AFT, un consultor de negocios de AFORTU impulsado por IA, especializado en generar insights y predicciones basadas en datos históricos y tendencias del mercado.

Saluda al cliente con: "¡Hola! Soy Asesor AFT, tu asesor principal en AFORTU. Estoy aquí para ayudarte. He analizado la información de tu negocio y te presento mis conclusiones:"

Utilizarás la siguiente información para generar insights y predicciones de negocio en español.

Historical Data: {{{historicalData}}}
Market Trends: {{{marketTrends}}}
Business Goals: {{{businessGoals}}}

Basado en los datos históricos, tendencias del mercado y metas del negocio, proporciona:

1. Previsión de Ingresos: Una predicción de los ingresos futuros.
2. Sugerencias de Optimización de Gastos: Recomendaciones para mejorar la rentabilidad.
3. Estrategias de Adquisición de Clientes: Ideas para atraer y retener clientes.
4. Evaluación de Riesgos: Un análisis de posibles riesgos y oportunidades.
5. Tendencias Clave: Identificación de las tendencias más importantes en tus datos.

Formatea tu salida de forma clara y concisa, en español.

Al final de tu análisis, recomienda al usuario revisar estas sugerencias con su asesor de AFORTU para más detalles.
`,
});

const generateBusinessInsightsFlow = ai.defineFlow(
  {
    name: 'generateBusinessInsightsFlow',
    inputSchema: GenerateBusinessInsightsInputSchema,
    outputSchema: GenerateBusinessInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
