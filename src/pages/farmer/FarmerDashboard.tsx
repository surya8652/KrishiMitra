import React from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '@/context/AppContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Sprout, 
  ScanSearch, 
  CloudSun, 
  Droplet, 
  TrendingUp, 
  ShoppingBag, 
  AlertTriangle, 
  ArrowRight, 
  MapPin, 
  Clock, 
  CheckCircle, 
  FileText,
  Thermometer,
  CloudRain,
  Wind,
  ShieldCheck,
  Calendar
} from 'lucide-react'

import { LocationPicker } from '@/components/LocationPicker'

export const FarmerDashboard: React.FC = () => {
  const [showLocationPicker, setShowLocationPicker] = React.useState(false)
  const { 
    farmer, 
    weather, 
    irrigationAdvice, 
    recordWateredToday, 
    diseaseReports, 
    farmAdviceList,
    t 
  } = useApp()

  const actionCards = [
    {
      title: "Smart Farming",
      subtitle: "Get crop advice",
      icon: Sprout,
      to: "/farmer/smart-farming",
      bg: "bg-[#E8F5E9]",
      iconColor: "text-[#1B5E20]",
      border: "border-[#C8E6C9]"
    },
    {
      title: "Check Disease",
      subtitle: "Upload a leaf photo",
      icon: ScanSearch,
      to: "/farmer/disease",
      bg: "bg-[#F1F8F3]",
      iconColor: "text-[#2E7D32]",
      border: "border-[#C8E6C9]"
    },
    {
      title: "Weather",
      subtitle: "See forecast",
      icon: CloudSun,
      to: "/farmer/weather",
      bg: "bg-sky-50",
      iconColor: "text-sky-700",
      border: "border-sky-200"
    },
    {
      title: "Irrigation",
      subtitle: "View water advice",
      icon: Droplet,
      to: "/farmer/irrigation",
      bg: "bg-blue-50",
      iconColor: "text-blue-700",
      border: "border-blue-200"
    },
    {
      title: "Crop Prices",
      subtitle: "Check today's prices",
      icon: TrendingUp,
      to: "/farmer/prices",
      bg: "bg-amber-50",
      iconColor: "text-amber-800",
      border: "border-amber-200"
    },
    {
      title: "Marketplace",
      subtitle: "Buy or sell crops",
      icon: ShoppingBag,
      to: "/farmer/marketplace",
      bg: "bg-orange-50",
      iconColor: "text-orange-800",
      border: "border-orange-200"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Top Greeting & Weather Summary */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E5E7EB] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Good morning, {farmer.name.split(' ')[0]}
            </h1>
          </div>
          <div className="flex items-center gap-2 mt-1 text-gray-600 text-sm flex-wrap">
            <span>Here's what's happening on your farm in <strong>{farmer.village}, {farmer.district} ({farmer.state})</strong>.</span>
            <button
              type="button"
              onClick={() => setShowLocationPicker(true)}
              className="text-xs text-[#1B5E20] font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <MapPin className="h-3.5 w-3.5" />
              <span>Change Location</span>
            </button>
          </div>
        </div>

        {/* Compact Weather Badge */}
        <div 
          onClick={() => setShowLocationPicker(true)}
          className="flex items-center gap-3 bg-[#F8F9F5] hover:bg-sky-50 p-3 rounded-xl border border-gray-200 shrink-0 cursor-pointer transition-colors"
          title="Click to view or switch All-India location weather"
        >
          <div className="p-2 rounded-lg bg-sky-100 text-sky-700">
            <CloudSun className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">{weather.temperature}°C</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                {weather.rainProbability}% Rain
              </span>
            </div>
            <p className="text-xs text-gray-500 font-medium">{weather.district} • {weather.condition.split('with')[0]}</p>
          </div>
        </div>
      </div>

      {/* Large Featured Alert: TODAY'S FARM ADVICE */}
      <div className="rounded-2xl bg-gradient-to-r from-[#FFF8E1] to-[#FFFDE7] border-2 border-[#FFE082] p-5 sm:p-6 shadow-xs relative overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-amber-500 text-white shrink-0 shadow-xs">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded">
                {t.todaysAdvice}
              </span>
              <span className="text-xs text-amber-800 font-medium">
                Target: {farmer.mainCrops[0] || 'Crop'} • {farmer.district} ({farmer.state})
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-gray-950">
              {weather.todayFarmingAlert.title}
            </h2>

            <p className="text-sm text-gray-700 leading-relaxed max-w-3xl">
              {weather.todayFarmingAlert.description} <strong>Action: </strong>{weather.todayFarmingAlert.recommendation}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link to="/farmer/weather">
                <Button size="sm" className="bg-[#1B5E20] hover:bg-[#144818] text-white font-bold cursor-pointer">
                  View Weather
                </Button>
              </Link>
              <Link to="/farmer/irrigation">
                <Button size="sm" variant="outline" className="border-amber-400 bg-white hover:bg-amber-50 text-amber-950 font-bold cursor-pointer">
                  My Irrigation
                </Button>
              </Link>
              <Button 
                size="sm" 
                variant="secondary"
                onClick={() => recordWateredToday()}
                className="text-xs font-bold cursor-pointer"
              >
                Mark Watered Today
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Six Large Action Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Farm Services</h3>
          <span className="text-xs text-gray-500">Tap any service to open</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
          {actionCards.map((card, idx) => (
            <Link key={idx} to={card.to} className="group">
              <div className={`p-4 sm:p-5 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#1B5E20] hover:shadow-md transition-all flex flex-col justify-between h-36 sm:h-40 group-hover:-translate-y-0.5`}>
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl ${card.bg} ${card.iconColor} ${card.border} border`}>
                    <card.icon className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-[#1B5E20] group-hover:translate-x-1 transition-all" />
                </div>

                <div>
                  <h4 className="font-extrabold text-base sm:text-lg text-gray-900 group-hover:text-[#1B5E20] transition-colors leading-tight">
                    {card.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
                    {card.subtitle}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* MY FARM SUMMARY & RECENT ACTIVITY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* My Farm Card */}
        <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-[#E8F5E9] text-[#1B5E20]">
                <Sprout className="h-4 w-4" />
              </div>
              <h3 className="font-bold text-gray-900">MY FARM</h3>
            </div>
            <Link to="/farmer/profile" className="text-xs font-bold text-[#1B5E20] hover:underline">
              Edit
            </Link>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-1 border-b border-gray-50">
              <span className="text-gray-500 font-medium">Main Crops</span>
              <span className="font-bold text-gray-900">{farmer.mainCrops.join(', ')}</span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-gray-50">
              <span className="text-gray-500 font-medium">Land Size</span>
              <span className="font-bold text-gray-900">{farmer.landSize} {farmer.landUnit}</span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-gray-50">
              <span className="text-gray-500 font-medium">Soil Type</span>
              <span className="font-bold text-gray-900 text-xs text-right max-w-[150px]">{farmer.soilType}</span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-gray-500 font-medium">Location</span>
              <span className="font-bold text-gray-900">{farmer.district}, {farmer.state}</span>
            </div>
          </div>

          <div className="pt-2">
            <div className="p-2.5 rounded-xl bg-[#F8F9F5] border border-gray-200 text-xs text-gray-600 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Soil Health Card verified</span>
            </div>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="md:col-span-2 bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-amber-50 text-amber-700">
                <Clock className="h-4 w-4" />
              </div>
              <h3 className="font-bold text-gray-900">RECENT ACTIVITY</h3>
            </div>
            <Link to="/farmer/reports" className="text-xs font-bold text-[#1B5E20] hover:underline">
              View All Reports
            </Link>
          </div>

          <div className="space-y-3">
            {/* Disease Check */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F8F9F5] border border-gray-100">
              <div className="p-2 rounded-lg bg-green-100 text-[#1B5E20] shrink-0 mt-0.5">
                <ScanSearch className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-gray-900">Disease Check Completed</h4>
                  <span className="text-[11px] text-gray-400">03 Oct</span>
                </div>
                <p className="text-xs text-gray-600 mt-0.5">
                  Early Blight identified on Tomato leaves (93% confidence). Recommended spray: Mancozeb 75 WP.
                </p>
              </div>
            </div>

            {/* Weather Alert */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F8F9F5] border border-gray-100">
              <div className="p-2 rounded-lg bg-sky-100 text-sky-700 shrink-0 mt-0.5">
                <CloudRain className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-gray-900">Weather Alert Issued</h4>
                  <span className="text-[11px] text-gray-400">Today, 06:00 AM</span>
                </div>
                <p className="text-xs text-gray-600 mt-0.5">
                  Thunderstorm warning for Nashik belt tomorrow. 18-25mm rainfall expected.
                </p>
              </div>
            </div>

            {/* Crop Recommendation */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F8F9F5] border border-gray-100">
              <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 shrink-0 mt-0.5">
                <Sprout className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-gray-900">Crop Guidance Generated</h4>
                  <span className="text-[11px] text-gray-400">02 Oct</span>
                </div>
                <p className="text-xs text-gray-600 mt-0.5">
                  Rabi season ridge planting & drip fertigation schedule saved for 2 acres Tomato plot.
                </p>
              </div>
            </div>

            {/* Price Check */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F8F9F5] border border-gray-100">
              <div className="p-2 rounded-lg bg-amber-100 text-amber-800 shrink-0 mt-0.5">
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-gray-900">Price Trend Checked</h4>
                  <span className="text-[11px] text-gray-400">Today, 09:30 AM</span>
                </div>
                <p className="text-xs text-gray-600 mt-0.5">
                  Nashik APMC Tomato modal price at ₹2,450/quintal (up +6.8%).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MY REPORTS QUICK ACCESS */}
      <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#E8F5E9] text-[#1B5E20]">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">MY REPORTS</h3>
              <p className="text-xs text-gray-500">Only your private farm reports are saved here</p>
            </div>
          </div>
          <Link to="/farmer/reports">
            <Button variant="outline" size="sm" className="text-xs font-bold gap-1 cursor-pointer">
              <span>Open All Reports</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <Link to="/farmer/reports?tab=crop" className="p-3 rounded-xl bg-[#F8F9F5] hover:bg-[#E8F5E9] border border-gray-200 text-center transition-all group">
            <Sprout className="h-5 w-5 mx-auto text-[#1B5E20] mb-1.5" />
            <span className="text-xs font-bold text-gray-800 group-hover:text-[#1B5E20] block">
              Crop Advice ({farmAdviceList.length})
            </span>
          </Link>

          <Link to="/farmer/reports?tab=disease" className="p-3 rounded-xl bg-[#F8F9F5] hover:bg-[#E8F5E9] border border-gray-200 text-center transition-all group">
            <ScanSearch className="h-5 w-5 mx-auto text-green-700 mb-1.5" />
            <span className="text-xs font-bold text-gray-800 group-hover:text-green-800 block">
              Disease Scans ({diseaseReports.length})
            </span>
          </Link>

          <Link to="/farmer/reports?tab=weather" className="p-3 rounded-xl bg-[#F8F9F5] hover:bg-sky-50 border border-gray-200 text-center transition-all group">
            <CloudSun className="h-5 w-5 mx-auto text-sky-700 mb-1.5" />
            <span className="text-xs font-bold text-gray-800 group-hover:text-sky-800 block">
              Weather Log
            </span>
          </Link>

          <Link to="/farmer/reports?tab=irrigation" className="p-3 rounded-xl bg-[#F8F9F5] hover:bg-blue-50 border border-gray-200 text-center transition-all group">
            <Droplet className="h-5 w-5 mx-auto text-blue-700 mb-1.5" />
            <span className="text-xs font-bold text-gray-800 group-hover:text-blue-800 block">
              Watering Log ({irrigationAdvice.logs.length})
            </span>
          </Link>

          <Link to="/farmer/reports?tab=market" className="p-3 rounded-xl bg-[#F8F9F5] hover:bg-amber-50 border border-gray-200 text-center transition-all group">
            <TrendingUp className="h-5 w-5 mx-auto text-amber-700 mb-1.5" />
            <span className="text-xs font-bold text-gray-800 group-hover:text-amber-800 block">
              Mandi History
            </span>
          </Link>

          <Link to="/farmer/reports?tab=marketplace" className="p-3 rounded-xl bg-[#F8F9F5] hover:bg-orange-50 border border-gray-200 text-center transition-all group">
            <ShoppingBag className="h-5 w-5 mx-auto text-orange-700 mb-1.5" />
            <span className="text-xs font-bold text-gray-800 group-hover:text-orange-800 block">
              My Listings
            </span>
          </Link>
        </div>
      </div>

      {showLocationPicker && (
        <LocationPicker
          open={showLocationPicker}
          onClose={() => setShowLocationPicker(false)}
        />
      )}
    </div>
  )
}
