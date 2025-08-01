import { z } from 'genkit';

export const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model', 'tool']),
  content: z.string(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;
