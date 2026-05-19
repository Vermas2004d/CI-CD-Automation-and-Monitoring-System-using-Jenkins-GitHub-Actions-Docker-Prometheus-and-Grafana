import React, { useState, useEffect } from 'react';
import { Zap, Clock, AlertTriangle, MapPin, Calendar, User, Shield } from 'lucide-react';
import { initiatePayment } from '../utils/paymentUtils';

const TatkalBooking = () => {
  const [form, setForm] = useState({
    from: '',
    to: '',
    date: '',
    class: '3A',
    passengerName: '',
    idType: 'Aadhaar',
    idNumber: ''
  });
  const [timeLeft, setTimeLeft] = useState(null);

  // Simulate countdown until Tatkal window (e.g., 10:00 AM)
  useEffect(() => {
    const target = new Date();
    target.setHours(10, 0, 0, 0); // 10:00 AM
    const interval = setInterval(() => {
      const now = new Date();
      let diff = target - now;
      if (diff < 0) diff = 0;
      const hrs = Math.floor(diff / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${hrs}h ${mins}m ${secs}s`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  const baseFare = 1500;
  const tatkalCharge = 300;
  const totalAmount = baseFare + tatkalCharge;

  const bookingData = {
    from: form.from,
    to: form.to,
    date: new Date(form.date),
    trainNumber: '12345',
    trainName: 'Tatkal Express',
    class: form.class,
    passengers: [{
      name: form.passengerName,
      age: 30,
      gender: 'Male'
    }],
    contactEmail: 'user@example.com',
    contactPhone: '9876543210',
    tatkalCharge,
    totalAmount
  };

  const userDetails = {
    name: form.passengerName,
    email: 'user@example.com',
    phone: '9876543210'
  };

  await initiatePayment(
    'tatkal',
    bookingData,
    userDetails,
    (response) => alert('Tatkal booking confirmed!'),
    (error) => alert('Booking failed')
  );
};

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Zap className="w-8 h-8 text-orange-500" />
        <div>
          <h2 className="text-2xl font-bold text-[#1C335C]">Tatkal Booking</h2>
          <p className="text-sm text-gray-600">High-priority last-minute ticket reservation window</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg flex items-center gap-3">
          <Clock className="w-6 h-6 text-orange-600" />
          <div>
            <p className="text-xs text-gray-600">Next Window Opens In</p>
            <p className="font-semibold text-orange-700">{timeLeft || 'Calculating...'}</p>
          </div>
        </div>
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm leading-relaxed">
          <p className="font-semibold text-[#1C335C] mb-1">Rules Summary</p>
          <ul className="list-disc list-inside text-gray-600 space-y-1 text-xs">
            <li>Opens at 10:00 AM (AC) / 11:00 AM (Non-AC)</li>
            <li>Limited quota; fastest submission wins</li>
            <li>One ID per passenger mandatory</li>
          </ul>
        </div>
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-xs">
          <AlertTriangle className="w-6 h-6 text-red-600" />
          <p className="text-red-700">Keep details ready. Network delays may affect success.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From Station</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input name="from" value={form.from} onChange={handleChange} required placeholder="e.g. NDLS" className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To Station</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input name="to" value={form.to} onChange={handleChange} required placeholder="e.g. BCT" className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Journey Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input type="date" name="date" value={form.date} onChange={handleChange} required className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
            <select name="class" value={form.class} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none">
              <option>1A</option><option>2A</option><option>3A</option><option>SL</option><option>CC</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Passenger Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input name="passengerName" value={form.passengerName} onChange={handleChange} required placeholder="Full Name" className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ID Type</label>
            <select name="idType" value={form.idType} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none">
              <option>Aadhaar</option><option>PAN</option><option>Voter ID</option><option>Passport</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ID Number</label>
            <div className="relative">
              <Shield className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input name="idNumber" value={form.idNumber} onChange={handleChange} required placeholder="Enter ID Number" className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
            </div>
          </div>
        </div>
        <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg shadow-md transition">
          Attempt Tatkal Booking
        </button>
      </form>
    </div>
  );
};

export default TatkalBooking;
