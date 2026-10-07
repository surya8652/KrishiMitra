import React from 'react'
import { AdminReportTemplate } from '@/components/AdminReportTemplate'
import { Badge } from '@/components/ui/badge'

export const WeatherReportsPage: React.FC = () => {
  const stats = [
    { label: "Active Regional Alerts", value: "14 Districts", subtext: "Nashik & Niphad storm warnings", badge: "Live Radar" },
    { label: "Alerts Dispatched", value: "284,500", subtext: "SMS, push & morning advisory", badge: "Broadcasted" },
    { label: "Postponed Sprays Logged", value: "12,420", subtext: "Prevented chemical wash-off loss", badge: "Saved ₹2.4 Cr" },
    { label: "Avg Rain Accuracy (24h)", value: "89.5%", subtext: "Telemetry backed by IMD radar", badge: "High Confidence" }
  ]

  const alertHistory = [
    { event: "Thunderstorm & Heavy Showers (18-25mm)", region: "North Maharashtra (Nashik/Niphad)", impactedFarmers: "38,200", actionAdvised: "Postpone Drip & Fungicide Spraying", date: "04-05 Oct 2026" },
    { event: "High Relative Humidity (>85%)", region: "Western Maharashtra (Pune/Satara)", impactedFarmers: "24,500", actionAdvised: "Scout for Downy Mildew Sporulation", date: "01-03 Oct 2026" },
    { event: "Extended Dry Spell (7 Days)", region: "Marathwada (Latur/Beed)", impactedFarmers: "19,800", actionAdvised: "Conserve Moisture via Plastic Mulch", date: "22-29 Sep 2026" },
    { event: "Sudden Night Temperature Drop (16°C)", region: "Punjab (Ludhiana/Karnal)", impactedFarmers: "14,200", actionAdvised: "Foliar Zinc & Potassium spray", date: "24 Sep 2026" }
  ]

  return (
    <AdminReportTemplate
      title="Agro-Meteorological & Alerts Report"
      description="Regional weather intelligence, automated farmer alert dispatch records, and moisture telemetry."
      badgeLabel="Weather Intelligence"
      stats={stats}
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-4">
        <h3 className="font-extrabold text-lg text-gray-900">
          Regional Weather Alert Generation Log
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 uppercase text-[11px] font-bold">
                <th className="py-2.5 px-3">Weather Event</th>
                <th className="py-2.5 px-3">Impacted Belt</th>
                <th className="py-2.5 px-3">Targeted Farmers</th>
                <th className="py-2.5 px-3">Dispatched Recommendation</th>
                <th className="py-2.5 px-3 text-right">Observation Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {alertHistory.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/80">
                  <td className="py-3 px-3 font-bold text-gray-900">{row.event}</td>
                  <td className="py-3 px-3 text-gray-700 text-xs">{row.region}</td>
                  <td className="py-3 px-3 font-semibold text-gray-900">{row.impactedFarmers}</td>
                  <td className="py-3 px-3 text-xs text-amber-900 font-semibold">{row.actionAdvised}</td>
                  <td className="py-3 px-3 text-right text-xs text-gray-500 font-mono">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminReportTemplate>
  )
}
