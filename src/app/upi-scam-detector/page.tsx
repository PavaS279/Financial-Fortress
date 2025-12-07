import { UpiScamForm } from '@/components/upi-scam-form';
import { SafetyTipsSidebar } from '@/components/safety-tips-sidebar';

export default function UpiScamDetectorPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2">
        <div className="space-y-2 mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-headline">
            UPI Scam Detector
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Enter the details of a UPI transaction below. Our AI will analyze it
            for common signs of scams and provide you with a risk assessment.
          </p>
        </div>
        <UpiScamForm />
      </div>
      <div className="lg:col-span-1">
        <SafetyTipsSidebar />
      </div>
    </div>
  );
}
