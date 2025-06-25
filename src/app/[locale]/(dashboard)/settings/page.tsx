'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useSettingsStore } from '@/lib/store/settings-store'
import { toast } from 'sonner'
import { 
  Bell, 
  Settings, 
  Save, 
  RotateCcw, 
  Download, 
  Upload, 
  Eye, 
  EyeOff, 
  Shield, 
  Palette, 
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Clock,
  CreditCard,
  Trash2
} from 'lucide-react'

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false)
  const {
    businessName,
    email,
    phone,
    address,
    timezone,
    currency,
    notifications,
    appearance,
    setBusinessName,
    setContactInfo,
    setLocale,
    setNotificationPrefs,
    setAppearance,
    resetToDefaults,
  } = useSettingsStore()

  // Local state for temporary edits
  const [localSettings, setLocalSettings] = useState({
    businessName,
    email,
    phone,
    address,
    timezone,
    currency,
  })

  const handleInputChange = (field: string, value: string) => {
    setLocalSettings(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    setBusinessName(localSettings.businessName)
    setContactInfo(localSettings.email, localSettings.phone, localSettings.address)
    setLocale(localSettings.timezone, localSettings.currency)
    toast.success('Settings Saved', {
      description: 'Your settings have been updated successfully!',
    })
  }

  const handleReset = () => {
    resetToDefaults()
    const defaults = useSettingsStore.getState()
    setLocalSettings({
        businessName: defaults.businessName,
        email: defaults.email,
        phone: defaults.phone,
        address: defaults.address,
        timezone: defaults.timezone,
        currency: defaults.currency,
    })
    toast.info('Settings Reset', {
      description: 'Settings have been reset to their defaults.',
    })
  }

  const handleExport = () => {
    const settingsToExport = JSON.stringify(useSettingsStore.getState(), null, 2)
    const blob = new Blob([settingsToExport], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'coffee-shop-settings.json'
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Settings Exported', {
      description: 'Your settings have been downloaded.',
    })
  }

  const handleImport = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          try {
            const importedSettings = JSON.parse(event.target?.result as string)
            // Validate and set settings
            const {
              businessName,
              email,
              phone,
              address,
              timezone,
              currency,
              notifications,
              appearance,
            } = importedSettings

            if (businessName) setBusinessName(businessName)
            if (email && phone && address) setContactInfo(email, phone, address)
            if (timezone && currency) setLocale(timezone, currency)
            if (notifications) setNotificationPrefs(notifications)
            if (appearance) setAppearance(appearance)
            
            // update local state as well
            setLocalSettings({
                businessName,
                email,
                phone,
                address,
                timezone,
                currency
            });

            toast.success('Settings Imported', {
              description: 'Your settings have been restored.',
            })
          } catch (error) {
            toast.error('Import Failed', {
              description: 'The selected file is not valid.',
            })
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-25"></div>
        <div className="relative bg-gradient-to-r from-indigo-600/10 to-purple-600/10 p-6 rounded-lg border border-indigo-200/20">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your coffee shop preferences and configurations
          </p>
          <div className="absolute top-4 right-4">
            <Sparkles className="h-6 w-6 text-indigo-400 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2">
        <Button 
          onClick={handleSave}
          className="btn-gradient hover:shadow-lg transition-all duration-300"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
        <Button 
          variant="outline"
          onClick={handleReset}
          className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 border-gray-200 hover:border-gray-300 transition-all duration-300"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset to Defaults
        </Button>
        <Button 
          variant="outline"
          onClick={handleExport}
          className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 border-blue-200 hover:border-blue-300 transition-all duration-300"
        >
          <Download className="mr-2 h-4 w-4" />
          Export Settings
        </Button>
        <Button 
          variant="outline"
          onClick={handleImport}
          className="hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 border-green-200 hover:border-green-300 transition-all duration-300"
        >
          <Upload className="mr-2 h-4 w-4" />
          Import Settings
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Business Information */}
        <Card className="card-gradient group lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5 text-indigo-500" />
              Business Information
            </CardTitle>
            <CardDescription>
              Update your coffee shop details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessName" className="text-sm font-medium">
                Business Name
              </Label>
              <Input
                id="businessName"
                value={localSettings.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                className="form-input"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium flex items-center">
                <Mail className="mr-2 h-4 w-4 text-blue-500" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={localSettings.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="form-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium flex items-center">
                <Phone className="mr-2 h-4 w-4 text-green-500" />
                Phone Number
              </Label>
              <Input
                id="phone"
                value={localSettings.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="form-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm font-medium flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-red-500" />
                Address
              </Label>
              <Input
                id="address"
                value={localSettings.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="form-input"
              />
            </div>
          </CardContent>
        </Card>

        {/* Locale Settings */}
        <Card className="card-gradient group lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-cyan-500" />
              Locale Settings
            </CardTitle>
            <CardDescription>
              Set your timezone and currency
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="timezone" className="text-sm font-medium">Timezone</Label>
              <Select value={localSettings.timezone} onValueChange={(value) => handleInputChange('timezone', value)}>
                <SelectTrigger className="form-input">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/New_York">Eastern Time (US & Canada)</SelectItem>
                  <SelectItem value="America/Chicago">Central Time (US & Canada)</SelectItem>
                  <SelectItem value="America/Denver">Mountain Time (US & Canada)</SelectItem>
                  <SelectItem value="America/Los_Angeles">Pacific Time (US & Canada)</SelectItem>
                  <SelectItem value="Europe/London">London (GMT)</SelectItem>
                  <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                  <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency" className="text-sm font-medium">Currency</Label>
              <Select value={localSettings.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                <SelectTrigger className="form-input">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD - United States Dollar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="GBP">GBP - British Pound</SelectItem>
                  <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                  <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                  <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="card-gradient group lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5 text-amber-500" />
              Notifications
            </CardTitle>
            <CardDescription>
              Manage how you get notified
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="emailNotifications" className="flex-grow">Email Notifications</Label>
              <Switch
                id="emailNotifications"
                checked={notifications.email}
                onCheckedChange={(checked) => setNotificationPrefs({ email: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="smsNotifications" className="flex-grow">SMS Notifications</Label>
              <Switch
                id="smsNotifications"
                checked={notifications.sms}
                onCheckedChange={(checked) => setNotificationPrefs({ sms: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="pushNotifications" className="flex-grow">Push Notifications</Label>
              <Switch
                id="pushNotifications"
                checked={notifications.push}
                onCheckedChange={(checked) => setNotificationPrefs({ push: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <Label htmlFor="orderUpdates" className="flex-grow">Order Updates</Label>
              <Switch
                id="orderUpdates"
                checked={notifications.orderUpdates}
                onCheckedChange={(checked) => setNotificationPrefs({ orderUpdates: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="marketing" className="flex-grow">Marketing & Promotions</Label>
              <Switch
                id="marketing"
                checked={notifications.marketing}
                onCheckedChange={(checked) => setNotificationPrefs({ marketing: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card className="card-gradient group">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Palette className="mr-2 h-5 w-5 text-rose-500" />
              Appearance
            </CardTitle>
            <CardDescription>
              Customize the look and feel
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select value={appearance.theme} onValueChange={(value) => setAppearance({ theme: value as 'light' | 'dark' | 'auto' })}>
                <SelectTrigger className="form-input">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="auto">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="compactMode">Compact Mode</Label>
              <Switch
                id="compactMode"
                checked={appearance.compactMode}
                onCheckedChange={(checked) => setAppearance({ compactMode: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="animations">Enable Animations</Label>
              <Switch
                id="animations"
                checked={appearance.animations}
                onCheckedChange={(checked) => setAppearance({ animations: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings - Placeholder */}
        <Card className="card-gradient group">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5 text-teal-500" />
              Security
            </CardTitle>
            <CardDescription>
              Manage your account security
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">Change Password</Button>
            <div className="flex items-center justify-between">
              <Label htmlFor="2fa">Two-Factor Authentication</Label>
              <Switch id="2fa" />
            </div>
          </CardContent>
        </Card>

        {/* Data Management - Placeholder */}
        <Card className="card-gradient group">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trash2 className="mr-2 h-5 w-5 text-red-500" />
              Data Management
            </CardTitle>
            <CardDescription>
              Manage your application data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="destructive" className="w-full">
              Delete All Orders
            </Button>
            <Button variant="destructive" className="w-full">
              Delete All Products
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 