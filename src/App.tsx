import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Calendar, Search, User, LogIn, PlusCircle } from 'lucide-react';
import Events from './pages/Events';
import CreateEvent from './pages/CreateEvent';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import ChatBot from './components/ChatBot';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
        {/* Navigation */}
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex items-center space-x-2">
                  <Calendar className="h-8 w-8 text-indigo-600" />
                  <span className="text-xl font-bold text-gray-900">10x Events</span>
                </Link>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <Link
                  to="/create"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <PlusCircle className="h-5 w-5 mr-2" />
                  Create Event
                </Link>

                {isAuthenticated ? (
                  <Link to="/profile" className="text-gray-700 hover:text-gray-900">
                    <User className="h-6 w-6" />
                  </Link>
                ) : (
                  <Link
                    to="/auth"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <LogIn className="h-5 w-5 mr-2" />
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Events />} />
            <Route path="/create" element={<CreateEvent />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/auth" element={<Auth setIsAuthenticated={setIsAuthenticated} />} />
          </Routes>
        </main>

        {/* ChatBot */}
        <ChatBot />
      </div>
    </Router>
  );
}

export default App;