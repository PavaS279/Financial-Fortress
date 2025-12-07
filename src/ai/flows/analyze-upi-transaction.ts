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
    .describe('Details of the UPI transaction, including sender, receiver, amount, and timestamp.'),
});

export type AnalyzeUpiTransactionInput = z.infer<typeof AnalyzeUpiTransactionInputSchema>;

const AnalyzeUpiTransactionOutputSchema = z.object({
  isScam: z.boolean().describe('Whether the transaction is likely a scam.'),
  riskFactors: z.array(z.string()).describe('List of risk factors identified in the transaction.'),
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
  prompt: `You are an expert in identifying UPI scams. Analyze the provided transaction details and determine if it is a potential scam.\n\nTransaction Details: {{{transactionDetails}}}\n\nRespond with whether the transaction is a scam, list the risk factors identified, and provide a short explanation.`,
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
