import FeatureCard from '@/components/feature-card';
import { ShieldAlert, Landmark, FileText } from 'lucide-react';

export default function MyChecksPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight font-headline sm:text-5xl lg:text-6xl">
          Your Financial Toolkit
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
          Powerful tools to analyze, detect, and decode your financial world.
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-1 lg:grid-cols-3">
        <FeatureCard
          icon={<ShieldAlert className="h-10 w-10 text-destructive" />}
          title="UPI Scam Detector"
          description="Analyzes UPI transactions for fraud risk indicators using a proprietary tool and alerts you to potentially malicious activity."
          buttonText="Start UPI Check"
          href="/upi-scam-detector"
          accentColor="red"
          tips={[
            'Verify the recipient\'s identity before sending money.',
            'Never share your UPI PIN with anyone.',
            'Beware of unsolicited payment requests.',
          ]}
        />
        <FeatureCard
          icon={<Landmark className="h-10 w-10 text-primary" />}
          title="Loan Analyzer"
          description="Evaluates loan offers and generates a risk assessment report based on the entered financial information."
          buttonText="Analyze Loan"
          href="/loan-analyzer"
          accentColor="blue"
          tips={[
            'Compare interest rates from multiple lenders.',
            'Read the fine print for hidden fees and charges.',
            'Ensure the loan repayment terms fit your budget.',
          ]}
        />
        <FeatureCard
          icon={<FileText className="h-10 w-10 text-green-600 dark:text-green-500" />}
          title="Insurance Decoder"
          description="Simplifies complex insurance policies into plain language. Generates a user-friendly summary that highlights key terms, exclusions, and benefits."
          buttonText="Decode Policy"
          href="/insurance-decoder"
          accentColor="green"
          tips={[
            'Understand the coverage limits and deductibles.',
            'Check for exclusions that may void your policy.',
            'Review your policy annually to ensure it still meets your needs.',
          ]}
        />
      </div>
    </div>
  );
}
