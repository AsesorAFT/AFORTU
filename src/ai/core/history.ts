import { ChatMessage } from '../schemas/chat';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function semanticSummarize(messages: ChatMessage[]): Promise<{ summary: string }> {
  // Filtra solo mensajes válidos
  const validMessages = messages.filter(
    (m): m is ChatMessage =>
      !!m &&
      typeof m.role === 'string' &&
      (m.role === "user" || m.role === "assistant" || m.role === "system") &&
      typeof m.content === 'string'
  );

  const prompt = `
Eres un asistente que resume conversaciones de chat. Resume los siguientes mensajes de manera clara y concisa en español:

${validMessages.map(m => `${m.role}: ${m.content}`).join('\n')}
`;

  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const summary = response.text().trim();

  return { summary };
}