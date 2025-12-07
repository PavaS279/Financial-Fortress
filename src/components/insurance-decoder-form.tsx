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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Sparkles, UploadCloud, FileText, Bot, HeartPulse, User, Car, Home, Plane, PawPrint, FileQuestion, HelpCircle, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from './ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';


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
         <Card className="mt-8">
            <CardContent className="p-6 space-y-4 animate-pulse">
                <div className="h-6 bg-muted rounded w-1/3"></div>
                <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                </div>
                 <div className="space-y-2 pt-4">
                    <div className="h-4 bg-muted rounded w-1/3"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-4/6"></div>
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
