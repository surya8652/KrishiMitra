import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Sprout, 
  Target, 
  ShieldCheck, 
  Languages, 
  Cpu, 
  Droplet, 
  TrendingUp, 
  ArrowRight,
  PhoneCall
} from 'lucide-react'

export const AboutPage: React.FC = () => {
  return (
    <div className="py-12 px-4 sm:px-6 max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="success">About KrishiMitra AI</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#143E23]">
          Empowering Indian Farmers with Usable, Human-Centered Intelligence
        </h1>
        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
          KrishiMitra was created with a single mission: to replace confusing agricultural dashboards and technical jargon with direct, practical answers that real farmers can act on every single morning.
        </p>
      </div>

      {/* Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-[#E5E7EB]">
          <CardContent className="p-6 space-y-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-100 text-[#1B5E20] flex items-center justify-center font-bold">
              <Target className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-lg text-gray-900">What Should I Do Today?</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              We design every screen to answer this question immediately. Whether rain is expected, soil is dry, or a market price spiked — the farmer sees action points first.
            </p>
          </CardContent>
        </Card>

        <Card className="border-[#E5E7EB]">
          <CardContent className="p-6 space-y-3">
            <div className="h-10 w-10 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
              <Languages className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-lg text-gray-900">8 Indian Languages</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Farming is deeply local. Our interface is natively architected for Hindi, Marathi, Gujarati, Tamil, Telugu, Kannada, and Bengali so no farmer feels alienated.
            </p>
          </CardContent>
        </Card>

        <Card className="border-[#E5E7EB]">
          <CardContent className="p-6 space-y-3">
            <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-900 flex items-center justify-center font-bold">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-lg text-gray-900">Practical & Safe AI</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              We never present AI predictions as ironclad guarantees. Recommendations are grounded in agricultural science and always refer farmers to local KVK specialists.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Architecture & Scalability Highlights */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5E7EB] shadow-xs space-y-6">
        <div className="flex items-center gap-3">
          <Cpu className="h-6 w-6 text-[#1B5E20]" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Engineered for National Scale
          </h2>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          Behind KrishiMitra's calm, simple interface is a modern decoupled architecture:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-700">
          <div className="p-3.5 rounded-lg bg-gray-50 border border-gray-100">
            <strong className="block text-gray-900 font-bold mb-1">Micro-Services Layer</strong>
            Independent services for Weather, Disease Computer Vision, APMC Mandi price streams, and Marketplace order matching.
          </div>
          <div className="p-3.5 rounded-lg bg-gray-50 border border-gray-100">
            <strong className="block text-gray-900 font-bold mb-1">Low Latency Edge Caching</strong>
            Offline and localized edge caching ensures weather alerts and irrigation history remain accessible even in remote villages.
          </div>
          <div className="p-3.5 rounded-lg bg-gray-50 border border-gray-100">
            <strong className="block text-gray-900 font-bold mb-1">Role-Isolated Security</strong>
            Strict role boundaries between Farmer and Platform Admin suites. Farmer reports are private; Directorate data is aggregated.
          </div>
          <div className="p-3.5 rounded-lg bg-gray-50 border border-gray-100">
            <strong className="block text-gray-900 font-bold mb-1">Kisan Support Integration</strong>
            Direct integration with the Government of India Kisan Call Center toll-free helpline (1800-180-1551).
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="text-center p-8 bg-[#E8F5E9] rounded-2xl border border-[#C8E6C9] space-y-4">
        <h3 className="text-xl font-bold text-[#143E23]">Ready to transform your farm operations?</h3>
        <p className="text-sm text-gray-700 max-w-lg mx-auto">
          Start using KrishiMitra AI today — no credit card, no complex downloads, and completely free.
        </p>
        <div className="pt-2">
          <Link to="/farmer">
            <Button size="lg" className="bg-[#1B5E20] hover:bg-[#144818] text-white font-bold cursor-pointer">
              <span>Open Farmer Dashboard</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
