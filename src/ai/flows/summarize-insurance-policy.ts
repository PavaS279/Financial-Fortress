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
  insuranceType: z.string().describe("The type of insurance policy."),
  specificQuestions: z.string().optional().describe("Specific questions from the user about the policy."),
  simpleLanguage: z.boolean().optional().describe("Flag to request summary in simple language."),
});
export type SummarizeInsurancePolicyInput = z.infer<typeof SummarizeInsurancePolicyInputSchema>;

const SummarizeInsurancePolicyOutputSchema = z.object({
  policyOverview: z.object({
    policyType: z.string().describe("Type of the insurance policy (e.g., Health, Car)."),
    policyNumber: z.string().describe("The policy number."),
    tenure: z.string().describe("The tenure of the policy (e.g., 1 Year)."),
    coverageAmount: z.number().describe("The total coverage amount."),
    premium: z.string().describe("The premium amount and frequency (e.g., ₹15,000/year)."),
    keyDates: z.object({
      startDate: z.string().describe("Policy start date."),
      renewalDate: z.string().describe("Policy renewal date."),
      expiryDate: z.string().describe("Policy expiry date."),
    }),
    status: z.enum(['Active', 'Inactive', 'Expired']).describe("Current status of the policy."),
  }),
  whatIsCovered: z.object({
    summary: z.string().describe("A simple, high-level summary of what is covered."),
    coverages: z.array(z.object({
      name: z.string().describe("Name of the coverage benefit (e.g., Hospitalization)."),
      explanation: z.string().describe("Plain language explanation of the coverage."),
      limit: z.string().describe("The coverage limit (e.g., Up to ₹5,00,000)."),
    })).describe("List of main coverages."),
    scenarios: z.array(z.string()).describe("Examples of real-life scenarios that are covered."),
  }),
  whatIsNotCovered: z.object({
    summary: z.string().describe("A simple, high-level summary of what is not covered."),
    exclusions: z.array(z.object({
      name: z.string().describe("Name of the exclusion (e.g., Pre-existing Conditions)."),
      reason: z.string().describe("Explanation of why this is excluded."),
    })).describe("List of major exclusions."),
    ridersSuggestion: z.string().optional().describe("Suggestions for riders that could cover some exclusions."),
  }),
  claimProcess: z.object({
    steps: z.array(z.string()).describe("Step-by-step guide on how to file a claim."),
    documentsNeeded: z.array(z.string()).describe("List of documents required for a claim."),
    timeline: z.string().describe("Expected timeline for claim processing."),
    contactInfo: z.string().describe("Contact information for the claims department."),
    commonRejectionReasons: z.array(z.string()).describe("Common reasons why claims get rejected."),
  }),
  coverageGaps: z.object({
    gaps: z.array(z.object({
        gap: z.string().describe("Description of the coverage gap."),
        recommendation: z.string().describe("Recommendation to fill the gap (e.g., add a rider)."),
        estimatedCost: z.string().optional().describe("Estimated cost of the recommended rider."),
    })).describe("Identified gaps in the user's coverage."),
  }),
  termsExplained: z.array(z.object({
    term: z.string().describe("The insurance jargon term (e.g., Deductible)."),
    definition: z.string().describe("A simple explanation of the term."),
  })).describe("A glossary of important insurance terms found in the policy."),
  actionItems: z.array(z.string()).describe("A checklist of key things to remember or do."),
});
export type SummarizeInsurancePolicyOutput = z.infer<typeof SummarizeInsurancePolicyOutputSchema>;

export async function summarizeInsurancePolicy(input: SummarizeInsurancePolicyInput): Promise<SummarizeInsurancePolicyOutput> {
  return summarizeInsurancePolicyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeInsurancePolicyPrompt',
  model: 'gemini-2.5-flash',
  input: {schema: SummarizeInsurancePolicyInputSchema},
  output: {schema: SummarizeInsurancePolicyOutputSchema},
  prompt: `You are an expert at simplifying complex Indian insurance policies into plain, scannable, and actionable language.

You will receive the text of an insurance policy, its type, and optional specific questions from the user.
Your task is to analyze the policy and generate a comprehensive, user-friendly summary. Populate ALL the fields in the provided output schema.

- Policy Text: {{{policyText}}}
- Insurance Type: {{{insuranceType}}}
- User Questions: {{{specificQuestions}}}

Follow these instructions for each section:

1.  **policyOverview**: Extract all key details accurately. Estimate dates if not explicitly mentioned but context is available. Determine status based on dates.
2.  **whatIsCovered**: Do not just list benefits. Explain them in simple terms. Provide realistic scenarios.
3.  **whatIsNotCovered**: This is CRITICAL. Be very clear about major exclusions. Explain the 'why' if possible (e.g., to prevent fraud). Suggest riders if applicable.
4.  **claimProcess**: Make this a simple, step-by-step guide. List documents clearly. Provide a realistic timeline.
5.  **coverageGaps**: Proactively identify areas where the user might be under-insured based on the policy type.
6.  **termsExplained**: Identify 5-7 of the most important and confusing terms in the policy (like Deductible, Co-pay, Waiting Period) and explain them like you're talking to a friend.
7.  **actionItems**: Create a short, punchy checklist of things the user should do next.

If the user has asked specific questions, make sure your analysis addresses them within the relevant sections.
If the policy text is very short or unclear, state that and provide a more general summary based on the insurance type.`,
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
