'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  AlertCircle,
  Lightbulb,
  MessageCircle,
  PlusCircle,
  Search,
  ThumbsUp,
  User,
  Users,
} from 'lucide-react';

const communityScams = [
  {
    id: 1,
    region: 'Mumbai, MH',
    type: 'Electricity Bill Scam',
    story:
      "Received an SMS saying my power would be cut for an unpaid bill. The link looked real, but it was a fake payment portal. Almost lost ₹15,000!",
    user: 'Amit S.',
    avatar: '/avatars/01.png',
    votes: 128,
    comments: 15,
  },
  {
    id: 2,
    region: 'Bengaluru, KA',
    type: 'Fake Job Offer',
    story:
      'Got a WhatsApp message about a remote job with a high salary. They asked for a "registration fee" via UPI. It was a scam.',
    user: 'Priya N.',
    avatar: '/avatars/02.png',
    votes: 92,
    comments: 8,
  },
  {
    id: 3,
    region: 'Delhi, DL',
    type: 'KYC Update Scam',
    story:
      "A caller pretending to be from my bank asked for my details to update KYC. They tried to get me to install a screen-sharing app. Hung up immediately.",
    user: 'Raj K.',
    avatar: '/avatars/03.png',
    votes: 76,
    comments: 5,
  },
];

const topContributors = [
    { name: "Anjali P.", points: 1250, avatar: '/avatars/04.png' },
    { name: "Vikram R.", points: 980, avatar: '/avatars/05.png' },
    { name: "Sameer V.", points: 720, avatar: '/avatars/01.png' },
]

export default function CommunityPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-headline">
          Community Safety Hub
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
          Learn from others, share your experiences (anonymously), and help build
          a safer financial ecosystem.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Report a New Scam</CardTitle>
              <CardDescription>
                Spotted a new scam? Share the details to protect others. Your report is anonymous.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Scam Type (e.g., Fake Refund)" />
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="delhi">Delhi</SelectItem>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="bangalore">Bangalore</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Textarea
                placeholder="Describe the scam: What happened? What did they ask for? How did they contact you?"
                className="min-h-[100px]"
              />
            </CardContent>
            <CardFooter>
              <Button>
                <PlusCircle className="mr-2" /> Submit Anonymously
              </Button>
            </CardFooter>
          </Card>

          <div>
             <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                 <h2 className="text-2xl font-bold tracking-tight font-headline mb-2 md:mb-0">
                    Live Scam Feed
                </h2>
                <div className="flex items-center gap-2">
                    <div className="relative flex-1 md:grow-0">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search scams..." className="pl-8 w-full md:w-auto" />
                    </div>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by region" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Regions</SelectItem>
                            <SelectItem value="delhi">Delhi</SelectItem>
                            <SelectItem value="mumbai">Mumbai</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-4">
              {communityScams.map((scam) => (
                <Card key={scam.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{scam.type}</CardTitle>
                        <Badge variant="secondary">{scam.region}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground italic">"{scam.story}"</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={scam.avatar} alt={scam.user} />
                        <AvatarFallback>{scam.user.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>Reported by {scam.user}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{scam.votes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>{scam.comments}</span>
                        </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Top Contributors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {topContributors.map((c, i) => (
                   <li key={i} className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={c.avatar} alt={c.name} />
                            <AvatarFallback>{c.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{c.name}</span>
                     </div>
                     <Badge variant="outline">{c.points} pts</Badge>
                   </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-amber-50 dark:bg-amber-950/50 border-amber-300 dark:border-amber-800">
             <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                <Lightbulb className="h-5 w-5" />
                Safety Tip of the Day
              </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    If an offer sounds too good to be true, it probably is. Never rush into payments for "exclusive deals" or "lottery wins."
                </p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                Official Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3 text-sm">
                    <li className="text-muted-foreground"><span className='font-semibold text-foreground'>[RBI]</span>: Beware of unauthorized loan apps.</li>
                    <li className="text-muted-foreground"><span className='font-semibold text-foreground'>[CERT-In]</span>: New phishing campaign targeting net-banking users.</li>
                </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
