'use client';

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
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Archive,
  BarChart2,
  ChevronDown,
  FileDown,
  FileText,
  Filter,
  Landmark,
  ListOrdered,
  MoreHorizontal,
  PlusCircle,
  Search,
  Settings2,
  Share2,
  ShieldCheck,
  Star,
  Trash2,
  TrendingUp,
} from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

const checks = [
  {
    id: 'CHK-001',
    type: 'UPI Scam',
    icon: ShieldCheck,
    subject: 'rohit.sharma@okicici',
    date: '2024-07-22',
    result: 'High Risk',
    isStarred: true,
  },
  {
    id: 'CHK-002',
    type: 'Loan Analysis',
    icon: Landmark,
    subject: 'Personal Loan - HDFC Bank',
    date: '2024-07-21',
    result: 'Medium Risk',
    isStarred: false,
  },
  {
    id: 'CHK-003',
    type: 'Insurance Decode',
    icon: FileText,
    subject: 'Bajaj Allianz Car Insurance',
    date: '2024-07-20',
    result: 'Info',
    isStarred: true,
  },
  {
    id: 'CHK-004',
    type: 'UPI Scam',
    icon: ShieldCheck,
    subject: 'amazon.pay@apl',
    date: '2024-07-19',
    result: 'No Risk',
    isStarred: false,
  },
  {
    id: 'CHK-005',
    type: 'Loan Analysis',
    icon: Landmark,
    subject: 'Home Loan - SBI',
    date: '2024-07-18',
    result: 'Low Risk',
    isStarred: false,
  },
];

const chartData = [
  { name: 'Jan', total: Math.floor(Math.random() * 6) + 1 },
  { name: 'Feb', total: Math.floor(Math.random() * 6) + 1 },
  { name: 'Mar', total: Math.floor(Math.random() * 6) + 1 },
  { name: 'Apr', total: Math.floor(Math.random() * 6) + 1 },
  { name: 'May', total: Math.floor(Math.random() * 6) + 1 },
  { name: 'Jun', total: Math.floor(Math.random() * 6) + 1 },
];

export default function MyChecksPage() {
  const getRiskBadgeVariant = (result: string) => {
    switch (result) {
      case 'High Risk':
        return 'destructive';
      case 'Medium Risk':
        return 'secondary'; // Will be styled yellow
      case 'Low Risk':
        return 'secondary';
      case 'No Risk':
        return 'secondary'; // Will be styled green
      default:
        return 'outline';
    }
  };
  const getRiskBadgeClass = (result: string) => {
    switch (result) {
        case 'Medium Risk':
            return 'bg-yellow-500 text-primary-foreground hover:bg-yellow-500/80';
        case 'No Risk':
            return 'bg-green-600 text-primary-foreground hover:bg-green-600/80';
        default:
            return '';
    }
  }


  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            My Checks
          </h1>
          <p className="text-muted-foreground">
            Review, analyze, and manage your financial check history.
          </p>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Checks</CardTitle>
            <ListOrdered className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">+5 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Risk Score
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">4.8 / 10</div>
            <p className="text-xs text-muted-foreground">Trending safer</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scams Blocked</CardTitle>
            <ShieldCheck className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              3 high-risk alerts this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Potential Savings
            </CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹8,500</div>
            <p className="text-xs text-muted-foreground">
              Based on loan analyses
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between px-6 pt-6 pb-4">
              <div>
                <CardTitle>Check History</CardTitle>
                <CardDescription>
                  Review your past financial analyses.
                </CardDescription>
              </div>
               <div className="flex items-center gap-2 mt-4 md:mt-0">
                <div className="relative flex-1 md:grow-0">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by name/policy..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                  />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-1">
                        <Filter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                        </span>
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>UPI Scam</DropdownMenuItem>
                    <DropdownMenuItem>Loan Analysis</DropdownMenuItem>
                    <DropdownMenuItem>Insurance Decode</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" className="gap-1">
                  <ListOrdered className="h-3.5 w-3.5" />
                  Sort
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]"></TableHead>
                    <TableHead>Check Details</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead className="w-[50px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {checks.map((check) => (
                    <TableRow key={check.id}>
                      <TableCell>
                        <Button variant="ghost" size="icon" className={`h-8 w-8 ${check.isStarred ? 'text-yellow-400' : 'text-muted-foreground'}`}>
                           <Star className={`h-4 w-4 ${check.isStarred ? 'fill-current' : ''}`} />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-secondary rounded-md">
                            <check.icon className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <div className="font-medium">{check.type}</div>
                            <div className="text-sm text-muted-foreground">
                              {check.subject}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{check.date}</TableCell>
                      <TableCell>
                        <Badge
                          variant={getRiskBadgeVariant(check.result)}
                          className={getRiskBadgeClass(check.result)}
                        >
                          {check.result}
                        </Badge>
                      </TableCell>
                      <TableCell>
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Add Note</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-2">
                    <Button variant="outline"><FileDown className="mr-2 h-4 w-4"/>Export All</Button>
                    <Button variant="outline"><Share2 className="mr-2 h-4 w-4"/>Share</Button>
                    <Button variant="outline"><Archive className="mr-2 h-4 w-4"/>Archive</Button>
                    <Button variant="outline" className="text-destructive hover:text-destructive"><Trash2 className="mr-2 h-4 w-4"/>Delete Old</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Analysis Insights</CardTitle>
                    <CardDescription>Patterns from your check history.</CardDescription>
                </CardHeader>
                 <CardContent className="pl-2">
                    <ChartContainer
                      config={{
                        total: {
                          label: 'Checks',
                          color: 'hsl(var(--chart-1))',
                        },
                      }}
                      className="h-[150px] w-full"
                    >
                      <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                          left: -20,
                          top: 10,
                        }}
                      >
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="name"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Bar dataKey="total" fill="var(--color-total)" radius={4} />
                      </BarChart>
                    </ChartContainer>
                     <div className='mt-4 text-sm text-muted-foreground space-y-2'>
                        <p className='flex items-center gap-2'><PlusCircle className='w-4 h-4 text-primary'/>You perform most checks on weekends.</p>
                        <p className='flex items-center gap-2'><Settings2 className='w-4 h-4 text-primary'/>Consider automating checks for recurring payments.</p>
                    </div>
                 </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
