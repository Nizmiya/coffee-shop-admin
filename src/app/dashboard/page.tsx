'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package,
  Coffee,
  BarChart3,
  Sparkles
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { dashboardStats, salesData, productPerformance } from '@/lib/mock-data'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25"></div>
        <div className="relative bg-gradient-to-r from-purple-600/10 to-pink-600/10 p-6 rounded-lg border border-purple-200/20">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Welcome to your coffee shop admin dashboard
          </p>
          <div className="absolute top-4 right-4">
            <Sparkles className="h-6 w-6 text-purple-400 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="stats-card group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <div className="relative">
              <DollarSign className="h-4 w-4 text-muted-foreground group-hover:text-green-500 transition-colors" />
              <div className="absolute -inset-1 bg-green-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              ${dashboardStats.totalSales.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              +{dashboardStats.monthlyGrowth}% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="stats-card group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <div className="relative">
              <ShoppingCart className="h-4 w-4 text-muted-foreground group-hover:text-blue-500 transition-colors" />
              <div className="absolute -inset-1 bg-blue-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {dashboardStats.totalOrders}
            </div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-blue-500" />
              +{dashboardStats.todayOrders} today
            </p>
          </CardContent>
        </Card>

        <Card className="stats-card group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <div className="relative">
              <Users className="h-4 w-4 text-muted-foreground group-hover:text-purple-500 transition-colors" />
              <div className="absolute -inset-1 bg-purple-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {dashboardStats.totalCustomers}
            </div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-purple-500" />
              Active customers
            </p>
          </CardContent>
        </Card>

        <Card className="stats-card group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <div className="relative">
              <Package className="h-4 w-4 text-muted-foreground group-hover:text-orange-500 transition-colors" />
              <div className="absolute -inset-1 bg-orange-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              {dashboardStats.totalProducts}
            </div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-orange-500" />
              Available products
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 chart-container group">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-purple-500" />
              Sales Overview
            </CardTitle>
            <CardDescription>
              Daily sales performance over the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.1)" />
                <XAxis 
                  dataKey="date" 
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="url(#gradient)" 
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', strokeWidth: 3, r: 6 }}
                  activeDot={{ r: 8, stroke: '#8b5cf6', strokeWidth: 2 }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0.3}/>
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3 chart-container group">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Coffee className="mr-2 h-5 w-5 text-orange-500" />
              Top Products
            </CardTitle>
            <CardDescription>
              Best performing products by revenue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={productPerformance.slice(0, 5)}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.1)" />
                <XAxis 
                  dataKey="productName" 
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="revenue" 
                  fill="url(#barGradient)" 
                  radius={[4, 4, 0, 0]}
                />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6"/>
                    <stop offset="95%" stopColor="#ec4899"/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card className="card-gradient group">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingCart className="mr-2 h-5 w-5 text-blue-500" />
              Recent Orders
            </CardTitle>
            <CardDescription>
              Latest customer orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: '1', customer: 'John Doe', amount: 6.75, status: 'completed' },
                { id: '2', customer: 'Jane Smith', amount: 4.50, status: 'in-progress' },
                { id: '3', customer: 'Mike Johnson', amount: 14.50, status: 'pending' },
              ].map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20 hover:bg-white/70 transition-all duration-300">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Order #{order.id}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order.customer}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={order.status === 'completed' ? 'default' : order.status === 'in-progress' ? 'secondary' : 'outline'}
                      className={order.status === 'completed' ? 'badge-gradient' : ''}
                    >
                      {order.status}
                    </Badge>
                    <span className="text-sm font-medium bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      ${order.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient group">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-purple-500" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Common admin tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <Button 
                variant="outline" 
                className="justify-start hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 border-purple-200 hover:border-purple-300 transition-all duration-300"
              >
                <Coffee className="mr-2 h-4 w-4" />
                Add New Product
              </Button>
              <Button 
                variant="outline" 
                className="justify-start hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 border-blue-200 hover:border-blue-300 transition-all duration-300"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                View Orders
              </Button>
              <Button 
                variant="outline" 
                className="justify-start hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 border-green-200 hover:border-green-300 transition-all duration-300"
              >
                <Users className="mr-2 h-4 w-4" />
                Manage Customers
              </Button>
              <Button 
                variant="outline" 
                className="justify-start hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 border-orange-200 hover:border-orange-300 transition-all duration-300"
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 