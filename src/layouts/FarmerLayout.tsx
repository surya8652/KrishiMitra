import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { FarmerHeader } from '@/components/FarmerHeader'
import { FarmerSidebar } from '@/components/FarmerSidebar'
import { MobileNavigation } from '@/components/MobileNavigation'
import { Toast } from '@/components/Toast'

export const FarmerLayout: React.FC = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#F8F9F5] flex flex-col text-[#1E2922]">
      {/* Header */}
      <FarmerHeader onToggleSidebar={() => setMobileSidebarOpen(prev => !prev)} />

      {/* Main Body with Sidebar */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <FarmerSidebar />
        </div>

        {/* Mobile Sidebar Modal/Drawer */}
        {mobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div 
              className="fixed inset-0 bg-black/40 backdrop-blur-xs"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative w-72 max-w-[80vw] bg-white h-full shadow-2xl z-50">
              <FarmerSidebar onCloseMobile={() => setMobileSidebarOpen(false)} />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8 pb-24 lg:pb-12 max-w-5xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNavigation />

      {/* Toast Notification Container */}
      <Toast />
    </div>
  )
}
