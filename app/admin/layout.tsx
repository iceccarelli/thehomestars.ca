import { redirect } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import {
  LayoutDashboard,
  ClipboardList,
  HardHat,
  Receipt,
  Users,
  MessageSquare,
  Settings,
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/quotes', label: 'Quotes & Leads', icon: ClipboardList },
  { href: '/admin/projects', label: 'Projects', icon: HardHat },
  { href: '/admin/invoices', label: 'Invoices', icon: Receipt },
  { href: '/admin/users', label: 'Customers', icon: Users },
  { href: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user || session.user.role !== 'ADMIN') {
    redirect('/login');
  }

  return (
    <div className="portal-layout">
      {/* Admin Sidebar */}
      <aside className="portal-sidebar admin-sidebar">
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
