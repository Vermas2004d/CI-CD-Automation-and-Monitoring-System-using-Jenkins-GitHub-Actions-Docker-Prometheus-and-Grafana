import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, User, Calendar, MapPin, Phone, Mail, CreditCard, Armchair, Train, Clock, Plus, Trash2, Briefcase } from 'lucide-react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import {initiatePayment} from '../utils/paymentUtils.js'

const BookTicketPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { trainNumber } = useParams();
  const { train, date } = state || {};

  // Initialize with one passenger
  const [passengers, setPassengers] = useState([
    { name: '', age: '', gender: '', berthPreference: '' }
  ]);

  const [contactInfo, setContactInfo] = useState({
      mobile: '',
      email: ''
  });

  const [bookingDetails, setBookingDetails] = useState({
    travelClass: '3A',
    quota: 'GN',
    isCoolieOpted: false,
    trolleyCount: 0
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

  const handleBookingDetailsChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails(prev => ({ ...prev, [name]: value }));
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

  const coolieCharges = bookingDetails.isCoolieOpted ? (bookingDetails.trolleyCount * 39) : 0;
  const baseFare = 1245 * passengers.length;
  const gst = Math.round(baseFare * 0.05);
  const totalAmount = baseFare + gst + coolieCharges;

    const getMaxSeats = (travelClass) => {
      switch(travelClass) {
        case '1A': return 24;
         case '2A': return 48;
         case '3A': return 72;
         case 'SL': return 72;
         case 'CC': return 72;
         case '2S': return 72;
         default: return 72;
      }
    };

    const generateSeatNumber = (travelClass) => {
       const max = getMaxSeats(travelClass);
       return Math.floor(Math.random() * max) + 1;
    }

  const bookingData = {
    from: train?.from_station_name || train?.from_std,
    to: train?.to_station_name || train?.to_std,
    date: new Date(date),
    trainNumber: train?.train_number,
    trainName: train?.train_name,
    class: bookingDetails.travelClass,
    quota: bookingDetails.quota,
    passengers: passengers.map(p => ({
      name: p.name,
      age: parseInt(p.age),
      gender: p.gender,
      berthPreference: p.berthPreference,
      seatNumber: generateSeatNumber(bookingDetails.travelClass)
    })),
    contactEmail: contactInfo.email,
    contactPhone: contactInfo.mobile,
    isCoolieOpted: bookingDetails.isCoolieOpted,
    trolleyCount: bookingDetails.trolleyCount,
    basefare: baseFare,
    gst: gst,
    totalAmount: totalAmount
  };

  const userDetails = {
    name: passengers[0].name,
    email: contactInfo.email,
    phone: contactInfo.mobile
  };

  await initiatePayment(
    'ticket',
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
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-gray-800">No Journey Details Found</h2>
            <button onClick={() => navigate('/')} className="mt-4 px-6 py-2 bg-[#008BD0] text-white rounded-lg">Go Home</button>
        </div>
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-4 mb-6">
                 <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-200 transition">
                     <ArrowLeft className="w-6 h-6 text-gray-700" />
                 </button>
                 <h1 className="text-3xl font-extrabold text-[#1C335C]">Passenger Details</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="p-8 space-y-8">
                    
                    {/* Class and Quota Selection */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-gray-100">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-2">Class</label>
                            <div className="relative">
                                <Armchair className="absolute left-4 top-3.5 text-gray-400 w-5 h-5 pointer-events-none"/>
                                <select 
                                    name="travelClass"
                                    value={bookingDetails.travelClass}
                                    onChange={handleBookingDetailsChange}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#008BD0] focus:ring-4 focus:ring-blue-50/50 transition-all duration-300 outline-none font-medium text-gray-800 appearance-none cursor-pointer"
                                >
                                    <option value="1A">AC First Class (1A)</option>
                                    <option value="2A">AC 2 Tier (2A)</option>
                                    <option value="3A">AC 3 Tier (3A)</option>
                                    <option value="SL">Sleeper (SL)</option>
                                    <option value="CC">AC Chair Car (CC)</option>
                                    <option value="2S">Second Sitting (2S)</option>
                                </select>
                                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-2">Quota</label>
                            <div className="relative">
                                <Briefcase className="absolute left-4 top-3.5 text-gray-400 w-5 h-5 pointer-events-none"/>
                                <select 
                                    name="quota"
                                    value={bookingDetails.quota}
                                    onChange={handleBookingDetailsChange}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#008BD0] focus:ring-4 focus:ring-blue-50/50 transition-all duration-300 outline-none font-medium text-gray-800 appearance-none cursor-pointer"
                                >
                                    <option value="GN">General (GN)</option>
                                    {/* <option value="TQ">Tatkal (TQ)</option> */}
                                    <option value="LD">Ladies (LD)</option>
                                    <option value="SS">Senior Citizen (SS)</option>
                                </select>
                                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                   {/* Coolie Option */}
                   <div className="p-6 border-b border-gray-100 bg-blue-50/30">
                       <div className="flex items-center justify-between">
                           <div className="flex items-center gap-3">
                               <div className="p-2.5 bg-yellow-100 text-yellow-600 rounded-xl">
                                   <Briefcase size={22} />
                               </div>
                               <div>
                                   <h3 className="font-bold text-gray-800">Add Coolie Service</h3>
                                   <p className="text-sm text-gray-500">Get help with your luggage (₹39/trolley)</p>
                               </div>
                           </div>
                          
                           <label className="relative inline-flex items-center cursor-pointer">
                               <input 
                                   type="checkbox" 
                                   className="sr-only peer"
                                   checked={bookingDetails.isCoolieOpted}
                                   onChange={(e) => setBookingDetails(prev => ({ ...prev, isCoolieOpted: e.target.checked, trolleyCount: e.target.checked ? 1 : 0 }))}
                               />
                               <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#008BD0]"></div>
                           </label>
                       </div>

                       {bookingDetails.isCoolieOpted && (
                           <div className="mt-4 flex items-center justify-between bg-white p-4 rounded-xl border border-blue-100 animate-in fade-in slide-in-from-top-2">
                               <span className="font-semibold text-gray-700">Number of Trolleys</span>
                               <div className="flex items-center gap-4">
                                   <button 
                                       type="button"
                                       onClick={() => setBookingDetails(prev => ({ ...prev, trolleyCount: Math.max(1, prev.trolleyCount - 1) }))}
                                       className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-gray-600"
                                   >
                                       -
                                   </button>
                                   <span className="font-bold text-lg w-4 text-center">{bookingDetails.trolleyCount}</span>
                                   <button 
                                       type="button"
                                       onClick={() => setBookingDetails(prev => ({ ...prev, trolleyCount: prev.trolleyCount + 1 }))}
                                       className="w-8 h-8 rounded-full bg-[#008BD0] text-white flex items-center justify-center hover:bg-[#0077b3] shadow-sm"
                                   >
                                       +
                                   </button>
                               </div>
                           </div>
                       )}
                   </div>
                    
                    {/* Passengers Loop */}
                    <div className="space-y-8">
                        {passengers.map((passenger, index) => (
                            <div key={index} className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 relative group animate-in slide-in-from-left duration-300">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                                        <span className="p-2.5 bg-blue-50 rounded-xl text-[#008BD0] shadow-sm"><User size={22}/></span>
                                        Passenger {index + 1}
                                    </h3>
                                    {index > 0 && (
                                        <button 
                                            type="button"
                                            onClick={() => removePassenger(index)}
                                            className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors"
                                            title="Remove Passenger"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                                    {/* Name - Takes larger width */}
                                    <div className="md:col-span-6 space-y-2">
                                        <label className="text-sm font-bold text-gray-700 ml-2">Full Name</label>
                                        <input 
                                            required
                                            type="text" 
                                            name="name"
                                            value={passenger.name}
                                            onChange={(e) => handlePassengerChange(index, e)}
                                            placeholder="Enter full name as on ID"
                                            className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-white focus:border-[#008BD0] focus:ring-4 focus:ring-blue-50/50 transition-all duration-300 outline-none font-medium text-gray-800 placeholder-gray-400"
                                        />
                                    </div>

                                    {/* Age - Compact width */}
                                    <div className="md:col-span-3 space-y-2">
                                        <label className="text-sm font-bold text-gray-700 ml-2">Age</label>
                                        <input 
                                            required
                                            type="number" 
                                            name="age"
                                            value={passenger.age}
                                            onChange={(e) => handlePassengerChange(index, e)}
                                            placeholder="Age"
                                            className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-white focus:border-[#008BD0] focus:ring-4 focus:ring-blue-50/50 transition-all duration-300 outline-none font-medium text-gray-800 appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                    </div>

                                    {/* Gender - Compact width */}
                                    <div className="md:col-span-3 space-y-2">
                                        <label className="text-sm font-bold text-gray-700 ml-2">Gender</label>
                                        <div className="relative">
                                            <select 
                                                required
                                                name="gender"
                                                value={passenger.gender}
                                                onChange={(e) => handlePassengerChange(index, e)}
                                                className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-white focus:border-[#008BD0] focus:ring-4 focus:ring-blue-50/50 transition-all duration-300 outline-none font-medium text-gray-800 appearance-none cursor-pointer"
                                            >
                                                <option value="" disabled>Select</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Transgender">Other</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="md:col-span-6 space-y-2">
                                        <label className="text-sm font-bold text-gray-700 ml-2">Berth Preference</label>
                                        <div className="relative">
                                            <Armchair className="absolute left-5 top-4 text-gray-400 w-5 h-5 pointer-events-none"/>
                                            <select 
                                                name="berthPreference"
                                                value={passenger.berthPreference}
                                                onChange={(e) => handlePassengerChange(index, e)}
                                                className="w-full pl-12 pr-5 py-3.5 rounded-xl border border-gray-200 bg-white focus:border-[#008BD0] focus:ring-4 focus:ring-blue-50/50 transition-all duration-300 outline-none font-medium text-gray-800 appearance-none cursor-pointer"
                                            >
                                                <option value="">No Preference</option>
                                                <option value="Lower">Lower</option>
                                                <option value="Middle">Middle</option>
                                                <option value="Upper">Upper</option>
                                                <option value="Side Lower">Side Lower</option>
                                                <option value="Side Upper">Side Upper</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
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
                        className="w-full py-4 border-2 border-dashed border-[#008BD0] text-[#008BD0] rounded-xl font-bold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                    >
                        <Plus size={20} /> Add Another Passenger
                    </button>

                    <div className="h-px bg-gray-100"></div>

                    {/* Contact Section */}
                    <div>
                         <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="p-2 bg-blue-50 rounded-lg text-[#008BD0]"><Phone size={20}/></span>
                             Contact Details
                        </h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-600">Mobile Number</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-3.5 text-gray-500 font-medium">+91</span>
                                    <input 
                                        required
                                        type="tel" 
                                        name="mobile"
                                        value={contactInfo.mobile}
                                        onChange={handleContactChange}
                                        placeholder="9876543210"
                                        pattern="[0-9]{10}"
                                        maxLength="10"
                                        className="w-full pl-14 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#008BD0] focus:ring-4 focus:ring-blue-50 transition duration-200 outline-none"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-600">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-3.5 text-gray-400 w-5 h-5"/>
                                    <input 
                                        required
                                        type="email" 
                                        name="email"
                                        value={contactInfo.email}
                                        onChange={handleContactChange}
                                        placeholder="john@example.com"
                                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#008BD0] focus:ring-4 focus:ring-blue-50 transition duration-200 outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Form Footer */}
                <div className="bg-gray-50 px-8 py-6 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-sm text-gray-500">By proceeding, you agree to our <a href="#" className="text-[#008BD0] hover:underline">Terms & Conditions</a></p>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="px-8 py-3 bg-[#1C335C] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-[#2a4a80] transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {loading && <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                        Proceed to Pay
                    </button>
                </div>
            </form>
          </div>

          {/* Right Column: Journey Summary */}
          <div className="lg:col-span-1">
             <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 sticky top-24">
                <div className="bg-[#1C335C] p-6 text-white bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <Train className="w-6 h-6 text-[#008BD0]" /> Journey Summary
                    </h3>
                    <div className="mt-4 pb-4 border-b border-white/10">
                        <h4 className="text-2xl font-bold">{train?.train_name}</h4>
                        <p className="opacity-80 font-mono text-sm">#{train?.train_number}</p>
                    </div>
                    <div className="flex justify-between items-center mt-4 text-sm font-medium">
                        <div className="text-center">
                            <span className="opacity-70 text-xs uppercase tracking-wider block mb-1">Departure</span>
                            <span className="text-lg">{train?.from_std}</span>
                        </div>
                         <ArrowLeft className="w-5 h-5 opacity-50 rotate-180" />
                        <div className="text-center">
                            <span className="opacity-70 text-xs uppercase tracking-wider block mb-1">Arrival</span>
                            <span className="text-lg">{train?.to_std || train?.to_sta}</span>
                        </div>
                    </div>
                </div>
                
                <div className="p-6 space-y-4">
                    <div className="flex items-start gap-4">
                        <div className="bg-blue-50 p-2 rounded-lg text-[#008BD0]">
                            <Calendar size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Date of Journey</p>
                            <p className="font-bold text-gray-800">{new Date(date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="bg-blue-50 p-2 rounded-lg text-[#008BD0]">
                             <Clock size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Duration</p>
                            <p className="font-bold text-gray-800">{train?.duration}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="bg-blue-50 p-2 rounded-lg text-[#008BD0]">
                             <User size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Passengers</p>
                            <p className="font-bold text-gray-800">{passengers.length}</p>
                        </div>
                    </div>

                    <div className="h-px bg-dashed bg-gray-200 my-2"></div>
                    
                    <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-yellow-800 font-semibold text-sm">Total Amount</span>
                            <span className="text-2xl font-bold text-[#1C335C]">₹ {1245 * passengers.length + (bookingDetails.isCoolieOpted ? bookingDetails.trolleyCount * 39 : 0)}</span>
                        </div>
                        <p className="text-xs text-yellow-600">Base fare + taxes + services included</p>
                    </div>

                    {bookingDetails.isCoolieOpted && (
                        <div className="bg-blue-50/50 rounded-xl p-3 border border-blue-100">
                             <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">Coolie Charges ({bookingDetails.trolleyCount} x ₹39)</span>
                                <span className="font-bold text-[#008BD0]">+ ₹{bookingDetails.trolleyCount * 39}</span>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center gap-2 justify-center text-xs text-gray-400 mt-2">
                        <CreditCard size={14} /> Secure Payment Processing
                    </div>
                </div>
             </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookTicketPage;

