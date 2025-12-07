import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../Layout/Navbar'
import Sidebar from './Sidebar'

export default function AdminLayout() {
  const location = useLocation()
  
  console.log('AdminLayout rendering, current path:', location.pathname)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 ml-64 p-8 min-h-[calc(100vh-4rem)] bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

