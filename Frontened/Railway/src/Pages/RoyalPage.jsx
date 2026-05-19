import React, { useState, useEffect, useRef } from 'react';
import { Crown, Star, MapPin, Calendar, ChevronDown, ChevronUp, ArrowUp, Phone, Mail, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CrownImg from '../assets/Crown.png';
import CrownBanner from '../assets/CrownBanner.png';

const RoyalPage = () => {
  const navigate = useNavigate();
  const [expandedTrain, setExpandedTrain] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [visibleElements, setVisibleElements] = useState(new Set());
  
  const heroRef = useRef(null);
  const trainCardRefs = useRef([]);

  const luxuryTrains = [
    {
      id: 1,
      name: "Maharajas' Express",
      tagline: "The World's Leading Luxury Train",
      description: "Redefining royalty, luxury, and comfort, the Maharajas' Express takes you on a sojourn to the era of bygone stately splendour of princely states. The cabins are lavishly appointed with every modern amenity.",
      price: "₹40,000",
      duration: "6 Nights / 7 Days",
      route: "Delhi - Agra - Ranthambore - Jaipur - Bikaner - Jodhpur - Udaipur - Mumbai",
      image: "https://images.unsplash.com/photo-1595879171813-a83beb517451?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.9,
      amenities: ["Butler Service", "Gourmet Dining", "Off-train Excursions", "Wi-Fi", "Bar & Lounge", "Private Cabin", "Spa Services"],
      itinerary: [
        { day: 1, title: "Welcome to Delhi", desc: "Traditional welcome and boarding at Safdarjung Railway Station." },
        { day: 2, title: "Agra - The City of Taj", desc: "Visit the iconic Taj Mahal and enjoy a champagne breakfast." },
        { day: 3, title: "Ranthambore Safari", desc: "Early morning jungle safari followed by lunch on board." },
        { day: 4, title: "Pink City Jaipur", desc: "Explore Amber Fort and enjoy an elephant polo match." },
        { day: 5, title: "Bikaner Exploration", desc: "Visit the magnificent Junagarh Fort and experience local culture." },
        { day: 6, title: "Jodhpur - Blue City", desc: "Explore Mehrangarh Fort and enjoy traditional Rajasthani dinner." },
        { day: 7, title: "Udaipur to Mumbai", desc: "Boat ride on Lake Pichola before departing for Mumbai." }
      ]
    },
    {
      id: 2,
      name: "Palace on Wheels",
      tagline: "A Journey into the Past",
      description: "The Palace on Wheels was voted the 4th best luxury train in the world. It offers a magical journey through the royal land of dunes and palaces, recreating the etiquette of the royal past.",
      price: "₹80,000",
      duration: "7 Nights / 8 Days",
      route: "Delhi - Jaipur - Sawai Madhopur - Chittorgarh - Udaipur - Jaisalmer - Jodhpur - Bharatpur - Agra - Delhi",
      image: "https://plus.unsplash.com/premium_photo-1661901647310-4deafc6f29a5?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.8,
      amenities: ["Spa", "Personal Attendant", "Cultural Shows", "Library", "Medical Aid", "Fine Dining", "Bar"],
      itinerary: [
        { day: 1, title: "Delhi Departure", desc: "Ceremonial welcome and dinner on board." },
        { day: 2, title: "Jaipur Exploration", desc: "Visit Hawa Mahal and City Palace." },
        { day: 3, title: "Wild Ranthambore", desc: "Tiger spotting at Ranthambore National Park." },
        { day: 4, title: "Chittorgarh Fort", desc: "Explore the historic Chittorgarh Fort." },
        { day: 5, title: "Udaipur - City of Lakes", desc: "Boat ride on Lake Pichola and visit City Palace." },
        { day: 6, title: "Jaisalmer - Golden City", desc: "Camel safari in the Thar Desert and visit Jaisalmer Fort." },
        { day: 7, title: "Jodhpur & Bharatpur", desc: "Visit Mehrangarh Fort and Bharatpur Bird Sanctuary." },
        { day: 8, title: "Agra - Return to Delhi", desc: "Visit the magnificent Taj Mahal before returning to Delhi." }
      ]
    },
    {
      id: 3,
      name: "Deccan Odyssey",
      tagline: "The Blue Limousine",
      description: "Embark on a journey across the magnificent landscapes of Maharashtra. From the vineyards of Nashik to the beaches of Goa, experience the diversity of India in absolute luxury.",
      price: "₹60,000",
      duration: "7 Nights / 8 Days",
      route: "Mumbai - Vadodara - Udaipur - Jodhpur - Agra - Sawai Madhopur - Jaipur - Delhi",
      image: "https://plus.unsplash.com/premium_photo-1729937840264-288f999ebd70?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.7,
      amenities: ["Gym", "Conference Car", "Spa & Massage", "Bar", "Fine Dining", "Wi-Fi", "Entertainment"],
      itinerary: [
        { day: 1, title: "Mumbai Boarding", desc: "Welcome drink and settle into your cabin." },
        { day: 2, title: "Vadodara Heritage", desc: "Visit the Laxmi Vilas Palace." },
        { day: 3, title: "Lakes of Udaipur", desc: "Boat ride on Lake Pichola." },
        { day: 4, title: "Jodhpur - Blue City", desc: "Explore Mehrangarh Fort and local markets." },
        { day: 5, title: "Agra - The Taj", desc: "Visit the iconic Taj Mahal at sunrise." },
        { day: 6, title: "Ranthambore Safari", desc: "Wildlife safari in Ranthambore National Park." },
        { day: 7, title: "Pink City Jaipur", desc: "Visit Amber Fort and City Palace." },
        { day: 8, title: "Delhi Arrival", desc: "Arrive in Delhi and disembark." }
      ]
    },
    {
      id: 4,
      name: "Golden Chariot",
      tagline: "Pride of the South",
      description: "Connect with the history, culture, and heritage of South India. The Golden Chariot offers a glimpse into the architectural marvels of Hampi, the beaches of Goa, and the wildlife of Kabini.",
      price: "₹50,000",
      duration: "6 Nights / 7 Days",
      route: "Bangalore - Bandipur - Mysore - Hampi - Chikmagalur - Goa - Bangalore",
      image: "https://plus.unsplash.com/premium_photo-1729937840264-288f999ebd70?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.8,
      amenities: ["Ayurvedic Spa", "Gym", "Lounge Bar", "Business Center", "LCD TV", "Fine Dining", "Wi-Fi"],
      itinerary: [
        { day: 1, title: "Bangalore Start", desc: "Check-in at Yeshwantpur Railway Station." },
        { day: 2, title: "Mysore Palace", desc: "Visit the grand Mysore Palace." },
        { day: 3, title: "Hampi Ruins", desc: "Explore the UNESCO World Heritage site." },
        { day: 4, title: "Kabini Wildlife", desc: "Safari in Kabini Wildlife Sanctuary." },
        { day: 5, title: "Chikmagalur Coffee", desc: "Visit coffee plantations and enjoy local culture." },
        { day: 6, title: "Goa Beaches", desc: "Relax on pristine beaches and explore Portuguese heritage." },
        { day: 7, title: "Return to Bangalore", desc: "Arrive back in Bangalore with unforgettable memories." }
      ]
    }
  ];

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      setScrollProgress(scrolled);
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    trainCardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      trainCardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleExpand = (id) => {
    setExpandedTrain(expandedTrain === id ? null : id);
  };

  return (
    <div className="bg-[#0f172a] min-h-screen text-white font-sans selection:bg-[#fbbf24] selection:text-[#0f172a] overflow-x-hidden">
      
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#1e293b] z-[100]">
        <div 
          className="h-full bg-gradient-to-r from-[#fbbf24] via-[#fcd34d] to-[#fbbf24] transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-[#fbbf24] text-[#0f172a] p-4 rounded-full shadow-2xl hover:bg-[#d97706] transition-all transform hover:scale-110 animate-pulse-glow"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
      
      {/* Hero Section with Parallax */}
      <div 
        ref={heroRef}
        className="relative h-[90vh] flex items-center justify-center overflow-hidden"
        id="hero"
      >
        {/* Parallax Background */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 scale-110"
            style={{
              backgroundImage: 'url(https://plus.unsplash.com/premium_photo-1729937840264-288f999ebd70?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: `translateY(${scrollProgress * 0.3}px)`,
              transition: 'transform 0.1s ease-out',
              willChange: 'transform'
            }}
          />
          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/40 via-[#0f172a]/70 to-[#0f172a] animate-gradient-shift"></div>
          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-[#fbbf24]/30 rounded-full animate-float"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${20 + i * 10}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${6 + i * 2}s`
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] via-[#fcd34d] to-[#fbbf24] mb-8 drop-shadow-2xl tracking-tight animate-gradient-shift">
            Royal Journeys of India
          </h1>
          <p className="text-xl md:text-3xl text-gray-200 font-light tracking-wide mb-12 leading-relaxed">
            Experience the epitome of luxury, heritage, and elegance on wheels.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => scrollToSection('trains')}
              className="group relative glass bg-[#fbbf24]/10 backdrop-blur-md border-2 border-[#fbbf24] text-[#fbbf24] px-10 py-5 rounded-full font-bold text-lg outline-none transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(251,191,36,0.5)] overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Collections
              </span>
            </button>
            <button className="glass bg-white/5 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/10 transition-all transform hover:scale-105">
              Watch Video
            </button>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute top-115 left-1/2 transform -translate-x-1/2 animate-scroll-indicator">
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm text-gray-400 tracking-widest">SCROLL</span>
              <ChevronDown size={24} className="text-[#fbbf24]" />
            </div>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div id="introduction" className="max-w-7xl mx-auto px-4 py-20 text-center relative">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-[#fbbf24]/5 rounded-full blur-3xl -z-10"></div>
        <div className="flex justify-center mb-6 relative z-10">
          <img 
            src={CrownBanner} 
            alt="Royal Banner" 
            className="w-48 md:w-64 h-auto object-contain drop-shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:scale-105 transition-transform duration-700" 
          />
        </div>
        <h2 className="text-4xl md:text-5xl font-serif text-[#fbbf24] mb-8 tracking-wide">
          A Timeless Voyage
        </h2>
        <p className="text-gray-300 max-w-4xl mx-auto text-xl leading-relaxed mb-12 font-light">
          Step aboard our curated selection of luxury trains and traverse the diverse landscapes of India in regal style. 
          From the deserts of Rajasthan to the backwaters of Kerala, every journey is a chapter in a royal saga, 
          adorned with impeccable service, gourmet cuisine, and opulent interiors.
        </p>
        
        {/* Premium Divider */}
        <div className="relative w-48 h-1 mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#fbbf24] to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#fcd34d] to-transparent opacity-50 blur-sm"></div>
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          {[
            { number: '50K+', label: 'Happy Travelers' },
            { number: '4.8', label: 'Average Rating' },
            { number: '15+', label: 'Years Experience' },
            { number: '100%', label: 'Satisfaction' }
          ].map((stat, i) => (
            <div key={i} className="glass p-6 rounded-2xl border border-[#fbbf24]/20 hover:border-[#fbbf24]/40 transition-all">
              <div className="text-4xl font-bold text-[#fbbf24] mb-2">{stat.number}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Train Collections */}
      <div id="trains" className="max-w-7xl mx-auto px-4 pb-32">
        <div className="space-y-32 md:space-y-40">
          {luxuryTrains.map((train, index) => {
            const isVisible = visibleElements.has(`train-${train.id}`);
            
            return (
              <div 
                key={train.id}
                id={`train-${train.id}`}
                ref={(el) => (trainCardRefs.current[index] = el)}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-16 items-start transition-all duration-1000 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-20'
                }`}
              >
                {/* Image Side with 3D Effect */}
                <div className="w-full lg:w-1/2 relative group">
                  <div className="premium-card relative h-[450px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#fbbf24]/30">
                    <img 
                      src={train.image} 
                      alt={train.name}
                      loading="lazy"
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[2000ms] ease-out"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-70"></div>
                    
                    {/* Floating Badge with Pulse */}
                    <div className="absolute top-8 left-8 glass px-5 py-3 rounded-full flex items-center gap-3 border border-[#fbbf24]/40 animate-pulse-glow">
                      <Star size={18} className="text-[#fbbf24] fill-[#fbbf24]" />
                      <span className="text-[#fbbf24] font-bold text-lg">{train.rating}</span>
                      <span className="text-gray-300 text-sm">/ 5.0</span>
                    </div>
                    
                    {/* Hover Overlay with Info */}
                    <div className="absolute inset-0 glass bg-[#0f172a]/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="text-center px-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <p className="text-[#fbbf24] text-xl font-serif mb-2">{train.duration}</p>
                        <p className="text-white text-sm">{train.route.split(' - ').length} Destinations</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className={`absolute -bottom-8 ${index % 2 === 0 ? '-right-8' : '-left-8'} w-64 h-64 border-2 border-[#fbbf24]/10 rounded-full -z-10 hidden lg:block animate-pulse`}></div>
                  <div className={`absolute -top-4 ${index % 2 === 0 ? '-left-4' : '-right-4'} w-32 h-32 border border-[#fcd34d]/20 rounded-full -z-10 hidden lg:block`}></div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2 pt-8 lg:pt-12">
                  <div className="flex items-center gap-4 text-[#fbbf24] mb-6">
                    <div className="h-[2px] w-16 bg-gradient-to-r from-[#fbbf24] to-transparent"></div>
                    <span className="uppercase tracking-[0.2em] text-xs font-bold">{train.tagline}</span>
                    <div className="h-[2px] w-16 bg-gradient-to-l from-[#fbbf24] to-transparent"></div>
                  </div>
                  
                  <h3 className="text-5xl md:text-6xl font-serif text-white mb-8 leading-tight tracking-tight">
                    {train.name}
                  </h3>
                  
                  <p className="text-gray-300 text-lg leading-relaxed mb-10 font-light">
                    {train.description}
                  </p>

                  {/* Premium Info Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <div className="glass p-6 rounded-2xl border border-white/10 hover:border-[#fbbf24]/30 transition-all group/card">
                      <div className="flex items-center gap-3 text-[#fbbf24] mb-3">
                        <MapPin size={24} className="group-hover/card:scale-110 transition-transform" />
                        <span className="font-bold text-lg">Route</span>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed">{train.route}</p>
                    </div>
                    <div className="glass p-6 rounded-2xl border border-white/10 hover:border-[#fbbf24]/30 transition-all group/card">
                      <div className="flex items-center gap-3 text-[#fbbf24] mb-3">
                        <Calendar size={24} className="group-hover/card:scale-110 transition-transform" />
                        <span className="font-bold text-lg">Duration</span>
                      </div>
                      <p className="text-lg text-gray-200 font-semibold">{train.duration}</p>
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8 p-6 glass rounded-2xl border border-[#fbbf24]/20">
                    <div>
                      <p className="text-gray-400 text-sm mb-2 uppercase tracking-widest">Starting from</p>
                      <p className="text-4xl font-bold text-[#fbbf24]">{train.price}</p>
                      <p className="text-xs text-gray-500 mt-1">per person</p>
                    </div>
                    <button 
                      onClick={() => toggleExpand(train.id)}
                      className="flex items-center gap-3 text-white hover:text-[#fbbf24] transition-all group/btn px-6 py-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-[#fbbf24]/30"
                    >
                      <span className="font-semibold">{expandedTrain === train.id ? 'Hide Details' : 'View Itinerary'}</span>
                      {expandedTrain === train.id ? (
                        <ChevronUp size={20} className="transform group-hover/btn:-translate-y-1 transition-transform" />
                      ) : (
                        <ChevronDown size={20} className="transform group-hover/btn:translate-y-1 transition-transform" />
                      )}
                    </button>
                  </div>

                  {/* Expanded Details with Smooth Animation */}
                  <div 
                    className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      expandedTrain === train.id 
                        ? 'max-h-[1200px] opacity-100' 
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="glass rounded-3xl p-8 border border-white/10 space-y-8">
                      {/* Journey Highlights */}
                      <div>
                        <h4 className="text-2xl font-serif text-[#fbbf24] mb-6 flex items-center gap-3">
                          <div className="h-[2px] w-12 bg-[#fbbf24]"></div>
                          Journey Highlights
                        </h4>
                        <div className="space-y-6 relative border-l-2 border-[#fbbf24]/30 ml-4 pl-8">
                          {train.itinerary.map((item, i) => (
                            <div key={i} className="relative group/timeline">
                              <div className="absolute -left-[45px] top-2 w-6 h-6 rounded-full bg-[#fbbf24] border-4 border-[#0f172a] group-hover/timeline:scale-125 transition-transform shadow-lg shadow-[#fbbf24]/50"></div>
                              <div className="absolute -left-[52px] top-2 w-8 h-8 rounded-full bg-[#fbbf24]/20 animate-ping"></div>
                              <h5 className="text-white font-bold text-lg mb-2">
                                Day {item.day}: {item.title}
                              </h5>
                              <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Amenities */}
                      <div className="pt-8 border-t border-white/10">
                        <h4 className="text-xl font-serif text-[#fbbf24] mb-6">Onboard Amenities</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                          {train.amenities.map((amenity, i) => (
                            <span 
                              key={i} 
                              className="glass bg-[#0f172a]/50 text-gray-300 px-4 py-2 rounded-full text-sm border border-white/10 hover:border-[#fbbf24]/50 hover:text-[#fbbf24] transition-all text-center"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <button 
                        onClick={() => navigate(`/royal-booking/${train.id}`, { state: { train } })}
                        className="w-full bg-gradient-to-r from-[#fbbf24] to-[#fcd34d] text-[#0f172a] py-4 rounded-xl font-bold text-lg hover:from-[#d97706] hover:to-[#fbbf24] transition-all transform hover:scale-[1.02] shadow-lg shadow-[#fbbf24]/50"
                      >
                        Book This Journey
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Premium Footer CTA */}
      <div className="bg-gradient-to-b from-[#1e293b] via-[#0f172a] to-[#0f172a] py-32 text-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-20">
            <Crown size={500} className="absolute -right-32 -bottom-32 rotate-12 text-[#fbbf24]/10" />
            <Crown size={400} className="absolute -left-24 -top-24 -rotate-12 text-[#fcd34d]/10" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="inline-block mb-6">
            <img src={CrownImg} alt="Crown Logo" className='w-24 h-24'/>
          </div>
          <h2 className="text-5xl md:text-6xl font-serif text-white mb-8 tracking-tight">
            Ready for a Royal Experience?
          </h2>
          <p className="text-gray-300 mb-12 text-xl leading-relaxed max-w-2xl mx-auto">
            Book your journey today and create memories that will last a lifetime. 
            Our concierge team is available 24/7 to assist you.
          </p>
          
          {/* Contact Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="group relative glass bg-[#fbbf24]/10 backdrop-blur-md border-2 border-[#fbbf24] text-[#fbbf24] px-10 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(251,191,36,0.5)] overflow-hidden">
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Phone size={20} />
                Contact Concierge
              </span>
            </button>
            <button className="glass bg-white/5 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all transform hover:scale-105 flex items-center justify-center gap-2">
              <Mail size={20} />
              Download Brochure
            </button>
          </div>
          
          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="glass p-6 rounded-2xl border border-white/10">
              <Phone size={24} className="text-[#fbbf24] mb-3 mx-auto" />
              <p className="text-white font-semibold mb-1">Call Us</p>
              <p className="text-gray-400">+91 1800-ROYAL-01</p>
            </div>
            <div className="glass p-6 rounded-2xl border border-white/10">
              <Mail size={24} className="text-[#fbbf24] mb-3 mx-auto" />
              <p className="text-white font-semibold mb-1">Email Us</p>
              <p className="text-gray-400">royal@railsync.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoyalPage;