import { Link } from 'react-router-dom'
import { FaCheckCircle, FaClock } from 'react-icons/fa'

const PackageCard = ({ package: pkg }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 fade-in">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
        
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
          <FaClock />
          <span>{pkg.duration}</span>
        </div>
        
        <div className="mb-4">
          <h4 className="font-semibold text-gray-700 mb-2">Includes:</h4>
          <ul className="space-y-1">
            {pkg.includes?.map((item, index) => (
              <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                <FaCheckCircle className="text-green-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t">
          <span className="text-2xl font-bold text-primary-600">${pkg.price}</span>
          <Link
            to={`/packages/${pkg.id}`}
            className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition"
          >
            View Package
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PackageCard


