
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Loader2, Sparkles, UploadCloud, FileText, Bot, HeartPulse, User, Car, Home, Plane, PawPrint, FileQuestion, HelpCircle, Info, FileCheck, FileX, Clock, Wallet, ShieldQuestion, AlertTriangle, Lightbulb, BookOpen, CheckSquare, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from './ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Badge } from './ui/badge';
import { Skeleton } from './ui/skeleton';
import { Label } from './ui/label';


const formSchema = z.object({
  policyText: z.string().min(50, {
    message: 'Policy text must be at least 50 characters.',
  }),
  insuranceType: z.enum(['health', 'life', 'car', 'home', 'travel', 'pet', 'other']),
  policyNumber: z.string().optional(),
  coverageAmount: z.coerce.number().optional(),
  premiumAmount: z.coerce.number().optional(),
  specificQuestions: z.string().optional(),
  simpleLanguage: z.boolean().default(true),
  highlightTerms: z.boolean().default(false),
  compareStandard: z.boolean().default(false),
});

const insuranceTypes = [
    { value: 'health', label: 'Health', icon: HeartPulse },
    { value: 'life', label: 'Life', icon: User },
    { value: 'car', label: 'Car', icon: Car },
    { value: 'home', label: 'Home', icon: Home },
    { value: 'travel', label: 'Travel', icon: Plane },
    { value: 'pet', label: 'Pet', icon: PawPrint },
    { value: 'other', label: 'Other', icon: FileQuestion },
];

export default function InsuranceDecoderForm() {
  const [result, setResult] = useState<SummarizeInsurancePolicyOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      policyText: '',
      insuranceType: 'health',
      simpleLanguage: true,
      policyNumber: '',
      coverageAmount: '' as any,
      premiumAmount: '' as any,
      specificQuestions: '',
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

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  }
  
  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setFile(event.dataTransfer.files[0]);
      // TODO: Add logic to extract text from PDF/image
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };


  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        <Card>
            <CardHeader>
              <CardTitle>1. Upload Your Policy</CardTitle>
              <CardDescription>Upload a PDF/image of your policy, or paste the text manually.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div 
                className={`border-2 border-dashed rounded-lg p-8 text-center flex flex-col items-center justify-center space-y-2
                  ${isDragging ? 'border-primary bg-accent' : 'border-border'}`}
                onDragEnter={() => setIsDragging(true)}
                onDragLeave={() => setIsDragging(false)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <UploadCloud className="w-12 h-12 text-muted-foreground" />
                <p className="text-muted-foreground">Drag & drop PDF/image, or click to browse</p>
                <Input type="file" className="hidden" id="file-upload" onChange={handleFileChange} accept=".pdf,.png,.jpg,.jpeg"/>
                <Button type="button" variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>Browse Files</Button>
                {file && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-foreground">
                    <FileText className="w-4 h-4" />
                    <span>{file.name}</span>
                  </div>
                )}
              </div>
              <div className="relative flex justify-center items-center">
                  <Separator className="w-full"/>
                  <span className="absolute bg-card px-2 text-sm text-muted-foreground">OR</span>
              </div>
               <FormField
                control={form.control}
                name="policyText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paste Policy Text</FormLabel>
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
            </CardContent>
          </Card>

        <Card>
            <CardHeader>
                <CardTitle>2. Policy Details</CardTitle>
                <CardDescription>Provide some basic information about your policy for a more accurate analysis.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <FormField
                control={form.control}
                name="insuranceType"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                    <FormLabel>Insurance Type</FormLabel>
                    <FormControl>
                        <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4"
                        >
                        {insuranceTypes.map((item) => (
                            <FormItem key={item.value} className='w-full'>
                                <FormControl>
                                    <RadioGroupItem value={item.value} className="sr-only" />
                                </FormControl>
                                <FormLabel className={`flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 font-normal hover:bg-accent hover:text-accent-foreground cursor-pointer
                                    ${field.value === item.value ? 'border-primary' : ''}`}>
                                    <item.icon className="mb-3 h-6 w-6" />
                                    {item.label}
                                </FormLabel>
                            </FormItem>
                        ))}
                        </RadioGroup>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="policyNumber" render={({ field }) => (
                        <FormItem><FormLabel>Policy Number</FormLabel><FormControl><Input placeholder="e.g., A123B456" {...field} /></FormControl></FormItem>
                    )}/>
                    <FormField control={form.control} name="coverageAmount" render={({ field }) => (
                        <FormItem><FormLabel>Coverage Amount</FormLabel><FormControl><Input type="number" placeholder="₹ 10,00,000" {...field} /></FormControl></FormItem>
                    )}/>
                    <FormField control={form.control} name="premiumAmount" render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center gap-1">Premium Amount 
                                <Popover>
                                    <PopoverTrigger><HelpCircle className="w-3.5 h-3.5 text-muted-foreground"/></PopoverTrigger>
                                    <PopoverContent className="text-sm">Enter the premium amount and specify if it's paid monthly or annually.</PopoverContent>
                                </Popover>
                            </FormLabel>
                            <FormControl><Input type="number" placeholder="₹ 15,000" {...field} /></FormControl>
                        </FormItem>
                    )}/>
                    <FormField control={form.control} name="policyNumber" render={({ field }) => (
                        <FormItem><FormLabel>Policy Tenure (Years)</FormLabel><FormControl><Input type="number" placeholder="1" {...field} /></FormControl></FormItem>
                    )}/>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>3. Ask Specific Questions</CardTitle>
                <CardDescription>Ask our AI anything about your policy. For example: "What is covered if I get into a car accident?" or "What is the process for filing a claim?".</CardDescription>
            </CardHeader>
            <CardContent>
                <FormField control={form.control} name="specificQuestions" render={({ field }) => (
                    <FormItem><FormControl><Textarea placeholder="Type your questions here..." className="min-h-[100px]" {...field}/></FormControl><FormMessage /></FormItem>
                )}/>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>4. Advanced Options</CardTitle>
                <CardDescription>Customize the analysis to your needs.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <FormField control={form.control} name="simpleLanguage" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5"><FormLabel>Show in simple language</FormLabel><FormDescription>Summarize the policy in easy-to-understand terms.</FormDescription></div>
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )}/>
                 <FormField control={form.control} name="highlightTerms" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5"><FormLabel>Highlight key terms</FormLabel><FormDescription>Identify and explain important definitions and clauses.</FormDescription></div>
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )}/>
                 <FormField control={form.control} name="compareStandard" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5"><FormLabel>Compare with market</FormLabel><FormDescription>Check if your policy's terms are competitive.</FormDescription></div>
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                )}/>
                <div className="flex flex-col space-y-2 pt-2">
                    <Label>Compare with previous policies</Label>
                    <Select>
                      <SelectTrigger>
                          <SelectValue placeholder="Select a previous policy to compare" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="prev-1">CHK-003: Car Insurance - Jul 2024</SelectItem>
                          <SelectItem value="prev-2">CHK-008: Health Insurance - Jan 2024</SelectItem>
                      </SelectContent>
                  </Select>
                </div>
            </CardContent>
        </Card>


        <Button type="submit" className="w-full !mt-8" size="lg" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Decoding...
            </>
          ) : (
            <>
              <Bot className="mr-2 h-5 w-5" />
              Decode My Policy
            </>
          )}
        </Button>
      </form>
    </Form>

    {isLoading && (
        <div className="space-y-6 mt-8">
            <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-3/5" />
                    <Skeleton className="h-4 w-4/5" />
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-20" />)}
                </CardContent>
            </Card>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    <Skeleton className="h-40 w-full" />
                    <Skeleton className="h-40 w-full" />
                </div>
                <div className="space-y-4">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-32 w-full" />
                </div>
            </div>
        </div>
    )}

    {result && (
    <div className="mt-8 space-y-6">
        <Card className="bg-secondary/30">
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <Sparkles className="h-6 w-6 text-primary" />
                    Policy Overview
                </CardTitle>
                <CardDescription>
                    A quick summary of your {result.policyOverview.policyType} insurance policy ({result.policyOverview.policyNumber}).
                </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <InfoCard title="Status" value={result.policyOverview.status} badgeColor={result.policyOverview.status === 'Active' ? 'bg-green-500' : 'bg-destructive'} />
                <InfoCard title="Coverage" value={formatCurrency(result.policyOverview.coverageAmount)} />
                <InfoCard title="Premium" value={result.policyOverview.premium} />
                <InfoCard title="Tenure" value={result.policyOverview.tenure} />
            </CardContent>
             <CardFooter className="text-xs text-muted-foreground grid grid-cols-3 gap-2">
                <span>Start: {result.policyOverview.keyDates.startDate}</span>
                <span>Renewal: {result.policyOverview.keyDates.renewalDate}</span>
                <span>Expiry: {result.policyOverview.keyDates.expiryDate}</span>
            </CardFooter>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
            <Card className='border-green-500/50'>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-500"><FileCheck /> What's Covered</CardTitle>
                    <CardDescription>{result.whatIsCovered.summary}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                    {result.whatIsCovered.coverages.map((item, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger>{item.name} <span className="ml-auto text-sm text-muted-foreground font-normal pr-2">{item.limit}</span></AccordionTrigger>
                            <AccordionContent>{item.explanation}</AccordionContent>
                        </AccordionItem>
                    ))}
                    </Accordion>
                </CardContent>
            </Card>
            <Card className='border-destructive/50'>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-destructive"><FileX /> What's NOT Covered</CardTitle>
                    <CardDescription>{result.whatIsNotCovered.summary}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                    {result.whatIsNotCovered.exclusions.map((item, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger>{item.name}</AccordionTrigger>
                            <AccordionContent>{item.reason}</AccordionContent>
                        </AccordionItem>
                    ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BookOpen /> Terms Explained</CardTitle>
                    <CardDescription>A simple glossary of common insurance jargon in your policy.</CardDescription>
                </CardHeader>
                <CardContent>
                     <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        {result.termsExplained.map((term, index) => (
                            <div key={index} className="relative">
                                <dt className="font-semibold text-foreground">{term.term}</dt>
                                <dd className="text-muted-foreground">{term.definition}</dd>
                            </div>
                        ))}
                    </dl>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><AlertTriangle/> Coverage Gaps</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {result.coverageGaps.gaps.map((item, index) => (
                            <div key={index} className="p-3 bg-secondary/50 rounded-lg">
                                <p className="font-semibold">{item.gap}</p>
                                <p className="text-sm text-muted-foreground">{item.recommendation} 
                                    {item.estimatedCost && <span className="font-medium text-foreground"> (Est: {item.estimatedCost})</span>}
                                </p>
                            </div>
                        ))}
                        {result.coverageGaps.gaps.length === 0 && <p className="text-sm text-muted-foreground">No major coverage gaps found.</p>}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Lightbulb /> Action Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {result.actionItems.map((item, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm">
                                    <CheckSquare className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><ShieldQuestion /> Claim Process</CardTitle>
                <CardDescription>A step-by-step guide to filing a claim.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8">
                <div>
                    <h4 className="font-semibold mb-2">How to File a Claim</h4>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground marker:font-semibold marker:text-foreground">
                        {result.claimProcess.steps.map((step, index) => <li key={index}>{step}</li>)}
                    </ol>
                </div>
                 <div>
                    <h4 className="font-semibold mb-2">Documents Needed</h4>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        {result.claimProcess.documentsNeeded.map((doc, index) => <li key={index}>{doc}</li>)}
                    </ul>
                </div>
                <div className="md:col-span-2">
                    <h4 className="font-semibold mb-2">Common Rejection Reasons</h4>
                    <div className="flex flex-wrap gap-2">
                        {result.claimProcess.commonRejectionReasons.map((reason, index) => (
                            <Badge key={index} variant="destructive">{reason}</Badge>
                        ))}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="justify-between items-center border-t pt-4 mt-4">
                <div>
                    <p className="font-semibold">Claim Contact</p>
                    <p className="text-muted-foreground text-sm">{result.claimProcess.contactInfo}</p>
                </div>
                <Button><Download className="mr-2" /> Download Guide</Button>
            </CardFooter>
        </Card>
        
    </div>
    )}
    </>
  );
}

const InfoCard = ({ title, value, badgeColor }: { title: string, value: string | undefined, badgeColor?: string }) => (
  <div className="flex flex-col items-center justify-center p-4 bg-card rounded-lg text-center">
    <p className="text-sm text-muted-foreground">{title}</p>
    {badgeColor ? (
      <Badge className={badgeColor}>{value}</Badge>
    ) : (
      <p className="text-lg font-bold">{value}</p>
    )}
  </div>
);

    

    