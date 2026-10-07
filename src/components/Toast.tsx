import React from 'react'
import { useApp } from '@/context/AppContext'
import { CheckCircle2, X } from 'lucide-react'

export const Toast: React.FC = () => {
  const { toast } = useApp()

  if (!toast) return null

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-4 z-50 max-w-sm w-full bg-[#1B5E20] text-white px-4 py-3.5 rounded-xl shadow-xl border border-emerald-600 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center gap-2.5">
        <CheckCircle2 className="h-5 w-5 text-emerald-300 shrink-0" />
        <p className="text-sm font-medium leading-snug">{toast}</p>
      </div>
    </div>
  )
}
