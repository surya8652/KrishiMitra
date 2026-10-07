import React from 'react'
import { AdminReportTemplate } from '@/components/AdminReportTemplate'
import { Badge } from '@/components/ui/badge'

export const DiseaseReportsPage: React.FC = () => {
  const stats = [
    { label: "Total AI Diagnoses", value: "94,120", subtext: "Foliar computer vision scans", badge: "Live ML" },
    { label: "Overall AI Confidence", value: "91.8%", subtext: "Validated against KVK standards", badge: "High Accuracy" },
    { label: "Top Identified Pathogen", value: "Early Blight", subtext: "Alternaria solani (Tomato/Solanaceae)", badge: "Epidemic Alert" },
    { label: "Resolved / Treated Rate", value: "84.2%", subtext: "Follow-up spray compliance", badge: "Effective" }
  ]

  const diseaseEpidemiology = [
    { name: "Tomato Early Blight", hostCrop: "Tomato", scans: "35,760", avgConfidence: "93.4%", hotSpots: "Nashik, Dindori, Niphad", severity: "High (Rain Trigger)" },
    { name: "Onion Purple Blotch", hostCrop: "Onion", scans: "27,290", avgConfidence: "89.2%", hotSpots: "Lasalgaon, Yeola, Pimpalgaon", severity: "Moderate" },
    { name: "Soybean Downy Mildew", hostCrop: "Soybean", scans: "17,870", avgConfidence: "91.0%", hotSpots: "Latur, Nanded, Akola", severity: "Low to Moderate" },
    { name: "Cotton Leaf Curl Virus", hostCrop: "Cotton", scans: "13,200", avgConfidence: "94.1%", hotSpots: "Rajkot, Surendranagar", severity: "Localized Alert" }
  ]

  return (
    <AdminReportTemplate
      title="Disease Epidemiological Surveillance Report"
      description="Computer vision foliar diagnostic volume, pathogen clustering, and outbreak hotspot telemetry."
      badgeLabel="Pathogen Surveillance"
      stats={stats}
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-4">
        <h3 className="font-extrabold text-lg text-gray-900">
          Aggregated Pathogen Detection & Regional Hotspots
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 uppercase text-[11px] font-bold">
                <th className="py-2.5 px-3">Pathogen / Disease</th>
                <th className="py-2.5 px-3">Host Crop</th>
                <th className="py-2.5 px-3">Diagnostic Scans</th>
                <th className="py-2.5 px-3">Avg AI Confidence</th>
                <th className="py-2.5 px-3">Identified Hotspots</th>
                <th className="py-2.5 px-3 text-right">Advisory Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {diseaseEpidemiology.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/80">
                  <td className="py-3 px-3 font-bold text-gray-900">{row.name}</td>
                  <td className="py-3 px-3 font-semibold text-gray-700">{row.hostCrop}</td>
                  <td className="py-3 px-3 font-mono font-bold text-gray-900">{row.scans}</td>
                  <td className="py-3 px-3 text-emerald-700 font-bold">{row.avgConfidence}</td>
                  <td className="py-3 px-3 text-xs text-gray-600">{row.hotSpots}</td>
                  <td className="py-3 px-3 text-right">
                    <Badge variant={i === 0 ? 'warning' : 'default'} className="text-[10px]">
                      {row.severity}
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
