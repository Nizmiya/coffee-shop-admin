'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Search, Users, Mail, Phone, MapPin, Star, Sparkles, TrendingUp, ShoppingBag, Calendar, Trash2 } from 'lucide-react'
import { useDashboardStore } from '@/lib/store/dashboard-store'
import { getBranchCustomers } from '@/lib/mock-data'

export default function CustomersPage() {
  const { selectedBranch } = useDashboardStore()
  const customers = selectedBranch ? getBranchCustomers(selectedBranch.id) : []
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalCustomers = customers.length
  const activeCustomers = customers.filter(c => c.status === 'active').length
  const totalSpent = customers.reduce((sum, c) => sum + c.totalSpent, 0)
  const averageSpent = totalSpent / totalCustomers

  // const handleViewCustomer = (_customer: Customer) => {
  //   // addNotification({
  //   //   type: 'info',
  //   //   title: 'View Customer',
  //   //   message: `Viewing ${customer.name}'s profile`,
  //   //   duration: 3000
  //   // })
  // }

  // const handleEditCustomer = (_customer: Customer) => {
  //   // addNotification({
  //   //   type: 'info',
  //   //   title: 'Edit Customer',
  //   //   message: `Editing ${customer.name}'s information`,
  //   //   duration: 3000
  //   // })
  // }

  // const handleDeleteCustomer = (customer: Customer) => {
  //   // addNotification({
  //   //   type: 'success',
  //   //   title: 'Customer Deleted',
  //   //   message: `${customer.name} has been removed from the system`,
  //   //   duration: 3000
  //   // })
  // }

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg blur opacity-25"></div>
        <div className="relative bg-gradient-to-r from-green-600/10 to-emerald-600/10 p-6 rounded-lg border border-green-200/20">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Customers
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your customer database and relationships
          </p>
          <div className="absolute top-4 right-4">
            <Sparkles className="h-6 w-6 text-green-400 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="stats-card group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <div className="relative">
              <Users className="h-4 w-4 text-muted-foreground group-hover:text-green-500 transition-colors" />
              <div className="absolute -inset-1 bg-green-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {totalCustomers}
            </div>
            <p className="text-xs text-muted-foreground">
              Registered customers
            </p>
          </CardContent>
        </Card>

        <Card className="stats-card group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <div className="relative">
              <div className="h-4 w-4 rounded-full bg-blue-500 group-hover:bg-blue-400 transition-colors" />
              <div className="absolute -inset-1 bg-blue-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {activeCustomers}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently active
            </p>
          </CardContent>
        </Card>

        <Card className="stats-card group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <div className="relative">
              <div className="h-4 w-4 rounded-full bg-purple-500 group-hover:bg-purple-400 transition-colors" />
              <div className="absolute -inset-1 bg-purple-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ${totalSpent.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              From all customers
            </p>
          </CardContent>
        </Card>

        <Card className="stats-card group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Spent</CardTitle>
            <div className="relative">
              <div className="h-4 w-4 rounded-full bg-orange-500 group-hover:bg-orange-400 transition-colors" />
              <div className="absolute -inset-1 bg-orange-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              ${averageSpent.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Per customer
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="mr-2 h-5 w-5 text-blue-500" />
            Search Customers
          </CardTitle>
          <CardDescription>
            Find customers by name or email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 form-input"
            />
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5 text-green-500" />
            Customer Database
          </CardTitle>
          <CardDescription>
            {filteredCustomers.length} customers found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-white/20 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-white/10 backdrop-blur-sm">
                  <TableHead className="text-white font-medium">Customer</TableHead>
                  <TableHead className="text-white font-medium">Contact</TableHead>
                  <TableHead className="text-white font-medium">Location</TableHead>
                  <TableHead className="text-white font-medium">Orders</TableHead>
                  <TableHead className="text-white font-medium">Total Spent</TableHead>
                  <TableHead className="text-white font-medium">Status</TableHead>
                  <TableHead className="text-white font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id} className="table-row hover:bg-white/5 transition-all duration-300">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10 ring-2 ring-purple-200 hover:ring-purple-300 transition-all duration-300">
                          <AvatarImage src={customer.avatar} alt={customer.name} />
                          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                            {customer.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            {customer.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Joined {new Date(customer.joinedDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="mr-2 h-3 w-3 text-blue-500" />
                          {customer.email}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Phone className="mr-2 h-3 w-3 text-green-500" />
                          {customer.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-2 h-3 w-3 text-red-500" />
                        {customer.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <ShoppingBag className="mr-2 h-4 w-4 text-purple-500" />
                        <span className="font-medium">{customer.orderCount}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        ${customer.totalSpent}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={customer.status === 'active' ? 'default' : 'secondary'}
                        className={customer.status === 'active' ? 'badge-gradient' : ''}
                      >
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 border-blue-200 hover:border-blue-300 transition-all duration-300"
                        >
                          <Users className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 border-purple-200 hover:border-purple-300 transition-all duration-300"
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 border-red-200 hover:border-red-300 transition-all duration-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Customer Insights */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="card-gradient group">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="mr-2 h-5 w-5 text-yellow-500" />
              Top Customers
            </CardTitle>
            <CardDescription>
              Highest spending customers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customers
                .sort((a, b) => b.totalSpent - a.totalSpent)
                .slice(0, 3)
                .map((customer, index) => (
                  <div key={customer.id} className="flex items-center justify-between p-3 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20 hover:bg-white/70 transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium group-hover:text-purple-600 transition-colors">
                          {customer.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {customer.orderCount} orders
                        </div>
                      </div>
                    </div>
                    <div className="font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      ${customer.totalSpent}
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient group">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest customer interactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customers.slice(0, 3).map((customer) => (
                <div key={customer.id} className="flex items-center space-x-3 p-3 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20 hover:bg-white/70 transition-all duration-300">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={customer.avatar} alt={customer.name} />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xs">
                      {customer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium group-hover:text-purple-600 transition-colors">
                      {customer.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Placed an order
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 inline mr-1" />
                    2h ago
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient group">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-blue-500" />
              Customer Growth
            </CardTitle>
            <CardDescription>
              Monthly customer acquisition
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20">
                <div>
                  <div className="font-medium">This Month</div>
                  <div className="text-sm text-muted-foreground">New customers</div>
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  +12
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20">
                <div>
                  <div className="font-medium">Last Month</div>
                  <div className="text-sm text-muted-foreground">New customers</div>
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  +8
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20">
                <div>
                  <div className="font-medium">Growth Rate</div>
                  <div className="text-sm text-muted-foreground">Month over month</div>
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  +50%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 