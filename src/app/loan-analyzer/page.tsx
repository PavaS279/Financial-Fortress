import LoanAnalyzerForm from '@/components/loan-analyzer-form';

export default function LoanAnalyzerPage() {
  return (
    <div className="container mx-auto max-w-3xl py-10">
      <div className="space-y-2 mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-headline">
          Loan Analyzer
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Enter the details of a loan offer to see a breakdown of costs,
          interest payments, and a risk assessment.
        </p>
      </div>
      <LoanAnalyzerForm />
    </div>
  );
}
