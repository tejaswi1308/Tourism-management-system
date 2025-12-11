import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaMapMarkerAlt, FaSuitcase, FaCalendarCheck } from 'react-icons/fa'
import { destinationsAPI } from '../services/api'
import DestinationCard from '../components/DestinationCard'

const Home = () => {
  const [destinations, setDestinations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDestinations()
  }, [])

  const fetchDestinations = async () => {
    try {
      const response = await destinationsAPI.getAll()
      setDestinations(response.data.slice(0, 6))
    } catch (error) {
      console.error('Error fetching destinations:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-lg p-12 mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Tourist Management System</h1>
        <p className="text-xl mb-8 text-primary-100">
          Discover amazing destinations, book travel packages, and manage your itineraries all in one place
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/destinations"
            className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition flex items-center space-x-2"
          >
            <span>Explore Destinations</span>
            <FaArrowRight />
          </Link>
          <Link
            to="/packages"
            className="bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-400 transition"
          >
            View Packages
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaMapMarkerAlt className="text-4xl text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Browse Destinations</h3>
            <p className="text-gray-600">Explore beautiful destinations around the world with detailed information</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaSuitcase className="text-4xl text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Book Packages</h3>
            <p className="text-gray-600">Choose from curated travel packages tailored to your preferences</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaCalendarCheck className="text-4xl text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Manage Itineraries</h3>
            <p className="text-gray-600">Plan and organize your travel schedule with detailed itineraries</p>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Featured Destinations</h2>
          <Link
            to="/destinations"
            className="text-primary-600 hover:text-primary-700 font-semibold flex items-center space-x-2"
          >
            <span>View All</span>
            <FaArrowRight />
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Home


