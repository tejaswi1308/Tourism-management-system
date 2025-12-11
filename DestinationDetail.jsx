import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { FaStar, FaMapMarkerAlt, FaClock, FaDollarSign, FaArrowLeft, FaCheckCircle } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { destinationsAPI, packagesAPI } from '../services/api'

const DestinationDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [destination, setDestination] = useState(null)
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDestination()
    fetchPackages()
  }, [id])

  const fetchDestination = async () => {
    try {
      const response = await destinationsAPI.getById(id)
      setDestination(response.data)
    } catch (error) {
      toast.error('Failed to fetch destination details')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchPackages = async () => {
    try {
      const response = await packagesAPI.getAll()
      const filtered = response.data.filter(pkg => pkg.destinationId === parseInt(id))
      setPackages(filtered)
    } catch (error) {
      console.error('Error fetching packages:', error)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!destination) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">Destination not found</p>
        <Link to="/destinations" className="text-primary-600 hover:underline mt-4 inline-block">
          Back to Destinations
        </Link>
      </div>
    )
  }

  return (
    <div className="fade-in">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition"
      >
        <FaArrowLeft />
        <span>Back</span>
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-96">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/1200x600?text=Destination'
            }}
          />
          <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full flex items-center space-x-2">
            <FaStar className="text-yellow-400" />
            <span className="font-semibold">{destination.rating}</span>
          </div>
        </div>

        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{destination.name}</h1>
          
          <div className="flex flex-wrap items-center gap-6 mb-6 text-gray-600">
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-primary-600" />
              <span>{destination.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaClock className="text-primary-600" />
              <span>{destination.duration}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaDollarSign className="text-primary-600" />
              <span className="text-2xl font-bold text-primary-600">${destination.price}</span>
            </div>
          </div>

          <p className="text-gray-700 text-lg mb-8 leading-relaxed">{destination.description}</p>

          {destination.highlights && destination.highlights.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {destination.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-2 text-gray-700">
                    <FaCheckCircle className="text-green-500" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {packages.length > 0 && (
            <div className="mt-8 pt-8 border-t">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Available Packages</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {packages.map((pkg) => (
                  <Link
                    key={pkg.id}
                    to={`/packages/${pkg.id}`}
                    className="bg-primary-50 p-4 rounded-lg hover:bg-primary-100 transition border border-primary-200"
                  >
                    <h3 className="font-bold text-lg mb-2">{pkg.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{pkg.description}</p>
                    <p className="text-primary-600 font-semibold">${pkg.price}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex space-x-4">
            <Link
              to={`/bookings/new?destinationId=${id}`}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition font-semibold"
            >
              Book Now
            </Link>
            <Link
              to="/destinations"
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
            >
              Browse More Destinations
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DestinationDetail


