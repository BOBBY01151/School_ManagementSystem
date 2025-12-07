import { useEffect, useState } from 'react'
import axiosInstance from '../../lib/axios'
import { Users, UserCheck, School, TrendingUp, PieChart } from 'lucide-react'
import DebugInfo from '../../components/Admin/DebugInfo'
import {
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await axiosInstance.get('/dashboard/admin')
      if (response.data && response.data.data) {
        setStats(response.data.data)
      } else {
        // Even if response is invalid, set default stats
        setStats({ stats: { totalStudents: 0, totalTeachers: 0, totalClasses: 0, attendancePercentage: 0 } })
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      setError(error.response?.data?.message || error.message)
      // Set default stats even on error so dashboard still shows
      setStats({ stats: { totalStudents: 0, totalTeachers: 0, totalClasses: 0, attendancePercentage: 0 } })
    } finally {
      setLoading(false)
    }
  }

  // Always render something - show loading or content
  if (loading) {
    return (
      <div className="w-full">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Admin Dashboard</h1>
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    )
  }

  // Always show dashboard even if no stats
  const dashboardStats = stats?.stats || {
    totalStudents: 0,
    totalTeachers: 0,
    totalClasses: 0,
    attendancePercentage: 0
  }

  const statCards = [
    {
      title: 'Total Students',
      value: dashboardStats.totalStudents || 0,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Teachers',
      value: dashboardStats.totalTeachers || 0,
      icon: UserCheck,
      color: 'bg-green-500',
    },
    {
      title: 'Total Classes',
      value: dashboardStats.totalClasses || 0,
      icon: School,
      color: 'bg-purple-500',
    },
    {
      title: 'Attendance %',
      value: `${dashboardStats.attendancePercentage || 0}%`,
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ]

  console.log('AdminDashboard rendering - stats:', stats, 'loading:', loading)

  return (
    <div className="w-full">
      <DebugInfo component="AdminDashboard" />
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to Ananda Central College Management System</p>
      </div>

      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800">⚠️ {error}. Showing default data.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                <p className="text-3xl font-bold mt-2 text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Grade Distribution</h2>
          {stats?.gradeDistribution && stats.gradeDistribution.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.gradeDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-12">No grade distribution data available</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Stream Distribution</h2>
          {stats?.streamDistribution && stats.streamDistribution.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={stats.streamDistribution}
                  dataKey="count"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {stats.streamDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-12">No stream distribution data available</p>
          )}
        </div>
      </div>
    </div>
  )
}

