import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '@/context/AppContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { LanguageSelector } from '@/components/LanguageSelector'
import { SUPPORTED_LANGUAGES } from '@/data/mockData'
import { ALL_INDIA_STATES } from '@/data/indiaLocations'
import { SupportedLanguage } from '@/types'
import { Sprout, Phone, User, Lock, MapPin, CheckCircle, ArrowRight, AlertCircle } from 'lucide-react'

export const RegisterPage: React.FC = () => {
  const { signUpWithSupabase, updateFarmer, setRole, showToast, t, language, setLanguage } = useApp()
  const navigate = useNavigate()

  const [step, setStep] = useState<1 | 2>(1)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    prefLang: language,
    state: 'Maharashtra',
    district: 'Nashik',
    village: '',
    landSize: '2',
    landUnit: 'acres' as const,
    soilType: 'Medium Black Clayey Loam',
    mainCrop: 'Tomato'
  })

  const currentState = ALL_INDIA_STATES.find(s => s.name === formData.state) || ALL_INDIA_STATES[0]

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone || !formData.password) {
      setErrorMessage('Please fill in name, mobile number and password')
      return
    }
    setErrorMessage(null)
    setStep(2)
  }

  const handleFinish = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage(null)

    try {
      const res = await signUpWithSupabase({
        emailOrPhone: formData.phone,
        password: formData.password,
        name: formData.name,
        village: formData.village || 'Kisan Village',
        district: formData.district,
        state: formData.state,
        landSize: parseFloat(formData.landSize) || 2,
        soilType: formData.soilType,
        mainCrops: [formData.mainCrop || 'Tomato']
      })

      if (res.success) {
        showToast(`Welcome to KrishiMitra, ${formData.name}! Account registered with Supabase.`)
        navigate('/farmer')
      } else {
        setErrorMessage(res.error || 'Failed to complete registration')
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Registration error')
    } finally {
      setLoading(false)
    }
  }

  const handleSkipFarmDetails = async () => {
    setLoading(true)
    setErrorMessage(null)

    try {
      const res = await signUpWithSupabase({
        emailOrPhone: formData.phone,
        password: formData.password,
        name: formData.name,
        district: formData.district,
        state: formData.state
      })

      if (res.success) {
        showToast(`Welcome to KrishiMitra, ${formData.name}!`)
        navigate('/farmer')
      } else {
        setErrorMessage(res.error || 'Registration failed')
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Registration error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-lg space-y-4">
        <div className="flex justify-between items-center px-1">
          <Link to="/" className="text-xs font-semibold text-gray-500 hover:text-[#1B5E20] flex items-center gap-1">
            ← {t.backToHome}
          </Link>
          <LanguageSelector compact />
        </div>

        <Card className="border-[#D1D5DB] shadow-md">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto h-12 w-12 rounded-xl bg-[#1B5E20] flex items-center justify-center text-white mb-2 shadow-sm">
              <Sprout className="h-6 w-6" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              {step === 1 ? 'Create Farmer Account' : 'Tell Us About Your Farm'}
            </CardTitle>
            <CardDescription className="text-gray-600 text-sm">
              {step === 1 
                ? 'Join thousands of farmers across India using KrishiMitra AI'
                : 'Localize weather, soil advice, and mandi intelligence to your plot'}
            </CardDescription>

            {/* Supabase Status & Step progress */}
            <div className="pt-2 flex items-center justify-center gap-3">
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-emerald-600" />
                Supabase Connected
              </span>
              <div className="flex items-center gap-1">
                <span className={`h-2 w-8 rounded-full ${step >= 1 ? 'bg-[#1B5E20]' : 'bg-gray-200'}`} />
                <span className={`h-2 w-8 rounded-full ${step === 2 ? 'bg-[#1B5E20]' : 'bg-gray-200'}`} />
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-4">
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2 text-xs text-rose-800">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            {step === 1 ? (
              <form onSubmit={handleStep1Submit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Your Full Name
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g. Ramesh Singh / Rajesh Patil"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    icon={<User className="h-4 w-4" />}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Mobile Number
                  </label>
                  <Input
                    type="tel"
                    placeholder="10-digit mobile number (e.g. 9822045678)"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    icon={<Phone className="h-4 w-4" />}
                    required
                  />
                </div>

                {/* State & District Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      State / राज्य
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => {
                        const newSt = e.target.value
                        const stObj = ALL_INDIA_STATES.find(s => s.name === newSt)
                        const firstDist = stObj?.districts[0]?.name || ''
                        setFormData({
                          ...formData,
                          state: newSt,
                          district: firstDist
                        })
                      }}
                      className="w-full h-11 rounded-xl border border-gray-300 px-3 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
                    >
                      {ALL_INDIA_STATES.map((st) => (
                        <option key={st.name} value={st.name}>
                          {st.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      District / जिल्हा
                    </label>
                    <select
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full h-11 rounded-xl border border-gray-300 px-3 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
                    >
                      {currentState.districts.map((d) => (
                        <option key={d.name} value={d.name}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Preferred Language
                  </label>
                  <select
                    value={formData.prefLang}
                    onChange={(e) => {
                      const newLang = e.target.value as SupportedLanguage
                      setFormData({ ...formData, prefLang: newLang })
                      setLanguage(newLang)
                    }}
                    className="w-full h-11 rounded-xl border border-gray-300 px-3 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
                  >
                    {SUPPORTED_LANGUAGES.map((l) => (
                      <option key={l.code} value={l.code}>
                        {l.nativeName} ({l.label})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Create Password
                  </label>
                  <Input
                    type="password"
                    placeholder="Minimum 6 characters"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    icon={<Lock className="h-4 w-4" />}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#1B5E20] hover:bg-[#144818] text-white font-bold h-12 text-base gap-2 cursor-pointer"
                >
                  <span>Continue to Farm Details</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            ) : (
              <form onSubmit={handleFinish} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Village / Town Name
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g. Dindori, Pimpalgaon, Khanna"
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Land Size
                    </label>
                    <Input
                      type="number"
                      step="0.5"
                      placeholder="e.g. 2"
                      value={formData.landSize}
                      onChange={(e) => setFormData({ ...formData, landSize: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Unit
                    </label>
                    <select
                      value={formData.landUnit}
                      onChange={(e) => setFormData({ ...formData, landUnit: e.target.value as any })}
                      className="w-full h-11 rounded-xl border border-gray-300 px-3 bg-white text-sm"
                    >
                      <option value="acres">Acres (एकड)</option>
                      <option value="hectares">Hectares (हेक्टर)</option>
                      <option value="bigha">Bigha (बीघा)</option>
                      <option value="guntha">Guntha (गुंठा)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Soil Type in your Field
                  </label>
                  <select
                    value={formData.soilType}
                    onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                    className="w-full h-11 rounded-xl border border-gray-300 px-3 bg-white text-sm"
                  >
                    <option value="Medium Black Clayey Loam">Medium Black Clayey Loam (काळी माती)</option>
                    <option value="Deep Black Cotton Soil">Deep Black Cotton Soil</option>
                    <option value="Fertile Alluvial Loam">Fertile Alluvial Loam (गाळाची माती)</option>
                    <option value="Red Loamy Soil">Red Loamy Soil (तांबडी माती)</option>
                    <option value="Sandy Desert Loam">Sandy Desert Loam</option>
                    <option value="Laterite Mountain Soil">Laterite Mountain Soil</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Primary Sown Crop
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g. Tomato, Onion, Wheat, Rice, Cotton, Soybean"
                    value={formData.mainCrop}
                    onChange={(e) => setFormData({ ...formData, mainCrop: e.target.value })}
                  />
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <Button
                    type="submit"
                    isLoading={loading}
                    className="w-full bg-[#1B5E20] hover:bg-[#144818] text-white font-bold h-12 text-base cursor-pointer"
                  >
                    Complete Registration with Supabase
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleSkipFarmDetails}
                    disabled={loading}
                    className="w-full text-xs text-gray-500 hover:text-gray-900 cursor-pointer"
                  >
                    Skip farm details for now
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-xs text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-[#1B5E20] hover:underline">
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  )
}
