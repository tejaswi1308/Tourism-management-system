import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { FaTimes } from 'react-icons/fa'
import { packagesAPI, destinationsAPI } from '../services/api'

const PackageForm = ({ package: pkg, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    destinationId: '',
    price: 0,
    duration: '',
    includes: '',
    available: true,
  })
  const [destinations, setDestinations] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchDestinations()
    if (pkg) {
      setFormData({
        name: pkg.name || '',
        description: pkg.description || '',
        destinationId: pkg.destinationId || '',
        price: pkg.price || 0,
        duration: pkg.duration || '',
        includes: pkg.includes ? pkg.includes.join(', ') : '',
        available: pkg.available !== undefined ? pkg.available : true,
      })
    }
  }, [pkg])

  const fetchDestinations = async () => {
    try {
      const response = await destinationsAPI.getAll()
      setDestinations(response.data)
    } catch (error) {
      console.error('Error fetching destinations:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : name === 'price' ? parseFloat(value) || 0 : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const data = {
        ...formData,
        destinationId: parseInt(formData.destinationId),
        includes: formData.includes.split(',').map((i) => i.trim()).filter((i) => i),
      }

      if (pkg) {
        await packagesAPI.update(pkg.id, data)
        toast.success('Package updated successfully')
      } else {
        await packagesAPI.create(data)
        toast.success('Package created successfully')
      }
      onClose()
    } catch (error) {
      toast.error(pkg ? 'Failed to update package' : 'Failed to create package')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            {pkg ? 'Edit Package' : 'Add New Package'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price ($) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration *
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
                placeholder="e.g., 5 days"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Includes (comma-separated) *
            </label>
            <input
              type="text"
              name="includes"
              value={formData.includes}
              onChange={handleChange}
              required
              placeholder="Hotel, Breakfast, Tour, etc."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <label className="ml-2 text-sm font-medium text-gray-700">
              Available for booking
            </label>
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
              {loading ? 'Saving...' : pkg ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PackageForm


