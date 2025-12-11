import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaPlus, FaSearch } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { destinationsAPI } from '../services/api'
import DestinationCard from '../components/DestinationCard'
import DestinationForm from '../components/DestinationForm'

const Destinations = () => {
  const [destinations, setDestinations] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingDestination, setEditingDestination] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchDestinations()
  }, [])

  const fetchDestinations = async () => {
    try {
      const response = await destinationsAPI.getAll()
      setDestinations(response.data)
    } catch (error) {
      toast.error('Failed to fetch destinations')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this destination?')) {
      try {
        await destinationsAPI.delete(id)
        toast.success('Destination deleted successfully')
        fetchDestinations()
      } catch (error) {
        toast.error('Failed to delete destination')
        console.error('Error:', error)
      }
    }
  }

  const handleEdit = (destination) => {
    setEditingDestination(destination)
    setShowForm(true)
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingDestination(null)
    fetchDestinations()
  }

  const filteredDestinations = destinations.filter((dest) =>
    dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dest.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Destinations</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition flex items-center space-x-2"
        >
          <FaPlus />
          <span>Add Destination</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {showForm && (
        <DestinationForm
          destination={editingDestination}
          onClose={handleFormClose}
        />
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <>
          {filteredDestinations.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-600 text-lg">No destinations found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDestinations.map((destination) => (
                <div key={destination.id} className="relative group">
                  <DestinationCard destination={destination} />
                  <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                    <button
                      onClick={() => handleEdit(destination)}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(destination.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                    >
                      Delete
                    </button>
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

export default Destinations


