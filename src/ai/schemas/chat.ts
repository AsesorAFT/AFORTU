/**
 * Chat schemas for compatibility
 */

export interface ChatMessage {
  role: 'user' | 'model' | 'tool';
  content: string;
}