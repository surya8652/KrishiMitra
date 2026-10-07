import React from 'react'
import { AdminReportTemplate } from '@/components/AdminReportTemplate'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Users, TrendingUp, Smartphone } from 'lucide-react'

export const UserReportsPage: React.FC = () => {
  const stats = [
    { label: "Total Registered Farmers", value: "42,850", subtext: "+3,420 registered this month", badge: "+8.6%" },
    { label: "Daily Active Farmers (DAU)", value: "18,240", subtext: "Peak between 06:00 - 09:30 AM", badge: "42.5%" },
    { label: "Mobile Browser Users", value: "96.4%", subtext: "Android / KaiOS dominant", badge: "Mobile First" },
    { label: "Preferred Language: Marathi/Hindi", value: "78.2%", subtext: "Regional language usage", badge: "Vernacular" }
  ]

  const stateDistribution = [
    { state: "Maharashtra", districts: "Nashik, Pune, Latur, Solapur, Ahmednagar", total: "22,450", activeRate: "46%" },
    { state: "Gujarat", districts: "Rajkot, Junagadh, Amreli, Surat", total: "8,920", activeRate: "41%" },
    { state: "Madhya Pradesh", districts: "Sehore, Bhopal, Ujjain, Dewas", total: "5,840", activeRate: "39%" },
    { state: "Punjab & Haryana", districts: "Ludhiana, Karnal, Patiala, Bhatinda", total: "5,640", activeRate: "44%" }
  ]

  return (
    <AdminReportTemplate
      title="Farmer & User Demographics Report"
      description="Aggregated registration, regional clustering, and daily platform activity trends."
      badgeLabel="User Intelligence"
      stats={stats}
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-4">
        <h3 className="font-extrabold text-lg text-gray-900">
          Regional State & District Distribution (Aggregated)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 uppercase text-[11px] font-bold">
                <th className="py-2.5 px-3">State / Province</th>
                <th className="py-2.5 px-3">Key Mandi Districts</th>
                <th className="py-2.5 px-3">Enrolled Farmers</th>
                <th className="py-2.5 px-3 text-right">Daily Engagement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stateDistribution.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/80">
                  <td className="py-3 px-3 font-bold text-gray-900">{row.state}</td>
                  <td className="py-3 px-3 text-gray-600 text-xs">{row.districts}</td>
                  <td className="py-3 px-3 font-semibold text-gray-900">{row.total}</td>
                  <td className="py-3 px-3 text-right">
                    <Badge variant="success">{row.activeRate}</Badge>
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
