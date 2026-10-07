import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '@/context/AppContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { LanguageSelector } from '@/components/LanguageSelector'
import { Sprout, Phone, Lock, UserCheck, Shield, AlertCircle, CheckCircle } from 'lucide-react'

export const LoginPage: React.FC = () => {
  const { setRole, showToast, t, signInWithSupabase, isSupabaseConnected } = useApp()
  const navigate = useNavigate()
  const [identifier, setIdentifier] = useState('9822045678')
  const [password, setPassword] = useState('kisan1234')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage(null)

    try {
      const res = await signInWithSupabase(identifier, password)
      if (res.success) {
        showToast('Login successful with Supabase!')
        navigate('/farmer')
      } else {
        // If Supabase returned an error, show it clearly
        setErrorMessage(res.error || 'Authentication failed. Please verify credentials.')
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed connecting to login service')
    } finally {
      setLoading(false)
    }
  }

  const handleQuickDemoFarmer = () => {
    setRole('farmer')
    showToast('Logged in as Farmer: Rajesh Patil (Nashik)')
    navigate('/farmer')
  }

  const handleQuickDemoAdmin = () => {
    setRole('admin')
    showToast('Logged in as Admin: State Agricultural Directorate')
    navigate('/admin')
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

        <Card className="border-[#D1D5DB] shadow-md">
          <CardHeader className="text-center pb-3">
            <div className="mx-auto h-12 w-12 rounded-xl bg-[#1B5E20] flex items-center justify-center text-white mb-2 shadow-sm">
              <Sprout className="h-6 w-6" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              {t.login}
            </CardTitle>
            <CardDescription className="text-gray-600 text-sm">
              Enter your mobile number or email to access your farm records
            </CardDescription>

            {/* Supabase Connection Status Tag */}
            <div className="pt-2 flex justify-center">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <CheckCircle className="h-3 w-3 text-emerald-600" />
                Supabase Auth Connected
              </span>
            </div>
          </CardHeader>

          <CardContent>
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-800">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                  Mobile Number or Email
                </label>
                <Input
                  type="text"
                  placeholder="e.g. 9822045678 or farmer@example.com"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  icon={<Phone className="h-4 w-4" />}
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-gray-700 uppercase">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => showToast('Password reset link sent to registered contact')}
                    className="text-xs font-semibold text-[#1B5E20] hover:underline cursor-pointer"
                  >
                    Forgot Password?
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
                className="w-full bg-[#1B5E20] hover:bg-[#144818] text-white font-bold h-12 text-base cursor-pointer"
              >
                Sign In with Supabase
              </Button>
            </form>
          </CardContent>

          {/* Quick Demo Access Bar */}
          <div className="bg-[#F8F9F5] p-4 border-t border-gray-100 rounded-b-xl space-y-2">
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center">
              Or Try Quick Demo Access
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleQuickDemoFarmer}
                className="w-full text-xs font-bold gap-1 cursor-pointer"
              >
                <UserCheck className="h-3.5 w-3.5" />
                <span>Farmer Demo</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleQuickDemoAdmin}
                className="w-full text-xs font-bold gap-1 bg-white hover:bg-amber-50 hover:text-amber-800 hover:border-amber-300 cursor-pointer"
              >
                <Shield className="h-3.5 w-3.5 text-amber-700" />
                <span>Admin Demo</span>
              </Button>
            </div>
          </div>
        </Card>

        <p className="text-center text-xs text-gray-500">
          New to KrishiMitra?{' '}
          <Link to="/register" className="font-bold text-[#1B5E20] hover:underline">
            Register your Farm Account
          </Link>
        </p>
      </div>
    </div>
  )
}
