import React, { useState } from 'react'
import { ALL_INDIA_STATES, StateInfo, DistrictInfo } from '@/data/indiaLocations'
import { useApp } from '@/context/AppContext'
import { Dialog, DialogHeader, DialogBody, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Search, Check, Building2, Sprout } from 'lucide-react'

interface LocationPickerProps {
  open: boolean
  onClose: () => void
  onLocationSelected?: (district: string, state: string) => void
  canSetHome?: boolean
}

export const LocationPicker: React.FC<LocationPickerProps> = ({
  open,
  onClose,
  onLocationSelected,
  canSetHome = true
}) => {
  const { farmer, changeLocation, showToast } = useApp()
  const [selectedStateName, setSelectedStateName] = useState<string>(farmer.state || 'Maharashtra')
  const [searchQuery, setSearchQuery] = useState('')
  const [setAsHome, setSetAsHome] = useState(false)

  const selectedState = ALL_INDIA_STATES.find(s => s.name.toLowerCase() === selectedStateName.toLowerCase()) || ALL_INDIA_STATES[0]

  const filteredDistricts = selectedState.districts.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.majorCrops.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const handleSelectDistrict = (district: DistrictInfo) => {
    changeLocation(district.name, selectedState.name, setAsHome)
    if (onLocationSelected) {
      onLocationSelected(district.name, selectedState.name)
    }
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogHeader
        title="Select Location (All Over India)"
        description="Choose your State and District to view local weather advisories and APMC Mandi rates."
        onClose={onClose}
      />
      <DialogBody>
        <div className="space-y-4">
          {/* State Picker Buttons */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
              1. Select Indian State / Region
            </label>
            <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
              {ALL_INDIA_STATES.map((st) => (
                <button
                  key={st.name}
                  type="button"
                  onClick={() => {
                    setSelectedStateName(st.name)
                    setSearchQuery('')
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedStateName.toLowerCase() === st.name.toLowerCase()
                      ? 'bg-[#1B5E20] text-white shadow-xs'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {st.name}
                </button>
              ))}
            </div>
          </div>

          {/* Search District */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
              2. Choose District in {selectedState.name}
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search district or crop in ${selectedState.name}...`}
                className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1B5E20]"
              />
            </div>
          </div>

          {/* Districts Grid */}
          <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
            {filteredDistricts.length === 0 ? (
              <p className="text-xs text-gray-500 py-4 text-center">No district matched your search in {selectedState.name}.</p>
            ) : (
              filteredDistricts.map((district) => {
                const isCurrent = farmer.district.toLowerCase() === district.name.toLowerCase() &&
                                  farmer.state.toLowerCase() === selectedState.name.toLowerCase()

                return (
                  <div
                    key={district.name}
                    onClick={() => handleSelectDistrict(district)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all hover:border-[#1B5E20] hover:bg-[#F1F8F3] ${
                      isCurrent ? 'border-[#1B5E20] bg-[#E8F5E9]/50 ring-1 ring-[#1B5E20]' : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#1B5E20]" />
                        <span className="font-bold text-sm text-gray-900">{district.name}</span>
                        {isCurrent && (
                          <Badge variant="success" className="text-[10px] py-0 px-1.5">
                            My Farm Home
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs font-semibold text-[#1B5E20] flex items-center gap-1">
                        Select <Check className="h-3.5 w-3.5" />
                      </span>
                    </div>

                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-600">
                      <span className="flex items-center gap-1">
                        <Building2 className="h-3 w-3 text-gray-400" />
                        Mandi: <strong>{district.mandiName}</strong>
                      </span>
                      <span className="flex items-center gap-1">
                        <Sprout className="h-3 w-3 text-gray-400" />
                        Soil: {district.soilType}
                      </span>
                    </div>

                    <div className="mt-1 flex flex-wrap gap-1">
                      {district.majorCrops.map(c => (
                        <span key={c} className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {canSetHome && (
            <label className="flex items-center gap-2 pt-2 text-xs text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={setAsHome}
                onChange={(e) => setSetAsHome(e.target.checked)}
                className="rounded border-gray-300 text-[#1B5E20] focus:ring-[#1B5E20]"
              />
              <span>Set as my permanent home farm profile location</span>
            </label>
          )}
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="outline" size="sm" onClick={onClose}>
          Cancel
        </Button>
      </DialogFooter>
    </Dialog>
  )
}
