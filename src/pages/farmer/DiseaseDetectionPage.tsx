import React, { useState, useRef } from 'react'
import { useApp } from '@/context/AppContext'
import { diseaseService } from '@/services'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DiseaseDetectionResult } from '@/types'
import { 
  ScanSearch, 
  Camera, 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  BookmarkCheck, 
  ShieldAlert, 
  Sparkles,
  HelpCircle,
  FileCheck2
} from 'lucide-react'

export const DiseaseDetectionPage: React.FC = () => {
  const { addDiseaseReport, showToast, farmer } = useApp()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [selectedCrop, setSelectedCrop] = useState(farmer.mainCrops[0] || 'Tomato')
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<DiseaseDetectionResult | null>(null)

  // Realistic sample leaf photos for instant 1-tap testing
  const sampleLeaves = [
    {
      name: 'Tomato (Early Blight)',
      crop: 'Tomato',
      url: 'https://images.unsplash.com/photo-1592417817098-8f3d69102432?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Onion (Purple Blotch)',
      crop: 'Onion',
      url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Soybean (Leaf Spot)',
      crop: 'Soybean',
      url: 'https://images.unsplash.com/photo-1599818816941-86f7b1e7c53d?auto=format&fit=crop&w=600&q=80'
    }
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
        triggerAnalysis(reader.result as string, selectedCrop)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSelectSample = (sample: typeof sampleLeaves[0]) => {
    setSelectedCrop(sample.crop)
    setImagePreview(sample.url)
    triggerAnalysis(sample.url, sample.crop)
  }

  const triggerAnalysis = async (imgUrl: string, cropName: string) => {
    setAnalyzing(true)
    setResult(null)
    try {
      const analysisResult = await diseaseService.analyzeImage(imgUrl, cropName)
      setResult(analysisResult)
      addDiseaseReport(analysisResult)
    } finally {
      setAnalyzing(false)
    }
  }

  const handleReset = () => {
    setImagePreview(null)
    setResult(null)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-[#E8F5E9] text-[#1B5E20]">
            <ScanSearch className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Check Your Crop
            </h1>
            <p className="text-sm text-gray-600">
              Take a photo or upload a leaf image to diagnose crop diseases and get organic & standard treatments.
            </p>
          </div>
        </div>
      </div>

      {/* Upload Box or Analysis Result */}
      {!imagePreview ? (
        <div className="space-y-4">
          {/* Crop Selector */}
          <div className="bg-white p-4 rounded-xl border border-[#D1D5DB] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-sm font-bold text-gray-800">
              Select Crop to Check / पीक निवडा:
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              {['Tomato', 'Onion', 'Soybean', 'Cotton', 'Wheat', 'Rice'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelectedCrop(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    selectedCrop === c
                      ? 'bg-[#1B5E20] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Large Upload Area */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-[#2E7D32]/50 hover:border-[#1B5E20] bg-white rounded-3xl p-8 sm:p-12 text-center transition-all cursor-pointer hover:bg-[#F1F8F3]/50 shadow-xs group"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            <div className="mx-auto h-20 w-20 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[#1B5E20] mb-4 group-hover:scale-105 transition-transform">
              <Camera className="h-10 w-10" />
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-2">
              Take a photo or upload a leaf image
            </h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
              Hold camera 10–15 cm away from the leaf in bright natural light for the best diagnosis.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-sm mx-auto">
              <Button
                type="button"
                className="w-full bg-[#1B5E20] hover:bg-[#144818] text-white font-bold h-12 gap-2 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation()
                  fileInputRef.current?.click()
                }}
              >
                <Camera className="h-5 w-5" />
                <span>Take Photo</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full border-gray-300 hover:bg-gray-100 h-12 font-bold gap-2 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation()
                  fileInputRef.current?.click()
                }}
              >
                <Upload className="h-5 w-5" />
                <span>Upload Image</span>
              </Button>
            </div>
          </div>

          {/* Instant Sample Leaves for quick demo test */}
          <div className="bg-[#F8F9F5] p-4 sm:p-5 rounded-2xl border border-gray-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Or Try with Sample Leaf Images (1-Tap Test)
              </span>
              <span className="text-xs text-[#1B5E20] font-semibold">Ready for inspection</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {sampleLeaves.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectSample(sample)}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-gray-200 hover:border-[#1B5E20] hover:shadow-xs transition-all text-left cursor-pointer group"
                >
                  <img
                    src={sample.url}
                    alt={sample.name}
                    className="h-14 w-14 rounded-lg object-cover border border-gray-100 group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <h5 className="font-bold text-xs text-gray-900 group-hover:text-[#1B5E20]">
                      {sample.name}
                    </h5>
                    <span className="text-[11px] text-gray-500">Tap to diagnose</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Image Preview & Diagnosis Section */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Leaf Image Preview */}
            <div className="md:col-span-5 space-y-3">
              <div className="bg-white p-3 rounded-2xl border border-gray-200 shadow-xs">
                <div className="relative rounded-xl overflow-hidden bg-black/5 aspect-4/3 flex items-center justify-center">
                  <img
                    src={imagePreview}
                    alt="Analyzed leaf"
                    className="w-full h-full object-cover"
                  />
                  {analyzing && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center text-white p-4 text-center">
                      <RefreshCw className="h-10 w-10 text-emerald-400 animate-spin mb-3" />
                      <p className="font-bold text-base">Analyzing Leaf Patterns...</p>
                      <p className="text-xs text-gray-300 mt-1">Inspecting lesion boundaries & discoloration</p>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between mt-3 px-1">
                  <span className="text-xs font-bold text-gray-500">Crop: {selectedCrop}</span>
                  <button
                    onClick={handleReset}
                    className="text-xs font-bold text-gray-600 hover:text-red-600 underline cursor-pointer"
                  >
                    Change Photo
                  </button>
                </div>
              </div>
            </div>

            {/* Results Details */}
            <div className="md:col-span-7">
              {result && !analyzing ? (
                <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-xs space-y-5">
                  {/* Diagnosis Header */}
                  <div className="border-b border-gray-100 pb-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-gray-400">
                        Possible Issue / निदान
                      </span>
                      <Badge variant="warning">
                        AI Confidence: {result.confidence}%
                      </Badge>
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 mt-1">
                      {result.diseaseName}
                    </h2>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                        Severity: {result.severity}
                      </span>
                      <span className="text-xs text-gray-500">
                        Diagnosed on {result.date}
                      </span>
                    </div>
                  </div>

                  {/* Observed Symptoms */}
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-700">
                      Identified Symptoms:
                    </h4>
                    <ul className="space-y-1 text-xs sm:text-sm text-gray-700">
                      {result.symptoms.map((s, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-700 font-bold">•</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* What you can do (Simple recommendations) */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider flex items-center gap-2 text-[#1B5E20]">
                      <CheckCircle2 className="h-4 w-4 text-[#2E7D32]" />
                      What you can do / उपाय
                    </h4>
                    <div className="space-y-2">
                      {result.recommendations.map((rec, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-[#F8F9F5] border border-gray-100 text-xs sm:text-sm text-gray-800 leading-relaxed font-medium">
                          {rec}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-gray-100">
                    <Button
                      size="sm"
                      onClick={() => showToast('Saved to My Reports')}
                      className="bg-[#1B5E20] hover:bg-[#144818] text-white text-xs font-bold gap-1.5 cursor-pointer"
                    >
                      <BookmarkCheck className="h-4 w-4" />
                      <span>Save to My Reports</span>
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleReset}
                      className="text-xs font-bold border-gray-300 hover:bg-gray-100 gap-1.5 cursor-pointer"
                    >
                      <RefreshCw className="h-4 w-4" />
                      <span>Check Another Leaf</span>
                    </Button>
                  </div>

                  {/* Visible Expert Note */}
                  <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      <strong>Important Notice: </strong>
                      AI results are informational. For serious crop problems or exact chemical measures, consult a qualified agricultural expert or your local Krishi Vigyan Kendra.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center space-y-2">
                  <p className="text-sm text-gray-500">Diagnosis in progress...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
