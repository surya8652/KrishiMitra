import React from 'react'
import { AdminReportTemplate } from '@/components/AdminReportTemplate'
import { Badge } from '@/components/ui/badge'

export const MarketReportsPage: React.FC = () => {
  const stats = [
    { label: "Tracked Mandis (APMCs)", value: "184 APMCs", subtext: "Live e-NAM electronic integration", badge: "Live Feed" },
    { label: "Most Searched Mandi", value: "Nashik APMC", subtext: "42,100 lookups this week", badge: "#1 Mandi" },
    { label: "Top Price Volatility", value: "Tomato (+18.4%)", subtext: "Arrival supply variations", badge: "Volatile" },
    { label: "Average Realization vs MSP", value: "+12.8%", subtext: "Across soybean & wheat trades", badge: "Favorable" }
  ]

  const mandiArrivals = [
    { mandi: "Nashik APMC (MH)", crop: "Tomato", dailyArrival: "38,000 Crates", modalRate: "₹2,450 / Qtl", weeklyDelta: "+6.8%" },
    { mandi: "Lasalgaon APMC (MH)", crop: "Onion", dailyArrival: "45,000 Quintals", modalRate: "₹3,200 / Qtl", weeklyDelta: "+0.8%" },
    { mandi: "Latur APMC (MH)", crop: "Soybean", dailyArrival: "22,000 Bags", modalRate: "₹4,720 / Qtl", weeklyDelta: "+3.2%" },
    { mandi: "Rajkot APMC (GJ)", crop: "Cotton", dailyArrival: "18,500 Quintals", modalRate: "₹7,350 / Qtl", weeklyDelta: "-1.9%" },
    { mandi: "Khanna Mandi (PB)", crop: "Wheat", dailyArrival: "28,000 Bags", modalRate: "₹2,540 / Qtl", weeklyDelta: "+0.4%" }
  ]

  return (
    <AdminReportTemplate
      title="APMC Mandi & Price Surveillance Report"
      description="Daily arrival volumes, modal price oscillations, and interstate price disparities."
      badgeLabel="Mandi Intelligence"
      stats={stats}
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-4">
        <h3 className="font-extrabold text-lg text-gray-900">
          Daily Mandi Arrivals & Benchmark Modal Rates
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 uppercase text-[11px] font-bold">
                <th className="py-2.5 px-3">APMC Market Yard</th>
                <th className="py-2.5 px-3">Primary Commodity</th>
                <th className="py-2.5 px-3">Daily Arrival Quantity</th>
                <th className="py-2.5 px-3">Modal Realization</th>
                <th className="py-2.5 px-3 text-right">Weekly Delta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mandiArrivals.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/80">
                  <td className="py-3 px-3 font-bold text-gray-900">{row.mandi}</td>
                  <td className="py-3 px-3 text-gray-700">{row.crop}</td>
                  <td className="py-3 px-3 font-semibold text-gray-800">{row.dailyArrival}</td>
                  <td className="py-3 px-3 font-bold text-emerald-800">{row.modalRate}</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-emerald-700">
                    {row.weeklyDelta}
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
