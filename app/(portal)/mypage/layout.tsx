import { redirect } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import {
  LayoutDashboard,
  ClipboardList,
  HardHat,
  Receipt,
  MessageSquare,
} from 'lucide-react';

const navItems = [
  { href: '/mypage', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/mypage/quotes', label: 'My Quotes', icon: ClipboardList },
  { href: '/mypage/projects', label: 'My Projects', icon: HardHat },
  { href: '/mypage/invoices', label: 'Invoices & Payments', icon: Receipt },
  { href: '/mypage/inquiries', label: 'Inquiries', icon: MessageSquare },
];

export default async function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect('/login');

  return (
    <div className="portal-layout">
      {/* Sidebar */}
      <aside className="portal-sidebar">
        <nav className="portal-nav">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="portal-nav-item">
              <span className="portal-nav-icon">
                <item.icon size={18} strokeWidth={1.75} />
              </span>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="portal-main">
        {children}
      </main>
    </div>
  );
}
