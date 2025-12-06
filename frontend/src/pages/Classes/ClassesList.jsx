import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchClasses } from '../../store/slices/classSlice'

export default function ClassesList() {
  const dispatch = useDispatch()
  const { classes, loading } = useSelector((state) => state.classes)

  useEffect(() => {
    dispatch(fetchClasses())
  }, [dispatch])

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Classes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <div key={classItem._id} className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-2">
              Grade {classItem.grade} {classItem.section}
            </h2>
            <p className="text-gray-600 mb-2">Medium: {classItem.medium}</p>
            {classItem.stream && (
              <p className="text-gray-600 mb-2">Stream: {classItem.stream}</p>
            )}
            <p className="text-gray-600 mb-2">
              Students: {classItem.students?.length || 0}
            </p>
            {classItem.classTeacher && (
              <p className="text-gray-600">
                Class Teacher: {classItem.classTeacher.name}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

