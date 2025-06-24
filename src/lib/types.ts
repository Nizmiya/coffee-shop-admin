export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  inStock: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  description: string
  productCount: number
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  location: string
  orderCount: number
  totalSpent: number
  status: 'active' | 'inactive'
  avatar?: string
  joinedDate: Date
  lastOrder: Date
  createdAt: Date
}

export interface Order {
  id: string
  orderNumber: string
  customerId: string
  customerName: string
  items: OrderItem[]
  total: number
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled'
  paymentMethod: 'cash' | 'card' | 'online'
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  price: number
  total: number
}

export interface SalesData {
  date: string
  sales: number
  orders: number
}

export interface ProductPerformance {
  productId: string
  productName: string
  sales: number
  revenue: number
  orders: number
}

export interface DashboardStats {
  totalSales: number
  totalOrders: number
  totalCustomers: number
  totalProducts: number
  todaySales: number
  todayOrders: number
  monthlyGrowth: number
} 