import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  Home, 
  Sprout, 
  CloudSun, 
  TrendingUp, 
  User 
} from 'lucide-react'

export const MobileNavigation: React.FC = () => {
  const items = [
    { to: '/farmer', label: 'Home', icon: Home, end: true },
    { to: '/farmer/smart-farming', label: 'Farm', icon: Sprout },
    { to: '/farmer/weather', label: 'Weather', icon: CloudSun },
    { to: '/farmer/prices', label: 'Prices', icon: TrendingUp },
    { to: '/farmer/profile', label: 'Profile', icon: User }
  ]

  return (
    <nav 
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E5E7EB] shadow-lg px-2 py-1 safe-area-bottom"
      aria-label="Mobile Bottom Navigation"
    >
      <div className="grid grid-cols-5 items-center justify-around max-w-lg mx-auto">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1.5 px-1 min-h-[56px] rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'text-[#1B5E20] font-bold'
                  : 'text-gray-500 hover:text-gray-800'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`p-1 rounded-lg ${isActive ? 'bg-[#E8F5E9]' : ''}`}>
                  <item.icon className={`h-5 w-5 ${isActive ? 'text-[#1B5E20]' : 'text-gray-500'}`} />
                </div>
                <span className="text-[11px] tracking-tight mt-0.5">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
