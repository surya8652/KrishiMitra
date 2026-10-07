import React, { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { AdminSidebar } from '@/components/AdminSidebar'
import { Toast } from '@/components/Toast'
import { ShieldAlert, Menu, Bell, DownloadCloud } from 'lucide-react'

export const AdminLayout: React.FC = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#F0F2ED] flex flex-col text-gray-900">
      {/* Top Banner for Admin Suite */}
      <header className="sticky top-0 z-40 bg-[#16201A] text-white border-b border-[#2C3B32] px-4 md:px-6 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(prev => !prev)}
              className="lg:hidden p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-[#2C3B32] cursor-pointer"
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="font-bold text-sm tracking-wide">KrishiMitra Directorate Portal</span>
              <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono">
                RESTRICTED / AGGREGATED
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/farmer"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white transition-colors"
            >
              Switch to Farmer Mode
            </Link>
          </div>
        </div>
      </header>

      {/* Main Layout Area */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <AdminSidebar />
        </div>

        {/* Mobile Sidebar */}
        {mobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div 
              className="fixed inset-0 bg-black/60"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative w-72 max-w-[80vw] bg-[#1E2922] h-full shadow-2xl z-50">
              <AdminSidebar onCloseMobile={() => setMobileSidebarOpen(false)} />
            </div>
          </div>
        )}

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      <Toast />
    </div>
  )
}
