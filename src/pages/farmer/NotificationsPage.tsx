import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '@/context/AppContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Bell, 
  Check, 
  Trash2, 
  CloudRain, 
  Droplet, 
  TrendingUp, 
  ScanSearch, 
  ShoppingBag, 
  Sliders, 
  ArrowRight,
  CheckCheck
} from 'lucide-react'

export const NotificationsPage: React.FC = () => {
  const { 
    notifications, 
    markNotificationAsRead, 
    markAllNotificationsAsRead, 
    deleteNotification,
    showToast 
  } = useApp()

  const [settingsOpen, setSettingsOpen] = useState(false)
  const [smsAlerts, setSmsAlerts] = useState(true)
  const [voiceAlerts, setVoiceAlerts] = useState(true)
  const [priceJumpAlerts, setPriceJumpAlerts] = useState(true)

  const getIcon = (type: string) => {
    switch (type) {
      case 'weather': return <CloudRain className="h-5 w-5 text-sky-700" />
      case 'irrigation': return <Droplet className="h-5 w-5 text-blue-700" />
      case 'price': return <TrendingUp className="h-5 w-5 text-amber-700" />
      case 'disease': return <ScanSearch className="h-5 w-5 text-emerald-700" />
      case 'marketplace': return <ShoppingBag className="h-5 w-5 text-orange-700" />
      default: return <Bell className="h-5 w-5 text-gray-700" />
    }
  }

  const getBg = (type: string) => {
    switch (type) {
      case 'weather': return 'bg-sky-50 border-sky-200'
      case 'irrigation': return 'bg-blue-50 border-blue-200'
      case 'price': return 'bg-amber-50 border-amber-200'
      case 'disease': return 'bg-emerald-50 border-emerald-200'
      case 'marketplace': return 'bg-orange-50 border-orange-200'
      default: return 'bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-[#E8F5E9] text-[#1B5E20]">
            <Bell className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Notifications & Alerts
            </h1>
            <p className="text-sm text-gray-600">
              Real-time weather warnings, irrigation reminders, and price changes.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={markAllNotificationsAsRead}
            className="text-xs font-bold gap-1 cursor-pointer"
          >
            <CheckCheck className="h-4 w-4" />
            <span>Mark All Read</span>
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => setSettingsOpen(!settingsOpen)}
            className="text-xs font-bold gap-1 cursor-pointer"
          >
            <Sliders className="h-4 w-4" />
            <span>Settings</span>
          </Button>
        </div>
      </div>

      {/* Optional Notification Settings Panel */}
      {settingsOpen && (
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-gray-900">Notification Settings</h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl bg-[#F8F9F5] border border-gray-200 cursor-pointer">
              <div>
                <span className="font-bold text-sm text-gray-900 block">Instant SMS for Weather Storm Warnings</span>
                <span className="text-xs text-gray-500">Delivered directly to +91 98220 45678</span>
              </div>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="h-5 w-5 accent-[#1B5E20] rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-[#F8F9F5] border border-gray-200 cursor-pointer">
              <div>
                <span className="font-bold text-sm text-gray-900 block">Automated Morning Voice Call Reminder</span>
                <span className="text-xs text-gray-500">Regional language morning summary at 7:00 AM</span>
              </div>
              <input
                type="checkbox"
                checked={voiceAlerts}
                onChange={(e) => setVoiceAlerts(e.target.checked)}
                className="h-5 w-5 accent-[#1B5E20] rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-[#F8F9F5] border border-gray-200 cursor-pointer">
              <div>
                <span className="font-bold text-sm text-gray-900 block">Price Surge Alerts (+5% Mandi Jump)</span>
                <span className="text-xs text-gray-500">Notify when Tomato or Onion prices spike in Nashik/Pimpalgaon</span>
              </div>
              <input
                type="checkbox"
                checked={priceJumpAlerts}
                onChange={(e) => setPriceJumpAlerts(e.target.checked)}
                className="h-5 w-5 accent-[#1B5E20] rounded"
              />
            </label>
          </div>

          <div className="text-right">
            <Button
              size="sm"
              onClick={() => {
                setSettingsOpen(false)
                showToast('Notification preferences updated')
              }}
              className="bg-[#1B5E20] text-white text-xs font-bold"
            >
              Save Preferences
            </Button>
          </div>
        </div>
      )}

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-4 rounded-2xl border transition-all flex items-start gap-4 ${
              n.read 
                ? 'bg-white border-gray-200' 
                : 'bg-emerald-50/40 border-emerald-300 shadow-xs'
            }`}
          >
            <div className={`p-3 rounded-xl border shrink-0 ${getBg(n.type)}`}>
              {getIcon(n.type)}
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-bold text-sm sm:text-base text-gray-900">
                  {n.title}
                </h4>
                <span className="text-[11px] text-gray-400 font-semibold whitespace-nowrap">
                  {n.timestamp}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {n.message}
              </p>

              <div className="flex items-center justify-between pt-2">
                {n.link ? (
                  <Link
                    to={n.link}
                    className="inline-flex items-center text-xs font-bold text-[#1B5E20] hover:underline gap-1"
                  >
                    <span>Open details</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                ) : <div />}

                <div className="flex items-center gap-2">
                  {!n.read && (
                    <button
                      onClick={() => markNotificationAsRead(n.id)}
                      className="text-xs text-gray-500 hover:text-[#1B5E20] font-semibold flex items-center gap-1 cursor-pointer"
                      title="Mark read"
                    >
                      <Check className="h-3.5 w-3.5" />
                      <span>Mark Read</span>
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(n.id)}
                    className="text-xs text-gray-400 hover:text-red-600 font-semibold p-1 cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center space-y-2">
            <Bell className="h-10 w-10 mx-auto text-gray-300" />
            <h3 className="font-bold text-base text-gray-800">All Caught Up!</h3>
            <p className="text-xs text-gray-500">
              No new alerts right now. We will notify you when weather or mandi prices update.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
