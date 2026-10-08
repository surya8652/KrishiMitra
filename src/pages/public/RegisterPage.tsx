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
import { 
  Sprout, 
  Phone, 
  User, 
  Lock, 
  MapPin, 
  CheckCircle, 
  ArrowRight, 
  AlertCircle,
  GraduationCap,
  BookOpen
} from 'lucide-react'

export const RegisterPage: React.FC = () => {
  const { signUpWithSupabase, showToast, t, language, setLanguage } = useApp()
  const navigate = useNavigate()

  const [selectedRole, setSelectedRole] = useState<'farmer' | 'student'>('farmer')
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
    // Farmer fields
    landSize: '2',
    landUnit: 'acres' as const,
    soilType: 'Medium Black Clayey Loam',
    mainCrop: 'Tomato',
    // Student fields
    stream: 'Class 12 - Science (PCM)',
    targetCareer: 'Architecture (B.Arch) / Civil Engineering',
    classLevel: 'Class 12'
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
      if (selectedRole === 'farmer') {
        const res = await signUpWithSupabase({
          emailOrPhone: formData.phone,
          password: formData.password,
          name: formData.name,
          role: 'farmer',
          village: formData.village || 'Kisan Village',
          district: formData.district,
          state: formData.state,
          landSize: parseFloat(formData.landSize) || 2,
          soilType: formData.soilType,
          mainCrops: [formData.mainCrop || 'Tomato']
        })

        if (res.success) {
          showToast(`Welcome to KrishiMitra, ${formData.name}! Farmer account created.`)
          navigate('/farmer')
        } else {
          setErrorMessage(res.error || 'Failed to complete registration')
        }
      } else {
        // Student registration
        const res = await signUpWithSupabase({
          emailOrPhone: formData.phone,
          password: formData.password,
          name: formData.name,
          role: 'student',
          district: formData.district,
          state: formData.state
        })

        if (res.success) {
          showToast(`Welcome to KrishiMitra, ${formData.name}! Student Career account created.`)
          navigate('/students')
        } else {
          setErrorMessage(res.error || 'Failed to complete registration')
        }
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Registration error')
    } finally {
      setLoading(false)
    }
  }

  const handleSkipDetails = async () => {
    setLoading(true)
    setErrorMessage(null)

    try {
      const res = await signUpWithSupabase({
        emailOrPhone: formData.phone,
        password: formData.password,
        name: formData.name,
        role: selectedRole,
        district: formData.district,
        state: formData.state
      })

      if (res.success) {
        showToast(`Welcome to KrishiMitra, ${formData.name}!`)
        if (selectedRole === 'student') {
          navigate('/students')
        } else {
          navigate('/farmer')
        }
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
            <div className={`mx-auto h-12 w-12 rounded-xl flex items-center justify-center text-white mb-2 shadow-sm ${
              selectedRole === 'student' ? 'bg-indigo-600' : 'bg-[#1B5E20]'
            }`}>
              {selectedRole === 'student' ? (
                <GraduationCap className="h-6 w-6" />
              ) : (
                <Sprout className="h-6 w-6" />
              )}
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              {step === 1 
                ? (selectedRole === 'farmer' ? 'Create Farmer Account' : 'Create Student Account')
                : (selectedRole === 'farmer' ? 'Tell Us About Your Farm' : 'Your Academic Stream & Goals')
              }
            </CardTitle>
            <CardDescription className="text-gray-600 text-xs">
              {step === 1 
                ? 'Join thousands of farmers and students across rural and urban India'
                : (selectedRole === 'farmer' ? 'Localize weather, soil advice, and mandi intelligence' : 'Personalize your career roadmap, engineering & architecture guidance')
              }
            </CardDescription>

            {/* Position Selector at Step 1 */}
            {step === 1 && (
              <div className="pt-3">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5 text-left">
                  I want to register as:
                </label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('farmer')}
                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedRole === 'farmer'
                        ? 'bg-white text-[#1B5E20] shadow-xs'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Sprout className="h-4 w-4" />
                    <span>Farmer (शेतकरी)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole('student')}
                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedRole === 'student'
                        ? 'bg-white text-indigo-700 shadow-xs'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <GraduationCap className="h-4 w-4" />
                    <span>Student (विद्यार्थी)</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step progress dots */}
            <div className="pt-2 flex items-center justify-center gap-2">
              <span className={`h-2 w-8 rounded-full ${step >= 1 ? (selectedRole === 'student' ? 'bg-indigo-600' : 'bg-[#1B5E20]') : 'bg-gray-200'}`} />
              <span className={`h-2 w-8 rounded-full ${step === 2 ? (selectedRole === 'student' ? 'bg-indigo-600' : 'bg-[#1B5E20]') : 'bg-gray-200'}`} />
            </div>
          </CardHeader>

          <CardContent className="pt-3">
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2 text-xs text-rose-800">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            {step === 1 ? (
              <form onSubmit={handleStep1Submit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Your Full Name
                  </label>
                  <Input
                    type="text"
                    placeholder={selectedRole === 'farmer' ? "e.g. Ramesh Singh / Rajesh Patil" : "e.g. Pooja Deshmukh / Amit Verma"}
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
                  className={`w-full text-white font-bold h-11 text-sm gap-2 cursor-pointer ${
                    selectedRole === 'student' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-[#1B5E20] hover:bg-[#144818]'
                  }`}
                >
                  <span>Continue to Step 2</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            ) : selectedRole === 'farmer' ? (
              // Farmer Step 2 Form
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
                    className="w-full bg-[#1B5E20] hover:bg-[#144818] text-white font-bold h-11 text-sm cursor-pointer"
                  >
                    Complete Farmer Registration
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleSkipDetails}
                    disabled={loading}
                    className="w-full text-xs text-gray-500 hover:text-gray-900 cursor-pointer"
                  >
                    Skip farm details for now
                  </Button>
                </div>
              </form>
            ) : (
              // Student Step 2 Form
              <form onSubmit={handleFinish} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Current Class / Level
                  </label>
                  <select
                    value={formData.classLevel}
                    onChange={(e) => setFormData({ ...formData, classLevel: e.target.value })}
                    className="w-full h-11 rounded-xl border border-gray-300 px-3 bg-white text-sm"
                  >
                    <option value="Class 10">Class 10 (Secondary School)</option>
                    <option value="Class 11">Class 11 (Junior College / High School)</option>
                    <option value="Class 12">Class 12 (Board Prep / Senior School)</option>
                    <option value="Polytechnic / Diploma">Polytechnic / Diploma</option>
                    <option value="Undergraduate (B.Tech / B.Sc / B.Arch)">Undergraduate Degree</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Academic Stream
                  </label>
                  <select
                    value={formData.stream}
                    onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                    className="w-full h-11 rounded-xl border border-gray-300 px-3 bg-white text-sm"
                  >
                    <option value="Class 12 - Science (PCM)">Science - Physics, Chemistry, Maths (PCM)</option>
                    <option value="Class 12 - Science (PCB)">Science - Physics, Chemistry, Biology (PCB)</option>
                    <option value="Class 12 - Science (PCMB)">Science - Both Maths & Biology (PCMB)</option>
                    <option value="Commerce with Maths">Commerce with Maths</option>
                    <option value="Arts / Humanities">Arts / Humanities with Design</option>
                    <option value="Diploma in Engineering">Diploma in Engineering / Architectural Draughtsman</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Primary Target Career Interest
                  </label>
                  <select
                    value={formData.targetCareer}
                    onChange={(e) => setFormData({ ...formData, targetCareer: e.target.value })}
                    className="w-full h-11 rounded-xl border border-gray-300 px-3 bg-white text-sm"
                  >
                    <option value="Architecture (B.Arch) / Interior Design">Architecture (B.Arch) & Building Design (NATA / JEE Paper 2)</option>
                    <option value="Civil & Structural Engineering">Civil & Structural Engineering (JEE / MHT-CET)</option>
                    <option value="Computer Science & AI Engineering">Computer Science & AI Engineering</option>
                    <option value="Agricultural Engineering & Agritech">Agricultural Engineering & Agritech</option>
                    <option value="Mechanical & Mechatronics">Mechanical & Robotics Engineering</option>
                    <option value="Pure Mathematics & Data Science">Pure Mathematics & Data Science</option>
                  </select>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <Button
                    type="submit"
                    isLoading={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-11 text-sm cursor-pointer"
                  >
                    Complete Student Registration
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleSkipDetails}
                    disabled={loading}
                    className="w-full text-xs text-gray-500 hover:text-gray-900 cursor-pointer"
                  >
                    Skip stream details for now
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
