'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing loan agreements to identify risks and hidden details.
 *
 * The flow takes loan agreement text and key financial details as input and returns a comprehensive analysis report.
 *
 * @interface AnalyzeLoanAgreementInput - The input type for the analyzeLoanAgreement function.
 * @interface AnalyzeLoanAgreementOutput - The output type for the analyzeLoanAgreement function.
 * @function analyzeLoanAgreement - A function that analyzes a loan agreement and returns a detailed report.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeLoanAgreementInputSchema = z.object({
  agreementText: z.string().optional().describe('The full text of the loan agreement.'),
  principal: z.number().positive().describe('The principal loan amount.'),
  rate: z.number().positive().describe('The annual interest rate.'),
  tenure: z.number().int().positive().describe('The loan tenure in months.'),
  loanType: z.string().describe('The type of loan (e.g., Personal, Home, Auto).'),
  lender: z.string().optional().describe('The name of the bank or lender.'),
});

export type AnalyzeLoanAgreementInput = z.infer<typeof AnalyzeLoanAgreementInputSchema>;

const AnalyzeLoanAgreementOutputSchema = z.object({
  executiveSummary: z.object({
    totalCostOfLoan: z.number().describe('The total cost of the loan (Principal + Total Interest).'),
    emiAmount: z.number().describe('The calculated Equated Monthly Installment (EMI).'),
    effectiveCostPercentage: z.number().describe('The total interest as a percentage of the principal amount.'),
    bestCaseScenario: z.string().describe('A brief description of the best-case scenario for this loan.'),
    worstCaseScenario: z.string().describe('A brief description of the worst-case scenario for this loan.'),
  }),
  emiBreakdown: z.object({
    monthlyEmi: z.number().describe('The monthly EMI amount.'),
    totalInterestPayable: z.number().describe('The total interest payable over the loan tenure.'),
    prepaymentPenaltyInfo: z.string().describe('Information about any penalties for prepaying the loan.'),
    extraPaymentImpact: z.string().describe('Analysis of the impact of making extra payments.'),
  }),
  hiddenCharges: z.object({
    processingFee: z.string().describe('Details about the processing fee.'),
    documentationCharges: z.string().describe('Details about documentation charges.'),
    insuranceCharges: z.string().describe('Details about any mandatory insurance charges.'),
    latePaymentPenalties: z.string().describe('Details about penalties for late payments.'),
    prepaymentCharges: z.string().describe('Details about charges for prepaying the loan.'),
    otherFees: z.array(z.object({ name: z.string(), details: z.string() })).describe('A list of any other hidden fees found.'),
  }),
  redFlags: z.array(z.object({
    title: z.string().describe('The title of the red flag (e.g., High Interest Rate).'),
    description: z.string().describe('A detailed explanation of why this is a red flag.'),
  })).describe('A list of red flags or concerns identified in the loan agreement.'),
  comparisonAnalysis: z.object({
    marketAverageRate: z.string().describe('Comparison of the loan\'s interest rate with the current market average for this loan type.'),
    competitorTerms: z.string().describe('Brief of similar loan terms from competitor banks.'),
    negotiationRecommendations: z.string().describe('Recommendations for negotiating better terms.'),
  }),
  questionsToAsk: z.array(z.string()).describe('A list of 5-7 specific questions the user should ask the bank before finalizing the loan.'),
  actionItems: z.array(z.string()).describe('A checklist of specific clauses to review, documents to collect, and next steps.'),
});


export type AnalyzeLoanAgreementOutput = z.infer<typeof AnalyzeLoanAgreementOutputSchema>;

export async function analyzeLoanAgreement(
  input: AnalyzeLoanAgreementInput
): Promise<AnalyzeLoanAgreementOutput> {
  return analyzeLoanAgreementFlow(input);
}

const analyzeLoanAgreementPrompt = ai.definePrompt({
  name: 'analyzeLoanAgreementPrompt',
  model: 'gemini-2.5-flash',
  input: {schema: AnalyzeLoanAgreementInputSchema},
  output: {schema: AnalyzeLoanAgreementOutputSchema},
  prompt: `You are an expert financial analyst specializing in decoding Indian loan agreements. Analyze the provided loan details and agreement text.

Loan Details:
- Type: {{{loanType}}}
- Principal: ₹{{{principal}}}
- Interest Rate: {{{rate}}}%
- Tenure: {{{tenure}}} months
- Lender: {{{lender}}}

Agreement Text:
{{{agreementText}}}

Your task is to provide a comprehensive analysis. Calculate EMI and total costs based on the inputs. Scrutinize the agreement text for hidden fees, unfavorable clauses, and red flags. Provide a market comparison and actionable advice. Fill out all fields in the output schema.`,
});

const analyzeLoanAgreementFlow = ai.defineFlow(
  {
    name: 'analyzeLoanAgreementFlow',
    inputSchema: AnalyzeLoanAgreementInputSchema,
    outputSchema: AnalyzeLoanAgreementOutputSchema,
  },
  async input => {
    const {output} = await analyzeLoanAgreementPrompt(input);
    return output!;
  }
);
