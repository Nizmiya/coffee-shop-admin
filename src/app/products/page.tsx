'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Edit, Trash2, Package, Sparkles } from 'lucide-react'
import { products, categories } from '@/lib/mock-data'
import ProductForm from '@/components/forms/product-form'
import { useDashboardStore } from '@/lib/store/dashboard-store'
import { Product } from '@/lib/types'

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const { addNotification } = useDashboardStore()

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const handleAddProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    // In a real app, this would save to a database
    console.log('Adding product:', productData)
    addNotification({
      type: 'success',
      title: 'Product Added',
      message: `${productData.name} has been added successfully!`,
      duration: 3000
    })
  }

  const handleEditProduct = (product: Product) => {
    // In a real app, this would open the edit form
    console.log('Editing product:', product)
    addNotification({
      type: 'info',
      title: 'Edit Product',
      message: `Editing ${product.name}`,
      duration: 3000
    })
  }

  const handleDeleteProduct = (product: Product) => {
    // In a real app, this would delete from database
    console.log('Deleting product:', product)
    addNotification({
      type: 'success',
      title: 'Product Deleted',
      message: `${product.name} has been deleted successfully!`,
      duration: 3000
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg blur opacity-25"></div>
          <div className="relative bg-gradient-to-r from-orange-600/10 to-red-600/10 p-6 rounded-lg border border-orange-200/20">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Products
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your coffee shop products and menu items
            </p>
            <div className="absolute top-4 right-4">
              <Sparkles className="h-6 w-6 text-orange-400 animate-pulse" />
            </div>
          </div>
        </div>
        <ProductForm onSave={handleAddProduct} onCancel={() => {}} />
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
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
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
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
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
                <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  ${product.price}
                </span>
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
              ${(products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2)}
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
            {categories.map((category, index) => (
              <div key={category.id} className="flex items-center justify-between p-4 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20 hover:bg-white/70 transition-all duration-300 group">
                <div>
                  <h3 className="font-medium group-hover:text-purple-600 transition-colors">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
                <Badge variant="secondary" className="group-hover:bg-purple-100 group-hover:text-purple-700 transition-colors">
                  {category.productCount}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 