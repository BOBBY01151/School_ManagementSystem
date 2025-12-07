import { useEffect, useState } from 'react'
import axiosInstance from '../../lib/axios'
import { Clock, TrendingUp, BookOpen, Bell } from 'lucide-react'

export default function StudentDashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await axiosInstance.get('/dashboard/student')
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
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {data?.student?.name || 'Student'}
      </h1>
      <p className="text-gray-600 mb-6">
        Grade {data?.student?.grade} {data?.student?.section}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Attendance</p>
              <p className="text-3xl font-bold mt-2">{data?.attendancePercentage || 0}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Subjects</p>
              <p className="text-3xl font-bold mt-2">{data?.marks?.length || 0}</p>
            </div>
            <BookOpen className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">New Notices</p>
              <p className="text-3xl font-bold mt-2">{data?.notices?.length || 0}</p>
            </div>
            <Bell className="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Today's Timetable</h2>
          {data?.timetable && data.timetable.length > 0 ? (
            <div className="space-y-3">
              {data.timetable.map((period, index) => (
                <div key={index} className="border-l-4 border-primary-500 pl-4 py-2">
                  <p className="font-semibold">Period {period.period}</p>
                  <p className="text-gray-600">{period.subject?.name}</p>
                  <p className="text-sm text-gray-500">Teacher: {period.teacher?.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No classes scheduled for today</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Term Marks Summary</h2>
          {data?.marks && data.marks.length > 0 ? (
            <div className="space-y-3">
              {data.marks.map((mark, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-semibold">{mark.subject?.name}</p>
                    <p className="text-sm text-gray-500">
                      {mark.finalMarks !== null ? mark.finalMarks : mark.termMarks} / 100
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded text-sm font-semibold ${
                      mark.grade === 'A'
                        ? 'bg-green-100 text-green-800'
                        : mark.grade === 'B'
                        ? 'bg-blue-100 text-blue-800'
                        : mark.grade === 'C'
                        ? 'bg-yellow-100 text-yellow-800'
                        : mark.grade === 'S'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {mark.grade || 'N/A'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No marks available</p>
          )}
        </div>
      </div>
    </div>
  )
}

