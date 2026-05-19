import React, { useState } from 'react';
import { 
  Calendar, MapPin, Star, Clock, Users, CheckCircle, 
  Info, Shield, Coffee, Wifi, ChevronLeft, ChevronRight,
  Train, Hotel, Utensils, Camera, ArrowRight, IndianRupee
} from 'lucide-react';

import goldenTriangleImg from '../assets/golden-triangle.png';
import keralaImg from '../assets/kerala.png';
import himalayasImg from '../assets/himalayas.png';
import RoyalRajsthan from '../assets/royal-rajasthan.jpg';

const packages = [
  {
    id: 1,
    title: 'Golden Triangle',
    subtitle: 'Delhi • Agra • Jaipur',
    description: 'Experience the rich history and culture of India with our Golden Triangle tour. Visit the majestic Taj Mahal, the historic Amber Fort, and the vibrant markets of Jaipur.',
    price: 18999,
    rating: 4.8,
    reviews: 124,
    days: 5,
    gradient: 'from-orange-100 to-red-50',
    imageColor: 'bg-orange-500',
    image: goldenTriangleImg,
    itinerary: [
      { day: 1, title: 'Arrival in Delhi', desc: 'Pickup from station, hotel check-in, evening leisure.' },
      { day: 2, title: 'Delhi Sightseeing', desc: 'Visit Red Fort, Qutub Minar, India Gate. Drive to Agra.' },
      { day: 3, title: 'Taj Mahal & Agra Fort', desc: 'Sunrise at Taj Mahal. Visit Agra Fort. Drive to Jaipur.' },
      { day: 4, title: 'Pink City Jaipur', desc: 'Amber Fort, Hawa Mahal, City Palace. Local market shopping.' },
      { day: 5, title: 'Departure', desc: 'Breakfast and transfer back to Delhi for departure.' }
    ],
    facilities: ['4-Star Hotel Stay', 'AC Train/Bus Travel', 'Breakfast & Dinner', 'English Speaking Guide', 'Monument Entry Tickets'],
    requirements: ['Valid ID Proof', 'Comfortable Walking Shoes', 'Camera', 'Sunscreen']
  },
  {
    id: 2,
    title: 'Kerala Backwaters',
    subtitle: 'Munnar • Alleppey',
    description: 'Immerse yourself in the tranquility of Gods Own Country. Cruise through the backwaters, explore tea plantations, and enjoy authentic Kerala cuisine.',
    price: 21499,
    rating: 4.9,
    reviews: 89,
    days: 6,
    gradient: 'from-green-100 to-emerald-50',
    imageColor: 'bg-green-600',
    image: keralaImg,
    itinerary: [
      { day: 1, title: 'Arrival in Kochi', desc: 'Transfer to Munnar. En route visit Cheeyappara Waterfalls.' },
      { day: 2, title: 'Munnar Exploration', desc: 'Tea Museum, Mattupetty Dam, Echo Point.' },
      { day: 3, title: 'Thekkady Wildlife', desc: 'Drive to Thekkady. Periyar Lake boat ride.' },
      { day: 4, title: 'Alleppey Houseboat', desc: 'Check-in to Houseboat. Cruise through backwaters.' },
      { day: 5, title: 'Cochin Sightseeing', desc: 'Chinese Fishing Nets, Jewish Synagogue.' },
      { day: 6, title: 'Departure', desc: 'Transfer to Cochin airport/station.' }
    ],
    facilities: ['Houseboat Stay', 'Resort Accommodation', 'All Meals on Houseboat', 'Ayurvedic Massage (Optional)', 'Private Cab'],
    requirements: ['Light Cotton Clothes', 'Mosquito Repellent', 'Umbrella/Raincoat', 'ID Proof']
  },
  {
    id: 3,
    title: 'Himalayan Adventure',
    subtitle: 'Manali • Solang',
    description: 'Get your adrenaline pumping with our Himalayan Adventure. From paragliding in Solang to exploring the Rohtang Pass, this is for the thrill-seekers.',
    price: 19999,
    rating: 4.7,
    reviews: 156,
    days: 5,
    gradient: 'from-indigo-100 to-purple-50',
    imageColor: 'bg-indigo-600',
    image: himalayasImg,
    itinerary: [
      { day: 1, title: 'Arrival in Manali', desc: 'Check-in to hotel. Evening walk at Mall Road.' },
      { day: 2, title: 'Solang Valley', desc: 'Adventure sports: Paragliding, Zorbing, ATV ride.' },
      { day: 3, title: 'Rohtang Pass', desc: 'Snow point visit (subject to permit). Atal Tunnel.' },
      { day: 4, title: 'Manali Local', desc: 'Hadimba Temple, Vashisht Hot Springs, Old Manali.' },
      { day: 5, title: 'Departure', desc: 'Transfer to bus stand for return journey.' }
    ],
    facilities: ['3-Star Hotel with View', 'Volvo Bus Tickets', 'Breakfast & Dinner', 'Bonfire Night', 'Adventure Activity Discount'],
    requirements: ['Heavy Woolens', 'Sunglasses', 'Personal Medicines', 'Good Grip Shoes']
  },
  {
    id: 4,
    title: 'Royal Rajasthan',
    subtitle: 'Udaipur • Jodhpur',
    description: 'Experience the royal grandeur of Rajasthan. Explore the City of Lakes, majestic forts, and the golden sands of the Thar Desert.',
    price: 28999,
    rating: 4.8,
    reviews: 92,
    days: 7,
    gradient: 'from-amber-100 to-yellow-50',
    imageColor: 'bg-amber-600',
    image: RoyalRajsthan,
    highlights: ['Lake Pichola', 'Mehrangarh Fort', 'Desert Safari'],
    tag: 'Heritage',
    category: 'Popular',
    itinerary: [
      { day: 1, title: 'Arrival in Udaipur', desc: 'Pickup and transfer to hotel. Evening boat ride on Lake Pichola.' },
      { day: 2, title: 'Udaipur Sightseeing', desc: 'Visit City Palace, Jag Mandir, and Saheliyon Ki Bari.' },
      { day: 3, title: 'Drive to Jodhpur', desc: 'Transfer to Jodhpur via Ranakpur Jain Temple.' },
      { day: 4, title: 'Jodhpur Exploration', desc: 'Visit the magnificent Mehrangarh Fort and Jaswant Thada.' },
      { day: 5, title: 'Desert Safari', desc: 'Experience camel safari and cultural evening in the desert.' },
      { day: 6, title: 'Blue City Tour', desc: 'Explore the blue houses and vibrant local markets.' },
      { day: 7, title: 'Departure', desc: 'Transfer to airport or railway station.' }
    ],
    facilities: ['Heritage Hotel Stay', 'Private AC Cab', 'Breakfast & Dinner', 'Camel Safari', 'Guide Services'],
    requirements: ['Sunscreen', 'Cotton Clothes', 'Sunglasses', 'Valid ID']
  }
];

import { useNavigate } from 'react-router-dom';

const TourMainPage = () => {
  const navigate = useNavigate();
  const [activePackageIndex, setActivePackageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('itinerary');

  const activePackage = packages[activePackageIndex];

  const nextPackage = () => {
    setActivePackageIndex((prev) => (prev + 1) % packages.length);
  };

  const prevPackage = () => {
    setActivePackageIndex((prev) => (prev - 1 + packages.length) % packages.length);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Hero Carousel Section */}
      <div className="relative bg-[#1C335C] text-white overflow-hidden min-h-[500px]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={activePackage.image} 
            alt={activePackage.title}
            className="w-full h-full object-cover transition-opacity duration-700 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 via-[#0f172a]/70 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-20">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            
            {/* Content */}
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium border border-white/20">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span>Top Rated Package</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                {activePackage.title}
              </h1>
              <p className="text-xl text-blue-100 font-light">
                {activePackage.subtitle}
              </p>
              <p className="text-gray-300 max-w-xl text-lg">
                {activePackage.description}
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                  <Clock className="w-5 h-5 text-blue-300" />
                  <span>{activePackage.days} Days</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                  <Users className="w-5 h-5 text-blue-300" />
                  <span>Group Size: 10-15</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span>{activePackage.rating} ({activePackage.reviews} reviews)</span>
                </div>
              </div>
            </div>

            {/* Carousel Controls */}
            <div className="flex md:flex-col gap-4">
              <button 
                onClick={prevPackage}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={nextPackage}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all hover:scale-110"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-30">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Details */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-gray-100 overflow-x-auto">
                {['itinerary', 'facilities', 'requirements'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-6 py-4 text-sm font-semibold capitalize whitespace-nowrap transition-colors ${
                      activeTab === tab 
                        ? 'text-[#008BD0] border-b-2 border-[#008BD0] bg-blue-50/50' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6 md:p-8 min-h-[400px]">
                {activeTab === 'itinerary' && (
                  <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-[#1C335C] mb-6">Tour Itinerary</h3>
                    <div className="relative border-l-2 border-blue-100 ml-3 space-y-8">
                      {activePackage.itinerary.map((item, idx) => (
                        <div key={idx} className="relative pl-8">
                          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#008BD0] border-4 border-white shadow-sm"></div>
                          <h4 className="text-lg font-bold text-[#1C335C] mb-1">Day {item.day}: {item.title}</h4>
                          <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'facilities' && (
                  <div>
                    <h3 className="text-2xl font-bold text-[#1C335C] mb-6">What's Included</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {activePackage.facilities.map((facility, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                          <div className="p-2 bg-green-100 rounded-full text-green-600">
                            <CheckCircle className="w-5 h-5" />
                          </div>
                          <span className="font-medium text-gray-700">{facility}</span>
                        </div>
                      ))}
                    </div>
                    
                    <h3 className="text-xl font-bold text-[#1C335C] mt-8 mb-4">Amenities</h3>
                    <div className="flex gap-6 text-gray-600">
                      <div className="flex flex-col items-center gap-2">
                        <div className="p-3 bg-blue-50 rounded-full text-[#008BD0]"><Wifi className="w-6 h-6"/></div>
                        <span className="text-xs">Wifi</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="p-3 bg-blue-50 rounded-full text-[#008BD0]"><Utensils className="w-6 h-6"/></div>
                        <span className="text-xs">Meals</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="p-3 bg-blue-50 rounded-full text-[#008BD0]"><Train className="w-6 h-6"/></div>
                        <span className="text-xs">Travel</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="p-3 bg-blue-50 rounded-full text-[#008BD0]"><Hotel className="w-6 h-6"/></div>
                        <span className="text-xs">Stay</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'requirements' && (
                  <div>
                    <h3 className="text-2xl font-bold text-[#1C335C] mb-6">Important Information</h3>
                    <div className="space-y-4">
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3">
                        <Info className="w-6 h-6 text-yellow-600 shrink-0" />
                        <p className="text-sm text-yellow-800">Please ensure you carry all original documents. Digital copies might not be accepted at some checkpoints.</p>
                      </div>
                      
                      <h4 className="font-semibold text-[#1C335C] mt-4">Things to Carry:</h4>
                      <ul className="grid md:grid-cols-2 gap-3">
                        {activePackage.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-gray-700">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#008BD0]"></div>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Booking Card */}
          <div className="lg:w-96 shrink-0">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24 border border-gray-100">
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-1">Starting from</p>
                <div className="flex items-baseline gap-1">
                  <IndianRupee className="w-6 h-6 text-[#1C335C]" />
                  <span className="text-4xl font-bold text-[#1C335C]">{activePackage.price.toLocaleString()}</span>
                  <span className="text-gray-500">/ person</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <label className="block text-xs text-gray-500 mb-1">Select Date</label>
                  <input type="date" className="w-full bg-transparent font-medium outline-none text-[#1C335C]" />
                </div>
              </div>

              <button 
                onClick={() => navigate(`/tour-booking/${activePackage.id}`, { state: { package: activePackage } })}
                className="w-full bg-[#008BD0] hover:bg-[#0077b3] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-200 transition-all hover:shadow-xl flex items-center justify-center gap-2"
              >
                Book Now
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Secure Payment & Instant Confirmation</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}; 
export default TourMainPage;
