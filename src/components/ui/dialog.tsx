import * as React from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

export interface DialogProps {
  open: boolean
  onOpenChange?: (open: boolean) => void
  onClose?: () => void
  children: React.ReactNode
  className?: string
}

export const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, onClose, children, className }) => {
  if (!open) return null

  const handleClose = () => {
    if (onClose) onClose()
    if (onOpenChange) onOpenChange(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />
      {/* Content wrapper */}
      <div className={cn("relative z-50 w-full max-w-lg md:max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl transition-all max-h-[90vh] flex flex-col", className)}>
        {children}
      </div>
    </div>
  )
}

export const DialogHeader: React.FC<{
  title?: string
  description?: string
  onClose?: () => void
  className?: string
  children?: React.ReactNode
}> = ({ title, description, onClose, className, children }) => (
  <div className={cn("flex items-start justify-between border-b border-gray-100 p-5 md:p-6", className)}>
    <div className="flex-1 min-w-0 pr-2">
      {title && <h3 className="text-xl font-bold text-gray-900">{title}</h3>}
      {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      {children}
    </div>
    {onClose && (
      <button
        type="button"
        onClick={onClose}
        className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer shrink-0"
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
