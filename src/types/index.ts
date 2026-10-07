export type SupportedLanguage = 
  | 'en' 
  | 'hi' 
  | 'mr' 
  | 'gu' 
  | 'ta' 
  | 'te' 
  | 'kn' 
  | 'bn'

export interface LanguageOption {
  code: SupportedLanguage
  label: string
  nativeName: string
}

export type UserRole = 'farmer' | 'admin'

export interface FarmerProfile {
  id: string
  name: string
  phone: string
  email?: string
  role: UserRole
  village: string
  district: string
  state: string
  landSize: number
  landUnit: 'acres' | 'bigha' | 'hectare'
  soilType: string
  mainCrops: string[]
  preferredLanguage: SupportedLanguage
  joinedDate: string
  avatar?: string
}

export interface FarmingAdviceRecommendation {
  id: string
  farmerId: string
  date: string
  location: string
  soilType: string
  crop: string
  season: string
  landSize: string
  rainfallCondition: string
  recommendedAction: string
  whyRecommendation: string[]
  expectedConsiderations: string[]
  irrigationRecommendation: string
  basicPractices: string[]
  fertilizerTip: string
  disclaimer: string
}

export interface DiseaseDetectionResult {
  id: string
  farmerId: string
  date: string
  crop: string
  imageUrl: string
  diseaseName: string
  confidence: number
  severity: 'Mild' | 'Moderate' | 'Severe'
  symptoms: string[]
  recommendations: string[]
  preventiveMeasures: string[]
  disclaimer: string
}

export interface WeatherDayForecast {
  day: string
  date: string
  maxTemp: number
  minTemp: number
  condition: string
  rainProbability: number
  advisory: string
}

export interface WeatherData {
  location: string
  district: string
  state: string
  temperature: number
  condition: string
  rainProbability: number
  humidity: number
  windSpeed: number
  uvIndex: string
  todayFarmingAlert: {
    title: string
    description: string
    recommendation: string
    severity: 'warning' | 'info' | 'critical'
  }
  forecast: WeatherDayForecast[]
}

export interface IrrigationLog {
  id: string
  date: string
  crop: string
  status: string
  waterAmount: string
  method: string
  notes?: string
}

export interface IrrigationAdvice {
  crop: string
  soil: string
  recentRainfall: string
  weatherSummary: string
  recommendation: string
  recommendationType: 'water_needed' | 'sufficient' | 'postpone_rain'
  whyReason: string
  lastIrrigated: string
  nextCheck: string
  soilMoistureLevel: string
  logs: IrrigationLog[]
}

export interface NearbyMandiPrice {
  market: string
  distanceKm: number
  price: number
  arrivalQty: string
}

export interface CropPriceData {
  id: string
  crop: string
  variety: string
  market: string
  district: string
  state: string
  modalPrice: number // ₹/Quintal
  minPrice: number
  maxPrice: number
  unit: string
  trend: 'up' | 'down' | 'stable'
  changePercent: number
  historical: { date: string; price: number }[]
  nearbyMandis: NearbyMandiPrice[]
  estimatedPriceRange: string
  updatedAt: string
}

export interface MarketplaceListing {
  id: string
  type: 'sell' | 'buy'
  crop: string
  variety?: string
  quantity: number
  unit: 'Quintals' | 'Kg' | 'Crates' | 'Tons'
  pricePerUnit: number
  location: string
  district: string
  state: string
  sellerName: string
  sellerPhone: string
  datePosted: string
  imageUrl: string
  status: 'available' | 'in_negotiation' | 'sold'
  qualityGrade: 'Grade A' | 'Grade B' | 'Standard'
  organicCertified?: boolean
  description: string
}

export interface NotificationItem {
  id: string
  title: string
  message: string
  type: 'weather' | 'irrigation' | 'price' | 'disease' | 'marketplace' | 'system'
  timestamp: string
  read: boolean
  link?: string
}

export interface AdminPlatformMetrics {
  totalFarmers: number
  activeFarmersToday: number
  diseaseChecksTotal: number
  marketplaceListingsActive: number
  aiRequestsProcessed: number
  systemUptimePercentage: number
  pendingVerifications: number
}
