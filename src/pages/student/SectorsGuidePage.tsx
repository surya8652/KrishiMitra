import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Layers, 
  Building2, 
  Code2, 
  HardHat, 
  Cpu, 
  LineChart, 
  HeartPulse, 
  Sparkles, 
  ArrowRight, 
  GraduationCap, 
  BookOpen, 
  Youtube, 
  Award, 
  CheckCircle2, 
  Compass,
  Briefcase
} from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { CAREER_SECTORS, CareerSector } from '@/data/studentData'
import { Button } from '@/components/ui/button'

const ICON_MAP: Record<string, React.ElementType> = {
  Building2,
  Code2,
  HardHat,
  Cpu,
  LineChart,
  HeartPulse
}

export const SectorsGuidePage: React.FC = () => {
  const { t } = useApp()
  const [activeSectorId, setActiveSectorId] = useState<string>(CAREER_SECTORS[0].id)

  const activeSector = CAREER_SECTORS.find(s => s.id === activeSectorId) || CAREER_SECTORS[0]
  const ActiveIcon = ICON_MAP[activeSector.iconName] || GraduationCap

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-100 text-indigo-700">
            <Layers className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {t.sectorGuide}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Complete career guides for Architecture, Specific Engineering streams, and Sciences
            </p>
          </div>
        </div>

        <Link to="/students">
          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold gap-1.5 cursor-pointer">
            <Compass className="h-3.5 w-3.5" />
            <span>Check My Eligibility & Match</span>
          </Button>
        </Link>
      </div>

      {/* Sector Navigation Pill Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {CAREER_SECTORS.map((sec) => {
          const IconComp = ICON_MAP[sec.iconName] || GraduationCap
          const isSelected = sec.id === activeSectorId

          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveSectorId(sec.id)}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-24 ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-indigo-200'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
              }`}
            >
              <div className={`p-1.5 rounded-lg w-fit ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-indigo-600'}`}>
                <IconComp className="h-4 w-4" />
              </div>
              <div>
                <span className="font-extrabold text-xs block leading-tight">
                  {sec.title.split('(')[0]}
                </span>
                <span className={`text-[10px] ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                  {sec.category}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Active Sector Detailed Dossier */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-indigo-600 text-white shadow-lg">
                <ActiveIcon className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                    {activeSector.badge}
                  </span>
                  <span className="text-xs text-slate-300 font-semibold">
                    Duration: {activeSector.duration}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                  {activeSector.title}
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm max-w-2xl">
                  {activeSector.tagline}
                </p>
              </div>
            </div>

            {/* Salary Estimate Badge */}
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-right shrink-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-200 block">
                Typical Compensation
              </span>
              <span className="text-lg font-black text-emerald-400">
                {activeSector.averageSalary}
              </span>
              <span className="text-[11px] text-slate-300 block">
                Growth: {activeSector.growthOutlook}
              </span>
            </div>
          </div>
        </div>

        {/* Dossier Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Math High Advantage Highlight */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-200 px-2 py-0.5 rounded">
                Aptitude & Subject Alignment
              </span>
            </div>
            <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
              {activeSector.whyFitsMathHigh}
            </p>
          </div>

          {/* Overview */}
          <div className="space-y-2">
            <h3 className="font-extrabold text-lg text-slate-900">
              Sector Overview & Day-to-Day Nature
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {activeSector.overview}
            </p>
          </div>

          {/* 3 Grid Pillars: Eligibility, Exams, Top Colleges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                1. Eligibility & Prerequisite
              </span>
              <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                {activeSector.eligibility}
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                2. Key Entrance Exams
              </span>
              <ul className="space-y-1.5 text-xs text-slate-800 font-bold">
                {activeSector.entranceExams.map((exam, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-600"></span>
                    <span>{exam}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                3. Premier Colleges in India
              </span>
              <ul className="space-y-1 text-xs text-slate-700 font-medium">
                {activeSector.topColleges.map((col, idx) => (
                  <li key={idx}>• {col}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Career Roles and Subjects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-indigo-600" />
                <span>Typical Job Roles & Titles</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeSector.jobRoles.map((role, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200">
                    {role}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-indigo-600" />
                <span>Foundational Subjects to Master</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeSector.keySubjects.map((sub, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-800 text-xs font-bold border border-indigo-200">
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Roadmap Steps */}
          <div className="space-y-4 pt-2">
            <h3 className="font-extrabold text-base text-slate-900">
              5-Step Preparation Roadmap
            </h3>
            <div className="space-y-2.5">
              {activeSector.roadmap.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <div className="h-6 w-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {idx + 1}
                  </div>
                  <p className="text-slate-700 font-medium leading-relaxed mt-0.5">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links for this specific sector */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link to={`/students/study-material?sector=${activeSector.id}`}>
                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold gap-1.5 cursor-pointer">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Explore Study Notes for this Sector</span>
                </Button>
              </Link>

              <Link to={`/students/youtube?sector=${activeSector.id}`}>
                <Button size="sm" variant="outline" className="border-red-300 text-red-700 bg-white hover:bg-red-50 text-xs font-bold gap-1.5 cursor-pointer">
                  <Youtube className="h-3.5 w-3.5 text-red-600" />
                  <span>Curated YouTube Videos</span>
                </Button>
              </Link>
            </div>

            <Link to="/students">
              <Button size="sm" variant="ghost" className="text-xs font-bold gap-1 text-slate-600 hover:text-slate-900">
                <span>Assess My Match in Analyzer</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
