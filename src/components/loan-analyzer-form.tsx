'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { UploadCloud, FileText, Bot, History, PlusCircle, Trash2, Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { analyzeLoanAgreement, type AnalyzeLoanAgreementOutput } from '@/ai/flows/analyze-loan-agreement';
import { useToast } from '@/hooks/use-toast';
import LoanAnalysisResults, { LoanAnalysisLoadingSkeleton } from './loan-analysis-results';

const formSchema = z.object({
  loanType: z.enum([
    'personal',
    'home',
    'auto',
    'education',
    'credit-card',
    'other',
  ]),
  principal: z.coerce.number().positive('Principal amount is required.'),
  rate: z.coerce.number().positive('Interest rate is required.'),
  tenure: z.coerce.number().int().positive('Tenure is required.'),
  processingFee: z.coerce.number().nonnegative().optional(),
  lender: z.string().optional(),
  analysisType: z.enum(['quick', 'comprehensive', 'market-compare']),
  agreementText: z.string().optional(),
});

type OptionalUpload = {
  id: number;
  file: File | null;
  type: string;
};

export default function LoanAnalyzerForm() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [optionalUploads, setOptionalUploads] = useState<OptionalUpload[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<AnalyzeLoanAgreementOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loanType: 'personal',
      analysisType: 'comprehensive',
    },
  });

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
    }
  }

  function addOptionalUpload() {
    setOptionalUploads([
      ...optionalUploads,
      { id: Date.now(), file: null, type: 'terms' },
    ]);
  }

  function removeOptionalUpload(id: number) {
    setOptionalUploads(optionalUploads.filter((upload) => upload.id !== id));
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResults(null);
    try {
      // Here you would process the uploaded file `file` to extract text
      // For now, we rely on the manually entered text or key details
      const analysisResult = await analyzeLoanAgreement({
        agreementText: values.agreementText || '',
        principal: values.principal,
        rate: values.rate,
        tenure: values.tenure,
        loanType: values.loanType,
        lender: values.lender || '',
      });
      setResults(analysisResult);
    } catch (error) {
      console.error('Error analyzing loan:', error);
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>1. Upload Your Agreement</CardTitle>
              <CardDescription>
                Upload a PDF/image of your loan agreement, or paste the text
                manually.
              </CardDescription>
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
                <p className="text-muted-foreground">Drag & drop your file here, or click to browse</p>
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
                name="agreementText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paste Agreement Text</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste the full text of your loan agreement here..."
                        className="min-h-[150px]"
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
              <CardTitle>2. Provide Loan Details</CardTitle>
              <CardDescription>
                Select the loan type and fill in any key details you know. This
                helps our AI be more accurate.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="loanType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Loan Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-2 md:grid-cols-3 gap-4"
                      >
                        {[
                          { value: 'personal', label: 'Personal Loan' },
                          { value: 'home', label: 'Home Loan' },
                          { value: 'auto', label: 'Auto Loan' },
                          { value: 'education', label: 'Education Loan' },
                          { value: 'credit-card', label: 'Credit Card' },
                          { value: 'other', label: 'Other' },
                        ].map((item) => (
                          <FormItem
                            key={item.value}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={item.value} />
                            </FormControl>
                            <FormLabel className="font-normal">
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
                  <FormField
                    control={form.control}
                    name="principal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Principal Amount</FormLabel>
                        <FormControl><Input type="number" placeholder="₹ 5,00,000" {...field} /></FormControl>
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
                        <FormControl><Input type="number" step="0.01" placeholder="12.5" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tenure"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Loan Tenure (months)</FormLabel>
                        <FormControl><Input type="number" placeholder="60" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="processingFee"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Processing Fee (₹)</FormLabel>
                        <FormControl><Input type="number" placeholder="5,000" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              </div>
              <FormField
                  control={form.control}
                  name="lender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank / Lender Name</FormLabel>
                      <FormControl><Input placeholder="e.g., National Bank of Finance" {...field} /></FormControl>
                    </FormItem>
                  )}
                />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Choose Your Analysis</CardTitle>
              <CardDescription>
                Select the depth of analysis you require.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="analysisType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="space-y-2"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="quick" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Quick Review (approx. 3 min)
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="comprehensive" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Comprehensive Analysis (approx. 5 min)
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="market-compare" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Comparison with Market Rates (approx. 8 min)
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
              <CardHeader className="flex-row items-center justify-between">
                  <div className='space-y-1.5'>
                      <CardTitle>4. Optional Documents</CardTitle>
                      <CardDescription>Add other relevant documents for a more complete analysis.</CardDescription>
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={addOptionalUpload}><PlusCircle className="mr-2 h-4 w-4"/>Add</Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {optionalUploads.map((upload, index) => (
                  <div key={upload.id} className="flex items-center gap-4 p-2 border rounded-lg">
                    <Select defaultValue={upload.type}>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Document Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="approval-letter">Approval Letter</SelectItem>
                        <SelectItem value="terms-conditions">Terms & Conditions</SelectItem>
                        <SelectItem value="previous-loan">Previous Loan</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input type="file" className="flex-grow" />
                    <Button type="button" variant="ghost" size="icon" className="text-destructive" onClick={() => removeOptionalUpload(upload.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {optionalUploads.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No optional documents added.</p>}
              </CardContent>
          </Card>
          
          <Card>
              <CardHeader>
                  <CardTitle>5. Compare with History</CardTitle>
                  <CardDescription>Compare this loan with one of your previous analyses.</CardDescription>
              </CardHeader>
              <CardContent>
                  <Select>
                      <SelectTrigger>
                          <SelectValue placeholder="Select a previous analysis to compare" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="prev-1">CHK-002: Home Loan (12.5%) - Aug 2023</SelectItem>
                          <SelectItem value="prev-2">CHK-005: Personal Loan (15.0%) - Jan 2024</SelectItem>
                      </SelectContent>
                  </Select>
              </CardContent>
          </Card>

          <div className="flex items-center gap-4">
            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? (
                <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Analyzing...</>
              ) : (
                <><Bot className="mr-2 h-5 w-5" />Analyze My Loan</>
              )}
            </Button>
            <Button type="button" variant="outline" className="w-full" size="lg">
              <History className="mr-2 h-5 w-5" />
              View My Check History
            </Button>
          </div>
        </form>
      </Form>
      
      {isLoading && (
        <div className="mt-8">
          <LoanAnalysisLoadingSkeleton />
        </div>
      )}

      {results && (
        <div className="mt-8">
          <LoanAnalysisResults results={results} />
        </div>
      )}
    </>
  );
}
