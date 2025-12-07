import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI({ apiVersion: 'v1' })],
});

// Setting the model explicitly after initialization is more robust.
ai.model = 'gemini-pro';
