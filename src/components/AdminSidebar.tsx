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
  ChevronRight,
  ShieldCheck,
  Server
} from 'lucide-react'

export const AdminSidebar: React.FC<{ onCloseMobile?: () => void }> = ({ onCloseMobile }) => {
  const reportLinks = [
    { to: '/admin', label: 'Platform Overview', icon: LayoutDashboard, end: true },
    { to: '/admin/reports/users', label: 'Farmer Demographics', icon: Users },
    { to: '/admin/reports/crops', label: 'Crop Intelligence', icon: Sprout },
    { to: '/admin/reports/disease', label: 'Disease Outbreaks', icon: Activity },
    { to: '/admin/reports/weather', label: 'Weather Telemetry', icon: CloudRain },
    { to: '/admin/reports/irrigation', label: 'Water Conservation', icon: Droplets },
    { to: '/admin/reports/market', label: 'Mandi Price Indices', icon: TrendingUp },
    { to: '/admin/reports/marketplace', label: 'Trade & Marketplace', icon: Store },
    { to: '/admin/reports/system', label: 'AI Models & Telemetry', icon: Cpu }
  ]

  return (
    <aside className="w-64 bg-white border-r border-[#E5E7EB] flex flex-col h-full shrink-0 select-none">
      {/* Primary Nav Links */}
      <div className="p-3 space-y-1 flex-1 overflow-y-auto">
        <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400">
          Directorate Intelligence / प्रशासन
        </div>

        {reportLinks.map((item) => (
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
                {isActive && <ChevronRight className="h-4 w-4 text-emerald-200" />}
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* System Health / Directorate Footer Card */}
      <div className="p-3 border-t border-gray-100 bg-[#FBF9F5] space-y-2">
        <div className="p-3 rounded-xl bg-[#E8F5E9] border border-[#C8E6C9]">
          <div className="flex items-center gap-2 text-[#1B5E20] font-bold text-xs">
            <Server className="h-4 w-4 text-[#2E7D32]" />
            <span>Platform Health</span>
          </div>
          <p className="text-[11px] text-gray-600 mt-1 leading-snug">
            All 8 Microservices Operational
          </p>
          <div className="mt-1.5 flex items-center gap-1.5 text-[11px] font-extrabold text-[#1B5E20]">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>99.98% System Uptime</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
