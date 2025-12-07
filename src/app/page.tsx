'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import {
  BarChart as LucideBarChart,
  LineChart,
  FileText,
  Landmark,
  ShieldAlert,
  CheckCircle2,
  AlertCircle,
  Clock,
  MoreHorizontal,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart as RechartsBarChart } from 'recharts';
import Link from 'next/link';

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--primary))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--accent))',
  },
};

const liveTransactions = [
  { id: 'TXN789', source: 'ICICI Bank Credit Card', amount: '₹1,250.00', description: 'Zomato Food Order', status: 'Verified', icon: CheckCircle2, color: 'text-green-500' },
  { id: 'TXN790', source: 'HDFC Bank Account', amount: '₹8,000.00', description: 'Unknown UPI Request', status: 'Needs Review', icon: AlertCircle, color: 'text-yellow-500' },
  { id: 'TXN791', source: 'PayTM Wallet', amount: '₹300.00', description: 'Mobile Recharge', status: 'Verified', icon: CheckCircle2, color: 'text-green-500' },
  { id: 'TXN792', source: 'Google Pay', amount: '₹15,000.00', description: 'Rent Payment', status: 'Recurring', icon: Clock, color: 'text-blue-500' },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Overall Risk Score
            </CardTitle>
            <LucideBarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24/100</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Live Alerts
            </CardTitle>
            <ShieldAlert className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">1</div>
            <p className="text-xs text-muted-foreground">
              1 high-risk transaction detected
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Checks Performed</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12</div>
            <p className="text-xs text-muted-foreground">
              +1 since last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Policies Decoded
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              Your new car insurance policy
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="font-headline">Recent Activity</CardTitle>
            <CardDescription>
              A summary of your financial checks over the past 6 months.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer>
                <RechartsBarChart data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                  <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-headline">Quick Actions</CardTitle>
            <CardDescription>
              Jump right back into your financial checks.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
              <Link href="/upi-scam-detector" className="block">
                <div className="flex items-center space-x-4 rounded-md border p-4 hover:bg-secondary/50 transition-colors">
                    <ShieldAlert className="h-8 w-8 text-destructive" />
                    <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">UPI Scam Detector</p>
                        <p className="text-sm text-muted-foreground">Analyze UPI transaction details.</p>
                    </div>
                </div>
              </Link>
              <Link href="/loan-analyzer" className="block">
                <div className="flex items-center space-x-4 rounded-md border p-4 hover:bg-secondary/50 transition-colors">
                    <Landmark className="h-8 w-8 text-primary" />
                    <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">Loan Analyzer</p>
                        <p className="text-sm text-muted-foreground">Evaluate loan offers for hidden risks.</p>
                    </div>
                </div>
              </Link>
              <Link href="/insurance-decoder" className="block">
                <div className="flex items-center space-x-4 rounded-md border p-4 hover:bg-secondary/50 transition-colors">
                    <FileText className="h-8 w-8 text-green-600" />
                    <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">Insurance Decoder</p>
                        <p className="text-sm text-muted-foreground">Simplify complex insurance policies.</p>
                    </div>
                </div>
              </Link>
          </CardContent>
        </Card>
      </div>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Live Transaction Feed</CardTitle>
            <CardDescription>Real-time monitoring of your connected accounts.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {liveTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center gap-4">
                  <div className={`p-2 bg-secondary rounded-full ${tx.color}`}>
                    <tx.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium">{tx.description}</p>
                    <p className="text-sm text-muted-foreground">{tx.source}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{tx.amount}</p>
                    <Badge variant={tx.status === 'Needs Review' ? 'destructive' : 'outline'} className="mt-1">{tx.status}</Badge>
                  </div>
                   <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
                View All Transactions <ArrowRight className="ml-2 h-4 w-4"/>
            </Button>
          </CardFooter>
        </Card>
        <Card className="col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle>Smart Recommendations</CardTitle>
            <CardDescription>AI-powered insights based on your activity.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-red-500/10 border border-destructive/20 rounded-lg">
                <ShieldAlert className="h-6 w-6 text-destructive mt-1"/>
                <div>
                    <p className="font-semibold">High-Risk Alert</p>
                    <p className="text-sm text-muted-foreground">A UPI payment request for <span className="font-bold">₹8,000</span> seems suspicious. We recommend you run a 'Deep Analysis'.</p>
                     <Button size="sm" variant="destructive" className="mt-2">Check Now</Button>
                </div>
            </div>
             <div className="flex items-start gap-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600 mt-1"/>
                <div>
                    <p className="font-semibold">Savings Opportunity</p>
                    <p className="text-sm text-muted-foreground">Your new car insurance premium is 15% lower than your last one. You've saved an estimated <span className="font-bold">₹2,500</span>!</p>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
