import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, MapPin, Calendar, Users, Clock, Star, Train, Shield, 
  Zap, TrendingUp, ChevronRight, Search, Sparkles, Globe, Award, 
  CheckCircle, Facebook, Twitter, Instagram, Linkedin, Mail, Phone 
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom'; // ⬅️ ADD THIS
import Navbar from './Navbar';
import LoginPage from '../LoginPage';
import goldenTriangleImg from '../../assets/golden-triangle.png'; 
import keralaImg from '../../assets/kerala.png';
import himalayasImg from '../../assets/himalayas.png';
import HeroImage from '../../assets/HeroImage.png';   

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeDestination, setActiveDestination] = useState(0);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentFact, setCurrentFact] = useState(0);

  // Search form state
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [journeyDate, setJourneyDate] = useState('');

  const navigate = useNavigate();

  const facts = [
    { text: "Golden Triangle is the best package of the year", icon: Award },
    { text: "India’s vast rail network spans 67,000 km", icon: Train },
    { text: "Explore our premium tour packages", icon: Globe },
    { text: "Serving India since 1853", icon: Clock },
    { text: "24/7 Customer Support for your journey", icon: Phone }
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDestination((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % facts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Open login modal
  const openLogin = (e) => {
    if (e) e.preventDefault();
    setIsLoginOpen(true);
  };

  // Close login modal
  const closeLogin = () => {
    setIsLoginOpen(false);
  };

  // Search function
  const handleSearch = () => {
    if (!fromStation || !toStation || !journeyDate) {
      toast.error('Please fill From, To and Date stations to search.');
      return;
    }

    navigate('/search-trains', {
      state: {
        from: fromStation.trim(),
        to: toStation.trim(),
        date: journeyDate,
      },
    });
  };



  const destinations = [
    { 
      id: 1, 
      title: 'Golden Triangle Express', 
      route: 'Delhi → Agra → Jaipur',
      price: '₹18,999', 
      duration: '7 Days',
      rating: 4.8,
      travelers: '2.3K',
      gradient: 'from-amber-600 via-orange-500 to-red-500',
      image: goldenTriangleImg
    },
    { 
      id: 2, 
      title: 'Kerala Coast Journey', 
      route: 'Kochi → Alleppey → Kovalam',
      price: '₹21,499', 
      duration: '5 Days',
      rating: 4.9,
      travelers: '1.8K',
      gradient: 'from-emerald-600 via-teal-500 to-cyan-500',
      image: keralaImg
    },
    { 
      id: 3, 
      title: 'Himalayan Explorer', 
      route: 'Kalka → Shimla → Manali',
      price: '₹19,999', 
      duration: '6 Days',
      rating: 4.7,
      travelers: '2.1K',
      gradient: 'from-blue-600 via-indigo-500 to-purple-500',
      image: himalayasImg
    },
  ];

  const features = [
    { icon: Zap, title: 'Instant Booking', desc: 'Book tickets in under 60 seconds', color: 'text-yellow-600', bg: 'bg-yellow-50' },
    {icon: MapPin,title: 'Station Info',desc: 'Get detailed station information',color: 'text-[#008BD0]', bg: 'bg-blue-50' },
    { icon: Clock, title: 'Live Tracking', desc: 'Real-time train location updates', color: 'text-green-600', bg: 'bg-green-50' },
    { icon: Award, title: 'Premium Tours', desc: 'Curated packages by experts', color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const stats = [
    { label: 'Happy Travelers', value: '2M+', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Trains Tracked', value: '10K+', icon: Train, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Routes Covered', value: '500+', icon: Globe, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Customer Rating', value: '4.9★', icon: Star, color: 'text-amber-600', bg: 'bg-amber-100' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 overflow-hidden font-sans">
      {/* Navbar */}
      <Navbar/>

      {/* Hero Section */}
      <section className="relative pt-8 pb-12 px-6 bg-white">
        <div className="max-w-[1400px] mx-auto">
          {/* Header Content */}
          <div className="text-center mb-12 relative z-10">

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[#1C335C] tracking-tight">
              Journey Beyond
              <br />
              <span className="bg-gradient-to-r m-2 from-[#1C335C] via-[#008BD0] to-cyan-500 bg-clip-text text-transparent animate-gradient">
                Imagination
              </span>
            </h1>
            
            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Experience the romance of rail travel with cutting-edge technology. Book instantly, track live, and explore India like never before.
            </p>
          </div>

          {/* Main Hero Visual */}
          <div className="relative w-full h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl">
            {/* Background Image */}
            <img 
              src={HeroImage} 
              alt="Hero Background" 
              className="absolute inset-0 w-full h-full object-cover object-bottom"
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1C335C]/40 to-transparent"></div>

            {/* Floating Widgets */}
            
            {/* Top Left: Speed Widget (Moved & Resized) */}
            <div className="absolute top-12 left-12 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-white w-48 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xl font-bold">120 km/h</p>
                  <p className="text-[10px] text-white/70 leading-tight">Avg Speed of Express Train</p>
                </div>
              </div>
              <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-white rounded-full"></div>
              </div>
            </div>

            {/* Top Right: Status Widget */}
            <div className="absolute top-12 right-12 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl text-white w-64 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="h-12 mb-4 flex items-end gap-1">
                {[40, 70, 50, 90, 60, 80, 40].map((h, i) => (
                  <div key={i} className="flex-1 bg-white/50 rounded-t-sm" style={{height: `${h}%`}}></div>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <Train className="w-8 h-8" />
                <div>
                  <p className="text-2xl font-bold">On Time</p>
                  <p className="text-xs text-white/70">Average Delay: 0m</p>
                </div>
              </div>
            </div>

            {/* Bottom Left: Facts Carousel */}
            <div className="absolute bottom-12 left-12 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl text-white w-72 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/20 rounded-xl flex-shrink-0">
                  {React.createElement(facts[currentFact].icon, { className: "w-9 h-9 text-yellow-300" })}
                </div>
                <div>
                  <p className="text-xs text-white/60 mb-1 font-medium uppercase tracking-wider">Did you know?</p>
                  <p className="text-sm font-medium leading-relaxed min-h-[3rem] transition-all duration-500">
                    {facts[currentFact].text}
                  </p>
                  <div className="flex gap-1 mt-3">
                    {facts.map((_, i) => (
                      <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === currentFact ? 'w-6 bg-white' : 'w-1.5 bg-white/30'}`}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Right: Search/Action Bar */}
            <div className="absolute bottom-12 right-12 bg-white rounded-full p-2 pl-6 shadow-xl flex items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-4 text-gray-700">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                    From
                  </span>
                  <input
                    type="text"
                    placeholder="Station"
                    value={fromStation}
                    onChange={(e) => setFromStation(e.target.value)}
                    className="w-28 outline-none text-gray-900 font-semibold bg-transparent placeholder-gray-500"
                  />
                </div>
                <div className="w-px h-8 bg-gray-200"></div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                    To
                  </span>
                  <input
                    type="text"
                    placeholder="Station"
                    value={toStation}
                    onChange={(e) => setToStation(e.target.value)}
                    className="w-28 outline-none text-gray-900 font-semibold bg-transparent placeholder-gray-500"
                  />
                </div>
                <div className="w-px h-8 bg-gray-200"></div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Date
                  </span>
                  <input
                    type="date"
                    value={journeyDate}
                    onChange={(e) => setJourneyDate(e.target.value)}
                    className="w-36 outline-none text-gray-900 font-semibold bg-transparent"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={handleSearch}
                className="w-14 h-14 bg-[#1C335C] text-white rounded-full flex items-center justify-center hover:bg-[#008BD0] transition-colors"
              >
                <Search className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations - With Background Image */}
      <section className="py-24 px-6 relative overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={goldenTriangleImg} 
            alt="Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1C335C]/90 backdrop-blur-sm"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-black mb-3 text-white">Trending Rail Tours</h2>
              <p className="text-blue-200 text-lg">Curated journeys combining rail travel with unforgettable experiences</p>
            </div>
            <button 
              onClick={openLogin}
              className="hidden md:flex items-center gap-2 px-6 py-3 border border-white/20 rounded-xl text-white font-semibold hover:bg-white/10 transition-all"
            >
              View All Tours
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {destinations.map((dest, idx) => (
              <div 
                key={dest.id} 
                onClick={openLogin}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 shadow-2xl hover:-translate-y-2 ${
                  activeDestination === idx ? 'ring-4 ring-[#008BD0]' : ''
                }`}
                onMouseEnter={() => setActiveDestination(idx)}
              >
                <div className="aspect-[3/4] relative overflow-hidden">
                  {/* Background Image */}
                  <img 
                    src={dest.image} 
                    alt={dest.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium mb-4 border border-white/30">
                        <Train className="w-4 h-4" />
                        <span>{dest.duration}</span>
                      </div>
                    </div>

                    <div className="transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
                      <div className="flex items-center gap-2 mb-3">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-lg">{dest.rating}</span>
                        <span className="text-white/80 text-sm">({dest.travelers} travelers)</span>
                      </div>
                      
                      <h3 className="text-3xl font-black mb-2 leading-tight">{dest.title}</h3>
                      <p className="text-white/90 text-sm mb-6 flex items-center gap-2 font-medium">
                        <MapPin className="w-4 h-4" />
                        {dest.route}
                      </p>
                      
                      <div className="flex items-center justify-between pt-6 border-t border-white/20">
                        <div>
                          <p className="text-white/80 text-xs mb-1 font-medium uppercase tracking-wider">Starting from</p>
                          <p className="text-2xl font-bold">{dest.price}</p>
                        </div>
                        <button className="w-12 h-12 bg-white text-[#1C335C] rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us & Stats */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-16 text-[#1C335C]">Why RailSync?</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: CheckCircle, title: 'Guaranteed Bookings', desc: 'Instant confirmation with e-tickets delivered to your inbox' },
              { icon: Shield, title: 'Safe & Secure', desc: 'Bank-grade encryption for all your transactions' },
              { icon: TrendingUp, title: 'Best Prices', desc: 'Competitive fares with exclusive deals and offers' },
            ].map((item, idx) => (
              <div 
                key={idx} 
                onClick={openLogin}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-8 hover:shadow-lg transition-all hover:-translate-y-1 group cursor-pointer"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-8 h-8 text-[#008BD0]" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#1C335C]">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Integrated Stats Section */}
          <div className="bg-blue-50/50 rounded-3xl p-8 border border-blue-100">
            <div className="grid md:grid-cols-4 gap-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center group">
                  <div className={`inline-flex p-4 rounded-xl ${stat.bg} mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <h3 className="text-3xl font-black mb-1 text-[#1C335C]">
                    {stat.value}
                  </h3>
                  <p className="text-gray-500 font-medium text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1C335C] text-white pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <Train className="w-6 h-6 text-[#1C335C]" />
                </div>
                <span className="text-2xl font-bold">RailSync</span>
              </div>
              <p className="text-blue-200 mb-8 leading-relaxed">Your trusted companion for seamless railway journeys across India. Experience the future of travel.</p>
              <div className="flex gap-3">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 bg-blue-800/50 rounded-lg flex items-center justify-center hover:bg-[#008BD0] transition-colors">
                    <Icon className="w-5 h-5 text-white" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-4 text-blue-200">
                <li><a href="#" onClick={openLogin} className="hover:text-white transition-colors flex items-center gap-2 cursor-pointer"><ChevronRight className="w-4 h-4" />Dashboard</a></li>
                <li><a href="#" onClick={openLogin} className="hover:text-white transition-colors flex items-center gap-2 cursor-pointer"><ChevronRight className="w-4 h-4" />Live Train</a></li>
                <li><a href="#" onClick={openLogin} className="hover:text-white transition-colors flex items-center gap-2 cursor-pointer"><ChevronRight className="w-4 h-4" /> PNR Status</a></li>
                <li><a href="#" onClick={openLogin} className="hover:text-white transition-colors flex items-center gap-2 cursor-pointer"><ChevronRight className="w-4 h-4" /> Tour Packages</a></li>
                <li><a href="#" onClick={openLogin} className="hover:text-white transition-colors flex items-center gap-2 cursor-pointer"><ChevronRight className="w-4 h-4" /> About Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Support</h4>
              <ul className="space-y-4 text-blue-200">
                <li><a href="#" onClick={openLogin} className="hover:text-white transition-colors flex items-center gap-2 cursor-pointer"><ChevronRight className="w-4 h-4" />RailBot</a></li>
                <li><a href="#" onClick={openLogin} className="hover:text-white transition-colors flex items-center gap-2 cursor-pointer"><ChevronRight className="w-4 h-4" /> Help Center</a></li>
                <li><a href="#" onClick={openLogin} className="hover:text-white transition-colors flex items-center gap-2 cursor-pointer"><ChevronRight className="w-4 h-4" /> Terms of Service</a></li>
                <li><a href="#" onClick={openLogin} className="hover:text-white transition-colors flex items-center gap-2 cursor-pointer"><ChevronRight className="w-4 h-4" /> Privacy Policy</a></li>
                <li><a href="#" onClick={openLogin} className="hover:text-white transition-colors flex items-center gap-2 cursor-pointer"><ChevronRight className="w-4 h-4" /> Refund Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Contact</h4>
              <ul className="space-y-4 text-blue-200">
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#008BD0] mt-1" />
                  <span>support@railsync.com<br/><span className="text-sm opacity-70">Reply within 2 hours</span></span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#008BD0] mt-1" />
                  <span>+91 1800-123-4567<br/><span className="text-sm opacity-70">Mon-Sat, 9AM-6PM</span></span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-blue-800 pt-8 text-center text-blue-300">
            <p>© 2025 RailSync. All rights reserved. Made with ❤️ for travelers.</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <LoginPage isOpen={isLoginOpen} onClose={closeLogin} />

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Index;