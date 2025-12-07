import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import AdminDashboard from './AdminDashboard'
import TeacherDashboard from './TeacherDashboard'
import StudentDashboard from './StudentDashboard'
import ParentDashboard from './ParentDashboard'

export default function Dashboard() {
  const { user, initialLoading, isAuthenticated } = useSelector((state) => state.auth)

  console.log('Dashboard component rendering - user:', user, 'initialLoading:', initialLoading, 'isAuthenticated:', isAuthenticated)

  // Show loading while checking auth or loading user
  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // If not authenticated, should be redirected by ProtectedRoute, but show message just in case
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Please log in to continue</p>
        </div>
      </div>
    )
  }

  // If user is still loading
  if (!user) {
    return (
      <div className="p-8">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading user data...</p>
        </div>
      </div>
    )
  }

  // Render appropriate dashboard based on role
  let dashboardComponent
  switch (user.role) {
    case 'admin':
      dashboardComponent = <AdminDashboard />
      break
    case 'teacher':
      dashboardComponent = <TeacherDashboard />
      break
    case 'student':
      dashboardComponent = <StudentDashboard />
      break
    case 'parent':
      dashboardComponent = <ParentDashboard />
      break
    default:
      dashboardComponent = (
        <div className="p-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h1 className="text-2xl font-bold text-yellow-800 mb-2">Unknown Role</h1>
            <p className="text-yellow-700">Your user account has an unrecognized role: {user.role || 'none'}</p>
            <p className="text-yellow-700 mt-2">Please contact the administrator.</p>
          </div>
        </div>
      )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {dashboardComponent}
    </div>
  )
}

