'use client';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  ShieldCheck,
  Landmark,
  FileText,
  History,
  Settings,
  List,
  Users,
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/upi-scam-detector', label: 'UPI Scam Detector', icon: ShieldCheck },
  { href: '/loan-analyzer', label: 'Loan Analyzer', icon: Landmark },
  { href: '/insurance-decoder', label: 'Insurance Decoder', icon: FileText },
  { href: '/transactions', label: 'Transactions', icon: List },
  { href: '/my-checks', label: 'My Checks', icon: History },
  { href: '/community', label: 'Community', icon: Users },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function SidebarNav() {
  const pathname = usePathname();
  const { setOpenMobile, isMobile } = useSidebar();

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <SidebarMenu>
      {navItems.map((item) => {
        const isActive =
          item.href === '/'
            ? pathname === item.href
            : pathname.startsWith(item.href);
        return (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href} onClick={handleLinkClick}>
              <SidebarMenuButton
                isActive={isActive}
                tooltip={{ children: item.label }}
                asChild={false} 
              >
                <item.icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
