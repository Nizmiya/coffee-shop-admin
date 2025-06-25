'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package,
  Coffee,
  BarChart3,
  Sparkles,
  Clock,
  Calendar,
  AlertTriangle,
  Building2,
  ArrowRight
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { 
  branches, 
  getBranchStats, 
  getBranchSalesData, 
  getBranchProducts, 
  getBranchOrders, 
  getBranchInventoryAlerts 
} from '@/lib/mock-data'
import { useDashboardStore } from '@/lib/store/dashboard-store'
import { BranchSelector } from '@/components/ui/branch-selector'
import { Product, Order } from '@/lib/types'

export default function DashboardPage() {
  const router = useRouter()
  const [currentDateTime, setCurrentDateTime] = useState(new Date())
  const { selectedBranch, setSelectedBranch, setBranches, setCurrentUser } = useDashboardStore()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    setBranches(branches)
    if (!selectedBranch && branches.length > 0) {
      setSelectedBranch(branches[0])
    }
    // Minimal user object for UI
    setCurrentUser({
      id: 'admin1',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
    })
    // eslint-disable-next-line
  }, [])

  const handleQuickAction = (path: string) => {
    router.push(path)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    })
  }

  // Memoize data fetching to prevent re-renders
  const branchStats = selectedBranch ? getBranchStats(selectedBranch.id) : null
  const salesData = selectedBranch ? getBranchSalesData(selectedBranch.id) : []
  const productPerformance = selectedBranch 
    ? getBranchProducts(selectedBranch.id).slice(0, 5).map(product => ({
        ...product,
        sales: Math.floor(Math.random() * 50) + 10, 
      }))
    : []
  const recentOrders = selectedBranch ? getBranchOrders(selectedBranch.id).slice(0, 5) : []
  const inventoryAlerts = selectedBranch ? getBranchInventoryAlerts(selectedBranch.id) : []

  if (!selectedBranch) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center p-8 bg-gray-50 rounded-lg shadow-md">
          <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Branch Selected</h3>
          <p className="text-gray-500">Please select a branch from the dropdown to view its dashboard.</p>
        </div>
      </div>
    )
  }

  const quickActions = [
    { name: 'New Order', path: '/orders?action=new', icon: ShoppingCart },
    { name: 'Add Product', path: '/products?action=new', icon: Package },
    { name: 'Add Customer', path: '/customers?action=new', icon: Users },
    { name: 'View Analytics', path: '/analytics', icon: BarChart3 },
  ]

  return (
    <div className="space-y-6 p-1">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25"></div>
        <div className="relative bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-purple-200/20">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {selectedBranch.name} Dashboard
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Real-time overview of your branch performance.
              </p>
            </div>
            <div className="w-full sm:w-64">
              <BranchSelector branches={branches} />
            </div>
          </div>
        </div>
      </div>
      
      {/* DateTime and Branch Info Combined */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <Card className="bg-white/60 backdrop-blur-sm border-gray-200/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-green-600" />
                <span className="text-sm font-semibold text-gray-800">
                  {formatDate(currentDateTime)}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-semibold text-gray-800">
                  {formatTime(currentDateTime)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-sm border-gray-200/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <Building2 className="h-5 w-5 text-purple-600" />
                    <h3 className="text-sm font-semibold text-gray-800">{selectedBranch.location}</h3>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-500">{selectedBranch.phone}</p>
                    <p className="text-xs text-gray-500">{selectedBranch.email}</p>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Alerts */}
      {inventoryAlerts.length > 0 && (
        <Card className="bg-red-50/50 border-red-200/80">
          <CardHeader className="p-3">
            <CardTitle className="flex items-center text-red-700 text-sm font-semibold">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Low Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-3">
            <div className="space-y-2">
              {inventoryAlerts.map((alert) => (
                <div key={alert.productId} className="flex items-center justify-between p-2 bg-white/60 rounded-md text-xs">
                  <span className="font-medium text-gray-700">{alert.productName}</span>
                  <Badge variant="destructive" className="text-xs">
                    Stock: {alert.currentStock} (Min: {alert.lowStockThreshold})
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="stats-card group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500 group-hover:text-green-500 transition-colors" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">
              ${branchStats?.totalSales.toLocaleString() || '0'}
            </div>
            <p className="text-xs text-gray-500 flex items-center mt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              +{branchStats?.monthlyGrowth || 0}% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="stats-card group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-gray-500 group-hover:text-blue-500 transition-colors" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">
              {branchStats?.totalOrders || 0}
            </div>
            <p className="text-xs text-gray-500 flex items-center mt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-blue-500" />
              +{branchStats?.todayOrders || 0} orders today
            </p>
          </CardContent>
        </Card>

        <Card className="stats-card group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-gray-500 group-hover:text-purple-500 transition-colors" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">
              {branchStats?.totalCustomers || 0}
            </div>
            <p className="text-xs text-gray-500 flex items-center mt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-purple-500" />
              +{branchStats?.newCustomers || 0} new this week
            </p>
          </CardContent>
        </Card>

        <Card className="stats-card group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
            <Sparkles className="h-4 w-4 text-gray-500 group-hover:text-pink-500 transition-colors" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">
              {(branchStats?.totalSales && branchStats?.totalOrders) ? ((branchStats.totalSales / branchStats.totalOrders) ?? 0).toFixed(2) : '0.00'}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              vs. $22.50 last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <Card className="col-span-1 lg:col-span-2 bg-white/60 backdrop-blur-sm border-gray-200/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-blue-500" />
              Sales Performance
            </CardTitle>
            <CardDescription>Last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    border: "none",
                  }}
                />
                <Line type="monotone" dataKey="revenue" strokeWidth={2} stroke="#3b82f6" dot={{ r: 4, fill: "#3b82f6" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Quick Actions */}
        <Card className="bg-white/60 backdrop-blur-sm border-gray-200/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-pink-500" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action) => (
              <Button
                key={action.path}
                variant="ghost"
                onClick={() => handleQuickAction(action.path)}
                className="w-full justify-start p-3 text-left group"
              >
                <action.icon className="h-5 w-5 mr-3 text-gray-500 group-hover:text-pink-500 transition-colors" />
                <span className="font-semibold text-gray-700">{action.name}</span>
                <ArrowRight className="h-4 w-4 ml-auto text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Products */}
        <Card className="col-span-1 lg:col-span-2 bg-white/60 backdrop-blur-sm border-gray-200/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="mr-2 h-5 w-5 text-yellow-500" />
              Top Products by Sales
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {productPerformance.filter(product => product && typeof product.price === 'number').map((product) => (
              <div key={product.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Coffee className="h-5 w-5 text-yellow-600 mr-3" />
                  <div>
                    <p className="font-semibold text-sm">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">${(product.price ?? 0).toFixed(2)}</p>
                  <p className="text-xs text-gray-500">{product.sales} sold</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="bg-white/60 backdrop-blur-sm border-gray-200/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-purple-500" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-purple-50/50 transition-colors">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-full mr-3">
                    <ShoppingCart className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{order.customerName}</p>
                    <p className="text-xs text-gray-500">{order.items.length} items</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">${(order.total ?? 0).toFixed(2)}</p>
                  <Badge 
                    variant={order.status === 'completed' ? 'default' : order.status === 'pending' ? 'secondary' : 'destructive'}
                    className="text-xs mt-1"
                  >
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
             <Button variant="outline" size="sm" className="w-full mt-4" onClick={() => router.push('/orders')}>
              View All Orders
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 