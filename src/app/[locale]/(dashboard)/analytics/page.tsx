'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Sparkles,
  Calendar,
  Target,
  Award,
  Zap,
  Building2
} from 'lucide-react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts'
import { 
  branches,
  getBranchAnalyticsData, 
  getBranchSalesData, 
  getBranchProducts, 
  getBranchCustomerMetrics,
  getDataByBranchView
} from '@/lib/mock-data'
import { useDashboardStore } from '@/lib/store/dashboard-store'
import { useEffect } from 'react'

const COLORS = ['#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b', '#ef4444']

export default function AnalyticsPage() {
  const { setBranches, setCurrentUser, selectedBranchView } = useDashboardStore()

  // Initialize store with branches and default user (admin)
  useEffect(() => {
    setBranches(branches)
    setCurrentUser({
      id: 'admin1',
      name: 'Admin User',
      email: 'admin@coffeeshop.com',
      role: 'admin',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2024-01-01'),
    })
    // eslint-disable-next-line
  }, [])

  // Get data based on selectedBranchView
  const data = getDataByBranchView(selectedBranchView)
  const analyticsData = data.analytics
  const salesData = data.salesData
  const allProducts = data.products
  const productPerformance = allProducts.slice(0, 5).map(product => ({
    productId: product.id,
    productName: product.name,
    sales: Math.floor(Math.random() * 50) + 10,
    revenue: Math.floor(Math.random() * 200) + 50,
    orders: Math.floor(Math.random() * 30) + 5,
    branchId: product.branchId
  }))
  const customerMetrics = data.customerMetrics || []

  // Branch label for heading
  const branchLabel = selectedBranchView === 'all'
    ? 'All Branches'
    : selectedBranchView === 'jaffna'
      ? 'Jaffna Branch'
      : 'Colombo Branch'

  if (!analyticsData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Analytics Data</h3>
          <p className="text-muted-foreground">No analytics data available for this branch</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-700 to-yellow-400 rounded-lg blur opacity-25"></div>
        <div className="relative bg-gradient-to-r from-orange-700/10 to-yellow-400/10 p-6 rounded-lg border border-orange-200/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-orange-700 to-yellow-400 bg-clip-text text-transparent">
                Analytics - {branchLabel}
              </h1>
              <p className="text-muted-foreground mt-2">
                Comprehensive insights and performance metrics
              </p>
            </div>
          </div>
          <div className="absolute top-4 right-4">
            <Sparkles className="h-6 w-6 text-orange-400 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="stats-card group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <div className="relative">
              <DollarSign className="h-4 w-4 text-muted-foreground group-hover:text-green-500 transition-colors" />
              <div className="absolute -inset-1 bg-green-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Rs. {analyticsData.totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              +{analyticsData.revenueGrowth}% from last month
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
              {analyticsData.totalOrders}
            </div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-blue-500" />
              +{analyticsData.orderGrowth}% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="stats-card group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <div className="relative">
              <Users className="h-4 w-4 text-muted-foreground group-hover:text-purple-500 transition-colors" />
              <div className="absolute -inset-1 bg-purple-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {analyticsData.activeCustomers}
            </div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-purple-500" />
              +{analyticsData.customerGrowth}% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="stats-card group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <div className="relative">
              <Target className="h-4 w-4 text-muted-foreground group-hover:text-orange-500 transition-colors" />
              <div className="absolute -inset-1 bg-orange-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              {analyticsData.conversionRate}%
            </div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-orange-500" />
              +{analyticsData.conversionGrowth}% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 chart-container group">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5 text-purple-500" />
                  Revenue Trends - {branchLabel}
                </CardTitle>
                <CardDescription>
                  Monthly revenue performance over time
                </CardDescription>
              </div>
              <Select defaultValue="6m">
                <SelectTrigger className="w-[120px] form-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">1 Month</SelectItem>
                  <SelectItem value="3m">3 Months</SelectItem>
                  <SelectItem value="6m">6 Months</SelectItem>
                  <SelectItem value="1y">1 Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={data.salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 165, 0, 0.1)" />
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
                  tickFormatter={(value) => `Rs.${value}`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #FFD580',
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="url(#areaGradient)" 
                  fill="url(#areaGradient)"
                  strokeWidth={3}
                />
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

        <Card className="col-span-3 chart-container group">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="mr-2 h-5 w-5" style={{ color: '#FFA500' }} />
              Top Products - {branchLabel}
            </CardTitle>
            <CardDescription>
              Best performing products by revenue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={productPerformance}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="revenue"
                >
                  {productPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #FFD580',
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Additional Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="chart-container group">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="mr-2 h-5 w-5 text-yellow-500" />
              Order Volume - {branchLabel}
            </CardTitle>
            <CardDescription>
              Daily order volume trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 165, 0, 0.1)" />
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
                  tickFormatter={(value) => `Rs.${value}`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #FFD580',
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="orders" 
                  fill="url(#barGradient)" 
                  radius={[4, 4, 0, 0]}
                />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b"/>
                    <stop offset="95%" stopColor="#ef4444"/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="chart-container group">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-blue-500" />
              Customer Metrics - {branchLabel}
            </CardTitle>
            <CardDescription>
              Customer acquisition and retention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.customerMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 165, 0, 0.1)" />
                <XAxis 
                  dataKey="month" 
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
                  tickFormatter={(value) => `Rs.${value}`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #FFD580',
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="newCustomers" 
                  stroke="#06b6d4" 
                  strokeWidth={3}
                  dot={{ fill: '#06b6d4', strokeWidth: 3, r: 6 }}
                  activeDot={{ r: 8, stroke: '#06b6d4', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="returningCustomers" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 3, r: 6 }}
                  activeDot={{ r: 8, stroke: '#10b981', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="card-gradient group">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
              Growth Metrics - {branchLabel}
            </CardTitle>
            <CardDescription>
              Key performance indicators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20">
                <div>
                  <div className="font-medium">Revenue Growth</div>
                  <div className="text-sm text-muted-foreground">Month over month</div>
                </div>
                <Badge className="badge-gradient">
                  +{analyticsData.revenueGrowth}%
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20">
                <div>
                  <div className="font-medium">Order Growth</div>
                  <div className="text-sm text-muted-foreground">Month over month</div>
                </div>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                  +{analyticsData.orderGrowth}%
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20">
                <div>
                  <div className="font-medium">Customer Growth</div>
                  <div className="text-sm text-muted-foreground">Month over month</div>
                </div>
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                  +{analyticsData.customerGrowth}%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient group">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-purple-500" />
              Time Analysis - {branchLabel}
            </CardTitle>
            <CardDescription>
              Peak hours and busy periods
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20">
                <div>
                  <div className="font-medium">Peak Hours</div>
                  <div className="text-sm text-muted-foreground">Most busy time</div>
                </div>
                <div className="text-right">
                  <div className="font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    8-10 AM
                  </div>
                  <div className="text-sm text-muted-foreground">Morning rush</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20">
                <div>
                  <div className="font-medium">Busiest Day</div>
                  <div className="text-sm text-muted-foreground">Highest orders</div>
                </div>
                <div className="text-right">
                  <div className="font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Friday
                  </div>
                  <div className="text-sm text-muted-foreground">Weekend prep</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20">
                <div>
                  <div className="font-medium">Avg Order Time</div>
                  <div className="text-sm text-muted-foreground">Preparation time</div>
                </div>
                <div className="text-right">
                  <div className="font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    4.2 min
                  </div>
                  <div className="text-sm text-muted-foreground">Fast service</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient group">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="mr-2 h-5 w-5 text-red-500" />
              Goals & Targets - {branchLabel}
            </CardTitle>
            <CardDescription>
              Monthly targets and achievements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20">
                <div>
                  <div className="font-medium">Revenue Target</div>
                  <div className="text-sm text-muted-foreground">Monthly goal</div>
                </div>
                <div className="text-right">
                  <div className="font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    85%
                  </div>
                  <div className="text-sm text-muted-foreground">On track</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20">
                <div>
                  <div className="font-medium">Customer Target</div>
                  <div className="text-sm text-muted-foreground">New customers</div>
                </div>
                <div className="text-right">
                  <div className="font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    92%
                  </div>
                  <div className="text-sm text-muted-foreground">Exceeding</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20">
                <div>
                  <div className="font-medium">Satisfaction</div>
                  <div className="text-sm text-muted-foreground">Customer rating</div>
                </div>
                <div className="text-right">
                  <div className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    4.8/5
                  </div>
                  <div className="text-sm text-muted-foreground">Excellent</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 