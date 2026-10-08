import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '@/context/AppContext'
import { LanguageSelector } from './LanguageSelector'
import { ADMIN_USER } from '@/data/mockData'
import { 
  Sprout, 
  ShieldCheck, 
  Bell, 
  Menu, 
  LogOut,
  Building2,
  FileSpreadsheet
} from 'lucide-react'

export const AdminHeader: React.FC<{ onToggleSidebar?: () => void }> = ({ onToggleSidebar }) => {
  const { unreadCount, logout, t } = useApp()
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB] px-4 md:px-6 py-2.5 shadow-xs">
      <div className="flex items-center justify-between gap-2 max-w-7xl mx-auto">
        {/* Left side: Mobile Toggle + Logo */}
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <button
              type="button"
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          )}

          <Link to="/admin" className="flex items-center gap-2 group">
            <div className="h-9 w-9 rounded-lg bg-[#1B5E20] flex items-center justify-center text-white shadow-xs group-hover:bg-[#144818] transition-colors">
              <Sprout className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg md:text-xl tracking-tight text-[#143E23]">
                  KrishiMitra
                </span>
                <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  ADMIN
                </span>
              </div>
              <p className="text-[10px] text-gray-500 hidden sm:block leading-tight font-medium">
                State Agricultural Directorate & Planning Portal
              </p>
            </div>
          </Link>
        </div>

        {/* Center: Directorate Zone Tag */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900">
          <Building2 className="h-3.5 w-3.5 text-emerald-700" />
          <span>Central & State Directorate System</span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Verified Admin Officer Badge */}
          <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" />
            <span>Directorate Admin</span>
          </div>

          {/* Regional Language Selector */}
          <LanguageSelector compact />

          {/* Notifications bell */}
          <Link
            to="/admin/reports/system"
            className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            aria-label="View system alerts"
            title="System & AI Status"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </Link>

          {/* Admin Profile Display */}
          <div className="flex items-center gap-2 pl-1">
            <div className="h-8 w-8 rounded-full bg-emerald-800 text-white font-bold flex items-center justify-center text-xs shadow-xs border border-emerald-900">
              RK
            </div>
            <div className="hidden xl:block text-left">
              <span className="block text-xs font-bold text-gray-900 leading-tight">
                {ADMIN_USER.name}
              </span>
              <span className="block text-[10px] text-gray-500">
                Officer (Directorate)
              </span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            type="button"
            onClick={async () => {
              await logout()
              navigate('/login')
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-gray-600 hover:text-red-700 hover:bg-red-50 border border-gray-200 transition-colors cursor-pointer"
            title="Sign out of Admin session"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  )
}
