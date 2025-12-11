import { useState, useEffect } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { bookingsAPI, packagesAPI } from '../services/api'

const BookingForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [formData, setFormData] = useState({
    packageId: searchParams.get('packageId') || '',
    userId: 'user1',
    travelers: 1,
    checkIn: '',
    checkOut: '',
    status: 'pending',
  })
  const [packages, setPackages] = useState([])
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(!!id)

  useEffect(() => {
    fetchPackages()
    if (id) {
      fetchBooking()
    }
  }, [id])

  useEffect(() => {
    if (formData.packageId) {
      const pkg = packages.find((p) => p.id === parseInt(formData.packageId))
      setSelectedPackage(pkg)
    }
  }, [formData.packageId, packages])

  const fetchPackages = async () => {
    try {
      const response = await packagesAPI.getAll()
      setPackages(response.data)
    } catch (error) {
      console.error('Error fetching packages:', error)
    }
  }

  const fetchBooking = async () => {
    try {
      const response = await bookingsAPI.getById(id)
      const booking = response.data
      setFormData({
        packageId: booking.packageId.toString(),
        userId: booking.userId,
        travelers: booking.travelers,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        status: booking.status,
      })
    } catch (error) {
      toast.error('Failed to fetch booking')
      console.error('Error:', error)
    } finally {
      setFetching(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'travelers' ? parseInt(value) || 1 : value,
    }))
  }

  const calculateTotal = () => {
    if (selectedPackage && formData.travelers) {
      return selectedPackage.price * formData.travelers
    }
    return 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const data = {
        ...formData,
        packageId: parseInt(formData.packageId),
        totalPrice: calculateTotal(),
        bookingDate: new Date().toISOString().split('T')[0],
      }

      if (id) {
        await bookingsAPI.update(id, data)
        toast.success('Booking updated successfully')
      } else {
        await bookingsAPI.create(data)
        toast.success('Booking created successfully')
      }
      navigate('/bookings')
    } catch (error) {
      toast.error(id ? 'Failed to update booking' : 'Failed to create booking')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="fade-in max-w-2xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition"
      >
        <FaArrowLeft />
        <span>Back</span>
      </button>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {id ? 'Edit Booking' : 'New Booking'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Package *
            </label>
            <select
              name="packageId"
              value={formData.packageId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Choose a package</option>
              {packages
                .filter((pkg) => pkg.available)
                .map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.name} - ${pkg.price}
                  </option>
                ))}
            </select>
          </div>

          {selectedPackage && (
            <div className="bg-primary-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">{selectedPackage.name}</h3>
              <p className="text-sm text-gray-600">{selectedPackage.description}</p>
              <p className="text-sm text-gray-600 mt-2">Duration: {selectedPackage.duration}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Travelers *
              </label>
              <input
                type="number"
                name="travelers"
                value={formData.travelers}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Check-in Date *
              </label>
              <input
                type="date"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Check-out Date *
              </label>
              <input
                type="date"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
                required
                min={formData.checkIn || new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-700">Total Price:</span>
              <span className="text-2xl font-bold text-primary-600">
                ${calculateTotal().toFixed(2)}
              </span>
            </div>
            {selectedPackage && (
              <p className="text-sm text-gray-500 mt-1">
                ${selectedPackage.price} × {formData.travelers} traveler(s)
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/bookings')}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
            >
              {loading ? 'Saving...' : id ? 'Update Booking' : 'Create Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BookingForm


