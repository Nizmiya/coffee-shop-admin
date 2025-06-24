'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Users, 
  BarChart3, 
  Settings,
  Menu,
  X,
  Sun,
  Moon,
  Coffee
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDashboardStore } from '@/lib/store/dashboard-store'
import { Toaster } from '@/components/ui/sonner'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Orders', href: '/orders', icon: ShoppingCart },
  { name: 'Products', href: '/products', icon: Package },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const { theme, sidebarOpen, toggleTheme, toggleSidebar } = useDashboardStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 sidebar-gradient border-r border-border transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Coffee className="h-8 w-8 text-primary animate-pulse" />
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-20 animate-pulse"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Coffee Admin
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="lg:hidden hover:bg-accent/50"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`nav-item flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                    isActive
                      ? 'nav-item active text-white shadow-lg'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className={`lg:pl-64 transition-all duration-300 ease-in-out`}>
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSidebar}
                className="lg:hidden hover:bg-accent/50"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="h-9 w-9 p-0 hover:bg-accent/50 rounded-full transition-all duration-300 hover:scale-110"
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}

      <Toaster />
    </div>
  )
} 