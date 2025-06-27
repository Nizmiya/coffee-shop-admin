import { Product, Category, Customer, Order, SalesData, ProductPerformance, Branch, User, BranchStats, InventoryAlert } from './types'

// Branches
export const branches: Branch[] = [
  {
    id: 'jaffna',
    name: 'Jaffna Branch',
    location: 'Jaffna',
    address: '123 Temple Road, Jaffna, Sri Lanka',
    phone: '+94-21-1234567',
    email: 'jaffna@coffeeshop.com',
    managerId: 'manager1',
    status: 'active',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'colombo',
    name: 'Colombo Branch',
    location: 'Colombo',
    address: '456 Galle Road, Colombo, Sri Lanka',
    phone: '+94-11-9876543',
    email: 'colombo@coffeeshop.com',
    managerId: 'manager2',
    status: 'active',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
]

// Users
export const users: User[] = [
  {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@coffeeshop.com',
    role: 'admin',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'manager1',
    name: 'Jaffna Manager',
    email: 'jaffna.manager@coffeeshop.com',
    role: 'manager',
    branchId: 'jaffna',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'manager2',
    name: 'Colombo Manager',
    email: 'colombo.manager@coffeeshop.com',
    role: 'manager',
    branchId: 'colombo',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'staff-j1',
    name: 'Nimal Perera',
    role: 'staff',
    branchId: 'jaffna',
    email: 'nimal.jaffna@coffeeshop.lk',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    status: 'active',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'staff-j2',
    name: 'Kumari Sivapalan',
    role: 'manager',
    branchId: 'jaffna',
    email: 'kumari.jaffna@coffeeshop.lk',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    status: 'active',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'staff-c1',
    name: 'Ruwan Fernando',
    role: 'staff',
    branchId: 'colombo',
    email: 'ruwan.colombo@coffeeshop.lk',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    status: 'active',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'staff-c2',
    name: 'Dilani Jayasuriya',
    role: 'manager',
    branchId: 'colombo',
    email: 'dilani.colombo@coffeeshop.lk',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    status: 'active',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
]

// Categories with branchId
export const categories: Category[] = [
  { id: '1', name: 'Hot Drinks', description: 'Hot coffee and tea beverages', productCount: 8, branchId: 'jaffna' },
  { id: '2', name: 'Cold Beverages', description: 'Iced drinks and smoothies', productCount: 6, branchId: 'jaffna' },
  { id: '3', name: 'Pastries', description: 'Fresh baked goods', productCount: 5, branchId: 'jaffna' },
  { id: '4', name: 'Snacks', description: 'Light snacks and treats', productCount: 4, branchId: 'jaffna' },
  { id: '5', name: 'Hot Drinks', description: 'Hot coffee and tea beverages', productCount: 8, branchId: 'colombo' },
  { id: '6', name: 'Cold Beverages', description: 'Iced drinks and smoothies', productCount: 6, branchId: 'colombo' },
  { id: '7', name: 'Pastries', description: 'Fresh baked goods', productCount: 5, branchId: 'colombo' },
  { id: '8', name: 'Snacks', description: 'Light snacks and treats', productCount: 4, branchId: 'colombo' },
]

// Products with branchId and stockQuantity
export const products: Product[] = [
  // Jaffna Branch Products
  {
    id: '1',
    name: 'Espresso',
    description: 'Single shot of premium espresso with rich, bold flavor',
    price: 120,
    category: 'Hot Drinks',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400',
    inStock: true,
    stockQuantity: 50,
    branchId: 'jaffna',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Cappuccino',
    description: 'Espresso with steamed milk and velvety foam',
    price: 150,
    category: 'Hot Drinks',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
    inStock: true,
    stockQuantity: 45,
    branchId: 'jaffna',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '3',
    name: 'Latte',
    description: 'Smooth espresso with steamed milk and a light layer of foam',
    price: 140,
    category: 'Hot Drinks',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400',
    inStock: true,
    stockQuantity: 40,
    branchId: 'jaffna',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '4',
    name: 'Mocha',
    description: 'Espresso, chocolate, and steamed milk.',
    price: 160,
    category: 'Hot Drinks',
    image: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?w=400',
    inStock: true,
    stockQuantity: 18,
    branchId: 'jaffna',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '5',
    name: 'Iced Coffee',
    description: 'Chilled coffee served over ice with optional cream',
    price: 130,
    category: 'Cold Beverages',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400',
    inStock: true,
    stockQuantity: 35,
    branchId: 'jaffna',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '6',
    name: 'Blueberry Muffin',
    description: 'Freshly baked muffin with blueberries.',
    price: 80,
    category: 'Bakery',
    image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=400',
    inStock: true,
    stockQuantity: 12,
    branchId: 'jaffna',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '7',
    name: 'Chocolate Croissant',
    description: 'Flaky croissant with chocolate filling.',
    price: 90,
    category: 'Bakery',
    image: 'https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?w=400',
    inStock: true,
    stockQuantity: 10,
    branchId: 'jaffna',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '8',
    name: 'Green Tea',
    description: 'Refreshing and healthy green tea.',
    price: 60,
    category: 'Tea',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400',
    inStock: true,
    stockQuantity: 15,
    branchId: 'jaffna',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '9',
    name: 'Carrot Cake',
    description: 'Moist carrot cake with cream cheese frosting.',
    price: 100,
    category: 'Bakery',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400',
    inStock: true,
    stockQuantity: 8,
    branchId: 'jaffna',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '10',
    name: 'Bagel',
    description: 'Freshly baked bagel, perfect for breakfast.',
    price: 70,
    category: 'Bakery',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400',
    inStock: true,
    stockQuantity: 14,
    branchId: 'jaffna',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '11',
    name: 'Smoothie',
    description: 'Fruit smoothie, healthy and refreshing.',
    price: 50,
    category: 'Cold Drinks',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400',
    inStock: true,
    stockQuantity: 16,
    branchId: 'jaffna',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '12',
    name: 'Hot Chocolate',
    description: 'Rich and creamy hot chocolate.',
    price: 65,
    category: 'Hot Drinks',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400',
    inStock: true,
    stockQuantity: 11,
    branchId: 'jaffna',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '13',
    name: 'Donut',
    description: 'Classic glazed donut, sweet and soft.',
    price: 70,
    category: 'Bakery',
    image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=400',
    inStock: true,
    stockQuantity: 20,
    branchId: 'jaffna',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Colombo Branch Products
  {
    id: '14',
    name: 'Espresso',
    description: 'Single shot of premium espresso with rich, bold flavor',
    price: 150,
    category: 'Hot Drinks',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400',
    inStock: true,
    stockQuantity: 60,
    branchId: 'colombo',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '15',
    name: 'Cappuccino',
    description: 'Espresso with steamed milk and velvety foam',
    price: 160,
    category: 'Hot Drinks',
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400',
    inStock: true,
    stockQuantity: 55,
    branchId: 'colombo',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '16',
    name: 'Latte',
    description: 'Smooth espresso with steamed milk and a light layer of foam',
    price: 180,
    category: 'Hot Drinks',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400',
    inStock: true,
    stockQuantity: 50,
    branchId: 'colombo',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '17',
    name: 'Mocha',
    description: 'Espresso, chocolate, and steamed milk.',
    price: 200,
    category: 'Hot Drinks',
    image: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?w=400',
    inStock: true,
    stockQuantity: 18,
    branchId: 'colombo',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '18',
    name: 'Iced Coffee',
    description: 'Chilled coffee served over ice with optional cream',
    price: 250,
    category: 'Cold Beverages',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400',
    inStock: true,
    stockQuantity: 45,
    branchId: 'colombo',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '19',
    name: 'Blueberry Muffin',
    description: 'Freshly baked muffin with blueberries.',
    price: 300,
    category: 'Bakery',
    image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=400',
    inStock: true,
    stockQuantity: 12,
    branchId: 'colombo',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '20',
    name: 'Chocolate Croissant',
    description: 'Flaky croissant with chocolate filling.',
    price: 90,
    category: 'Bakery',
    image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=400',
    inStock: true,
    stockQuantity: 10,
    branchId: 'colombo',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '21',
    name: 'Green Tea',
    description: 'Refreshing and healthy green tea.',
    price: 165,
    category: 'Tea',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400',
    inStock: true,
    stockQuantity: 15,
    branchId: 'colombo',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '22',
    name: 'Carrot Cake',
    description: 'Moist carrot cake with cream cheese frosting.',
    price: 155,
    category: 'Bakery',
    image: 'https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?w=400',
    inStock: true,
    stockQuantity: 8,
    branchId: 'colombo',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '23',
    name: 'Bagel',
    description: 'Freshly baked bagel, perfect for breakfast.',
    price: 90,
    category: 'Bakery',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400',
    inStock: true,
    stockQuantity: 14,
    branchId: 'colombo',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '24',
    name: 'Smoothie',
    description: 'Fruit smoothie, healthy and refreshing.',
    price: 140,
    category: 'Cold Drinks',
    image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=400',
    inStock: true,
    stockQuantity: 16,
    branchId: 'colombo',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '25',
    name: 'Hot Chocolate',
    description: 'Rich and creamy hot chocolate.',
    price: 135,
    category: 'Hot Drinks',
    image: 'https://images.unsplash.com/photo-1515442261605-cd4ce40f1d89?w=400',
    inStock: true,
    stockQuantity: 11,
    branchId: 'colombo',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '26',
    name: 'Donut',
    description: 'Classic glazed donut, sweet and soft.',
    price: 120,
    category: 'Bakery',
    image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=400',
    inStock: true,
    stockQuantity: 20,
    branchId: 'colombo',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

// Customers with branchId
export const customers: Customer[] = [
  // Jaffna Branch Customers
  {
    id: '1',
    name: 'Aarav Kumar',
    email: 'aarav.kumar@example.com',
    phone: '077-1234567',
    address: '12 Kandy Road, Jaffna',
    totalSpent: 1575,
    orderCount: 5,
    lastOrderDate: new Date('2024-07-10'),
    status: 'active',
    branchId: 'jaffna',
    createdAt: new Date('2023-02-20'),
    updatedAt: new Date('2024-07-10'),
  },
  {
    id: '2',
    name: 'Meena Devi',
    email: 'meena.devi@example.com',
    phone: '076-2345678',
    address: '25 Hospital St, Jaffna',
    totalSpent: 2250,
    orderCount: 8,
    lastOrderDate: new Date('2024-07-12'),
    status: 'active',
    branchId: 'jaffna',
    createdAt: new Date('2023-03-15'),
    updatedAt: new Date('2024-07-12'),
  },
  {
    id: '3',
    name: 'Ravi Selvam',
    email: 'ravi.selvam@example.com',
    phone: '071-3456789',
    address: '8 Point Pedro Rd, Jaffna',
    totalSpent: 800,
    orderCount: 3,
    lastOrderDate: new Date('2024-06-25'),
    status: 'active',
    branchId: 'jaffna',
    createdAt: new Date('2023-04-10'),
    updatedAt: new Date('2024-06-25'),
  },

  // Colombo Branch Customers
  {
    id: '4',
    name: 'Anusha Silva',
    email: 'anusha.silva@example.com',
    phone: '077-9876543',
    address: '78 Galle Road, Colombo 03',
    totalSpent: 3500,
    orderCount: 12,
    lastOrderDate: new Date('2024-07-15'),
    status: 'active',
    branchId: 'colombo',
    createdAt: new Date('2023-01-25'),
    updatedAt: new Date('2024-07-15'),
  },
  {
    id: '5',
    name: 'Dinesh Perera',
    email: 'dinesh.perera@example.com',
    phone: '071-8765432',
    address: '120 Havelock Road, Colombo 05',
    totalSpent: 4500,
    orderCount: 15,
    lastOrderDate: new Date('2024-07-14'),
    status: 'active',
    branchId: 'colombo',
    createdAt: new Date('2023-02-18'),
    updatedAt: new Date('2024-07-14'),
  },
  {
    id: '6',
    name: 'Fathima Rizwan',
    email: 'fathima.rizwan@example.com',
    phone: '076-7654321',
    address: '45 Marine Drive, Colombo 06',
    totalSpent: 1200,
    orderCount: 4,
    lastOrderDate: new Date('2024-07-05'),
    status: 'active',
    branchId: 'colombo',
    createdAt: new Date('2023-03-22'),
    updatedAt: new Date('2024-07-05'),
  },
]

// Orders with branchId
export const orders: Order[] = [
  // Jaffna Branch Orders
  {
    id: '101',
    orderNumber: 'ORD-J001',
    customerName: 'Aarav Kumar',
    customerId: '1',
    items: [
      { productId: '1', productName: 'Espresso', quantity: 2, price: 3.50 },
      { productId: '5', productName: 'Croissant', quantity: 1, price: 3.25 },
    ],
    total: 1025,
    status: 'completed',
    orderDate: new Date('2024-07-10T10:30:00Z'),
    branchId: 'jaffna',
    paymentMethod: 'card',
    createdAt: new Date('2024-07-10T10:30:00Z'),
    updatedAt: new Date('2024-07-10T10:30:00Z'),
  },
  {
    id: '102',
    orderNumber: 'ORD-J002',
    customerName: 'Meena Devi',
    customerId: '2',
    items: [
      { productId: '2', productName: 'Cappuccino', quantity: 1, price: 4.50 },
    ],
    total: 4500,
    status: 'completed',
    orderDate: new Date('2024-07-12T11:00:00Z'),
    branchId: 'jaffna',
    paymentMethod: 'cash',
    createdAt: new Date('2024-07-12T11:00:00Z'),
    updatedAt: new Date('2024-07-12T11:00:00Z'),
  },

  // Colombo Branch Orders
  {
    id: '201',
    orderNumber: 'ORD-C001',
    customerName: 'Anusha Silva',
    customerId: '4',
    items: [
      { productId: '7', productName: 'Cappuccino', quantity: 2, price: 4.50 },
      { productId: '10', productName: 'Croissant', quantity: 2, price: 3.25 },
    ],
    total: 1550,
    status: 'completed',
    orderDate: new Date('2024-07-15T09:00:00Z'),
    branchId: 'colombo',
    paymentMethod: 'card',
    createdAt: new Date('2024-07-15T09:00:00Z'),
    updatedAt: new Date('2024-07-15T09:00:00Z'),
  },
  {
    id: '202',
    orderNumber: 'ORD-C002',
    customerName: 'Dinesh Perera',
    customerId: '5',
    items: [
      { productId: '8', productName: 'Latte', quantity: 1, price: 4.75 },
    ],
    total: 4750,
    status: 'pending',
    orderDate: new Date('2024-07-16T14:00:00Z'),
    branchId: 'colombo',
    paymentMethod: 'online',
    createdAt: new Date('2024-07-16T14:00:00Z'),
    updatedAt: new Date('2024-07-16T14:00:00Z'),
  },
]

// Branch-specific dashboard stats
export const branchStats: BranchStats[] = [
  {
    branchId: 'jaffna',
    branchName: 'Jaffna Branch',
    totalSales: 154200,
    totalOrders: 1250,
    totalCustomers: 450,
    totalProducts: 15,
    todaySales: 24500,
    todayOrders: 18,
    monthlyGrowth: 12.5,
    lowStockItems: 3,
  },
  {
    branchId: 'colombo',
    branchName: 'Colombo Branch',
    totalSales: 189500,
    totalOrders: 1580,
    totalCustomers: 520,
    totalProducts: 15,
    todaySales: 320.50,
    todayOrders: 25,
    monthlyGrowth: 15.2,
    lowStockItems: 2,
  },
]

// Sales data with branchId
export const salesData: SalesData[] = [
  { date: '2024-07-01', sales: 450, orders: 15, branchId: 'jaffna' },
  { date: '2024-07-02', sales: 520, orders: 18, branchId: 'jaffna' },
  { date: '2024-07-03', sales: 480, orders: 16, branchId: 'jaffna' },
  { date: '2024-07-01', sales: 850, orders: 25, branchId: 'colombo' },
  { date: '2024-07-02', sales: 920, orders: 28, branchId: 'colombo' },
  { date: '2024-07-03', sales: 880, orders: 26, branchId: 'colombo' },
]

// Product performance with branchId
export const productPerformance: ProductPerformance[] = [
  { productId: '1', productName: 'Espresso', sales: 120, revenue: 420.00, orders: 50, branchId: 'jaffna' },
  { productId: '2', productName: 'Cappuccino', sales: 95, revenue: 427.50, orders: 40, branchId: 'jaffna' },
  { productId: '6', productName: 'Espresso', sales: 150, revenue: 525.00, orders: 60, branchId: 'colombo' },
  { productId: '7', productName: 'Cappuccino', sales: 110, revenue: 495.00, orders: 50, branchId: 'colombo' },
]

// Inventory alerts
export const inventoryAlerts: InventoryAlert[] = [
  { id: 'alert1', productId: '3', productName: 'Latte', currentStock: 40, lowStockThreshold: 20, branchId: 'jaffna', alertType: 'low_stock', createdAt: new Date() },
  { id: 'alert2', productId: '5', productName: 'Croissant', currentStock: 25, lowStockThreshold: 15, branchId: 'jaffna', alertType: 'low_stock', createdAt: new Date() },
  { id: 'alert3', productId: '8', productName: 'Latte', currentStock: 50, lowStockThreshold: 25, branchId: 'colombo', alertType: 'low_stock', createdAt: new Date() },
]

// Helper functions
export const getBranchStats = (branchId: string): BranchStats | null => {
  if (!branchId) return null
  
  // Return specific branch stats
  const branchStat = branchStats.find(stat => stat.branchId === branchId)
  if (branchStat) return branchStat
  
  // Fallback for unknown branches
  return {
    branchId: branchId,
    branchName: branches.find(b => b.id === branchId)?.name || 'Unknown',
    totalSales: 5235000,
    totalOrders: 1250,
    totalCustomers: 375,
    totalProducts: getBranchProducts(branchId).length,
    todaySales: 25550,
    todayOrders: 15,
    monthlyGrowth: 7.5,
    lowStockItems: getBranchInventoryAlerts(branchId).length
  }
}

// New function to get combined stats for all branches
export const getAllBranchStats = (): BranchStats => {
  const jaffnaStats = getBranchStats('jaffna')
  const colomboStats = getBranchStats('colombo')
  
  if (!jaffnaStats || !colomboStats) {
    return {
      branchId: 'all',
      branchName: 'All Branches',
      totalSales: 0,
      totalOrders: 0,
      totalCustomers: 0,
      totalProducts: 0,
      todaySales: 0,
      todayOrders: 0,
      monthlyGrowth: 0,
      lowStockItems: 0,
    }
  }
  
  return {
    branchId: 'all',
    branchName: 'All Branches',
    totalSales: jaffnaStats.totalSales + colomboStats.totalSales,
    totalOrders: jaffnaStats.totalOrders + colomboStats.totalOrders,
    totalCustomers: jaffnaStats.totalCustomers + colomboStats.totalCustomers,
    totalProducts: jaffnaStats.totalProducts + colomboStats.totalProducts,
    todaySales: jaffnaStats.todaySales + colomboStats.todaySales,
    todayOrders: jaffnaStats.todayOrders + colomboStats.todayOrders,
    monthlyGrowth: ((jaffnaStats.monthlyGrowth + colomboStats.monthlyGrowth) / 2),
    lowStockItems: jaffnaStats.lowStockItems + colomboStats.lowStockItems,
  }
}

// New function to get combined analytics data for all branches
export const getAllBranchAnalyticsData = () => {
  const jaffnaData = getBranchAnalyticsData('jaffna')
  const colomboData = getBranchAnalyticsData('colombo')
  
  if (!jaffnaData || !colomboData) {
    return {
      totalRevenue: 0,
      totalOrders: 0,
      activeCustomers: 0,
      conversionRate: 0,
      revenueGrowth: 0,
      orderGrowth: 0,
      customerGrowth: 0,
      conversionGrowth: 0,
    }
  }
  
  return {
    totalRevenue: jaffnaData.totalRevenue + colomboData.totalRevenue,
    totalOrders: jaffnaData.totalOrders + colomboData.totalOrders,
    activeCustomers: jaffnaData.activeCustomers + colomboData.activeCustomers,
    conversionRate: (jaffnaData.conversionRate + colomboData.conversionRate) / 2,
    revenueGrowth: (jaffnaData.revenueGrowth + colomboData.revenueGrowth) / 2,
    orderGrowth: (jaffnaData.orderGrowth + colomboData.orderGrowth) / 2,
    customerGrowth: (jaffnaData.customerGrowth + colomboData.customerGrowth) / 2,
    conversionGrowth: (jaffnaData.conversionGrowth + colomboData.conversionGrowth) / 2,
  }
}

// Updated function to get data based on branch view
export const getDataByBranchView = (branchView: string) => {
  if (branchView === 'all') {
    return {
      stats: getAllBranchStats(),
      analytics: getAllBranchAnalyticsData(),
      salesData: getBranchSalesData('all'),
      products: [...getBranchProducts('jaffna'), ...getBranchProducts('colombo')],
      orders: [...getBranchOrders('jaffna'), ...getBranchOrders('colombo')],
      customers: [...getBranchCustomers('jaffna'), ...getBranchCustomers('colombo')],
      inventoryAlerts: [...getBranchInventoryAlerts('jaffna'), ...getBranchInventoryAlerts('colombo')],
    }
  }

  if (branchView === 'jaffna' || branchView === 'colombo') {
    return {
      stats: getBranchStats(branchView),
      analytics: getBranchAnalyticsData(branchView),
      salesData: getBranchSalesData(branchView),
      products: getBranchProducts(branchView),
      orders: getBranchOrders(branchView),
      customers: getBranchCustomers(branchView),
      inventoryAlerts: getBranchInventoryAlerts(branchView),
    }
  }

  // Default for new/unrecognized branches
  return {
    stats: {
      totalSales: 0,
      totalOrders: 0,
      totalCustomers: 0,
      monthlyGrowth: 0,
      todayOrders: 0,
    },
    salesData: [],
    products: [],
    orders: [],
    customers: [],
    inventoryAlerts: [],
  }
}

export const getBranchSalesData = (branchId: string): SalesData[] => {
  if (branchId === 'all') {
    return salesData
  }
  return salesData.filter(data => data.branchId === branchId)
}

export const getBranchProducts = (branchId: string): Product[] => {
  return products.filter(product => product.branchId === branchId)
}

export const getBranchOrders = (branchId: string): Order[] => {
  return orders.filter(order => order.branchId === branchId)
}

export const getBranchCustomers = (branchId: string): Customer[] => {
  return customers.filter(customer => customer.branchId === branchId)
}

export const getBranchInventoryAlerts = (branchId: string): InventoryAlert[] => {
  return inventoryAlerts.filter(alert => alert.branchId === branchId)
}

// Analytics data for the analytics page
export const getBranchAnalyticsData = (branchId: string) => {
  const stats = getBranchStats(branchId)
  if (!stats) return null
  
  return {
    totalRevenue: stats.totalSales,
    totalOrders: stats.totalOrders,
    activeCustomers: stats.totalCustomers,
    conversionRate: 4.8,
    revenueGrowth: stats.monthlyGrowth,
    orderGrowth: Math.floor(Math.random() * 10) + 5,
    customerGrowth: Math.floor(Math.random() * 15) + 8,
    conversionGrowth: Math.floor(Math.random() * 5) + 1,
  }
}

// Customer metrics for charts
export const getBranchCustomerMetrics = () => {
  return [
    { month: 'Jan', newCustomers: Math.floor(Math.random() * 20) + 10, returningCustomers: Math.floor(Math.random() * 80) + 60 },
    { month: 'Feb', newCustomers: Math.floor(Math.random() * 20) + 15, returningCustomers: Math.floor(Math.random() * 80) + 70 },
    { month: 'Mar', newCustomers: Math.floor(Math.random() * 20) + 12, returningCustomers: Math.floor(Math.random() * 80) + 75 },
    { month: 'Apr', newCustomers: Math.floor(Math.random() * 20) + 18, returningCustomers: Math.floor(Math.random() * 80) + 80 },
    { month: 'May', newCustomers: Math.floor(Math.random() * 20) + 14, returningCustomers: Math.floor(Math.random() * 80) + 85 },
    { month: 'Jun', newCustomers: Math.floor(Math.random() * 20) + 20, returningCustomers: Math.floor(Math.random() * 80) + 90 },
  ]
}

// Legacy exports for backward compatibility (will be removed in future)
export const analyticsData = getBranchAnalyticsData('jaffna') || {
  totalRevenue: 12580.50,
  totalOrders: 351,
  activeCustomers: 156,
  conversionRate: 4.8,
  revenueGrowth: 12.5,
  orderGrowth: 8.2,
  customerGrowth: 15.3,
  conversionGrowth: 2.1,
}

export const customerMetrics = getBranchCustomerMetrics() 