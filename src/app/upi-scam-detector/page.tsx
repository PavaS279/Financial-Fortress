import { UpiScamForm } from '@/components/upi-scam-form';

export default function UpiScamDetectorPage() {
  return (
    <div className="container mx-auto max-w-3xl py-10">
      <div className="space-y-2 mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-headline">
          UPI Scam Detector
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Paste the details of a UPI transaction below. Our AI will analyze it
          for common signs of scams and provide you with a risk assessment.
        </p>
      </div>
      <UpiScamForm />
    </div>
  );
}
