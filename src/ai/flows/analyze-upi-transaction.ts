'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing UPI transactions to identify potential scams.
 *
 * The flow takes UPI transaction details as input and returns a scam risk assessment.
 *
 * @interface AnalyzeUpiTransactionInput - The input type for the analyzeUpiTransaction function.
 * @interface AnalyzeUpiTransactionOutput - The output type for the analyzeUpiTransaction function.
 * @function analyzeUpiTransaction - A function that analyzes UPI transaction details and returns a scam risk assessment.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeUpiTransactionInputSchema = z.object({
  transactionDetails: z
    .string()
    .describe('Details of the UPI transaction, including amount, recipient, recipient type, description, and any reference codes.'),
});

export type AnalyzeUpiTransactionInput = z.infer<typeof AnalyzeUpiTransactionInputSchema>;

const AnalyzeUpiTransactionOutputSchema = z.object({
  riskScore: z.number().min(0).max(10).describe('A risk score from 1-10, where 10 is the highest risk.'),
  riskLevel: z.enum(['Low', 'Medium', 'High']).describe('The overall risk level of the transaction.'),
  riskFactors: z.array(z.string()).describe('List of specific risk factors or red flags identified in the transaction.'),
  recommendedActions: z.array(z.string()).describe('A list of recommended actions for the user to take.'),
  similarScam: z.string().optional().describe('Details of a similar scam from a database if a match is found.'),
  isScam: z.boolean().describe('Whether the transaction is likely a scam.'),
  explanation: z.string().describe('Explanation of why the transaction is classified as a scam or not.'),
});

export type AnalyzeUpiTransactionOutput = z.infer<typeof AnalyzeUpiTransactionOutputSchema>;

export async function analyzeUpiTransaction(
  input: AnalyzeUpiTransactionInput
): Promise<AnalyzeUpiTransactionOutput> {
  return analyzeUpiTransactionFlow(input);
}

const analyzeUpiTransactionPrompt = ai.definePrompt({
  name: 'analyzeUpiTransactionPrompt',
  input: {schema: AnalyzeUpiTransactionInputSchema},
  output: {schema: AnalyzeUpiTransactionOutputSchema},
  prompt: `You are an expert in identifying UPI scams. Analyze the provided transaction details and determine if it is a potential scam.

Transaction Details: {{{transactionDetails}}}

Your response must include:
1.  A risk score from 1-10 (10 being highest risk).
2.  A risk level ('Low', 'Medium', 'High').
3.  A list of specific red flags (riskFactors).
4.  A list of recommended actions for the user.
5.  If the transaction matches a known scam pattern, describe the similar scam.
6.  A boolean 'isScam' field.
7.  A brief 'explanation' of your assessment.
`,
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
