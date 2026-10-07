import { 
  FarmerProfile, 
  CropPriceData, 
  MarketplaceListing, 
  WeatherData, 
  DiseaseDetectionResult, 
  FarmingAdviceRecommendation, 
  IrrigationAdvice, 
  NotificationItem, 
  AdminPlatformMetrics,
  SupportedLanguage
} from '../types'
import { 
  DEFAULT_FARMER, 
  ADMIN_USER, 
  MOCK_WEATHER, 
  MOCK_IRRIGATION, 
  MOCK_DISEASE_REPORTS, 
  MOCK_CROP_PRICES, 
  MOCK_MARKETPLACE, 
  MOCK_NOTIFICATIONS, 
  MOCK_ADMIN_METRICS,
  MOCK_FARM_ADVICE_REPORTS,
  getWeatherForLocation
} from '../data/mockData'

import { supabase } from '../lib/supabase'

const STORAGE_KEYS = {
  FARMER: 'km_farmer_profile',
  ROLE: 'km_user_role',
  LANGUAGE: 'km_user_lang',
  DISEASE_REPORTS: 'km_disease_reports',
  FARM_ADVICE: 'km_farm_advice',
  IRRIGATION: 'km_irrigation_data',
  MARKETPLACE: 'km_marketplace_listings',
  NOTIFICATIONS: 'km_notifications'
}

// Client-side cache simulation
class CacheManager {
  private cache = new Map<string, { data: unknown; timestamp: number }>()
  private ttl = 60000 // 1 minute default cache

  get<T>(key: string): T | null {
    const item = this.cache.get(key)
    if (!item) return null
    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key)
      return null
    }
    return item.data as T
  }

  set(key: string, data: unknown, customTtl?: number): void {
    this.cache.set(key, { data, timestamp: Date.now() + (customTtl || 0) })
  }
}

const memoryCache = new CacheManager()

export const authService = {
  getCurrentUser: (): FarmerProfile => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.FARMER)
      if (stored) return JSON.parse(stored)
    } catch (e) {
      console.error('Failed reading farmer profile from storage', e)
    }
    return DEFAULT_FARMER
  },

  getUserRole: (): 'farmer' | 'admin' => {
    return (localStorage.getItem(STORAGE_KEYS.ROLE) as 'farmer' | 'admin') || 'farmer'
  },

  setUserRole: (role: 'farmer' | 'admin') => {
    localStorage.setItem(STORAGE_KEYS.ROLE, role)
  },

  updateProfile: (updated: Partial<FarmerProfile>): FarmerProfile => {
    const current = authService.getCurrentUser()
    const merged = { ...current, ...updated }
    localStorage.setItem(STORAGE_KEYS.FARMER, JSON.stringify(merged))
    
    // Non-blocking sync with Supabase user metadata if session exists
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        supabase.auth.updateUser({
          data: { profile: merged }
        }).catch(() => {})
      }
    }).catch(() => {})

    return merged
  },

  signInWithSupabase: async (identifier: string, password: string): Promise<{ success: boolean; user?: any; error?: string }> => {
    const cleanId = identifier.trim()
    const email = cleanId.includes('@') ? cleanId : `${cleanId.replace(/[^0-9a-zA-Z]/g, '')}@krishimitra.farm`

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        // If user credentials do not exist yet, attempt automatic registration so farmers can sign in directly
        const isNotFound = error.message.toLowerCase().includes('invalid login credentials') ||
                            error.message.toLowerCase().includes('user not found')

        if (isNotFound && password.length >= 6) {
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                name: 'Kisan Member',
                phone: cleanId,
                role: 'farmer'
              }
            }
          })
          if (!signUpError && signUpData.user) {
            authService.setUserRole('farmer')
            const newProfile: FarmerProfile = {
              ...DEFAULT_FARMER,
              id: signUpData.user.id,
              name: 'Kisan Member',
              phone: cleanId.startsWith('+91') ? cleanId : `+91 ${cleanId}`,
              email
            }
            localStorage.setItem(STORAGE_KEYS.FARMER, JSON.stringify(newProfile))
            return { success: true, user: signUpData.user }
          }
        }
        return { success: false, error: error.message }
      }

      if (data.user) {
        authService.setUserRole('farmer')
        const meta = data.user.user_metadata
        if (meta?.profile) {
          localStorage.setItem(STORAGE_KEYS.FARMER, JSON.stringify(meta.profile))
        } else if (meta?.name) {
          const current = authService.getCurrentUser()
          const updated = {
            ...current,
            id: data.user.id,
            name: meta.name || current.name,
            phone: meta.phone || current.phone,
            email: data.user.email || current.email
          }
          localStorage.setItem(STORAGE_KEYS.FARMER, JSON.stringify(updated))
        }
        return { success: true, user: data.user }
      }
      return { success: false, error: 'User session not created' }
    } catch (err: any) {
      return { success: false, error: err?.message || 'Authentication error' }
    }
  },

  signUpWithSupabase: async (params: {
    emailOrPhone: string
    password: string
    name: string
    village?: string
    district?: string
    state?: string
    landSize?: number
    soilType?: string
    mainCrops?: string[]
  }): Promise<{ success: boolean; user?: any; error?: string }> => {
    const cleanId = params.emailOrPhone.trim()
    const email = cleanId.includes('@') ? cleanId : `${cleanId.replace(/[^0-9a-zA-Z]/g, '')}@krishimitra.farm`

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: params.password,
        options: {
          data: {
            name: params.name,
            phone: cleanId,
            village: params.village || 'Dindori',
            district: params.district || 'Nashik',
            state: params.state || 'Maharashtra',
            landSize: params.landSize || 2,
            soilType: params.soilType || 'Medium Black Clayey Loam',
            mainCrops: params.mainCrops || ['Tomato'],
            role: 'farmer'
          }
        }
      })

      if (error) {
        return { success: false, error: error.message }
      }

      if (data.user) {
        const farmerProfile: FarmerProfile = {
          id: data.user.id || `farmer_${Date.now()}`,
          name: params.name,
          phone: cleanId.startsWith('+91') ? cleanId : `+91 ${cleanId}`,
          email,
          role: 'farmer',
          village: params.village || 'Dindori',
          district: params.district || 'Nashik',
          state: params.state || 'Maharashtra',
          landSize: params.landSize || 2,
          landUnit: 'acres',
          soilType: params.soilType || 'Medium Black Clayey Loam',
          mainCrops: params.mainCrops || ['Tomato'],
          preferredLanguage: 'en',
          joinedDate: new Date().toISOString().split('T')[0]
        }
        localStorage.setItem(STORAGE_KEYS.FARMER, JSON.stringify(farmerProfile))
        authService.setUserRole('farmer')
        return { success: true, user: data.user }
      }
      return { success: false, error: 'Registration could not be completed' }
    } catch (err: any) {
      return { success: false, error: err?.message || 'Registration error' }
    }
  },

  signOutSupabase: async () => {
    try {
      await supabase.auth.signOut()
      localStorage.removeItem(STORAGE_KEYS.ROLE)
    } catch (e) {
      console.error(e)
    }
  },

  loginDemo: (role: 'farmer' | 'admin') => {
    authService.setUserRole(role)
    return role === 'farmer' ? DEFAULT_FARMER : ADMIN_USER
  }
}

export const farmService = {
  getAdviceList: (): FarmingAdviceRecommendation[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.FARM_ADVICE)
      if (stored) return JSON.parse(stored)
    } catch (e) {
      console.error(e)
    }
    return MOCK_FARM_ADVICE_REPORTS
  },

  generateAdvice: async (params: {
    location: string
    soilType: string
    crop: string
    season: string
    landSize: string
    rainfallCondition: string
  }): Promise<FarmingAdviceRecommendation> => {
    // Simulated AI latency with rate-limit and validation
    await new Promise(res => setTimeout(res, 800))

    const newAdvice: FarmingAdviceRecommendation = {
      id: `rec_${Date.now()}`,
      farmerId: DEFAULT_FARMER.id,
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      location: params.location || 'Nashik, Maharashtra',
      soilType: params.soilType,
      crop: params.crop,
      season: params.season,
      landSize: `${params.landSize} Acres`,
      rainfallCondition: params.rainfallCondition,
      recommendedAction: `Standardized High-Yield Protocol for ${params.crop} in ${params.soilType}`,
      whyRecommendation: [
        `${params.soilType} requires balanced organic amendment to preserve soil micro-flora during ${params.season} growth.`,
        `Recent agro-meteorological index indicates favorable temperature windows for ${params.crop} vegetative flowering.`,
        `Estimated input cost savings of 18% achieved through drip fertigation rather than flood broadcasting.`
      ],
      expectedConsiderations: [
        `Monitor soil moisture before every 3rd day fertigation run.`,
        `Scout field corners twice weekly for early sucking pest threshold levels.`
      ],
      irrigationRecommendation: `Apply 30-45 minutes of drip watering early morning; adjust based on daily rainfall sensor telemetry.`,
      basicPractices: [
        `Soil Preparation: Deep cross-ploughing followed by 2 rotavator passes with 5 tonnes FYM per acre.`,
        `Seed Treatment: Bio-fungicide Trichoderma @ 5g/kg seed + Rhizobium / Azotobacter inoculant.`,
        `Mulching: 25-micron silver-black plastic mulch recommended to control weeds and conserve 40% soil moisture.`
      ],
      fertilizerTip: `Split NPK dosage into 4 vegetative cycles; foliar spray of micronutrient mixture during active branching stage.`,
      disclaimer: `These recommendations are AI-assisted guidance for educational and agricultural planning purposes. Please verify dosages with your local Krishi Vigyan Kendra or Agriculture Officer.`
    }

    const currentList = farmService.getAdviceList()
    const updated = [newAdvice, ...currentList]
    localStorage.setItem(STORAGE_KEYS.FARM_ADVICE, JSON.stringify(updated))
    return newAdvice
  }
}

export const diseaseService = {
  getHistory: (): DiseaseDetectionResult[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.DISEASE_REPORTS)
      if (stored) return JSON.parse(stored)
    } catch (e) {
      console.error(e)
    }
    return MOCK_DISEASE_REPORTS
  },

  analyzeImage: async (imageFileOrUrl: string, cropName: string): Promise<DiseaseDetectionResult> => {
    // Simulate edge model inference
    await new Promise(res => setTimeout(res, 1200))

    const isTomato = cropName.toLowerCase().includes('tomato')
    
    const result: DiseaseDetectionResult = {
      id: `dis_${Date.now()}`,
      farmerId: DEFAULT_FARMER.id,
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      crop: cropName || 'Tomato',
      imageUrl: imageFileOrUrl,
      diseaseName: isTomato ? 'Tomato Early Blight (Alternaria solani)' : 'Leaf Spot & Downy Mildew Complex',
      confidence: 91,
      severity: 'Moderate',
      symptoms: [
        'Concentric brown circular patches with chlorotic yellow boundaries on lower foliage',
        'Early stem cankers visible at branch junctions',
        'Leaf curling caused by foliar moisture stress'
      ],
      recommendations: [
        'Prune off and safely burn or bury heavily infected foliage away from the boundary line.',
        'Spray Copper Oxychloride 50 WP @ 3g/L or Mancozeb 75 WP @ 2.5g/L during clear morning skies.',
        'Avoid wetting the leaves during irrigation; stick to sub-surface or surface drip.',
        'Spray bio-control agent Trichoderma harzianum @ 5g/L as follow-up protective measure after 7 days.'
      ],
      preventiveMeasures: [
        'Ensure 60cm gap between rows to facilitate wind airflow through canopy.',
        'Apply neem cake in the root zone to strengthen systemic plant resistance.',
        'Follow crop rotation with legumes or millets next season.'
      ],
      disclaimer: 'AI results are informational. For serious crop problems or chemical applications, consult a qualified agricultural expert or your local KVK.'
    }

    const history = diseaseService.getHistory()
    const updated = [result, ...history]
    localStorage.setItem(STORAGE_KEYS.DISEASE_REPORTS, JSON.stringify(updated))
    return result
  }
}

export const weatherService = {
  getWeatherData: async (): Promise<WeatherData> => {
    const cached = memoryCache.get<WeatherData>('weather_data')
    if (cached) return cached
    await new Promise(res => setTimeout(res, 150))
    memoryCache.set('weather_data', MOCK_WEATHER, 300000)
    return MOCK_WEATHER
  },

  getWeatherForDistrict: (district: string, state: string): WeatherData => {
    const data = getWeatherForLocation(district, state)
    memoryCache.set('weather_data', data, 300000)
    return data
  }
}

export const irrigationService = {
  getAdvice: (): IrrigationAdvice => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.IRRIGATION)
      if (stored) return JSON.parse(stored)
    } catch (e) {
      console.error(e)
    }
    return MOCK_IRRIGATION
  },

  logWateringToday: (crop: string, method: string = 'Drip Irrigation', amount: string = '1,200 Litres'): IrrigationAdvice => {
    const current = irrigationService.getAdvice()
    const todayStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    const timeStr = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })

    const newLog = {
      id: `irr_${Date.now()}`,
      date: `${todayStr}, ${timeStr}`,
      crop,
      status: 'Completed',
      waterAmount: amount,
      method,
      notes: 'Logged directly by farmer'
    }

    const updated: IrrigationAdvice = {
      ...current,
      lastIrrigated: `Today, ${timeStr} (${method})`,
      soilMoistureLevel: '82% — Optimal',
      recommendation: 'Soil Well Hydrated — Next check in 3 days',
      recommendationType: 'sufficient',
      whyReason: `Watering recorded today. Soil moisture is topped up, and weather conditions remain temperate.`,
      logs: [newLog, ...current.logs]
    }

    localStorage.setItem(STORAGE_KEYS.IRRIGATION, JSON.stringify(updated))
    return updated
  }
}

export const marketService = {
  getPrices: (stateFilter?: string): CropPriceData[] => {
    if (!stateFilter || stateFilter === 'All India') {
      return MOCK_CROP_PRICES
    }
    const filtered = MOCK_CROP_PRICES.filter(p => p.state.toLowerCase() === stateFilter.toLowerCase())
    return filtered.length > 0 ? filtered : MOCK_CROP_PRICES
  },

  getCropDetail: (cropId: string): CropPriceData | undefined => {
    return MOCK_CROP_PRICES.find(p => p.id === cropId || p.crop.toLowerCase().includes(cropId.toLowerCase()))
  },

  getAvailableStates: (): string[] => {
    const states = Array.from(new Set(MOCK_CROP_PRICES.map(p => p.state)))
    return ['All India', ...states]
  }
}

export const marketplaceService = {
  getListings: (): MarketplaceListing[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.MARKETPLACE)
      if (stored) return JSON.parse(stored)
    } catch (e) {
      console.error(e)
    }
    return MOCK_MARKETPLACE
  },

  createListing: async (listing: Omit<MarketplaceListing, 'id' | 'datePosted' | 'status'>): Promise<MarketplaceListing> => {
    await new Promise(res => setTimeout(res, 500))
    const current = marketplaceService.getListings()
    const newEntry: MarketplaceListing = {
      ...listing,
      id: `list_${Date.now()}`,
      datePosted: 'Today',
      status: 'available'
    }
    const updated = [newEntry, ...current]
    localStorage.setItem(STORAGE_KEYS.MARKETPLACE, JSON.stringify(updated))
    return newEntry
  }
}

export const notificationService = {
  getNotifications: (): NotificationItem[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)
      if (stored) return JSON.parse(stored)
    } catch (e) {
      console.error(e)
    }
    return MOCK_NOTIFICATIONS
  },

  markAsRead: (id: string): NotificationItem[] => {
    const list = notificationService.getNotifications()
    const updated = list.map(n => n.id === id ? { ...n, read: true } : n)
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated))
    return updated
  },

  markAllAsRead: (): NotificationItem[] => {
    const list = notificationService.getNotifications()
    const updated = list.map(n => ({ ...n, read: true }))
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated))
    return updated
  },

  deleteNotification: (id: string): NotificationItem[] => {
    const list = notificationService.getNotifications()
    const updated = list.filter(n => n.id !== id)
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated))
    return updated
  }
}

export const adminService = {
  getPlatformMetrics: (): AdminPlatformMetrics => {
    return MOCK_ADMIN_METRICS
  }
}
