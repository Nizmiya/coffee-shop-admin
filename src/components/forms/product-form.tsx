'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Upload, Coffee, Sparkles } from 'lucide-react'
import { categories } from '@/lib/mock-data'
import { Product } from '@/lib/types'

interface ProductFormProps {
  onSave: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void
  onCancel: () => void
}

export default function ProductForm({ onSave, onCancel }: ProductFormProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    inStock: true
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
      price: parseFloat(formData.price)
    })
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      image: '',
      inStock: true
    })
    setOpen(false)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, image: e.target?.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="btn-gradient hover:shadow-lg transition-all duration-300">
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl border border-white/30">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            <Coffee className="mr-2 h-6 w-6 text-purple-500" />
            Add New Product
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Create a new product for your coffee shop menu
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Product Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Espresso Shot"
                className="form-input"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price" className="text-sm font-medium">
                Price ($)
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                placeholder="0.00"
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your product..."
              className="form-input min-h-[100px] resize-none"
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium">
                Category
              </Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger className="form-input">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Stock Status</Label>
              <div className="flex items-center space-x-2 p-3 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20">
                <Switch
                  id="inStock"
                  checked={formData.inStock}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, inStock: checked }))}
                />
                <Label htmlFor="inStock" className="text-sm">
                  {formData.inStock ? 'In Stock' : 'Out of Stock'}
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Product Image</Label>
            <div className="relative">
              {formData.image ? (
                <div className="relative aspect-video bg-muted rounded-lg overflow-hidden border-2 border-dashed border-purple-200 hover:border-purple-300 transition-colors">
                  <img 
                    src={formData.image} 
                    alt="Product preview" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm hover:bg-white transition-colors"
                    onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border-2 border-dashed border-purple-200 hover:border-purple-300 transition-colors flex items-center justify-center">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-purple-400 mb-4" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              )}
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 border-gray-200 hover:border-gray-300 transition-all duration-300"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="btn-gradient hover:shadow-lg transition-all duration-300"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Create Product
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 