"use client";
import ClientAuthGuard from '@/components/ClientAuthGuard'
import DashboardLayout from '@/components/dashboard/layout'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ClientAuthGuard>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </ClientAuthGuard>
  )
} 