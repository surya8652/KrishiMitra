import React, { useState } from 'react'
import { useApp } from '@/context/AppContext'
import { ALL_INDIA_AGRICULTURAL_STATES } from '@/data/allIndiaLocations'
import { Dialog, DialogHeader, DialogBody, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { MapPin, Check, Sprout } from 'lucide-react'

export const LocationSelectorModal: React.FC<{
  open: boolean
  onOpenChange: (open: boolean) => void
}> = ({ open, onOpenChange }) => {
  const { farmer, updateFarmer, showToast } = useApp()

  const [selectedState, setSelectedState] = useState(farmer.state || 'Maharashtra')
  const [selectedDistrict, setSelectedDistrict] = useState(farmer.district || 'Nashik')

  const stateProfile = ALL_INDIA_AGRICULTURAL_STATES.find(s => s.state === selectedState) || ALL_INDIA_AGRICULTURAL_STATES[0]

  const handleStateChange = (stateName: string) => {
    setSelectedState(stateName)
    const nextState = ALL_INDIA_AGRICULTURAL_STATES.find(s => s.state === stateName)
    if (nextState && nextState.districts.length > 0) {
      setSelectedDistrict(nextState.districts[0].name)
    }
  }

  const handleApply = () => {
    const districtInfo = stateProfile.districts.find(d => d.name === selectedDistrict) || stateProfile.districts[0]

    updateFarmer({
      state: selectedState,
      district: selectedDistrict,
      soilType: districtInfo.soilType,
      mainCrops: districtInfo.majorCrops
    })

    showToast(`Location updated to ${selectedDistrict}, ${selectedState}. Farm telemetry refreshed!`)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader
        title="Select Your Farm Location (All-India)"
        description="Choose your state and district to view hyper-local weather, mandi prices, and crop guidance."
        onClose={() => onOpenChange(false)}
      />
      <DialogBody>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
              1. Select State / राज्य निवडा:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-1 border border-gray-200 rounded-xl">
              {ALL_INDIA_AGRICULTURAL_STATES.map((s) => {
                const isSelected = s.state === selectedState
                return (
                  <button
                    key={s.state}
                    type="button"
                    onClick={() => handleStateChange(s.state)}
                    className={`flex items-center justify-between p-2.5 rounded-lg text-xs font-bold text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#1B5E20] text-white shadow-xs'
                        : 'bg-gray-50 text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    <span>{s.state}</span>
                    {isSelected && <Check className="h-3.5 w-3.5" />}
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
              2. Select Agricultural District / जिल्हा:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {stateProfile.districts.map((d) => {
                const isSelected = d.name === selectedDistrict
                return (
                  <button
                    key={d.name}
                    type="button"
                    onClick={() => setSelectedDistrict(d.name)}
                    className={`p-2.5 rounded-lg text-xs font-bold text-left border transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-[#1B5E20] bg-emerald-50 text-[#1B5E20]'
                        : 'border-gray-200 bg-white text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{d.name}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* District Preview Box */}
          {selectedDistrict && (
            <div className="p-3.5 rounded-xl bg-[#F8F9F5] border border-gray-200 text-xs space-y-1.5">
              <div className="flex items-center gap-1 text-[#1B5E20] font-bold">
                <Sprout className="h-4 w-4" />
                <span>Primary Crops in {selectedDistrict}:</span>
              </div>
              <p className="font-semibold text-gray-900">
                {stateProfile.districts.find(d => d.name === selectedDistrict)?.majorCrops.join(', ')}
              </p>
              <p className="text-[11px] text-gray-500">
                Soil Profile: {stateProfile.districts.find(d => d.name === selectedDistrict)?.soilType}
              </p>
            </div>
          )}
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={() => onOpenChange(false)}
          className="text-xs font-bold"
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={handleApply}
          className="bg-[#1B5E20] hover:bg-[#144818] text-white text-xs font-bold"
        >
          Set Location
        </Button>
      </DialogFooter>
    </Dialog>
  )
}
