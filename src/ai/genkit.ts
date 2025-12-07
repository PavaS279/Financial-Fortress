import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI()],
  models: {
    'gemini-pro': googleAI.model('gemini-pro'),
  },
  defaultModel: 'gemini-pro',
});
