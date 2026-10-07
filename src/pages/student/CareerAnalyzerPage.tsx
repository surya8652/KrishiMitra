import React, { useState, useId } from 'react'
import { Link } from 'react-router-dom'
import { 
  Compass, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  Code2, 
  HardHat, 
  Cpu, 
  LineChart, 
  HeartPulse, 
  ArrowRight, 
  Award, 
  BookOpen, 
  Youtube, 
  RotateCcw, 
  Printer, 
  Check, 
  ChevronRight,
  TrendingUp,
  BrainCircuit,
  GraduationCap
} from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { 
  CAREER_SECTORS, 
  analyzeStudentProfile, 
  AnalyzerInput, 
  RecommendationResult 
} from '@/data/studentData'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const ICON_MAP: Record<string, React.ElementType> = {
  Building2,
  Code2,
  HardHat,
  Cpu,
  LineChart,
  HeartPulse
}

export const CareerAnalyzerPage: React.FC = () => {
  const { t, showToast } = useApp()

  // Form State
  const [qualification, setQualification] = useState<string>('11th-12th PCM')
  const [targetYear, setTargetYear] = useState<string>('2026-2027')
  const [desiredSector, setDesiredSector] = useState<string>('all')

  const [marks, setMarks] = useState({
    math: 92,
    physics: 70,
    chemistry: 52,
    biology: 38,
    computerScience: 80,
    drawingAesthetics: 78,
    englishLang: 72,
    socialOrCommerce: 60
  })

  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Designing 3D buildings & physical structures',
    'Solving tough mathematical & geometric puzzles',
    'Writing code, algorithms & software apps'
  ])

  const [hasAnalyzed, setHasAnalyzed] = useState<boolean>(true)

  const interestOptions = [
    'Designing 3D buildings & physical structures',
    'Solving tough mathematical & geometric puzzles',
    'Writing code, algorithms & software apps',
    'Hands-on machinery, robotics & engines',
    'Human health, biology & medical research',
    'Financial markets, statistics & economic modeling',
    'Urban planning, sustainable cities & environment',
    'Visual sketching, digital art & graphic aesthetics',
    'Laboratory experiments & chemical reactions'
  ]

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    )
  }

  // Preset Handlers
  const applyPreset = (presetType: 'math-high' | 'tech-coder' | 'spatial-architect' | 'medical') => {
    if (presetType === 'math-high') {
      setQualification('11th-12th PCM')
      setMarks({
        math: 95,
        physics: 68,
        chemistry: 48,
        biology: 32,
        computerScience: 82,
        drawingAesthetics: 75,
        englishLang: 65,
        socialOrCommerce: 50
      })
      setSelectedInterests([
        'Designing 3D buildings & physical structures',
        'Solving tough mathematical & geometric puzzles',
        'Writing code, algorithms & software apps'
      ])
      showToast('Loaded preset: Strong in Maths, Lower in other subjects')
    } else if (presetType === 'spatial-architect') {
      setQualification('11th-12th PCM')
      setMarks({
        math: 90,
        physics: 72,
        chemistry: 55,
        biology: 40,
        computerScience: 65,
        drawingAesthetics: 94,
        englishLang: 78,
        socialOrCommerce: 65
      })
      setSelectedInterests([
        'Designing 3D buildings & physical structures',
        'Visual sketching, digital art & graphic aesthetics',
        'Urban planning, sustainable cities & environment'
      ])
      setDesiredSector('architecture')
      showToast('Loaded preset: Aspiring Architect (Math + Drawing)')
    } else if (presetType === 'tech-coder') {
      setQualification('11th-12th PCM')
      setMarks({
        math: 94,
        physics: 80,
        chemistry: 65,
        biology: 40,
        computerScience: 96,
        drawingAesthetics: 50,
        englishLang: 80,
        socialOrCommerce: 60
      })
      setSelectedInterests([
        'Writing code, algorithms & software apps',
        'Solving tough mathematical & geometric puzzles'
      ])
      setDesiredSector('computer-engineering')
      showToast('Loaded preset: Computer Science & Software')
    } else if (presetType === 'medical') {
      setQualification('11th-12th PCB')
      setMarks({
        math: 52,
        physics: 74,
        chemistry: 88,
        biology: 95,
        computerScience: 45,
        drawingAesthetics: 50,
        englishLang: 85,
        socialOrCommerce: 70
      })
      setSelectedInterests([
        'Human health, biology & medical research',
        'Laboratory experiments & chemical reactions'
      ])
      setDesiredSector('medical-biotech')
      showToast('Loaded preset: Medical & Life Sciences')
    }
  }

  // Calculate analysis
  const analyzerResult = analyzeStudentProfile({
    qualification,
    yearOrTarget: targetYear,
    marks,
    interests: selectedInterests,
    desiredSector: desiredSector !== 'all' ? desiredSector : undefined
  })

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-indigo-500/20 to-transparent pointer-events-none" />
        
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/30 border border-indigo-400/40 text-xs sm:text-sm font-semibold text-indigo-200">
            <Sparkles className="h-4 w-4 text-indigo-300" />
            <span>AI Qualification & Interest Matcher</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Discover Your Ideal Career Sector & Academic Roadmap
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            Whether you want to be an <strong>Architect</strong>, enter specific <strong>Engineering streams</strong>, or explore data & sciences — our intelligent engine analyzes your qualifications, subject strengths, and genuine interests.
          </p>

          {/* Quick-test Presets Bar */}
          <div className="pt-2">
            <p className="text-xs text-indigo-200 font-bold uppercase tracking-wider mb-2">
              Quick Test Profiles (Click to test):
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => applyPreset('math-high')}
                className="px-3 py-1.5 rounded-lg bg-amber-400/20 border border-amber-300/40 text-amber-200 hover:bg-amber-400/30 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>⭐ Good in Maths, Lower in other subjects</span>
              </button>
              <button
                type="button"
                onClick={() => applyPreset('spatial-architect')}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold transition-all cursor-pointer"
              >
                📐 High Math + Drawing (Architect)
              </button>
              <button
                type="button"
                onClick={() => applyPreset('tech-coder')}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold transition-all cursor-pointer"
              >
                💻 Coding & Algorithms (Computer Eng)
              </button>
              <button
                type="button"
                onClick={() => applyPreset('medical')}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold transition-all cursor-pointer"
              >
                🩺 High Biology (Medical)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Analyzer Grid: Inputs on Left, Real-Time Results on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Step 1: Qualifications */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <div className="h-8 w-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h2 className="font-extrabold text-base text-slate-900">
                Current Qualification & Target
              </h2>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Current Education Level / Stream:
                </label>
                <select
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  className="w-full text-sm font-semibold rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="10th Standard (SSC / CBSE / ICSE)">10th Standard (Exploring Class 11-12 Streams)</option>
                  <option value="11th-12th PCM">11th-12th Science (Physics, Chemistry, Maths)</option>
                  <option value="11th-12th PCB">11th-12th Science (Physics, Chemistry, Biology)</option>
                  <option value="11th-12th PCMB">11th-12th Science (PCM + Biology)</option>
                  <option value="11th-12th Commerce">11th-12th Commerce with Mathematics</option>
                  <option value="Diploma / Polytechnic">Diploma / Polytechnic (Technical)</option>
                  <option value="Undergraduate (B.Sc / BCA / B.Tech)">Undergraduate (Looking for Specialization)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Specific Sector You Want To Enter (Optional):
                </label>
                <select
                  value={desiredSector}
                  onChange={(e) => setDesiredSector(e.target.value)}
                  className="w-full text-sm font-semibold rounded-xl border border-slate-300 p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="all">Open to All / Best Match Recommendation</option>
                  <option value="architecture">Architect (B.Arch & Spatial Design)</option>
                  <option value="computer-engineering">Software / Computer Science Engineering</option>
                  <option value="civil-structural">Civil & Structural Engineering</option>
                  <option value="mechanical-robotics">Mechanical, Robotics & Aerospace</option>
                  <option value="data-science-finance">Data Science & Quantitative Finance</option>
                  <option value="medical-biotech">Medical & Biotechnology</option>
                </select>
              </div>
            </div>
          </div>

          {/* Step 2: Subject Marks & Strengths */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h2 className="font-extrabold text-base text-slate-900">
                    Subject Marks & Proficiency (0-100%)
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    Slide to set your test scores or confidence
                  </p>
                </div>
              </div>

              {marks.math >= 85 && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  Math Star 🌟
                </span>
              )}
            </div>

            <div className="space-y-3.5">
              {/* Mathematics Slider */}
              <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200">
                <div className="flex justify-between items-center text-xs font-bold text-blue-950 mb-1">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                    Mathematics & Analytical Logic:
                  </span>
                  <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-extrabold">
                    {marks.math}%
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={marks.math}
                  onChange={(e) => setMarks(prev => ({ ...prev, math: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              {/* Physics */}
              <div>
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1">
                  <span>Physics & Mechanics:</span>
                  <span className="font-bold text-slate-900">{marks.physics}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={marks.physics}
                  onChange={(e) => setMarks(prev => ({ ...prev, physics: parseInt(e.target.value) }))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* Chemistry */}
              <div>
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1">
                  <span>Chemistry:</span>
                  <span className="font-bold text-slate-900">{marks.chemistry}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={marks.chemistry}
                  onChange={(e) => setMarks(prev => ({ ...prev, chemistry: parseInt(e.target.value) }))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* Biology */}
              <div>
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1">
                  <span>Biology & Life Sciences:</span>
                  <span className="font-bold text-slate-900">{marks.biology}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={marks.biology}
                  onChange={(e) => setMarks(prev => ({ ...prev, biology: parseInt(e.target.value) }))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* Spatial Drawing / Arts */}
              <div className="p-2.5 rounded-xl bg-purple-50/60 border border-purple-200">
                <div className="flex justify-between items-center text-xs font-bold text-purple-950 mb-1">
                  <span>Drawing, Visual Arts & 3D Spatial Sense:</span>
                  <span className="px-2 py-0.5 rounded bg-purple-600 text-white font-extrabold">
                    {marks.drawingAesthetics}%
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={marks.drawingAesthetics}
                  onChange={(e) => setMarks(prev => ({ ...prev, drawingAesthetics: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>

              {/* Computer Science */}
              <div>
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1">
                  <span>Computer Science & Coding Aptitude:</span>
                  <span className="font-bold text-slate-900">{marks.computerScience}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={marks.computerScience}
                  onChange={(e) => setMarks(prev => ({ ...prev, computerScience: parseInt(e.target.value) }))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
            </div>
          </div>

          {/* Step 3: Interests & Passions */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <div className="h-8 w-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h2 className="font-extrabold text-base text-slate-900">
                What Do You Enjoy Doing Most?
              </h2>
            </div>

            <div className="space-y-2">
              {interestOptions.map((interest, idx) => {
                const selected = selectedInterests.includes(interest)
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleInterestToggle(interest)}
                    className={`w-full flex items-center justify-between text-left p-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                      selected
                        ? 'bg-indigo-50 border-indigo-400 text-indigo-900'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{interest}</span>
                    <div className={`h-4 w-4 rounded flex items-center justify-center ${
                      selected ? 'bg-indigo-600 text-white' : 'border border-slate-300'
                    }`}>
                      {selected && <Check className="h-3 w-3" />}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Column: AI Analysis & Personalized Recommendations (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* SPECIAL HIGHLIGHT CARD FOR USER'S EXACT CONDITION */}
          {analyzerResult.isMathSignificantlyHigher ? (
            <div className="rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100/70 border-2 border-amber-300 p-5 sm:p-6 shadow-sm space-y-3">
              <div className="flex items-start gap-3.5">
                <div className="p-3 rounded-xl bg-amber-500 text-white shrink-0 shadow-xs">
                  <BrainCircuit className="h-6 w-6" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-black uppercase tracking-wider text-amber-950 bg-amber-200 px-2 py-0.5 rounded">
                      Special Diagnosis: High Math Profile
                    </span>
                    <span className="text-xs font-bold text-amber-800">
                      Math Advantage: +{analyzerResult.mathAvgDivergence}% vs Other Subjects
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-amber-950">
                    You Are Strong In Maths But Score Less In Other Subjects!
                  </h3>

                  <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                    {analyzerResult.primaryHighlight}
                  </p>

                  <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-amber-950">
                    <div className="bg-white/80 p-2.5 rounded-xl border border-amber-200">
                      🏛️ <strong>Top Path 1: Architecture</strong>
                      <p className="text-[11px] text-amber-800 mt-0.5 font-normal">
                        Pure geometry & visual proportions. Zero biology, zero heavy organic chemistry.
                      </p>
                    </div>
                    <div className="bg-white/80 p-2.5 rounded-xl border border-amber-200">
                      💻 <strong>Top Path 2: Software / CSE</strong>
                      <p className="text-[11px] text-amber-800 mt-0.5 font-normal">
                        Discrete mathematics & algorithms. Pure problem solving rather than rote memorization.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl bg-indigo-50 border border-indigo-200 p-5 flex items-start gap-3">
              <Compass className="h-5 w-5 text-indigo-700 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-sm text-indigo-950">Balanced Profile Evaluation</h3>
                <p className="text-xs text-indigo-800 mt-0.5">
                  Your academic profile and interests have been evaluated across our technical and design frameworks.
                </p>
              </div>
            </div>
          )}

          {/* Section Heading & Download Button */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">
                Top Sector Recommendations for You
              </h2>
              <p className="text-xs text-slate-500">
                Ranked by suitability to your qualifications, subject scores, and passions
              </p>
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                window.print()
                showToast('Printing / saving career analysis report')
              }}
              className="text-xs font-bold gap-1.5 cursor-pointer bg-white"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print Assessment</span>
            </Button>
          </div>

          {/* Recommendations Cards List */}
          <div className="space-y-5">
            {analyzerResult.recommendations.map((rec, idx) => {
              const IconComp = ICON_MAP[rec.sector.iconName] || GraduationCap
              const isTop = idx === 0

              return (
                <div
                  key={rec.sector.id}
                  className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                    isTop
                      ? 'border-indigo-400 shadow-md ring-2 ring-indigo-100'
                      : 'border-slate-200 shadow-xs hover:border-indigo-300'
                  }`}
                >
                  {/* Top Header of Card */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className={`p-3 rounded-xl shrink-0 ${
                          isTop 
                            ? 'bg-gradient-to-tr from-indigo-600 to-blue-600 text-white shadow-sm' 
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          <IconComp className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                              Rank #{idx + 1}
                            </span>
                            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                              {rec.sector.badge}
                            </span>
                          </div>
                          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
                            {rec.sector.title}
                          </h3>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {rec.sector.tagline}
                          </p>
                        </div>
                      </div>

                      {/* Match Percentage Pill */}
                      <div className="text-right shrink-0">
                        <div className="text-2xl font-black text-indigo-700 leading-none">
                          {rec.matchPercentage}%
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Match Score
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          rec.matchPercentage >= 85
                            ? 'bg-gradient-to-r from-emerald-500 to-indigo-600'
                            : 'bg-gradient-to-r from-blue-500 to-amber-500'
                        }`}
                        style={{ width: `${rec.matchPercentage}%` }}
                      />
                    </div>

                    {/* Why Fits Math & Non-Math divergence */}
                    {rec.sector.whyFitsMathHigh && (
                      <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3 text-xs text-amber-950 space-y-1">
                        <span className="font-extrabold text-[11px] uppercase tracking-wider text-amber-900 block">
                          Why This Fits Your Academic Profile:
                        </span>
                        <p className="leading-relaxed">
                          {rec.sector.whyFitsMathHigh}
                        </p>
                      </div>
                    )}

                    {/* Key Evaluation Reasons */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-xs font-bold text-slate-700 block">
                        Diagnostic Evaluation Points:
                      </span>
                      <ul className="space-y-1 text-xs text-slate-600">
                        {rec.reasons.map((r, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Quick Metadata: Exams, Colleges, Package */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs border-t border-slate-100">
                      <div className="bg-slate-50 p-2.5 rounded-xl">
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">Entrance Exams</span>
                        <span className="font-bold text-slate-800 line-clamp-1">{rec.sector.entranceExams.join(', ')}</span>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-xl">
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">Course Duration</span>
                        <span className="font-bold text-slate-800">{rec.sector.duration}</span>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-xl">
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">Salary Package</span>
                        <span className="font-bold text-emerald-700">{rec.sector.averageSalary}</span>
                      </div>
                    </div>

                    {/* Action Links: Read Notes & Watch YouTube */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <Link to={`/students/study-material?sector=${rec.sector.id}`}>
                          <Button size="sm" variant="outline" className="text-xs font-bold gap-1.5 cursor-pointer bg-white hover:bg-indigo-50 border-indigo-200 text-indigo-700">
                            <BookOpen className="h-3.5 w-3.5" />
                            <span>Study Notes ({rec.sector.category})</span>
                          </Button>
                        </Link>

                        <Link to={`/students/youtube?sector=${rec.sector.id}`}>
                          <Button size="sm" variant="outline" className="text-xs font-bold gap-1.5 cursor-pointer bg-white hover:bg-red-50 border-red-200 text-red-700">
                            <Youtube className="h-3.5 w-3.5" />
                            <span>YouTube Lectures</span>
                          </Button>
                        </Link>
                      </div>

                      <Link to={`/students/sectors#${rec.sector.id}`}>
                        <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold gap-1 cursor-pointer">
                          <span>Full Sector Guide</span>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
