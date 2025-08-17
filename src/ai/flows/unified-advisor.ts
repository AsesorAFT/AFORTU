'use server';

/**
 * @fileOverview Unified Conversational AI flow for Asesor AFT.
 * This flow acts as a conversational chatbot with access to financial tools.
 * Enhanced with intent detection, prefetching, and structured output.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { ChatMessageSchema } from '../schemas/chats';
import { getStockPrice } from '../tools/stock-price-tool';
import { getAccountLog, getBusinessData, getBusinessGoals, getUserContracts, getUserInvestmentPlans, getUserInvoices, getUserPortfolio } from '../tools/user-data-tools';

// Enhanced schemas with optional fields for UI consumption
const UnifiedAdvisorInputSchema = z.object({
  history: z.array(ChatMessageSchema),
  message: z.string().describe('The latest message from the user.'),
});
export type UnifiedAdvisorInput = z.infer<typeof UnifiedAdvisorInputSchema>;

const UnifiedAdvisorOutputSchema = z.object({
  response: z
    .string()
    .describe('The AI advisor\'s response to the user\'s message.'),
  actions: z
    .array(z.string())
    .optional()
    .describe('Optional list of suggested actions for the user.'),
  dataSourcesUsed: z
    .array(z.string())
    .optional()
    .describe('Optional list of data sources that were consulted for this response.'),
});
export type UnifiedAdvisorOutput = z.infer<typeof UnifiedAdvisorOutputSchema>;

// Intent detection using regex patterns
function detectIntent(message: string): string[] {
  const intents: string[] = [];
  const lowercaseMessage = message.toLowerCase();

  // Portfolio-related intents
  if (/\b(portafolio|portf[oó]lio|inversio|accio|invert|nasdaq|bolsa|mercado|stock|precio)\b/i.test(message)) {
    intents.push('portfolio');
  }

  // Business-related intents 
  if (/\b(negocio|empresa|ventas|ingresos|proyecc|objetivo|meta|plan)\b/i.test(message)) {
    intents.push('business');
  }

  // Invoice/billing intents
  if (/\b(factura|cobro|saldo|pago|deuda|estado\s+de\s+cuenta)\b/i.test(message)) {
    intents.push('invoices');
  }

  // Contract intents
  if (/\b(contrato|acuerdo|servicio|plan\s+de\s+inversion)\b/i.test(message)) {
    intents.push('contracts');
  }

  // Account/advisor activity intents
  if (/\b(asesor|actividad|seguimiento|bitacora|log|historial)\b/i.test(message)) {
    intents.push('account');
  }

  // Investment planning intents
  if (/\b(plan|planificacion|largo\s+plazo|jubilacion|pension|inversion\s+estructurada)\b/i.test(message)) {
    intents.push('investment_plans');
  }

  return intents;
}

// Prefetch relevant tools based on detected intents
function getToolsForIntents(intents: string[]) {
  const toolMap = {
    'portfolio': [getUserPortfolio, getStockPrice],
    'business': [getBusinessData, getBusinessGoals], 
    'invoices': [getUserInvoices],
    'contracts': [getUserContracts],
    'investment_plans': [getUserInvestmentPlans],
    'account': [getAccountLog]
  };

  const tools = new Set([getStockPrice]); // Always include stock price tool
  intents.forEach(intent => {
    if (toolMap[intent as keyof typeof toolMap]) {
      toolMap[intent as keyof typeof toolMap].forEach(tool => tools.add(tool));
    }
  });

  return Array.from(tools);
}

// AFORTU disclaimer
const AFORTU_DISCLAIMER = "\n\nRecuerda revisar los temas tratados con tu asesor de AFORTU para mayor detalle y asesoramiento personalizado.";

function ensureAfortuDisclaimer(response: string): string {
  // Check if disclaimer is already present
  if (response.includes("asesor de AFORTU") || response.includes("AFORTU")) {
    return response;
  }
  return response + AFORTU_DISCLAIMER;
}

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

<SYSTEM_INSTRUCTIONS>
Utiliza las herramientas disponibles para responder de manera precisa. Tienes acceso a:
- getUserPortfolio y getStockPrice: Para análisis de mercados y portafolios
- getBusinessData y getBusinessGoals: Para proyecciones de negocio  
- getUserInvoices: Para preguntas sobre facturación y saldos
- getUserContracts: Para consultas sobre contratos y servicios
- getUserInvestmentPlans: Para planes de inversión a largo plazo
- getAccountLog: Para actividades del asesor en la cuenta
- Conceptos financieros, cálculos de pensiones y estrategias de inversión
</SYSTEM_INSTRUCTIONS>

<CONVERSATION_HISTORY>
{{#each history}}
- {{role}}: {{{content}}}
{{/each}}
</CONVERSATION_HISTORY>

<USER_MESSAGE>
- user: {{{message}}}
</USER_MESSAGE>

Responde al nuevo mensaje del usuario teniendo en cuenta el historial de la conversación. Utiliza tus herramientas cuando sea necesario para obtener información actualizada y precisa. Siempre incluye el disclaimer de AFORTU al final si no está ya presente en tu respuesta.`,
});

const conversationalAdvisorFlow = ai.defineFlow(
  {
    name: 'conversationalAdvisorFlow',
    inputSchema: UnifiedAdvisorInputSchema,
    outputSchema: UnifiedAdvisorOutputSchema,
  },
  async (input) => {
    // Detect intents from the message
    const detectedIntents = detectIntent(input.message);
    
    // Combine history and the new message for the prompt
    const combinedHistory = [...input.history, { role: 'user' as const, content: input.message }];

    const { output } = await prompt({
        history: combinedHistory,
        message: input.message
    });
    
    let response = output?.response || "No se pudo obtener una respuesta del asesor. Intenta de nuevo.";
    
    // Ensure AFORTU disclaimer is present
    response = ensureAfortuDisclaimer(response);
    
    // Track which data sources were potentially used based on intents
    const dataSourcesUsed = detectedIntents.length > 0 ? detectedIntents : undefined;
    
    // Generate suggested actions based on intents (optional for UI)
    const actions = detectedIntents.length > 0 ? 
      detectedIntents.map(intent => {
        const actionMap = {
          'portfolio': 'Ver análisis detallado del portafolio',
          'business': 'Generar reporte de proyecciones',
          'invoices': 'Revisar estado de cuenta completo',
          'contracts': 'Consultar términos y condiciones',
          'investment_plans': 'Explorar planes de inversión',
          'account': 'Ver historial completo de actividades'
        };
        return actionMap[intent as keyof typeof actionMap] || 'Consultar con asesor';
      }) : undefined;

    return {
        response,
        actions,
        dataSourcesUsed
    };
  }
);
