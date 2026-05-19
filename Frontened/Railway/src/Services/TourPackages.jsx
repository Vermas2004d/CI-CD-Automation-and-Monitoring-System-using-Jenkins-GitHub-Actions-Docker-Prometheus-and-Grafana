import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe2, MapPin, Calendar, IndianRupee, Star, ArrowRight, Compass, Sun, Mountain, Umbrella } from 'lucide-react';

const packages = [
  {
    id: 1,
    title: 'Golden Triangle',
    subtitle: 'Delhi • Agra • Jaipur',
    days: 5,
    price: 18999,
    rating: 4.8,
    reviews: 124,
    highlights: ['Taj Mahal Sunrise', 'Amber Fort', 'City Palace'],
    tag: 'Popular',
    category: 'Popular',
    gradient: 'from-orange-100 to-red-50'
  },
  {
    id: 2,
    title: 'Kerala Backwaters',
    subtitle: 'Munnar • Alleppey',
    days: 6,
    price: 21499,
    rating: 4.9,
    reviews: 89,
    highlights: ['Houseboat Stay', 'Tea Gardens', 'Kathakali Show'],
    tag: 'Nature',
    category: 'Nature',
    gradient: 'from-green-100 to-emerald-50'
  },
  {
    id: 3,
    title: 'Goa Beach Escape',
    subtitle: 'North & South Goa',
    days: 4,
    price: 15999,
    rating: 4.5,
    reviews: 210,
    highlights: ['Water Sports', 'Spice Plantation', 'Sunset Cruise'],
    tag: 'Relax',
    category: 'Relax',
    gradient: 'from-blue-100 to-cyan-50'
  },
  {
    id: 4,
    title: 'Himalayan Adventure',
    subtitle: 'Manali • Solang',
    days: 5,
    price: 19999,
    rating: 4.7,
    reviews: 156,
    highlights: ['Solang Valley', 'Paragliding', 'Local Culture'],
    tag: 'Adventure',
    category: 'Adventure',
    gradient: 'from-indigo-100 to-purple-50'
  },
  {
    id: 5,
    title: 'Royal Rajasthan',
    subtitle: 'Udaipur • Jodhpur',
    days: 7,
    price: 28999,
    rating: 4.8,
    reviews: 92,
    highlights: ['Lake Pichola', 'Mehrangarh Fort', 'Desert Safari'],
    tag: 'Heritage',
    category: 'Popular',
    gradient: 'from-amber-100 to-yellow-50'
  }
];

const categories = [
  { id: 'All', label: 'All Tours', icon: Compass },
  { id: 'Popular', label: 'Popular', icon: Star },
  { id: 'Nature', label: 'Nature', icon: Mountain },
  { id: 'Relax', label: 'Relax', icon: Umbrella },
  { id: 'Adventure', label: 'Adventure', icon: Sun },
];

const TourPackages = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();

  const filteredPackages = activeCategory === 'All' 
    ? packages 
    : packages.filter(p => p.category === activeCategory || p.tag === activeCategory);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-[#1C335C] flex items-center gap-3">
            <Globe2 className="w-8 h-8 text-[#008BD0]" />
            Tour Packages
          </h2>
          <p className="text-gray-600 mt-2 max-w-xl">
            Discover the beauty of India with our curated rail journeys. From mountains to beaches, experience it all with comfort and style.
          </p>
        </div>
        
        {/* Category Filter */}
        <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-[#1C335C] text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.map((pkg) => (
          <div 
            key={pkg.id} 
            className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            {/* Card Header with Gradient */}
            <div className={`h-32 bg-gradient-to-br ${pkg.gradient} p-6 relative`}>
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#1C335C] shadow-sm">
                {pkg.tag}
              </div>
              <div className="mt-2">
                <h3 className="text-xl font-bold text-[#1C335C] group-hover:text-[#008BD0] transition-colors">
                  {pkg.title}
                </h3>
                <p className="text-sm text-gray-600 font-medium">{pkg.subtitle}</p>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 flex-1 flex flex-col">
              {/* Stats Row */}
              <div className="flex items-center justify-between mb-6 text-sm">
                <div className="flex items-center gap-1.5 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg">
                  <Calendar className="w-4 h-4 text-[#008BD0]" />
                  <span className="font-medium">{pkg.days} Days</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-600">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-bold text-[#1C335C]">{pkg.rating}</span>
                  <span className="text-xs text-gray-400">({pkg.reviews})</span>
                </div>
              </div>

              {/* Highlights */}
              <div className="mb-6 flex-1">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Highlights</h4>
                <ul className="space-y-2">
                  {pkg.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#008BD0] shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price and Action */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-gray-500">Starting from</p>
                  <div className="flex items-center gap-0.5 text-[#1C335C]">
                    <IndianRupee className="w-4 h-4" />
                    <span className="text-xl font-bold">{pkg.price.toLocaleString()}</span>
                  </div>
                </div>
                <button 
                  onClick={() => navigate('/tours')}
                  className="flex items-center gap-2 bg-[#008BD0] hover:bg-[#0077b3] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-md hover:shadow-lg"
                >
                  View Details
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Package Banner */}
      <div className="bg-gradient-to-r from-[#1C335C] to-[#2a4d8a] rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
            <Compass className="w-8 h-8 text-blue-200" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Want a Custom Itinerary?</h3>
            <p className="text-blue-100 max-w-lg">
              Create your own dream journey. Our travel experts will help you build a personalized multi-city rail tour that fits your schedule.
            </p>
          </div>
        </div>
        <button className="whitespace-nowrap bg-white text-[#1C335C] px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-md">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default TourPackages;
