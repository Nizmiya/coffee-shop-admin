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
}

export function BranchSelector({ branches, className }: BranchSelectorProps) {
  const [open, setOpen] = useState(false)
  const { selectedBranch, setSelectedBranch, currentUser, canAccessBranch } = useDashboardStore()

  // All branches are always accessible
  const accessibleBranches = branches

  const handleBranchSelect = (branch: Branch) => {
    // Always use the branch object from Zustand's branches array by id
    const zustandBranch = branches.find(b => b.id === branch.id) || branch
    setSelectedBranch(zustandBranch)
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
            "w-full justify-between bg-white/50 backdrop-blur-sm border-purple-200 hover:border-purple-300",
            className
          )}
        >
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-purple-600" />
            <span className="font-medium">
              {selectedBranch ? selectedBranch.name : "Select Branch..."}
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
                      selectedBranch?.id === branch.id ? "opacity-100" : "opacity-0"
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