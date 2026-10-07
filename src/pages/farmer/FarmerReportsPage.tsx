import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useApp } from '@/context/AppContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogHeader, DialogBody, DialogFooter } from '@/components/ui/dialog'
import { DiseaseDetectionResult, FarmingAdviceRecommendation } from '@/types'
import { 
  FileText, 
  Sprout, 
  ScanSearch, 
  CloudSun, 
  Droplet, 
  TrendingUp, 
  ShoppingBag, 
  Download, 
  Eye, 
  Calendar, 
  Filter, 
  ShieldCheck, 
  CheckCircle2, 
  Printer 
} from 'lucide-react'
import { pdfGenerator } from '@/lib/pdfGenerator'

export const FarmerReportsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get('tab') || 'crop'
  const { farmer, diseaseReports, farmAdviceList, irrigationAdvice, prices, marketplaceListings, showToast } = useApp()

  const [cropFilter, setCropFilter] = useState('All')
  const [selectedDiseaseDetail, setSelectedDiseaseDetail] = useState<DiseaseDetectionResult | null>(null)
  const [selectedAdviceDetail, setSelectedAdviceDetail] = useState<FarmingAdviceRecommendation | null>(null)

  const handleTabChange = (newTab: string) => {
    setSearchParams({ tab: newTab })
  }

  const handleDownloadFullReport = () => {
    try {
      const fileName = pdfGenerator.downloadFullFarmReport(
        farmer,
        farmAdviceList.length,
        diseaseReports.length,
        irrigationAdvice
      )
      showToast(`Downloaded full farm report: ${fileName}`)
    } catch (err) {
      console.error('PDF error, falling back to print:', err)
      window.print()
    }
  }

  const handleDownloadCropAdvice = (adv: FarmingAdviceRecommendation) => {
    try {
      const fileName = pdfGenerator.downloadCropAdviceReport(adv, farmer)
      showToast(`Downloaded crop advice PDF: ${fileName}`)
    } catch (err) {
      console.error(err)
      window.print()
    }
  }

  const handleDownloadDiseaseReport = (d: DiseaseDetectionResult) => {
    try {
      const fileName = pdfGenerator.downloadDiseaseReport(d, farmer)
      showToast(`Downloaded disease diagnosis PDF: ${fileName}`)
    } catch (err) {
      console.error(err)
      window.print()
    }
  }

  const filteredDiseaseReports = diseaseReports.filter(d => 
    cropFilter === 'All' ? true : d.crop.toLowerCase() === cropFilter.toLowerCase()
  )

  const filteredCropAdvice = farmAdviceList.filter(a => 
    cropFilter === 'All' ? true : a.crop.toLowerCase() === cropFilter.toLowerCase()
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#E8F5E9] text-[#1B5E20]">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                My Reports
              </h1>
              <p className="text-sm text-gray-600">
                Personalized farm records belonging exclusively to {farmer.name} ({farmer.village}, {farmer.district}, {farmer.state}).
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 no-print self-start sm:self-auto flex-wrap">
          <Button
            size="sm"
            variant="outline"
            onClick={() => window.print()}
            className="text-xs font-bold gap-1.5 cursor-pointer bg-white border-gray-300 hover:bg-gray-50"
          >
            <Printer className="h-4 w-4 text-gray-700" />
            <span>Print Records</span>
          </Button>

          <Button
            size="sm"
            onClick={handleDownloadFullReport}
            className="bg-[#1B5E20] hover:bg-[#144818] text-white font-bold gap-1.5 cursor-pointer shadow-xs"
          >
            <Download className="h-4 w-4" />
            <span>Download Full PDF Report</span>
          </Button>
        </div>
      </div>

      {/* Six Dedicated Report Category Navigation Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 no-print">
        <button
          type="button"
          onClick={() => handleTabChange('crop')}
          className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
            activeTab === 'crop'
              ? 'bg-[#1B5E20] text-white border-[#1B5E20] shadow-sm font-bold'
              : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-800'
          }`}
        >
          <Sprout className={`h-5 w-5 mx-auto mb-1 ${activeTab === 'crop' ? 'text-white' : 'text-[#1B5E20]'}`} />
          <span className="text-xs block">🌱 Crop Advice</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('disease')}
          className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
            activeTab === 'disease'
              ? 'bg-[#1B5E20] text-white border-[#1B5E20] shadow-sm font-bold'
              : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-800'
          }`}
        >
          <ScanSearch className={`h-5 w-5 mx-auto mb-1 ${activeTab === 'disease' ? 'text-white' : 'text-green-700'}`} />
          <span className="text-xs block">🍃 Disease Reports</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('weather')}
          className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
            activeTab === 'weather'
              ? 'bg-[#1B5E20] text-white border-[#1B5E20] shadow-sm font-bold'
              : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-800'
          }`}
        >
          <CloudSun className={`h-5 w-5 mx-auto mb-1 ${activeTab === 'weather' ? 'text-white' : 'text-sky-700'}`} />
          <span className="text-xs block">🌦️ Weather History</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('irrigation')}
          className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
            activeTab === 'irrigation'
              ? 'bg-[#1B5E20] text-white border-[#1B5E20] shadow-sm font-bold'
              : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-800'
          }`}
        >
          <Droplet className={`h-5 w-5 mx-auto mb-1 ${activeTab === 'irrigation' ? 'text-white' : 'text-blue-700'}`} />
          <span className="text-xs block">💧 Irrigation Log</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('market')}
          className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
            activeTab === 'market'
              ? 'bg-[#1B5E20] text-white border-[#1B5E20] shadow-sm font-bold'
              : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-800'
          }`}
        >
          <TrendingUp className={`h-5 w-5 mx-auto mb-1 ${activeTab === 'market' ? 'text-white' : 'text-amber-700'}`} />
          <span className="text-xs block">💰 Market Activity</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('marketplace')}
          className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
            activeTab === 'marketplace'
              ? 'bg-[#1B5E20] text-white border-[#1B5E20] shadow-sm font-bold'
              : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-800'
          }`}
        >
          <ShoppingBag className={`h-5 w-5 mx-auto mb-1 ${activeTab === 'marketplace' ? 'text-white' : 'text-orange-700'}`} />
          <span className="text-xs block">🛒 Marketplace Log</span>
        </button>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white p-3 rounded-xl border border-gray-200 flex items-center justify-between gap-3 text-xs no-print">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <span className="font-bold text-gray-700">Filter by Crop:</span>
          {['All', 'Tomato', 'Onion', 'Soybean'].map((c) => (
            <button
              key={c}
              onClick={() => setCropFilter(c)}
              className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                cropFilter === c ? 'bg-[#1B5E20] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <span className="text-gray-400 hidden sm:inline">
          Farmer ID: <strong className="text-gray-700">{farmer.id}</strong> (Private Record)
        </span>
      </div>

      {/* CONTENT TAB: 1. CROP ADVICE */}
      {activeTab === 'crop' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              🌱 My Crop Recommendations ({filteredCropAdvice.length})
            </h3>

            <div className="divide-y divide-gray-100">
              {filteredCropAdvice.map((adv) => (
                <div key={adv.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="success">{adv.crop}</Badge>
                      <span className="text-xs text-gray-400">{adv.date}</span>
                    </div>
                    <h4 className="font-extrabold text-base text-gray-900">{adv.recommendedAction}</h4>
                    <p className="text-xs text-gray-600 max-w-xl">{adv.whyRecommendation[0]}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedAdviceDetail(adv)}
                      className="text-xs font-bold gap-1 cursor-pointer"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>View Details</span>
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleDownloadCropAdvice(adv)}
                      className="text-xs font-bold bg-[#1B5E20] hover:bg-[#144818] text-white cursor-pointer"
                    >
                      Download PDF
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CONTENT TAB: 2. DISEASE REPORTS */}
      {activeTab === 'disease' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              🍃 My Disease Reports ({filteredDiseaseReports.length})
            </h3>

            <div className="divide-y divide-gray-100">
              {filteredDiseaseReports.map((d) => (
                <div key={d.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={d.imageUrl}
                      alt={d.diseaseName}
                      className="h-16 w-16 rounded-xl object-cover border border-gray-200 shrink-0"
                    />
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Badge variant="warning">{d.crop}</Badge>
                        <span className="text-xs text-gray-400">{d.date}</span>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          {d.confidence}% Confidence
                        </span>
                      </div>
                      <h4 className="font-extrabold text-base text-gray-900">{d.diseaseName}</h4>
                      <p className="text-xs text-gray-600 line-clamp-1">{d.recommendations[0]}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedDiseaseDetail(d)}
                      className="text-xs font-bold gap-1 cursor-pointer"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>View Details</span>
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleDownloadDiseaseReport(d)}
                      className="text-xs font-bold bg-[#1B5E20] hover:bg-[#144818] text-white cursor-pointer"
                    >
                      Download PDF
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CONTENT TAB: 3. WEATHER HISTORY */}
      {activeTab === 'weather' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs space-y-3">
          <h3 className="text-lg font-bold text-gray-900">🌦️ My Weather History & Alerts</h3>
          <p className="text-xs text-gray-500">Historical weather advisories received for {farmer.district}, {farmer.state}.</p>
          <div className="space-y-2 pt-2">
            <div className="p-3.5 rounded-xl bg-[#F8F9F5] border border-gray-200 flex justify-between items-center text-xs">
              <div>
                <strong className="text-gray-900 block text-sm">Heavy Rain & Thunderstorm Advisory</strong>
                <span className="text-gray-500">Postpone pesticide spraying and drip irrigation cycle.</span>
              </div>
              <span className="font-bold text-gray-400">03 Oct 2026</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#F8F9F5] border border-gray-200 flex justify-between items-center text-xs">
              <div>
                <strong className="text-gray-900 block text-sm">Scattered Showers Warning</strong>
                <span className="text-gray-500">Clear drainage furrows around tomato beds to prevent stagnation.</span>
              </div>
              <span className="font-bold text-gray-400">28 Sep 2026</span>
            </div>
          </div>
        </div>
      )}

      {/* CONTENT TAB: 4. IRRIGATION ACTIVITY */}
      {activeTab === 'irrigation' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">💧 My Irrigation Logbook</h3>
            <span className="text-xs text-gray-500 font-bold">{irrigationAdvice.logs.length} Cycles</span>
          </div>

          <div className="divide-y divide-gray-100">
            {irrigationAdvice.logs.map((log) => (
              <div key={log.id} className="py-3 flex justify-between items-center text-xs">
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{log.crop} — {log.method}</h4>
                  <span className="text-gray-500">{log.notes || 'Normal cycle'}</span>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-gray-900 block">{log.waterAmount}</span>
                  <span className="text-gray-400">{log.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONTENT TAB: 5. MARKET ACTIVITY */}
      {activeTab === 'market' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs space-y-3">
          <h3 className="text-lg font-bold text-gray-900">💰 My Market Watchlist</h3>
          <div className="divide-y divide-gray-100">
            {prices.map((p) => (
              <div key={p.id} className="py-3 flex justify-between items-center text-xs">
                <div>
                  <strong className="text-sm text-gray-900 block">{p.crop} ({p.variety})</strong>
                  <span className="text-gray-500">{p.market}</span>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-base text-[#1B5E20] block">₹{p.modalPrice} / Quintal</span>
                  <span className="text-gray-400">{p.updatedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONTENT TAB: 6. MARKETPLACE ACTIVITY */}
      {activeTab === 'marketplace' && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs space-y-3">
          <h3 className="text-lg font-bold text-gray-900">🛒 My Harvest Listings</h3>
          <div className="divide-y divide-gray-100">
            {marketplaceListings.filter(l => l.sellerName === farmer.name).map((item) => (
              <div key={item.id} className="py-3 flex justify-between items-center text-xs">
                <div className="flex items-center gap-3">
                  <img src={item.imageUrl} alt={item.crop} className="h-12 w-12 rounded-lg object-cover" />
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">{item.crop}</h4>
                    <span className="text-gray-500">{item.quantity} {item.unit} • ₹{item.pricePerUnit} / unit</span>
                  </div>
                </div>
                <Badge variant="success">Active</Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detailed Modal for Disease Report */}
      {selectedDiseaseDetail && (
        <Dialog open={!!selectedDiseaseDetail} onOpenChange={(open) => !open && setSelectedDiseaseDetail(null)}>
          <DialogHeader
            title={selectedDiseaseDetail.diseaseName}
            description={`Diagnosed on ${selectedDiseaseDetail.date} for ${selectedDiseaseDetail.crop}`}
            onClose={() => setSelectedDiseaseDetail(null)}
          />
          <DialogBody>
            <div className="space-y-4">
              <img
                src={selectedDiseaseDetail.imageUrl}
                alt="Leaf scan"
                className="w-full h-44 object-cover rounded-xl border border-gray-200"
              />

              <div className="flex items-center justify-between text-xs">
                <Badge variant="warning">Confidence: {selectedDiseaseDetail.confidence}%</Badge>
                <span className="text-gray-500 font-bold">Severity: {selectedDiseaseDetail.severity}</span>
              </div>

              <div>
                <strong className="text-xs font-bold text-gray-700 uppercase block mb-1">Recommendations:</strong>
                <ul className="space-y-1 text-xs text-gray-700">
                  {selectedDiseaseDetail.recommendations.map((r, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-700 font-bold">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-lg bg-gray-50 text-[11px] text-gray-500">
                {selectedDiseaseDetail.disclaimer}
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button size="sm" onClick={() => setSelectedDiseaseDetail(null)}>
              Close
            </Button>
          </DialogFooter>
        </Dialog>
      )}

      {/* Detailed Modal for Farm Advisory */}
      {selectedAdviceDetail && (
        <Dialog open={!!selectedAdviceDetail} onOpenChange={(open) => !open && setSelectedAdviceDetail(null)}>
          <DialogHeader
            title={selectedAdviceDetail.recommendedAction}
            description={`${selectedAdviceDetail.crop} • ${selectedAdviceDetail.landSize} • ${selectedAdviceDetail.date}`}
            onClose={() => setSelectedAdviceDetail(null)}
          />
          <DialogBody>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3 rounded-xl bg-[#F8F9F5] border border-gray-200">
                <strong className="text-gray-900 block mb-1">Irrigation Schedule:</strong>
                <p className="text-gray-700">{selectedAdviceDetail.irrigationRecommendation}</p>
              </div>

              <div className="space-y-1">
                <strong className="text-gray-900 block">Basic Practices:</strong>
                {selectedAdviceDetail.basicPractices.map((b, i) => (
                  <div key={i} className="text-xs text-gray-600">• {b}</div>
                ))}
              </div>

              <div className="p-2.5 rounded-lg bg-[#EFEBE9] text-[#4E342E] text-xs">
                <strong>Nutrient Tip: </strong> {selectedAdviceDetail.fertilizerTip}
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button size="sm" onClick={() => setSelectedAdviceDetail(null)}>
              Close
            </Button>
          </DialogFooter>
        </Dialog>
      )}
    </div>
  )
}
