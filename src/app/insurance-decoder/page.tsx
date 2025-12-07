import InsuranceDecoderForm from '@/components/insurance-decoder-form';

export default function InsuranceDecoderPage() {
  return (
    <div className="container mx-auto max-w-4xl py-10">
      <div className="space-y-2 mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-headline">
          Insurance Policy Decoder
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Tired of confusing insurance jargon? Upload your policy document, or paste the text below. Our AI will simplify it into plain language, highlighting key terms, exclusions, and benefits so you know exactly what you're covered for.
        </p>
      </div>
      <InsuranceDecoderForm />
    </div>
  );
}
