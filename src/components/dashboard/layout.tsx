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
  Coffee,
  Bell,
  AlertTriangle,
  UserCog,
  Gift,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDashboardStore } from '@/lib/store/dashboard-store'
import { Toaster } from '@/components/ui/sonner'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuthStore } from '@/lib/store/auth-store'
import { useRouter } from 'next/navigation'
import BranchSelector from './branch-selector'
import { getDataByBranchView } from '@/lib/mock-data'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, showFor: ['all', 'jaffna', 'colombo', 'customer'] },
  { name: 'Orders', href: '/orders', icon: ShoppingCart, showFor: ['all', 'jaffna', 'colombo', 'customer'] },
  { name: 'Products', href: '/products', icon: Package, showFor: ['all', 'jaffna', 'colombo', 'customer'] },
  { name: 'Customers', href: '/customers', icon: Users, showFor: ['all', 'jaffna', 'colombo'] },
  { name: 'Staff', href: '/staff', icon: UserCog, showFor: ['all', 'jaffna', 'colombo'] },
  { name: 'Promotions', href: '/promotions', icon: Gift, showFor: ['all', 'jaffna', 'colombo', 'customer'] },
  { name: 'Analytics', href: '/analytics', icon: BarChart3, showFor: ['all', 'jaffna', 'colombo'] },
  { name: 'Settings', href: '/settings', icon: Settings, showFor: ['all', 'jaffna', 'colombo', 'customer'] },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const { theme, sidebarOpen, toggleTheme, toggleSidebar, selectedBranchView } = useDashboardStore()
  const [mounted, setMounted] = useState(false)
  const { user, logout } = useAuthStore()
  const router = useRouter()

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
              <Coffee className="h-8 w-8 text-orange-700 animate-pulse" />
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-700 to-yellow-400 rounded-full blur opacity-20 animate-pulse"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-700 to-yellow-400 bg-clip-text text-transparent">
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
            <div className="flex flex-col space-y-2 mt-8">
              {navigation.filter(item => item.showFor.includes(selectedBranchView)).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center px-6 py-3 rounded-lg transition-colors font-medium',
                    pathname === item.href
                      ? 'bg-orange-50 text-orange-700'
                      : 'text-gray-600 hover:bg-orange-50 hover:text-orange-700'
                  )}
                >
                  <item.icon className="h-5 w-5 mr-3 text-orange-500" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className={`lg:pl-64 transition-all duration-300 ease-in-out`}>
        {/* Top bar */}
        <div className="sticky top-0 z-[9999] bg-background/80 backdrop-blur-md border-b border-border overflow-visible">
          <div className="flex items-center justify-between h-14 px-3 sm:px-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSidebar}
                className="lg:hidden hover:bg-accent/50"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-3">
              <NotificationBell />
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="h-8 w-8 p-0 hover:bg-accent/50 rounded-full transition-all duration-300 hover:scale-110"
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-8 w-8 cursor-pointer border-2 border-purple-400">
                    <AvatarImage src={user?.avatar || undefined} alt={user?.name || 'Admin'} />
                    <AvatarFallback>{user?.name?.[0] || 'A'}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="px-3 py-2 text-xs text-muted-foreground">
                    Signed in as<br />
                    <span className="font-semibold text-foreground">{user?.name || 'Admin'}</span>
                  </div>
                  <DropdownMenuItem
                    onClick={() => {
                      logout()
                      router.push('/login')
                    }}
                    className="text-red-600 cursor-pointer"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-3 sm:p-4">
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

function NotificationBell() {
  const { selectedBranchView } = useDashboardStore()
  const data = getDataByBranchView(selectedBranchView)
  const inventoryAlerts = data.inventoryAlerts || []

  if (!inventoryAlerts) return null

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="relative h-8 w-8 p-0 hover:bg-accent/50 rounded-full transition-all duration-300 hover:scale-110"
        >
          <Bell className="h-4 w-4" />
          {inventoryAlerts.length > 0 && (
            <span className="absolute top-0 right-0 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="p-3 font-semibold text-sm border-b">
          Low Stock Alerts ({inventoryAlerts.length})
        </div>
        <div className="p-2 space-y-2 max-h-80 overflow-y-auto">
          {inventoryAlerts.length > 0 ? (
            inventoryAlerts.map((alert) => (
              <div key={alert.productId + alert.branchId} className="flex items-center justify-between p-2 bg-secondary/50 rounded-md text-xs">
                <div>
                  <div className="font-medium text-foreground">{alert.productName}</div>
                  <div className="text-muted-foreground">Branch: {alert.branchId}</div>
                </div>
                <Badge variant="destructive" className="text-xs">
                  Stock: {alert.currentStock} (Min: {alert.lowStockThreshold})
                </Badge>
              </div>
            ))
          ) : (
            <div className="text-center text-sm text-muted-foreground p-4">
              No new alerts. You're all caught up!
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
} 