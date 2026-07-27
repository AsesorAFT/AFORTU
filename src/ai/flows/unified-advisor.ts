"use server";

import type { ChatMessage } from "@/ai/schemas/chat";

interface UnifiedChatInput {
  history: ChatMessage[];
  message: string;
}

interface UnifiedChatOutput {
  response: string;
}

export async function unifiedChat(
  _input: UnifiedChatInput,
): Promise<UnifiedChatOutput> {
  throw new Error("El asesor de IA no está configurado en este entorno.");
}
