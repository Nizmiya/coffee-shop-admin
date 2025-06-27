'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDashboardStore } from '@/lib/store/dashboard-store';

const branches = [
  { id: 'all', name: 'All Branches', href: '/staff' },
  { id: 'jaffna', name: 'Jaffna Branch', href: '/staff/jaffna' },
  { id: 'colombo', name: 'Colombo Branch', href: '/staff/colombo' },
];

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { selectedBranchView } = useDashboardStore();

  // Only show sidebar if 'all' is selected
  if (selectedBranchView !== 'all') {
    return <main className="flex-1 p-8 bg-yellow-50 min-h-screen">{children}</main>;
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gradient-to-b from-orange-500 to-yellow-300 p-6 flex flex-col gap-4 shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6">Staff</h2>
        <nav className="flex flex-col gap-2">
          {branches.map(branch => (
            <Link
              key={branch.id}
              href={branch.href}
              className={`px-4 py-2 rounded-lg font-semibold transition-all text-lg shadow-md border-2 border-orange-200/40 hover:bg-orange-100/30 hover:text-orange-900 ${pathname.endsWith(branch.href) ? 'bg-white text-orange-700 border-orange-400' : 'bg-orange-200/20 text-white'}`}
            >
              {branch.name}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8 bg-yellow-50 min-h-screen">{children}</main>
    </div>
  );
} 