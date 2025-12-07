'use client';

import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AlertCircle, TrendingUp, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  amount: z.coerce.number().positive('Loan amount must be positive.'),
  rate: z.coerce.number().min(0, 'Interest rate cannot be negative.').max(100, 'Interest rate seems too high.'),
  term: z.coerce.number().int().positive('Loan term must be a positive number of years.'),
});

type LoanDetails = z.infer<typeof formSchema>;

interface LoanAnalysis {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  riskColor: string;
}

export default function LoanAnalyzerForm() {
  const [analysis, setAnalysis] = useState<LoanAnalysis | null>(null);
  const [loanDetails, setLoanDetails] = useState<LoanDetails | null>(null);

  const form = useForm<LoanDetails>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 10000,
      rate: 5,
      term: 5,
    },
  });

  function onSubmit(values: LoanDetails) {
    const principal = values.amount;
    const annualRate = values.rate / 100;
    const monthlyRate = annualRate / 12;
    const numberOfPayments = values.term * 12;

    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    let riskLevel: 'Low' | 'Medium' | 'High';
    let riskColor: string;
    if (values.rate < 5) {
      riskLevel = 'Low';
      riskColor = 'text-green-600';
    } else if (values.rate < 12) {
      riskLevel = 'Medium';
      riskColor = 'text-yellow-500';
    } else {
      riskLevel = 'High';
      riskColor = 'text-destructive';
    }

    setLoanDetails(values);
    setAnalysis({
      monthlyPayment,
      totalPayment,
      totalInterest,
      riskLevel,
      riskColor,
    });
  }

  const chartData = useMemo(() => {
    if (!analysis || !loanDetails) return [];
    return [
      { name: 'Principal', value: loanDetails.amount, fill: 'hsl(var(--primary))' },
      { name: 'Interest', value: analysis.totalInterest, fill: 'hsl(var(--destructive))' },
    ];
  }, [analysis, loanDetails]);

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  return (
    <>
      <Card>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loan Amount ($)</FormLabel>
                      <FormControl><Input type="number" placeholder="e.g., 10000" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interest Rate (%)</FormLabel>
                      <FormControl><Input type="number" step="0.1" placeholder="e.g., 5.5" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="term"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loan Term (Years)</FormLabel>
                      <FormControl><Input type="number" placeholder="e.g., 5" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full">Analyze Loan</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {analysis && loanDetails && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Loan Analysis Report</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
              <div className="flex flex-col items-center space-y-1 rounded-lg border p-4">
                <Wallet className="h-6 w-6 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Monthly Payment</span>
                <span className="text-lg font-bold">{formatCurrency(analysis.monthlyPayment)}</span>
              </div>
              <div className="flex flex-col items-center space-y-1 rounded-lg border p-4">
                <TrendingUp className="h-6 w-6 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Total Interest</span>
                <span className="text-lg font-bold">{formatCurrency(analysis.totalInterest)}</span>
              </div>
               <div className="flex flex-col items-center space-y-1 rounded-lg border p-4 col-span-2 md:col-span-1">
                <AlertCircle className={cn('h-6 w-6', analysis.riskColor)} />
                <span className="text-xs text-muted-foreground">Risk Level</span>
                <span className={cn('text-lg font-bold', analysis.riskColor)}>{analysis.riskLevel}</span>
              </div>
               <div className="flex flex-col items-center space-y-1 rounded-lg border p-4 col-span-2 md:col-span-1">
                <Wallet className="h-6 w-6 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Total Payment</span>
                <span className="text-lg font-bold">{formatCurrency(analysis.totalPayment)}</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-center mb-4">Principal vs. Total Interest</h4>
               <ChartContainer config={{}} className="h-[250px] w-full">
                <ResponsiveContainer>
                    <BarChart data={chartData} layout="vertical" margin={{ left: 10 }}>
                        <CartesianGrid horizontal={false} />
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent
                                labelKey="name"
                                formatter={(value) => formatCurrency(value as number)}
                                indicator="dot"
                            />}
                        />
                        <Bar dataKey="value" radius={5} />
                    </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
