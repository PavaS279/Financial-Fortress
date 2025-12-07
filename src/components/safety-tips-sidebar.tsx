import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

const tips = [
  'Never share your UPI PIN with anyone. Your bank will never ask for it.',
  'Beware of unsolicited payment requests. Scammers often send fake requests.',
  'Do not click on links sent by unknown contacts asking for payment.',
  'Verify the recipient’s identity before sending money.',
  'Enable transaction notifications to monitor your account activity.',
  'Look for spelling mistakes in the UPI ID or name of the recipient.',
  'Be cautious of offers that seem too good to be true, like lotteries or refunds.'
];

export function SafetyTipsSidebar() {
  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-yellow-400" />
          <span>UPI Safety Tips</span>
        </CardTitle>
        <CardDescription>
          Stay safe while making online payments.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {tips.map((tip, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="text-primary font-bold">✓</span>
              <p className="text-sm text-muted-foreground">{tip}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
