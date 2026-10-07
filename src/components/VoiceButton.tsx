import React from 'react'
import { useApp } from '@/context/AppContext'
import { Mic, MicOff, Volume2 } from 'lucide-react'

export const VoiceButton: React.FC<{ compact?: boolean; label?: string }> = ({ compact = false, label }) => {
  const { isVoiceListening, toggleVoiceListening, t } = useApp()

  return (
    <button
      type="button"
      onClick={toggleVoiceListening}
      className={`relative inline-flex items-center justify-center rounded-lg transition-all cursor-pointer font-medium ${
        isVoiceListening
          ? 'bg-amber-500 text-white ring-4 ring-amber-200 animate-pulse'
          : 'bg-[#FFF3E0] text-[#B78103] hover:bg-[#FFE0B2] border border-[#FFE082]'
      } ${compact ? 'p-2 h-10 w-10' : 'px-3 py-2 text-sm gap-2'}`}
      title={isVoiceListening ? t.voiceListening : t.voiceTapToSpeak}
      aria-label="Voice assistance"
    >
      {isVoiceListening ? (
        <MicOff className="h-4 w-4" />
      ) : (
        <Mic className="h-4 w-4 text-[#B78103]" />
      )}
      {!compact && (
        <span className="font-semibold text-xs md:text-sm">
          {label || (isVoiceListening ? 'Listening...' : 'Voice Assistant')}
        </span>
      )}
      {isVoiceListening && (
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
        </span>
      )}
    </button>
  )
}
