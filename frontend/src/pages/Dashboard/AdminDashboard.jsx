import { useEffect, useState } from 'react'
import axiosInstance from '../../lib/axios'
import { Users, UserCheck, School, TrendingUp, PieChart } from 'lucide-react'
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

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await axiosInstance.get('/dashboard/admin')
      setStats(response.data.data)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  const statCards = [
    {
      title: 'Total Students',
      value: stats?.stats?.totalStudents || 0,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Teachers',
      value: stats?.stats?.totalTeachers || 0,
      icon: UserCheck,
      color: 'bg-green-500',
    },
    {
      title: 'Total Classes',
      value: stats?.stats?.totalClasses || 0,
      icon: School,
      color: 'bg-purple-500',
    },
    {
      title: 'Attendance %',
      value: `${stats?.stats?.attendancePercentage || 0}%`,
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ]

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{stat.title}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {stats?.gradeDistribution && stats.gradeDistribution.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Grade Distribution</h2>
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
          </div>
        )}

        {stats?.streamDistribution && stats.streamDistribution.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Stream Distribution</h2>
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
          </div>
        )}
      </div>
    </div>
  )
}

