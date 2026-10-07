import * as React from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

export interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

export const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => onOpenChange(false)}
      />
      {/* Content wrapper */}
      <div className="relative z-50 w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl transition-all max-h-[90vh] flex flex-col">
        {children}
      </div>
    </div>
  )
}

export const DialogHeader: React.FC<{
  title: string
  description?: string
  onClose?: () => void
  className?: string
}> = ({ title, description, onClose, className }) => (
  <div className={cn("flex items-start justify-between border-b border-gray-100 p-5 md:p-6", className)}>
    <div>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
    </div>
    {onClose && (
      <button
        onClick={onClose}
        className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer"
        aria-label="Close dialog"
      >
        <X className="h-5 w-5" />
      </button>
    )}
  </div>
)

export const DialogBody: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => (
  <div className={cn("p-5 md:p-6 overflow-y-auto space-y-4", className)}>
    {children}
  </div>
)

export const DialogFooter: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => (
  <div className={cn("flex items-center justify-end gap-3 border-t border-gray-100 bg-gray-50 p-4 px-6", className)}>
    {children}
  </div>
)
