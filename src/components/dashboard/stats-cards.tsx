'use client'

import { useEffect, useState } from 'react'
import { 
  TrendingUp, 
  ShoppingCart, 
  Users, 
  Package,
  DollarSign,
  AlertTriangle
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useDashboardStore } from '@/lib/store/dashboard-store'
import { getDataByBranchView, getAllBranchStats } from '@/lib/mock-data'
import { BranchStats } from '@/lib/types'

interface StatsCardsProps {
  className?: string
}

export default function StatsCards({ className = '' }: StatsCardsProps) {
  const { 
    selectedBranchView, 
    branchStats, 
    allBranchStats,
    setBranchStats, 
    setAllBranchStats,
    currentUser,
    isAdmin 
  } = useDashboardStore()
  
  const [currentStats, setCurrentStats] = useState<BranchStats | null>(null)

  useEffect(() => {
    // Initialize data based on current user and branch view
    const initializeData = () => {
      if (isAdmin) {
        // For admin, use selected branch view
        const data = getDataByBranchView(selectedBranchView)
        if (selectedBranchView === 'all') {
          setAllBranchStats(data.stats)
          setCurrentStats(data.stats)
        } else {
          setBranchStats(data.stats)
          setCurrentStats(data.stats)
        }
      } else {
        // For non-admin users, show only their branch data
        const userBranchId = currentUser?.branchId
        if (userBranchId) {
          const data = getDataByBranchView(userBranchId as 'jaffna' | 'colombo')
          setBranchStats(data.stats)
          setCurrentStats(data.stats)
        }
      }
    }

    initializeData()
  }, [selectedBranchView, isAdmin, currentUser, setBranchStats, setAllBranchStats])

  useEffect(() => {
    // Update current stats when branch view changes
    if (selectedBranchView === 'all') {
      setCurrentStats(allBranchStats)
    } else {
      setCurrentStats(branchStats)
    }
  }, [selectedBranchView, branchStats, allBranchStats])

  if (!currentStats) {
    return (
      <div className={`grid gap-4 md:grid-cols-2 lg:grid-cols-4 ${className}`}>
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <div className="h-4 bg-muted rounded w-24"></div>
              </CardTitle>
              <div className="h-4 w-4 bg-muted rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-16 mb-2"></div>
              <div className="h-3 bg-muted rounded w-20"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const stats = [
    {
      title: 'Total Sales',
      value: `$${currentStats.totalSales.toLocaleString()}`,
      description: `+${currentStats.monthlyGrowth}% from last month`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      title: 'Total Orders',
      value: currentStats.totalOrders.toLocaleString(),
      description: `${currentStats.todayOrders} orders today`,
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      title: 'Total Customers',
      value: currentStats.totalCustomers.toLocaleString(),
      description: 'Active customers',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20'
    },
    {
      title: 'Low Stock Items',
      value: currentStats.lowStockItems.toString(),
      description: 'Items need restocking',
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20'
    }
  ]

  return (
    <div className={`grid gap-4 md:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-2 border-orange-400">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                {stat.description}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
} 