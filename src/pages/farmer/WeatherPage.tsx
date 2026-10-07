import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '@/context/AppContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LocationPicker } from '@/components/LocationPicker'
import { 
  CloudSun, 
  CloudRain, 
  Wind, 
  Droplet, 
  MapPin, 
  AlertTriangle, 
  ArrowRight,
  Sun,
  CloudLightning,
  CalendarDays,
  Globe,
  CheckCircle2
} from 'lucide-react'

export const WeatherPage: React.FC = () => {
  const { weather, farmer, changeLocation } = useApp()
  const [showLocationPicker, setShowLocationPicker] = useState(false)

  const quickLocations = [
    { district: 'Nashik', state: 'Maharashtra', label: 'Nashik (MH)' },
    { district: 'Ludhiana', state: 'Punjab', label: 'Ludhiana (PB)' },
    { district: 'Karnal', state: 'Haryana', label: 'Karnal (HR)' },
    { district: 'Agra', state: 'Uttar Pradesh', label: 'Agra (UP)' },
    { district: 'Indore', state: 'Madhya Pradesh', label: 'Indore (MP)' },
    { district: 'Rajkot', state: 'Gujarat', label: 'Rajkot (GJ)' },
    { district: 'Kolar', state: 'Karnataka', label: 'Kolar (KA)' },
    { district: 'Guntur', state: 'Andhra Pradesh', label: 'Guntur (AP)' },
    { district: 'Purba Bardhaman', state: 'West Bengal', label: 'Burdwan (WB)' }
  ]

  const isHomeLocation = farmer.district.toLowerCase() === weather.district.toLowerCase() &&
                         farmer.state.toLowerCase() === weather.state.toLowerCase()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-sky-100 text-sky-800">
            <CloudSun className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Weather Intelligence
            </h1>
            <p className="text-sm text-gray-600">
              All-India weather forecasts and practical farming advisories.
            </p>
          </div>
        </div>

        {/* Location Selector Button */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setShowLocationPicker(true)}
            className="flex items-center gap-2 text-xs font-bold text-gray-800 bg-white hover:bg-gray-50 px-3.5 py-2 rounded-xl border border-gray-300 shadow-xs cursor-pointer transition-colors"
          >
            <MapPin className="h-4 w-4 text-[#1B5E20]" />
            <span>{weather.location}</span>
            <span className="text-[10px] text-[#1B5E20] bg-green-50 px-1.5 py-0.5 rounded border border-green-200">
              Change Location
            </span>
          </button>

          {!isHomeLocation && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => changeLocation(weather.district, weather.state, true)}
              className="text-xs font-bold text-[#1B5E20] border-[#1B5E20] hover:bg-green-50 cursor-pointer"
            >
              Set as My Farm Location
            </Button>
          )}
        </div>
      </div>

      {/* Quick All-India Region Bar */}
      <div className="bg-white p-3 rounded-2xl border border-gray-200 shadow-xs flex items-center gap-2 overflow-x-auto scrollbar-thin">
        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 shrink-0 pr-2 border-r border-gray-200">
          <Globe className="h-3.5 w-3.5 text-[#1B5E20]" />
          <span>Quick All-India:</span>
        </div>
        {quickLocations.map((loc) => {
          const isActive = weather.district.toLowerCase() === loc.district.toLowerCase()
          return (
            <button
              key={loc.district}
              type="button"
              onClick={() => changeLocation(loc.district, loc.state)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'bg-[#1B5E20] text-white shadow-xs'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {loc.label}
            </button>
          )
        })}
        <button
          type="button"
          onClick={() => setShowLocationPicker(true)}
          className="text-xs font-bold text-[#1B5E20] hover:underline whitespace-nowrap pl-2 cursor-pointer"
        >
          + More States...
        </button>
      </div>

      {/* FARMING ALERT (Prominent & Practical) */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-amber-500 text-white shrink-0">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-200 px-2 py-0.5 rounded">
                Active Advisory for {weather.district}
              </span>
              <span className="text-xs text-amber-800 font-semibold">{weather.state} Agro-Meteorology</span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-gray-950">
              {weather.todayFarmingAlert.title}
            </h2>

            <p className="text-sm text-gray-700 leading-relaxed max-w-3xl">
              {weather.todayFarmingAlert.description}
            </p>

            <div className="p-3 rounded-xl bg-white/80 border border-amber-200 text-xs sm:text-sm font-semibold text-amber-950">
              <strong>Farmer Action: </strong>
              <span>{weather.todayFarmingAlert.recommendation}</span>
            </div>

            <div className="pt-1 flex items-center gap-3">
              <Link to="/farmer/irrigation">
                <Button size="sm" className="bg-[#1B5E20] hover:bg-[#144818] text-white text-xs font-bold gap-1 cursor-pointer">
                  <span>Check Watering Schedule</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Current Conditions (Simple, readable cards) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Temperature */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
            <Sun className="h-7 w-7" />
          </div>
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase">Temperature</span>
            <div className="text-2xl sm:text-3xl font-black text-gray-900 mt-0.5">
              {weather.temperature}°C
            </div>
            <span className="text-[11px] text-gray-500 font-medium">{weather.condition}</span>
          </div>
        </div>

        {/* Rain Probability */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-center gap-4">
          <div className="p-3 rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
            <CloudRain className="h-7 w-7" />
          </div>
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase">Rain Probability</span>
            <div className="text-2xl sm:text-3xl font-black text-gray-900 mt-0.5">
              {weather.rainProbability}%
            </div>
            <span className={`text-[11px] font-bold ${weather.rainProbability > 50 ? 'text-sky-700' : 'text-gray-500'}`}>
              {weather.rainProbability > 50 ? 'Rain expected' : 'Low rain chance'}
            </span>
          </div>
        </div>

        {/* Humidity */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-center gap-4">
          <div className="p-3 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
            <Droplet className="h-7 w-7" />
          </div>
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase">Soil & Air Moisture</span>
            <div className="text-2xl sm:text-3xl font-black text-gray-900 mt-0.5">
              {weather.humidity}%
            </div>
            <span className="text-[11px] text-gray-500 font-medium">Relative Humidity</span>
          </div>
        </div>

        {/* Wind */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-center gap-4">
          <div className="p-3 rounded-xl bg-teal-50 text-teal-600 border border-teal-100">
            <Wind className="h-7 w-7" />
          </div>
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase">Wind Speed</span>
            <div className="text-2xl sm:text-3xl font-black text-gray-900 mt-0.5">
              {weather.windSpeed} <span className="text-sm font-normal text-gray-500">km/h</span>
            </div>
            <span className="text-[11px] text-gray-500 font-medium">Field breeze</span>
          </div>
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-[#1B5E20]" />
            <h3 className="font-extrabold text-lg text-gray-900">
              7-Day Farming Weather Forecast for {weather.district}
            </h3>
          </div>
          <span className="text-xs text-gray-500">Official Agro-Advisory Bulletin</span>
        </div>

        <div className="divide-y divide-gray-100">
          {weather.forecast.map((day, idx) => (
            <div key={idx} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#F8F9F5] px-2 rounded-xl transition-colors">
              <div className="flex items-center gap-4 min-w-[160px]">
                <div className="h-10 w-10 rounded-xl bg-[#F1F8F3] flex items-center justify-center text-[#1B5E20] font-bold">
                  {day.rainProbability > 60 ? (
                    <CloudLightning className="h-5 w-5 text-amber-600" />
                  ) : day.rainProbability > 30 ? (
                    <CloudRain className="h-5 w-5 text-sky-600" />
                  ) : (
                    <Sun className="h-5 w-5 text-amber-500" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900">{day.day} ({day.date})</h4>
                  <span className="text-xs text-gray-500">{day.condition}</span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-900">{day.maxTemp}°C <span className="text-xs font-normal text-gray-400">/ {day.minTemp}°C</span></div>
                  <div className="text-xs font-semibold text-sky-700">{day.rainProbability}% rain chance</div>
                </div>

                <div className="flex-1 sm:max-w-xs bg-gray-50 p-2 rounded-lg border border-gray-100 text-xs text-gray-700">
                  <strong className="text-gray-900">Advice: </strong>
                  <span>{day.advisory}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Location Picker Modal */}
      {showLocationPicker && (
        <LocationPicker
          open={showLocationPicker}
          onClose={() => setShowLocationPicker(false)}
        />
      )}
    </div>
  )
}
