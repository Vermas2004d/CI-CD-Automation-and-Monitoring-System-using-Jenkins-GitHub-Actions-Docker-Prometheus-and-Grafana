import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, User, Calendar, MapPin, Phone, Mail, CheckCircle, Shield, Backpack, Plus, Trash2, Star, IndianRupee } from 'lucide-react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { initiatePayment } from '../utils/paymentUtils';

const TourBookTicketPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { packageId } = useParams();
  const tourPackage = state?.package;

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); 

  // Initialize with one guest
  const [passengers, setPassengers] = useState([
    { name: '', age: '', gender: '', dietaryPreference: '' }
  ]);

  const [contactInfo, setContactInfo] = useState({
      mobile: '',
      email: ''
  });

  const [loading, setLoading] = useState(false);

  // Handle changes for a specific guest
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
      setPassengers([...passengers, { name: '', age: '', gender: '', dietaryPreference: '' }]);
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

  const discountAmount = passengers.length > 2 ? 1958 : 0;
  const coolieCharges = bookingDetails.isCoolieOpted ? (bookingDetails.trolleyCount * 39) : 0;
  const totalAmount = Math.max(0, (tourPackage.price * passengers.length) - discountAmount) + coolieCharges;

  const bookingData = {
    tourPackage: {
      name: tourPackage.title,
      destination: tourPackage.title,
      duration: `${tourPackage.days} Days`,
      price: tourPackage.price
    },
    travelDate: new Date(date),
    numberOfTravelers: passengers.length,
    travelers: passengers.map(p => ({
      name: p.name,
      age: parseInt(p.age),
      gender: p.gender
    })),
    contactEmail: contactInfo.email,
    contactPhone: contactInfo.mobile,
    isCoolieOpted: bookingDetails.isCoolieOpted,
    trolleyCount: bookingDetails.trolleyCount,
    totalAmount
  };

  const userDetails = {
    name: passengers[0].name,
    email: contactInfo.email,
    phone: contactInfo.mobile
  };

  await initiatePayment(
    'tour',
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

  if (!tourPackage) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-[#1C335C]">
            <Backpack size={64} className="mb-4 text-[#008BD0]" />
            <h2 className="text-3xl font-bold">Package Details Unavailable</h2>
            <button onClick={() => navigate('/tours')} className="mt-8 px-8 py-3 bg-[#008BD0] text-white font-bold rounded-xl hover:bg-[#0077b3] transition-all">Back to Tours</button>
        </div>
    )
  }

  const discountAmount = passengers.length > 2 ? 1958 : 0;
  const coolieCharges = bookingDetails.isCoolieOpted ? (bookingDetails.trolleyCount * 39) : 0;
  const totalPrice = Math.max(0, (tourPackage.price || 0) * passengers.length - discountAmount) + coolieCharges;

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#008BD0] selection:text-white">
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-4 mb-2">
                 <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-200 transition flex items-center justify-center text-[#1C335C] group">
                     <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                 </button>
                 <div>
                    <h1 className="text-3xl font-bold text-[#1C335C]">Confirm Your Adventure</h1>
                    <p className="text-gray-500">Fill in the details to book your spot for {tourPackage.title}.</p>
                 </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-8 space-y-8">
                    
                    {/* Date Selection */}
                    <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
                        <label className="text-xs uppercase tracking-widest font-bold text-[#008BD0] mb-2 block">Travel Date</label>
                        <input 
                            type="date" 
                            required
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full bg-white px-4 py-3 rounded-lg border border-gray-200 text-[#1C335C] font-medium outline-none focus:border-[#008BD0] focus:ring-1 focus:ring-[#008BD0]"
                        />
                    </div>

                    {/* Guests Loop */}
                    <div className="space-y-6">
                        {passengers.map((passenger, index) => (
                            <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-200 relative group animate-in slide-in-from-left duration-500 hover:border-[#008BD0]/30 transition-all">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-bold text-[#1C335C] flex items-center gap-3">
                                        <span className="p-2 bg-white rounded-lg border border-gray-200 text-[#008BD0] shadow-sm"><User size={18} /></span>
                                        Guest {index + 1}
                                    </h3>
                                    {index > 0 && (
                                        <button 
                                            type="button"
                                            onClick={() => removePassenger(index)}
                                            className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-colors"
                                            title="Remove Guest"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                                    {/* Name */}
                                    <div className="md:col-span-6 space-y-1.5">
                                        <label className="text-xs font-bold text-gray-500 ml-1">Full Name</label>
                                        <input 
                                            required
                                            type="text" 
                                            name="name"
                                            value={passenger.name}
                                            onChange={(e) => handlePassengerChange(index, e)}
                                            placeholder="John Doe"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-[#1C335C] focus:border-[#008BD0] focus:ring-1 focus:ring-[#008BD0] transition-all outline-none"
                                        />
                                    </div>

                                    {/* Age */}
                                    <div className="md:col-span-3 space-y-1.5">
                                        <label className="text-xs font-bold text-gray-500 ml-1">Age</label>
                                        <input 
                                            required
                                            type="number" 
                                            name="age"
                                            value={passenger.age}
                                            onChange={(e) => handlePassengerChange(index, e)}
                                            placeholder="Age"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-[#1C335C] focus:border-[#008BD0] focus:ring-1 focus:ring-[#008BD0] transition-all outline-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                    </div>

                                    {/* Gender */}
                                    <div className="md:col-span-3 space-y-1.5">
                                        <label className="text-xs font-bold text-gray-500 ml-1">Gender</label>
                                        <div className="relative">
                                            <select 
                                                required
                                                name="gender"
                                                value={passenger.gender}
                                                onChange={(e) => handlePassengerChange(index, e)}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-[#1C335C] focus:border-[#008BD0] focus:ring-1 focus:ring-[#008BD0] transition-all outline-none appearance-none cursor-pointer"
                                            >
                                                <option value="" disabled>Select</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Preference */}
                                    <div className="md:col-span-12 space-y-1.5">
                                        <label className="text-xs font-bold text-gray-500 ml-1">Dietary Preference (Optional)</label>
                                        <select 
                                            name="dietaryPreference"
                                            value={passenger.dietaryPreference}
                                            onChange={(e) => handlePassengerChange(index, e)}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-[#1C335C] focus:border-[#008BD0] focus:ring-1 focus:ring-[#008BD0] transition-all outline-none appearance-none cursor-pointer"
                                        >
                                            <option value="">No Preference</option>
                                            <option value="Vegetarian">Vegetarian</option>
                                            <option value="Non-Vegetarian">Non-Vegetarian</option>
                                            <option value="Vegan">Vegan</option>
                                            <option value="Jain">Jain</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Add Guest Button */}
                    <button
                        type="button"
                        onClick={addPassenger}
                        className="w-full py-4 border-2 border-dashed border-gray-300 text-gray-500 rounded-xl font-bold hover:border-[#008BD0] hover:text-[#008BD0] hover:bg-blue-50 transition-all flex items-center justify-center gap-2 group"
                    >
                        <Plus size={20} className="group-hover:rotate-90 transition-transform" /> Add Another Guest
                    </button>

                    <div className="h-px bg-gray-100"></div>

                    {/* Contact Section */}
                    <div>
                         <h3 className="text-lg font-bold text-[#1C335C] mb-4 flex items-center gap-2">
                            <span className="p-2 bg-blue-50 rounded-lg text-[#008BD0]"><Phone size={18}/></span>
                             Contact Information
                        </h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-500 ml-1">Mobile Number</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-3.5 text-gray-400 font-medium">+91</span>
                                    <input 
                                        required
                                        type="tel" 
                                        name="mobile"
                                        value={contactInfo.mobile}
                                        onChange={handleContactChange}
                                        placeholder="Mobile Number"
                                        maxLength="10"
                                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 bg-white text-[#1C335C] focus:border-[#008BD0] focus:ring-1 focus:ring-[#008BD0] transition-all outline-none"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-500 ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-3.5 text-gray-400 w-5 h-5"/>
                                    <input 
                                        required
                                        type="email" 
                                        name="email"
                                        value={contactInfo.email}
                                        onChange={handleContactChange}
                                        placeholder="Email Address"
                                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 bg-white text-[#1C335C] focus:border-[#008BD0] focus:ring-1 focus:ring-[#008BD0] transition-all outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>


                   {/* Coolie Option */}
                   <div className="bg-blue-50/30 p-6 border-b border-t border-gray-100">
                       <div className="flex items-center justify-between">
                           <div className="flex items-center gap-3">
                               <div className="p-2.5 bg-yellow-100 text-yellow-600 rounded-xl">
                                   <Backpack size={22} />
                               </div>
                               <div>
                                   <h3 className="font-bold text-[#1C335C]">Add Coolie Service</h3>
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
                </div>
                
                {/* Form Footer */}
                <div className="bg-gray-50 px-8 py-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                        <Shield size={16} className="text-green-500"/>
                        Secure Booking with <span className="text-[#008BD0] font-bold">RailSync Protect</span>
                    </p>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full md:w-auto px-8 py-4 bg-[#008BD0] text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? 'Processing...' : 'Confirm Booking'}
                        {!loading && <CheckCircle size={20} />}
                    </button>
                </div>
            </form>
          </div>

          {/* Right Column: Tour Summary */}
          <div className="lg:col-span-1">
             <div className="sticky top-24 space-y-6">
                 {/* Package Card */}
                 <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="relative h-48">
                        <img 
                            src={tourPackage.image} 
                            alt={tourPackage.title} 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#1C335C] flex items-center gap-1">
                            <Star size={12} className="text-yellow-400 fill-yellow-400"/> {tourPackage.rating}
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1C335C]/80 to-transparent p-4 pt-10">
                            <h3 className="text-2xl font-bold text-white">{tourPackage.title}</h3>
                            <p className="text-white/80 text-sm">{tourPackage.subtitle}</p>
                        </div>
                    </div>
                    
                    <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between text-sm text-gray-600 pb-4 border-b border-gray-100">
                             <div className="flex items-center gap-2">
                                 <Calendar size={16} className="text-[#008BD0]"/> {tourPackage.days} Days
                             </div>
                             <div className="flex items-center gap-2">
                                 <MapPin size={16} className="text-[#008BD0]"/> {tourPackage.title}
                             </div>
                        </div>

                        {/* Price Breakdown */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-gray-600">
                                <span>Base Price ({passengers.length} x ₹{tourPackage.price.toLocaleString()})</span>
                                <span>₹{(tourPackage.price * passengers.length).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-green-600 text-sm">
                                <span>Group Discount</span>
                                <span>- ₹{discountAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-gray-600 text-sm">
                                <span>Taxes & Fees</span>
                                  <span>Included</span>
                            </div>
                            {bookingDetails.isCoolieOpted && (
                                <div className="flex justify-between text-[#008BD0] text-sm font-medium">
                                    <span>Coolie Charges ({bookingDetails.trolleyCount} x ₹39)</span>
                                    <span>+ ₹{(bookingDetails.trolleyCount * 39).toLocaleString()}</span>
                                </div>
                            )}
                            <div className="border-t border-dashed border-gray-200 my-2 pt-2 flex justify-between items-end">
                                <span className="font-bold text-[#1C335C]">Total Payable</span>
                                <span className="text-2xl font-bold text-[#008BD0]">₹{(totalPrice).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                 </div>

                 {/* Assistant Card */}
                 <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 flex items-start gap-4">
                     <div className="bg-white p-2 rounded-full shadow-sm">
                        <Phone size={24} className="text-[#008BD0]"/>
                     </div>
                     <div>
                         <h4 className="font-bold text-[#1C335C]">Need Help?</h4>
                         <p className="text-sm text-gray-600 mt-1 mb-2">Our tour experts are available 24/7 to assist you.</p>
                         <p className="text-[#008BD0] font-bold">1800-TOUR-HELP</p>
                     </div>
                 </div>
             </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default TourBookTicketPage;
