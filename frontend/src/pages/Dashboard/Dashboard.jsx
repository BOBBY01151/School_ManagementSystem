import { useSelector } from 'react-redux'
import AdminDashboard from './AdminDashboard'
import TeacherDashboard from './TeacherDashboard'
import StudentDashboard from './StudentDashboard'
import ParentDashboard from './ParentDashboard'

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth)

  if (!user) {
    return <div>Loading...</div>
  }

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />
    case 'teacher':
      return <TeacherDashboard />
    case 'student':
      return <StudentDashboard />
    case 'parent':
      return <ParentDashboard />
    default:
      return <div>Unknown role</div>
  }
}

