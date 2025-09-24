import { ChatMessage } from '../schemas/chat';

export async function semanticSummarize(messages: ChatMessage[]): Promise<{ summary: string }> {
  // Implementa aquí tu lógica real de resumen o deja un resumen simulado
  return { summary: 'Resumen simulado.' };
}