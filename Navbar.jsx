import { Link, useLocation } from 'react-router-dom'
import { FaPlane, FaHome, FaMapMarkerAlt, FaSuitcase, FaCalendarCheck, FaRoute } from 'react-icons/fa'

const Navbar = () => {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const navItems = [
    { path: '/', label: 'Home', icon: FaHome },
    { path: '/destinations', label: 'Destinations', icon: FaMapMarkerAlt },
    { path: '/packages', label: 'Packages', icon: FaSuitcase },
    { path: '/bookings', label: 'Bookings', icon: FaCalendarCheck },
    { path: '/itineraries', label: 'Itineraries', icon: FaRoute },
  ]

  return (
    <nav className="bg-primary-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold hover:text-primary-200 transition">
            <FaPlane className="text-2xl" />
            <span>Tourist Management</span>
          </Link>
          
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-md transition ${
                    isActive(item.path)
                      ? 'bg-primary-700 text-white'
                      : 'hover:bg-primary-500 text-primary-100'
                  }`}
                >
                  <Icon />
                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar


