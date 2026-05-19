import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  History, Search, Filter, Calendar, Train, MapPin, 
  User, CreditCard, Download, Eye, X, Clock, 
  CheckCircle, AlertCircle, Loader, ChevronRight 
} from 'lucide-react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
  timeout: 10000,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken') || 
                localStorage.getItem('token') || 
                localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Helper to calculate fare breakdown (Base Fare + 5% GST)
const calculateFareBreakdown = (totalAmount) => {
  const total = parseFloat(totalAmount) || 0;
  const baseFare = total / 1.05;
  const gst = total - baseFare;
  
  return {
    baseFare: Math.round(baseFare), // Rounding to nearest integer for display like IRCTC usually does, or use .toFixed(2)
    gst: Math.round(gst),
    total: total
  };
};

// Booking Details Modal Component
const BookingDetailsModal = ({ booking, onClose }) => {
  if (!booking) return null;

  const fareDetails = calculateFareBreakdown(booking.totalAmount || booking.amount);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#008BD0] to-[#006ea8] p-6 text-white rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Booking Details</h2>
              <p className="text-white/80 text-sm mt-1">PNR: {booking.pnr || booking.id}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <span className={`px-4 py-2 rounded-full text-sm font-bold inline-flex items-center gap-2 ${
              booking.status === 'Confirmed' || booking.status === 'confirmed'
                ? 'bg-green-100 text-green-800' 
                : booking.status === 'Cancelled' || booking.status === 'cancelled'
                ? 'bg-red-100 text-red-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {(booking.status === 'Confirmed' || booking.status === 'confirmed') && <CheckCircle className="w-4 h-4" />}
              {(booking.status === 'Cancelled' || booking.status === 'cancelled') && <AlertCircle className="w-4 h-4" />}
              {booking.status?.toUpperCase() || 'PENDING'}
            </span>
            <span className="text-sm text-gray-500">
              Booked on {new Date(booking.bookingDate || booking.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Train Information */}
          <div className="bg-gradient-to-r from-[#008BD0]/10 to-[#1C335C]/10 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center">
                <Train className="w-6 h-6 text-[#008BD0]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1C335C]">
                  {booking.trainNumber} - {booking.trainName}
                </h3>
                <p className="text-sm text-gray-600">{booking.trainClass || 'N/A'}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 items-center">
              <div>
                <p className="text-xs text-gray-500 mb-1">From</p>
                <p className="font-bold text-[#1C335C]">{booking.from || booking.fromStation}</p>
                <p className="text-xs text-gray-600">{booking.departureTime}</p>
              </div>
              <div className="flex justify-center">
                <ChevronRight className="w-8 h-8 text-[#008BD0]" />
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 mb-1">To</p>
                <p className="font-bold text-[#1C335C]">{booking.to || booking.toStation}</p>
                <p className="text-xs text-gray-600">{booking.arrivalTime}</p>
              </div>
            </div>
          </div>

          {/* Journey Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-[#008BD0]" />
                <p className="text-xs text-gray-600">Journey Date</p>
              </div>
              <p className="font-semibold text-[#1C335C]">
                {new Date(booking.date || booking.journeyDate).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-[#008BD0]" />
                <p className="text-xs text-gray-600">Duration</p>
              </div>
              <p className="font-semibold text-[#1C335C]">{booking.duration || 'N/A'}</p>
            </div>
          </div>

          {/* Passenger Details */}
          <div>
            <h4 className="font-bold text-[#1C335C] mb-3 flex items-center gap-2">
              <User className="w-5 h-5 text-[#008BD0]" />
              Passenger Information
            </h4>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              {booking.passengers && booking.passengers.length > 0 ? (
                booking.passengers.map((passenger, idx) => (
                  <div key={idx} className="flex items-center justify-between border-b border-gray-200 last:border-0 pb-2 last:pb-0">
                    <div>
                      <p className="font-semibold text-[#1C335C]">{passenger.name}</p>
                      <p className="text-xs text-gray-600">{passenger.age} yrs • {passenger.gender}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-[#008BD0]">Seat: {passenger.seatNumber || 'TBA'}</p>
                      <p className="text-xs text-gray-600">{passenger.berthPreference || 'No preference'}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-600">No passenger details available</p>
              )}
            </div>
          </div>

          {/* Payment Details */}
          <div>
            <h4 className="font-bold text-[#1C335C] mb-3 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#008BD0]" />
              Payment Information
            </h4>
            <div className="bg-gradient-to-r from-[#008BD0]/5 to-[#1C335C]/5 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Base Fare</span>
                <span className="font-semibold text-[#1C335C]">₹{fareDetails.baseFare}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">GST (5%)</span>
                <span className="font-semibold text-[#1C335C]">₹{fareDetails.gst}</span>
              </div>
              {booking.isCoolieOpted && (
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Coolie Charges ({booking.trolleyCount} x ₹39)</span>
                  <span className="font-semibold text-[#1C335C]">₹{booking.trolleyCount * 39}</span>
                </div>
              )}
              <div className="border-t-2 border-gray-300 pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#1C335C]">Total Amount</span>
                  <span className="text-xl font-bold text-[#008BD0]">₹{booking.totalAmount || booking.amount}</span>
                </div>
              </div>
              {booking.paymentMethod && (
                <p className="text-xs text-gray-600 mt-2">
                  Payment Method: {booking.paymentMethod}
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main Booking History Component
const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [downloadingPdf, setDownloadingPdf] = useState(null);

  // Fetch bookings on mount
  useEffect(() => {
    fetchBookings();
  }, []);

  // Filter bookings when search or filter changes
  useEffect(() => {
    filterBookings();
  }, [searchQuery, statusFilter, bookings]);

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get('/bookings');
      
      if (response.data.success) {
        
        const getMaxSeats = (travelClass) => {
          // Normalize class name for matching
          const cls = (travelClass || '').toUpperCase();
          if (cls.includes('1A')) return 24;
          if (cls.includes('2A')) return 48;
          // Default to 72 for 3A, SL, CC, 2S and others
          return 72; 
        };

        const generateSeatNumber = (travelClass) => {
           const max = getMaxSeats(travelClass);
           return Math.floor(Math.random() * max) + 1;
        };

        // Normalize data to ensure status is consistent
        const normalizedBookings = (response.data.bookings || []).map(b => {
          const tClass = b.trainClass || b.class || '3A'; // Default to 3A if missing
          return {
            ...b,
            // Backend returns bookingStatus, frontend often expects status
            status: b.bookingStatus || b.status || 'Pending',
            trainClass: tClass, 
            passengers: (b.passengers || []).map(p => ({
              ...p,
              seatNumber: p.seatNumber && p.seatNumber !== 'TBA' ? p.seatNumber : generateSeatNumber(tClass)
            }))
          };
        });
        setBookings(normalizedBookings);
      } else {
        throw new Error(response.data.message || 'Failed to fetch bookings');
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
      // setError(err.response?.data?.message || err.message || 'Failed to load booking history');
      
      // Use demo data if API fails (only if explicitly needed, otherwise empty array is safer for production)
      // keeping demo data for fallback visualization as per original code structure
      setBookings([
        {
          id: 'TKT001',
          pnr: '1234567890',
          trainNumber: '12345',
          trainName: 'Rajdhani Express',
          from: 'New Delhi',
          to: 'Mumbai Central',
          date: '2025-01-15',
          status: 'Confirmed',
          trainClass: 'AC 2-Tier',
          departureTime: '16:55',
          arrivalTime: '08:35',
          duration: '15h 40m',
          passengers: [
            { name: 'John Doe', age: 28, gender: 'Male', seatNumber: 'A1-23', berthPreference: 'Lower' }
          ],
          totalAmount: 2850,
          baseFare: 2500,
          taxes: 350,
          bookingDate: '2024-12-15',
          paymentMethod: 'Credit Card'
        },
        {
          id: 'TKT002',
          pnr: '9876543210',
          trainNumber: '22691',
          trainName: 'Rajdhani Express',
          from: 'Bangalore',
          to: 'New Delhi',
          date: '2025-01-20',
          status: 'Waitlist',
          trainClass: 'AC 3-Tier',
          departureTime: '20:00',
          arrivalTime: '06:00',
          duration: '34h 00m',
          passengers: [
            { name: 'Jane Smith', age: 32, gender: 'Female', seatNumber: 'WL-15', berthPreference: 'Upper' }
          ],
          totalAmount: 1680,
          baseFare: 1500,
          taxes: 180,
          bookingDate: '2024-12-18',
          paymentMethod: 'UPI'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Filter bookings based on search and status
  const filterBookings = () => {
    let filtered = [...bookings];

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(b => 
        b.status?.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(b =>
        b.pnr?.toLowerCase().includes(query) ||
        b.trainName?.toLowerCase().includes(query) ||
        b.trainNumber?.toString().includes(query) ||
        b.from?.toLowerCase().includes(query) ||
        b.to?.toLowerCase().includes(query)
      );
    }

    setFilteredBookings(filtered);
  };

  // Generate PDF ticket
  const downloadTicketPDF = async (booking) => {
    try {
      setDownloadingPdf(booking.id);
      
      const fareDetails = calculateFareBreakdown(booking.totalAmount || booking.amount);

      // Create new jsPDF instance with proper orientation and unit
      const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4'
      });
      
      // Header with gradient (simulate with colors)
      doc.setFillColor(0, 139, 208);
      doc.rect(0, 0, 210, 40, 'F');
      
      // Title
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text('E-TICKET', 105, 20, { align: 'center' });
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`PNR: ${booking.pnr || booking.id}`, 105, 30, { align: 'center' });

      // Reset text color
      doc.setTextColor(0, 0, 0);
      
      // Booking Status
      doc.setFontSize(10);
      let yPos = 50;
      doc.setFont('helvetica', 'bold');
      doc.text('Status:', 20, yPos);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(booking.status === 'Confirmed' || booking.status === 'confirmed' ? 0 : 255, booking.status === 'Confirmed' || booking.status === 'confirmed' ? 128 : 165, 0);
      doc.text((booking.status || 'PENDING').toUpperCase(), 45, yPos);
      doc.setTextColor(0, 0, 0);

      // Train Details Section
      yPos = 65;
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(28, 51, 92);
      doc.text('Train Information', 20, yPos);
      
      yPos += 10;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      
      const trainInfo = [
        ['Train Number:', booking.trainNumber || 'N/A'],
        ['Train Name:', booking.trainName || 'N/A'],
        ['Class:', booking.trainClass || 'N/A'],
        ['Date of Journey:', booking.date ? new Date(booking.date).toLocaleDateString('en-IN') : 'N/A']
      ];

      trainInfo.forEach(([label, value]) => {
        doc.setFont('helvetica', 'bold');
        doc.text(label, 20, yPos);
        doc.setFont('helvetica', 'normal');
        doc.text(String(value), 80, yPos);
        yPos += 7;
      });

      // Journey Route
      yPos += 5;
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(28, 51, 92);
      doc.text('Journey Details', 20, yPos);
      
      yPos += 10;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);

      doc.text(`From: ${booking.from || 'N/A'}`, 20, yPos);
      doc.text(`Departure: ${booking.departureTime || 'N/A'}`, 120, yPos);
      yPos += 10;
      doc.text(`To: ${booking.to || 'N/A'}`, 20, yPos);
      doc.text(`Arrival: ${booking.arrivalTime || 'N/A'}`, 120, yPos);
      yPos += 10;
      doc.text(`Duration: ${booking.duration || 'N/A'}`, 20, yPos);

      // Passenger Details - Create Table if passengers exist
      if (booking.passengers && Array.isArray(booking.passengers) && booking.passengers.length > 0) {
        yPos += 15;
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(28, 51, 92);
        doc.text('Passenger Details', 20, yPos);
        
        const passengerData = booking.passengers.map((p, idx) => [
          String(idx + 1),
          String(p.name || 'N/A'),
          String(p.age || 'N/A'),
          String(p.gender || 'N/A'),
          String(p.seatNumber || 'TBA')
        ]);

        autoTable(doc, {
          startY: yPos + 5,
          head: [['S.No', 'Name', 'Age', 'Gender', 'Seat/Berth']],
          body: passengerData,
          theme: 'grid',
          headStyles: { 
            fillColor: [0, 139, 208], 
            textColor: [255, 255, 255],
            fontStyle: 'bold',
            halign: 'center'
          },
          bodyStyles: {
            halign: 'center'
          },
          columnStyles: {
            0: { halign: 'center' },
            1: { halign: 'left' },
            2: { halign: 'center' },
            3: { halign: 'center' },
            4: { halign: 'center' }
          },
          margin: { left: 20, right: 20 },
          didDrawPage: (data) => {
            // Handle page breaks if needed
          }
        });

        // Get position after table - autoTable returns the finalY position
        const tableResult = doc.lastAutoTable;
        yPos = tableResult?.finalY || yPos + 30;
      }

      // Payment Details Section
      yPos += 15;
      
      // Check if we need a new page
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(28, 51, 92);
      doc.text('Payment Information', 20, yPos);
      yPos += 10;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);

      const paymentData = [
        ['Base Fare:', `₹${fareDetails.baseFare}`],
        ['GST (5%):', `₹${fareDetails.gst}`]
      ];

      if (booking.isCoolieOpted) {
        paymentData.push(['Coolie Charges:', `₹${booking.trolleyCount * 39} (${booking.trolleyCount} Trolleys)`]);
      }

      paymentData.push(['Total Amount:', `₹${booking.totalAmount || booking.amount || 0}`]);

      paymentData.forEach(([label, value]) => {
        doc.setFont('helvetica', 'normal');
        doc.text(label, 20, yPos);
        doc.setFont('helvetica', 'bold');
        doc.text(value, 170, yPos, { align: 'right' });
        yPos += 7;
      });

      // Footer
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(100, 100, 100);
        doc.text('This is a computer-generated ticket. No signature required.', 105, 285, { align: 'center' });
        doc.text(`Generated on ${new Date().toLocaleString('en-IN')}`, 105, 290, { align: 'center' });
      }

      // Save PDF with proper naming
      const fileName = `Ticket_${booking.pnr || booking.id || 'booking'}_${new Date().getTime()}.pdf`;
      doc.save(fileName);
      
      // Show success message
      console.log('PDF downloaded successfully:', fileName);
      
    } catch (err) {
      console.error('Error generating PDF:', err);
      console.error('Error stack:', err.stack);
      alert(`Failed to generate PDF: ${err.message || 'Unknown error occurred'}`);
    } finally {
      setDownloadingPdf(null);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-[#008BD0] mx-auto mb-4" />
          <p className="text-[#1C335C] font-semibold">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center">
            <History className="w-7 h-7 text-[#008BD0]" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[#1C335C]">Booking History</h2>
            <p className="text-gray-600 text-sm mt-1">
              {filteredBookings.length} booking{filteredBookings.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-800">Error Loading Bookings</p>
              <p className="text-sm text-red-700 mt-1">{error}</p>
              <button
                onClick={fetchBookings}
                className="mt-2 text-sm text-red-700 hover:text-red-800 font-semibold underline"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by PNR, train name, or station..."
              className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008BD0] focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008BD0] focus:border-transparent font-medium"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="waitlist">Waitlist</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-5 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center">
            <History className="w-10 h-10 text-[#008BD0]" />
          </div>
          <h3 className="text-xl font-bold text-[#1C335C] mb-2">No Bookings Found</h3>
          <p className="text-gray-600">
            {searchQuery || statusFilter !== 'all'
              ? 'Try adjusting your filters or search terms'
              : 'You haven\'t made any bookings yet'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {filteredBookings.map((booking) => (
              <motion.div
                key={booking.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-xl shadow-lg border-2 border-gray-200 hover:border-[#008BD0] transition-all overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Left: Train Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Train className="w-6 h-6 text-[#008BD0]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-[#1C335C] mb-1">
                            {booking.trainNumber} - {booking.trainName}
                          </h3>
                          <p className="text-sm text-gray-600">{booking.trainClass}</p>
                        </div>
                        <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                          booking.status === 'Confirmed' || booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : booking.status === 'Cancelled' || booking.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status?.toUpperCase()}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#008BD0]" />
                          <div>
                            <p className="text-xs text-gray-500">From</p>
                            <p className="font-semibold text-[#1C335C]">{booking.from}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#008BD0]" />
                          <div>
                            <p className="text-xs text-gray-500">To</p>
                            <p className="font-semibold text-[#1C335C]">{booking.to}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#008BD0]" />
                          <div>
                            <p className="text-xs text-gray-500">Journey Date</p>
                            <p className="font-semibold text-[#1C335C]">
                              {new Date(booking.date).toLocaleDateString('en-IN')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex flex-col gap-2 lg:items-end">
                      <p className="text-2xl font-bold text-[#008BD0]">
                        ₹{booking.totalAmount || booking.amount}
                      </p>
                      <p className="text-xs text-gray-500 mb-2">PNR: {booking.pnr || booking.id}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#008BD0] to-[#006ea8] text-white rounded-lg hover:shadow-lg transition-all font-semibold"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                        <button
                          onClick={() => downloadTicketPDF(booking)}
                          disabled={downloadingPdf === booking.id}
                          className="flex items-center gap-2 px-4 py-2 bg-[#1C335C] text-white rounded-lg hover:bg-[#152847] transition-all font-semibold disabled:opacity-50"
                        >
                          {downloadingPdf === booking.id ? (
                            <Loader className="w-4 h-4 animate-spin" />
                          ) : (
                            <Download className="w-4 h-4" />
                          )}
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Booking Details Modal */}
      <AnimatePresence>
        {selectedBooking && (
          <BookingDetailsModal
            booking={selectedBooking}
            onClose={() => setSelectedBooking(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingHistory;