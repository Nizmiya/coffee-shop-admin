'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { 
  Settings, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  CreditCard, 
  Users, 
  Sparkles,
  Save,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  Eye,
  EyeOff,
  Mail,
  Phone,
  MapPin,
  Clock
} from 'lucide-react'
import { useDashboardStore } from '@/lib/store/dashboard-store'

export default function SettingsPage() {
  const { addNotification } = useDashboardStore()
  const [showPassword, setShowPassword] = useState(false)
  const [settings, setSettings] = useState({
    businessName: 'Coffee Corner',
    email: 'admin@coffeecorner.com',
    phone: '+1 (555) 123-4567',
    address: '123 Coffee Street, Brew City, BC 12345',
    timezone: 'America/New_York',
    currency: 'USD',
    notifications: {
      email: true,
      sms: false,
      push: true,
      orderUpdates: true,
      marketing: false
    },
    security: {
      twoFactor: false,
      sessionTimeout: 30,
      passwordExpiry: 90
    },
    appearance: {
      theme: 'auto',
      compactMode: false,
      animations: true
    }
  })

  const handleSave = () => {
    addNotification({
      type: 'success',
      title: 'Settings Saved',
      message: 'Your settings have been updated successfully!',
      duration: 3000
    })
  }

  const handleReset = () => {
    addNotification({
      type: 'info',
      title: 'Settings Reset',
      message: 'Settings have been reset to defaults',
      duration: 3000
    })
  }

  const handleExport = () => {
    addNotification({
      type: 'success',
      title: 'Settings Exported',
      message: 'Settings have been exported successfully!',
      duration: 3000
    })
  }

  const handleImport = () => {
    addNotification({
      type: 'success',
      title: 'Settings Imported',
      message: 'Settings have been imported successfully!',
      duration: 3000
    })
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
          <RefreshCw className="mr-2 h-4 w-4" />
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

      <div className="grid gap-6 md:grid-cols-2">
        {/* Business Information */}
        <Card className="card-gradient group">
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
                value={settings.businessName}
                onChange={(e) => setSettings(prev => ({ ...prev, businessName: e.target.value }))}
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
                value={settings.email}
                onChange={(e) => setSettings(prev => ({ ...prev, email: e.target.value }))}
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
                value={settings.phone}
                onChange={(e) => setSettings(prev => ({ ...prev, phone: e.target.value }))}
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
                value={settings.address}
                onChange={(e) => setSettings(prev => ({ ...prev, address: e.target.value }))}
                className="form-input"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="timezone" className="text-sm font-medium flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-purple-500" />
                  Timezone
                </Label>
                <Select value={settings.timezone} onValueChange={(value) => setSettings(prev => ({ ...prev, timezone: value }))}>
                  <SelectTrigger className="form-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/New_York">Eastern Time</SelectItem>
                    <SelectItem value="America/Chicago">Central Time</SelectItem>
                    <SelectItem value="America/Denver">Mountain Time</SelectItem>
                    <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency" className="text-sm font-medium flex items-center">
                  <CreditCard className="mr-2 h-4 w-4 text-orange-500" />
                  Currency
                </Label>
                <Select value={settings.currency} onValueChange={(value) => setSettings(prev => ({ ...prev, currency: value }))}>
                  <SelectTrigger className="form-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                    <SelectItem value="CAD">CAD (C$)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="card-gradient group">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5 text-yellow-500" />
              Notifications
            </CardTitle>
            <CardDescription>
              Configure your notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Email Notifications</Label>
                <p className="text-xs text-muted-foreground">Receive updates via email</p>
              </div>
              <Switch
                checked={settings.notifications.email}
                onCheckedChange={(checked) => setSettings(prev => ({ 
                  ...prev, 
                  notifications: { ...prev.notifications, email: checked }
                }))}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">SMS Notifications</Label>
                <p className="text-xs text-muted-foreground">Receive updates via SMS</p>
              </div>
              <Switch
                checked={settings.notifications.sms}
                onCheckedChange={(checked) => setSettings(prev => ({ 
                  ...prev, 
                  notifications: { ...prev.notifications, sms: checked }
                }))}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Push Notifications</Label>
                <p className="text-xs text-muted-foreground">Receive browser notifications</p>
              </div>
              <Switch
                checked={settings.notifications.push}
                onCheckedChange={(checked) => setSettings(prev => ({ 
                  ...prev, 
                  notifications: { ...prev.notifications, push: checked }
                }))}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Order Updates</Label>
                <p className="text-xs text-muted-foreground">Notify on order status changes</p>
              </div>
              <Switch
                checked={settings.notifications.orderUpdates}
                onCheckedChange={(checked) => setSettings(prev => ({ 
                  ...prev, 
                  notifications: { ...prev.notifications, orderUpdates: checked }
                }))}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Marketing Emails</Label>
                <p className="text-xs text-muted-foreground">Receive promotional content</p>
              </div>
              <Switch
                checked={settings.notifications.marketing}
                onCheckedChange={(checked) => setSettings(prev => ({ 
                  ...prev, 
                  notifications: { ...prev.notifications, marketing: checked }
                }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="card-gradient group">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5 text-red-500" />
              Security
            </CardTitle>
            <CardDescription>
              Manage your account security settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Two-Factor Authentication</Label>
                <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Switch
                checked={settings.security.twoFactor}
                onCheckedChange={(checked) => setSettings(prev => ({ 
                  ...prev, 
                  security: { ...prev.security, twoFactor: checked }
                }))}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Session Timeout (minutes)</Label>
              <Select 
                value={settings.security.sessionTimeout.toString()} 
                onValueChange={(value) => setSettings(prev => ({ 
                  ...prev, 
                  security: { ...prev.security, sessionTimeout: parseInt(value) }
                }))}
              >
                <SelectTrigger className="form-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Password Expiry (days)</Label>
              <Select 
                value={settings.security.passwordExpiry.toString()} 
                onValueChange={(value) => setSettings(prev => ({ 
                  ...prev, 
                  security: { ...prev.security, passwordExpiry: parseInt(value) }
                }))}
              >
                <SelectTrigger className="form-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="60">60 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="180">180 days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-sm font-medium">
                Current Password
              </Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showPassword ? "text" : "password"}
                  className="form-input pr-10"
                  placeholder="Enter current password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 border-red-200 hover:border-red-300 transition-all duration-300"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Change Password
            </Button>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="card-gradient group">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Palette className="mr-2 h-5 w-5 text-purple-500" />
              Appearance
            </CardTitle>
            <CardDescription>
              Customize the look and feel of your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Theme</Label>
              <Select 
                value={settings.appearance.theme} 
                onValueChange={(value) => setSettings(prev => ({ 
                  ...prev, 
                  appearance: { ...prev.appearance, theme: value }
                }))}
              >
                <SelectTrigger className="form-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="auto">Auto (System)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Compact Mode</Label>
                <p className="text-xs text-muted-foreground">Reduce spacing for more content</p>
              </div>
              <Switch
                checked={settings.appearance.compactMode}
                onCheckedChange={(checked) => setSettings(prev => ({ 
                  ...prev, 
                  appearance: { ...prev.appearance, compactMode: checked }
                }))}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Animations</Label>
                <p className="text-xs text-muted-foreground">Enable smooth transitions and effects</p>
              </div>
              <Switch
                checked={settings.appearance.animations}
                onCheckedChange={(checked) => setSettings(prev => ({ 
                  ...prev, 
                  appearance: { ...prev.appearance, animations: checked }
                }))}
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label className="text-sm font-medium">Language</Label>
              <Select defaultValue="en">
                <SelectTrigger className="form-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Date Format</Label>
              <Select defaultValue="MM/DD/YYYY">
                <SelectTrigger className="form-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Danger Zone */}
      <Card className="card-gradient border-red-200/50">
        <CardHeader>
          <CardTitle className="flex items-center text-red-600">
            <Trash2 className="mr-2 h-5 w-5" />
            Danger Zone
          </CardTitle>
          <CardDescription>
            Irreversible and destructive actions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-red-50/50 backdrop-blur-sm border border-red-200/50">
            <div>
              <h3 className="font-medium text-red-900">Delete Account</h3>
              <p className="text-sm text-red-700">Permanently delete your account and all data</p>
            </div>
            <Button 
              variant="destructive"
              className="hover:bg-red-700 transition-all duration-300"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Account
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-orange-50/50 backdrop-blur-sm border border-orange-200/50">
            <div>
              <h3 className="font-medium text-orange-900">Clear All Data</h3>
              <p className="text-sm text-orange-700">Remove all orders, customers, and products</p>
            </div>
            <Button 
              variant="outline"
              className="border-orange-300 text-orange-700 hover:bg-orange-50 transition-all duration-300"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Clear Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 