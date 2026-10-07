import React from 'react'
import { Link } from 'react-router-dom'
import { AsciiArt } from '@/components/ui/forest'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Sprout, 
  ScanSearch, 
  CloudSun, 
  Droplet, 
  TrendingUp, 
  ShoppingBag, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Smartphone,
  WifiOff,
  Globe2,
  FileCheck2,
  Users2
} from 'lucide-react'
import { useApp } from '@/context/AppContext'

export const LandingPage: React.FC = () => {
  const { t } = useApp()

  const features = [
    {
      icon: Sprout,
      title: "Smart Farming",
      nativeBadge: "स्मार्ट शेती",
      description: "Know what to grow and how to care for it.",
      link: "/farmer/smart-farming",
      color: "bg-emerald-50 text-emerald-800 border-emerald-200"
    },
    {
      icon: ScanSearch,
      title: "Crop Health",
      nativeBadge: "रोग तपासणी",
      description: "Upload a leaf photo and check possible crop diseases.",
      link: "/farmer/disease",
      color: "bg-green-50 text-green-800 border-green-200"
    },
    {
      icon: CloudSun,
      title: "Weather",
      nativeBadge: "हवामान अंदाज",
      description: "See weather conditions and farming alerts for your location.",
      link: "/farmer/weather",
      color: "bg-sky-50 text-sky-800 border-sky-200"
    },
    {
      icon: Droplet,
      title: "Irrigation",
      nativeBadge: "पाणी व्यवस्थापन",
      description: "Get simple watering recommendations.",
      link: "/farmer/irrigation",
      color: "bg-blue-50 text-blue-800 border-blue-200"
    },
    {
      icon: TrendingUp,
      title: "Crop Prices",
      nativeBadge: "मंडी भाव",
      description: "Check market prices and price trends.",
      link: "/farmer/prices",
      color: "bg-amber-50 text-amber-900 border-amber-200"
    },
    {
      icon: ShoppingBag,
      title: "Marketplace",
      nativeBadge: "शेतकरी बाजार",
      description: "Connect farmers and buyers.",
      link: "/farmer/marketplace",
      color: "bg-orange-50 text-orange-900 border-orange-200"
    }
  ]

  const steps = [
    {
      num: "1",
      title: "Add your farm",
      desc: "Tell us your village, land size, and soil type."
    },
    {
      num: "2",
      title: "Tell us about your crop",
      desc: "Select what you grow: Tomato, Onion, Wheat, Rice, or others."
    },
    {
      num: "3",
      title: "Get personalized guidance",
      desc: "Receive clear, daily advice for water, weather, and crop health."
    },
    {
      num: "4",
      title: "Track your farm over time",
      desc: "Keep records of disease checks, watering logs, and market profits."
    }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Forest ASCII Video Background */}
      <section className="relative overflow-hidden bg-[#0F291E] text-white py-20 md:py-28 px-4 sm:px-6">
        {/* Forest ASCII Background Container */}
        <div className="absolute inset-0 z-0 opacity-25 mix-blend-screen pointer-events-none overflow-hidden">
          <AsciiArt className="w-full h-full object-cover scale-105" />
        </div>

        {/* Warm Agricultural Gradient Overlay to ensure text readability */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0F291E]/90 via-[#143E23]/80 to-[#0F291E] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          {/* Trust Indicator */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F4D30]/80 border border-[#2E6B44] text-xs sm:text-sm font-semibold text-emerald-200 shadow-sm backdrop-blur-xs">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400"></span>
            <span>Built for farmers • Simple to use • Available in regional languages</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans">
            Smarter Farming Starts With Better Information.
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-xl text-gray-200 max-w-2xl mx-auto font-normal leading-relaxed">
            Get simple, personalized guidance for your crops, weather, irrigation, crop health and market prices — all in one place.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <Link to="/farmer" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-[#2E7D32] hover:bg-[#256628] text-white text-base font-bold shadow-lg gap-2 cursor-pointer">
                <span>{t.getStarted}</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>

            <a href="#features" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-xs text-base font-semibold cursor-pointer">
                {t.exploreFeatures}
              </Button>
            </a>
          </div>

          {/* Realistic Indian Context Micro-Stats */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-emerald-800/60 max-w-3xl mx-auto text-left">
            <div>
              <div className="text-xl sm:text-2xl font-black text-emerald-300">42,000+</div>
              <div className="text-xs text-gray-300 font-medium">Registered Farmers</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-emerald-300">8 Languages</div>
              <div className="text-xs text-gray-300 font-medium">Hindi, Marathi & More</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-emerald-300">91%</div>
              <div className="text-xs text-gray-300 font-medium">Disease AI Accuracy</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-emerald-300">₹0 Free</div>
              <div className="text-xs text-gray-300 font-medium">For Smallholders</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section id="features" className="py-16 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="success" className="mb-2">Key Services</Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#143E23]">
            Everything You Need for Today's Farm Work
          </h2>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            No complicated technical jargon. Just clear answers to help you care for your crops and earn better prices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => (
            <Link key={idx} to={item.link} className="group block">
              <Card className="h-full hover:shadow-md hover:border-[#1B5E20] transition-all border-[#E5E7EB] bg-white group-hover:-translate-y-0.5">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-3 rounded-xl ${item.color} border`}>
                      <item.icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
                      {item.nativeBadge}
                    </span>
                  </div>
                  <CardTitle className="group-hover:text-[#1B5E20] transition-colors">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-sm">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="inline-flex items-center text-xs font-bold text-[#1B5E20] group-hover:underline">
                    <span>Open tool</span>
                    <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* "How KrishiMitra Helps" 4-Step Visual Section */}
      <section className="py-16 bg-[#F1F5EE] border-y border-[#E2E8DC] px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1B5E20]">Simple 4-Step Process</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#143E23] mt-1">
              How KrishiMitra Helps
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              Start getting customized farming assistance in under two minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#E0E7DC] shadow-xs relative flex flex-col justify-between"
              >
                <div>
                  <div className="h-10 w-10 rounded-full bg-[#1B5E20] text-white font-extrabold text-lg flex items-center justify-center mb-4">
                    {s.num}
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* "Designed For Real Farmers" Trust Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="bg-white rounded-3xl border border-[#E5E7EB] p-8 md:p-12 shadow-xs">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <Badge variant="earth" className="mb-2">Farmer First UX</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Designed For Real Farmers
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              Practical design built for rural conditions, slow connections, and regional languages.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-[#F8F9F5]">
              <div className="p-2.5 rounded-lg bg-emerald-100 text-[#1B5E20] shrink-0">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Simple Interface</h4>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  Large touch targets, clear buttons, and zero complicated analytics dashboards.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-[#F8F9F5]">
              <div className="p-2.5 rounded-lg bg-emerald-100 text-[#1B5E20] shrink-0">
                <Globe2 className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Local Languages</h4>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  Available in Hindi, Marathi, Gujarati, Tamil, Telugu, Kannada, and Bengali.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-[#F8F9F5]">
              <div className="p-2.5 rounded-lg bg-emerald-100 text-[#1B5E20] shrink-0">
                <Smartphone className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Mobile Friendly</h4>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  Optimized for smartphone screens with a convenient 5-button bottom navigation bar.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-[#F8F9F5]">
              <div className="p-2.5 rounded-lg bg-emerald-100 text-[#1B5E20] shrink-0">
                <WifiOff className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Low-Bandwidth Friendly</h4>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  Lightweight assets that load quickly even on rural 2G/4G networks.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-[#F8F9F5]">
              <div className="p-2.5 rounded-lg bg-emerald-100 text-[#1B5E20] shrink-0">
                <FileCheck2 className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Personalized Reports</h4>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  Every advisory, disease scan, and watering record is saved only to your personal book.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-[#F8F9F5]">
              <div className="p-2.5 rounded-lg bg-emerald-100 text-[#1B5E20] shrink-0">
                <Users2 className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Direct Mandi & Buyer Link</h4>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  Free marketplace to buy and sell produce without middlemen cuts.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link to="/farmer">
              <Button size="lg" className="bg-[#1B5E20] hover:bg-[#144818] text-white font-bold px-8">
                Try the Farmer App Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
