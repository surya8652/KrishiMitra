import React from 'react'
import { NavLink } from 'react-router-dom'
import { useApp } from '@/context/AppContext'
import { 
  Home, 
  Sprout, 
  ScanSearch, 
  CloudSun, 
  Droplet, 
  TrendingUp, 
  ShoppingBag, 
  FileText, 
  User, 
  Bell, 
  PhoneCall,
  ExternalLink,
  ChevronRight
} from 'lucide-react'

export const FarmerSidebar: React.FC<{ onCloseMobile?: () => void }> = ({ onCloseMobile }) => {
  const { unreadCount, t } = useApp()

  const navItems = [
    { to: '/farmer', label: t.dashboard, icon: Home, end: true },
    { to: '/farmer/smart-farming', label: t.smartFarming, icon: Sprout },
    { to: '/farmer/disease', label: t.cropHealth, icon: ScanSearch },
    { to: '/farmer/weather', label: t.weather, icon: CloudSun },
    { to: '/farmer/irrigation', label: t.irrigation, icon: Droplet },
    { to: '/farmer/prices', label: t.cropPrices, icon: TrendingUp },
    { to: '/farmer/marketplace', label: t.marketplace, icon: ShoppingBag },
    { to: '/farmer/reports', label: t.myReports, icon: FileText },
    { to: '/farmer/profile', label: t.myProfile, icon: User },
    { 
      to: '/farmer/notifications', 
      label: t.notifications, 
      icon: Bell, 
      badge: unreadCount > 0 ? unreadCount : undefined 
    }
  ]

  return (
    <aside className="w-64 bg-white border-r border-[#E5E7EB] flex flex-col h-full shrink-0 select-none">
      {/* Primary Nav Links */}
      <div className="p-3 space-y-1 flex-1 overflow-y-auto">
        <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400">
          Farmer Services / सेवा
        </div>

        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onCloseMobile}
            className={({ isActive }) =>
              `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-[#1B5E20] text-white shadow-xs'
                  : 'text-gray-700 hover:bg-[#F1F8F3] hover:text-[#1B5E20]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-3">
                  <item.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-[#2E7D32]'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge ? (
                  <span className="h-5 min-w-[20px] px-1 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
                    {item.badge}
                  </span>
                ) : (
                  isActive && <ChevronRight className="h-4 w-4 text-emerald-200" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Kisan Helpline & Quick Info Footer */}
      <div className="p-3 border-t border-gray-100 bg-[#FBF9F5] space-y-2">
        <div className="p-3 rounded-xl bg-[#E8F5E9] border border-[#C8E6C9]">
          <div className="flex items-center gap-2 text-[#1B5E20] font-bold text-xs">
            <PhoneCall className="h-4 w-4 text-[#2E7D32]" />
            <span>Kisan Call Centre</span>
          </div>
          <p className="text-[11px] text-gray-600 mt-1 leading-snug">
            Toll-Free Agricultural Support
          </p>
          <a
            href="tel:18001801551"
            className="mt-1.5 inline-block text-xs font-extrabold text-[#1B5E20] hover:underline"
          >
            1800-180-1551
          </a>
        </div>

        <NavLink
          to="/"
          className="flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-gray-500 hover:text-[#1B5E20] transition-colors"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          <span>Public Homepage</span>
        </NavLink>
      </div>
    </aside>
  )
}
