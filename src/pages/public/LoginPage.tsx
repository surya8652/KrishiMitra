import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useApp } from '@/context/AppContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { LanguageSelector } from '@/components/LanguageSelector'
import { UserRole } from '@/types'
import { 
  Sprout, 
  Phone, 
  Lock, 
  UserCheck, 
  ShieldCheck, 
  GraduationCap, 
  AlertCircle, 
  CheckCircle,
  Mail,
  ArrowRight
} from 'lucide-react'

export const LoginPage: React.FC = () => {
  const { setRole, showToast, t, signInWithSupabase, loginDemo } = useApp()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const initialRoleParam = searchParams.get('role') as UserRole
  const initialRedirect = searchParams.get('redirect')

  const [selectedRole, setSelectedRole] = useState<'farmer' | 'student' | 'admin'>(() => {
    if (initialRoleParam === 'admin' || initialRedirect?.startsWith('/admin')) return 'admin'
    if (initialRoleParam === 'student' || initialRedirect?.startsWith('/students')) return 'student'
    return 'farmer'
  })

  const [identifier, setIdentifier] = useState('9822045678')
  const [password, setPassword] = useState('kisan1234')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Update sample prefill when role changes
  const handleRoleSelect = (role: 'farmer' | 'student' | 'admin') => {
    setSelectedRole(role)
    setErrorMessage(null)
    if (role === 'farmer') {
      setIdentifier('9822045678')
      setPassword('kisan1234')
    } else if (role === 'student') {
      setIdentifier('9765432100')
      setPassword('student123')
    } else if (role === 'admin') {
      setIdentifier('ramesh.admin@krishimitra.gov.in')
      setPassword('admin1234')
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage(null)

    try {
      const res = await signInWithSupabase(identifier, password, selectedRole)
      if (res.success) {
        showToast(`Login successful! Opening ${selectedRole === 'admin' ? 'Admin Portal' : (selectedRole === 'student' ? 'Student Hub' : 'Farmer Dashboard')}`)
        
        // Auto-redirect based on position
        if (selectedRole === 'farmer') {
          navigate('/farmer')
        } else if (selectedRole === 'admin') {
          navigate('/admin')
        } else if (selectedRole === 'student') {
          navigate('/students')
        }
      } else {
        setErrorMessage(res.error || 'Authentication failed. Please verify credentials.')
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed connecting to login service')
    } finally {
      setLoading(false)
    }
  }

  const handleQuickDemo = (role: 'farmer' | 'student' | 'admin') => {
    loginDemo(role)
    if (role === 'farmer') {
      navigate('/farmer')
    } else if (role === 'admin') {
      navigate('/admin')
    } else if (role === 'student') {
      navigate('/students')
    }
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md space-y-4">
        {/* Language selector helper */}
        <div className="flex justify-between items-center px-1">
          <Link to="/" className="text-xs font-semibold text-gray-500 hover:text-[#1B5E20] flex items-center gap-1">
            ← {t.backToHome}
          </Link>
          <LanguageSelector compact />
        </div>

        <Card className="border-[#D1D5DB] shadow-lg">
          <CardHeader className="text-center pb-2">
            <div className={`mx-auto h-12 w-12 rounded-2xl flex items-center justify-center text-white mb-2 shadow-sm transition-colors ${
              selectedRole === 'admin' 
                ? 'bg-emerald-900' 
                : selectedRole === 'student' 
                  ? 'bg-indigo-600' 
                  : 'bg-[#1B5E20]'
            }`}>
              {selectedRole === 'admin' ? (
                <ShieldCheck className="h-6 w-6" />
              ) : selectedRole === 'student' ? (
                <GraduationCap className="h-6 w-6" />
              ) : (
                <Sprout className="h-6 w-6" />
              )}
            </div>
            <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">
              {t.login}
            </CardTitle>
            <CardDescription className="text-gray-600 text-xs">
              Select your role and sign in to open your dedicated portal
            </CardDescription>

            {/* Position / Role Selector Tabs */}
            <div className="pt-3">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5 text-left">
                Select Your Position / भूमिका निवडा:
              </label>
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-gray-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => handleRoleSelect('farmer')}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedRole === 'farmer'
                      ? 'bg-white text-[#1B5E20] shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Sprout className="h-4 w-4 mb-0.5" />
                  <span>Farmer</span>
                  <span className="text-[10px] font-normal text-gray-400">शेतकरी</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleSelect('student')}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedRole === 'student'
                      ? 'bg-white text-indigo-700 shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <GraduationCap className="h-4 w-4 mb-0.5" />
                  <span>Student</span>
                  <span className="text-[10px] font-normal text-gray-400">विद्यार्थी</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleSelect('admin')}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedRole === 'admin'
                      ? 'bg-white text-emerald-900 shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <ShieldCheck className="h-4 w-4 mb-0.5" />
                  <span>Admin</span>
                  <span className="text-[10px] font-normal text-gray-400">प्रशासक</span>
                </button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-2">
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-800">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  {selectedRole === 'admin' 
                    ? 'Official Email / Officer ID' 
                    : selectedRole === 'student' 
                      ? 'Student Mobile or Email' 
                      : 'Mobile Number or Email'}
                </label>
                <Input
                  type="text"
                  placeholder={
                    selectedRole === 'admin'
                      ? 'admin@krishimitra.gov.in'
                      : selectedRole === 'student'
                        ? 'student@krishimitra.edu or mobile'
                        : 'e.g. 9822045678 or farmer@example.com'
                  }
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  icon={selectedRole === 'admin' ? <Mail className="h-4 w-4" /> : <Phone className="h-4 w-4" />}
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => showToast('Demo credentials autofilled for easy access')}
                    className="text-xs font-semibold text-[#1B5E20] hover:underline cursor-pointer"
                  >
                    Reset?
                  </button>
                </div>
                <Input
                  type="password"
                  placeholder="Enter minimum 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={<Lock className="h-4 w-4" />}
                  required
                />
              </div>

              <Button
                type="submit"
                isLoading={loading}
                className={`w-full text-white font-bold h-11 text-sm cursor-pointer transition-colors ${
                  selectedRole === 'admin'
                    ? 'bg-emerald-900 hover:bg-emerald-950'
                    : selectedRole === 'student'
                      ? 'bg-indigo-600 hover:bg-indigo-700'
                      : 'bg-[#1B5E20] hover:bg-[#144818]'
                }`}
              >
                Sign In as {selectedRole.toUpperCase()}
              </Button>
            </form>
          </CardContent>

          {/* Quick 1-Click Demo Section */}
          <div className="bg-[#F8F9F5] p-3.5 border-t border-gray-100 rounded-b-xl space-y-2">
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center">
              Instant 1-Click Demo Login
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleQuickDemo('farmer')}
                className="w-full text-[11px] font-bold gap-1 bg-white hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 py-2 cursor-pointer h-auto flex flex-col items-center"
              >
                <UserCheck className="h-3.5 w-3.5 text-emerald-700" />
                <span>Farmer</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleQuickDemo('student')}
                className="w-full text-[11px] font-bold gap-1 bg-white hover:bg-indigo-50 hover:text-indigo-800 hover:border-indigo-300 py-2 cursor-pointer h-auto flex flex-col items-center"
              >
                <GraduationCap className="h-3.5 w-3.5 text-indigo-700" />
                <span>Student</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleQuickDemo('admin')}
                className="w-full text-[11px] font-bold gap-1 bg-white hover:bg-emerald-100 hover:text-emerald-950 hover:border-emerald-400 py-2 cursor-pointer h-auto flex flex-col items-center"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-800" />
                <span>Admin</span>
              </Button>
            </div>
          </div>
        </Card>

        <p className="text-center text-xs text-gray-500">
          New to KrishiMitra?{' '}
          <Link to="/register" className="font-bold text-[#1B5E20] hover:underline">
            Register your Farm or Student Account
          </Link>
        </p>
      </div>
    </div>
  )
}
