import React from 'react'
import { AdminReportTemplate } from '@/components/AdminReportTemplate'
import { Badge } from '@/components/ui/badge'

export const SystemReportsPage: React.FC = () => {
  const stats = [
    { label: "Total AI Inferences", value: "152,890", subtext: "Foliar ML & seasonal advisories", badge: "24h Load" },
    { label: "Median Latency (p50)", value: "640 ms", subtext: "Edge acceleration enabled", badge: "Fast" },
    { label: "Failed Request Rate", value: "0.02%", subtext: "28 retried successfully", badge: "Resilient" },
    { label: "System Operational Uptime", value: "99.98%", subtext: "Zero critical service degradations", badge: "Healthy" }
  ]

  const microservices = [
    { service: "Edge Disease Vision Service", endpoint: "api/v1/cv/foliar-inspect", requests: "94,120", p95Latency: "820 ms", uptime: "99.99%", status: "Operational" },
    { service: "Agro-Meteorological Stream", endpoint: "api/v1/weather/radar-telemetry", requests: "148,200", p95Latency: "180 ms", uptime: "100.0%", status: "Operational" },
    { service: "e-NAM / Mandi Price Ingestion", endpoint: "api/v1/market/prices/stream", requests: "82,500", p95Latency: "310 ms", uptime: "99.95%", status: "Operational" },
    { service: "Irrigation Telemetry & Scheduler", endpoint: "api/v1/irrigation/soil-check", requests: "64,300", p95Latency: "240 ms", uptime: "99.98%", status: "Operational" },
    { service: "SMS & Vernacular Voice Dispatcher", endpoint: "api/v1/notify/voice-sms", requests: "284,500", p95Latency: "950 ms", uptime: "99.92%", status: "Operational" }
  ]

  return (
    <AdminReportTemplate
      title="AI Engine & Distributed Infrastructure Telemetry"
      description="API gateway metrics, neural inference latency, error budgets, and backend microservice health."
      badgeLabel="System Engineering"
      stats={stats}
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-4">
        <h3 className="font-extrabold text-lg text-gray-900">
          Decoupled Microservice Health & Ingestion Pipeline
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 uppercase text-[11px] font-bold">
                <th className="py-2.5 px-3">Service Name</th>
                <th className="py-2.5 px-3">Gateway Endpoint</th>
                <th className="py-2.5 px-3">24h Requests</th>
                <th className="py-2.5 px-3">p95 Latency</th>
                <th className="py-2.5 px-3">SLA Uptime</th>
                <th className="py-2.5 px-3 text-right">Service Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {microservices.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/80">
                  <td className="py-3 px-3 font-bold text-gray-900">{row.service}</td>
                  <td className="py-3 px-3 font-mono text-xs text-gray-500">{row.endpoint}</td>
                  <td className="py-3 px-3 font-bold text-gray-800">{row.requests}</td>
                  <td className="py-3 px-3 text-xs text-gray-600 font-mono">{row.p95Latency}</td>
                  <td className="py-3 px-3 text-emerald-800 font-bold font-mono">{row.uptime}</td>
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
    </AdminReportTemplate>
  )
}
