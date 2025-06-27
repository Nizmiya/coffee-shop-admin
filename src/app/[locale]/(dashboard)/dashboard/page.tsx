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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell } from 'recharts'
import { 
  branches, 
  getDataByBranchView, 
} from '@/lib/mock-data'
import { useDashboardStore } from '@/lib/store/dashboard-store'
import BranchSelector from '@/components/dashboard/branch-selector'
import { Product, Order } from '@/lib/types'
import Link from 'next/link'

export default function DashboardPage() {
  const router = useRouter()
  const [currentDateTime, setCurrentDateTime] = useState(new Date())
  const { selectedBranchView, setSelectedBranchView, setBranches, setCurrentUser } = useDashboardStore()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    setBranches(branches)
    setSelectedBranchView('all') // Default to all branches for admin
    setCurrentUser({
      id: 'admin1',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }, [])

  // Get all data based on selectedBranchView
  const data = getDataByBranchView(selectedBranchView)
  const branchStats = data.stats
  const salesData = data.salesData
  const allProducts = data.products
  const allOrders = data.orders
  const allCustomers = data.customers
  const inventoryAlerts = data.inventoryAlerts
  const COLORS = ['#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b', '#ef4444']

  // Top 5 products by revenue
  const productPerformance = allProducts
    .map(product => ({
      productId: product.id,
      productName: product.name,
      sales: Math.floor(Math.random() * 50) + 10,
      revenue: Math.floor(Math.random() * 200) + 50,
      orders: Math.floor(Math.random() * 30) + 5,
      branchId: product.branchId
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)

  // Recent 5 orders (latest first)
  const recentOrders = allOrders
    .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
    .slice(0, 5)

  // Branch label for heading
  const branchLabel = selectedBranchView === 'all'
    ? 'All Branches'
    : selectedBranchView === 'jaffna'
      ? 'Jaffna Branch'
      : 'Colombo Branch'
  const branchLocation = selectedBranchView === 'all' ? 'Jaffna & Colombo' : (selectedBranchView === 'jaffna' ? 'Jaffna' : 'Colombo')
  const branchPhone = selectedBranchView === 'all' ? `${branches[0].phone} / ${branches[1].phone}` : (selectedBranchView === 'jaffna' ? branches[0].phone : branches[1].phone)
  const branchEmail = selectedBranchView === 'all' ? `${branches[0].email} / ${branches[1].email}` : (selectedBranchView === 'jaffna' ? branches[0].email : branches[1].email)

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

  const quickActions = [
    { name: 'New Order', path: '/orders?action=new', icon: ShoppingCart },
    ...(selectedBranchView === 'all' ? [{ name: 'Add Product', path: '/products?action=new', icon: Package }] : []),
    { name: 'Add Customer', path: '/customers?action=new', icon: Users },
    { name: 'View Analytics', path: '/analytics', icon: BarChart3 },
  ]

  if (selectedBranchView === 'customer') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-700 to-yellow-400 bg-clip-text text-transparent mb-4">Welcome, Customer!</h1>
        <p className="text-lg text-gray-700 mb-6">You can browse products, place orders, view your order status, enjoy promotions, and manage your settings.</p>
        <div className="grid gap-4 md:grid-cols-2 max-w-2xl w-full">
          <Link href="/products" className="bg-gradient-to-br from-yellow-100 via-orange-50 to-yellow-200 p-6 rounded-xl shadow text-left transition hover:scale-105 cursor-pointer block">
            <h2 className="font-bold text-orange-800 text-xl mb-2 flex items-center gap-2">🛒 Products</h2>
            <p>Browse and order your favorite coffee shop items.</p>
          </Link>
          <Link href="/orders" className="bg-gradient-to-br from-yellow-100 via-orange-50 to-yellow-200 p-6 rounded-xl shadow text-left transition hover:scale-105 cursor-pointer block">
            <h2 className="font-bold text-orange-800 text-xl mb-2 flex items-center gap-2">📦 Orders</h2>
            <p>Track your orders and see confirmation messages.</p>
          </Link>
          <Link href="/promotions" className="bg-gradient-to-br from-yellow-100 via-orange-50 to-yellow-200 p-6 rounded-xl shadow text-left transition hover:scale-105 cursor-pointer block">
            <h2 className="font-bold text-orange-800 text-xl mb-2 flex items-center gap-2">🎁 Promotions</h2>
            <p>View and use available offers and vouchers for discounts.</p>
          </Link>
          <Link href="/settings" className="bg-gradient-to-br from-yellow-100 via-orange-50 to-yellow-200 p-6 rounded-xl shadow text-left transition hover:scale-105 cursor-pointer block">
            <h2 className="font-bold text-orange-800 text-xl mb-2 flex items-center gap-2">⚙️ Settings</h2>
            <p>Manage your profile and preferences.</p>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-1 overflow-visible">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-700 to-yellow-400 rounded-lg blur opacity-25"></div>
        <div className="relative bg-gradient-to-r from-orange-700/10 to-yellow-400/10 p-6 rounded-lg border border-orange-200/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-orange-700 to-yellow-400 bg-clip-text text-transparent">
                {branchLabel} Dashboard
              </h1>
              <p className="text-muted-foreground mt-2">
                Real-time overview of your branch performance.
              </p>
            </div>
            <div className="w-full sm:w-64">
              <BranchSelector />
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
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-xs text-gray-500 font-medium">Open:</span>
                <span className="text-xs text-green-700 font-semibold">8:00 AM</span>
                <span className="text-xs text-gray-400">|</span>
                <span className="text-xs text-gray-500 font-medium">Close:</span>
                <span className="text-xs text-red-700 font-semibold">9:00 PM</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-sm border-gray-200/50 mt-16">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <Building2 className="mr-2 h-5 w-5 text-orange-500" />
                    <h3 className="text-sm font-semibold text-gray-800">{branchLocation}</h3>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-500">{branchPhone}</p>
                    <p className="text-xs text-gray-500">{branchEmail}</p>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="stats-card group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500 group-hover:text-orange-500 transition-colors" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">
              Rs. {branchStats?.totalSales.toLocaleString() || '0'}
            </div>
            <p className="text-xs text-gray-500 flex items-center mt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-orange-500" />
              +{branchStats?.monthlyGrowth || 0}% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="stats-card group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-gray-500 group-hover:text-orange-500 transition-colors" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">
              {branchStats?.totalOrders || 0}
            </div>
            <p className="text-xs text-gray-500 flex items-center mt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-orange-500" />
              +{branchStats?.todayOrders || 0} orders today
            </p>
          </CardContent>
        </Card>

        <Card className="stats-card group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-gray-500 group-hover:text-orange-500 transition-colors" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">
              {branchStats?.totalCustomers || 0}
            </div>
          </CardContent>
        </Card>

        <Card className="stats-card group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
            <Sparkles className="h-4 w-4 text-gray-500 group-hover:text-orange-500 transition-colors" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">
              Rs. {(branchStats?.totalSales && branchStats?.totalOrders) ? (branchStats.totalSales / branchStats.totalOrders).toFixed(2) : '0.00'}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              vs. Rs. 22.50 last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid - Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trends AreaChart */}
        <Card className="col-span-2 bg-white/60 backdrop-blur-sm border-gray-200/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-orange-500" />
              Revenue Trends - {branchLabel}
            </CardTitle>
            <CardDescription>Monthly revenue performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 165, 0, 0.1)" />
                <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `Rs.${value}`} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: '1px solid #FFD580', borderRadius: '8px', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }} />
                <Area type="monotone" dataKey="sales" stroke="url(#areaGradient)" fill="url(#areaGradient)" strokeWidth={3} />
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFA500" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#FFB347" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        {/* Top Products PieChart */}
        <Card className="col-span-1 bg-white/60 backdrop-blur-sm border-gray-200/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="mr-2 h-5 w-5" style={{ color: '#FFA500' }} />
              Top Products - {branchLabel}
            </CardTitle>
            <CardDescription>Best performing products by revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={productPerformance}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ productName, percent }) => `${productName} ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="revenue"
                >
                  {productPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: '1px solid #FFD580', borderRadius: '8px', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="bg-white/60 backdrop-blur-sm border-gray-200/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-orange-500" />
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
                <action.icon className="h-5 w-5 mr-3 text-gray-500 group-hover:text-orange-500 transition-colors" />
                <span className="font-semibold text-gray-700">{action.name}</span>
                <ArrowRight className="h-4 w-4 ml-auto text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="bg-white/60 backdrop-blur-sm border-gray-200/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-orange-500" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-orange-50/50 transition-colors">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 rounded-full mr-3">
                    <ShoppingCart className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{order.customerName}</p>
                    <p className="text-xs text-gray-500">{order.items.length} items</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">Rs.{(order.total ?? 0).toFixed(2)}</p>
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