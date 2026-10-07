import React from 'react'
import { AdminReportTemplate } from '@/components/AdminReportTemplate'
import { Badge } from '@/components/ui/badge'

export const MarketplaceReportsPage: React.FC = () => {
  const stats = [
    { label: "Active Harvest Listings", value: "3,420 Listings", subtext: "Across 62 commodities", badge: "Live Supply" },
    { label: "Gross Trade Inquiries", value: "8,940 Inquiries", subtext: "Direct farmer-to-buyer calls", badge: "+22.5%" },
    { label: "Estimated Trade GMV", value: "₹18.4 Crore", subtext: "Zero middleman fee extracted", badge: "Farmer Kept" },
    { label: "Organic Produce Share", value: "18.5%", subtext: "Certified residue-free lots", badge: "Premium" }
  ]

  const categoryBreakdown = [
    { category: "Fresh Vegetables (Tomato, Onion, Chili)", listings: "1,540", gmv: "₹6.8 Cr", topOrigin: "Nashik & Pune", avgDaysToSell: "1.8 Days" },
    { category: "Oilseeds & Pulses (Soybean, Gram, Tur)", listings: "890", gmv: "₹5.4 Cr", topOrigin: "Latur & Nanded", avgDaysToSell: "3.2 Days" },
    { category: "Cereals & Grains (Wheat, Paddy, Millet)", listings: "610", gmv: "₹3.9 Cr", topOrigin: "Ludhiana & Sehore", avgDaysToSell: "4.5 Days" },
    { category: "Commercial Cash Crops (Cotton, Cane)", listings: "380", gmv: "₹2.3 Cr", topOrigin: "Rajkot & Baramati", avgDaysToSell: "2.6 Days" }
  ]

  return (
    <AdminReportTemplate
      title="Farmer Marketplace & Direct Trade Report"
      description="Aggregated harvest listing inventory, trade inquiry metrics, and estimated gross transaction value."
      badgeLabel="Marketplace Analytics"
      stats={stats}
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-4">
        <h3 className="font-extrabold text-lg text-gray-900">
          Commodity Category Volume & Trade Velocity
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 uppercase text-[11px] font-bold">
                <th className="py-2.5 px-3">Commodity Group</th>
                <th className="py-2.5 px-3">Active Postings</th>
                <th className="py-2.5 px-3">Gross Trade Volume (Est.)</th>
                <th className="py-2.5 px-3">Primary Source Belts</th>
                <th className="py-2.5 px-3 text-right">Avg Liquidity Speed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categoryBreakdown.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/80">
                  <td className="py-3 px-3 font-bold text-gray-900">{row.category}</td>
                  <td className="py-3 px-3 font-semibold text-gray-800">{row.listings}</td>
                  <td className="py-3 px-3 font-bold text-emerald-800">{row.gmv}</td>
                  <td className="py-3 px-3 text-xs text-gray-600">{row.topOrigin}</td>
                  <td className="py-3 px-3 text-right font-medium text-emerald-700">{row.avgDaysToSell}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminReportTemplate>
  )
}
