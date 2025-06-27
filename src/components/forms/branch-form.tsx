'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Building2, Sparkles } from 'lucide-react'
import { Branch } from '@/lib/types'

interface BranchFormProps {
  onSave: (data: Omit<Branch, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'managerId'>) => void
  onCancel: () => void
  open: boolean
  setOpen: (open: boolean) => void
  initialData?: Branch
}

export default function BranchForm({ onSave, onCancel, open, setOpen, initialData }: BranchFormProps) {
  const isEdit = !!initialData
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    location: initialData?.location || '',
    address: initialData?.address || '',
    phone: initialData?.phone || '',
    email: initialData?.email || '',
  })

  useEffect(() => {
    setFormData({
      name: initialData?.name || '',
      location: initialData?.location || '',
      address: initialData?.address || '',
      phone: initialData?.phone || '',
      email: initialData?.email || '',
    })
  }, [initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="btn-gradient hover:shadow-lg transition-all duration-300">
          <Plus className="mr-2 h-4 w-4" />
          Add New Branch
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[380px] p-2 rounded-lg bg-white/95 border border-purple-200 shadow-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-orange-700 to-yellow-400 bg-clip-text text-transparent">
            <Building2 className="h-6 w-6 text-orange-500" />
            {isEdit ? 'Edit Branch' : 'Add New Branch'}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs">
            {isEdit ? 'Update branch details.' : 'Create a new branch for your operations.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3 p-4">
          <div className="space-y-1">
            <Label htmlFor="name" className="text-xs font-medium">Branch Name</Label>
            <Input id="name" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} placeholder="e.g., Kandy Branch" className="form-input h-8 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-400" required />
          </div>
          <div className="space-y-1">
            <Label htmlFor="location" className="text-xs font-medium">Location</Label>
            <Input id="location" value={formData.location} onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))} placeholder="e.g., Kandy" className="form-input h-8 text-sm" required />
          </div>
          <div className="space-y-1">
            <Label htmlFor="address" className="text-xs font-medium">Address</Label>
            <Input id="address" value={formData.address} onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))} placeholder="123 Main St, Kandy" className="form-input h-8 text-sm" required />
          </div>
          <div className="grid gap-2 grid-cols-2">
            <div className="space-y-1">
              <Label htmlFor="phone" className="text-xs font-medium">Phone</Label>
              <Input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} placeholder="+94-XX-XXXXXXX" className="form-input h-8 text-sm" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email" className="text-xs font-medium">Email</Label>
              <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} placeholder="kandy@coffeeshop.com" className="form-input h-8 text-sm" required />
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => { setOpen(false); onCancel(); }} className="h-8 px-3 text-xs">Cancel</Button>
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