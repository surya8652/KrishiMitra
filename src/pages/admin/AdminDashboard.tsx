import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '@/context/AppContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Activity, 
  ScanSearch, 
  ShoppingBag, 
  Cpu, 
  CheckCircle2, 
  TrendingUp, 
  Download, 
  MapPin, 
  Layers, 
  Calendar, 
  FileSpreadsheet,
  Server,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react'

export const AdminDashboard: React.FC = () => {
  const { showToast } = useApp()
  const [exporting, setExporting] = useState(false)

  const handleExport = (type: 'csv' | 'pdf') => {
    setExporting(true)
    showToast(`Background job queued: Generating platform-wide ${type.toUpperCase()} report...`)
    setTimeout(() => {
      setExporting(false)
      showToast(`Platform report ready: krishimitra_directorate_report.${type}`)
    }, 2000)
  }

  // Top platform metrics required by prompt
  const topMetrics = [
    {
      label: "Total Farmers",
      val: "42,850",
      change: "+12.4% this month",
      icon: Users,
      color: "bg-emerald-50 text-emerald-800 border-emerald-200"
    },
    {
      label: "Active Farmers Today",
      val: "18,240",
      change: "42.5% daily engagement",
      icon: Activity,
      color: "bg-blue-50 text-blue-800 border-blue-200"
    },
    {
      label: "Disease Checks",
      val: "94,120",
      change: "3,140 scans this week",
      icon: ScanSearch,
      color: "bg-green-50 text-green-800 border-green-200"
    },
    {
      label: "Marketplace Listings",
      val: "3,420",
      change: "₹18.4 Cr gross trade volume",
      icon: ShoppingBag,
      color: "bg-amber-50 text-amber-900 border-amber-200"
    },
    {
      label: "AI Requests Processed",
      val: "152,890",
      change: "Average latency 640ms",
      icon: Cpu,
      color: "bg-purple-50 text-purple-900 border-purple-200"
    },
    {
      label: "System Status",
      val: "99.98%",
      change: "All 8 microservices operational",
      icon: Server,
      color: "bg-teal-50 text-teal-900 border-teal-200"
    }
  ]

  // Regional Adoption Breakdown (Aggregated Indian Districts)
  const regionalDistricts = [
    { district: "Nashik, MH", farmers: "11,420", primaryCrop: "Tomato / Onion", diseaseCount: "24,800", status: "High Activity" },
    { district: "Pune, MH", farmers: "8,950", primaryCrop: "Sugarcane / Veg", diseaseCount: "19,200", status: "Optimal" },
    { district: "Latur, MH", farmers: "7,310", primaryCrop: "Soybean / Pulses", diseaseCount: "14,500", status: "Optimal" },
    { district: "Rajkot, GJ", farmers: "6,840", primaryCrop: "Cotton / Groundnut", diseaseCount: "13,900", status: "Moderate" },
    { district: "Ludhiana, PB", farmers: "5,120", primaryCrop: "Wheat / Paddy", diseaseCount: "11,200", status: "Optimal" },
    { district: "Sehore, MP", farmers: "3,210", primaryCrop: "Sharbati Wheat", diseaseCount: "6,420", status: "Growing" }
  ]

  // Crop Disease Outbreak Heatmap Aggregates
  const diseaseBreakdown = [
    { disease: "Tomato Early Blight", cases: 28400, percentage: 38, alertLevel: "High (Rain Trigger)" },
    { disease: "Onion Purple Blotch", cases: 22100, percentage: 29, alertLevel: "Medium" },
    { disease: "Soybean Leaf Spot", cases: 14200, percentage: 19, alertLevel: "Low" },
    { disease: "Cotton Leaf Curl Virus", cases: 10420, percentage: 14, alertLevel: "Localized Alert" }
  ]

  return (
    <div className="space-y-6">
      {/* Top Directorate Banner & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-300 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-gray-400 text-gray-700 bg-white">
              State Agricultural Directorate Portal
            </Badge>
            <span className="text-xs text-gray-500 font-mono">Aggregation Mode</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">
            Platform Intelligence Overview
          </h1>
          <p className="text-xs sm:text-sm text-gray-600">
            Real-time aggregated telemetry across 42,850+ registered smallholders in Western & Northern agro-climatic zones.
          </p>
        </div>

        {/* Export Controls for Admin */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleExport('csv')}
            disabled={exporting}
            className="text-xs font-bold gap-1.5 bg-white border-gray-300 hover:bg-gray-50 cursor-pointer"
          >
            <FileSpreadsheet className="h-4 w-4 text-emerald-700" />
            <span>Export CSV</span>
          </Button>
          <Button
            size="sm"
            onClick={() => handleExport('pdf')}
            disabled={exporting}
            className="text-xs font-bold gap-1.5 bg-emerald-800 hover:bg-emerald-900 text-white cursor-pointer"
          >
            <Download className="h-4 w-4" />
            <span>Export PDF Report</span>
          </Button>
        </div>
      </div>

      {/* Six Top Platform Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {topMetrics.map((m, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl p-4 border border-gray-200 shadow-xs flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">
                {m.label}
              </span>
              <div className={`p-1.5 rounded-lg ${m.color} border`}>
                <m.icon className="h-4 w-4" />
              </div>
            </div>

            <div>
              <div className="text-xl sm:text-2xl font-black text-gray-900">
                {m.val}
              </div>
              <p className="text-[11px] text-emerald-700 font-semibold mt-0.5 truncate">
                {m.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Aggregated Analytical Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* District Activity Breakdown Table */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-200 shadow-xs p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="font-extrabold text-lg text-gray-900">
                District Agro-Telemetry & Adoption
              </h3>
              <p className="text-xs text-gray-500">
                Aggregated farmers and diagnostic requests by agricultural district
              </p>
            </div>
            <Link to="/admin/reports/users" className="text-xs font-bold text-emerald-800 hover:underline">
              View All Districts →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 uppercase text-[10px] font-bold tracking-wider">
                  <th className="py-2.5 px-3">District</th>
                  <th className="py-2.5 px-3">Registered Farmers</th>
                  <th className="py-2.5 px-3">Key Focus Crops</th>
                  <th className="py-2.5 px-3">Disease Analyses</th>
                  <th className="py-2.5 px-3 text-right">Cluster Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {regionalDistricts.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-3 font-bold text-gray-900 flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-emerald-700 shrink-0" />
                      <span>{row.district}</span>
                    </td>
                    <td className="py-3 px-3 font-semibold text-gray-800">{row.farmers}</td>
                    <td className="py-3 px-3 text-gray-600">{row.primaryCrop}</td>
                    <td className="py-3 px-3 font-bold text-gray-900">{row.diseaseCount}</td>
                    <td className="py-3 px-3 text-right">
                      <Badge variant="success" className="text-[10px]">
                        {row.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Disease Outbreak Distribution Chart */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-200 shadow-xs p-5 sm:p-6 space-y-4">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="font-extrabold text-lg text-gray-900">
              Disease Prevalence
            </h3>
            <p className="text-xs text-gray-500">
              Distribution of 94,120 computer vision scans
            </p>
          </div>

          <div className="space-y-4">
            {diseaseBreakdown.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-gray-800">{item.disease}</span>
                  <span className="font-extrabold text-gray-900">{item.percentage}%</span>
                </div>
                {/* Visual bar */}
                <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${item.percentage}%` }}
                    className={`h-full rounded-full ${
                      idx === 0 ? 'bg-amber-600' : idx === 1 ? 'bg-emerald-600' : 'bg-blue-600'
                    }`}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-gray-400">
                  <span>{item.cases.toLocaleString()} cases</span>
                  <span className="text-amber-800 font-semibold">{item.alertLevel}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link to="/admin/reports/disease">
              <Button size="sm" variant="outline" className="w-full text-xs font-bold gap-1 cursor-pointer">
                <span>View Full Disease Epidemiological Report</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Access to Dedicated Platform Reports */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-5 sm:p-6 space-y-4">
        <h3 className="font-extrabold text-lg text-gray-900">
          Dedicated Platform Aggregated Reports
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {[
            { to: "/admin/reports/users", label: "User Reports", icon: Users },
            { to: "/admin/reports/crops", label: "Crop Reports", icon: Layers },
            { to: "/admin/reports/disease", label: "Disease Reports", icon: ScanSearch },
            { to: "/admin/reports/weather", label: "Weather Reports", icon: Activity },
            { to: "/admin/reports/irrigation", label: "Irrigation Reports", icon: TrendingUp },
            { to: "/admin/reports/market", label: "Market Reports", icon: TrendingUp },
            { to: "/admin/reports/marketplace", label: "Marketplace Reports", icon: ShoppingBag },
            { to: "/admin/reports/system", label: "System Health", icon: Cpu }
          ].map((item, idx) => (
            <Link
              key={idx}
              to={item.to}
              className="p-3.5 rounded-xl bg-gray-50 hover:bg-emerald-50 border border-gray-200 text-center transition-all group"
            >
              <item.icon className="h-5 w-5 mx-auto text-emerald-800 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-gray-800 group-hover:text-emerald-900 block leading-tight">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
