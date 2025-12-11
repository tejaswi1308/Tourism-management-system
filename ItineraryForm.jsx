import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { FaTimes } from 'react-icons/fa'
import { itinerariesAPI, bookingsAPI, destinationsAPI } from '../services/api'

const ItineraryForm = ({ itinerary, onClose }) => {
  const [formData, setFormData] = useState({
    bookingId: '',
    destinationId: '',
    day: 1,
    date: '',
    activities: [{ time: '', activity: '', location: '' }],
  })
  const [bookings, setBookings] = useState([])
  const [destinations, setDestinations] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchBookings()
    fetchDestinations()
    if (itinerary) {
      setFormData({
        bookingId: itinerary.bookingId?.toString() || '',
        destinationId: itinerary.destinationId?.toString() || '',
        day: itinerary.day || 1,
        date: itinerary.date || '',
        activities: itinerary.activities && itinerary.activities.length > 0
          ? itinerary.activities
          : [{ time: '', activity: '', location: '' }],
      })
    }
  }, [itinerary])

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'day' ? parseInt(value) || 1 : value,
    }))
  }

  const handleActivityChange = (index, field, value) => {
    const newActivities = [...formData.activities]
    newActivities[index] = { ...newActivities[index], [field]: value }
    setFormData((prev) => ({ ...prev, activities: newActivities }))
  }

  const addActivity = () => {
    setFormData((prev) => ({
      ...prev,
      activities: [...prev.activities, { time: '', activity: '', location: '' }],
    }))
  }

  const removeActivity = (index) => {
    if (formData.activities.length > 1) {
      const newActivities = formData.activities.filter((_, i) => i !== index)
      setFormData((prev) => ({ ...prev, activities: newActivities }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const data = {
        ...formData,
        bookingId: parseInt(formData.bookingId),
        destinationId: parseInt(formData.destinationId),
        activities: formData.activities.filter(
          (act) => act.time && act.activity
        ),
      }

      if (itinerary) {
        await itinerariesAPI.update(itinerary.id, data)
        toast.success('Itinerary updated successfully')
      } else {
        await itinerariesAPI.create(data)
        toast.success('Itinerary created successfully')
      }
      onClose()
    } catch (error) {
      toast.error(itinerary ? 'Failed to update itinerary' : 'Failed to create itinerary')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            {itinerary ? 'Edit Itinerary' : 'Create New Itinerary'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Booking *
              </label>
              <select
                name="bookingId"
                value={formData.bookingId}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select a booking</option>
                {bookings.map((booking) => (
                  <option key={booking.id} value={booking.id}>
                    Booking #{booking.id}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Destination *
              </label>
              <select
                name="destinationId"
                value={formData.destinationId}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select a destination</option>
                {destinations.map((dest) => (
                  <option key={dest.id} value={dest.id}>
                    {dest.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Day Number *
              </label>
              <input
                type="number"
                name="day"
                value={formData.day}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Activities *
              </label>
              <button
                type="button"
                onClick={addActivity}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                + Add Activity
              </button>
            </div>
            <div className="space-y-3">
              {formData.activities.map((activity, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-3 gap-3 mb-2">
                    <input
                      type="time"
                      value={activity.time}
                      onChange={(e) => handleActivityChange(index, 'time', e.target.value)}
                      required
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Time"
                    />
                    <input
                      type="text"
                      value={activity.activity}
                      onChange={(e) => handleActivityChange(index, 'activity', e.target.value)}
                      required
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Activity name"
                    />
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={activity.location}
                        onChange={(e) => handleActivityChange(index, 'location', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Location"
                      />
                      {formData.activities.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeActivity(index)}
                          className="text-red-600 hover:text-red-800 px-2"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
            >
              {loading ? 'Saving...' : itinerary ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ItineraryForm


