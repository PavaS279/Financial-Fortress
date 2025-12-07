'use server';
/**
 * @fileOverview An insurance policy summarization AI agent.
 *
 * - summarizeInsurancePolicy - A function that handles the insurance policy summarization process.
 * - SummarizeInsurancePolicyInput - The input type for the summarizeInsurancePolicy function.
 * - SummarizeInsurancePolicyOutput - The return type for the summarizeInsurancePolicy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeInsurancePolicyInputSchema = z.object({
  policyText: z
    .string()
    .describe("The text of the insurance policy to be summarized."),
});
export type SummarizeInsurancePolicyInput = z.infer<typeof SummarizeInsurancePolicyInputSchema>;

const SummarizeInsurancePolicyOutputSchema = z.object({
  summary: z.string().describe("A simplified summary of the insurance policy, highlighting key terms, exclusions, and benefits."),
});
export type SummarizeInsurancePolicyOutput = z.infer<typeof SummarizeInsurancePolicyOutputSchema>;

export async function summarizeInsurancePolicy(input: SummarizeInsurancePolicyInput): Promise<SummarizeInsurancePolicyOutput> {
  return summarizeInsurancePolicyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeInsurancePolicyPrompt',
  input: {schema: SummarizeInsurancePolicyInputSchema},
  output: {schema: SummarizeInsurancePolicyOutputSchema},
  prompt: `You are an expert at simplifying complex insurance policies into plain language.

You will receive the text of an insurance policy, and you will generate a user-friendly summary that highlights key terms, exclusions, and benefits.

Policy Text: {{{policyText}}}`,
});

const summarizeInsurancePolicyFlow = ai.defineFlow(
  {
    name: 'summarizeInsurancePolicyFlow',
    inputSchema: SummarizeInsurancePolicyInputSchema,
    outputSchema: SummarizeInsurancePolicyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
