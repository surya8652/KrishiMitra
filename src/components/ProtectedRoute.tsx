import React from 'react'
import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { useApp } from '@/context/AppContext'
import { UserRole } from '@/types'

interface ProtectedRouteProps {
  allowedRoles: UserRole[]
  children?: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const { role, isAuthenticated } = useApp()
  const location = useLocation()

  // If not logged in (in guest mode), redirect to login
  if (!isAuthenticated || role === 'guest') {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} state={{ from: location }} replace />
  }

  // If logged in but does not have the required role
  if (!allowedRoles.includes(role)) {
    // Route to user's authorized home according to position
    if (role === 'farmer') {
      return <Navigate to="/farmer" replace />
    }
    if (role === 'admin') {
      return <Navigate to="/admin" replace />
    }
    if (role === 'student') {
      return <Navigate to="/students" replace />
    }
    return <Navigate to="/" replace />
  }

  return children ? <>{children}</> : <Outlet />
}
