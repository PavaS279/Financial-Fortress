import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Lightbulb } from 'lucide-react';

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  href: string;
  accentColor: 'red' | 'blue' | 'green';
  tips: string[];
};

export default function FeatureCard({
  icon,
  title,
  description,
  buttonText,
  href,
  accentColor,
  tips,
}: FeatureCardProps) {
  const accentClasses = {
    red: 'border-t-destructive',
    blue: 'border-t-primary',
    green: 'border-t-green-600 dark:border-t-green-500',
  };

  return (
    <Card
      className={cn(
        'flex flex-col transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border-t-4',
        accentClasses[accentColor]
      )}
    >
      <CardHeader className="flex-shrink-0">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="p-3 bg-secondary rounded-full inline-block">
              {icon}
            </div>
            <h3 className="text-2xl font-bold font-headline">{title}</h3>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow">
        <p className="text-muted-foreground flex-grow">{description}</p>
        <Link href={href} className="mt-6">
          <Button className="w-full" variant={accentColor === 'red' ? 'destructive' : 'default'}>
            {buttonText}
          </Button>
        </Link>
        <Separator className="my-6" />
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            <h4 className="font-semibold">Quick Tips</h4>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
            {tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
