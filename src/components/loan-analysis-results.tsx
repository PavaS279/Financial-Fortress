'use client';

import type { AnalyzeLoanAgreementOutput } from '@/ai/flows/analyze-loan-agreement';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Download,
  FileCheck,
  Mail,
  MessageSquare,
  Percent,
  Scale,
  ShieldAlert,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

interface LoanAnalysisResultsProps {
  results: AnalyzeLoanAgreementOutput;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export function LoanAnalysisLoadingSkeleton() {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/5" />
            <Skeleton className="h-4 w-4/5" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
            </div>
            <div className="space-y-6">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-32 w-full" />
            </div>
        </div>
      </div>
    );
  }

export default function LoanAnalysisResults({ results }: LoanAnalysisResultsProps) {
  const {
    executiveSummary,
    emiBreakdown,
    hiddenCharges,
    redFlags,
    comparisonAnalysis,
    questionsToAsk,
    actionItems,
  } = results;

  return (
    <div className="space-y-6">
      {/* Executive Summary */}
      <Card className="bg-secondary/30">
        <CardHeader>
          <CardTitle>Executive Summary</CardTitle>
          <CardDescription>
            A high-level overview of your loan analysis.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Cost of Loan</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {formatCurrency(executiveSummary.totalCostOfLoan)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Monthly EMI</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {formatCurrency(executiveSummary.emiAmount)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Effective Cost</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {executiveSummary.effectiveCostPercentage.toFixed(2)}%
              </p>
            </CardContent>
          </Card>
          <Card>
             <CardHeader className="pb-2">
               <CardTitle className="text-sm font-medium text-muted-foreground">Scenarios</CardTitle>
            </CardHeader>
            <CardContent className="text-xs">
                <p className='flex items-center gap-1 justify-center'><TrendingUp className='text-green-500 w-4 h-4'/> Best: {executiveSummary.bestCaseScenario}</p>
                <p className='flex items-center gap-1 justify-center'><TrendingDown className='text-red-500 w-4 h-4'/> Worst: {executiveSummary.worstCaseScenario}</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            {/* Red Flags Section */}
            {redFlags.length > 0 && (
                <Card className="border-destructive">
                    <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-destructive">
                        <ShieldAlert />
                        Red Flags Found
                    </CardTitle>
                    <CardDescription>
                        Our AI found the following potential issues in your loan agreement.
                        Please review these carefully.
                    </CardDescription>
                    </CardHeader>
                    <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {redFlags.map((flag, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger className="text-base font-semibold">
                                {flag.title}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                {flag.description}
                            </AccordionContent>
                        </AccordionItem>
                        ))}
                    </Accordion>
                    </CardContent>
                </Card>
            )}

            {/* Detailed Analysis */}
            <Card>
                <CardHeader>
                    <CardTitle>Detailed Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <AnalysisDetailItem icon={<Scale />} title="EMI & Cost Breakdown" content={
                        <div className="text-sm space-y-2">
                            <p><strong className='text-foreground'>Total Interest:</strong> {formatCurrency(emiBreakdown.totalInterestPayable)}</p>
                            <p><strong className='text-foreground'>Prepayment:</strong> {emiBreakdown.prepaymentPenaltyInfo}</p>
                            <p><strong className='text-foreground'>Extra Payments:</strong> {emiBreakdown.extraPaymentImpact}</p>
                        </div>
                    }/>
                    <Separator/>
                     <AnalysisDetailItem icon={<Percent />} title="Hidden Charges & Fees" content={
                        <ul className="text-sm space-y-2 list-disc list-inside">
                           <li><strong>Processing Fee:</strong> {hiddenCharges.processingFee}</li>
                            <li><strong>Documentation:</strong> {hiddenCharges.documentationCharges}</li>
                            <li><strong>Insurance:</strong> {hiddenCharges.insuranceCharges}</li>
                            <li><strong>Late Payment:</strong> {hiddenCharges.latePaymentPenalties}</li>
                            <li><strong>Prepayment:</strong> {hiddenCharges.prepaymentCharges}</li>
                            {hiddenCharges.otherFees.map(fee => <li key={fee.name}><strong>{fee.name}:</strong> {fee.details}</li>)}
                        </ul>
                    }/>
                     <Separator/>
                     <AnalysisDetailItem icon={<TrendingUp />} title="Market Comparison" content={
                        <div className="text-sm space-y-2">
                           <p><strong className='text-foreground'>Market Rate:</strong> {comparisonAnalysis.marketAverageRate}</p>
                           <p><strong className='text-foreground'>Competitors:</strong> {comparisonAnalysis.competitorTerms}</p>
                           <p><strong className='text-foreground'>Negotiation:</strong> {comparisonAnalysis.negotiationRecommendations}</p>
                        </div>
                    }/>
                </CardContent>
            </Card>
        </div>

        <div className="space-y-6">
            {/* Questions to Ask */}
            <Card>
                <CardHeader>
                    <CardTitle>Questions for Your Bank</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {questionsToAsk.map((q, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                            <ChevronRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                            <span className='text-muted-foreground'>{q}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
            
            {/* Action Items */}
            <Card>
                <CardHeader>
                    <CardTitle>Your Action Checklist</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {actionItems.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                            <FileCheck className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                             <span className='text-muted-foreground'>{item}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
                 <CardFooter className="flex-col gap-2 items-stretch">
                    <Button><Download className="mr-2 h-4 w-4" /> Download Checklist</Button>
                </CardFooter>
            </Card>

            {/* Export Options */}
            <Card>
                <CardHeader>
                    <CardTitle>Export & Share</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-2">
                    <Button variant="outline"><Download className="mr-2"/> PDF</Button>
                    <Button variant="outline"><MessageSquare className="mr-2"/> WhatsApp</Button>
                    <Button variant="outline" className="col-span-2"><Mail className="mr-2"/> Email</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

const AnalysisDetailItem = ({icon, title, content}: {icon: React.ReactNode, title: string, content: React.ReactNode}) => (
    <div className='flex items-start gap-4'>
        <div className='text-primary pt-1'>
            {icon}
        </div>
        <div className='flex-1'>
            <h4 className='font-semibold text-base mb-1'>{title}</h4>
            <div className='text-muted-foreground'>{content}</div>
        </div>
    </div>
)
