'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { summarizeInsurancePolicy, type SummarizeInsurancePolicyOutput } from '@/ai/flows/summarize-insurance-policy';

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
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  policyText: z.string().min(50, {
    message: 'Policy text must be at least 50 characters.',
  }),
});

export default function InsuranceDecoderForm() {
  const [result, setResult] = useState<SummarizeInsurancePolicyOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      policyText: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const summaryResult = await summarizeInsurancePolicy(values);
      setResult(summaryResult);
    } catch (error) {
      console.error('Error summarizing policy:', error);
      toast({
        variant: 'destructive',
        title: 'Summarization Failed',
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
                name="policyText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Insurance Policy Text</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste your full insurance policy text here..."
                        className="min-h-[200px]"
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
                    Decoding...
                  </>
                ) : (
                  'Decode Policy'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
         <Card className="mt-8">
            <CardContent className="p-6 space-y-4 animate-pulse">
                <div className="h-4 bg-muted rounded w-1/4"></div>
                <div className="space-y-2">
                    <div className="h-3 bg-muted rounded w-full"></div>
                    <div className="h-3 bg-muted rounded w-full"></div>
                    <div className="h-3 bg-muted rounded w-5/6"></div>
                </div>
                 <div className="space-y-2 pt-4">
                    <div className="h-3 bg-muted rounded w-1/3"></div>
                    <div className="h-3 bg-muted rounded w-full"></div>
                    <div className="h-3 bg-muted rounded w-4/6"></div>
                </div>
            </CardContent>
        </Card>
      )}

      {result && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span>Policy Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            {result.summary.split('\n').map((paragraph, index) => {
              if (paragraph.startsWith('### ')) {
                return <h3 key={index}>{paragraph.substring(4)}</h3>;
              }
              if (paragraph.startsWith('## ')) {
                return <h2 key={index}>{paragraph.substring(3)}</h2>;
              }
              if (paragraph.startsWith('# ')) {
                return <h1 key={index}>{paragraph.substring(2)}</h1>;
              }
              if (paragraph.startsWith('* ')) {
                return <li key={index}>{paragraph.substring(2)}</li>
              }
              return <p key={index}>{paragraph}</p>;
            })}
          </CardContent>
        </Card>
      )}
    </>
  );
}
