import { jsPDF } from 'jspdf'
import { FarmerProfile, DiseaseDetectionResult, FarmingAdviceRecommendation, IrrigationAdvice } from '@/types'

function sanitizeText(str: string | undefined | null): string {
  if (!str) return ''
  return String(str)
    .replace(/[•●▪]/g, '-')
    .replace(/₹/g, 'Rs. ')
    .replace(/[—–]/g, '-')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '') // strip emojis
    .replace(/[^\x00-\x7F]/g, ' ') // clean non-ASCII for jsPDF standard fonts
    .trim()
}

function triggerDownload(doc: jsPDF, filename: string) {
  try {
    const blob = doc.output('blob')
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    setTimeout(() => {
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }, 500)
  } catch {
    doc.save(filename)
  }
}

export const pdfGenerator = {
  // 1. Download Disease Diagnosis Report as real PDF
  downloadDiseaseReport: (report: DiseaseDetectionResult, farmer: FarmerProfile): string => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })
    const pageWidth = doc.internal.pageSize.getWidth()

    // Header Band (Agricultural Deep Green)
    doc.setFillColor(27, 94, 32)
    doc.rect(0, 0, pageWidth, 28, 'F')

    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(15)
    doc.text('KRISHIMITRA AI - CROP HEALTH REPORT', 14, 13)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.text('Ministry of Agriculture & Farmers Welfare Guidelines - Kisan Seva Portal', 14, 21)

    // Farmer & Plot Details Box
    doc.setFillColor(248, 249, 245)
    doc.rect(14, 34, pageWidth - 28, 30, 'F')
    doc.setDrawColor(200, 210, 200)
    doc.rect(14, 34, pageWidth - 28, 30, 'S')

    doc.setTextColor(30, 41, 34)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text(`Farmer: ${sanitizeText(farmer.name)}`, 18, 42)
    doc.text(`Mobile: ${sanitizeText(farmer.phone)}`, 110, 42)

    doc.setFont('helvetica', 'normal')
    doc.text(`Location: ${sanitizeText(farmer.village)}, ${sanitizeText(farmer.district)}, ${sanitizeText(farmer.state)}`, 18, 50)
    doc.text(`Land Holding: ${farmer.landSize} ${farmer.landUnit || 'Acres'} - Soil: ${sanitizeText(farmer.soilType)}`, 18, 58)
    doc.text(`Report Date: ${sanitizeText(report.date)}`, 110, 50)

    // Diagnosis Section
    let y = 72
    doc.setFillColor(232, 245, 233)
    doc.rect(14, y, pageWidth - 28, 18, 'F')
    doc.setTextColor(27, 94, 32)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.text(`DIAGNOSIS: ${sanitizeText(report.diseaseName).toUpperCase()}`, 18, y + 8)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.text(`Crop: ${sanitizeText(report.crop)}   |   Confidence: ${report.confidence}%   |   Severity: ${sanitizeText(report.severity)}`, 18, y + 14)

    // Identified Symptoms
    y += 26
    doc.setTextColor(20, 30, 20)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.text('Observed Leaf Symptoms:', 14, y)
    y += 6

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    const symptoms = report.symptoms || []
    symptoms.forEach((sym) => {
      const splitText = doc.splitTextToSize(`- ${sanitizeText(sym)}`, pageWidth - 36)
      doc.text(splitText, 18, y)
      y += (splitText.length * 5) + 1
    })

    // Treatment & Recommended Action
    y += 4
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.text('Recommended Treatment Protocol:', 14, y)
    y += 6

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    const recs = report.recommendations || []
    recs.forEach((rec) => {
      const splitText = doc.splitTextToSize(`- ${sanitizeText(rec)}`, pageWidth - 36)
      doc.text(splitText, 18, y)
      y += (splitText.length * 5) + 2
    })

    // Preventive Measures
    y += 4
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.text('Preventive Cultural Measures:', 14, y)
    y += 6

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    const prevs = report.preventiveMeasures || []
    prevs.forEach((prev) => {
      const splitText = doc.splitTextToSize(`- ${sanitizeText(prev)}`, pageWidth - 36)
      doc.text(splitText, 18, y)
      y += (splitText.length * 5) + 2
    })

    // Footer & Disclaimer
    doc.setFillColor(255, 248, 225)
    doc.rect(14, 255, pageWidth - 28, 26, 'F')
    doc.setTextColor(140, 80, 0)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'bold')
    doc.text('Kisan Advisory Disclaimer:', 18, 261)
    doc.setFont('helvetica', 'normal')
    doc.text('This AI diagnosis is informational. For severe infestations, verify with your local Krishi Vigyan Kendra (KVK).', 18, 267)
    doc.text('Toll-Free Kisan Call Centre Helpline: 1800-180-1551 (6:00 AM to 10:00 PM, All 7 Days)', 18, 273)

    const safeName = `KrishiMitra_${sanitizeText(report.crop).replace(/\s+/g, '_')}_Disease_Report_${Date.now()}.pdf`
    triggerDownload(doc, safeName)
    return safeName
  },

  // 2. Download Crop Advice & Nutrient Protocol as real PDF
  downloadCropAdviceReport: (advice: FarmingAdviceRecommendation, farmer: FarmerProfile): string => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })
    const pageWidth = doc.internal.pageSize.getWidth()

    // Header Band
    doc.setFillColor(27, 94, 32)
    doc.rect(0, 0, pageWidth, 28, 'F')

    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(15)
    doc.text('KRISHIMITRA AI - FARM ADVISORY REPORT', 14, 13)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.text('Seasonal Soil, Crop Management & Irrigation Plan - All-India Kisan Guidance', 14, 21)

    // Farmer info
    doc.setFillColor(248, 249, 245)
    doc.rect(14, 34, pageWidth - 28, 30, 'F')
    doc.setDrawColor(200, 210, 200)
    doc.rect(14, 34, pageWidth - 28, 30, 'S')

    doc.setTextColor(30, 41, 34)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text(`Farmer: ${sanitizeText(farmer.name)}`, 18, 42)
    doc.text(`Mobile: ${sanitizeText(farmer.phone)}`, 110, 42)

    doc.setFont('helvetica', 'normal')
    doc.text(`Field: ${sanitizeText(advice.location)}  |  Soil: ${sanitizeText(advice.soilType)}`, 18, 50)
    doc.text(`Crop: ${sanitizeText(advice.crop)}  |  Season: ${sanitizeText(advice.season)}  |  Area: ${sanitizeText(advice.landSize)}`, 18, 58)

    // Recommended Action Banner
    let y = 72
    doc.setFillColor(232, 245, 233)
    doc.rect(14, y, pageWidth - 28, 16, 'F')
    doc.setTextColor(27, 94, 32)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.text(`RECOMMENDED PRACTICE: ${sanitizeText(advice.recommendedAction).toUpperCase()}`, 18, y + 10)

    // Why this advice?
    y += 24
    doc.setTextColor(20, 30, 20)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.text('Why this recommendation?', 14, y)
    y += 6

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    const whyList = advice.whyRecommendation || []
    whyList.forEach((pt) => {
      const splitText = doc.splitTextToSize(`- ${sanitizeText(pt)}`, pageWidth - 36)
      doc.text(splitText, 18, y)
      y += (splitText.length * 5) + 2
    })

    // Irrigation Guidance
    y += 4
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.text('Irrigation & Water Management:', 14, y)
    y += 6

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    const irrText = doc.splitTextToSize(sanitizeText(advice.irrigationRecommendation), pageWidth - 36)
    doc.text(irrText, 18, y)
    y += (irrText.length * 5) + 4

    // Basic Farming Practices
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.text('Recommended Field Practices:', 14, y)
    y += 6

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    const basicPractices = advice.basicPractices || []
    basicPractices.forEach((bp) => {
      const splitText = doc.splitTextToSize(`- ${sanitizeText(bp)}`, pageWidth - 36)
      doc.text(splitText, 18, y)
      y += (splitText.length * 5) + 2
    })

    // Fertilizer & Nutrient Tip
    if (advice.fertilizerTip) {
      y += 4
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.text(`Fertilizer Recommendation: ${sanitizeText(advice.fertilizerTip)}`, 18, y)
      y += 8
    }

    // Footer
    doc.setFillColor(255, 248, 225)
    doc.rect(14, 255, pageWidth - 28, 26, 'F')
    doc.setTextColor(140, 80, 0)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'bold')
    doc.text('Kisan Advisory Disclaimer:', 18, 261)
    doc.setFont('helvetica', 'normal')
    doc.text('Guidance is prepared based on agro-climatic zones and soil data. Actual results depend on weather variations.', 18, 267)
    doc.text('Toll-Free Kisan Call Centre Helpline: 1800-180-1551', 18, 273)

    const safeName = `KrishiMitra_${sanitizeText(advice.crop).replace(/\s+/g, '_')}_Farming_Advice_${Date.now()}.pdf`
    triggerDownload(doc, safeName)
    return safeName
  },

  // 3. Download Full Personal Farm Report (Consolidated)
  downloadFullFarmReport: (farmer: FarmerProfile, adviceCount: number, diseaseCount: number, irrigation: IrrigationAdvice): string => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })
    const pageWidth = doc.internal.pageSize.getWidth()

    doc.setFillColor(27, 94, 32)
    doc.rect(0, 0, pageWidth, 28, 'F')

    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(15)
    doc.text('KRISHIMITRA AI - COMPLETE FARM REPORT', 14, 13)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.text(`Official Farm Record for ${sanitizeText(farmer.name)} - ${sanitizeText(farmer.district)}, ${sanitizeText(farmer.state)}`, 14, 21)

    // Farmer Profile Block
    doc.setFillColor(248, 249, 245)
    doc.rect(14, 34, pageWidth - 28, 38, 'F')
    doc.setDrawColor(200, 210, 200)
    doc.rect(14, 34, pageWidth - 28, 38, 'S')

    doc.setTextColor(30, 41, 34)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text(`Farmer Name: ${sanitizeText(farmer.name)}`, 18, 42)
    doc.text(`Contact: ${sanitizeText(farmer.phone)}`, 110, 42)

    doc.setFont('helvetica', 'normal')
    doc.text(`Village / District / State: ${sanitizeText(farmer.village)}, ${sanitizeText(farmer.district)}, ${sanitizeText(farmer.state)}`, 18, 50)
    doc.text(`Total Holding: ${farmer.landSize} ${farmer.landUnit || 'Acres'} (${sanitizeText(farmer.soilType)})`, 18, 58)
    const cropsStr = Array.isArray(farmer.mainCrops) ? farmer.mainCrops.join(', ') : (farmer.mainCrops || 'Tomato, Onion')
    doc.text(`Primary Crops: ${sanitizeText(cropsStr)}`, 18, 66)

    // Summary of logs
    let y = 80
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.text('Farm Records Summary:', 14, y)
    y += 8

    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.text(`- Crop Advisories on Record: ${adviceCount}`, 18, y)
    y += 6
    doc.text(`- Disease Diagnoses Completed: ${diseaseCount}`, 18, y)
    y += 6
    const logList = (irrigation && Array.isArray(irrigation.logs)) ? irrigation.logs : []
    doc.text(`- Irrigation Sessions Logged: ${logList.length}`, 18, y)
    y += 6
    doc.text(`- Current Soil Moisture Status: ${sanitizeText(irrigation?.soilMoistureLevel || 'Adequate')}`, 18, y)
    y += 12

    // Recent Irrigation Table
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.text('Recent Watering Sessions Logbook:', 14, y)
    y += 6

    doc.setFontSize(8)
    doc.setFont('helvetica', 'bold')
    doc.setFillColor(230, 235, 230)
    doc.rect(14, y, pageWidth - 28, 7, 'F')
    doc.text('Date', 18, y + 5)
    doc.text('Crop', 60, y + 5)
    doc.text('Method', 100, y + 5)
    doc.text('Volume', 145, y + 5)
    doc.text('Status', 175, y + 5)
    y += 8

    doc.setFont('helvetica', 'normal')
    logList.slice(0, 8).forEach((l) => {
      doc.text(sanitizeText(l.date), 18, y + 4)
      doc.text(sanitizeText(l.crop), 60, y + 4)
      doc.text(sanitizeText(l.method), 100, y + 4)
      doc.text(sanitizeText(l.waterAmount), 145, y + 4)
      doc.text(sanitizeText(l.status), 175, y + 4)
      y += 6
    })

    // Footer
    doc.setFillColor(255, 248, 225)
    doc.rect(14, 255, pageWidth - 28, 26, 'F')
    doc.setTextColor(140, 80, 0)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'bold')
    doc.text('Kisan Call Centre 24/7 Helpline: 1800-180-1551', 18, 263)
    doc.setFont('helvetica', 'normal')
    doc.text('Verified Farmer Digital Logbook - KrishiMitra AI Agricultural Portal', 18, 271)

    const safeName = `KrishiMitra_${sanitizeText(farmer.name).replace(/\s+/g, '_')}_Full_Report_${Date.now()}.pdf`
    triggerDownload(doc, safeName)
    return safeName
  }
}
