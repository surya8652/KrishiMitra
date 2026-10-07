import React, { useState } from 'react'
import { useApp } from '@/context/AppContext'
import { farmService } from '@/services'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FarmingAdviceRecommendation } from '@/types'
import { 
  Sprout, 
  MapPin, 
  Calendar, 
  Layers, 
  CloudRain, 
  Droplet, 
  CheckCircle2, 
  Download, 
  BookmarkCheck, 
  AlertCircle,
  HelpCircle,
  FileText
} from 'lucide-react'
import { pdfGenerator } from '@/lib/pdfGenerator'

export const SmartFarmingPage: React.FC = () => {
  const { farmer, addFarmAdvice, showToast } = useApp()

  const [location, setLocation] = useState(`${farmer.village}, ${farmer.district}`)
  const [soilType, setSoilType] = useState(farmer.soilType)
  const [crop, setCrop] = useState(farmer.mainCrops[0] || 'Tomato')
  const [season, setSeason] = useState('Rabi (Winter Planting)')
  const [landSize, setLandSize] = useState(String(farmer.landSize))
  const [rainfallCondition, setRainfallCondition] = useState('Moderate Expected (Thunderstorm Season)')

  const [loading, setLoading] = useState(false)
  const [recommendation, setRecommendation] = useState<FarmingAdviceRecommendation | null>(() => {
    const existing = farmService.getAdviceList()
    return existing.length > 0 ? existing[0] : null
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const generated = await farmService.generateAdvice({
        location,
        soilType,
        crop,
        season,
        landSize,
        rainfallCondition
      })
      setRecommendation(generated)
      addFarmAdvice(generated)
      showToast('Personalized farming advice generated!')
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadPdf = () => {
    if (!recommendation) return
    try {
      const fileName = pdfGenerator.downloadCropAdviceReport(recommendation, farmer)
      showToast(`Downloaded advisory PDF: ${fileName}`)
    } catch (err) {
      console.error(err)
      window.print()
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-[#E8F5E9] text-[#1B5E20]">
            <Sprout className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Get Advice for Your Farm
            </h1>
            <p className="text-sm text-gray-600">
              Tell us about your soil and crops to receive tailored seasonal agricultural recommendations.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Simple Guided Form with Large Controls */}
        <div className="lg:col-span-5 no-print">
          <Card className="border-[#D1D5DB] shadow-xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold text-gray-900">
                Farm Information Form
              </CardTitle>
              <CardDescription>
                Fill in your farm details below
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Location / ठिकाण
                  </label>
                  <Input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    icon={<MapPin className="h-4 w-4" />}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Soil Type / मातीचा प्रकार
                  </label>
                  <select
                    value={soilType}
                    onChange={(e) => setSoilType(e.target.value)}
                    className="w-full h-12 rounded-lg border border-[#D1D5DB] px-3.5 bg-white text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
                  >
                    <option value="Medium Black Clayey Loam">Medium Black Clayey Loam (काळी कसदार)</option>
                    <option value="Red Sandy Loam">Red Sandy Loam (तांबडी माती)</option>
                    <option value="Alluvial River Loam">Alluvial River Loam (गाळाची माती)</option>
                    <option value="Laterite / Murrum Soil">Laterite / Murrum Soil (मुरुमाड माती)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Crop / पीक
                    </label>
                    <select
                      value={crop}
                      onChange={(e) => setCrop(e.target.value)}
                      className="w-full h-12 rounded-lg border border-[#D1D5DB] px-3 bg-white text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
                    >
                      <option value="Tomato">Tomato (टोमॅटो)</option>
                      <option value="Onion">Onion (कांदा)</option>
                      <option value="Soybean">Soybean (सोयाबीन)</option>
                      <option value="Cotton">Cotton (कापूस)</option>
                      <option value="Wheat">Wheat (गहू)</option>
                      <option value="Rice">Rice (भात/तांदूळ)</option>
                      <option value="Sugarcane">Sugarcane (ऊस)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Land Size / एकर
                    </label>
                    <Input
                      type="number"
                      step="0.5"
                      value={landSize}
                      onChange={(e) => setLandSize(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Season / हंगाम
                  </label>
                  <select
                    value={season}
                    onChange={(e) => setSeason(e.target.value)}
                    className="w-full h-12 rounded-lg border border-[#D1D5DB] px-3.5 bg-white text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
                  >
                    <option value="Rabi (Winter Planting)">Rabi (Winter Planting / रब्बी)</option>
                    <option value="Kharif (Monsoon Season)">Kharif (Monsoon Season / खरीप)</option>
                    <option value="Zaid (Summer Season)">Zaid (Summer Crop / उन्हाळी)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Rainfall / Weather Situation
                  </label>
                  <select
                    value={rainfallCondition}
                    onChange={(e) => setRainfallCondition(e.target.value)}
                    className="w-full h-12 rounded-lg border border-[#D1D5DB] px-3.5 bg-white text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
                  >
                    <option value="Moderate Expected (Thunderstorm Season)">Moderate Expected (Thunderstorm Season)</option>
                    <option value="Deficit / Dry Spell (Water Conservation Needed)">Deficit / Dry Spell (Water Conservation Needed)</option>
                    <option value="Normal / Adequate Monsoon">Normal / Adequate Monsoon</option>
                    <option value="Heavy Rainfall Warning in Effect">Heavy Rainfall Warning in Effect</option>
                  </select>
                </div>

                <Button
                  type="submit"
                  isLoading={loading}
                  size="lg"
                  className="w-full bg-[#1B5E20] hover:bg-[#144818] text-white font-bold h-13 text-base cursor-pointer shadow-md"
                >
                  Get Advice for My Farm
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Advisory Output Card */}
        <div className="lg:col-span-7">
          {recommendation ? (
            <div className="bg-white rounded-2xl border border-[#D1D5DB] shadow-xs p-5 sm:p-6 space-y-6">
              {/* Top Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="success">Personalized Advisory</Badge>
                    <span className="text-xs text-gray-500 font-semibold">{recommendation.date}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-1">
                    {recommendation.recommendedAction}
                  </h2>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Target: {recommendation.crop} • {recommendation.landSize} • {recommendation.location}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 no-print">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleDownloadPdf}
                    className="gap-1.5 text-xs font-bold cursor-pointer"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download PDF Report</span>
                  </Button>
                  <Button
                    size="sm"
                    className="bg-[#1B5E20] hover:bg-[#144818] text-white text-xs font-bold gap-1.5 cursor-pointer"
                    onClick={() => showToast('Advisory saved to My Reports')}
                  >
                    <BookmarkCheck className="h-4 w-4" />
                    <span>Save Recommendation</span>
                  </Button>
                </div>
              </div>

              {/* 1. Why this recommendation? */}
              <div className="space-y-2">
                <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider flex items-center gap-2 text-[#1B5E20]">
                  <CheckCircle2 className="h-4 w-4 text-[#2E7D32]" />
                  Why this recommendation?
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {recommendation.whyRecommendation.map((point, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#F8F9F5] border border-gray-100 text-xs sm:text-sm text-gray-700 leading-relaxed flex items-start gap-2.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Expected considerations */}
              <div className="space-y-2">
                <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider flex items-center gap-2 text-amber-800">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  Expected Considerations & Watchouts
                </h3>
                <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 space-y-1.5">
                  {recommendation.expectedConsiderations.map((item, idx) => (
                    <p key={idx} className="text-xs sm:text-sm text-amber-950 flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{item}</span>
                    </p>
                  ))}
                </div>
              </div>

              {/* 3. Irrigation recommendation */}
              <div className="space-y-2">
                <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider flex items-center gap-2 text-blue-800">
                  <Droplet className="h-4 w-4 text-blue-600" />
                  Irrigation Recommendation
                </h3>
                <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200">
                  <p className="text-xs sm:text-sm text-blue-950 font-medium leading-relaxed">
                    {recommendation.irrigationRecommendation}
                  </p>
                </div>
              </div>

              {/* 4. Basic farming practices */}
              <div className="space-y-2">
                <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider flex items-center gap-2 text-gray-800">
                  <Layers className="h-4 w-4 text-gray-600" />
                  Basic Farming Practices
                </h3>
                <div className="space-y-2">
                  {recommendation.basicPractices.map((prac, idx) => (
                    <div key={idx} className="p-3 rounded-lg border border-gray-100 bg-white text-xs sm:text-sm text-gray-800 font-medium">
                      {prac}
                    </div>
                  ))}
                </div>
              </div>

              {/* Fertilizer note */}
              {recommendation.fertilizerTip && (
                <div className="p-3 rounded-xl bg-[#EFEBE9] border border-[#D7CCC8] text-xs sm:text-sm text-[#4E342E]">
                  <strong>Fertilizer / Nutrient Tip: </strong>
                  <span>{recommendation.fertilizerTip}</span>
                </div>
              )}

              {/* MANDATORY DISCLAIMER */}
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-500 flex items-start gap-2">
                <HelpCircle className="h-4 w-4 shrink-0 mt-0.5 text-gray-400" />
                <p>
                  <strong>Agricultural Guidance Note: </strong>
                  {recommendation.disclaimer}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center space-y-3">
              <Sprout className="h-12 w-12 mx-auto text-gray-300" />
              <h3 className="text-lg font-bold text-gray-800">No Guidance Generated Yet</h3>
              <p className="text-sm text-gray-500 max-w-sm mx-auto">
                Fill the farm information on the left and tap "Get Advice for My Farm".
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
