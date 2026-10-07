import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from '@/context/AppContext'

// Layouts
import { PublicLayout } from '@/layouts/PublicLayout'
import { FarmerLayout } from '@/layouts/FarmerLayout'
import { AdminLayout } from '@/layouts/AdminLayout'
import { StudentLayout } from '@/layouts/StudentLayout'

// Public Pages
import { LandingPage } from '@/pages/public/LandingPage'
import { AboutPage } from '@/pages/public/AboutPage'
import { LoginPage } from '@/pages/public/LoginPage'
import { RegisterPage } from '@/pages/public/RegisterPage'

// Farmer Pages
import { FarmerDashboard } from '@/pages/farmer/FarmerDashboard'
import { SmartFarmingPage } from '@/pages/farmer/SmartFarmingPage'
import { DiseaseDetectionPage } from '@/pages/farmer/DiseaseDetectionPage'
import { WeatherPage } from '@/pages/farmer/WeatherPage'
import { IrrigationPage } from '@/pages/farmer/IrrigationPage'
import { CropPricesPage } from '@/pages/farmer/CropPricesPage'
import { MarketplacePage } from '@/pages/farmer/MarketplacePage'
import { FarmerReportsPage } from '@/pages/farmer/FarmerReportsPage'
import { FarmerProfilePage } from '@/pages/farmer/FarmerProfilePage'
import { NotificationsPage } from '@/pages/farmer/NotificationsPage'

// Student Pages
import { CareerAnalyzerPage } from '@/pages/student/CareerAnalyzerPage'
import { StudyMaterialPage } from '@/pages/student/StudyMaterialPage'
import { YouTubeLecturesPage } from '@/pages/student/YouTubeLecturesPage'
import { SectorsGuidePage } from '@/pages/student/SectorsGuidePage'

// Admin Pages
import { AdminDashboard } from '@/pages/admin/AdminDashboard'
import { UserReportsPage } from '@/pages/admin/reports/UserReportsPage'
import { CropReportsPage } from '@/pages/admin/reports/CropReportsPage'
import { DiseaseReportsPage } from '@/pages/admin/reports/DiseaseReportsPage'
import { WeatherReportsPage } from '@/pages/admin/reports/WeatherReportsPage'
import { IrrigationReportsPage } from '@/pages/admin/reports/IrrigationReportsPage'
import { MarketReportsPage } from '@/pages/admin/reports/MarketReportsPage'
import { MarketplaceReportsPage } from '@/pages/admin/reports/MarketplaceReportsPage'
import { SystemReportsPage } from '@/pages/admin/reports/SystemReportsPage'

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Student Career & Study Portal */}
          <Route path="/students" element={<StudentLayout />}>
            <Route index element={<CareerAnalyzerPage />} />
            <Route path="analyzer" element={<CareerAnalyzerPage />} />
            <Route path="study-material" element={<StudyMaterialPage />} />
            <Route path="youtube" element={<YouTubeLecturesPage />} />
            <Route path="sectors" element={<SectorsGuidePage />} />
          </Route>

          {/* Farmer Portal Routes */}
          <Route path="/farmer" element={<FarmerLayout />}>
            <Route index element={<FarmerDashboard />} />
            <Route path="smart-farming" element={<SmartFarmingPage />} />
            <Route path="disease" element={<DiseaseDetectionPage />} />
            <Route path="weather" element={<WeatherPage />} />
            <Route path="irrigation" element={<IrrigationPage />} />
            <Route path="prices" element={<CropPricesPage />} />
            <Route path="marketplace" element={<MarketplacePage />} />
            <Route path="reports" element={<FarmerReportsPage />} />
            <Route path="profile" element={<FarmerProfilePage />} />
            <Route path="notifications" element={<NotificationsPage />} />
          </Route>

          {/* Admin Portal Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="reports/users" element={<UserReportsPage />} />
            <Route path="reports/crops" element={<CropReportsPage />} />
            <Route path="reports/disease" element={<DiseaseReportsPage />} />
            <Route path="reports/weather" element={<WeatherReportsPage />} />
            <Route path="reports/irrigation" element={<IrrigationReportsPage />} />
            <Route path="reports/market" element={<MarketReportsPage />} />
            <Route path="reports/marketplace" element={<MarketplaceReportsPage />} />
            <Route path="reports/system" element={<SystemReportsPage />} />
          </Route>

          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
