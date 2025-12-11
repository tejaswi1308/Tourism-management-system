import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Destinations from './pages/Destinations'
import DestinationDetail from './pages/DestinationDetail'
import Packages from './pages/Packages'
import PackageDetail from './pages/PackageDetail'
import Bookings from './pages/Bookings'
import BookingForm from './pages/BookingForm'
import Itineraries from './pages/Itineraries'
import ItineraryDetail from './pages/ItineraryDetail'
import './app.component.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/:id" element={<DestinationDetail />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/packages/:id" element={<PackageDetail />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/bookings/new" element={<BookingForm />} />
            <Route path="/bookings/:id" element={<BookingForm />} />
            <Route path="/itineraries" element={<Itineraries />} />
            <Route path="/itineraries/:id" element={<ItineraryDetail />} />
            <Route path="/itineraries/new" element={<ItineraryDetail />} />
          </Routes>
        </main>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  )
}

export default App

