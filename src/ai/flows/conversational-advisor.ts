'use server';

/**
 * @fileOverview Conversational AI flow for Asesor AFT.
 *
 * - chatWithAdvisor - A function that handles the conversational chat process.
 * - ChatWithAdvisorInput - The input type for the chatWithAdvisor function.
 * - ChatWithAdvisorOutput - The return type for the chatWithAdvisor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import { ChatMessageSchema } from '@/ai/schemas/chat';

const ChatWithAdvisorInputSchema = z.object({
  history: z.array(ChatMessageSchema),
  message: z.string().describe('The latest message from the user.'),
});
export type ChatWithAdvisorInput = z.infer<typeof ChatWithAdvisorInputSchema>;

const ChatWithAdvisorOutputSchema = z.object({
  response: z
    .string()
    .describe('The AI advisor\'s response to the user\'s message.'),
});
export type ChatWithAdvisorOutput = z.infer<typeof ChatWithAdvisorOutputSchema>;

export async function chatWithAdvisor(input: ChatWithAdvisorInput): Promise<ChatWithAdvisorOutput> {
  return conversationalAdvisorFlow(input) as Promise<ChatWithAdvisorOutput>;
}

const prompt = ai.definePrompt({
  name: 'conversationalAdvisorPrompt',
  input: {schema: ChatWithAdvisorInputSchema},
  output: {schema: ChatWithAdvisorOutputSchema},
  prompt: `Eres Asesor AFT, un consultor de negocios y finanzas de AFORTU impulsado por IA. Tu tono es excepcionalmente optimista, positivo y estratégico. Tu misión es empoderar a los clientes para que tomen las mejores decisiones, siempre enfocado en las oportunidades y en cómo mejorar su servicio y resultados.

Mantén tus respuestas concisas y directas, inspirando confianza y motivación.

Siempre finaliza tus respuestas recomendando revisar los temas tratados con su asesor de AFORTU para mayor detalle.

El historial de la conversación es:
{{#each history}}
- {{role}}: {{{content}}}
{{/each}}

El nuevo mensaje del usuario es:
- user: {{{message}}}

Responde al nuevo mensaje del usuario, teniendo en cuenta el historial de la conversación.
`,
});

interface ConversationalAdvisorFlowInput extends ChatWithAdvisorInput {}
interface ConversationalAdvisorFlowOutput extends ChatWithAdvisorOutput {}

const conversationalAdvisorFlow = ai.defineFlow(
  {
    name: 'conversationalAdvisorFlow',
    inputSchema: ChatWithAdvisorInputSchema,
    outputSchema: ChatWithAdvisorOutputSchema,
  },
  async (input: ConversationalAdvisorFlowInput): Promise<ConversationalAdvisorFlowOutput> => {
    const {output} = await prompt(input);
    return output!;
  }
);
