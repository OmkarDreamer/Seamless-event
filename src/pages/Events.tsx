import React, { useState } from 'react';
import { Calendar, MapPin, Users, Star, Clock, Filter, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const CATEGORIES = ['All', 'Tech', 'Design', 'Networking'];
const PRICE_FILTERS = ['All', 'Free', 'Premium'];

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  attendees: number;
  category: string;
  image: string;
  isPremium: boolean;
  price: number;
  rating: number;
  tags: string[];
}

const EVENTS: Event[] = [
  {
    id: 1,
    title: 'AI & Machine Learning Summit 2024',
    description: 'Join industry leaders for an immersive experience in AI and ML. Network with experts and learn about cutting-edge developments.',
    date: '2024-03-25',
    location: 'San Francisco, CA',
    attendees: 150,
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
    isPremium: true,
    price: 199,
    rating: 4.8,
    tags: ['AI', 'Machine Learning', 'Technology']
  },
  {
    id: 2,
    title: 'Startup Networking Mixer',
    description: 'Connect with fellow entrepreneurs and investors in a casual setting. Perfect for early-stage startups seeking mentorship.',
    date: '2024-03-28',
    location: 'New York, NY',
    attendees: 75,
    category: 'Networking',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b',
    isPremium: false,
    price: 0,
    rating: 4.5,
    tags: ['Networking', 'Startups', 'Business']
  },
  {
    id: 3,
    title: 'Web3 Development Workshop',
    description: 'Hands-on workshop covering blockchain, smart contracts, and decentralized applications. Build your first dApp!',
    date: '2024-04-05',
    location: 'Virtual',
    attendees: 200,
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
    isPremium: true,
    price: 299,
    rating: 4.9,
    tags: ['Web3', 'Blockchain', 'Development']
  }
];

function Events() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');

  const filteredEvents = EVENTS.filter(event => {
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesPrice = selectedPrice === 'All' || 
                        (selectedPrice === 'Free' && event.price === 0) ||
                        (selectedPrice === 'Premium' && event.price > 0);
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesPrice && matchesSearch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'price':
        return a.price - b.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div>
      {/* Hero Section */}
      <div className="relative text-center mb-12 py-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white mb-4">
            Discover Amazing Events
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Join the community and participate in exciting events
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/create"
              className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
            >
              Create Event
            </Link>
            <button
              className="px-6 py-3 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-400 transition-colors"
            >
              Browse Events
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="flex gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="date">Sort by Date</option>
              <option value="price">Sort by Price</option>
              <option value="rating">Sort by Rating</option>
            </select>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {PRICE_FILTERS.map(price => (
            <button
              key={price}
              onClick={() => setSelectedPrice(price)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedPrice === price
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {price}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(event => (
          <div key={event.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              {event.isPremium && (
                <span className="absolute top-4 right-4 px-3 py-1 bg-yellow-400 text-yellow-900 text-sm font-semibold rounded-full">
                  Premium
                </span>
              )}
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium text-gray-600">{event.rating}</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {event.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-col space-y-2 text-sm text-gray-500 mb-6">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(event.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {event.location}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  {event.attendees} attendees
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">
                  {event.price === 0 ? 'Free' : `$${event.price}`}
                </span>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    Learn More
                  </button>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;