import { useEffect, useState } from 'react'
import axiosInstance from '../../lib/axios'
import { Clock, Users, BookOpen, Bell } from 'lucide-react'

export default function TeacherDashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await axiosInstance.get('/dashboard/teacher')
      setData(response.data.data)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Teacher Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Today's Periods</p>
              <p className="text-3xl font-bold mt-2">{data?.todaysPeriods?.length || 0}</p>
            </div>
            <Clock className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">My Classes</p>
              <p className="text-3xl font-bold mt-2">{data?.classes || 0}</p>
            </div>
            <Users className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Today's Attendance</p>
              <p className="text-3xl font-bold mt-2">{data?.todayAttendance || 0}</p>
            </div>
            <BookOpen className="h-8 w-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pending Grading</p>
              <p className="text-3xl font-bold mt-2">{data?.pendingGrading || 0}</p>
            </div>
            <Bell className="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Today's Timetable</h2>
          {data?.todaysPeriods && data.todaysPeriods.length > 0 ? (
            <div className="space-y-3">
              {data.todaysPeriods.map((period, index) => (
                <div key={index} className="border-l-4 border-primary-500 pl-4 py-2">
                  <p className="font-semibold">Period {period.period}</p>
                  <p className="text-gray-600">{period.subject?.name}</p>
                  <p className="text-sm text-gray-500">
                    {period.class?.grade} {period.class?.section} ({period.class?.medium})
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No classes scheduled for today</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Recent Notices</h2>
          {data?.notices && data.notices.length > 0 ? (
            <div className="space-y-3">
              {data.notices.map((notice) => (
                <div key={notice._id} className="border-b pb-3">
                  <p className="font-semibold">{notice.title}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(notice.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No notices</p>
          )}
        </div>
      </div>
    </div>
  )
}

