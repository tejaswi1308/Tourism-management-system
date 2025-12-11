import { Link } from 'react-router-dom'
import { FaStar, FaMapMarkerAlt, FaClock } from 'react-icons/fa'

const DestinationCard = ({ destination }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 fade-in">
      <div className="relative h-48 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/800x400?text=Destination'
          }}
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full flex items-center space-x-1">
          <FaStar className="text-yellow-400" />
          <span className="text-sm font-semibold">{destination.rating}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{destination.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{destination.description}</p>
        
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <FaMapMarkerAlt />
            <span>{destination.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <FaClock />
            <span>{destination.duration}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary-600">${destination.price}</span>
          <Link
            to={`/destinations/${destination.id}`}
            className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DestinationCard


