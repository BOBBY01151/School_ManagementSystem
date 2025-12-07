import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  UserCheck,
  School,
  BookOpen,
  Calendar,
  FileText,
  ClipboardCheck,
  Award,
  Bell,
  Settings,
  BarChart3
} from 'lucide-react'
import { clsx } from 'clsx'

const menuItems = [
  { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/students', icon: Users, label: 'Students' },
  { path: '/admin/teachers', icon: UserCheck, label: 'Teachers' },
  { path: '/admin/classes', icon: School, label: 'Classes' },
  { path: '/admin/subjects', icon: BookOpen, label: 'Subjects' },
  { path: '/admin/attendance', icon: ClipboardCheck, label: 'Attendance' },
  { path: '/admin/marks', icon: Award, label: 'Marks' },
  { path: '/admin/assignments', icon: FileText, label: 'Assignments' },
  { path: '/admin/notices', icon: Bell, label: 'Notices' },
  { path: '/admin/reports', icon: BarChart3, label: 'Reports' },
  { path: '/admin/settings', icon: Settings, label: 'Settings' },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen fixed left-0 top-16 overflow-y-auto z-10">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-6 text-white">Admin Panel</h2>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path || 
              (item.path !== '/dashboard' && location.pathname.startsWith(item.path))
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={clsx(
                  'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                  isActive
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}

