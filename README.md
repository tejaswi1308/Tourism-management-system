# Tourist Management System

A comprehensive full-stack web application for managing tourist destinations, travel packages, bookings, and itineraries. Built with React.js, Tailwind CSS, and JSON-Server.

## Features

- **Destinations Management**: Browse, view, create, update, and delete tourist destinations
- **Travel Packages**: Manage travel packages with detailed information and pricing
- **Booking System**: Create and manage travel bookings with check-in/check-out dates
- **Itinerary Management**: Plan and organize daily travel itineraries with activities
- **Full CRUD Operations**: Complete Create, Read, Update, Delete functionality for all entities
- **Responsive Design**: Modern, mobile-friendly UI built with Tailwind CSS
- **Real-time Updates**: Toast notifications for user actions

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/en/download/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download](https://git-scm.com/downloads)

## Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd tourism
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the JSON Server (Backend):**
   Open a new terminal window and run:
   ```bash
   npm run server
   ```
   This will start the JSON Server on `http://localhost:3000`

4. **Start the React Development Server:**
   In another terminal, run:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## Project Structure

```
tourism/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Navbar.jsx
│   │   ├── DestinationCard.jsx
│   │   ├── PackageCard.jsx
│   │   ├── DestinationForm.jsx
│   │   ├── PackageForm.jsx
│   │   └── ItineraryForm.jsx
│   ├── pages/               # Page components
│   │   ├── Home.jsx
│   │   ├── Destinations.jsx
│   │   ├── DestinationDetail.jsx
│   │   ├── Packages.jsx
│   │   ├── PackageDetail.jsx
│   │   ├── Bookings.jsx
│   │   ├── BookingForm.jsx
│   │   ├── Itineraries.jsx
│   │   └── ItineraryDetail.jsx
│   ├── services/            # API service layer
│   │   └── api.js
│   ├── App.jsx              # Main app component with routing
│   ├── main.jsx             # Entry point
│   ├── index.css            # Global styles with Tailwind
│   └── app.component.css    # App-specific styles
├── db.json                  # JSON-Server database
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── README.md                # This file
```

## Available Scripts

- `npm run dev` - Start the React development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build
- `npm run server` - Start the JSON-Server backend

## Technology Stack

- **Frontend Framework**: React.js 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Notifications**: React Toastify
- **Icons**: React Icons
- **Backend**: JSON-Server

## API Endpoints

The JSON-Server provides the following REST API endpoints:

### Destinations
- `GET /destinations` - Get all destinations
- `GET /destinations/:id` - Get destination by ID
- `POST /destinations` - Create new destination
- `PUT /destinations/:id` - Update destination
- `DELETE /destinations/:id` - Delete destination

### Packages
- `GET /packages` - Get all packages
- `GET /packages/:id` - Get package by ID
- `POST /packages` - Create new package
- `PUT /packages/:id` - Update package
- `DELETE /packages/:id` - Delete package

### Bookings
- `GET /bookings` - Get all bookings
- `GET /bookings/:id` - Get booking by ID
- `POST /bookings` - Create new booking
- `PUT /bookings/:id` - Update booking
- `DELETE /bookings/:id` - Delete booking

### Itineraries
- `GET /itineraries` - Get all itineraries
- `GET /itineraries/:id` - Get itinerary by ID
- `POST /itineraries` - Create new itinerary
- `PUT /itineraries/:id` - Update itinerary
- `DELETE /itineraries/:id` - Delete itinerary

## Usage Guide

### Managing Destinations
1. Navigate to "Destinations" from the navigation bar
2. Click "Add Destination" to create a new destination
3. Fill in the form with destination details
4. Click on a destination card to view details
5. Use Edit/Delete buttons to modify or remove destinations

### Managing Packages
1. Go to "Packages" section
2. Create packages linked to destinations
3. Set pricing, duration, and included services
4. View package details and manage bookings

### Creating Bookings
1. Navigate to "Bookings"
2. Click "New Booking"
3. Select a package, set travel dates, and number of travelers
4. Total price is calculated automatically
5. View and manage all bookings in the bookings list

### Managing Itineraries
1. Go to "Itineraries"
2. Create daily itineraries linked to bookings
3. Add activities with time slots and locations
4. View detailed day-by-day plans

## Features in Detail

- **Search Functionality**: Search destinations and packages by name
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Form Validation**: All forms include required field validation
- **Error Handling**: User-friendly error messages via toast notifications
- **Image Support**: Destinations can include image URLs
- **Status Management**: Bookings have status tracking (pending, confirmed, cancelled)

## Development

### Adding New Features

1. Create components in `src/components/`
2. Create pages in `src/pages/`
3. Add API methods in `src/services/api.js`
4. Update routes in `src/App.jsx`
5. Add data structure to `db.json` if needed

### Styling

The project uses Tailwind CSS for styling. Customize colors and themes in `tailwind.config.js`.

## Troubleshooting

### JSON Server not starting
- Ensure port 3000 is not in use
- Check that `db.json` exists in the root directory

### React app not loading
- Verify all dependencies are installed: `npm install`
- Check that port 5173 is available
- Clear browser cache if needed

### API requests failing
- Ensure JSON Server is running on port 3000
- Check browser console for CORS errors
- Verify API URL in `src/services/api.js`

## License

This project is created for educational purposes.

## Author

Tourist Management System - Full Stack React Application



