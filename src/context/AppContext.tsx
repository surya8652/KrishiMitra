import React, { createContext, useContext, useState, useEffect } from 'react'
import { 
  SupportedLanguage, 
  UserRole, 
  FarmerProfile, 
  NotificationItem, 
  IrrigationAdvice, 
  DiseaseDetectionResult, 
  FarmingAdviceRecommendation, 
  MarketplaceListing, 
  WeatherData, 
  CropPriceData 
} from '../types'
import { TRANSLATIONS, TranslationDictionary } from '../data/translations'
import { 
  authService, 
  farmService, 
  diseaseService, 
  weatherService, 
  irrigationService, 
  marketService, 
  marketplaceService, 
  notificationService 
} from '../services'
import { MOCK_WEATHER } from '../data/mockData'
import { supabase } from '../lib/supabase'

interface AppContextType {
  language: SupportedLanguage
  setLanguage: (lang: SupportedLanguage) => void
  t: TranslationDictionary
  role: UserRole
  setRole: (role: UserRole) => void
  farmer: FarmerProfile
  updateFarmer: (updated: Partial<FarmerProfile>) => void
  changeLocation: (district: string, state: string, setAsHome?: boolean) => void
  notifications: NotificationItem[]
  unreadCount: number
  markNotificationAsRead: (id: string) => void
  markAllNotificationsAsRead: () => void
  deleteNotification: (id: string) => void
  irrigationAdvice: IrrigationAdvice
  recordWateredToday: (crop?: string, method?: string, amount?: string) => void
  diseaseReports: DiseaseDetectionResult[]
  addDiseaseReport: (report: DiseaseDetectionResult) => void
  farmAdviceList: FarmingAdviceRecommendation[]
  addFarmAdvice: (advice: FarmingAdviceRecommendation) => void
  marketplaceListings: MarketplaceListing[]
  addMarketplaceListing: (listing: Omit<MarketplaceListing, 'id' | 'datePosted' | 'status'>) => Promise<MarketplaceListing>
  weather: WeatherData
  prices: CropPriceData[]
  toast: string | null
  showToast: (msg: string) => void
  isVoiceListening: boolean
  toggleVoiceListening: () => void
  isAuthenticated: boolean
  loginDemo: (role: 'farmer' | 'admin' | 'student') => void
  signInWithSupabase: (identifier: string, password: string, selectedRole?: UserRole) => Promise<{ success: boolean; error?: string }>
  signUpWithSupabase: (params: {
    emailOrPhone: string
    password: string
    name: string
    role?: UserRole
    village?: string
    district?: string
    state?: string
    landSize?: number
    soilType?: string
    mainCrops?: string[]
  }) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  isSupabaseConnected: boolean
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    const saved = localStorage.getItem('km_user_lang') as SupportedLanguage
    return saved || 'en'
  })

  const [role, setRoleState] = useState<UserRole>(() => {
    return authService.getUserRole()
  })

  const [farmer, setFarmer] = useState<FarmerProfile>(() => {
    return authService.getCurrentUser()
  })

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    return notificationService.getNotifications()
  })

  const [irrigationAdvice, setIrrigationAdvice] = useState<IrrigationAdvice>(() => {
    return irrigationService.getAdvice()
  })

  const [diseaseReports, setDiseaseReports] = useState<DiseaseDetectionResult[]>(() => {
    return diseaseService.getHistory()
  })

  const [farmAdviceList, setFarmAdviceList] = useState<FarmingAdviceRecommendation[]>(() => {
    return farmService.getAdviceList()
  })

  const [marketplaceListings, setMarketplaceListings] = useState<MarketplaceListing[]>(() => {
    return marketplaceService.getListings()
  })

  const [weather, setWeather] = useState<WeatherData>(() => {
    const f = authService.getCurrentUser()
    return weatherService.getWeatherForDistrict(f.district || 'Nashik', f.state || 'Maharashtra')
  })

  const [prices] = useState<CropPriceData[]>(marketService.getPrices())
  const [toast, setToast] = useState<string | null>(null)
  const [isVoiceListening, setIsVoiceListening] = useState(false)
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(true)

  const t = TRANSLATIONS[language] || TRANSLATIONS.en

  // Listen to Supabase auth state changes
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setIsSupabaseConnected(true)
        const meta = session.user.user_metadata
        if (meta?.name) {
          setFarmer(prev => ({
            ...prev,
            name: meta.name || prev.name,
            phone: meta.phone || prev.phone,
            district: meta.district || prev.district,
            state: meta.state || prev.state,
            village: meta.village || prev.village
          }))
        }
      }
    })

    return () => {
      authListener?.subscription.unsubscribe()
    }
  }, [])

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang)
    localStorage.setItem('km_user_lang', lang)
  }

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole)
    authService.setUserRole(newRole)
    showToast(`Switched to ${newRole === 'admin' ? 'Admin Portal' : 'Farmer Dashboard'}`)
  }

  const updateFarmer = (updated: Partial<FarmerProfile>) => {
    const next = authService.updateProfile(updated)
    setFarmer(next)
    if (updated.district || updated.state) {
      const newWeather = weatherService.getWeatherForDistrict(next.district, next.state)
      setWeather(newWeather)
    }
    showToast('Farm profile updated successfully')
  }

  const changeLocation = (district: string, state: string, setAsHome = false) => {
    const newWeather = weatherService.getWeatherForDistrict(district, state)
    setWeather(newWeather)
    if (setAsHome) {
      const updated = authService.updateProfile({ district, state })
      setFarmer(updated)
      showToast(`Location set to ${district}, ${state}`)
    } else {
      showToast(`Showing weather & alerts for ${district}, ${state}`)
    }
  }

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => {
      setToast(null)
    }, 3800)
  }

  const markNotificationAsRead = (id: string) => {
    const updated = notificationService.markAsRead(id)
    setNotifications(updated)
  }

  const markAllNotificationsAsRead = () => {
    const updated = notificationService.markAllAsRead()
    setNotifications(updated)
    showToast('All notifications marked as read')
  }

  const deleteNotification = (id: string) => {
    const updated = notificationService.deleteNotification(id)
    setNotifications(updated)
  }

  const recordWateredToday = (crop?: string, method?: string, amount?: string) => {
    const updated = irrigationService.logWateringToday(
      crop || farmer.mainCrops[0] || 'Tomato',
      method || 'Drip Irrigation',
      amount || '1,200 Litres'
    )
    setIrrigationAdvice(updated)
    showToast('Watering recorded in your farm logbook')
  }

  const addDiseaseReport = (report: DiseaseDetectionResult) => {
    setDiseaseReports(prev => [report, ...prev])
    showToast('Crop disease diagnosis saved to My Reports')
  }

  const addFarmAdvice = (advice: FarmingAdviceRecommendation) => {
    setFarmAdviceList(prev => [advice, ...prev])
    showToast('Farm advisory saved to My Reports')
  }

  const addMarketplaceListing = async (listing: Omit<MarketplaceListing, 'id' | 'datePosted' | 'status'>) => {
    const created = await marketplaceService.createListing(listing)
    setMarketplaceListings(prev => [created, ...prev])
    showToast('Harvest listing published to the Marketplace')
    return created
  }

  const toggleVoiceListening = () => {
    if (!isVoiceListening) {
      setIsVoiceListening(true)
      showToast(t.voiceListening)
      setTimeout(() => {
        setIsVoiceListening(false)
        showToast('Voice query received: "Show today\'s tomato mandi price"')
      }, 3500)
    } else {
      setIsVoiceListening(false)
    }
  }

  const loginDemo = (selectedRole: 'farmer' | 'admin' | 'student') => {
    const profile = authService.loginDemo(selectedRole)
    setRoleState(selectedRole)
    if (selectedRole === 'farmer') {
      setFarmer(profile as FarmerProfile)
      showToast(`Logged in as Farmer: ${profile.name}`)
    } else if (selectedRole === 'admin') {
      showToast(`Logged in as Admin: ${profile.name}`)
    } else if (selectedRole === 'student') {
      showToast(`Logged in as Student: ${profile.name}`)
    }
  }

  const signInWithSupabase = async (identifier: string, password: string, selectedRole: UserRole = 'farmer') => {
    const res = await authService.signInWithSupabase(identifier, password, selectedRole)
    if (res.success) {
      const current = authService.getCurrentUser()
      setFarmer(current)
      setRoleState(selectedRole)
      showToast(`Welcome, ${current.name}! Signed in as ${selectedRole}.`)
    }
    return res
  }

  const signUpWithSupabase = async (params: {
    emailOrPhone: string
    password: string
    name: string
    role?: UserRole
    village?: string
    district?: string
    state?: string
    landSize?: number
    soilType?: string
    mainCrops?: string[]
  }) => {
    const res = await authService.signUpWithSupabase(params)
    if (res.success) {
      const current = authService.getCurrentUser()
      setFarmer(current)
      const userRole = params.role || 'farmer'
      setRoleState(userRole)
      showToast(`Account created with Supabase! Welcome ${current.name}.`)
    }
    return res
  }

  const logout = async () => {
    await authService.signOutSupabase()
    setRoleState('guest')
    showToast('Logged out successfully. You are now in Guest Mode.')
  }

  const unreadCount = notifications.filter(n => !n.read).length
  const isAuthenticated = role !== 'guest'

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        role,
        setRole,
        farmer,
        updateFarmer,
        changeLocation,
        notifications,
        unreadCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        deleteNotification,
        irrigationAdvice,
        recordWateredToday,
        diseaseReports,
        addDiseaseReport,
        farmAdviceList,
        addFarmAdvice,
        marketplaceListings,
        addMarketplaceListing,
        weather,
        prices,
        toast,
        showToast,
        isVoiceListening,
        toggleVoiceListening,
        isAuthenticated,
        loginDemo,
        signInWithSupabase,
        signUpWithSupabase,
        logout,
        isSupabaseConnected
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
