// Temporalmente deshabilitado para desarrollo
'use server';

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

// Mock AI para desarrollo
export const ai = {
  chat: () => null,
  flow: () => null,
};