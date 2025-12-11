import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaPlus, FaEdit, FaTrash, FaCalendar } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { itinerariesAPI, bookingsAPI, destinationsAPI } from '../services/api'

const Itineraries = () => {
  const navigate = useNavigate()
  const [itineraries, setItineraries] = useState([])
  const [bookings, setBookings] = useState([])
  const [destinations, setDestinations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchItineraries()
    fetchBookings()
    fetchDestinations()
  }, [])

  const fetchItineraries = async () => {
    try {
      const response = await itinerariesAPI.getAll()
      setItineraries(response.data)
    } catch (error) {
      toast.error('Failed to fetch itineraries')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchBookings = async () => {
    try {
      const response = await bookingsAPI.getAll()
      setBookings(response.data)
    } catch (error) {
      console.error('Error fetching bookings:', error)
    }
  }

  const fetchDestinations = async () => {
    try {
      const response = await destinationsAPI.getAll()
      setDestinations(response.data)
    } catch (error) {
      console.error('Error fetching destinations:', error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this itinerary?')) {
      try {
        await itinerariesAPI.delete(id)
        toast.success('Itinerary deleted successfully')
        fetchItineraries()
      } catch (error) {
        toast.error('Failed to delete itinerary')
        console.error('Error:', error)
      }
    }
  }

  const getDestinationName = (destinationId) => {
    const dest = destinations.find((d) => d.id === destinationId)
    return dest ? dest.name : 'Unknown Destination'
  }

  const getBookingInfo = (bookingId) => {
    const booking = bookings.find((b) => b.id === bookingId)
    return booking ? `Booking #${booking.id}` : 'Unknown Booking'
  }

  return (
    <div className="fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Itineraries</h1>
        <button
          onClick={() => navigate('/itineraries/new')}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition flex items-center space-x-2"
        >
          <FaPlus />
          <span>New Itinerary</span>
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <>
          {itineraries.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-600 text-lg mb-4">No itineraries found</p>
              <button
                onClick={() => navigate('/itineraries/new')}
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                Create your first itinerary
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {itineraries.map((itinerary) => (
                <div
                  key={itinerary.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800">
                        Day {itinerary.day}
                      </h3>
                      <div className="flex space-x-2">
                        <Link
                          to={`/itineraries/${itinerary.id}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => handleDelete(itinerary.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-2">
                        <FaCalendar className="text-primary-600" />
                        <span>{new Date(itinerary.date).toLocaleDateString()}</span>
                      </div>
                      <p>
                        <span className="font-semibold">Destination:</span>{' '}
                        {getDestinationName(itinerary.destinationId)}
                      </p>
                      <p>
                        <span className="font-semibold">Booking:</span>{' '}
                        {getBookingInfo(itinerary.bookingId)}
                      </p>
                    </div>

                    <div className="border-t pt-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Activities:</p>
                      <ul className="space-y-1">
                        {itinerary.activities?.slice(0, 3).map((activity, index) => (
                          <li key={index} className="text-sm text-gray-600">
                            <span className="font-medium">{activity.time}</span> - {activity.activity}
                          </li>
                        ))}
                        {itinerary.activities?.length > 3 && (
                          <li className="text-sm text-primary-600 font-medium">
                            +{itinerary.activities.length - 3} more activities
                          </li>
                        )}
                      </ul>
                    </div>

                    <Link
                      to={`/itineraries/${itinerary.id}`}
                      className="mt-4 block text-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Itineraries

