
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function TransactionsPage() {
  return (
    <div className="container mx-auto max-w-4xl py-10">
      <div className="space-y-2 mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-headline">
          Transactions
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Review and manage all your financial transactions.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            This feature is coming soon. Here you will be able to see a detailed history of all your transactions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">Transaction data will be displayed here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
