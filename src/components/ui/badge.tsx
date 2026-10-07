import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "destructive" | "outline" | "earth" | "neutral"
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variants = {
    default: "bg-[#1B5E20] text-white",
    success: "bg-[#E8F5E9] text-[#1B5E20] border border-[#A5D6A7]",
    warning: "bg-[#FFF8E1] text-[#B78103] border border-[#FFE082]",
    destructive: "bg-[#FFEBEE] text-[#C62828] border border-[#FFCDD2]",
    outline: "border border-gray-300 text-gray-700 bg-white",
    earth: "bg-[#EFEBE9] text-[#4E342E] border border-[#D7CCC8]",
    neutral: "bg-gray-100 text-gray-800"
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors tracking-wide",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}
