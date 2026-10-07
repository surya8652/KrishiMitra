import React from 'react'
import { AdminReportTemplate } from '@/components/AdminReportTemplate'
import { Badge } from '@/components/ui/badge'

export const CropReportsPage: React.FC = () => {
  const stats = [
    { label: "Top Cultivated Crop", value: "Tomato", subtext: "34% of active farmer plots", badge: "#1 Focus" },
    { label: "Total Monitored Acreage", value: "98,420 Acres", subtext: "Average holding 2.3 acres", badge: "Smallholder" },
    { label: "Advisories Generated", value: "62,150", subtext: "Drip fertigation & ridge protocols", badge: "AI Guided" },
    { label: "Rabi Sowing Readiness", value: "88.4%", subtext: "Nursery bed prep underway", badge: "Seasonal" }
  ]

  const cropAcreage = [
    { crop: "Tomato (Abhinav / Hybrid)", acreage: "33,400 Acres", primarySoil: "Black Clayey Loam", avgYieldEst: "18.5 Tons/Acre" },
    { crop: "Onion (Kharif / Garwa)", acreage: "28,100 Acres", primarySoil: "Sandy Loam", avgYieldEst: "11.2 Tons/Acre" },
    { crop: "Soybean (JS 335 / 9560)", acreage: "16,800 Acres", primarySoil: "Deep Black Soil", avgYieldEst: "8.5 Quintals/Acre" },
    { crop: "Cotton (Medium Staple Bt)", acreage: "11,200 Acres", primarySoil: "Medium Black Soil", avgYieldEst: "9.2 Quintals/Acre" },
    { crop: "Wheat (Sharbati / Lokwan)", acreage: "8,920 Acres", primarySoil: "Alluvial Loam", avgYieldEst: "16.4 Quintals/Acre" }
  ]

  return (
    <AdminReportTemplate
      title="Crop Distribution & Advisory Trends"
      description="Aggregated crop selection, acreage breakdown, and seasonal cultivation practices."
      badgeLabel="Crop Intelligence"
      stats={stats}
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-4">
        <h3 className="font-extrabold text-lg text-gray-900">
          Most Selected Crops & Estimated Regional Acreage
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 uppercase text-[11px] font-bold">
                <th className="py-2.5 px-3">Crop Variety</th>
                <th className="py-2.5 px-3">Aggregate Acreage</th>
                <th className="py-2.5 px-3">Dominant Soil Profile</th>
                <th className="py-2.5 px-3 text-right">Avg Expected Productivity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cropAcreage.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/80">
                  <td className="py-3 px-3 font-bold text-gray-900">{row.crop}</td>
                  <td className="py-3 px-3 font-semibold text-gray-800">{row.acreage}</td>
                  <td className="py-3 px-3 text-gray-600 text-xs">{row.primarySoil}</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-emerald-800">{row.avgYieldEst}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminReportTemplate>
  )
}
