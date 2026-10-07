import React, { useState, useRef, useEffect } from 'react'
import { useApp } from '@/context/AppContext'
import { SUPPORTED_LANGUAGES } from '@/data/mockData'
import { Globe, Check, ChevronDown } from 'lucide-react'

export const LanguageSelector: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { language, setLanguage } = useApp()
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const current = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0]

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-[#D1D5DB] bg-white px-2.5 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1B5E20] cursor-pointer"
        aria-label="Select language"
      >
        <Globe className="h-4 w-4 text-[#1B5E20]" />
        <span className="font-semibold">{current.nativeName}</span>
        {!compact && <span className="text-gray-400 text-xs hidden sm:inline">({current.label})</span>}
        <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-56 origin-top-right rounded-xl bg-white shadow-xl ring-1 ring-black/5 focus:outline-none z-50 divide-y divide-gray-100 max-h-80 overflow-y-auto border border-gray-100">
          <div className="p-2">
            <p className="px-2 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Choose Language / भाषा निवडा
            </p>
            {SUPPORTED_LANGUAGES.map((lang) => {
              const selected = lang.code === language
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code)
                    setIsOpen(false)
                  }}
                  className={`flex w-full items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors cursor-pointer ${
                    selected
                      ? 'bg-[#E8F5E9] text-[#1B5E20] font-bold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex flex-col text-left">
                    <span className="font-medium text-base">{lang.nativeName}</span>
                    <span className="text-xs text-gray-400">{lang.label}</span>
                  </div>
                  {selected && <Check className="h-4 w-4 text-[#1B5E20]" />}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
