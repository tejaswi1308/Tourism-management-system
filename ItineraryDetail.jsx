import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { FaArrowLeft, FaClock, FaMapMarkerAlt, FaEdit, FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { itinerariesAPI, destinationsAPI, bookingsAPI } from '../services/api'
import ItineraryForm from '../components/ItineraryForm'

const ItineraryDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [itinerary, setItinerary] = useState(null)
  const [destination, setDestination] = useState(null)
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    if (id && id !== 'new') {
      fetchItinerary()
    } else {
      setLoading(false)
    }
  }, [id])

  const fetchItinerary = async () => {
    try {
      const response = await itinerariesAPI.getById(id)
      setItinerary(response.data)

      // Fetch related data
      if (response.data.destinationId) {
        try {
          const destResponse = await destinationsAPI.getById(response.data.destinationId)
          setDestination(destResponse.data)
        } catch (error) {
          console.error('Error fetching destination:', error)
        }
      }

      if (response.data.bookingId) {
        try {
          const bookingResponse = await bookingsAPI.getById(response.data.bookingId)
          setBooking(bookingResponse.data)
        } catch (error) {
          console.error('Error fetching booking:', error)
        }
      }
    } catch (error) {
      toast.error('Failed to fetch itinerary')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this itinerary?')) {
      try {
        await itinerariesAPI.delete(id)
        toast.success('Itinerary deleted successfully')
        navigate('/itineraries')
      } catch (error) {
        toast.error('Failed to delete itinerary')
        console.error('Error:', error)
      }
    }
  }

  const handleFormClose = () => {
    setShowForm(false)
    if (id && id !== 'new') {
      fetchItinerary()
    } else {
      navigate('/itineraries')
    }
  }

  if (id === 'new' || showForm) {
    return (
      <ItineraryForm
        itinerary={itinerary}
        onClose={handleFormClose}
      />
    )
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!itinerary) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">Itinerary not found</p>
        <Link to="/itineraries" className="text-primary-600 hover:underline mt-4 inline-block">
          Back to Itineraries
        </Link>
      </div>
    )
  }

  return (
    <div className="fade-in">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition"
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center space-x-2"
          >
            <FaEdit />
            <span>Edit</span>
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition flex items-center space-x-2"
          >
            <FaTrash />
            <span>Delete</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Day {itinerary.day} Itinerary</h1>
            <div className="flex items-center space-x-4 text-gray-600">
              <div className="flex items-center space-x-2">
                <FaClock className="text-primary-600" />
                <span>{new Date(itinerary.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              {destination && (
                <div className="flex items-center space-x-2">
                  <FaMapMarkerAlt className="text-primary-600" />
                  <Link
                    to={`/destinations/${destination.id}`}
                    className="text-primary-600 hover:text-primary-700 hover:underline"
                  >
                    {destination.name}
                  </Link>
                </div>
              )}
            </div>
          </div>

          {booking && (
            <div className="bg-primary-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Related Booking:</span> Booking #{booking.id} -{' '}
                {new Date(booking.checkIn).toLocaleDateString()} to{' '}
                {new Date(booking.checkOut).toLocaleDateString()}
              </p>
            </div>
          )}

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Activities</h2>
            {itinerary.activities && itinerary.activities.length > 0 ? (
              <div className="space-y-4">
                {itinerary.activities.map((activity, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-primary-500 pl-4 py-2 bg-gray-50 rounded-r-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary-600 text-white px-3 py-1 rounded-full font-semibold text-sm">
                        {activity.time}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{activity.activity}</h3>
                        {activity.location && (
                          <p className="text-sm text-gray-600 flex items-center space-x-1 mt-1">
                            <FaMapMarkerAlt className="text-primary-600" />
                            <span>{activity.location}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No activities scheduled for this day.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItineraryDetail


