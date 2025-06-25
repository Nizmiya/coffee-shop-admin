import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface SettingsState {
  businessName: string
  email: string
  phone: string
  address: string
  timezone: string
  currency: string
  notifications: {
    email: boolean
    sms: boolean
    push: boolean
    orderUpdates: boolean
    marketing: boolean
  }
  appearance: {
    theme: 'light' | 'dark' | 'auto'
    compactMode: boolean
    animations: boolean
  }
  setBusinessName: (name: string) => void
  setContactInfo: (email: string, phone: string, address: string) => void
  setLocale: (timezone: string, currency: string) => void
  setNotificationPrefs: (prefs: Partial<SettingsState['notifications']>) => void
  setAppearance: (appearance: Partial<SettingsState['appearance']>) => void
  resetToDefaults: () => void
}

const defaultState = {
  businessName: 'Nz coffee',
  email: 'admin@nzcoffee.com',
  phone: '+1 (555) 987-6543',
  address: '456 Coffee Ave, Flavor Town, CA 90210',
  timezone: 'America/Los_Angeles',
  currency: 'USD',
  notifications: {
    email: true,
    sms: false,
    push: true,
    orderUpdates: true,
    marketing: false,
  },
  appearance: {
    theme: 'auto' as 'auto',
    compactMode: false,
    animations: true,
  },
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaultState,
      setBusinessName: (name) => set({ businessName: name }),
      setContactInfo: (email, phone, address) => set({ email, phone, address }),
      setLocale: (timezone, currency) => set({ timezone, currency }),
      setNotificationPrefs: (prefs) =>
        set((state) => ({
          notifications: { ...state.notifications, ...prefs },
        })),
      setAppearance: (appearance) =>
        set((state) => ({
          appearance: { ...state.appearance, ...appearance },
        })),
      resetToDefaults: () => set(defaultState),
    }),
    {
      name: 'coffee-shop-settings-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
) 