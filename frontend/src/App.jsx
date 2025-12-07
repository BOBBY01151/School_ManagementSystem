import { useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser, setInitialLoading } from './store/slices/authSlice'
import Navbar from './components/Layout/Navbar'
import ProtectedRoute from './components/Layout/ProtectedRoute'
import AdminLayout from './components/Admin/AdminLayout'
import Login from './pages/Auth/Login'
import Dashboard from './pages/Dashboard/Dashboard'

import StudentsList from './pages/Students/StudentsList'
import ClassesList from './pages/Classes/ClassesList'
import Attendance from './pages/Attendance/Attendance'
import Marks from './pages/Marks/Marks'
import Assignments from './pages/Assignments/Assignments'
import Timetable from './pages/Timetable/Timetable'
import Notices from './pages/Notices/Notices'
// Admin Pages
import AdminDashboard from './pages/Dashboard/AdminDashboard'
import StudentsManagement from './pages/Admin/Students/StudentsManagement'
import TeachersManagement from './pages/Admin/Teachers/TeachersManagement'
import ClassesManagement from './pages/Admin/Classes/ClassesManagement'
import NoticesManagement from './pages/Admin/Notices/NoticesManagement'

// Component to redirect admin users to admin dashboard
function DashboardRedirect() {
  const { user, initialLoading } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    // Only redirect if user is loaded and is admin
    if (!initialLoading && user?.role === 'admin') {
      navigate('/admin/dashboard', { replace: true })
    }
  }, [user, initialLoading, navigate])

  // Show loading while checking
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

  return <Dashboard />
}

// Component to handle login redirects
function LoginRedirect() {
  const { isAuthenticated, user, initialLoading } = useSelector((state) => state.auth)
  
  // Show loading while checking auth
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
  
  if (isAuthenticated) {
    if (user?.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />
    }
    return <Navigate to="/dashboard" replace />
  }
  
  return <Login />
}

function App() {
  const dispatch = useDispatch()
  const { initialLoading, isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      dispatch(getCurrentUser())
    } else {
      // If no token, mark initial loading as complete
      dispatch(setInitialLoading(false))
    }
  }, [dispatch])

  // Show loading screen while checking initial auth
  const token = localStorage.getItem('token')
  if (initialLoading && token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route
          path="/login"
          element={<LoginRedirect />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardRedirect />
            </ProtectedRoute>
          }
        />
        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="students" element={<StudentsManagement />} />
          <Route path="teachers" element={<TeachersManagement />} />
          <Route path="classes" element={<ClassesManagement />} />
          <Route path="notices" element={<NoticesManagement />} />
        </Route>
        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <StudentsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/classes"
          element={
            <ProtectedRoute>
              <ClassesList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/marks"
          element={
            <ProtectedRoute>
              <Marks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assignments"
          element={
            <ProtectedRoute>
              <Assignments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/timetable"
          element={
            <ProtectedRoute>
              <Timetable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notices"
          element={
            <ProtectedRoute>
              <Notices />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </div>
  )
}

export default App

