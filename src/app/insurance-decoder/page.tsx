import InsuranceDecoderForm from '@/components/insurance-decoder-form';

export default function InsuranceDecoderPage() {
  return (
    <div className="container mx-auto max-w-3xl py-10">
      <div className="space-y-2 mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-headline">
          Insurance Policy Decoder
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Paste your complex insurance policy text below. Our AI will simplify
          it into plain language, highlighting key terms, exclusions, and
          benefits.
        </p>
      </div>
      <InsuranceDecoderForm />
    </div>
  );
}
