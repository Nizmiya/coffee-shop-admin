'use client'

import { useState } from 'react'
import { Check, ChevronsUpDown, Building2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Branch } from '@/lib/types'
import { useDashboardStore } from '@/lib/store/dashboard-store'

interface BranchSelectorProps {
  branches: Branch[]
  className?: string
  selectedBranchId?: string
  onBranchSelect?: (branch: Branch) => void
}

export function BranchSelector({ branches, className, selectedBranchId, onBranchSelect }: BranchSelectorProps) {
  const [open, setOpen] = useState(false)
  const { selectedBranch, setSelectedBranch, setSelectedBranchView, currentUser, canAccessBranch } = useDashboardStore()

  // All branches are always accessible
  const accessibleBranches = branches

  // Add a pseudo-branch for 'All Branches'
  const allBranchesOption: Branch = {
    id: 'all',
    name: 'All Branches',
    location: '',
    address: '',
    phone: '',
    email: '',
    managerId: '',
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  // Use controlled selectedBranchId if provided, else fallback to Zustand
  const currentSelected = selectedBranchId
    ? (selectedBranchId === 'all' ? allBranchesOption : branches.find(b => b.id === selectedBranchId))
    : selectedBranch

  const handleBranchSelect = (branch: Branch) => {
    if (branch.id === 'all') {
      setSelectedBranchView('all')
    } else {
      setSelectedBranchView(branch.id)
      setSelectedBranch(branch)
    }
    if (onBranchSelect) {
      onBranchSelect(branch)
    }
    setOpen(false)
  }

  if (accessibleBranches.length === 0) {
    return null
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a branch"
          className={cn(
            "w-full justify-between bg-white border-orange-200 hover:border-orange-300",
            className
          )}
        >
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-orange-500" />
            <span className="font-medium">
              {currentSelected ? currentSelected.name : "Select Branch..."}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Search branches..." />
          <CommandList>
            <CommandEmpty>No branch found.</CommandEmpty>
            <CommandGroup>
              {/* All Branches option */}
              <CommandItem
                key={allBranchesOption.id}
                value={allBranchesOption.id}
                onSelect={() => handleBranchSelect(allBranchesOption)}
                className="cursor-pointer !opacity-100 !pointer-events-auto"
                aria-disabled={false}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    currentSelected?.id === allBranchesOption.id ? "opacity-100" : "opacity-0"
                  )}
                />
                <div className="flex flex-col">
                  <span className="font-medium">{allBranchesOption.name}</span>
                  <span className="text-sm text-muted-foreground">All locations</span>
                </div>
              </CommandItem>
              {/* Individual branches */}
              {accessibleBranches.map((branch) => (
                <CommandItem
                  key={branch.id}
                  value={branch.id}
                  onSelect={() => handleBranchSelect(branch)}
                  className="cursor-pointer !opacity-100 !pointer-events-auto"
                  aria-disabled={false}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      currentSelected?.id === branch.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">{branch.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {branch.location}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
} 