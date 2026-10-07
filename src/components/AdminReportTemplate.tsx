import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useApp } from '@/context/AppContext'
import { 
  Download, 
  FileSpreadsheet, 
  Calendar, 
  Filter, 
  RefreshCw,
  CheckCircle2,
  Layers,
  MapPin
} from 'lucide-react'

export interface AdminReportStat {
  label: string
  value: string
  subtext: string
  badge?: string
}

export interface AdminReportTemplateProps {
  title: string
  description: string
  badgeLabel: string
  stats: AdminReportStat[]
  children: React.ReactNode
  crops?: string[]
  regions?: string[]
}

export const AdminReportTemplate: React.FC<AdminReportTemplateProps> = ({
  title,
  description,
  badgeLabel,
  stats,
  children,
  crops = ['All Crops', 'Tomato', 'Onion', 'Soybean', 'Cotton', 'Wheat', 'Rice'],
  regions = ['All Regions', 'Maharashtra (Nashik/Pune/Latur)', 'Gujarat (Rajkot/Surat)', 'Punjab (Ludhiana/Karnal)', 'Madhya Pradesh (Sehore/Bhopal)']
}) => {
  const { showToast } = useApp()
  const [dateRange, setDateRange] = useState('Last 30 Days')
  const [selectedCrop, setSelectedCrop] = useState(crops[0])
  const [selectedRegion, setSelectedRegion] = useState(regions[0])
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = (type: 'csv' | 'pdf') => {
    setIsExporting(true)
    showToast(`Background Report Engine: Assembling aggregated dataset for ${title}...`)
    setTimeout(() => {
      setIsExporting(false)
      showToast(`Export complete: ${title.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}.${type}`)
    }, 1800)
  }

  return (
    <div className="space-y-6">
      {/* Header with Title & Export Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-300 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-gray-400 text-gray-700 bg-white">
              {badgeLabel}
            </Badge>
            <span className="text-xs text-gray-500 font-mono">Aggregated Data Only</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600">
            {description}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleExport('csv')}
            disabled={isExporting}
            className="text-xs font-bold gap-1.5 bg-white border-gray-300 hover:bg-gray-50 cursor-pointer"
          >
            <FileSpreadsheet className="h-4 w-4 text-emerald-700" />
            <span>Download CSV</span>
          </Button>
          <Button
            size="sm"
            onClick={() => handleExport('pdf')}
            disabled={isExporting}
            className="text-xs font-bold gap-1.5 bg-emerald-800 hover:bg-emerald-900 text-white cursor-pointer"
          >
            <Download className="h-4 w-4" />
            <span>Download PDF</span>
          </Button>
        </div>
      </div>

      {/* Report Filter Controls: Date Range, Crop, Region */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="font-bold text-gray-700">Date Range:</span>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="h-9 rounded-lg border border-gray-300 px-2.5 bg-white font-medium"
            >
              <option value="Today">Today (Live Stream)</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Current Kharif Season">Current Kharif Season</option>
              <option value="Annual 2025-2026">Annual 2025-2026</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <Layers className="h-4 w-4 text-gray-400" />
            <span className="font-bold text-gray-700">Crop:</span>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="h-9 rounded-lg border border-gray-300 px-2.5 bg-white font-medium"
            >
              {crops.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="font-bold text-gray-700">Region:</span>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="h-9 rounded-lg border border-gray-300 px-2.5 bg-white font-medium max-w-[200px] truncate"
            >
              {regions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-gray-400 font-semibold">
            Filtered across 42,850+ farmers
          </span>
        </div>
      </div>

      {/* Top 4 Aggregated Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => (
          <div key={idx} className="bg-white rounded-xl p-4 border border-gray-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase">{s.label}</span>
              {s.badge && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800">
                  {s.badge}
                </span>
              )}
            </div>
            <div className="text-2xl font-black text-gray-900">{s.value}</div>
            <p className="text-[11px] text-gray-500 font-medium">{s.subtext}</p>
          </div>
        ))}
      </div>

      {/* Report Specific Custom Views / Tables */}
      {children}
    </div>
  )
}
