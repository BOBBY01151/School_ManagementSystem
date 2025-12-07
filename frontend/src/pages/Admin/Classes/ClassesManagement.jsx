import { useEffect, useState } from 'react'
import axiosInstance from '../../../lib/axios'
import { Plus, Edit, Trash2, Users } from 'lucide-react'
import ClassForm from '../../../components/Admin/ClassForm'

export default function ClassesManagement() {
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingClass, setEditingClass] = useState(null)

  useEffect(() => {
    fetchClasses()
  }, [])

  const fetchClasses = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get('/classes')
      setClasses(response.data.data || [])
    } catch (error) {
      console.error('Error fetching classes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this class?')) return
    try {
      await axiosInstance.delete(`/classes/${id}`)
      fetchClasses()
    } catch (error) {
      alert('Error deleting class: ' + (error.response?.data?.message || error.message))
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Class Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary-700"
        >
          <Plus className="h-5 w-5" />
          <span>Add Class</span>
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((classItem) => (
            <div key={classItem._id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">
                    Grade {classItem.grade} {classItem.section}
                  </h3>
                  <p className="text-gray-600">{classItem.medium}</p>
                  {classItem.stream && (
                    <span className="inline-block mt-1 px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded">
                      {classItem.stream}
                    </span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingClass(classItem)
                      setShowForm(true)
                    }}
                    className="text-primary-600 hover:text-primary-900"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(classItem._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{classItem.students?.length || 0} Students</span>
                </div>
                {classItem.classTeacher && (
                  <div className="text-gray-600">
                    Class Teacher: {classItem.classTeacher.name}
                  </div>
                )}
                <div className="text-gray-600">
                  Academic Year: {classItem.academicYear}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <ClassForm
          classData={editingClass}
          onClose={() => {
            setShowForm(false)
            setEditingClass(null)
            fetchClasses()
          }}
        />
      )}
    </div>
  )
}

