import React, { useState } from 'react'
import { Outlet, NavLink, Link } from 'react-router-dom'
import { 
  GraduationCap, 
  Compass, 
  BookOpen, 
  PlayCircle, 
  Layers, 
  ArrowLeft, 
  Menu, 
  X, 
  Sprout, 
  Sparkles,
  ShieldAlert
} from 'lucide-react'
import { LanguageSelector } from '@/components/LanguageSelector'
import { Toast } from '@/components/Toast'
import { useApp } from '@/context/AppContext'
import { useNavigate } from 'react-router-dom'

export const StudentLayout: React.FC = () => {
  const { t, role, isAuthenticated, logout } = useApp()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { to: '/students', label: t.careerAnalyzer, icon: Compass, end: true },
    { to: '/students/study-material', label: t.studyMaterial, icon: BookOpen },
    { to: '/students/youtube', label: t.youtubeLectures, icon: PlayCircle },
    { to: '/students/sectors', label: t.sectorGuide, icon: Layers }
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col text-slate-900 font-sans">
      {/* Top Bar for Student Portal */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 md:px-6 py-2.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <Link to="/students" className="flex items-center gap-2.5 group">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-100 group-hover:scale-105 transition-transform">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg md:text-xl tracking-tight text-slate-900">
                    Student Career Hub
                  </span>
                  <span className="text-[10px] uppercase font-black px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                    AI Guided
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 hidden sm:block font-medium">
                  Architecture • Engineering • Math & Science Roadmaps
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60">
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-white text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`
                }
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Selector working on this page */}
            <LanguageSelector compact />

            {/* Student Auth status & Logout */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  <GraduationCap className="h-3.5 w-3.5" />
                  <span>Student Member</span>
                </span>
                <button
                  type="button"
                  onClick={async () => {
                    await logout()
                    navigate('/login')
                  }}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-600 hover:text-red-700 hover:bg-red-50 border border-slate-200 transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-xs font-bold px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs"
              >
                Sign In
              </Link>
            )}

            {/* Link to Home */}
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 px-2 py-1.5 rounded-lg hover:bg-slate-100"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-3 pb-2 border-t border-slate-200 mt-2 space-y-1">
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-bold ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                <item.icon className="h-4 w-4 text-indigo-600" />
                <span>{item.label}</span>
              </NavLink>
            ))}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between px-3 text-xs">
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={async () => {
                    setMobileMenuOpen(false)
                    await logout()
                    navigate('/login')
                  }}
                  className="text-red-600 font-bold hover:underline"
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-indigo-600 font-bold hover:underline"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Outlet */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-8 px-4 sm:px-6 border-t border-slate-800 text-xs mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-indigo-400" />
            <span className="font-bold text-white text-sm">Student Career & Study Hub</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">Architecture, Engineering & Science Pathways</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <Link to="/students" className="hover:text-white transition-colors">Analyzer</Link>
            <Link to="/students/study-material" className="hover:text-white transition-colors">Notes</Link>
            <Link to="/students/youtube" className="hover:text-white transition-colors">YouTube</Link>
            <Link to="/students/sectors" className="hover:text-white transition-colors">Sectors</Link>
            <Link to="/farmer" className="hover:text-emerald-400 transition-colors">Farmer App</Link>
          </div>
        </div>
      </footer>

      <Toast />
    </div>
  )
}
