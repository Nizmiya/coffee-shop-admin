'use client'

import { useState } from 'react'
import { ChevronDown, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDashboardStore } from '@/lib/store/dashboard-store'
import { getDataByBranchView } from '@/lib/mock-data'

const branchOptions = [
  { value: 'all', label: 'All Branches', icon: Building2 },
  { value: 'jaffna', label: 'Jaffna Branch', icon: Building2 },
  { value: 'colombo', label: 'Colombo Branch', icon: Building2 },
]

export default function BranchSelector({ className = '' }) {
  const {
    selectedBranchView,
    setSelectedBranchView,
    setBranchStats,
    setAllBranchStats,
  } = useDashboardStore()
  const [isOpen, setIsOpen] = useState(false)

  const handleBranchChange = (branchView) => {
    setSelectedBranchView(branchView)
    const data = getDataByBranchView(branchView)
    if (branchView === 'all') {
      setAllBranchStats(data.stats)
    } else {
      setBranchStats(data.stats)
    }
    setIsOpen(false)
  }

  const currentOption = branchOptions.find(option => option.value === selectedBranchView)
  const CurrentIcon = currentOption?.icon || Building2

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 min-w-[180px] justify-between bg-background/50 backdrop-blur-sm border-border hover:bg-accent/50"
      >
        <div className="flex items-center gap-2">
          <CurrentIcon className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">
            {currentOption?.label || 'All Branches'}
          </span>
        </div>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </Button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-background border border-border rounded-lg shadow-lg z-[9999] pointer-events-auto">
          {branchOptions.map((option) => {
            const Icon = option.icon
            return (
              <button
                key={option.value}
                onClick={() => handleBranchChange(option.value)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-accent/50 transition-colors duration-200 ${
                  selectedBranchView === option.value
                    ? 'bg-accent text-accent-foreground'
                    : 'text-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                {option.label}
              </button>
            )
          })}
        </div>
      )}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
} 