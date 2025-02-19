import React from 'react';
import { Mail, Phone, MapPin, Calendar, Award, Star } from 'lucide-react';

function Profile() {
  const user = {
    name: 'Alex Johnson',
    role: 'Event Organizer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    coverImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Passionate event organizer with 5+ years of experience in tech conferences and networking events.',
    stats: {
      eventsOrganized: 25,
      attendees: 2500,
      averageRating: 4.8
    },
    badges: [
      { name: 'Top Organizer', icon: Star },
      { name: 'Community Leader', icon: Award }
    ],
    upcomingEvents: [
      {
        id: 1,
        title: 'Tech Summit 2024',
        date: '2024-04-15',
        attendees: 200
      },
      {
        id: 2,
        title: 'Networking Mixer',
        date: '2024-04-28',
        attendees: 50
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Cover Image */}
      <div className="relative h-64 w-full overflow-hidden rounded-xl">
        <img
          src={user.coverImage}
          alt="Profile cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Header */}
      <div className="relative -mt-16 px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-lg text-gray-600">{user.role}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Contact Info & Bio */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <Mail className="h-5 w-5 mr-3" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="h-5 w-5 mr-3" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-3" />
                <span>{user.location}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
            <p className="text-gray-600">{user.bio}</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Badges</h2>
            <div className="grid grid-cols-2 gap-4">
              {user.badges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 bg-indigo-50 rounded-lg"
                >
                  <badge.icon className="h-5 w-5 text-indigo-600 mr-2" />
                  <span className="text-sm font-medium text-indigo-900">
                    {badge.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center & Right Columns - Stats & Upcoming Events */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-indigo-600">
                  {user.stats.eventsOrganized}
                </p>
                <p className="text-sm text-gray-600">Events Organized</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-indigo-600">
                  {user.stats.attendees}
                </p>
                <p className="text-sm text-gray-600">Total Attendees</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-indigo-600">
                  {user.stats.averageRating}
                </p>
                <p className="text-sm text-gray-600">Average Rating</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Upcoming Events
            </h2>
            <div className="space-y-4">
              {user.upcomingEvents.map(event => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <Calendar className="h-5 w-5 text-indigo-600" />
                    <div>
                      <h3 className="font-medium text-gray-900">{event.title}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-5 w-5 mr-2" />
                    <span>{event.attendees}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;