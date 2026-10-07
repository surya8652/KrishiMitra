import * as React from "react"
import { cn } from "@/lib/utils"

interface TabsContextType {
  value: string
  onValueChange: (val: string) => void
}

const TabsContext = React.createContext<TabsContextType | undefined>(undefined)

export const Tabs: React.FC<{
  value: string
  onValueChange: (val: string) => void
  children: React.ReactNode
  className?: string
}> = ({ value, onValueChange, children, className }) => {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  )
}

export const TabsList: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "inline-flex h-12 items-center justify-center rounded-lg bg-[#EFEBE9] p-1 text-gray-700 w-full md:w-auto",
        className
      )}
    >
      {children}
    </div>
  )
}

export const TabsTrigger: React.FC<{
  value: string
  children: React.ReactNode
  className?: string
}> = ({ value, children, className }) => {
  const context = React.useContext(TabsContext)
  if (!context) throw new Error("TabsTrigger must be used within Tabs")

  const isActive = context.value === value

  return (
    <button
      type="button"
      onClick={() => context.onValueChange(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm md:text-base font-semibold transition-all cursor-pointer flex-1 md:flex-initial",
        isActive
          ? "bg-white text-[#1B5E20] shadow-sm font-bold"
          : "text-gray-600 hover:text-gray-900 hover:bg-white/40",
        className
      )}
    >
      {children}
    </button>
  )
}

export const TabsContent: React.FC<{
  value: string
  children: React.ReactNode
  className?: string
}> = ({ value, children, className }) => {
  const context = React.useContext(TabsContext)
  if (!context) throw new Error("TabsContent must be used within Tabs")

  if (context.value !== value) return null

  return (
    <div className={cn("mt-4 focus-visible:outline-none", className)}>
      {children}
    </div>
  )
}
