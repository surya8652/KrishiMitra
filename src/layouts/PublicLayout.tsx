import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Sprout, Phone, HeartHandshake, GraduationCap } from 'lucide-react'
import { LanguageSelector } from '@/components/LanguageSelector'
import { useApp } from '@/context/AppContext'

export const PublicLayout: React.FC = () => {
  const { t, isAuthenticated, role, logout } = useApp()

  const getPortalLink = () => {
    if (role === 'admin') return { to: '/admin', label: 'Admin Portal' }
    if (role === 'student') return { to: '/students', label: 'Student Hub' }
    return { to: '/farmer', label: 'Farmer App' }
  }

  const portal = getPortalLink()

  return (
    <div className="min-h-screen bg-[#F8F9F5] flex flex-col text-[#1E2922]">
      {/* Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB] px-4 md:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-[#1B5E20] flex items-center justify-center text-white shadow-xs">
              <Sprout className="h-5 w-5" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-[#143E23]">
                KrishiMitra <span className="text-xs px-1.5 py-0.5 rounded bg-[#E8F5E9] text-[#1B5E20]">AI</span>
              </span>
            </div>
          </Link>

          {/* Links and Language */}
          <div className="flex items-center gap-3 md:gap-5">
            <nav className="hidden md:flex items-center gap-5 text-sm font-semibold text-gray-700">
              <Link to="/" className="hover:text-[#1B5E20] transition-colors">Home</Link>
              <Link to="/about" className="hover:text-[#1B5E20] transition-colors">How It Works</Link>
              <Link to="/farmer" className="hover:text-[#1B5E20] transition-colors">Farmer App</Link>
              <Link to="/students" className="hover:text-indigo-700 transition-colors flex items-center gap-1.5 text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
                <GraduationCap className="h-4 w-4" />
                <span>{t.studentHub}</span>
              </Link>
            </nav>

            {/* Language Selector */}
            <LanguageSelector compact />

            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to={portal.to}
                    className="text-xs sm:text-sm font-bold px-3 py-2 rounded-lg bg-[#1B5E20] text-white hover:bg-[#144818] shadow-xs transition-all"
                  >
                    Open {portal.label}
                  </Link>
                  <button
                    type="button"
                    onClick={() => logout()}
                    className="text-xs sm:text-sm font-semibold px-2.5 py-2 rounded-lg text-gray-600 hover:text-red-700 hover:bg-red-50 border border-gray-200 transition-colors cursor-pointer"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-xs sm:text-sm font-bold px-3 py-2 rounded-lg text-[#1B5E20] hover:bg-[#E8F5E9] transition-colors"
                  >
                    {t.login}
                  </Link>
                  <Link
                    to="/register"
                    className="text-xs sm:text-sm font-bold px-4 py-2 rounded-lg bg-[#1B5E20] text-white hover:bg-[#144818] shadow-xs transition-all"
                  >
                    {t.getStarted}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Outlet */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Trust Footer */}
      <footer className="bg-[#1E2922] text-gray-300 border-t border-emerald-950 pt-10 pb-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-sm">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-md bg-[#2E7D32] flex items-center justify-center text-white">
                <Sprout className="h-4 w-4" />
              </div>
              <span className="font-extrabold text-lg text-white">KrishiMitra AI</span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              Smart Farming. Better Decisions. Stronger Rural Communities.
              Empowering farmers & rural youth with agricultural intelligence and career roadmaps.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Farmer Services</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><Link to="/farmer/smart-farming" className="hover:text-emerald-400">Crop Health & Disease Check</Link></li>
              <li><Link to="/farmer/weather" className="hover:text-emerald-400">Rain & Weather Guidance</Link></li>
              <li><Link to="/farmer/irrigation" className="hover:text-emerald-400">Drip Watering Advice</Link></li>
              <li><Link to="/farmer/prices" className="hover:text-emerald-400">Live Mandi Prices</Link></li>
              <li><Link to="/farmer/marketplace" className="hover:text-emerald-400">Farmer-to-Buyer Marketplace</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Students & Careers</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><Link to="/students" className="hover:text-indigo-400 text-indigo-300 font-semibold flex items-center gap-1.5"><GraduationCap className="h-3.5 w-3.5" /><span>Career & Interest Analyzer</span></Link></li>
              <li><Link to="/students/study-material" className="hover:text-indigo-400">Study Notes (Architecture, Engineering)</Link></li>
              <li><Link to="/students/youtube" className="hover:text-indigo-400">Curated YouTube Lectures</Link></li>
              <li><Link to="/students/sectors" className="hover:text-indigo-400">Sectors Guide (B.Arch, B.Tech)</Link></li>
              <li><Link to="/about" className="hover:text-emerald-400">About the Platform</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Support & Standards</h4>
            <div className="space-y-2 text-xs text-gray-400 mb-3">
              <div className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                <Phone className="h-3.5 w-3.5" />
                <span>Kisan Helpline: 1800-180-1551</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Available in 8 regional languages across all pages with offline compatibility.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 bg-[#26372E] p-2.5 rounded-lg border border-[#334A3E]">
              <HeartHandshake className="h-4 w-4 shrink-0" />
              <span>Free for all Indian farmers and students</span>
            </div>
            <div className="pt-2">
              <Link 
                to="/login?role=admin&redirect=/admin" 
                className="text-[11px] text-gray-500 hover:text-emerald-400 transition-colors inline-block"
              >
                🔒 Directorate & Admin Portal Login →
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} KrishiMitra AI • Designed for farmers & students • All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
