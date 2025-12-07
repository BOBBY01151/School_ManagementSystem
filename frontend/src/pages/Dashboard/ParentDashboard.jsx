import { useEffect, useState } from 'react'
import axiosInstance from '../../lib/axios'
import { Users, TrendingUp, BookOpen } from 'lucide-react'

export default function ParentDashboard() {
  const [data, setData] = useState(null)
  const [selectedChild, setSelectedChild] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await axiosInstance.get('/dashboard/parent')
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

  const currentChild = data?.children?.[selectedChild]

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {data?.parent?.name || 'Parent'}
      </h1>

      {data?.children && data.children.length > 1 && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Child
          </label>
          <select
            value={selectedChild}
            onChange={(e) => setSelectedChild(Number(e.target.value))}
            className="border border-gray-300 rounded-md px-4 py-2"
          >
            {data.children.map((child, index) => (
              <option key={index} value={index}>
                {child.name} - Grade {child.grade}
              </option>
            ))}
          </select>
        </div>
      )}

      {currentChild && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Attendance</p>
                  <p className="text-3xl font-bold mt-2">
                    {currentChild.attendancePercentage || 0}%
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Grade</p>
                  <p className="text-3xl font-bold mt-2">
                    {currentChild.grade} {currentChild.currentClass?.section || ''}
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Subjects</p>
                  <p className="text-3xl font-bold mt-2">
                    {currentChild.recentMarks?.length || 0}
                  </p>
                </div>
                <BookOpen className="h-8 w-8 text-purple-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Recent Marks</h2>
            {currentChild.recentMarks && currentChild.recentMarks.length > 0 ? (
              <div className="space-y-3">
                {currentChild.recentMarks.map((mark, index) => (
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
        </>
      )}
    </div>
  )
}

