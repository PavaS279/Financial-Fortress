
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  analyzeUpiTransaction,
  type AnalyzeUpiTransactionOutput,
} from '@/ai/flows/analyze-upi-transaction';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Loader2,
  Share,
  FileDown,
  Ban,
  BadgeInfo,
  TriangleAlert,
  UserCheck,
  ClipboardList,
  ShieldQuestion
} from 'lucide-react';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

const formSchema = z.object({
  transactionDetails: z.string().optional(),
  amount: z.coerce.number().positive('Amount must be positive.'),
  recipient: z.string().min(3, 'Recipient ID must be at least 3 characters.'),
  recipientType: z.enum(['individual', 'business', 'unknown']),
  description: z.string().optional(),
  referenceCode: z.string().optional(),
  compare: z.boolean().default(false),
});

export function UpiScamForm() {
  const [result, setResult] = useState<AnalyzeUpiTransactionOutput | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '' as any,
      recipient: '',
      recipientType: 'individual',
      description: '',
      referenceCode: '',
      compare: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);

    const transactionDetails = `Amount: ₹${values.amount}, Recipient: ${values.recipient} (${values.recipientType}), Description: ${values.description}, Ref: ${values.referenceCode}`;
    const input = { transactionDetails };

    try {
      const analysisResult = await analyzeUpiTransaction(input);
      setResult(analysisResult);
    } catch (error) {
      console.error('Error analyzing transaction:', error);
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description:
          'There was an error processing your request. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const getRiskColor = (score: number) => {
    if (score > 7) return 'hsl(var(--destructive))';
    if (score > 4) return 'hsl(var(--chart-4))';
    return 'hsl(var(--chart-3))';
  };
  
  const riskColor = result ? getRiskColor(result.riskScore) : 'gray';

  return (
    <>
      <Card>
        <CardHeader>
            <CardTitle>Enter Transaction Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Transaction Amount</FormLabel>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                          ₹
                        </span>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0.00"
                            className="pl-7"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="recipient"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient Name / UPI ID</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., example@upi" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="recipientType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select recipient type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="unknown">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transaction Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'Payment for electricity bill refund'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="referenceCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OTP / Reference Code (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 123456" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex items-start space-x-3 space-y-0">
                 <FormField
                  control={form.control}
                  name="compare"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Compare with similar scams
                        </FormLabel>
                         <FormDescription>
                          Check our database for similar known scam patterns.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Quick Check...
                    </>
                  ) : (
                    'Quick Check'
                  )}
                </Button>
                <Button
                  type="submit"
                  variant="secondary"
                  className="w-full"
                  disabled={isLoading}
                  onClick={form.handleSubmit(onSubmit)}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Deep Analysis'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

       {isLoading && (
        <Card className="mt-8">
            <CardHeader>
                <CardTitle>Analyzing transaction...</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-4 p-10">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Estimated time remaining: a few seconds</p>
                <Progress value={33} className="w-full" />
            </CardContent>
        </Card>
      )}

      {result && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <ShieldQuestion className="h-8 w-8 text-primary" />
              Analysis Report
            </CardTitle>
            <CardDescription>{result.explanation}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center p-6 rounded-lg bg-secondary/50 flex flex-col items-center">
              <h3 className="text-sm font-medium text-muted-foreground">
                Overall Risk Score
              </h3>
              <p className="text-6xl font-bold" style={{color: riskColor}}>
                {result.riskScore}/10
              </p>
               <Progress value={result.riskScore * 10} className="h-2 w-full max-w-sm mt-2" style={{'--tw-bg-primary': riskColor, backgroundColor: 'hsl(var(--muted))', '--primary': riskColor} as any} />
              <Badge
                variant={result.riskLevel === 'High' ? 'destructive' : 'secondary'}
                className={cn('mt-4', {
                  'bg-yellow-500 text-primary-foreground hover:bg-yellow-500/80': result.riskLevel === 'Medium',
                  'bg-green-600 text-primary-foreground hover:bg-green-600/80': result.riskLevel === 'Low',
                })}
              >
                {result.riskLevel} Risk
              </Badge>
            </div>
            
            <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">Detailed Breakdown</h3>
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader className="flex-row items-center gap-3 space-y-0">
                            <TriangleAlert className="w-6 h-6 text-destructive"/>
                            <CardTitle className="text-base">Red Flags Found</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                {result.riskFactors.map((factor, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <TriangleAlert className="w-4 h-4 mt-1 text-destructive shrink-0"/> 
                                    <span>{factor}</span>
                                </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex-row items-center gap-3 space-y-0">
                           <UserCheck className="w-6 h-6 text-primary"/>
                            <CardTitle className="text-base">Recipient Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{result.recipientAnalysis}</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex-row items-center gap-3 space-y-0">
                           <ClipboardList className="w-6 h-6 text-primary"/>
                            <CardTitle className="text-base">Context Analysis</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground space-y-2">
                            <p><span className='font-semibold text-foreground'>Amount:</span> {result.amountAnalysis}</p>
                            <p><span className='font-semibold text-foreground'>Pattern:</span> {result.patternDetection}</p>
                        </CardContent>
                    </Card>

                    {result.similarScam && (
                        <Card>
                            <CardHeader className="flex-row items-center gap-3 space-y-0">
                               <BadgeInfo className="w-6 h-6 text-blue-500"/>
                                <CardTitle className="text-base">Database Match</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{result.similarScam}</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <h3 className="font-semibold text-lg border-b pb-2">Recommended Actions</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground marker:text-primary">
                    {result.recommendedActions.map((action, index) => (
                    <li key={index}>{action}</li>
                    ))}
                </ul>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-4 border-t">
                <Button variant="destructive"><Ban className="mr-2"/>Block Recipient</Button>
                <Button variant="outline">Report to Bank</Button>
                <Button variant="outline"><Share className="mr-2"/>Share with Family</Button>
                <Button variant="outline"><FileDown className="mr-2"/>Export Report</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}

    