import { ChatMessage } from '../schemas/chat';
// User-facing strings for i18n
const STRINGS = {
  simulatedSummary: 'Simulated summary.',
  semanticSummaryPrefix: 'Summary (semantic compression):\n',
  noRelevantContent: 'Summary: (no relevant content to summarize).',
  condensedHistory: 'Summary: condensed history (not critical).'
};

export async function semanticSummarize(messages: ChatMessage[]): Promise<{ summary: string }> {
  // Implement your real summarization logic here or leave a simulated summary
  return { summary: STRINGS.simulatedSummary };
}

export interface TrimOptions {
  maxMessages?: number;
  head?: number;
  tail?: number;
  summarizer?: 'semantic' | ((messages: ChatMessage[]) => Promise<ChatMessage | null>);
}

export async function trimHistory(
  history: ChatMessage[],
  opts: TrimOptions = {}
): Promise<ChatMessage[]> {
  const {
    maxMessages = 28,
    head = 5,
    tail = 16,
    summarizer
  } = opts;

  if (history.length <= maxMessages) return history;

  let summary: ChatMessage | null = null;
  const fallbackSummary: ChatMessage = {
    role: 'system',
    content: STRINGS.condensedHistory
  };

  if (tail <= 0) {
    throw new Error('TrimOptions.tail must be a positive number.');
  }
  const middle = history.slice(head, -tail);

  if (summarizer === 'semantic') {
    try {
      const sanitizedMiddle = middle.filter(
        (m): m is ChatMessage =>
          !!m &&
          (m.role === 'user' || m.role === 'assistant' || m.role === 'system') &&
          typeof m.content === 'string'
      );
      if (sanitizedMiddle.length > 0) {
        const { summary: summaryText } = await semanticSummarize(sanitizedMiddle);
        summary = {
          role: 'system',
          content: `${STRINGS.semanticSummaryPrefix}${summaryText}`
        };
      } else {
        summary = {
          role: 'system',
          content: STRINGS.noRelevantContent
        };
      }
    } catch (err) {
      console.error('Error during semantic summarization:', err);
      summary = null;
    }
  } else if (typeof summarizer === 'function') {
    try {
      summary = await summarizer(middle);
    } catch {
      summary = null;
    }
  }

  return [
    ...history.slice(0, head),
    summary || fallbackSummary,
    ...history.slice(-tail)
  ];
}