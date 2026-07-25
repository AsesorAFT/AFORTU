// Temporalmente deshabilitado para desarrollo
"use server";

// import { genkit } from 'genkit';
// import { googleAI } from '@genkit-ai/googleai';

// export const ai = genkit({
//   plugins: [
//     googleAI({
//       apiKey: process.env.GEMINI_API_KEY,
//     }),
//     // No agregues googleCloud ni firebase aquí
//   ],
// });

type AsyncHandler = (input: any) => any;

interface DisabledAI {
  chat(...args: unknown[]): null;
  flow(...args: unknown[]): null;
  definePrompt<TConfig = unknown>(
    config: TConfig,
  ): (input: unknown) => Promise<{ output: any }>;
  defineFlow<TInputSchema = unknown, TOutputSchema = unknown>(
    config: unknown,
    handler: AsyncHandler,
  ): AsyncHandler;
  defineTool<TInput = unknown, TOutput = unknown>(
    config: unknown,
    handler: AsyncHandler,
  ): AsyncHandler;
}

// Adaptador tipado para mantener compilable la aplicación mientras Genkit está deshabilitado.
// Si una función de IA se invoca, falla de forma explícita en lugar de simular una respuesta.
export const ai: DisabledAI = {
  chat: () => null,
  flow: () => null,
  definePrompt: () => async () => {
    throw new Error(
      "Las funciones de IA no están configuradas en este entorno.",
    );
  },
  defineFlow: (_config, handler) => handler,
  defineTool: (_config, handler) => handler,
};
