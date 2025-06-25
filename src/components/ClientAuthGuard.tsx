"use client";
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/store/auth-store';

export default function ClientAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/signup') || pathname.startsWith('/forgot-password');
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated && !isAuthPage) {
      router.push('/login');
    }
    if (isAuthenticated && isAuthPage) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isAuthPage, router]);

  // Only render children if on the correct page
  if (!isAuthenticated && !isAuthPage) return null;
  if (isAuthenticated && isAuthPage) return null;
  return <>{children}</>;
} 