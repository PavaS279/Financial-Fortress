import LoanAnalyzerForm from '@/components/loan-analyzer-form';

export default function LoanAnalyzerPage() {
  return (
    <div className="container mx-auto max-w-4xl py-10">
      <div className="space-y-2 mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-headline">
          Loan Agreement Analyzer
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Upload your loan agreement PDF, or manually enter the details below.
          Our AI will analyze the terms for hidden risks and clarity.
        </p>
      </div>
      <LoanAnalyzerForm />
    </div>
  );
}
