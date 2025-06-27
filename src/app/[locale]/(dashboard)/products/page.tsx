'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Edit, Trash2, Package, Sparkles, Plus } from 'lucide-react'
import { categories, getBranchProducts, getDataByBranchView, products as allProducts } from '@/lib/mock-data'
import ProductForm from '@/components/forms/product-form'
import { Product } from '@/lib/types'
import { useDashboardStore } from '@/lib/store/dashboard-store'
import { useProductsStore } from '@/lib/store/products-store'

export default function ProductsPage() {
  const { selectedBranchView } = useDashboardStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [categories, setCategories] = useState<string[]>([])
  const [branchId, setBranchId] = useState('jaffna')
  const showBranchSelect = selectedBranchView === 'all'
  const branches = [
    { id: 'jaffna', name: 'Jaffna Branch' },
    { id: 'colombo', name: 'Colombo Branch' }
  ]

  // Zustand products store
  const {
    productsByBranch,
    addProduct,
    updateProduct,
    deleteProduct,
    setProducts,
    getProducts,
    getAllProducts
  } = useProductsStore()

  // On first load, initialize from mock data if store is empty
  useEffect(() => {
    if (Object.keys(productsByBranch).length === 0) {
      branches.forEach(branch => {
        const branchProducts = getBranchProducts(branch.id)
        setProducts(branch.id, branchProducts)
      })
    }
    // eslint-disable-next-line
  }, [])

  // Ensure products for selected branch are always present
  useEffect(() => {
    if (selectedBranchView === 'all') {
      const all = getAllProducts()
      if (all.length === 0) {
        branches.forEach(branch => {
          const branchProducts = getBranchProducts(branch.id)
          setProducts(branch.id, branchProducts)
        })
      }
    } else if (selectedBranchView && selectedBranchView !== 'all') {
      const branchProducts = getProducts(selectedBranchView)
      if (!branchProducts || branchProducts.length === 0) {
        setProducts(selectedBranchView, getBranchProducts(selectedBranchView))
      }
    }
    // eslint-disable-next-line
  }, [selectedBranchView])

  // Get products to display based on store and selectedBranchView
  let products: Product[] = [];
  if (selectedBranchView === 'all') {
    products = getAllProducts()
  } else if (selectedBranchView && selectedBranchView !== 'all') {
    products = getProducts(selectedBranchView)
  }

  useEffect(() => {
    if (selectedBranchView && selectedBranchView !== 'all') {
      const uniqueCategories = [...new Set(getProducts(selectedBranchView).map(p => p.category))].filter(Boolean)
      setCategories(uniqueCategories)
    } else if (selectedBranchView === 'all') {
      const uniqueCategories = [...new Set(getAllProducts().map(p => p.category))].filter(Boolean)
      setCategories(uniqueCategories)
    }
  }, [selectedBranchView, productsByBranch])

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const handleAddProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const branch = showBranchSelect ? branchId : selectedBranchView
    if (!branch) return
    const newProduct: Product = {
      ...productData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date(),
      branchId: branch
    }
    addProduct(branch, newProduct)
    setFormOpen(false)
  }

  const handleEditProduct = (product: Product) => {
    setEditProduct(product)
    setFormOpen(true)
  }

  const handleUpdateProduct = (updatedData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editProduct || !editProduct.branchId) return
    const updatedProduct: Product = {
      ...editProduct,
      ...updatedData,
      updatedAt: new Date()
    }
    updateProduct(editProduct.branchId, updatedProduct)
    setEditProduct(null)
    setFormOpen(false)
  }

  const handleDeleteProduct = (product: Product) => {
    if (!product.branchId) return
    deleteProduct(product.branchId, product.id)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative">
          <div className="absolute -inset-1 rounded-lg blur opacity-25" style={{ background: 'linear-gradient(to right, #FFA500, #FF6347)' }}></div>
          <div className="relative p-6 rounded-lg border" style={{ background: 'linear-gradient(to right, #FFA50010, #FF634710)', borderColor: '#FFA50033' }}>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-orange-700 to-yellow-400 bg-clip-text text-transparent">
              Products
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your coffee shop products and menu items
            </p>
            <div className="absolute top-4 right-4">
              <Sparkles className="h-6 w-6 animate-pulse" style={{ color: '#FFA500' }} />
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <ProductForm 
            onSave={editProduct ? handleUpdateProduct : handleAddProduct} 
            onCancel={() => { setEditProduct(null); setFormOpen(false); }} 
            open={formOpen} 
            setOpen={setFormOpen} 
            initialData={editProduct || undefined}
            branchId={showBranchSelect ? branchId : selectedBranchView}
            showBranchSelect={showBranchSelect}
            branches={branches}
            onBranchChange={setBranchId}
            categories={categories}
          />
        </div>
      </div>

      {/* Filters */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="mr-2 h-5 w-5 text-blue-500" />
            Filters
          </CardTitle>
          <CardDescription>
            Search and filter products
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 form-input"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px] form-input">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="product-card group">
            <div className="aspect-square bg-muted relative overflow-hidden">
              {product.image ? (
                product.image.startsWith('/assets/') ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    priority
                  />
                ) : (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectFit: 'cover' }}
                  />
                )
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Package className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
              <Badge 
                variant={product.inStock ? "default" : "secondary"}
                className={`absolute top-2 right-2 ${product.inStock ? 'badge-gradient' : ''}`}
              >
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </Badge>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <CardHeader className="p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg group-hover:text-purple-600 transition-colors">
                    {product.name}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {product.description}
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <Badge variant="outline" className="group-hover:border-purple-300 group-hover:text-purple-600 transition-colors">
                  {product.category}
                </Badge>
                <div className="text-2xl font-bold text-green-600">
                  Rs. {product.price}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 border-purple-200 hover:border-purple-300 transition-all duration-300"
                  onClick={() => handleEditProduct(product)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 border-red-200 hover:border-red-300 transition-all duration-300"
                  onClick={() => handleDeleteProduct(product)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Product Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="stats-card group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <div className="relative">
              <Package className="h-4 w-4 text-muted-foreground group-hover:text-orange-500 transition-colors" />
              <div className="absolute -inset-1 bg-orange-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              {products.length}
            </div>
            <p className="text-xs text-muted-foreground">
              All products
            </p>
          </CardContent>
        </Card>

        <Card className="stats-card group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Stock</CardTitle>
            <div className="relative">
              <div className="h-4 w-4 rounded-full bg-green-500 group-hover:bg-green-400 transition-colors" />
              <div className="absolute -inset-1 bg-green-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {products.filter(p => p.inStock).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Available for sale
            </p>
          </CardContent>
        </Card>

        <Card className="stats-card group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <div className="relative">
              <div className="h-4 w-4 rounded-full bg-purple-500 group-hover:bg-purple-400 transition-colors" />
              <div className="absolute -inset-1 bg-purple-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {categories.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Product categories
            </p>
          </CardContent>
        </Card>

        <Card className="stats-card group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Price</CardTitle>
            <div className="relative">
              <div className="h-4 w-4 rounded-full bg-blue-500 group-hover:bg-blue-400 transition-colors" />
              <div className="absolute -inset-1 bg-blue-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {products.length > 0 ? `Rs. ${(products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2)}` : 'Rs. 0.00'}
            </div>
            <p className="text-xs text-muted-foreground">
              Per product
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Categories */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="mr-2 h-5 w-5 text-purple-500" />
            Categories
          </CardTitle>
          <CardDescription>
            Product categories and their counts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <div key={category} className="flex items-center justify-between p-4 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20 hover:bg-white/70 transition-all duration-300 group">
                <div>
                  <h3 className="font-medium group-hover:text-purple-600 transition-colors">{category}</h3>
                </div>
                <Badge variant="secondary" className="group-hover:bg-purple-100 group-hover:text-purple-700 transition-colors">
                  {products.filter(p => p.category === category).length}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 