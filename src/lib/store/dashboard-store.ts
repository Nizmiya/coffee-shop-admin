import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Branch, User, BranchStats } from '@/lib/types'
import { branches as initialBranches } from '@/lib/mock-data'

interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
}

interface DashboardStore {
  // Theme and UI
  theme: 'light' | 'dark'
  sidebarOpen: boolean
  notifications: Notification[]
  
  // Branch management
  selectedBranch: Branch | null
  selectedBranchView: string
  branches: Branch[]
  currentUser: User | null
  
  // Branch stats
  branchStats: BranchStats | null
  allBranchStats: BranchStats | null
  
  // Actions
  toggleTheme: () => void
  toggleSidebar: () => void
  addNotification: (notification: Omit<Notification, 'id'>) => void
  removeNotification: (id: string) => void
  setSelectedBranch: (branch: Branch) => void
  setSelectedBranchView: (view: string) => void
  setBranches: (branches: Branch[]) => void
  setCurrentUser: (user: User) => void
  setBranchStats: (stats: BranchStats) => void
  setAllBranchStats: (stats: BranchStats) => void
  addBranch: (branch: Branch) => void
  
  // Computed values
  isAdmin: boolean
  isManager: boolean
  canAccessBranch: (branchId: string) => boolean
  getCurrentBranchData: () => BranchStats | null
}

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set, get) => ({
      theme: 'light',
      sidebarOpen: true,
      notifications: [],
      
      // Branch management
      selectedBranch: null,
      selectedBranchView: 'all',
      branches: initialBranches,
      currentUser: null,
      
      // Branch stats
      branchStats: null,
      allBranchStats: null,
      
      toggleTheme: () => {
        const currentTheme = get().theme
        const newTheme = currentTheme === 'light' ? 'dark' : 'light'
        set({ theme: newTheme })
        document.documentElement.classList.toggle('dark', newTheme === 'dark')
      },
      
      toggleSidebar: () => {
        set((state) => ({ sidebarOpen: !state.sidebarOpen }))
      },
      
      addNotification: (notification) => {
        const id = Math.random().toString(36).substr(2, 9)
        const newNotification = { ...notification, id }
        set((state) => ({
          notifications: [...state.notifications, newNotification]
        }))
        
        // Auto remove after duration
        if (notification.duration) {
          setTimeout(() => {
            get().removeNotification(id)
          }, notification.duration)
        }
      },
      
      removeNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter(n => n.id !== id)
        }))
      },
      
      // Actions
      setSelectedBranch: (branch) => set({ selectedBranch: branch }),
      setSelectedBranchView: (view) => set({ selectedBranchView: view }),
      setBranches: (branches) => set({ branches }),
      setCurrentUser: (user) => set({ currentUser: user }),
      setBranchStats: (stats) => set({ branchStats: stats }),
      setAllBranchStats: (stats) => set({ allBranchStats: stats }),
      addBranch: (branch) => set((state) => ({ branches: [...state.branches, branch] })),
      
      // Computed values
      get isAdmin() {
        return get().currentUser?.role === 'admin'
      },
      
      get isManager() {
        return get().currentUser?.role === 'manager'
      },
      
      canAccessBranch: (branchId) => {
        const { currentUser, isAdmin } = get()
        if (isAdmin) return true
        return currentUser?.branchId === branchId
      },

      getCurrentBranchData: () => {
        const { selectedBranchView, branchStats, allBranchStats } = get()
        if (selectedBranchView === 'all') {
          return allBranchStats
        }
        return branchStats
      }
    }),
    {
      name: 'dashboard-storage',
      partialize: (state) => ({ 
        theme: state.theme, 
        sidebarOpen: state.sidebarOpen,
        selectedBranchView: state.selectedBranchView
      })
    }
  )
) 