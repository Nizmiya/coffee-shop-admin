import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface DashboardState {
  theme: 'light' | 'dark'
  sidebarOpen: boolean
  notifications: Notification[]
  toggleTheme: () => void
  toggleSidebar: () => void
  addNotification: (notification: Omit<Notification, 'id'>) => void
  removeNotification: (id: string) => void
}

interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      sidebarOpen: true,
      notifications: [],
      
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
      }
    }),
    {
      name: 'dashboard-storage',
      partialize: (state) => ({ theme: state.theme, sidebarOpen: state.sidebarOpen })
    }
  )
) 