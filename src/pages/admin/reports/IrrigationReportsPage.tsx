import React from 'react'
import { AdminReportTemplate } from '@/components/AdminReportTemplate'
import { Badge } from '@/components/ui/badge'

export const IrrigationReportsPage: React.FC = () => {
  const stats = [
    { label: "Watering Cycles Logged", value: "112,400", subtext: "Recorded in farmer logbooks", badge: "+14.2%" },
    { label: "Drip Irrigation Adoption", value: "79.2%", subtext: "Micro-irrigation subsidy verified", badge: "Water Smart" },
    { label: "Groundwater Saved (Est.)", value: "48.2 Cr Litres", subtext: "Through postponement advisories", badge: "Conservation" },
    { label: "Average Watering Duration", value: "42 Mins", subtext: "Every 2.8 days frequency", badge: "Optimal" }
  ]

  const irrigationData = [
    { district: "Nashik, MH", dominantMethod: "Drip (Inline 16mm)", avgWaterUsage: "1,250 L/Acre/Cycle", postponementCompliance: "91.2%", waterStatus: "Adequate" },
    { district: "Pune, MH", dominantMethod: "Drip + Furrow", avgWaterUsage: "1,450 L/Acre/Cycle", postponementCompliance: "86.4%", waterStatus: "Adequate" },
    { district: "Latur, MH", dominantMethod: "Broadcasting / Drip", avgWaterUsage: "1,800 L/Acre/Cycle", postponementCompliance: "78.0%", waterStatus: "Critical Watch" },
    { district: "Rajkot, GJ", dominantMethod: "Micro-sprinklers", avgWaterUsage: "1,320 L/Acre/Cycle", postponementCompliance: "84.5%", waterStatus: "Moderate" }
  ]

  return (
    <AdminReportTemplate
      title="Irrigation & Groundwater Conservation Report"
      description="Aggregated farm watering cycles, micro-irrigation adoption percentages, and water conservation analytics."
      badgeLabel="Irrigation Telemetry"
      stats={stats}
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-4">
        <h3 className="font-extrabold text-lg text-gray-900">
          Regional Irrigation Practices & Conservation Compliance
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 uppercase text-[11px] font-bold">
                <th className="py-2.5 px-3">Agricultural District</th>
                <th className="py-2.5 px-3">Dominant Watering System</th>
                <th className="py-2.5 px-3">Avg Delivered Volume</th>
                <th className="py-2.5 px-3">Advisory Compliance Rate</th>
                <th className="py-2.5 px-3 text-right">Aquifer Reserve Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {irrigationData.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/80">
                  <td className="py-3 px-3 font-bold text-gray-900">{row.district}</td>
                  <td className="py-3 px-3 text-gray-700">{row.dominantMethod}</td>
                  <td className="py-3 px-3 font-semibold text-gray-900">{row.avgWaterUsage}</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">{row.postponementCompliance}</td>
                  <td className="py-3 px-3 text-right">
                    <Badge variant={row.waterStatus === 'Adequate' ? 'success' : 'warning'} className="text-[10px]">
                      {row.waterStatus}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminReportTemplate>
  )
}
