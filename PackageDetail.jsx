import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { FaCheckCircle, FaClock, FaArrowLeft, FaDollarSign } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { packagesAPI, destinationsAPI } from '../services/api'

const PackageDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [packageData, setPackageData] = useState(null)
  const [destination, setDestination] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPackage()
  }, [id])

  const fetchPackage = async () => {
    try {
      const response = await packagesAPI.getById(id)
      setPackageData(response.data)
      
      // Fetch destination details
      if (response.data.destinationId) {
        try {
          const destResponse = await destinationsAPI.getById(response.data.destinationId)
          setDestination(destResponse.data)
        } catch (error) {
          console.error('Error fetching destination:', error)
        }
      }
    } catch (error) {
      toast.error('Failed to fetch package details')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!packageData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">Package not found</p>
        <Link to="/packages" className="text-primary-600 hover:underline mt-4 inline-block">
          Back to Packages
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
        <div className="p-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold text-gray-800">{packageData.name}</h1>
            <div className="flex items-center space-x-2">
              <FaDollarSign className="text-primary-600" />
              <span className="text-3xl font-bold text-primary-600">${packageData.price}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-6 text-gray-600">
            <div className="flex items-center space-x-2">
              <FaClock className="text-primary-600" />
              <span>{packageData.duration}</span>
            </div>
            {destination && (
              <Link
                to={`/destinations/${destination.id}`}
                className="text-primary-600 hover:text-primary-700 hover:underline"
              >
                {destination.name}
              </Link>
            )}
          </div>

          <p className="text-gray-700 text-lg mb-8 leading-relaxed">{packageData.description}</p>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">What's Included</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {packageData.includes?.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 text-gray-700">
                  <FaCheckCircle className="text-green-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-4 pt-6 border-t">
            <Link
              to={`/bookings/new?packageId=${id}`}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition font-semibold"
            >
              Book This Package
            </Link>
            <Link
              to="/packages"
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
            >
              Browse More Packages
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PackageDetail


