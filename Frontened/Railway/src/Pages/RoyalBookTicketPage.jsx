import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, User, Calendar, MapPin, Phone, Mail, CreditCard, Armchair, Train, Clock, Plus, Trash2, Crown, Star } from 'lucide-react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import {initiatePayment} from '../utils/paymentUtils.js';

const RoyalBookTicketPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { trainId } = useParams();
  const { train } = state || {}; // date might not be passed if not selected in RoyalPage, we can default or ask

  const [date] = useState(new Date().toISOString().split('T')[0]); // Default to today or next availability

  // Initialize with one passenger
  const [passengers, setPassengers] = useState([
    { name: '', age: '', gender: '', berthPreference: '' }
  ]);

  const [contactInfo, setContactInfo] = useState({
      mobile: '',
      email: ''
  });

  const [loading, setLoading] = useState(false);

  // Handle changes for a specific passenger
  const handlePassengerChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = { ...updatedPassengers[index], [name]: value };
    setPassengers(updatedPassengers);
  };

  const handleContactChange = (e) => {
      const { name, value } = e.target;
      setContactInfo(prev => ({ ...prev, [name]: value }));
  };

  const addPassenger = () => {
      setPassengers([...passengers, { name: '', age: '', gender: '', berthPreference: '' }]);
  };

  const removePassenger = (index) => {
      if (passengers.length > 1) {
          const updatedPassengers = passengers.filter((_, i) => i !== index);
          setPassengers(updatedPassengers);
      }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const priceValue = parseInt((train?.price || "0").replace(/[^0-9]/g, '')) || 0;
  const totalAmount = priceValue * passengers.length;

  const bookingData = {
    trainName: train?.name,
    route: train?.route,
    duration: train?.duration,
    departureDate: new Date(date),
    package: {
      type: 'Luxury',
      price: priceValue,
      inclusions: ['All meals', 'Luxury cabin', 'Guided tours']
    },
    passengers: passengers.map(p => ({
      name: p.name,
      age: parseInt(p.age),
      gender: p.gender,
      cabinNumber: null
    })),
    contactEmail: contactInfo.email,
    contactPhone: contactInfo.mobile,
    totalAmount
  };

  const userDetails = {
    name: passengers[0].name,
    email: contactInfo.email,
    phone: contactInfo.mobile
  };

  await initiatePayment(
    'royal',
    bookingData,
    userDetails,
    (response) => {
      setLoading(false);
      navigate('/dashboard', { state: { section: 'history' } });
    },
    (error) => {
      setLoading(false);
    }
  );
};

  if (!train) {
    return (
        <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center text-[#fbbf24]">
            <Crown size={64} className="mb-4 animate-pulse" />
            <h2 className="text-3xl font-serif font-bold">Royal Detail Unavailable</h2>
            <button onClick={() => navigate('/royal-journeys')} className="mt-8 px-8 py-3 bg-[#fbbf24] text-[#0f172a] font-bold rounded-full hover:bg-[#fcd34d] transition-all">Back to Royal Journeys</button>
        </div>
    )
  }

  // Helper to parse price string like "₹3,50,000" to number
  const priceString = train?.price || "0";
  const priceValue = parseInt(priceString.replace(/[^0-9]/g, '')) || 0;
  const totalPrice = priceValue * passengers.length;

  return (
    <>
      <div className="min-h-screen bg-[#0f172a] py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#fbbf24] selection:text-[#0f172a]">
        
        {/* Background Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#fbbf24]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#fbbf24]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center space-x-4 mb-6">
                 <button onClick={() => navigate(-1)} className="p-3 rounded-full hover:bg-white/5 transition flex items-center justify-center border border-white/10 group">
                     <ArrowLeft className="w-6 h-6 text-[#fbbf24] group-hover:-translate-x-1 transition-transform" />
                 </button>
                 <div>
                    <h1 className="text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] via-[#fcd34d] to-[#fbbf24]">Reserve Your Suite</h1>
                    <p className="text-gray-400 mt-1">Complete your details to embark on a timeless voyage.</p>
                 </div>
            </div>

            <form onSubmit={handleSubmit} className="backdrop-blur-xl bg-white/5 rounded-3xl shadow-2xl overflow-hidden border border-white/10">
                <div className="p-8 space-y-10">
                    
                    {/* Passengers Loop */}
                    <div className="space-y-8">
                        {passengers.map((passenger, index) => (
                            <div key={index} className="bg-[#1e293b]/50 p-8 rounded-2xl border border-white/5 relative group animate-in slide-in-from-left duration-500 hover:border-[#fbbf24]/30 transition-all">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-xl font-bold text-[#fcd34d] flex items-center gap-3 font-serif">
                                        <span className="p-2.5 bg-[#fbbf24]/10 rounded-xl border border-[#fbbf24]/30"><User size={20} className="text-[#fbbf24]"/></span>
                                        Guest {index + 1}
                                    </h3>
                                    {index > 0 && (
                                        <button 
                                            type="button"
                                            onClick={() => removePassenger(index)}
                                            className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/10 rounded-full transition-colors"
                                            title="Remove Guest"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                                    {/* Name */}
                                    <div className="md:col-span-6 space-y-2">
                                        <label className="text-xs uppercase tracking-widest font-bold text-[#fbbf24]/80 ml-2">Full Name</label>
                                        <input 
                                            required
                                            type="text" 
                                            name="name"
                                            value={passenger.name}
                                            onChange={(e) => handlePassengerChange(index, e)}
                                            placeholder="Name as on Passport/ID"
                                            className="w-full px-5 py-4 rounded-xl border border-white/10 bg-[#0f172a]/50 text-white placeholder-gray-600 focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24] transition-all duration-300 outline-none"
                                        />
                                    </div>

                                    {/* Age */}
                                    <div className="md:col-span-3 space-y-2">
                                        <label className="text-xs uppercase tracking-widest font-bold text-[#fbbf24]/80 ml-2">Age</label>
                                        <input 
                                            required
                                            type="number" 
                                            name="age"
                                            value={passenger.age}
                                            onChange={(e) => handlePassengerChange(index, e)}
                                            placeholder="Age"
                                            className="w-full px-5 py-4 rounded-xl border border-white/10 bg-[#0f172a]/50 text-white placeholder-gray-600 focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24] transition-all duration-300 outline-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                    </div>

                                    {/* Gender */}
                                    <div className="md:col-span-3 space-y-2">
                                        <label className="text-xs uppercase tracking-widest font-bold text-[#fbbf24]/80 ml-2">Gender</label>
                                        <div className="relative">
                                            <select 
                                                required
                                                name="gender"
                                                value={passenger.gender}
                                                onChange={(e) => handlePassengerChange(index, e)}
                                                className="w-full px-5 py-4 rounded-xl border border-white/10 bg-[#0f172a]/50 text-white focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24] transition-all duration-300 outline-none appearance-none cursor-pointer"
                                            >
                                                <option value="" disabled className="bg-[#0f172a] text-gray-500">Select</option>
                                                <option value="Male" className="bg-[#0f172a]">Male</option>
                                                <option value="Female" className="bg-[#0f172a]">Female</option>
                                                <option value="Other" className="bg-[#0f172a]">Other</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
                                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Preference - Maybe Meal Preference for Royal? Keeping Berth for now but styled */}
                                    <div className="md:col-span-12 space-y-2">
                                        <label className="text-xs uppercase tracking-widest font-bold text-[#fbbf24]/80 ml-2">Cabin Preference</label>
                                        <div className="relative">
                                            <Armchair className="absolute left-5 top-4 text-gray-500 w-5 h-5 pointer-events-none"/>
                                            <select 
                                                name="berthPreference"
                                                value={passenger.berthPreference}
                                                onChange={(e) => handlePassengerChange(index, e)}
                                                className="w-full pl-12 pr-5 py-4 rounded-xl border border-white/10 bg-[#0f172a]/50 text-white focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24] transition-all duration-300 outline-none appearance-none cursor-pointer"
                                            >
                                                <option value="" className="bg-[#0f172a]">Standard Suite</option>
                                                <option value="Presidential Suite" className="bg-[#0f172a]">Presidential Suite</option>
                                                <option value="Twin Bed" className="bg-[#0f172a]">Twin Bed</option>
                                                <option value="Double Bed" className="bg-[#0f172a]">Double Bed</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
                                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Add Passenger Button */}
                    <button
                        type="button"
                        onClick={addPassenger}
                        className="w-full py-5 border border-dashed border-[#fbbf24]/30 text-[#fbbf24] rounded-xl font-bold uppercase tracking-widest hover:bg-[#fbbf24]/10 transition-colors flex items-center justify-center gap-2 group"
                    >
                        <Plus size={20} className="group-hover:rotate-90 transition-transform" /> Add Another Guest
                    </button>

                    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                    {/* Contact Section */}
                    <div>
                         <h3 className="text-xl font-bold text-[#fcd34d] mb-6 flex items-center gap-2 font-serif">
                            <span className="p-2 bg-[#fbbf24]/10 rounded-lg border border-[#fbbf24]/30"><Phone size={18} className="text-[#fbbf24]"/></span>
                             Contact Information
                        </h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest font-bold text-[#fbbf24]/80 ml-2">Mobile Number</label>
                                <div className="relative">
                                    <span className="absolute left-5 top-4 text-gray-500 font-medium">+91</span>
                                    <input 
                                        required
                                        type="tel" 
                                        name="mobile"
                                        value={contactInfo.mobile}
                                        onChange={handleContactChange}
                                        placeholder="Mobile Number"
                                        pattern="[0-9]{10}"
                                        maxLength="10"
                                        className="w-full pl-14 pr-4 py-4 rounded-xl border border-white/10 bg-[#0f172a]/50 text-white focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24] transition-all duration-300 outline-none"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest font-bold text-[#fbbf24]/80 ml-2">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-5 top-4 text-gray-500 w-5 h-5"/>
                                    <input 
                                        required
                                        type="email" 
                                        name="email"
                                        value={contactInfo.email}
                                        onChange={handleContactChange}
                                        placeholder="Email Address"
                                        className="w-full pl-14 pr-4 py-4 rounded-xl border border-white/10 bg-[#0f172a]/50 text-white focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24] transition-all duration-300 outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Form Footer */}
                <div className="bg-[#1e293b]/50 px-8 py-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-sm text-gray-500">Includes <span className="text-[#fbbf24]">Royalty Insurance</span> & Concierge Service</p>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-[#fbbf24] to-[#fcd34d] text-[#0f172a] font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? 'Processing...' : 'Confirm Royal Requests'}
                        {!loading && <Crown size={20} />}
                    </button>
                </div>
            </form>
          </div>

          {/* Right Column: Royal Summary */}
          <div className="lg:col-span-1">
             <div className="sticky top-24 space-y-8">
                 <div className="rounded-3xl overflow-hidden shadow-2xl border border-[#fbbf24]/20 bg-[#1e293b]/80 backdrop-blur-md">
                    <div className="relative h-48">
                        <img 
                            src={train?.image} 
                            alt={train?.name} 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b] via-transparent to-transparent"></div>
                        <div className="absolute bottom-4 left-6">
                            <span className="bg-[#fbbf24] text-[#0f172a] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">Luxury Class</span>
                            <h3 className="text-2xl font-serif font-bold text-white">{train?.name}</h3>
                        </div>
                    </div>
                    
                    <div className="p-8 space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-[#fbbf24]/10 p-2.5 rounded-lg border border-[#fbbf24]/20">
                                <Calendar size={20} className="text-[#fbbf24]" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Duration</p>
                                <p className="text-white font-medium">{train?.duration}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-[#fbbf24]/10 p-2.5 rounded-lg border border-[#fbbf24]/20">
                                <MapPin size={20} className="text-[#fbbf24]" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Route</p>
                                <p className="text-white text-sm leading-relaxed opacity-80">{train?.route}</p>
                            </div>
                        </div>

                        <div className="h-px bg-white/10 my-4"></div>

                        <div className="bg-[#0f172a] rounded-xl p-5 border border-[#fbbf24]/20">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-[#fbbf24] font-serif text-lg">Total Amount</span>
                            </div>
                            <div className='flex items-end gap-2'>
                                <span className="text-3xl font-bold text-white">₹ {(totalPrice).toLocaleString()}</span>
                                <span className="text-gray-500 text-sm mb-1 uppercase tracking-wider">/ {passengers.length} Guests</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-2">Inclusive of all taxes & royal amenities</p>
                        </div>
                    </div>
                 </div>

                 {/* Trust Badge */}
                 <div className="glass p-6 rounded-2xl border border-white/5 flex items-center gap-4 text-gray-400 text-sm">
                    <Star className="text-[#fbbf24] fill-[#fbbf24]" size={24} />
                    <p>Rated <span className="text-white font-bold">4.9/5</span> by over 50,000+ happy royal travelers.</p>
                 </div>
             </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default RoyalBookTicketPage;
