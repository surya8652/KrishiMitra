import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  Sprout, 
  Activity, 
  CloudRain, 
  Droplets, 
  TrendingUp, 
  Store, 
  Cpu, 
  ArrowLeft
} from 'lucide-react'

export const AdminSidebar: React.FC<{ onCloseMobile?: () => void }> = ({ onCloseMobile }) => {
  const reportLinks = [
    { to: '/admin', label: 'Platform Overview', icon: LayoutDashboard, end: true },
    { to: '/admin/reports/users', label: 'User Reports', icon: Users },
    { to: '/admin/reports/crops', label: 'Crop Reports', icon: Sprout },
    { to: '/admin/reports/disease', label: 'Disease Reports', icon: Activity },
    { to: '/admin/reports/weather', label: 'Weather Reports', icon: CloudRain },
    { to: '/admin/reports/irrigation', label: 'Irrigation Reports', icon: Droplets },
    { to: '/admin/reports/market', label: 'Market Reports', icon: TrendingUp },
    { to: '/admin/reports/marketplace', label: 'Marketplace Reports', icon: Store },
    { to: '/admin/reports/system', label: 'AI & System Reports', icon: Cpu }
  ]

  return (
    <aside className="w-64 bg-[#1E2922] text-gray-200 border-r border-[#2C3B32] flex flex-col h-full shrink-0 select-none">
      {/* Header */}
      <div className="p-4 border-b border-[#2C3B32]">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
            KM
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-wide">KrishiMitra Directorate</h2>
            <p className="text-[11px] text-emerald-400 font-mono">Admin Intelligence Suite</p>
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <div className="p-3 space-y-1 flex-1 overflow-y-auto">
        <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400">
          Aggregated Analytics
        </div>

        {reportLinks.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onCloseMobile}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-emerald-700 text-white font-semibold'
                  : 'text-gray-300 hover:bg-[#2C3B32] hover:text-white'
              }`
            }
          >
            <item.icon className="h-4 w-4 text-emerald-400" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>

      {/* Footer Switcher */}
      <div className="p-3 border-t border-[#2C3B32] bg-[#16201A]">
        <NavLink
          to="/farmer"
          className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#24332B] hover:bg-[#2F4238] text-xs font-semibold text-emerald-300 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Switch to Farmer Portal</span>
        </NavLink>
      </div>
    </aside>
  )
}
