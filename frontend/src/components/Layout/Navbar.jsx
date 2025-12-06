import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/slices/authSlice'
import { LogOut, Menu, User } from 'lucide-react'

export default function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  const roleLinks = {
    admin: [
      { path: '/dashboard', label: 'Dashboard' },
      { path: '/students', label: 'Students' },
      { path: '/classes', label: 'Classes' },
      { path: '/teachers', label: 'Teachers' },
      { path: '/attendance', label: 'Attendance' },
      { path: '/marks', label: 'Marks' },
      { path: '/notices', label: 'Notices' },
    ],
    teacher: [
      { path: '/dashboard', label: 'Dashboard' },
      { path: '/attendance', label: 'Attendance' },
      { path: '/assignments', label: 'Assignments' },
      { path: '/marks', label: 'Marks' },
      { path: '/timetable', label: 'Timetable' },
    ],
    student: [
      { path: '/dashboard', label: 'Dashboard' },
      { path: '/timetable', label: 'Timetable' },
      { path: '/attendance', label: 'My Attendance' },
      { path: '/marks', label: 'My Marks' },
      { path: '/assignments', label: 'Assignments' },
      { path: '/notices', label: 'Notices' },
    ],
    parent: [
      { path: '/dashboard', label: 'Dashboard' },
      { path: '/attendance', label: 'Attendance' },
      { path: '/marks', label: 'Marks' },
      { path: '/notices', label: 'Notices' },
    ],
  }

  const links = roleLinks[user?.role] || []

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/dashboard" className="flex items-center px-2 py-2 text-xl font-bold text-primary-600">
              Ananda Central College SMS
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-primary-600"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-600" />
              <span className="text-sm text-gray-700">{user?.name || user?.email}</span>
              <span className="text-xs px-2 py-1 bg-primary-100 text-primary-800 rounded">
                {user?.role?.toUpperCase()}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

