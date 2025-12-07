import FeatureCard from '@/components/feature-card';
import { ShieldAlert, Landmark, FileText, History } from 'lucide-react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const checks = [
  {
    id: 'CHK-001',
    type: 'UPI Scam',
    status: 'Completed',
    date: '2024-07-22',
    result: 'High Risk',
  },
  {
    id: 'CHK-002',
    type: 'Loan Analysis',
    status: 'Completed',
    date: '2024-07-21',
    result: 'Low Risk',
  },
  {
    id: 'CHK-003',
    type: 'Insurance Decode',
    status: 'Completed',
    date: '2024-07-20',
    result: 'N/A',
  },
  {
    id: 'CHK-004',
    type: 'UPI Scam',
    status: 'Completed',
    date: '2024-07-19',
    result: 'No Risk',
  },
];

export default function MyChecksPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            My Checks
          </h1>
          <p className="text-muted-foreground">
            A history of all your financial analyses and checks.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Check History</CardTitle>
          <CardDescription>
            Review your past financial analyses.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Check ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {checks.map((check) => (
                <TableRow key={check.id}>
                  <TableCell className="font-medium">{check.id}</TableCell>
                  <TableCell>{check.type}</TableCell>
                  <TableCell>{check.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        check.result === 'High Risk'
                          ? 'destructive'
                          : check.result === 'Low Risk'
                            ? 'secondary'
                            : 'outline'
                      }
                    >
                      {check.result}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
