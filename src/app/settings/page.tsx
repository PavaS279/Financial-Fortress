
import { ThemeToggle } from '@/components/theme-toggle';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Save } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function SettingsPage() {
  return (
    <div className="container mx-auto max-w-4xl py-10">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account settings, notifications, and preferences.
        </p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
            <CardDescription>
              Update your personal information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Guest User" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="guest@example.com" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="Add phone number for alerts" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age-group">Age Group</Label>
                <Select>
                  <SelectTrigger id="age-group">
                    <SelectValue placeholder="Select your age group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="18-25">18-25</SelectItem>
                    <SelectItem value="26-35">26-35</SelectItem>
                    <SelectItem value="36-50">36-50</SelectItem>
                    <SelectItem value="51+">51+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alert Settings</CardTitle>
            <CardDescription>
              Configure how you receive notifications.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
              <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
                <span>Email alerts for high-risk transactions</span>
                <span className="font-normal leading-snug text-muted-foreground">
                  Receive alerts and summaries via email.
                </span>
              </Label>
              <Switch id="email-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
              <Label htmlFor="sms-notifications" className="flex flex-col space-y-1">
                <span>SMS/WhatsApp alerts</span>
                <span className="font-normal leading-snug text-muted-foreground">
                  Get real-time alerts on your mobile.
                </span>
              </Label>
              <Switch id="sms-notifications" />
            </div>
            <div className="space-y-2">
                <Label>Alert Frequency</Label>
                 <RadioGroup defaultValue="real-time" className="flex flex-col sm:flex-row gap-4 pt-2">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="real-time" id="real-time" />
                        <Label htmlFor="real-time">Real-time</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="daily" id="daily" />
                        <Label htmlFor="daily">Daily Digest</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="weekly" id="weekly" />
                        <Label htmlFor="weekly">Weekly Summary</Label>
                    </div>
                </RadioGroup>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Language & Preferences</CardTitle>
            <CardDescription>
              Customize the appearance and language of the app.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="theme" className="flex flex-col space-y-1">
                <span>Theme</span>
                <span className="font-normal leading-snug text-muted-foreground">
                  Select the theme for the dashboard.
                </span>
              </Label>
              <ThemeToggle />
            </div>
             <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select>
                  <SelectTrigger id="language" className="w-[180px]">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">Hindi</SelectItem>
                    <SelectItem value="bn">Bengali</SelectItem>
                    <SelectItem value="ta">Tamil</SelectItem>
                  </SelectContent>
                </Select>
            </div>
             <div className="space-y-2">
                <Label htmlFor="font-size">Font Size</Label>
                <div className='flex items-center gap-4'>
                    <span className='text-sm'>A</span>
                    <Slider defaultValue={[2]} max={4} step={1} className='max-w-xs' />
                    <span className='text-xl'>A</span>
                </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Analysis Defaults</CardTitle>
            <CardDescription>
              Set your default preferences for financial analysis.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="space-y-2">
                <Label htmlFor="default-analysis">Default Analysis Type</Label>
                <Select defaultValue="comprehensive">
                  <SelectTrigger id="default-analysis" className="w-[240px]">
                    <SelectValue placeholder="Select analysis type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quick">Quick Review</SelectItem>
                    <SelectItem value="comprehensive">Comprehensive Analysis</SelectItem>
                    <SelectItem value="market-compare">Comparison with Market</SelectItem>
                  </SelectContent>
                </Select>
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="auto-analyze" className="flex flex-col space-y-1">
                <span>Auto-analysis on paste</span>
                <span className="font-normal leading-snug text-muted-foreground">
                  Automatically start analysis when you paste content.
                </span>
              </Label>
              <Switch id="auto-analyze" defaultChecked/>
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="save-history" className="flex flex-col space-y-1">
                <span>Save analysis history</span>
                <span className="font-normal leading-snug text-muted-foreground">
                  Keep a record of all your checks in "My Checks".
                </span>
              </Label>
              <Switch id="save-history" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Privacy</CardTitle>
            <CardDescription>
              Manage your data and account privacy.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Data Retention Period</p>
                  <p className="text-sm text-muted-foreground">Analyses are stored for 90 days.</p>
                </div>
                <Button variant="outline">Change</Button>
              </div>
               <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Export My Data</p>
                  <p className="text-sm text-muted-foreground">Download all your data in a JSON format.</p>
                </div>
                <Button variant="outline">Export</Button>
              </div>
          </CardContent>
           <CardFooter className="border-t pt-6">
              <Button variant="destructive">Delete My Account</Button>
           </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Connected Accounts</CardTitle>
            <CardDescription>
              Manage the financial accounts connected to the application (feature coming soon).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border rounded-lg bg-secondary/50">
              <p className="text-sm text-muted-foreground">No accounts connected.</p>
              <Button variant="outline" disabled>Connect Account</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Help & Support</CardTitle>
                <CardDescription>
                    Find answers to your questions and get help.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Frequently Asked Questions</AccordionTrigger>
                        <AccordionContent>
                           Check out our FAQ page for answers to common questions.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Contact Support</AccordionTrigger>
                        <AccordionContent>
                           You can reach our support team at support@financialfortress.com.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Feedback & Issues</AccordionTrigger>
                        <AccordionContent>
                           Have feedback or found a bug? Let us know!
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>

        <div className='flex justify-end'>
            <Button size="lg"><Save className="mr-2"/>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
