'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing UPI transactions to identify potential scams and social engineering tactics.
 *
 * The flow takes UPI transaction details as input and returns a detailed scam risk assessment.
 *
 * @interface AnalyzeUpiTransactionInput - The input type for the analyzeUpiTransaction function.
 * @interface AnalyzeUpiTransactionOutput - The output type for the analyzeUpiTransaction function.
 * @function analyzeUpiTransaction - A function that analyzes UPI transaction details and returns a scam risk assessment.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeUpiTransactionInputSchema = z.object({
  messageContent: z.string().describe('The full details of the transaction to analyze, including amount, recipient, and description.'),
  context: z.string().describe('The context of the transaction, such as who the recipient is (individual, business) and any reference codes.'),
});

export type AnalyzeUpiTransactionInput = z.infer<typeof AnalyzeUpiTransactionInputSchema>;

const AnalyzeUpiTransactionOutputSchema = z.object({
  riskLevel: z
    .enum(['low', 'medium', 'high'])
    .describe('The risk level of the message (low, medium, or high).'),
  riskScore: z.number().min(0).max(10).describe('A risk score from 1-10, where 10 is the highest risk.'),
  specificThreats: z
    .array(z.string())
    .describe('An array of specific threats identified in the message.'),
  explanation: z.string().describe('An explanation of why the message is considered risky.'),
  safetyTips: z.array(z.string()).describe('Safety tips for handling the message.'),
});

export type AnalyzeUpiTransactionOutput = z.infer<typeof AnalyzeUpiTransactionOutputSchema>;

export async function analyzeUpiTransaction(
  input: AnalyzeUpiTransactionInput
): Promise<AnalyzeUpiTransactionOutput> {
  return analyzeUpiTransactionFlow(input);
}

const analyzeUpiTransactionPrompt = ai.definePrompt({
  name: 'analyzeUpiTransactionPrompt',
  model: 'gemini-2.5-flash',
  input: {schema: AnalyzeUpiTransactionInputSchema},
  output: {schema: AnalyzeUpiTransactionOutputSchema},
  prompt: `You are an expert in identifying UPI scams in India. Analyze the following UPI transaction for phishing and social engineering tactics. Provide a risk assessment and safety tips.

Transaction Details:
{{{messageContent}}}

Context:
{{{context}}}

Known Scammer UPI IDs: ['fraud@fakebank', 'scammer99@okscam', 'getrichquick@scamupi']

Evaluate for:
1.  Urgency manipulation tactics (e.g., "pay immediately to avoid penalty").
2.  Authority impersonation (e.g., pretending to be from a bank or government agency).
3.  Suspicious requests for refunds or "unlocking" money.
4.  Emotional manipulation (e.g., fake charity or emergency story).
5.  Information harvesting attempts (e.g., asking for PIN or other details).
6.  Comparison of recipient ID to the known scammer list.
7.  Unusually high or odd transaction amounts.

Return a JSON object with the following keys:
- riskLevel: (low, medium, or high)
- riskScore: (a number from 0 to 10 based on the severity and number of threats)
- specificThreats: (an array of specific threats or red flags identified)
- explanation: (a clear, concise explanation of your assessment)
- safetyTips: (an array of actionable safety tips for the user)

Ensure that the returned JSON is valid and parsable.`,
});

const analyzeUpiTransactionFlow = ai.defineFlow(
  {
    name: 'analyzeUpiTransactionFlow',
    inputSchema: AnalyzeUpiTransactionInputSchema,
    outputSchema: AnalyzeUpiTransactionOutputSchema,
  },
  async input => {
    const {output} = await analyzeUpiTransactionPrompt(input);
    return output!;
  }
);
