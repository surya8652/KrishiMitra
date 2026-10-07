import React, { useState } from 'react'
import { useApp } from '@/context/AppContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  MapPin, 
  BookmarkCheck, 
  Clock, 
  ArrowUpRight, 
  Store,
  Filter,
  CheckCircle2,
  Building2
} from 'lucide-react'

export const CropPricesPage: React.FC = () => {
  const { prices, farmer, showToast } = useApp()
  const [selectedState, setSelectedState] = useState<string>('All India')
  const [selectedCropId, setSelectedCropId] = useState<string>(prices[0]?.id || 'price_tomato')

  // Available states from prices dataset
  const availableStates = ['All India', ...Array.from(new Set(prices.map(p => p.state)))]

  // Filter crops by state if not All India
  const stateCrops = selectedState === 'All India' 
    ? prices 
    : prices.filter(p => p.state.toLowerCase() === selectedState.toLowerCase())

  // Ensure an active crop is always selected
  const activePrice = stateCrops.find(p => p.id === selectedCropId) || stateCrops[0] || prices[0]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-amber-100 text-amber-800">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Check Crop Prices (All-India Mandis)
            </h1>
            <p className="text-sm text-gray-600">
              Live APMC mandi rates, nearby market comparison, and price movement across India.
            </p>
          </div>
        </div>

        <Button
          size="sm"
          onClick={() => showToast(`Price alert for ${activePrice.crop} (${activePrice.market}) saved to My Reports`)}
          className="bg-[#1B5E20] hover:bg-[#144818] text-white font-bold gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <BookmarkCheck className="h-4 w-4" />
          <span>Save to My Reports</span>
        </Button>
      </div>

      {/* State Filter Bar */}
      <div className="bg-white p-3 rounded-2xl border border-gray-200 shadow-xs flex items-center gap-2 overflow-x-auto scrollbar-thin">
        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 shrink-0 pr-2 border-r border-gray-200">
          <Filter className="h-3.5 w-3.5 text-[#1B5E20]" />
          <span>Filter State:</span>
        </div>
        {availableStates.map((st) => (
          <button
            key={st}
            type="button"
            onClick={() => {
              setSelectedState(st)
              const firstInState = prices.find(p => st === 'All India' || p.state.toLowerCase() === st.toLowerCase())
              if (firstInState) setSelectedCropId(firstInState.id)
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
              selectedState === st
                ? 'bg-[#1B5E20] text-white shadow-xs'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Crop Selector Controls */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-thin">
          <span className="text-xs font-bold text-gray-500 uppercase whitespace-nowrap">
            Crop:
          </span>
          {stateCrops.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedCropId(p.id)}
              className={`px-3 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activePrice.id === p.id
                  ? 'bg-[#1B5E20] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {p.crop}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0 text-xs font-semibold text-gray-500">
          <Clock className="h-3.5 w-3.5" />
          <span>Updated: {activePrice.updatedAt}</span>
        </div>
      </div>

      {/* Main Highlight Card: Current Modal Price & Trend */}
      <div className="bg-white rounded-3xl border-2 border-amber-300 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="warning">{activePrice.variety}</Badge>
              <span className="text-xs text-gray-600 font-bold flex items-center gap-1">
                <Building2 className="h-3.5 w-3.5 text-[#1B5E20]" />
                {activePrice.market} • {activePrice.district} ({activePrice.state})
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-2">
              ₹{activePrice.modalPrice.toLocaleString('en-IN')}{' '}
              <span className="text-sm font-semibold text-gray-500">{activePrice.unit}</span>
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Equivalent to approx. ₹{(activePrice.modalPrice / 100).toFixed(1)} / kg at farm mandi gate
            </p>
          </div>

          {/* Trend Badge */}
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-2xl flex items-center gap-2 ${
              activePrice.trend === 'up'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : activePrice.trend === 'down'
                ? 'bg-rose-50 text-rose-800 border border-rose-200'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {activePrice.trend === 'up' && <TrendingUp className="h-6 w-6 text-emerald-600" />}
              {activePrice.trend === 'down' && <TrendingDown className="h-6 w-6 text-rose-600" />}
              {activePrice.trend === 'stable' && <Minus className="h-6 w-6 text-gray-600" />}
              <div>
                <div className="text-sm font-black">
                  {activePrice.changePercent > 0 ? `+${activePrice.changePercent}%` : `${activePrice.changePercent}%`}
                </div>
                <div className="text-[10px] font-medium opacity-80">7-Day Trend</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal, Min, Max Price Band */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#F8F9F5] p-4 rounded-2xl border border-gray-200">
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase">Minimum Price</span>
            <div className="text-xl font-extrabold text-gray-900 mt-0.5">
              ₹{activePrice.minPrice.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-gray-500">Lower arrivals quality</span>
          </div>

          <div className="border-t sm:border-t-0 sm:border-l border-gray-200 pt-2 sm:pt-0 sm:pl-4">
            <span className="text-xs font-bold text-[#1B5E20] uppercase">Modal (Most Common)</span>
            <div className="text-2xl font-black text-[#1B5E20] mt-0.5">
              ₹{activePrice.modalPrice.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold">Fair average quality</span>
          </div>

          <div className="border-t sm:border-t-0 sm:border-l border-gray-200 pt-2 sm:pt-0 sm:pl-4">
            <span className="text-xs font-bold text-gray-500 uppercase">Maximum Price</span>
            <div className="text-xl font-extrabold text-gray-900 mt-0.5">
              ₹{activePrice.maxPrice.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-gray-500">Premium Grade A lot</span>
          </div>
        </div>

        {/* 7-Day Price History - Simple Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-gray-900">
              7-Day Daily Mandi Price Movement
            </h3>
            <span className="text-xs text-gray-500">Official Agmarknet Mandi Record</span>
          </div>

          <div className="grid grid-cols-7 gap-1.5 text-center">
            {activePrice.historical.map((h, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 flex flex-col justify-between">
                <span className="text-[11px] font-semibold text-gray-500">{h.date}</span>
                <span className="text-xs sm:text-sm font-extrabold text-gray-900 mt-1">₹{h.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Nearby APMC Mandis Comparison */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Store className="h-4 w-4 text-[#1B5E20]" />
              <h3 className="font-extrabold text-base text-gray-900">
                Nearby Mandi Comparison for {activePrice.crop}
              </h3>
            </div>
            <span className="text-xs text-gray-500">Compare before dispatching trucks</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {activePrice.nearbyMandis.map((m, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-white border border-gray-200 shadow-2xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-gray-900">{m.market}</span>
                  <span className="text-xs text-gray-400 font-semibold">{m.distanceKm} km</span>
                </div>
                <div className="flex items-baseline justify-between pt-1">
                  <span className="text-base font-extrabold text-[#1B5E20]">₹{m.price} / Qtl</span>
                  <span className="text-[11px] text-gray-500">Arrival: {m.arrivalQty}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Realistic Mandi Advice */}
        <div className="p-4 rounded-xl bg-[#E8F5E9] border border-[#C8E6C9] flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-[#1B5E20] shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <strong className="font-bold text-[#1B5E20] block text-sm">
              Mandi Intelligence Note:
            </strong>
            <p className="text-gray-800 leading-relaxed">
              {activePrice.estimatedPriceRange}. Sort your crop by uniform grading before transport to capture the top 10% price bracket.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
