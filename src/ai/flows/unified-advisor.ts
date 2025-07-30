'use server';

/**
 * @fileOverview Unified Conversational AI flow for Asesor AFT.
 * This flow acts as a conversational chatbot with access to financial tools.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { ChatMessageSchema } from '../schemas/chat';
import { getStockPrice } from '../tools/stock-price-tool';
import { getAccountLog, getBusinessData, getBusinessGoals, getUserContracts, getUserInvestmentPlans, getUserInvoices, getUserPortfolio } from '../tools/user-data-tools';

const UnifiedAdvisorInputSchema = z.object({
  history: z.array(ChatMessageSchema),
  message: z.string().describe('The latest message from the user.'),
});
export type UnifiedAdvisorInput = z.infer<typeof UnifiedAdvisorInputSchema>;

const UnifiedAdvisorOutputSchema = z.object({
  response: z
    .string()
    .describe('The AI advisor\'s response to the user\'s message.'),
});
export type UnifiedAdvisorOutput = z.infer<typeof UnifiedAdvisorOutputSchema>;

export async function unifiedChat(input: UnifiedAdvisorInput): Promise<UnifiedAdvisorOutput> {
  return conversationalAdvisorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'unifiedAdvisorPrompt',
  input: {schema: UnifiedAdvisorInputSchema},
  output: {schema: UnifiedAdvisorOutputSchema},
  tools: [
    getStockPrice,
    getUserPortfolio,
    getBusinessData,
    getBusinessGoals,
    getUserInvoices,
    getUserContracts,
    getUserInvestmentPlans,
    getAccountLog,
  ],
  prompt: `Eres Asesor AFT, un consultor de negocios y finanzas de AFORTU impulsado por IA. Tu tono es excepcionalmente optimista, positivo y estratégico. Tu misión es empoderar a los clientes para que tomen las mejores decisiones, siempre enfocado en las oportunidades y en cómo mejorar su servicio y resultados.

Mantén tus respuestas concisas y directas, inspirando confianza y motivación.

Utiliza las herramientas disponibles para responder a las preguntas del usuario de la manera más precisa posible. Tienes acceso a información sobre su portafolio, datos de negocio, facturas, contratos, planes de inversión y la bitácora de seguimiento de su cuenta.

- Para análisis de mercados y portafolios, usa las herramientas 'getUserPortfolio' y 'getStockPrice'.
- Para proyecciones de negocio, usa 'getBusinessData' y 'getBusinessGoals'.
- Para preguntas sobre facturación, saldos o contratos, usa 'getUserInvoices' y 'getUserContracts'.
- Para consultas sobre planes a largo plazo, usa 'getUserInvestmentPlans'.
- Para saber qué ha hecho un asesor por la cuenta, usa 'getAccountLog'.
- Puedes explicar conceptos financieros, calcular pensiones y proponer estrategias de inversión.

El historial de la conversación es:
{{#each history}}
- {{role}}: {{{content}}}
{{/each}}

El nuevo mensaje del usuario es:
- user: {{{message}}}

Responde al nuevo mensaje del usuario, teniendo en cuenta el historial de la conversación y utilizando tus herramientas si es necesario para obtener la información más actualizada y precisa.

Siempre finaliza tus respuestas recomendando revisar los temas tratados con su asesor de AFORTU para mayor detalle.
`,
});

const conversationalAdvisorFlow = ai.defineFlow(
  {
    name: 'conversationalAdvisorFlow',
    inputSchema: UnifiedAdvisorInputSchema,
    outputSchema: UnifiedAdvisorOutputSchema,
  },
  async (input) => {
    
    // Combine history and the new message for the prompt
    const combinedHistory = [...input.history, { role: 'user' as const, content: input.message }];

    const { output } = await prompt({
        history: combinedHistory,
        message: input.message // The message is also available at the top level for the prompt template
    });
    
    return {
        response: output?.response || "No se pudo obtener una respuesta del asesor. Intenta de nuevo."
    };
  }
);
