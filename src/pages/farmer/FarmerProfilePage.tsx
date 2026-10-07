import React, { useState } from 'react'
import { useApp } from '@/context/AppContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SUPPORTED_LANGUAGES } from '@/data/mockData'
import { ALL_INDIA_STATES } from '@/data/indiaLocations'
import { SupportedLanguage } from '@/types'
import { 
  User, 
  MapPin, 
  Phone, 
  Languages, 
  Sprout, 
  Layers, 
  ShieldCheck, 
  Save, 
  Edit3,
  Calendar
} from 'lucide-react'

export const FarmerProfilePage: React.FC = () => {
  const { farmer, updateFarmer, showToast } = useApp()
  const [isEditing, setIsEditing] = useState(false)

  const [name, setName] = useState(farmer.name)
  const [phone, setPhone] = useState(farmer.phone)
  const [village, setVillage] = useState(farmer.village)
  const [district, setDistrict] = useState(farmer.district)
  const [state, setState] = useState(farmer.state)
  const [landSize, setLandSize] = useState(String(farmer.landSize))
  const [soilType, setSoilType] = useState(farmer.soilType)
  const [mainCrop, setMainCrop] = useState(farmer.mainCrops[0] || 'Tomato')
  const [prefLang, setPrefLang] = useState<SupportedLanguage>(farmer.preferredLanguage)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    updateFarmer({
      name,
      phone,
      village,
      district,
      state,
      landSize: parseFloat(landSize) || 2,
      soilType,
      mainCrops: [mainCrop],
      preferredLanguage: prefLang
    })
    setIsEditing(false)
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            My Farmer Profile
          </h1>
          <p className="text-sm text-gray-600">
            Manage your personal farm identity and regional preferences.
          </p>
        </div>

        <Button
          variant={isEditing ? 'outline' : 'default'}
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
          className={`gap-1.5 font-bold cursor-pointer ${
            !isEditing ? 'bg-[#1B5E20] hover:bg-[#144818] text-white' : ''
          }`}
        >
          <Edit3 className="h-4 w-4" />
          <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
        </Button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
        {/* Profile Card Header Banner */}
        <div className="bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] p-6 text-white flex flex-col sm:flex-row items-center gap-4">
          <img
            src={farmer.avatar || "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=250&q=80"}
            alt={farmer.name}
            className="h-20 w-20 rounded-full object-cover border-4 border-white shadow-md shrink-0"
          />
          <div className="text-center sm:text-left space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h2 className="text-2xl font-black">{farmer.name}</h2>
              <Badge variant="success" className="bg-white/20 text-white border-white/30">
                Verified Farmer
              </Badge>
            </div>
            <p className="text-xs text-emerald-100 flex items-center justify-center sm:justify-start gap-1">
              <MapPin className="h-3.5 w-3.5" />
              <span>{farmer.village}, {farmer.district}, {farmer.state}</span>
            </p>
            <p className="text-[11px] text-emerald-200 flex items-center justify-center sm:justify-start gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>Member since June 2025</span>
            </p>
          </div>
        </div>

        {/* Content Details / Edit Form */}
        <div className="p-6">
          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Full Name / नाव
                  </label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Phone Number / मोबाईल
                  </label>
                  <Input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Village / गाव
                  </label>
                  <Input
                    type="text"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    State / राज्य
                  </label>
                  <select
                    value={state}
                    onChange={(e) => {
                      const newSt = e.target.value
                      const stObj = ALL_INDIA_STATES.find(s => s.name === newSt)
                      const firstDist = stObj?.districts[0]?.name || district
                      setState(newSt)
                      setDistrict(firstDist)
                    }}
                    className="w-full h-10 rounded-xl border border-gray-300 px-3 bg-white text-sm"
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
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full h-10 rounded-xl border border-gray-300 px-3 bg-white text-sm"
                  >
                    {(ALL_INDIA_STATES.find(s => s.name === state)?.districts || []).map((d) => (
                      <option key={d.name} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Land Size (Acres)
                  </label>
                  <Input
                    type="number"
                    step="0.5"
                    value={landSize}
                    onChange={(e) => setLandSize(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Main Crop Grown
                  </label>
                  <select
                    value={mainCrop}
                    onChange={(e) => setMainCrop(e.target.value)}
                    className="w-full h-12 rounded-lg border border-gray-300 px-3 bg-white text-sm"
                  >
                    <option value="Tomato">Tomato</option>
                    <option value="Onion">Onion</option>
                    <option value="Soybean">Soybean</option>
                    <option value="Cotton">Cotton</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Rice">Rice</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Soil Type
                  </label>
                  <select
                    value={soilType}
                    onChange={(e) => setSoilType(e.target.value)}
                    className="w-full h-12 rounded-lg border border-gray-300 px-3 bg-white text-sm"
                  >
                    <option value="Medium Black Clayey Loam">Black Clayey Loam</option>
                    <option value="Red Sandy Loam">Red Sandy Loam</option>
                    <option value="Alluvial River Loam">Alluvial River Loam</option>
                    <option value="Laterite / Murrum Soil">Laterite Soil</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Preferred App Language
                </label>
                <select
                  value={prefLang}
                  onChange={(e) => setPrefLang(e.target.value as SupportedLanguage)}
                  className="w-full h-12 rounded-lg border border-gray-300 px-3 bg-white text-sm"
                >
                  {SUPPORTED_LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.nativeName} ({l.label})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  className="text-xs font-bold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#1B5E20] hover:bg-[#144818] text-white text-xs font-bold gap-1.5"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#F8F9F5] border border-gray-200 space-y-1">
                  <span className="text-xs text-gray-400 font-bold uppercase flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-[#1B5E20]" />
                    Mobile Number
                  </span>
                  <p className="text-base font-bold text-gray-900">{farmer.phone}</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8F9F5] border border-gray-200 space-y-1">
                  <span className="text-xs text-gray-400 font-bold uppercase flex items-center gap-1.5">
                    <Languages className="h-3.5 w-3.5 text-[#1B5E20]" />
                    Preferred Language
                  </span>
                  <p className="text-base font-bold text-gray-900">
                    {SUPPORTED_LANGUAGES.find(l => l.code === farmer.preferredLanguage)?.nativeName || 'मराठी'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8F9F5] border border-gray-200 space-y-1">
                  <span className="text-xs text-gray-400 font-bold uppercase flex items-center gap-1.5">
                    <Sprout className="h-3.5 w-3.5 text-[#1B5E20]" />
                    Main Crops
                  </span>
                  <p className="text-base font-bold text-gray-900">{farmer.mainCrops.join(', ')}</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8F9F5] border border-gray-200 space-y-1">
                  <span className="text-xs text-gray-400 font-bold uppercase flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 text-[#1B5E20]" />
                    Land Holding & Soil
                  </span>
                  <p className="text-base font-bold text-gray-900">
                    {farmer.landSize} {farmer.landUnit} • {farmer.soilType}
                  </p>
                </div>
              </div>

              {/* Verified Agricultural Identity */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-[#1B5E20] shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-[#144818]">Pradhan Mantri Fasal Bima Linked</h4>
                  <p className="text-xs text-emerald-800">
                    Your land plot is verified for PM-Kisan subsidy alerts and localized weather insurance payouts.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
