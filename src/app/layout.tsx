import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { ShieldCheck, UserCircle } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import SidebarNav from '@/components/layout/sidebar-nav';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Financial Fortress',
  description: 'Your trusted partner in financial safety.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-background text-foreground antialiased">
        <ThemeProvider>
          <SidebarProvider>
            <Sidebar>
              <SidebarHeader>
                <div className="flex items-center gap-2">
                  <Button
                    asChild
                    variant="ghost"
                    className="h-auto p-1 text-primary"
                  >
                    <Link href="/">
                      <ShieldCheck />
                    </Link>
                  </Button>
                  <div className="flex flex-col">
                    <span className="text-lg font-bold font-headline">
                      Financial Fortress
                    </span>
                  </div>
                </div>
              </SidebarHeader>
              <SidebarContent>
                <SidebarNav />
              </SidebarContent>
              <SidebarFooter>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <UserCircle />
                  </Button>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Guest User</span>
                    <span className="text-xs text-muted-foreground">
                      guest@example.com
                    </span>
                  </div>
                </div>
              </SidebarFooter>
            </Sidebar>
            <SidebarInset>
              <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-6 md:justify-end">
                <SidebarTrigger className="md:hidden" />
                <ThemeToggle />
              </header>
              <main className="flex-1 p-4 md:p-6">{children}</main>
              <footer className="border-t p-6 text-center text-xs text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} Financial Fortress</p>
              </footer>
            </SidebarInset>
          </SidebarProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
