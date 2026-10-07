import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "agri"
  size?: "default" | "sm" | "lg" | "icon"
  isLoading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none rounded-lg cursor-pointer"
    
    const variants = {
      default: "bg-[#1B5E20] text-white hover:bg-[#144818] shadow-sm hover:shadow",
      agri: "bg-[#2E7D32] text-white hover:bg-[#1B5E20] shadow-sm",
      secondary: "bg-[#E8F5E9] text-[#1B5E20] hover:bg-[#C8E6C9] font-semibold",
      outline: "border border-[#D1D5DB] bg-white text-[#1F2937] hover:bg-[#F9FAFB] hover:border-[#9CA3AF]",
      ghost: "text-[#374151] hover:bg-[#F3F4F6] hover:text-[#111827]",
      destructive: "bg-red-600 text-white hover:bg-red-700"
    }

    const sizes = {
      default: "h-11 px-5 py-2.5 text-base",
      sm: "h-9 px-3.5 text-sm",
      lg: "h-13 px-7 text-lg font-semibold",
      icon: "h-11 w-11 p-2"
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"
