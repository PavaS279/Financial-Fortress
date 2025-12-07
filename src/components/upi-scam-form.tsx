'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { analyzeUpiTransaction, type AnalyzeUpiTransactionOutput } from '@/ai/flows/analyze-upi-transaction';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Shield, ShieldAlert, ShieldCheck } from 'lucide-react';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  transactionDetails: z.string().min(10, {
    message: 'Transaction details must be at least 10 characters.',
  }),
});

export function UpiScamForm() {
  const [result, setResult] = useState<AnalyzeUpiTransactionOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transactionDetails: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const analysisResult = await analyzeUpiTransaction(values);
      setResult(analysisResult);
    } catch (error) {
      console.error('Error analyzing transaction:', error);
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: 'There was an error processing your request. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Card>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="transactionDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transaction Details</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'Received 5000 from an unknown UPI ID for a lottery you did not enter...'"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Analyze Transaction'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {result && (
        <Card
          className={cn('mt-8 border-2', {
            'border-destructive bg-destructive/10': result.isScam,
            'border-green-600 bg-green-600/10': !result.isScam,
          })}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {result.isScam ? (
                <ShieldAlert className="h-8 w-8 text-destructive" />
              ) : (
                <ShieldCheck className="h-8 w-8 text-green-600" />
              )}
              <span>Analysis Result</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <h3 className="font-semibold">Conclusion</h3>
              <p className="text-muted-foreground">{result.explanation}</p>
            </div>
            {result.riskFactors.length > 0 && (
                <div className="space-y-2">
                    <h3 className="font-semibold">Risk Factors Identified</h3>
                    <div className="flex flex-wrap gap-2">
                        {result.riskFactors.map((factor, index) => (
                        <Badge key={index} variant="destructive">
                            {factor}
                        </Badge>
                        ))}
                    </div>
                </div>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
}
