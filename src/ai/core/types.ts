// Add 'system' to the roles allowed for chat messages

export type ChatMessageRole = 'user' | 'model' | 'tool' | 'system';

export interface ChatMessage {
  role: ChatMessageRole;
  content: string;
  // include any other fields the project expects:
  // name?: string;
  // timestamp?: string;
  // metadata?: Record<string, any>;
}