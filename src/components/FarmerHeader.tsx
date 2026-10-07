import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '@/context/AppContext'
import { LanguageSelector } from './LanguageSelector'
import { LocationSelectorModal } from './LocationSelectorModal'
import { 
  Sprout, 
  Bell, 
  MapPin, 
  ShieldCheck, 
  UserCheck, 
  Menu,
  ChevronDown,
  GraduationCap
} from 'lucide-react'

export const FarmerHeader: React.FC<{ onToggleSidebar?: () => void }> = ({ onToggleSidebar }) => {
  const { farmer, unreadCount, role, setRole, t } = useApp()
  const navigate = useNavigate()
  const [locationModalOpen, setLocationModalOpen] = useState(false)

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

          <Link to={role === 'admin' ? '/admin' : '/farmer'} className="flex items-center gap-2 group">
            <div className="h-9 w-9 rounded-lg bg-[#1B5E20] flex items-center justify-center text-white shadow-xs group-hover:bg-[#144818] transition-colors">
              <Sprout className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg md:text-xl tracking-tight text-[#143E23]">
                  KrishiMitra
                </span>
                <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-[#E8F5E9] text-[#1B5E20]">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-gray-500 hidden sm:block leading-tight font-medium">
                {t.tagline}
              </p>
            </div>
          </Link>
        </div>

        {/* Center: All-India Location Selector Button */}
        <button
          type="button"
          onClick={() => setLocationModalOpen(true)}
          className="flex items-center gap-1.5 bg-[#F1F8F3] hover:bg-[#E8F5E9] px-3 py-1.5 rounded-full border border-[#C8E6C9] text-xs font-semibold text-[#1B5E20] transition-colors cursor-pointer"
          title="Click to switch farm location anywhere across India"
        >
          <MapPin className="h-3.5 w-3.5 text-[#2E7D32]" />
          <span>{farmer.district}, {farmer.state}</span>
          <span className="text-[10px] bg-white text-[#1B5E20] px-1.5 py-0.2 rounded font-bold border border-emerald-300">
            Change
          </span>
          <ChevronDown className="h-3 w-3 text-emerald-600" />
        </button>

        {/* Right Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Student Hub Direct Portal Link */}
          <Link
            to="/students"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors"
            title="Open Student & Career Hub"
          >
            <GraduationCap className="h-3.5 w-3.5 text-indigo-600" />
            <span>Student Hub</span>
          </Link>

          {/* Quick Role Switcher for seamless review */}
          <button
            type="button"
            onClick={() => {
              if (role === 'farmer') {
                setRole('admin')
                navigate('/admin')
              } else {
                setRole('farmer')
                navigate('/farmer')
              }
            }}
            className={`hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
              role === 'admin' 
                ? 'bg-amber-100 text-amber-900 border-amber-300' 
                : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
            }`}
            title="Toggle between Farmer and Admin views"
          >
            {role === 'admin' ? (
              <>
                <ShieldCheck className="h-3.5 w-3.5 text-amber-700" />
                <span>Admin View (Switch to Farmer)</span>
              </>
            ) : (
              <>
                <UserCheck className="h-3.5 w-3.5 text-emerald-700" />
                <span>Farmer View (Switch to Admin)</span>
              </>
            )}
          </button>

          {/* Regional Language Selector */}
          <LanguageSelector compact />

          {/* Notifications bell */}
          <Link
            to={role === 'admin' ? '/admin/reports/system' : '/farmer/notifications'}
            className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            aria-label="View notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </Link>

          {/* Farmer profile avatar link */}
          <Link
            to="/farmer/profile"
            className="flex items-center gap-2 pl-1 group"
            title="View Profile"
          >
            <img
              src={farmer.avatar || "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=100&q=80"}
              alt={farmer.name}
              className="h-8 w-8 rounded-full object-cover border border-[#1B5E20] group-hover:ring-2 group-hover:ring-[#1B5E20] transition-all"
            />
            <span className="hidden xl:inline text-xs font-bold text-gray-800">
              {farmer.name.split(' ')[0]}
            </span>
          </Link>
        </div>
      </div>

      {/* Location Modal */}
      {locationModalOpen && (
        <LocationSelectorModal onClose={() => setLocationModalOpen(false)} />
      )}
    </header>
  )
}
