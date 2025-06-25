export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  inStock: boolean
  stockQuantity: number
  branchId: string
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  description: string
  productCount: number
  branchId: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  totalSpent: number
  orderCount: number
  lastOrderDate: Date
  status: 'active' | 'inactive'
  branchId: string
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  id: string
  orderNumber: string
  customerId: string
  customerName: string
  branchId: string
  items: OrderItem[]
  total: number
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled'
  paymentMethod: 'cash' | 'card' | 'online'
  orderDate: Date
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  price: number
}

export interface SalesData {
  date: string
  sales: number
  orders: number
  branchId: string
}

export interface ProductPerformance {
  productId: string
  productName: string
  sales: number
  revenue: number
  orders: number
  branchId: string
}

export interface DashboardStats {
  totalSales: number
  totalOrders: number
  totalCustomers: number
  totalProducts: number
  todaySales: number
  todayOrders: number
  monthlyGrowth: number
  branchId: string
}

// New types for multi-branch system
export interface Branch {
  id: string
  name: string
  location: string
  address: string
  phone: string
  email: string
  managerId?: string
  status: 'active' | 'inactive'
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'manager' | 'staff'
  branchId?: string
  status: 'active' | 'inactive'
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface BranchStats {
  branchId: string
  branchName: string
  totalSales: number
  totalOrders: number
  totalCustomers: number
  totalProducts: number
  todaySales: number
  todayOrders: number
  monthlyGrowth: number
  lowStockItems: number
}

export interface InventoryAlert {
  id: string
  productId: string
  productName: string
  branchId: string
  currentStock: number
  lowStockThreshold: number
  alertType: 'low_stock' | 'out_of_stock'
  createdAt: Date
} 