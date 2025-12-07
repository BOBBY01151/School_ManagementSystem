import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoadingSpinner from './LoadingSpinner'

export default function ProtectedRoute({ children, requiredRole }) {
  const { isAuthenticated, user, initialLoading } = useSelector((state) => state.auth)

  // Show loading state while checking authentication
  if (initialLoading) {
    return <LoadingSpinner />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

