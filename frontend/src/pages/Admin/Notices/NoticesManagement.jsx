import { useEffect, useState } from 'react'
import axiosInstance from '../../../lib/axios'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import NoticeForm from '../../../components/Admin/NoticeForm'

export default function NoticesManagement() {
  const [notices, setNotices] = useState([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingNotice, setEditingNotice] = useState(null)

  useEffect(() => {
    fetchNotices()
  }, [])

  const fetchNotices = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get('/notices')
      setNotices(response.data.data || [])
    } catch (error) {
      console.error('Error fetching notices:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this notice?')) return
    try {
      await axiosInstance.delete(`/notices/${id}`)
      fetchNotices()
    } catch (error) {
      alert('Error deleting notice: ' + (error.response?.data?.message || error.message))
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Notice Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary-700"
        >
          <Plus className="h-5 w-5" />
          <span>Create Notice</span>
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="space-y-4">
          {notices.map((notice) => (
            <div key={notice._id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold">{notice.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded ${
                      notice.priority === 'Urgent' ? 'bg-red-100 text-red-800' :
                      notice.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {notice.priority}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {notice.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{notice.content}</p>
                  <div className="text-sm text-gray-500">
                    Target: {notice.targetAudience} • Published: {new Date(notice.publishedAt).toLocaleDateString()}
                    {notice.views && notice.views.length > 0 && (
                      <span className="ml-4">👁️ {notice.views.length} views</span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => {
                      setEditingNotice(notice)
                      setShowForm(true)
                    }}
                    className="text-primary-600 hover:text-primary-900"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(notice._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {notices.length === 0 && (
            <div className="text-center py-12 text-gray-500">No notices found</div>
          )}
        </div>
      )}

      {showForm && (
        <NoticeForm
          notice={editingNotice}
          onClose={() => {
            setShowForm(false)
            setEditingNotice(null)
            fetchNotices()
          }}
        />
      )}
    </div>
  )
}

