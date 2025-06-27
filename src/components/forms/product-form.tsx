'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Upload, Coffee, Sparkles, Package, UploadCloud } from 'lucide-react'
import { categories as mockCategories } from '@/lib/mock-data'
import { Product } from '@/lib/types'
import { BranchSelector } from '@/components/ui/branch-selector'

interface ProductFormProps {
  onSave: (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void
  onCancel: () => void
  open: boolean
  setOpen: (open: boolean) => void
  initialData?: Product
  branchId?: string
  categories: string[]
  showBranchSelect?: boolean
  branches?: { id: string; name: string }[]
  onBranchChange?: (branchId: string) => void
}

export default function ProductForm({ onSave, onCancel, open, setOpen, initialData, branchId, categories, showBranchSelect = false, branches = [], onBranchChange }: ProductFormProps) {
  const isEdit = !!initialData
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    price: initialData?.price?.toString() || '',
    category: initialData?.category || '',
    image: initialData?.image || '',
    inStock: initialData?.inStock ?? true,
    stockQuantity: initialData?.stockQuantity ?? 0,
    branchId: branchId || initialData?.branchId || (showBranchSelect && branches.length > 0 ? branches[0].id : '')
  })

  useEffect(() => {
    setFormData({
      name: initialData?.name || '',
      description: initialData?.description || '',
      price: initialData?.price?.toString() || '',
      category: initialData?.category || '',
      image: initialData?.image || '',
      inStock: initialData?.inStock ?? true,
      stockQuantity: initialData?.stockQuantity ?? 0,
      branchId: branchId || initialData?.branchId || (showBranchSelect && branches.length > 0 ? branches[0].id : '')
    })
  }, [initialData, branchId, showBranchSelect, branches])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
      price: parseFloat(formData.price),
      stockQuantity: parseInt(formData.stockQuantity.toString()),
      branchId: formData.branchId
    })
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      image: '',
      inStock: true,
      stockQuantity: 0,
      branchId: branchId || ''
    })
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
        <Button className="bg-gradient-to-r from-orange-700 to-yellow-400 text-white font-semibold">
          <Plus className="mr-2 h-4 w-4 text-white" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[300px] p-2 rounded-lg bg-white/95 border border-orange-200 shadow-xl mt-10">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-orange-700 to-yellow-400 bg-clip-text text-transparent">
            <Package className="h-6 w-6 text-orange-500" />
            {isEdit ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs">
            {isEdit ? 'Update product details' : 'Create a new product for your coffee shop menu'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          {showBranchSelect && (
            <div className="space-y-1">
              <Label htmlFor="branchId" className="text-xs font-medium">Select Branch</Label>
              <BranchSelector
                branches={branches.map(b => ({ ...b, location: b.name }))}
                className="w-full"
                selectedBranchId={formData.branchId}
                onBranchSelect={(branch) => {
                  setFormData(prev => ({ ...prev, branchId: branch.id }))
                  if (onBranchChange) onBranchChange(branch.id)
                }}
              />
            </div>
          )}
          <div className="grid gap-2 grid-cols-2">
            <div className="space-y-1">
              <Label htmlFor="name" className="text-xs font-medium">Product Name</Label>
              <Input id="name" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} placeholder="e.g., Espresso Shot" className="form-input h-8 text-sm" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="price" className="text-xs font-medium">Price ($)</Label>
              <Input id="price" type="number" step="0.01" value={formData.price} onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))} placeholder="0.00" className="form-input h-8 text-sm" required />
            </div>
          </div>
          <div className="grid gap-2 grid-cols-2">
            <div className="space-y-1">
              <Label htmlFor="stockQuantity" className="text-xs font-medium">Stock Qty</Label>
              <Input id="stockQuantity" type="number" min="0" value={formData.stockQuantity} onChange={(e) => setFormData(prev => ({ ...prev, stockQuantity: parseInt(e.target.value) || 0 }))} placeholder="0" className="form-input h-8 text-sm" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="category" className="text-xs font-medium">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))} value={formData.category}>
                <SelectTrigger className="form-input h-8 text-sm">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="description" className="text-xs font-medium">Description</Label>
            <Textarea id="description" value={formData.description} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} placeholder="Describe your product..." className="form-input min-h-[60px] h-16 text-sm resize-none" required />
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-medium">Stock Status</Label>
            <div className="flex items-center space-x-2 p-1 rounded bg-white/50 border border-white/20">
              <Switch id="inStock" checked={formData.inStock} onCheckedChange={(checked) => setFormData(prev => ({ ...prev, inStock: checked }))} />
              <Label htmlFor="inStock" className="text-xs">{formData.inStock ? 'In Stock' : 'Out of Stock'}</Label>
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-medium">Product Image</Label>
            <div className="relative">
              {formData.image ? (
                <div className="relative aspect-video bg-muted rounded-lg overflow-hidden border-2 border-dashed border-purple-200 hover:border-purple-300 transition-colors h-24">
                  <img src={formData.image} alt="Product preview" className="w-full h-full object-cover" />
                  <Button type="button" variant="outline" size="sm" className="absolute top-2 right-2 bg-white/90 hover:bg-white transition-colors p-1 h-6 w-6" onClick={() => setFormData(prev => ({ ...prev, image: '' }))}>Remove</Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 cursor-pointer transition-colors duration-200 border-orange-300 hover:border-orange-400">
                  <UploadCloud className="h-8 w-8 text-orange-400 mb-2" />
                  <span className="text-xs text-orange-500">Click to upload or drag and drop</span>
                  <span className="text-[10px] text-orange-300">PNG, JPG, GIF up to 10MB</span>
                </div>
              )}
              <Input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => { setOpen(false); onCancel && onCancel(); }} className="h-8 px-3 text-xs">Cancel</Button>
            <Button type="submit" className="bg-gradient-to-r from-orange-700 to-yellow-400 text-white font-semibold">
              <Sparkles className="mr-2 h-4 w-4 text-white" />
              {isEdit ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 