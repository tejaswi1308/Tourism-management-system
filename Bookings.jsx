import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaPlus, FaEdit, FaTrash, FaCalendar, FaUsers, FaDollarSign } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { bookingsAPI, packagesAPI } from '../services/api'

const Bookings = () => {
  const [bookings, setBookings] = useState([])
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBookings()
    fetchPackages()
  }, [])

  const fetchBookings = async () => {
    try {
      const response = await bookingsAPI.getAll()
      setBookings(response.data)
    } catch (error) {
      toast.error('Failed to fetch bookings')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchPackages = async () => {
    try {
      const response = await packagesAPI.getAll()
      setPackages(response.data)
    } catch (error) {
      console.error('Error fetching packages:', error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await bookingsAPI.delete(id)
        toast.success('Booking deleted successfully')
        fetchBookings()
      } catch (error) {
        toast.error('Failed to delete booking')
        console.error('Error:', error)
      }
    }
  }

  const getPackageName = (packageId) => {
    const pkg = packages.find((p) => p.id === packageId)
    return pkg ? pkg.name : 'Unknown Package'
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Bookings</h1>
        <Link
          to="/bookings/new"
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition flex items-center space-x-2"
        >
          <FaPlus />
          <span>New Booking</span>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <>
          {bookings.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-600 text-lg mb-4">No bookings found</p>
              <Link
                to="/bookings/new"
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                Create your first booking
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Package
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Travelers
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Check-in
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Check-out
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {getPackageName(booking.packageId)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500">
                          <FaUsers className="mr-2" />
                          {booking.travelers}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500">
                          <FaCalendar className="mr-2" />
                          {new Date(booking.checkIn).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500">
                          <FaCalendar className="mr-2" />
                          {new Date(booking.checkOut).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm font-semibold text-gray-900">
                          <FaDollarSign className="mr-1" />
                          {booking.totalPrice}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link
                            to={`/bookings/${booking.id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() => handleDelete(booking.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Bookings


