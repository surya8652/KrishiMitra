import React, { useState } from 'react'
import { useApp } from '@/context/AppContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogHeader, DialogBody, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { 
  Droplet, 
  CheckCircle2, 
  Clock, 
  CloudRain, 
  Calendar, 
  Plus, 
  HelpCircle,
  AlertTriangle,
  History,
  Sprout
} from 'lucide-react'

export const IrrigationPage: React.FC = () => {
  const { irrigationAdvice, recordWateredToday, farmer, showToast } = useApp()
  const [modalOpen, setModalOpen] = useState(false)
  const [crop, setCrop] = useState(farmer.mainCrops[0] || 'Tomato')
  const [waterMethod, setWaterMethod] = useState('Drip Irrigation')
  const [waterAmount, setWaterAmount] = useState('1,200 Litres')

  const handleWateredSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    recordWateredToday(crop, waterMethod, waterAmount)
    setModalOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-blue-100 text-blue-800">
            <Droplet className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Watering Advice
            </h1>
            <p className="text-sm text-gray-600">
              Smart watering recommendations based on crop stage, soil moisture, and weather forecast.
            </p>
          </div>
        </div>

        <Button
          onClick={() => setModalOpen(true)}
          className="bg-[#1B5E20] hover:bg-[#144818] text-white font-bold gap-2 cursor-pointer shadow-sm"
        >
          <Plus className="h-4 w-4" />
          <span>Record Watered Today</span>
        </Button>
      </div>

      {/* Main Watering Status Card */}
      <div className="bg-white rounded-3xl border-2 border-emerald-600/30 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="success">Current Advice</Badge>
              <span className="text-xs text-gray-400 font-medium">Plot: {farmer.village} (2 Acres)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              {irrigationAdvice.recommendation}
            </h2>
          </div>

          <div className="bg-[#E8F5E9] px-4 py-2.5 rounded-2xl border border-[#A5D6A7] text-center shrink-0">
            <span className="text-xs font-bold text-[#1B5E20] uppercase block">Soil Moisture</span>
            <span className="text-xl font-black text-[#144818]">{irrigationAdvice.soilMoistureLevel}</span>
          </div>
        </div>

        {/* Why this recommendation? */}
        <div className="space-y-2">
          <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider flex items-center gap-2 text-[#1B5E20]">
            <CheckCircle2 className="h-4 w-4 text-[#2E7D32]" />
            Why this advice?
          </h3>
          <div className="p-4 rounded-xl bg-[#F8F9F5] border border-gray-200">
            <p className="text-sm text-gray-700 leading-relaxed font-medium">
              {irrigationAdvice.whyReason}
            </p>
          </div>
        </div>

        {/* Current Farm Field Conditions Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
            <span className="text-[11px] font-bold text-gray-400 uppercase block">Crop Variety</span>
            <span className="text-sm font-bold text-gray-900 mt-1 block">{irrigationAdvice.crop}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
            <span className="text-[11px] font-bold text-gray-400 uppercase block">Soil Type</span>
            <span className="text-sm font-bold text-gray-900 mt-1 block">{irrigationAdvice.soil.split('(')[0]}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
            <span className="text-[11px] font-bold text-gray-400 uppercase block">Recent Rainfall</span>
            <span className="text-sm font-bold text-gray-900 mt-1 block">{irrigationAdvice.recentRainfall}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
            <span className="text-[11px] font-bold text-gray-400 uppercase block">Weather Condition</span>
            <span className="text-sm font-bold text-gray-900 mt-1 block">{irrigationAdvice.weatherSummary.split('—')[0]}</span>
          </div>
        </div>

        {/* Timing Status Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#FFF8E1] border border-[#FFE082] text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-amber-950 font-medium">
            <Clock className="h-4 w-4 text-amber-700" />
            <span><strong>Last Irrigated: </strong> {irrigationAdvice.lastIrrigated}</span>
          </div>

          <div className="flex items-center gap-2 text-amber-950 font-medium">
            <Calendar className="h-4 w-4 text-amber-700" />
            <span><strong>Next Recommended Inspection: </strong> {irrigationAdvice.nextCheck}</span>
          </div>
        </div>
      </div>

      {/* Personal Irrigation Logbook (Farmer's Own History) */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-[#1B5E20]" />
            <h3 className="font-extrabold text-lg text-gray-900">
              Personal Watering Logbook
            </h3>
          </div>
          <span className="text-xs text-gray-500 font-semibold">
            {irrigationAdvice.logs.length} Recorded Cycles
          </span>
        </div>

        <div className="divide-y divide-gray-100">
          {irrigationAdvice.logs.map((log) => (
            <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#F8F9F5] px-2 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                  <Droplet className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{log.crop} — {log.method}</h4>
                  <p className="text-xs text-gray-500">{log.notes || 'Normal cycle'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-right">
                <div>
                  <span className="text-xs font-bold text-gray-900 block">{log.waterAmount}</span>
                  <span className="text-[11px] text-gray-400">{log.date}</span>
                </div>
                <Badge variant="success" className="text-[11px]">
                  {log.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dialog Modal to Record Watering */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogHeader
          title="Record Farm Watering"
          description="Log today's watering session into your farm logbook."
          onClose={() => setModalOpen(false)}
        />
        <form onSubmit={handleWateredSubmit}>
          <DialogBody>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Crop Watered / पीक
              </label>
              <select
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full h-11 rounded-lg border border-gray-300 px-3 bg-white text-sm"
              >
                {farmer.mainCrops.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Irrigation Method
              </label>
              <select
                value={waterMethod}
                onChange={(e) => setWaterMethod(e.target.value)}
                className="w-full h-11 rounded-lg border border-gray-300 px-3 bg-white text-sm"
              >
                <option value="Drip Irrigation ( ठिबक सिंचन )">Drip Irrigation (ठिबक सिंचन)</option>
                <option value="Sprinkler Irrigation ( तुषार सिंचन )">Sprinkler Irrigation (तुषार सिंचन)</option>
                <option value="Furrow / Channel Watering ( पाट पाणी )">Furrow / Channel Watering (पाट पाणी)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Approx. Water Delivered / वेळ
              </label>
              <Input
                type="text"
                placeholder="e.g. 1,200 Litres or 45 mins"
                value={waterAmount}
                onChange={(e) => setWaterAmount(e.target.value)}
                required
              />
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setModalOpen(false)}
              className="text-xs font-bold"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#1B5E20] hover:bg-[#144818] text-white text-xs font-bold"
            >
              Save to Farm Book
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  )
}
